# Product Requirements Document (PRD)
## PanenDesa — Sistem Koordinasi Rantai Pasok Desa

## 1. Deskripsi Singkat Proyek

**PanenDesa** adalah sistem web yang mengoordinasikan seluruh proses rantai pasok hasil pertanian dan perkebunan di tingkat desa — mulai dari pelaporan stok petani/pekebun, validasi kualitas di titik intake koperasi, pemenuhan permintaan pembeli (termasuk penggabungan lintas desa jika stok satu desa tidak cukup, dialokasikan lewat algoritma prioritas), hingga pembagian hasil penjualan yang transparan ke tiap petani.

**Ide inti:** desa tidak lagi tampil ke pasar sebagai kumpulan petani individual dengan stok kecil terpisah, melainkan sebagai **satu kesatuan pemasok kolektif** yang dikoordinasikan oleh Koperasi Desa (Kopdes). Aplikasi ini **bukan marketplace** (tempat jual-beli langsung), melainkan **orkestrator proses** — mengatur bagaimana permintaan, panen, validasi kualitas, dan distribusi berjalan efisien, dengan tiga algoritma orisinal (Smart Split, Trust/Consistency Score, Fair-Share Pricing) sebagai inti sistem.

**Beda dari tengkulak:** Kopdes tetap berperan sebagai titik logistik & validasi kualitas fisik, dan **boleh mengambil fee layanan** — tapi fee ini **tetap, kecil, dan wajib ditampilkan terbuka** ke petani maupun pembeli sebelum harga disepakati. Bedanya dengan tengkulak bukan soal ada-tidaknya perantara, tapi soal **transparansi**: setiap kg dan setiap rupiah bisa dilacak siapa dapat berapa, kapan pun, oleh petani sendiri.

## 2. Target Pengguna (Persona)

| Persona | Peran | Kebutuhan utama |
|---|---|---|
| Petani/Pekebun | Melaporkan estimasi stok sebelum panen | Cara lapor stok mudah, transparansi hasil bagi-hasil, trust score yang adil |
| Petugas Kopdes | Melakukan intake fisik, grading foto, timbang, konfirmasi order & harga | Alat kerja cepat di lapangan, riwayat tercatat rapi, fee yang jelas tanpa perlu negosiasi ulang tiap transaksi |
| Pembeli (UMKM/Buyer B2B) | Mengajukan permintaan volume tertentu | Kepastian pasokan terpenuhi, harga jelas, tahu desa mana yang mengisi order dan kenapa |
| Admin/Pengawas Desa | Memantau performa kopdes & audit | Dashboard ringkasan, log audit, skor konsistensi per petani & desa |

## 3. Fitur Utama (Prioritas)

### Tier 1 — Wajib berfungsi (fitur unggulan / hero)

1. **Real-Time Capacity Engine** — agregasi dua status kapasitas desa:
   - *Kapasitas Estimasi*: dari laporan petani/pekebun sebelum panen, dipakai untuk menawarkan ke pembeli
   - *Kapasitas Tervalidasi*: dari hasil intake kopdes, dipakai untuk alokasi order riil

2. **Smart Split Fulfillment** — algoritma alokasi lintas desa, bukan sekadar "cari desa terdekat". Jika realisasi kurang dari estimasi (di luar toleransi ±15%), sistem menghitung skor prioritas tiap desa tetangga berdasarkan kombinasi jarak dan skor konsistensi historis, lalu mengalokasikan kekurangan ke desa dengan skor tertinggi. Formula dan bobot didokumentasikan di `database_schema.md`, dapat dijelaskan sebagai algoritma (bukan black box) ke juri.

3. **Trust/Consistency Score Engine** — algoritma reputasi dua tingkat (petani & desa), dihitung dari histori akurasi estimasi vs realisasi panen tiap petani. Skor ini bukan sekadar metrik pasif — ia **secara langsung memengaruhi** prioritas Smart Split dan menjadi sinyal kepercayaan bagi pembeli. Ini fitur pembeda utama: sistem koordinasi berbasis data historis, bukan sekadar aplikasi pencatatan.

4. **Grading Kualitas di Titik Intake Koperasi (fitur pendukung)** — petugas kopdes memfoto produk saat masuk fisik ke koperasi. Gemini Vision menghitung skor awal (warna, ukuran, cacat permukaan) sebagai **sinyal pendukung**, divalidasi silang dengan berat aktual saat ditimbang, dan **selalu bisa dioverride manual oleh petugas** jika hasil vision meragukan. Grading foto bukan otoritas tunggal — ia mendukung, bukan menggantikan, penilaian dan skor konsistensi historis petani.

5. **Fair-Share Pricing Engine** — setelah harga final disepakati manual antara kopdes dan pembeli (dengan fee Kopdes yang sudah ditampilkan terbuka sejak awal), sistem mendistribusikan hasil ke tiap petani secara proporsional berdasarkan kuantitas dan grade kualitas kontribusinya, dengan rincian terbuka termasuk fee yang dipotong.

### Tier 2 — Memperkuat sistem

6. **Economic Impact Calculator** — kalkulator pelengkap yang membandingkan estimasi pendapatan petani lewat PanenDesa vs estimasi jalur tengkulak, berdasarkan `harga_acuan` dan `benchmark_margin_tengkulak` (data riset yang bisa disitasi, bukan data transaksi real-time — selalu diberi label jelas di UI). Lihat `api_spec.md` untuk kontrak endpoint.
7. Jadwal Pengumpulan Otomatis — jadwal antar hasil panen ke kopdes
8. Rute Distribusi Sederhana — tampilan rute kopdes ke pembeli

### Tier 3 — Roadmap (tidak wajib dibangun penuh untuk MVP)

9. Sistem verifikasi banding grading ke pengawas desa
10. Notifikasi WhatsApp/SMS
11. Prediksi permintaan pasar
12. Pembayaran digital terintegrasi (QRIS)
13. Mode input offline untuk kopdes

## 4. Batasan Ruang Lingkup (Non-Goals)

- Sistem **tidak** menjadi platform jual-beli langsung antar individu (bukan marketplace C2C)
- Sistem **tidak** menegosiasikan harga secara otomatis — harga final tetap kesepakatan manual kopdes-pembeli, sistem hanya mendistribusikan hasilnya
- Sistem **tidak** menjamin kualitas internal produk (rasa, kadar air) — grading foto adalah penyaringan awal berbasis sinyal pendukung, bukan pengganti pemeriksaan kualitas penuh
- Sistem **tidak** mencakup peternakan/hasil ternak — fokus MVP murni hasil pertanian dan perkebunan (petani & pekebun)
- Sistem **tidak** mengklaim data harga tengkulak real-time — Economic Impact Calculator (Tier 2) selalu berbasis estimasi riset yang disitasi
- Fee Kopdes **tidak boleh** disembunyikan atau dinegosiasikan diam-diam per transaksi — harus tetap (fixed percentage) dan terbuka
- Cakupan awal (fase 1) dibatasi ke desa yang memiliki koperasi aktif

## 5. Tujuan untuk AI

AI hanya boleh membangun fitur-fitur di atas sesuai tier prioritas. Prioritaskan pengerjaan Trust Score, Smart Split, dan Fair-Share (Tier 1, fitur unggulan) sebelum Grading foto — grading adalah pendukung, bukan pusat sistem. Jangan menambahkan fitur transaksi jual-beli langsung, sistem pembayaran otomatis penuh, logika negosiasi harga otomatis, atau fitur peternakan — semuanya di luar lingkup MVP ini.
