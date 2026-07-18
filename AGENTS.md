# Project Rules

## Name Project: PanenDesa
Sistem koordinasi rantai pasok desa — orkestrator (bukan marketplace) yang
menghubungkan petani/pekebun, koperasi desa (Kopdes), dan pembeli B2B.

Baca `docs/instructions.md` SEBELUM menulis kode apapun. Dokumen itu
menentukan urutan dokumen lain yang harus dibaca sesuai konteks task.

## Tech Stack
- Frontend: Next.js (App Router) + TypeScript + Tailwind CSS — folder `/frontend`
- Backend: Node.js + Express + TypeScript — folder `/backend` (PROYEK TERPISAH, bukan Next.js API Routes — jangan pernah taruh logika backend di /frontend)
- Database: Supabase (PostgreSQL) — schema di `docs/database_schema.md`
- Vision AI: Gemini Vision — HANYA dipanggil dari `/backend`, tidak pernah dari kode frontend/client component

## Commands
- Frontend dev: `cd frontend && npm run dev`
- Backend dev: `cd backend && npm run dev`
- Backend test: `cd backend && npm test`
- Backend type check: `cd backend && npx tsc --noEmit`

## Dokumen Wajib Dicek Sebelum Kerja (di folder /docs)
- `docs/database_schema.md` — jangan buat tabel/kolom baru tanpa cek ini dulu, jangan ubah penamaan kolom yang sudah ada
- `docs/api_spec.md` — kontrak endpoint, jangan ubah bentuk request/response tanpa alasan kuat yang didiskusikan dulu
- `docs/architecture.md` — struktur folder & pemisahan frontend/backend, ikuti persis
- `docs/security_policy.md` — middleware role & validasi wajib di setiap endpoint baru
- `docs/design_tokens.md` — semua UI pakai token warna/spacing di sini, jangan bikin warna baru tanpa tanya dulu
- `docs/user_flow.md` — alur & urutan status sebelum bikin halaman/fitur baru

## Aturan Ketat (Non-Negotiable)
- `fee_persen` Kopdes selalu tampil terbuka ke petani & pembeli SEBELUM konfirmasi harga — tidak pernah disembunyikan atau dipotong diam-diam
- `harga_terkunci = true` tidak boleh diubah oleh kode apapun di layer manapun
- Grading Gemini Vision = sinyal pendukung, bukan otoritas tunggal — selalu sediakan jalur override manual petugas yang terlihat jelas di UI
- `POST /api/orders/:id/validate` TIDAK BOLEH dipanggil dari kode frontend manapun — endpoint internal murni
- Pisahkan logika bisnis (fair-share, smart split, trust score, economic impact) sebagai fungsi murni di `/backend/src/lib`, jangan tulis langsung di route handler
- Bahasa Indonesia untuk semua teks yang tampil ke pengguna (label, error, notifikasi). Kode, nama variabel, komentar teknis: bahasa Inggris.

## Jika Ragu
Berhenti dan tanya ke saya — jangan asumsi sendiri. Terutama kalau instruksi saya di chat tampak bertentangan dengan salah satu dokumen di atas.
