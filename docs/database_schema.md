# Skema Basis Data — PanenDesa

## Ringkasan Entitas

- Desa punya banyak Petani dan satu Kopdes (One-to-Many)
- Petani punya banyak Laporan Stok Estimasi (One-to-Many)
- Kopdes punya banyak Catatan Intake/Grading (One-to-Many)
- Order bisa dipenuhi dari banyak Desa via Order Allocation (Many-to-Many lewat tabel penghubung)
- Order punya satu Distribusi Hasil, yang punya banyak baris Fair Share per Petani (One-to-Many)
- Setiap Petani dan Desa punya Skor Konsistensi yang diperbarui dari histori transaksi (dipakai oleh algoritma Smart Split)

## DDL (PostgreSQL)

```sql
-- Users & Roles
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('petani','petugas_kopdes','pembeli','admin')),
    desa_id INTEGER,
    email VARCHAR(100) UNIQUE,
    password_hash TEXT NOT NULL,
    -- Skor konsistensi individual, hanya relevan untuk role 'petani'.
    -- Dihitung dari histori stok_estimasi.jumlah_kg vs intake_grading.berat_aktual_kg.
    skor_konsistensi DECIMAL(5,2) DEFAULT 100.00,
    created_at TIMESTAMP DEFAULT now()
);

-- Desa
CREATE TABLE desa (
    id SERIAL PRIMARY KEY,
    nama_desa VARCHAR(100) NOT NULL,
    latitude DECIMAL(9,6),
    longitude DECIMAL(9,6),
    -- Agregat (rata-rata tertimbang) dari skor_konsistensi petani di desa ini.
    -- Dipakai sebagai salah satu input formula prioritas Smart Split.
    skor_konsistensi DECIMAL(5,2) DEFAULT 100.00
);

-- Kopdes (satu per desa, fase 1)
CREATE TABLE kopdes (
    id SERIAL PRIMARY KEY,
    desa_id INTEGER REFERENCES desa(id),
    nama_kopdes VARCHAR(100) NOT NULL,
    -- Fee layanan Kopdes, persentase tetap, di-set saat onboarding oleh admin/kopdes.
    -- WAJIB ditampilkan terbuka ke petani & pembeli sebelum harga final dikonfirmasi.
    fee_persen DECIMAL(5,2) NOT NULL DEFAULT 0 CHECK (fee_persen >= 0 AND fee_persen <= 100),
    aktif BOOLEAN DEFAULT true
);

ALTER TABLE users ADD CONSTRAINT fk_users_desa FOREIGN KEY (desa_id) REFERENCES desa(id);

-- Komoditas
CREATE TABLE komoditas (
    id SERIAL PRIMARY KEY,
    nama_komoditas VARCHAR(50) NOT NULL,
    satuan VARCHAR(10) DEFAULT 'kg'
);

-- Laporan Stok Estimasi (sebelum panen)
CREATE TABLE stok_estimasi (
    id SERIAL PRIMARY KEY,
    petani_id INTEGER REFERENCES users(id),
    komoditas_id INTEGER REFERENCES komoditas(id),
    jumlah_kg DECIMAL(10,2) NOT NULL,
    tanggal_target_panen DATE NOT NULL,
    status VARCHAR(20) DEFAULT 'menunggu_panen',
    created_at TIMESTAMP DEFAULT now()
);

-- Catatan Intake & Grading (setelah panen, di kopdes)
-- Grading foto (Gemini Vision) adalah SINYAL PENDUKUNG, bukan satu-satunya sumber kebenaran.
-- Cross-check dengan berat_aktual_kg dan histori skor_konsistensi petani tetap wajib.
CREATE TABLE intake_grading (
    id SERIAL PRIMARY KEY,
    stok_estimasi_id INTEGER REFERENCES stok_estimasi(id),
    petugas_id INTEGER REFERENCES users(id),
    foto_url TEXT NOT NULL,
    skor_warna DECIMAL(3,2),
    skor_ukuran DECIMAL(3,2),
    persen_cacat DECIMAL(5,2),
    grade CHAR(1) CHECK (grade IN ('A','B','C')),
    -- true jika petugas mengoverride grade hasil Gemini Vision secara manual
    grade_override_manual BOOLEAN DEFAULT false,
    berat_aktual_kg DECIMAL(10,2) NOT NULL,
    kejanggalan_terdeteksi BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT now()
);

-- Order dari Pembeli
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    pembeli_id INTEGER REFERENCES users(id),
    komoditas_id INTEGER REFERENCES komoditas(id),
    kopdes_id INTEGER REFERENCES kopdes(id),
    jumlah_diminta_kg DECIMAL(10,2) NOT NULL,
    status VARCHAR(30) DEFAULT 'dikonfirmasi_sementara',
    harga_final_per_kg DECIMAL(10,2),
    -- Snapshot fee_persen Kopdes SAAT harga dikonfirmasi (bukan referensi live ke kopdes.fee_persen).
    -- Ini mencegah fee "bergerak" setelah harga dikunci jika admin mengubah fee_persen kopdes di kemudian hari.
    fee_kopdes_persen_terpakai DECIMAL(5,2),
    harga_terkunci BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);

-- Alokasi Order lintas Desa (Smart Split) - Many-to-Many
CREATE TABLE order_allocation (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id),
    desa_id INTEGER REFERENCES desa(id),
    jumlah_dialokasikan_kg DECIMAL(10,2) NOT NULL,
    urutan_prioritas INTEGER,
    -- Skor prioritas hasil formula Smart Split saat alokasi ini dibuat (untuk audit/penjelasan ke pembeli)
    skor_prioritas DECIMAL(6,4)
);

-- Distribusi Fair-Share ke tiap Petani
CREATE TABLE fair_share_distribution (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id),
    petani_id INTEGER REFERENCES users(id),
    intake_grading_id INTEGER REFERENCES intake_grading(id),
    kontribusi_kg DECIMAL(10,2) NOT NULL,
    pengali_grade DECIMAL(3,2) NOT NULL,
    -- jumlah_diterima sudah dihitung SETELAH fee_kopdes_persen_terpakai dipotong dari harga_final_per_kg
    jumlah_diterima DECIMAL(12,2) NOT NULL,
    created_at TIMESTAMP DEFAULT now()
);

-- Harga Acuan Pasar (referensi, bukan harga final)
CREATE TABLE harga_acuan (
    id SERIAL PRIMARY KEY,
    komoditas_id INTEGER REFERENCES komoditas(id),
    harga_referensi_per_kg DECIMAL(10,2) NOT NULL,
    sumber VARCHAR(100),
    tanggal DATE DEFAULT CURRENT_DATE
);

-- Benchmark Margin Tengkulak (Tier 2 — Economic Impact Calculator)
-- Ini ESTIMASI berbasis riset yang bisa disitasi, BUKAN data transaksi tengkulak real-time.
-- desa_id NULL = berlaku umum (default nasional/riset). desa_id terisi = override lokal
-- oleh kopdes/admin desa tsb berdasarkan pengalaman lapangan, diprioritaskan di atas nilai umum.
CREATE TABLE benchmark_margin_tengkulak (
    id SERIAL PRIMARY KEY,
    komoditas_id INTEGER REFERENCES komoditas(id),
    desa_id INTEGER REFERENCES desa(id),
    margin_persen_min DECIMAL(5,2) NOT NULL,
    margin_persen_max DECIMAL(5,2) NOT NULL,
    sumber_referensi TEXT NOT NULL,
    catatan TEXT,
    created_at TIMESTAMP DEFAULT now()
);

-- Audit Log (admin, sampling audit acak & jejak perubahan sensitif)
CREATE TABLE audit_log (
    id SERIAL PRIMARY KEY,
    admin_id INTEGER REFERENCES users(id),
    tabel_terkait VARCHAR(50) NOT NULL,
    record_id INTEGER NOT NULL,
    aksi VARCHAR(30) NOT NULL, -- contoh: 'flag_review', 'catatan_audit', 'override_grade'
    catatan TEXT,
    created_at TIMESTAMP DEFAULT now()
);

-- ============================================
-- INDEX
-- ============================================
CREATE INDEX idx_users_desa ON users(desa_id);
CREATE INDEX idx_stok_estimasi_petani ON stok_estimasi(petani_id);
CREATE INDEX idx_stok_estimasi_status ON stok_estimasi(status);
CREATE INDEX idx_intake_grading_petugas ON intake_grading(petugas_id);
CREATE INDEX idx_intake_grading_stok_estimasi ON intake_grading(stok_estimasi_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_komoditas ON orders(komoditas_id);
CREATE INDEX idx_orders_kopdes ON orders(kopdes_id);
CREATE INDEX idx_order_allocation_order ON order_allocation(order_id);
CREATE INDEX idx_order_allocation_desa ON order_allocation(desa_id);
CREATE INDEX idx_fair_share_petani ON fair_share_distribution(petani_id);
CREATE INDEX idx_fair_share_order ON fair_share_distribution(order_id);
CREATE INDEX idx_benchmark_komoditas_desa ON benchmark_margin_tengkulak(komoditas_id, desa_id);

-- ============================================
-- PROTEKSI DB-LEVEL: harga_terkunci tidak bisa diubah
-- Lapisan kedua selain middleware backend — jangan andalkan middleware saja.
-- ============================================
CREATE OR REPLACE FUNCTION prevent_harga_final_update() RETURNS TRIGGER AS $$
BEGIN
    IF OLD.harga_terkunci = true AND (
        NEW.harga_final_per_kg IS DISTINCT FROM OLD.harga_final_per_kg
        OR NEW.fee_kopdes_persen_terpakai IS DISTINCT FROM OLD.fee_kopdes_persen_terpakai
    ) THEN
        RAISE EXCEPTION 'harga_final_per_kg dan fee_kopdes_persen_terpakai tidak bisa diubah setelah harga_terkunci = true';
    END IF;
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_prevent_harga_final_update
BEFORE UPDATE ON orders
FOR EACH ROW EXECUTE FUNCTION prevent_harga_final_update();
```

