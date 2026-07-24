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

Jika instruksi dari pengguna tampak bertentangan dengan salahatu dokumen di atas (misalnya diminta membuat fitur pembayaran otomatis penuh padahal itu di luar lingkup MVP, atau diminta menyembunyikan fee kopdes dari pembeli), AI harus **bertanya dulu** untuk konfirmasi sebelum melanjutkan, bukan langsung mengeksekusi asumsi sendiri.

## TODO / Known Gaps

- **Admin User Management Endpoint**: Perlu endpoint `POST /api/admin/users` dengan `requireRole(['admin'])` untuk create user dengan role petani/kopdes/admin. Saat ini self-registration di `POST /api/auth/register` sudah di-hardcode ke `role='pembeli'` untuk mencegah privilege escalation, dan tidak ada cara bagi admin untuk create user dengan role lain selain lewat `seed.ts` manual. Endpoint ini harus menerima parameter role yang divalidasi dan dilindungi dengan middleware admin-only.

- **Rate Limiting for Auth Endpoints**: Sudah diimplementasikan menggunakan `express-rate-limit` dengan limit 10 request per menit per IP untuk login, register, dan oauth-exchange. Rate limiting di-skip saat test (NODE_ENV=test). Di production, endpoint-endpoint ini dilindungi dari brute force attack.

- **Refresh Token System**: Sudah diimplementasikan untuk persistent login. Access token berdurasi 2 jam, refresh token berdurasi 30 hari. Refresh token disimpan sebagai SHA-256 hash di database untuk keamanan. Endpoint `/api/auth/refresh` untuk dapat access token baru, `/api/auth/logout` untuk revoke refresh token. Migration `04_refresh_tokens.sql` perlu dijalankan di Supabase.

## OAuth Integration Flow

Untuk implementasi Google OAuth di frontend, ikuti alur berikut:

1. **Initiate OAuth**: Panggil `supabase.auth.signInWithOAuth({ provider: 'google' })` dari frontend untuk memulai login Google
2. **Get Access Token**: Setelah user berhasil login, ambil `access_token` dari session Supabase (`supabase.auth.getSession()`)
3. **Token Exchange**: Kirim `access_token` tersebut ke endpoint backend `POST /api/auth/oauth-exchange`
4. **Receive Custom JWT**: Backend akan mengembalikan custom JWT token yang kompatibel dengan sistem auth manual (format: `{ user_id, role, desa_id, email }`)
5. **Store Custom Token**: Simpan custom JWT token ini dan gunakan untuk semua request berikutnya ke backend (header: `Authorization: Bearer <token>`)
6. **Profile Completion Check**: Dari response `/api/auth/oauth-exchange`, cek field `profile_completed`. Kalau `false`, redirect user ke form lengkapi profil sebelum lanjut ke aplikasi utama.

**Catatan Penting**:
- Token Supabase HANYA dipakai sekali saat exchange, tidak dipakai lagi setelahnya
- Custom JWT yang dikembalikan dari `/api/auth/oauth-exchange` memiliki struktur IDENTIK dengan token dari login manual, sehingga middleware `verifyToken` yang sudah ada TIDAK perlu diubah
- Endpoint `/api/auth/oauth-exchange` dilindungi rate limiting (10 request per menit per IP) untuk mencegah abuse

## Refresh Token Flow (Persistent Login)

Untuk implementasi refresh token di frontend agar user tetap login tanpa perlu re-authentication:

1. **Login (Manual atau OAuth)**:
   - Setelah login sukses (manual atau via `/api/auth/oauth-exchange`), simpan `access_token` dan `refresh_token` dari response
   - **Storage Recommendation**: Simpan `access_token` di memory/state (React state, Redux, Zustand) dan `refresh_token` di httpOnly cookie jika infrastruktur mendukung, atau localStorage jika belum ada setup cookie server-side
   - **Trade-off**: httpOnly cookie lebih aman dari XSS attack, tapi membutuhkan setup server-side cookie. localStorage lebih mudah implementasikan tapi rentan XSS jika ada vulnerability di frontend

2. **Axios/Fetch Interceptor**:
   - Setup interceptor untuk otomatis handle 401 (access token expired)
   - Saat request kena 401:
     a. Panggil `POST /api/auth/refresh` dengan `refresh_token` tersimpan
     b. Jika success: simpan `access_token` baru, retry request asli
     c. Jika fail (401): redirect ke halaman login, hapus kedua token dari storage

3. **Logout**:
   - Panggil `POST /api/auth/logout` dengan `refresh_token`
   - Hapus `access_token` dan `refresh_token` dari storage
   - Redirect ke halaman login

**Catatan Penting**:
- Access token berdurasi 2 jam, refresh token berdurasi 30 hari
- Refresh token disimpan sebagai SHA-256 hash di database (bukan plain text) untuk keamanan
- Endpoint `/api/auth/refresh` dan `/api/auth/logout` juga dilindungi rate limiting (10 request per menit per IP)
- Housekeeping: Jalankan query `DELETE FROM refresh_tokens WHERE expires_at < NOW()` secara berkala (misal bulanan) untuk membersihkan token expired
