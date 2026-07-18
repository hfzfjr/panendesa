import { supabase } from './supabase';

// Interface untuk riwayat transaksi
export interface RiwayatTransaksi {
  estimasi_kg: number;
  realisasi_kg: number;
}

/**
 * Hitung skor transaksi individual berdasarkan selisih estimasi vs realisasi
 * Formula: 100 - (ABS(estimasi - realisasi) / estimasi * 100)
 * Clamp hasil ke minimum 0 (jangan sampai negatif)
 */
export function hitungSkorTransaksi(estimasiKg: number, realisasiKg: number): number {
  if (estimasiKg <= 0) {
    return 0; // Invalid estimasi, return 0
  }

  const selisihPersen = Math.abs(estimasiKg - realisasiKg) / estimasiKg * 100;
  const skor = 100 - selisihPersen;

  // Clamp ke minimum 0
  return Math.max(0, skor);
}

/**
 * Hitung skor konsistensi petani dari riwayat transaksi
 * Formula: rata-rata skor_transaksi dari N transaksi terakhir (N=10)
 */
export function hitungSkorKonsistensiPetani(riwayatTransaksi: RiwayatTransaksi[]): number {
  if (riwayatTransaksi.length === 0) {
    return 100.00; // Default untuk petani baru tanpa riwayat
  }

  // Ambil N transaksi terakhir (N=10)
  const N = 10;
  const transaksiTerakhir = riwayatTransaksi.slice(-N);

  // Hitung rata-rata skor transaksi
  const totalSkor = transaksiTerakhir.reduce((sum, tx) => {
    return sum + hitungSkorTransaksi(tx.estimasi_kg, tx.realisasi_kg);
  }, 0);

  const rataRata = totalSkor / transaksiTerakhir.length;

  // Round ke 2 desimal
  return Math.round(rataRata * 100) / 100;
}

/**
 * Update skor konsistensi petani dan desa
 * Fungsi ini membutuhkan akses database untuk:
 * 1. Ambil histori transaksi petani
 * 2. Update skor_konsistensi petani
 * 3. Update skor_konsistensi desa (rata-rata tertimbang)
 */
export async function updateTrustScore(petaniId: number): Promise<void> {
  try {
    // 1. Ambil histori transaksi petani (join stok_estimasi + intake_grading)
    // Pertama ambil stok_estimasi petani, lalu join dengan intake_grading
    const { data: stokEstimasiList, error: stokError } = await supabase
      .from('stok_estimasi')
      .select('id, jumlah_kg')
      .eq('petani_id', petaniId);

    if (stokError) {
      console.error('Error fetching stok estimasi:', stokError);
      return;
    }

    if (!stokEstimasiList || stokEstimasiList.length === 0) {
      return; // Tidak ada stok estimasi untuk petani ini
    }

    const stokIds = stokEstimasiList.map(s => s.id);

    // Ambil intake_grading untuk stok_estimasi ini
    const { data: riwayat, error: riwayatError } = await supabase
      .from('intake_grading')
      .select('stok_estimasi_id, berat_aktual_kg')
      .in('stok_estimasi_id', stokIds)
      .order('created_at', { ascending: false })
      .limit(10);

    if (riwayatError) {
      console.error('Error fetching intake grading:', riwayatError);
      return;
    }

    console.log(`[Trust Score] Petani ${petaniId}: Found ${riwayat?.length || 0} intake records`);

    // 2. Hitung skor konsistensi petani
    // Map stok_estimasi_id ke jumlah_kg
    const stokMap = new Map(stokEstimasiList.map(s => [s.id, s.jumlah_kg]));

    const riwayatTransaksi: RiwayatTransaksi[] = (riwayat || []).map((item: any) => {
      const estimasiKg = stokMap.get(item.stok_estimasi_id);
      return {
        estimasi_kg: estimasiKg || 0,
        realisasi_kg: item.berat_aktual_kg
      };
    });

    const skorPetani = hitungSkorKonsistensiPetani(riwayatTransaksi);
    console.log(`[Trust Score] Petani ${petaniId}: Calculated score ${skorPetani}`);

    // 3. Update skor_konsistensi petani
    const { error: updatePetaniError } = await supabase
      .from('users')
      .update({ skor_konsistensi: skorPetani })
      .eq('id', petaniId);

    if (updatePetaniError) {
      console.error('Error updating petani trust score:', updatePetaniError);
      return;
    }

    // 4. Ambil desa_id petani untuk update skor desa
    const { data: petaniData, error: petaniDataError } = await supabase
      .from('users')
      .select('desa_id')
      .eq('id', petaniId)
      .single();

    if (petaniDataError || !petaniData) {
      console.error('Error fetching petani desa_id:', petaniDataError);
      return;
    }

    // 5. Update skor konsistensi desa (rata-rata tertimbang)
    await updateDesaTrustScore(petaniData.desa_id);

  } catch (error) {
    console.error('Error in updateTrustScore:', error);
  }
}

