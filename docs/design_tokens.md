# Panduan Token Desain

## Palet Warna

| Token | Kode HEX | Penggunaan |
|---|---|---|
| `color-primary` | `#2E7D32` | Warna utama (hijau) — tombol aksi utama, header, elemen brand |
| `color-primary-dark` | `#1B5E20` | Hover/active state tombol utama |
| `color-secondary` | `#8D6E63` | Warna sekunder (cokelat tanah) — aksen kartu, ikon panen |
| `color-accent` | `#F9A825` | Warna aksen (amber) — badge grade, indikator perhatian, status "menunggu" |
| `color-success` | `#43A047` | Status berhasil (order selesai, grade A) |
| `color-warning` | `#FB8C00` | Status peringatan (kejanggalan terdeteksi, grade B) |
| `color-danger` | `#E53935` | Status gagal/kritis (grade C, order dibatalkan) |
| `color-neutral-900` | `#1C1B1F` | Teks utama |
| `color-neutral-600` | `#5F6368` | Teks sekunder |
| `color-neutral-100` | `#F5F5F0` | Latar belakang halaman (nuansa krem lembut) |
| `color-neutral-0` | `#FFFFFF` | Latar kartu/komponen |

## Tipografi

- Font utama: `Inter` (sans-serif, mudah dibaca di dashboard data)
- Ukuran: `text-xs` 12px, `text-sm` 14px, `text-base` 16px, `text-lg` 18px, `text-xl` 24px, `text-2xl` 32px
- Berat: `font-normal` 400 untuk body, `font-semibold` 600 untuk label/heading, `font-bold` 700 untuk angka kapasitas besar di dashboard

## Border Radius & Spacing

- `radius-sm`: 6px (input, badge)
- `radius-md`: 10px (card, button)
- `radius-lg`: 16px (modal, panel utama)
- Skala spacing: kelipatan 4px (4, 8, 12, 16, 24, 32, 48)

## Konfigurasi Tailwind (tambahan di `tailwind.config.js`)

```js
theme: {
  extend: {
    colors: {
      primary: { DEFAULT: '#2E7D32', dark: '#1B5E20' },
      secondary: '#8D6E63',
      accent: '#F9A825',
      success: '#43A047',
      warning: '#FB8C00',
      danger: '#E53935',
    },
    borderRadius: {
      sm: '6px',
      md: '10px',
      lg: '16px',
    }
  }
}
```

## Aturan Visual Khusus per Komponen

- **Badge grade produk:** Grade A = latar `color-success`, Grade B = latar `color-warning`, Grade C = latar `color-danger`, teks putih, `radius-sm`
- **Kartu kapasitas desa:** tampilkan dua angka berdampingan dengan label jelas — "Estimasi" (warna `color-secondary`, lebih muted) dan "Tervalidasi" (warna `color-primary`, lebih tegas) — jangan gabungkan jadi satu angka
- **Tombol aksi utama** (submit laporan, konfirmasi harga): `color-primary`, `radius-md`, teks putih semibold
- **Status order:** gunakan chip kecil berwarna sesuai status. **Perbaikan kontras:** untuk chip berlatar `color-accent` (amber, dipakai status `dikonfirmasi_sementara`), gunakan teks `color-neutral-900` (gelap), BUKAN putih — putih di atas amber gagal rasio kontras WCAG AA (di bawah 4.5:1). Chip `siap_kirim` (latar `color-primary`) dan `selesai` (latar `color-success`) tetap pakai teks putih karena keduanya cukup gelap untuk kontras aman.
- **Badge Skor Konsistensi (Trust Score):** pakai palet 3 warna yang sudah ada (jangan buat warna baru) berdasarkan rentang skor: ≥80 = latar `color-success`, 50–79 = latar `color-warning` (teks `color-neutral-900`, bukan putih, sama alasan di atas), <50 = latar `color-danger`. Tampilkan sebagai angka + label singkat (mis. "92 · Sangat Konsisten"), `radius-sm`.
- **Badge "Diubah Manual" pada grade:** saat petugas mengoverride hasil Gemini Vision (`grade_override_manual = true`), tampilkan tag kecil terpisah di sebelah badge grade — latar `color-neutral-100`, border 1px `color-secondary`, teks `color-neutral-600`, `radius-sm`, ikon pensil kecil. Tujuannya supaya override terlihat jelas sebagai jejak transparansi, bukan disembunyikan.
- **Callout Fee Kopdes:** sebelum tombol "Konfirmasi Harga", tampilkan kotak info terpisah (bukan teks kecil di footer) — latar `color-neutral-100`, border-left 4px `color-accent`, teks `color-neutral-900`, `radius-md`, isi: persentase fee, estimasi hasil bersih per kg setelah fee. Ini komponen yang **wajib muncul**, tidak boleh collapsible/tersembunyi di accordion.
- **Kartu Economic Impact Calculator (Tier 2):** pakai pola yang sama dengan kartu kapasitas desa — dua angka berdampingan ("Estimasi PanenDesa" warna `color-primary` tegas, "Estimasi Tengkulak" warna `color-neutral-600` muted), plus indikator selisih di bawahnya (`color-success` + panah naik jika PanenDesa lebih tinggi, `color-danger` + panah turun jika sebaliknya). Di bawah kartu, **wajib** teks kecil `color-neutral-600` `text-xs`: label sumber data (lihat `api_spec.md` field `sumber_referensi_margin`) — jangan biarkan angka ini berdiri sendiri tanpa keterangan sumber.

## Tujuan untuk AI

AI harus menghasilkan UI yang konsisten menggunakan token di atas — jangan menciptakan warna baru di luar palet ini kecuali untuk kondisi yang belum terdefinisi, dan jika demikian, tanyakan dulu sebelum menambahkan warna baru ke sistem.