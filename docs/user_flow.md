# User Flow & Skenario — PanenDesa

## 1. Alur: Petani/Pekebun Melaporkan Estimasi Stok

```
Petani login -> pilih komoditas (mis. Cabai Merah)
-> input estimasi jumlah panen (kg) + tanggal target panen
-> submit
-> sistem update Kapasitas Estimasi desa (agregat semua petani)
-> status laporan: "Menunggu Panen"
```

**Skenario contoh:**
"Pak Budi login -> pilih Cabai Merah -> input 200 kg, target panen 20 Juli -> submit -> Kapasitas Estimasi Desa Sukamaju bertambah 200 kg dari kontribusi Pak Budi."

## 2. Alur: Petugas Kopdes Melakukan Intake & Grading

```
Petugas login -> pilih petani yang mengantar hasil panen
-> foto produk dengan objek referensi ukuran
-> sistem hitung skor (warna, ukuran, cacat) via Gemini Vision -> ini SINYAL PENDUKUNG
-> sistem keluarkan grade sementara A/B/C + alasan
-> petugas timbang produk fisik, input berat aktual
-> sistem bandingkan berat aktual vs pola grade (deteksi kejanggalan jika ada)
-> jika petugas ragu dengan grade hasil vision -> petugas override manual, grade override yang tercatat final
-> submit -> catatan tersimpan (nama petugas, waktu, foto asli, grade final, berat, status override)
-> Kapasitas Tervalidasi desa bertambah
-> sistem hitung ulang Skor Konsistensi petani tsb (estimasi vs realisasi) dan Skor Konsistensi Desa (agregat)
```

**Skenario contoh:**
"Petugas Kopdes Sukamaju terima 195 kg cabai dari Pak Budi (estimasi awal 200 kg) -> foto -> Gemini Vision usulkan grade A -> petugas setuju, tidak override -> timbang 195 kg -> submit -> Kapasitas Tervalidasi bertambah 195 kg grade A -> Skor Konsistensi Pak Budi dihitung ulang: 100 - (|200-195|/200*100) = 97.5"

## 3. Alur: Pembeli Mengajukan Permintaan

```
Pembeli login -> pilih komoditas & jumlah dibutuhkan (mis. 500 kg Cabai)
-> sistem cek Kapasitas Estimasi desa terdekat/relevan
-> jika cukup -> order "Dikonfirmasi Sementara"
-> jika desa mendekati waktu panen, tunggu proses intake
-> setelah intake, sistem bandingkan Kapasitas Tervalidasi vs kebutuhan order
   -> jika sesuai toleransi (>=85% dari estimasi) -> order lanjut normal
   -> jika kurang -> sistem picu Smart Split:
        1. Hitung skor_prioritas_desa untuk tiap desa tetangga yang punya kapasitas tersedia
           (formula: bobot_jarak x (1/jarak_km) + bobot_konsistensi x skor_konsistensi_desa)
        2. Urutkan desa dari skor tertinggi
        3. Alokasikan kekurangan mulai dari desa dengan skor tertinggi hingga kebutuhan terpenuhi
        4. Simpan skor_prioritas tiap alokasi untuk transparansi (bisa dijelaskan ke pembeli kenapa desa X dipilih)
-> kopdes & pembeli sepakati harga final secara manual
   -> sistem tampilkan fee_persen Kopdes secara terbuka ke pembeli SEBELUM konfirmasi
-> order berstatus "Siap Kirim"
```

## 4. Alur: Distribusi Hasil (Fair-Share Pricing dengan Fee Transparan)

```
Order berstatus "Siap Kirim" -> harga final diinput kopdes
-> sistem tampilkan preview: harga_final_per_kg, fee_persen kopdes, dan estimasi hasil bersih per petani
   SEBELUM harga dikunci -> kopdes & pembeli konfirmasi
-> harga dikunci (harga_terkunci = true), fee_persen di-snapshot sebagai fee_kopdes_persen_terpakai
-> sistem hitung kontribusi tiap petani (kg x pengali grade)
-> sistem hitung porsi masing-masing dari (harga_final_per_kg x (1 - fee_kopdes_persen_terpakai))
-> dashboard petani menampilkan rincian: kuantitas, grade, harga per kg, fee yang dipotong, total diterima
-> status order: "Selesai"
```

