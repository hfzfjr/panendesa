import { supabase } from './supabase';

export interface EconomicImpactResult {
  harga_rata_panendesa_per_kg: number;
  estimasi_harga_tengkulak_per_kg: number;
  selisih_persen: number;
  sumber_referensi_margin: string;
  periode_data: string;
}

export async function hitungEconomicImpact(
  komoditasId: number,
  desaId?: number
): Promise<EconomicImpactResult> {
  // 1. Ambil harga_acuan terbaru untuk komoditas
  const { data: hargaAcuanData, error: hargaAcuanError } = await supabase
    .from('harga_acuan')
    .select('harga_referensi_per_kg')
    .eq('komoditas_id', komoditasId)
    .order('tanggal', { ascending: false })
    .limit(1)
    .single();

  if (hargaAcuanError || !hargaAcuanData) {
    throw new Error('Harga acuan untuk komoditas ini tidak ditemukan');
  }

  const hargaReferensiPerKg = hargaAcuanData.harga_referensi_per_kg;

  // 2. Ambil benchmark_margin_tengkulak
  let marginData: any = null;
  let sumberReferensiMargin: string = '';

  // Prioritaskan desa_id spesifik kalau desaId diberikan
  if (desaId) {
    const { data: localMarginData, error: localMarginError } = await supabase
      .from('benchmark_margin_tengkulak')
      .select('margin_persen_min, margin_persen_max, sumber_referensi')
      .eq('komoditas_id', komoditasId)
      .eq('desa_id', desaId)
      .limit(1)
      .single();

    if (!localMarginError && localMarginData) {
      marginData = localMarginData;
      sumberReferensiMargin = localMarginData.sumber_referensi;
    }
  }

  // Fallback ke desa_id IS NULL (umum) kalau tidak ada override lokal
  if (!marginData) {
    const { data: generalMarginData, error: generalMarginError } = await supabase
      .from('benchmark_margin_tengkulak')
      .select('margin_persen_min, margin_persen_max, sumber_referensi')
      .eq('komoditas_id', komoditasId)
      .is('desa_id', null)
      .limit(1)
      .single();

    if (generalMarginError || !generalMarginData) {
      throw new Error('Benchmark margin tengkulak untuk komoditas ini tidak ditemukan');
    }

    marginData = generalMarginData;
    sumberReferensiMargin = generalMarginData.sumber_referensi;
  }

  const rataMargin = (marginData.margin_persen_min + marginData.margin_persen_max) / 2;
  const estimasiHargaTengkulak = hargaReferensiPerKg * (1 - rataMargin / 100);

  // 5. Ambil fair_share_distribution dalam 90 hari terakhir atau fallback ke seluruh histori
  const { hargaRataPanendesa, periodeData } = await getHargaRataPanendesa(komoditasId, desaId);

  // 8. Hitung selisih_persen
  const selisihPersen = ((hargaRataPanendesa - estimasiHargaTengkulak) / estimasiHargaTengkulak) * 100;

  return {
    harga_rata_panendesa_per_kg: hargaRataPanendesa,
    estimasi_harga_tengkulak_per_kg: estimasiHargaTengkulak,
    selisih_persen: selisihPersen,
    sumber_referensi_margin: sumberReferensiMargin,
    periode_data: periodeData
  };
}

async function getHargaRataPanendesa(
  komoditasId: number,
  desaId?: number
): Promise<{ hargaRataPanendesa: number; periodeData: string }> {
  const ninetyDaysAgo = new Date();
  ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

  // Helper function untuk query fair_share_distribution
  const queryFairShare = async (useDateFilter: boolean) => {
    let query: any;

    if (desaId) {
      // Query dengan filter desa_id
      query = supabase
        .from('fair_share_distribution')
        .select('jumlah_diterima, kontribusi_kg, orders!inner(komoditas_id), users!inner(desa_id)')
        .eq('users.desa_id', desaId);
    } else {
      // Query tanpa filter desa_id
      query = supabase
        .from('fair_share_distribution')
        .select('jumlah_diterima, kontribusi_kg, orders!inner(komoditas_id)');
    }

    query = query.eq('orders.komoditas_id', komoditasId);

    if (useDateFilter) {
      query = query.gte('created_at', ninetyDaysAgo.toISOString());
    }

    return query;
  };

  // Coba 90 hari terakhir dulu
  const { data: ninetyDaysData, error: ninetyDaysError } = await queryFairShare(true);

  if (!ninetyDaysError && ninetyDaysData && ninetyDaysData.length > 0) {
    const hargaPerKgList = ninetyDaysData.map((item: any) => item.jumlah_diterima / item.kontribusi_kg);
    const hargaRataPanendesa = hargaPerKgList.reduce((sum: number, val: number) => sum + val, 0) / hargaPerKgList.length;

    return {
      hargaRataPanendesa,
      periodeData: '90_hari_terakhir'
    };
  }

  // Fallback ke seluruh histori
  const { data: allHistoryData, error: allHistoryError } = await queryFairShare(false);

  if (allHistoryError || !allHistoryData || allHistoryData.length === 0) {
    throw new Error('Belum ada data transaksi untuk komoditas ini, perbandingan belum bisa dihitung');
  }

  const hargaPerKgList = allHistoryData.map((item: any) => item.jumlah_diterima / item.kontribusi_kg);
  const hargaRataPanendesa = hargaPerKgList.reduce((sum: number, val: number) => sum + val, 0) / hargaPerKgList.length;

  return {
    hargaRataPanendesa,
    periodeData: 'seluruh_histori'
  };
}
