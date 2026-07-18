# Arsitektur Folder & Tech Stack — PanenDesa

## Tech Stack

| Layer | Teknologi | Alasan |
|---|---|---|
| Frontend | Next.js (App Router) + Tailwind CSS | Cepat dibangun, banyak referensi untuk AI agent |
| Backend | Node.js + Express.js (proyek terpisah, bukan API Route Next.js) | Memisahkan tanggung jawab frontend/backend secara eksplisit, memungkinkan kerja paralel tim, dan menunjukkan kedalaman arsitektur (bukan hanya Next.js full-stack default) |
| Database | PostgreSQL, di-hosting via Supabase | Relasional, sesuai skema di database_schema.md. RLS Postgres native **sengaja dimatikan** (lihat `01_init_schema_and_rls.sql` / `/backend/supabase/migrations`) — auth pakai JWT custom (bukan Supabase Auth), otorisasi ditegakkan penuh di middleware Express, bukan di level Postgres |
| Vision AI | Gemini API (model image understanding) | **Sinyal pendukung** untuk grading foto — bukan sumber kebenaran tunggal, selalu bisa dioverride manual oleh petugas |
| Auth | JWT sederhana + role-based middleware | Cukup untuk 4 peran (petani, petugas_kopdes, pembeli, admin) |
| Maps/Rute | Google Maps API (tampilan rute sederhana, bukan optimasi rute) | Tier 2 |

**Catatan penting:** Frontend dan backend adalah **dua proyek Node.js terpisah** dengan `package.json` masing-masing, dijalankan sebagai dua proses berbeda saat development (`npm run dev` di masing-masing folder). Backend tidak menggunakan Next.js API Routes sama sekali — semua endpoint di `api_spec.md` diimplementasikan sebagai Express routes.

## Struktur Direktori (Monorepo)

```
/panendesa                     <- root repo
  README.md
  .gitignore
  software_requirements.md
  user_flow.md
  database_schema.md
  architecture.md
  api_spec.md
  security_policy.md
  design_tokens.md
  instructions.md

  /frontend                    <- proyek Next.js terpisah
    package.json
    next.config.js
    tailwind.config.js
    /app
      /(dashboard)
        /petani                -> halaman lapor stok, lihat rincian bagi hasil, trust score sendiri
        /kopdes                -> halaman intake, grading, konfirmasi harga (dengan fee terlihat)
        /pembeli                -> halaman ajukan permintaan, lihat status order
        /admin                  -> monitoring, audit log, economic impact (Tier 2)
    /components
      /ui                       -> komponen reusable (button, card, table, dst)
      /charts                   -> visualisasi kapasitas, trust score, distribusi
    /lib
      api-client.ts             -> wrapper fetch ke backend Express (base URL dari env var)
    .env.local                  -> NEXT_PUBLIC_API_URL, dst (tidak pernah menyimpan Gemini API key di sini)

  /backend                     <- proyek Express.js terpisah
    package.json
    tsconfig.json
    /src
      config.ts                     -> load dotenv (WAJIB diimpor baris PERTAMA di index.ts,
                                        sebelum import lain manapun yang baca process.env)
      index.ts                      -> entry point tunggal: setup Express app, mount semua
                                        routes, DAN listen port (tidak dipisah app.ts/server.ts)
      /api
        /routes                     -> satu file per domain, camelCase, TANPA suffix .routes.ts
          auth.ts
          stokEstimasi.ts
          intakeGrading.ts
          capacity.ts
          trustScore.ts
          orders.ts
          fairShare.ts
          economicImpact.ts         -> Tier 2
          auditLog.ts
        /middlewares                -> camelCase, suffix "Middleware.ts"
          authMiddleware.ts         -> validasi JWT + role
          internalServiceMiddleware.ts -> proteksi endpoint /orders/:id/validate
          rateLimitMiddleware.ts    -> khusus /intake-grading (panggilan Gemini API)
      /lib
        supabase.ts                 -> koneksi Supabase (supabaseAdmin untuk operasi backend)
        gemini-vision.ts            -> wrapper pemanggilan Gemini API untuk grading
        fair-share-calc.ts          -> fungsi murni: distribusi hasil (termasuk potongan fee kopdes)
        capacity-engine.ts          -> fungsi murni: agregasi kapasitas
        smart-split.ts              -> fungsi murni: formula skor_prioritas_desa & alokasi
        trust-score-engine.ts       -> fungsi murni: skor_konsistensi petani & desa
        economic-impact-calc.ts     -> fungsi murni: perbandingan vs benchmark tengkulak (Tier 2)
      /types
        index.ts                    -> shared TypeScript types/interfaces (User, Order, dst)
    /supabase
      /migrations
        01_init_schema_and_rls.sql  -> DDL & RLS policy, dijalankan di Supabase SQL Editor
                                        (konvensi folder Supabase CLI standar — sesuaikan lokasi
                                        ini kalau tim menaruhnya di tempat lain)
    .env                            -> SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY,
                                        GEMINI_API_KEY, JWT_SECRET, INTERNAL_SERVICE_KEY, PORT
```

## Prinsip Arsitektur untuk AI

- **Backend dan frontend adalah dua repo/proses terpisah dalam satu monorepo.** Jangan campur kode Express ke dalam `/frontend/app/api`, dan jangan buat Next.js API Routes sebagai pengganti Express endpoint — semua business logic backend hidup di `/backend`.
- **Frontend berkomunikasi ke backend murni via HTTP fetch** ke base URL yang di-set di `.env.local` (`NEXT_PUBLIC_API_URL`), melalui `lib/api-client.ts`. Tidak ada shared server-side code langsung antara kedua proyek.
- **Pisahkan logika bisnis dari route handler.** Fungsi seperti `fair-share-calc.ts`, `smart-split.ts`, `trust-score-engine.ts`, dan `economic-impact-calc.ts` harus jadi fungsi murni di `/backend/src/lib`, dipanggil dari route Express — bukan ditulis langsung di dalam handler, supaya bisa diuji terpisah (unit test tanpa perlu server berjalan).
- **Jangan panggil Gemini API langsung dari frontend.** Semua pemanggilan Gemini Vision harus lewat backend (`POST /api/intake-grading`) supaya API key tidak pernah terekspos ke klien — API key hanya ada di `/backend/.env`, tidak pernah di `/frontend/.env.local`.
- **Ikuti App Router Next.js** di frontend — gunakan folder-based routing, server components untuk halaman yang murni menampilkan data (fetch dari backend saat render), client components hanya untuk bagian interaktif (form upload foto, dsb).
- **Satu folder route di backend = satu tanggung jawab domain.** Jangan campur logika grading dengan logika order di file yang sama.
- **Endpoint internal (`/orders/:id/validate`) tidak boleh dipanggil dari frontend sama sekali** — hanya dipanggil backend-ke-backend (dalam proses yang sama, dari kode lain di `/backend/src`), diamankan `internalServiceMiddleware.ts`.
- Backend memakai Supabase (`@supabase/supabase-js`) sebagai client Postgres — semua query privileged pakai `supabaseAdmin` (service role key) dari `/backend/src/lib/supabase.ts`, bukan client `anon`. Service role key **hanya** ada di `/backend/.env`, tidak pernah di frontend.
- **`config.ts` wajib menjadi import PALING PERTAMA** di `index.ts`, sebelum import apapun yang membaca `process.env` (termasuk `lib/supabase.ts`) — urutan import ESM menentukan urutan eksekusi, salah urutan menyebabkan env variable belum ter-load saat dibutuhkan.