## Formula Algoritma (referensi untuk `/lib`)

### Threshold Deteksi Kejanggalan Intake
```
kejanggalan_terdeteksi = true JIKA ABS(berat_aktual_kg - estimasi_kg) / estimasi_kg > 0.30
```
Threshold 30% ini beda dari toleransi ±15% Smart Split (lihat `user_flow.md` Alur 3) —
dua konsep berbeda: 30% ini untuk menandai satu laporan intake individual sebagai
mencurigakan (butuh review admin), sedangkan ±15% untuk memutuskan apakah kapasitas
desa cukup memenuhi satu order pembeli. Jangan disamakan atau digabung logic-nya.

### Skor Konsistensi Petani
Dihitung dari N transaksi terakhir (disarankan N=10), dipicu ulang setiap ada `intake_grading` baru untuk petani tsb:

```
skor_transaksi = 100 - (ABS(estimasi_kg - realisasi_kg) / estimasi_kg * 100)
skor_konsistensi_petani = rata-rata skor_transaksi dari N transaksi terakhir
```

### Skor Konsistensi Desa
Rata-rata tertimbang skor_konsistensi seluruh petani aktif di desa tsb (bobot = jumlah transaksi petani, supaya petani yang jarang lapor tidak mendominasi skor desa).

### Prioritas Smart Split
```
skor_prioritas_desa = (bobot_jarak * (1 / jarak_km)) + (bobot_konsistensi * skor_konsistensi_desa)
```
Default `bobot_jarak = 0.6`, `bobot_konsistensi = 0.4` — bisa dikonfigurasi admin. Desa dengan `skor_prioritas_desa` tertinggi dipilih lebih dulu untuk memenuhi kekurangan smart split.

