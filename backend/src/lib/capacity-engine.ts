import { supabase } from './supabase';

/**
 * Capacity Engine - Agregasi kapasitas desa
 * 
 * Menghitung dua jenis kapasitas:
 * 1. Kapasitas Estimasi: dari laporan stok petani sebelum panen (stok_estimasi)
 * 2. Kapasitas Tervalidasi: dari hasil intake kopdes (intake_grading)
 */

export interface CapacityData {
  kapasitas_estimasi_kg: number;
  kapasitas_tervalidasi_kg: number;
  skor_konsistensi_desa: number;
}

/**
 * Hitung kapasitas agregat untuk satu desa
 * @param desa_id ID desa
 * @returns Data kapasitas (estimasi, tervalidasi, skor konsistensi)
 */
export async function getDesaCapacity(desa_id: number): Promise<CapacityData> {
  try {
    // 1. Hitung Kapasitas Estimasi (dari stok_estimasi)
    // Hanya hitung laporan dengan status 'menunggu_panen' atau 'tervalidasi'
    // Join dengan users untuk filter per desa
    const { data: estimasiData, error: estimasiError } = await supabase
      .from('stok_estimasi')
      .select('jumlah_kg, petani_id, users!inner(desa_id)')
      .eq('users.desa_id', desa_id)
      .in('status', ['menunggu_panen', 'tervalidasi']);

    if (estimasiError) throw estimasiError;

    const kapasitasEstimasi = estimasiData
      ?.reduce((sum: number, stok: any) => sum + parseFloat(stok.jumlah_kg.toString()), 0) || 0;

    // 2. Hitung Kapasitas Tervalidasi (dari intake_grading)
    // Kapasitas tervalidasi adalah sumber kebenaran untuk alokasi order
    // Join dengan stok_estimasi untuk filter status, lalu join dengan users untuk filter desa
    const { data: intakeData, error: intakeError } = await supabase
      .from('intake_grading')
      .select('berat_aktual_kg, stok_estimasi!inner(status, petani_id, users!inner(desa_id))')
      .eq('stok_estimasi.status', 'tervalidasi')
      .eq('stok_estimasi.users.desa_id', desa_id);

    if (intakeError) throw intakeError;

    const kapasitasTervalidasi = intakeData
      ?.reduce((sum: number, intake: any) => sum + parseFloat(intake.berat_aktual_kg.toString()), 0) || 0;

    // 3. Ambil skor konsistensi desa
    const { data: desaData, error: desaError } = await supabase
      .from('desa')
      .select('skor_konsistensi')
      .eq('id', desa_id)
      .single();

    if (desaError) throw desaError;

    return {
      kapasitas_estimasi_kg: kapasitasEstimasi,
      kapasitas_tervalidasi_kg: kapasitasTervalidasi,
      skor_konsistensi_desa: desaData?.skor_konsistensi || 100.00
    };
  } catch (error) {
    console.error('[Capacity Engine] Error calculating capacity:', error);
    throw error;
  }
}

/**
 * Hitung kapasitas agregat untuk semua desa (untuk admin/overview)
 * @returns Array data kapasitas per desa
 */
export async function getAllDesaCapacity(): Promise<Array<{ desa_id: number; nama_desa: string } & CapacityData>> {
  try {
    const { data: desaData, error: desaError } = await supabase
      .from('desa')
      .select('id, nama_desa, skor_konsistensi');

    if (desaError) throw desaError;

    const capacities = await Promise.all(
      (desaData || []).map(async (desa) => {
        const capacity = await getDesaCapacity(desa.id);
        return {
          desa_id: desa.id,
          nama_desa: desa.nama_desa,
          ...capacity
        };
      })
    );

    return capacities;
  } catch (error) {
    console.error('[Capacity Engine] Error getting all capacities:', error);
    throw error;
  }
}
