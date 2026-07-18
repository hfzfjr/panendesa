# Matriks Keamanan & Hak Akses — PanenDesa

## Peran dan Hak Akses

| Halaman/Data | Petani | Petugas Kopdes | Pembeli | Admin |
|---|---|---|---|---|
| Lapor stok estimasi (milik sendiri) | Baca/Tulis | Baca | - | Baca |
| Lapor stok estimasi (milik petani lain) | - | Baca (desa sendiri) | - | Baca |
| Intake & grading | - | Baca/Tulis (kopdes sendiri) | - | Baca |
| Override grade manual | - | Tulis (kopdes sendiri) | - | Baca |
| Kapasitas agregat desa | Baca | Baca | Baca | Baca |
| Skor konsistensi (milik sendiri) | Baca | - | - | Baca |
| Skor konsistensi (petani lain) | - | Baca (desa sendiri) | - | Baca |
| Skor konsistensi desa (agregat) | Baca | Baca | Baca | Baca |
| Buat order | - | - | Tulis | Baca |
| Batalkan order | - | - | Tulis (order sendiri, sebelum harga terkunci) | Tulis |
| Fee Kopdes (`fee_persen`) | Baca | Tulis (kopdes sendiri, saat onboarding) | Baca (sebelum konfirmasi harga) | Baca/Tulis |
| Konfirmasi harga final | - | Tulis (order terkait) | Baca | Baca |
| Rincian fair-share (milik sendiri, termasuk fee yang dipotong) | Baca | Baca (desa sendiri) | - | Baca |
| Rincian fair-share (petani lain) | - | Baca (desa sendiri, untuk audit) | - | Baca |
| Economic Impact Calculator | Baca | Baca | Baca | Baca/Tulis (kelola benchmark) |
| Log audit intake & kejanggalan | - | Baca (miliknya) | - | Baca/Tulis |

**Prinsip Row-Level Security:** setiap query yang mengambil data milik petani atau kopdes tertentu harus difilter berdasarkan `user_id` atau `desa_id` dari sesi yang sedang login — tidak boleh mengandalkan hanya validasi di frontend.

Contoh aturan konkret: *"Tabel `stok_estimasi` hanya bisa dibaca penuh oleh petani pemiliknya dan petugas kopdes dari desa yang sama. Pembeli hanya bisa melihat data agregat dari endpoint `/api/capacity`, tidak pernah data mentah per petani."*

## Endpoint Internal (Bukan untuk Klien)

- `POST /api/orders/:id/validate` **tidak boleh** dapat dipanggil dari frontend manapun (petani, kopdes, pembeli, admin). Endpoint ini hanya dipanggil backend-ke-backend, diamankan header internal (`X-Internal-Service-Key`) yang divalidasi terpisah dari JWT user biasa. Middleware wajib menolak request tanpa header ini, termasuk jika seseorang mencoba memanggilnya dengan JWT admin sekalipun.

## Autentikasi

- JWT dengan expiry wajar (misal 24 jam), refresh token opsional untuk MVP
- Password di-hash (bcrypt), tidak pernah disimpan plain text
- Role disematkan di dalam JWT payload dan divalidasi ulang di setiap middleware backend, bukan hanya dipercaya dari klien

## Perlindungan Data (kesadaran UU PDP)

- Foto produk hasil intake disimpan dengan akses terbatas — hanya bisa diakses oleh petugas kopdes desa terkait dan admin, tidak publik
- Sistem **tidak** menyimpan detail rekening bank atau kartu pembayaran secara langsung — jika fitur pembayaran digital dikembangkan (Tier 3 roadmap), gunakan token dari payment gateway pihak ketiga, bukan menyimpan data sensitif sendiri
- Data pribadi petani (nama, kontak) hanya ditampilkan ke role yang berkepentingan (kopdes desa sendiri, admin), tidak ditampilkan ke pembeli

## Transparansi Fee & Anti-Manipulasi Harga

- `kopdes.fee_persen` **wajib ditampilkan** ke pembeli dan petani sebelum `confirm-price` dipanggil — backend tidak boleh menyembunyikan field ini di response manapun yang terkait alur konfirmasi harga.
- `fee_kopdes_persen_terpakai` di `orders` adalah snapshot immutable setelah `harga_terkunci = true` — middleware backend DAN trigger database (lihat `database_schema.md`) sama-sama menolak perubahan.
- Kolom `harga_terkunci` pada tabel `orders` mencegah perubahan harga setelah disepakati — middleware backend harus menolak update pada order dengan `harga_terkunci = true`.

## Audit & Anti-Manipulasi

- Setiap catatan `intake_grading` wajib menyimpan `petugas_id` dan `created_at` yang tidak bisa diubah setelah submit (immutable log)
- `grade_override_manual` wajib dicatat setiap kali petugas mengoverride hasil Gemini Vision — ini bukan penyembunyian, tapi jejak transparansi bahwa keputusan akhir tetap manusia
- Kejanggalan (`kejanggalan_terdeteksi = true`) tidak boleh otomatis menurunkan skor konsistensi petani — status ini hanya memicu flag untuk review admin lewat `audit_log`, keputusan akhir tetap milik admin
- Sistem melakukan sampling audit acak: admin bisa menandai transaksi tertentu untuk diperiksa ulang lewat `POST /api/audit-log`
- `benchmark_margin_tengkulak` hanya bisa ditulis/diubah oleh `admin` — mencegah data acuan dimanipulasi pihak lain untuk membuat perbandingan Economic Impact Calculator terlihat lebih menguntungkan dari kenyataan

## Middleware Wajib untuk AI

- Middleware proteksi rute berdasarkan role (`requireRole(['petugas_kopdes'])` dsb.) di setiap endpoint yang tidak bersifat publik — implementasi di `/backend/src/api/middlewares/authMiddleware.ts`
- Middleware internal terpisah (`/backend/src/api/middlewares/internalServiceMiddleware.ts`) untuk endpoint yang hanya boleh dipanggil sistem, bukan role manapun
- Validasi input di sisi server untuk semua endpoint yang menerima data numerik (jumlah kg, harga, fee_persen) — tolak nilai negatif, nol untuk kg/harga, dan fee_persen di luar rentang 0-100
- Rate limiting sederhana pada endpoint `/api/intake-grading` karena memanggil Gemini API (hindari biaya tak terduga dari pemanggilan berulang), implementasi di `/backend/src/api/middlewares/rateLimitMiddleware.ts`
