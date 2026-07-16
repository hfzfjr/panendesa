// TypeScript type definitions for PanenDesa database entities
// These interfaces match the database schema in docs/database_schema.md

export type UserRole = 'petani' | 'petugas_kopdes' | 'pembeli' | 'admin';
export type Grade = 'A' | 'B' | 'C';
export type OrderStatus = 'dikonfirmasi_sementara' | 'siap_kirim' | 'selesai' | 'dibatalkan';

export interface User {
  id: number;
  nama: string;
  role: UserRole;
  desa_id: number | null;
  email: string | null;
  password_hash: string;
  skor_konsistensi: number;
  created_at: Date;
}

export interface Desa {
  id: number;
  nama_desa: string;
  latitude: number | null;
  longitude: number | null;
  skor_konsistensi: number;
}

export interface Kopdes {
  id: number;
  desa_id: number;
  nama_kopdes: string;
  fee_persen: number;
  aktif: boolean;
}

export interface Komoditas {
  id: number;
  nama_komoditas: string;
  satuan: string;
}

export interface StokEstimasi {
  id: number;
  petani_id: number;
  komoditas_id: number;
  jumlah_kg: number;
  tanggal_target_panen: Date;
  status: string;
  created_at: Date;
}

export interface IntakeGrading {
  id: number;
  stok_estimasi_id: number;
  petugas_id: number;
  foto_url: string;
  skor_warna: number | null;
  skor_ukuran: number | null;
  persen_cacat: number | null;
  grade: Grade | null;
  grade_override_manual: boolean;
  berat_aktual_kg: number;
  kejanggalan_terdeteksi: boolean;
  created_at: Date;
}

export interface Order {
  id: number;
  pembeli_id: number;
  komoditas_id: number;
  kopdes_id: number;
  jumlah_diminta_kg: number;
  status: OrderStatus;
  harga_final_per_kg: number | null;
  fee_kopdes_persen_terpakai: number | null;
  harga_terkunci: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface OrderAllocation {
  id: number;
  order_id: number;
  desa_id: number;
  jumlah_dialokasikan_kg: number;
  urutan_prioritas: number | null;
  skor_prioritas: number | null;
}

export interface FairShareDistribution {
  id: number;
  order_id: number;
  petani_id: number;
  intake_grading_id: number;
  kontribusi_kg: number;
  pengali_grade: number;
  jumlah_diterima: number;
  created_at: Date;
}

export interface HargaAcuan {
  id: number;
  komoditas_id: number;
  harga_referensi_per_kg: number;
  sumber: string | null;
  tanggal: Date;
}

export interface BenchmarkMarginTengkulak {
  id: number;
  komoditas_id: number;
  desa_id: number | null;
  margin_persen_min: number;
  margin_persen_max: number;
  sumber_referensi: string;
  catatan: string | null;
  created_at: Date;
}

export interface AuditLog {
  id: number;
  admin_id: number;
  tabel_terkait: string;
  record_id: number;
  aksi: string;
  catatan: string | null;
  created_at: Date;
}

// Input types for API operations
export interface CreateStokEstimasiInput {
  petani_id: number;
  komoditas_id: number;
  jumlah_kg: number;
  tanggal_target_panen: Date;
}

export interface CreateIntakeGradingInput {
  stok_estimasi_id: number;
  petugas_id: number;
  foto_url: string;
  skor_warna?: number;
  skor_ukuran?: number;
  persen_cacat?: number;
  grade?: Grade;
  grade_override_manual?: boolean;
  berat_aktual_kg: number;
  kejanggalan_terdeteksi?: boolean;
}

export interface CreateOrderInput {
  pembeli_id: number;
  komoditas_id: number;
  kopdes_id: number;
  jumlah_diminta_kg: number;
}

export interface UpdateOrderInput {
  status?: OrderStatus;
  harga_final_per_kg?: number;
  fee_kopdes_persen_terpakai?: number;
  harga_terkunci?: boolean;
}

export interface CreateOrderAllocationInput {
  order_id: number;
  desa_id: number;
  jumlah_dialokasikan_kg: number;
  urutan_prioritas?: number;
  skor_prioritas?: number;
}

export interface CreateFairShareDistributionInput {
  order_id: number;
  petani_id: number;
  intake_grading_id: number;
  kontribusi_kg: number;
  pengali_grade: number;
  jumlah_diterima: number;
}

export interface CreateBenchmarkMarginInput {
  komoditas_id: number;
  desa_id?: number;
  margin_persen_min: number;
  margin_persen_max: number;
  sumber_referensi: string;
  catatan?: string;
}

export interface CreateAuditLogInput {
  admin_id: number;
  tabel_terkait: string;
  record_id: number;
  aksi: string;
  catatan?: string;
}
