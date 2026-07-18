# Kontrak API — PanenDesa

Semua response sukses berbentuk `{ "success": true, "data": {...} }`. Semua response error berbentuk `{ "success": false, "error": "pesan" }`.

## Auth

### POST /api/auth/login
Request: `{ "email": string, "password": string }`
Response sukses: `{ "success": true, "data": { "token": string, "role": string, "user_id": number } }`

## Stok Estimasi (Petani)

### POST /api/stok-estimasi
Role: `petani`
Request: `{ "komoditas_id": number, "jumlah_kg": number, "tanggal_target_panen": "YYYY-MM-DD" }`
Response: `{ "success": true, "data": { "id": number, "status": "menunggu_panen" } }`

### GET /api/stok-estimasi/:petani_id
Role: `petani`, `admin`
Response: daftar laporan stok milik petani tsb.

## Intake & Grading (Kopdes)

### POST /api/intake-grading
Role: `petugas_kopdes`
Request (multipart/form-data): `{ "stok_estimasi_id": number, "foto": file, "berat_aktual_kg": number, "grade_override_manual"?: "A"|"B"|"C" }`
Proses: sistem kirim foto ke Gemini Vision sebagai **sinyal pendukung** untuk grade awal (warna, ukuran, cacat). Petugas boleh mengoverride grade secara manual jika hasil vision meragukan (`grade_override_manual`) — ini yang tercatat sebagai grade final, bukan hasil vision mentah. Sistem tetap membandingkan berat aktual vs pola grade untuk deteksi kejanggalan, dan memicu update `skor_konsistensi` petani terkait.
Response: `{ "success": true, "data": { "grade": "A"|"B"|"C", "skor_warna": number, "skor_ukuran": number, "persen_cacat": number, "kejanggalan_terdeteksi": boolean, "grade_override_manual": boolean } }`

### GET /api/intake-grading/:desa_id
Role: `petugas_kopdes`, `admin`
Response: riwayat intake untuk audit.

## Kapasitas

### GET /api/capacity/:desa_id
Role: semua role terautentikasi
Response: `{ "success": true, "data": { "kapasitas_estimasi_kg": number, "kapasitas_tervalidasi_kg": number, "skor_konsistensi_desa": number } }`

## Trust Score (Fitur Unggulan)

### GET /api/trust-score/petani/:petani_id
Role: `petani` (milik sendiri), `petugas_kopdes` (desa sendiri), `admin`
Response: `{ "success": true, "data": { "skor_konsistensi": number, "jumlah_transaksi_dihitung": number, "riwayat": [ { "stok_estimasi_id": number, "estimasi_kg": number, "realisasi_kg": number, "skor_transaksi": number } ] } }`

### GET /api/trust-score/desa/:desa_id
Role: semua role terautentikasi
Response: `{ "success": true, "data": { "skor_konsistensi_desa": number, "jumlah_petani_aktif": number } }`

Proses: kedua skor dihitung ulang otomatis (bukan realtime per-request, cukup di-trigger) setiap kali ada `intake_grading` baru masuk untuk petani terkait. Formula lihat `database_schema.md`.

## Orders (Pembeli)

### POST /api/orders
Role: `pembeli`
Request: `{ "komoditas_id": number, "jumlah_diminta_kg": number, "desa_id_prioritas": number }`
Proses: sistem cek kapasitas estimasi -> jika cukup, buat order status `dikonfirmasi_sementara`.
Response: `{ "success": true, "data": { "order_id": number, "status": string } }`

### GET /api/orders/:pembeli_id
Role: `pembeli` (milik sendiri), `admin`
Response: daftar order milik pembeli tsb beserta status terkini.

### POST /api/orders/:id/cancel
Role: `pembeli` (pemilik order), `admin`
Proses: hanya bisa dibatalkan jika `harga_terkunci = false`. Jika sudah terkunci, tolak dengan pesan jelas.
Response: `{ "success": true, "data": { "status": "dibatalkan" } }`

### POST /api/orders/:id/validate
Role: **internal/sistem — tidak diekspos sebagai endpoint publik**
Proses: dipanggil otomatis oleh backend setelah intake baru masuk (bukan dipanggil dari klien manapun). Diamankan dengan header internal khusus (mis. `X-Internal-Service-Key`) yang divalidasi middleware, terpisah dari JWT user biasa. Membandingkan kapasitas tervalidasi vs kebutuhan order dengan toleransi ±15%. Jika kurang, panggil smart-split menggunakan formula `skor_prioritas_desa` (lihat `database_schema.md`).
Response: `{ "success": true, "data": { "status": "lanjut_normal"|"smart_split_triggered", "alokasi": [ { "desa_id": number, "jumlah_kg": number, "skor_prioritas": number } ] } }`