**Skenario contoh:**
"Order 500 kg cabai terjual Rp 15.000/kg (harga dasar, grade A), fee Kopdes 5% (transparan, sudah ditampilkan ke pembeli sejak awal). Pak Budi kontribusi 195 kg grade A -> menerima proporsional penuh dari (15.000 x 0.95). Pak Andi kontribusi 150 kg grade B (pengali 0.85) -> menerima proporsi lebih kecil per kg, tetap dari harga setelah fee."

## 5. Alur: Kejanggalan Terdeteksi Saat Intake

```
Saat intake, sistem deteksi berat aktual jauh berbeda dari pola grade yang diberikan
-> kejanggalan_terdeteksi = true, dicatat di intake_grading
-> laporan tetap tersimpan (tidak diblokir), tapi ditandai untuk review
-> admin bisa melihat item bertanda kejanggalan di dashboard audit
-> admin boleh menambahkan catatan ke audit_log, atau memanggil petugas kopdes untuk klarifikasi
-> kejanggalan TIDAK otomatis menurunkan Skor Konsistensi petani -- itu hak admin untuk investigasi dulu,
   supaya petani tidak dirugikan oleh human error petugas (salah foto, salah timbang, dll)
```

## 6. Alur: Smart Split Gagal Memenuhi Kebutuhan

```
Setelah Smart Split mengalokasikan dari semua desa tetangga yang tersedia,
jika total kapasitas gabungan TETAP kurang dari kebutuhan order:
-> sistem TIDAK memaksakan order "Siap Kirim" dengan kekurangan stok
-> order berstatus "Menunggu Tambahan Panen" (bukan status baru yang melompati tahap validasi)
-> pembeli diberi pilihan: tunggu, kurangi jumlah permintaan, atau batalkan order (lihat POST /api/orders/:id/cancel)
```

## 7. Alur: Economic Impact Calculator (Tier 2)

```
Petani/admin buka dashboard -> pilih komoditas
-> sistem ambil harga_acuan komoditas tsb
-> sistem cari benchmark_margin_tengkulak: prioritaskan baris dengan desa_id sesuai (override lokal),
   jika tidak ada pakai baris umum (desa_id NULL)
-> sistem hitung estimasi_harga_tengkulak = harga_acuan x (1 - rata-rata margin)
-> sistem ambil harga_rata_panendesa dari fair_share_distribution periode terbaru
-> tampilkan perbandingan + label eksplisit "Estimasi berbasis riset, bukan data transaksi real-time"
```

## 8. Alur: Jadwal Pengumpulan & Rute Distribusi (Tier 2)

```
Setelah Panen Kolektif terbentuk -> sistem buat jadwal antar per petani ke kopdes (slot waktu)
-> setelah barang terkumpul di kopdes -> sistem tampilkan rute sederhana kopdes -> lokasi pembeli
```

## Prinsip Alur untuk AI

- Setiap transisi status (Menunggu Panen -> Tervalidasi -> Dikonfirmasi -> Siap Kirim -> Selesai) harus eksplisit dan tercatat dengan timestamp
- Jangan lompati status validasi — order tidak boleh langsung "Selesai" tanpa melalui tahap intake tervalidasi
- Smart Split hanya terpicu otomatis jika ambang toleransi terlampaui, bukan default setiap order
- Fee Kopdes harus selalu ditampilkan SEBELUM konfirmasi harga, tidak pernah setelahnya
- Kejanggalan saat intake tidak boleh otomatis menghukum petani — selalu lewat review admin dulu
- Grading Gemini Vision adalah sinyal pendukung; alur harus selalu menyediakan jalur override manual petugas yang terlihat jelas, bukan tersembunyi di menu lain
