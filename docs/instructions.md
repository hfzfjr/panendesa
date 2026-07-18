# Instruksi Utama untuk AI Agent — PanenDesa

Ini adalah lembar instruksi induk. Sebelum menulis kode apapun, baca dokumen berikut sesuai konteks tugas:

1. `software_requirements.md` — apa yang sedang dibangun dan mengapa (baca dulu, selalu)
2. `user_flow.md` — alur pengguna detail sebelum membangun halaman/fitur baru
3. `database_schema.md` — struktur tabel, jangan buat tabel/kolom baru tanpa mengacu ke sini
4. `architecture.md` — struktur folder monorepo (`/frontend` + `/backend` terpisah) dan tech stack, ikuti persis
5. `api_spec.md` — kontrak endpoint, jangan ubah bentuk request/response tanpa alasan kuat
6. `security_policy.md` — aturan akses data, wajib diterapkan di setiap endpoint baru
7. `design_tokens.md` — token warna dan tipografi untuk semua komponen UI

## Aturan Umum

- **Jangan membuat fitur di luar Tier 1 dan Tier 2** yang tercantum di `software_requirements.md` kecuali diminta eksplisit. Fitur Tier 3 adalah roadmap, bukan tugas sekarang.
- **Prioritas pengerjaan Tier 1**: Trust Score Engine dan Smart Split adalah fitur unggulan (hero) — kerjakan dan uji ini dengan paling teliti. Grading foto (Gemini Vision) adalah fitur pendukung — jangan habiskan waktu berlebih di sini dibanding tiga algoritma utama (Smart Split, Trust Score, Fair-Share).
- **Konsistensi logika kapasitas**: selalu bedakan `kapasitas_estimasi` dan `kapasitas_tervalidasi` di setiap tempat — jangan pernah menggabungkan keduanya jadi satu angka tunggal.
- **Fee Kopdes selalu transparan**: `fee_persen` kopdes wajib ditampilkan ke petani dan pembeli SEBELUM harga final dikonfirmasi, tidak pernah disembunyikan atau dipotong diam-diam setelah kesepakatan.
- **Harga final yang sudah terkunci (`harga_terkunci = true`) tidak boleh diubah** oleh kode apapun, di layer manapun — terapkan proteksi di middleware DAN di level database (lihat trigger di `database_schema.md`).
- **Grading foto adalah sinyal pendukung, bukan otoritas tunggal.** Selalu sediakan jalur override manual oleh petugas kopdes yang terlihat jelas di UI, dan catat setiap override (`grade_override_manual`).
- **Semua pemanggilan Gemini Vision API harus lewat backend Express**, tidak pernah langsung dari kode frontend Next.js.
- **Economic Impact Calculator (Tier 2) selalu diberi label eksplisit** di UI bahwa datanya estimasi berbasis riset, bukan data transaksi tengkulak real-time.
- Gunakan bahasa Indonesia untuk semua teks yang tampil ke pengguna (label, pesan error, notifikasi). Kode, nama variabel, dan komentar teknis boleh dalam bahasa Inggris mengikuti konvensi umum.
- Ikuti struktur folder monorepo di `architecture.md` secara ketat — backend (`/backend`) dan frontend (`/frontend`) adalah dua proyek Node.js terpisah, jangan campur kode Express ke Next.js API Routes atau sebaliknya. Jangan menaruh logika bisnis di dalam file komponen UI atau route handler API secara langsung; gunakan folder `/backend/src/lib`.

## Konvensi Penulisan Kode

- TypeScript untuk seluruh kode frontend dan backend (bukan JavaScript polos)
- Fungsi perhitungan (fair-share, capacity aggregation, smart split, trust score, economic impact) ditulis sebagai fungsi murni yang bisa diuji terpisah tanpa perlu server berjalan — semua hidup di `/backend/src/lib`
- Setiap endpoint API wajib validasi input sebelum diproses (lihat `api_spec.md` dan `security_policy.md`)
- Gunakan penamaan tabel dan kolom persis seperti di `database_schema.md` — jangan mengubah penamaan (misal jangan ganti `kapasitas_tervalidasi_kg` jadi `validated_capacity`, atau `fee_kopdes_persen_terpakai` jadi `kopdes_fee`)
- Endpoint internal (`/api/orders/:id/validate`) tidak boleh punya tombol atau pemanggilan dari kode frontend manapun
- File route backend: satu file per domain di `/backend/src/api/routes/`, camelCase tanpa suffix (`stokEstimasi.ts`, bukan `stok-estimasi.routes.ts`). File middleware: `/backend/src/api/middlewares/`, camelCase dengan suffix `Middleware.ts` (`authMiddleware.ts`). Lihat `architecture.md` untuk struktur lengkap.

## Jika AI Ragu

Jika instruksi dari pengguna tampak bertentangan dengan salah satu dokumen di atas (misalnya diminta membuat fitur pembayaran otomatis penuh padahal itu di luar lingkup MVP, atau diminta menyembunyikan fee kopdes dari pembeli), AI harus **bertanya dulu** untuk konfirmasi sebelum melanjutkan, bukan langsung mengeksekusi asumsi sendiri.