/**
 * Update skor konsistensi desa (rata-rata tertimbang semua petani aktif)
 * Formula: rata-rata tertimbang skor_konsistensi petani di desa
 * Bobot = jumlah transaksi petani (supaya petani jarang lapor tidak mendominasi)
 * 
 * Optimized: Hanya 3 query total (bukan N+1), berapapun jumlah petani
 */
async function updateDesaTrustScore(desaId: number): Promise<void> {
  try {
    console.log(`[Trust Score] Desa ${desaId}: Starting update`);

    // Query 1: Ambil semua petani di desa ini dengan skor
    const { data: petaniList, error: petaniError } = await supabase
      .from('users')
      .select('id, skor_konsistensi')
      .eq('desa_id', desaId)
      .eq('role', 'petani');

    if (petaniError) {
      console.error('Error fetching petani list:', petaniError);
      return;
    }

    if (!petaniList || petaniList.length === 0) {
      console.log(`[Trust Score] Desa ${desaId}: No petani found`);
      return;
    }

    console.log(`[Trust Score] Desa ${desaId}: Found ${petaniList.length} petani`);

    const petaniIds = petaniList.map(p => p.id);

    // Query 2: Ambil semua stok_estimasi untuk semua petani di desa ini sekaligus
    const { data: stokList, error: stokError } = await supabase
      .from('stok_estimasi')
      .select('id, petani_id')
      .in('petani_id', petaniIds);

    if (stokError) {
      console.error('Error fetching stok list:', stokError);
      return;
    }

    // Query 3: Ambil semua intake_grading untuk semua stok_estimasi sekaligus
    const stokIds = stokList?.map(s => s.id) || [];
    const { data: intakeList, error: intakeError } = await supabase
      .from('intake_grading')
      .select('stok_estimasi_id')
      .in('stok_estimasi_id', stokIds);

    if (intakeError) {
      console.error('Error fetching intake list:', intakeError);
      return;
    }

    // Hitung di memory: kelompokkan intake per petani
    const stokToPetaniMap = new Map(stokList?.map(s => [s.id, s.petani_id]) || []);
    const petaniTransactionCount = new Map<number, number>();

    // Initialize count to 0 for all petani
    petaniIds.forEach(id => petaniTransactionCount.set(id, 0));

    // Count intake per petani
    intakeList?.forEach(intake => {
      const petaniId = stokToPetaniMap.get(intake.stok_estimasi_id);
      if (petaniId) {
        const current = petaniTransactionCount.get(petaniId) || 0;
        petaniTransactionCount.set(petaniId, current + 1);
      }
    });

    // Hitung rata-rata tertimbang
    let totalBobot = 0;
    let totalSkorTertimbang = 0;

    petaniList.forEach(petani => {
      const count = petaniTransactionCount.get(petani.id) || 0;
      const bobot = count > 0 ? count : 1; // Minimum bobot 1 untuk petani baru
      totalBobot += bobot;
      totalSkorTertimbang += petani.skor_konsistensi * bobot;
      console.log(`[Trust Score] Petani ${petani.id}: score=${petani.skor_konsistensi}, transactions=${count}, weight=${bobot}`);
    });

    const skorDesa = totalBobot > 0 ? totalSkorTertimbang / totalBobot : 100.00;
    const skorDesaRounded = Math.round(skorDesa * 100) / 100;

    console.log(`[Trust Score] Desa ${desaId}: totalWeight=${totalBobot}, weightedScore=${totalSkorTertimbang}, finalScore=${skorDesaRounded}`);

    // Query 4: Update skor desa
    const { error: updateDesaError } = await supabase
      .from('desa')
      .update({ skor_konsistensi: skorDesaRounded })
      .eq('id', desaId);

    if (updateDesaError) {
      console.error('Error updating desa trust score:', updateDesaError);
    } else {
      console.log(`[Trust Score] Desa ${desaId}: Successfully updated to ${skorDesaRounded}`);
    }

  } catch (error) {
    console.error('Error in updateDesaTrustScore:', error);
  }
}