## Catatan untuk AI

- `intake_grading` adalah sumber kebenaran untuk Kapasitas Tervalidasi — jangan hitung kapasitas tervalidasi dari `stok_estimasi` langsung
- `order_allocation` memungkinkan satu order dipenuhi dari lebih dari satu desa (relasi many-to-many antara orders dan desa)
- `harga_final_per_kg` di tabel `orders` harus di-set `harga_terkunci = true` setelah disepakati — setelah itu tidak boleh diubah oleh query manapun. Ini ditegakkan **dua lapis**: middleware backend DAN trigger database (`trg_prevent_harga_final_update`) — jangan hanya andalkan salah satu.
- `fee_kopdes_persen_terpakai` di `orders` adalah **snapshot**, bukan live reference ke `kopdes.fee_persen`. Ini disengaja — mencegah fee transaksi lama berubah kalau admin mengubah fee kopdes di masa depan.
- `benchmark_margin_tengkulak` **bukan** data transaksi real-time. Selalu tampilkan sebagai estimasi bersumber riset di UI, jangan pernah diklaim sebagai harga tengkulak aktual.
- `skor_konsistensi` di `users` hanya relevan untuk role `petani` — untuk role lain, biarkan default dan jangan ditampilkan di UI.
- Jangan buat tabel pembayaran yang menyimpan detail rekening/kartu langsung — itu di luar lingkup MVP (lihat security_policy.md)