### POST /api/orders/:id/confirm-price
Role: `petugas_kopdes`
Request: `{ "harga_final_per_kg": number }`
Proses: sistem mengambil `fee_persen` aktif dari Kopdes terkait dan menyimpannya sebagai snapshot `fee_kopdes_persen_terpakai` pada order ini (agar tidak berubah walau `kopdes.fee_persen` diubah di masa depan). Fee ini **wajib ditampilkan ke pembeli dan seluruh petani terkait sebelum konfirmasi**, bukan disembunyikan. Setelah konfirmasi, kunci harga (`harga_terkunci = true`) — tidak bisa diubah setelah ini (ditegakkan di middleware DAN trigger database).
Response: `{ "success": true, "data": { "harga_terkunci": true, "fee_kopdes_persen_terpakai": number } }`

## Fair-Share Distribution

### POST /api/fair-share/:order_id/calculate
Role: `petugas_kopdes`, sistem
Proses: hitung distribusi berdasarkan kontribusi kg x pengali grade dari semua `intake_grading` terkait order tsb, **setelah** `fee_kopdes_persen_terpakai` dipotong dari `harga_final_per_kg`. Dibungkus dalam satu transaksi database — jika ada error di tengah proses, seluruh perubahan di-rollback (tidak boleh partial write).
Response: `{ "success": true, "data": { "distribusi": [ { "petani_id": number, "kontribusi_kg": number, "grade": string, "jumlah_diterima": number } ], "fee_kopdes_persen_terpakai": number, "total_fee_kopdes": number } }`

### GET /api/fair-share/petani/:petani_id
Role: `petani`
Response: riwayat rincian hasil bagi-hasil milik petani tsb (transparan, bisa dilihat kapan saja, termasuk fee yang sudah dipotong secara eksplisit — bukan angka bersih tanpa penjelasan).

## Economic Impact Calculator (Tier 2 — Pelengkap)

### GET /api/economic-impact/:komoditas_id
Role: semua role terautentikasi
Query param opsional: `?desa_id=number`
Proses: bandingkan harga rata-rata yang diterima petani via PanenDesa (dari `fair_share_distribution`, periode terbaru) dengan estimasi harga tengkulak (`harga_acuan` × (1 − margin dari `benchmark_margin_tengkulak`, prioritaskan baris dengan `desa_id` terisi jika ada override lokal, jika tidak ada pakai baris umum `desa_id IS NULL`)).
Response: `{ "success": true, "data": { "harga_rata_panendesa_per_kg": number, "estimasi_harga_tengkulak_per_kg": number, "selisih_persen": number, "sumber_referensi_margin": string, "label": "Estimasi berbasis riset, bukan data transaksi real-time" } }`

**Catatan:** endpoint ini WAJIB selalu menyertakan `label` di atas di response dan ditampilkan di UI — jangan pernah menyajikan angka ini seolah data pasti/real-time.

## Audit (Admin)

### GET /api/audit-log
Role: `admin`
Query param opsional: `?tabel=string&record_id=number`
Response: daftar entri `audit_log`, terbaru dulu.

### POST /api/audit-log
Role: `admin`
Request: `{ "tabel_terkait": string, "record_id": number, "aksi": string, "catatan"?: string }`
Response: `{ "success": true, "data": { "id": number } }`

## Aturan untuk AI

- Endpoint yang mengubah data finansial (`confirm-price`, `calculate`) harus dibungkus transaksi database — jangan biarkan partial write jika terjadi error di tengah proses.
- Endpoint `intake-grading` wajib validasi ukuran file foto dan tipe file sebelum dikirim ke Gemini API.
- Jangan buat endpoint yang mengizinkan role `pembeli` mengakses data `intake_grading` mentah milik petani lain — cukup data agregat kapasitas (lihat security_policy.md).
- `/api/orders/:id/validate` **bukan** endpoint yang boleh dipanggil dari frontend manapun — ini murni service-to-service. Jangan buat tombol atau fetch call ke endpoint ini dari kode klien.
- Endpoint Economic Impact Calculator (Tier 2) tidak boleh diprioritaskan pengerjaannya di atas Trust Score, Smart Split, atau Fair-Share (Tier 1) — kerjakan setelah ketiganya solid.
- Semua endpoint yang menampilkan `fee_kopdes_persen_terpakai` atau kalkulasi terkait fee harus menampilkannya secara eksplisit di response, jangan digabung diam-diam ke angka lain tanpa breakdown.
