import { supabase } from './supabase';
import { getDesaCapacity } from './capacity-engine';

/**
 * Smart Split Engine - Algoritma prioritas desa untuk alokasi order
 * 
 * Menghitung skor prioritas desa berdasarkan:
 * 1. Jarak (semakin dekat, semakin tinggi prioritas)
 * 2. Konsistensi (semakin tinggi skor konsistensi, semakin tinggi prioritas)
 * 
 * Formula: skor_prioritas = (bobot_jarak * (1/jarak_km)) + (bobot_konsistensi * skor_konsistensi)
 */

export interface DesaPrioritas {
  desa_id: number;
  nama_desa: string;
  jarak_km: number;
  skor_konsistensi: number;
  kapasitas_tervalidasi_kg: number;
  skor_prioritas: number;
}

export interface SmartSplitResult {
  order_id: number;
  jumlah_diminta_kg: number;
  alokasi: Array<{
    desa_id: number;
    jumlah_dialokasikan_kg: number;
    urutan_prioritas: number;
    skor_prioritas: number;
  }>;
  total_teralokasi_kg: number;
  status: 'terpenuhi' | 'sebagian' | 'tidak_terpenuhi';
}

export interface SmartSplitConfig {
  bobot_jarak: number;
  bobot_konsistensi: number;
}

const DEFAULT_CONFIG: SmartSplitConfig = {
  bobot_jarak: 0.6,
  bobot_konsistensi: 0.4
};

/**
 * Hitung skor prioritas desa
 * @param desa_id ID desa
 * @param kopdes_id ID kopdes (untuk ambil jarak)
 * @param config Konfigurasi bobot
 * @returns Data prioritas desa
 */
export async function hitungPrioritasDesa(
  desa_id: number,
  kopdes_id: number,
  config: SmartSplitConfig = DEFAULT_CONFIG
): Promise<DesaPrioritas | null> {
  try {
    // Ambil data desa (nama, skor konsistensi, koordinat)
    const { data: desaData, error: desaError } = await supabase
      .from('desa')
      .select('id, nama_desa, skor_konsistensi, latitude, longitude')
      .eq('id', desa_id)
      .single();

    if (desaError || !desaData) {
      console.error(`[Smart Split] Desa ${desa_id} tidak ditemukan`);
      return null;
    }

    // Ambil data kopdes (koordinat)
    const { data: kopdesData, error: kopdesError } = await supabase
      .from('kopdes')
      .select('id, desa_id')
      .eq('id', kopdes_id)
      .single();

    if (kopdesError || !kopdesData) {
      console.error(`[Smart Split] Kopdes ${kopdes_id} tidak ditemukan`);
      return null;
    }

    // Ambil koordinat desa kopdes
    const { data: desaKopdesData } = await supabase
      .from('desa')
      .select('latitude, longitude')
      .eq('id', kopdesData.desa_id)
      .single();

    // Hitung jarak (Haversine formula) dalam km
    const jarakKm = hitungJarak(
      desaData.latitude,
      desaData.longitude,
      desaKopdesData?.latitude,
      desaKopdesData?.longitude
    );

    // Ambil kapasitas tervalidasi desa
    const capacity = await getDesaCapacity(desa_id);

    // Hitung skor prioritas
    const skorPrioritas = 
      (config.bobot_jarak * (1 / (jarakKm || 1))) + // Hindari pembagian dengan 0
      (config.bobot_konsistensi * (desaData.skor_konsistensi / 100)); // Normalisasi ke 0-1

    return {
      desa_id: desaData.id,
      nama_desa: desaData.nama_desa,
      jarak_km: jarakKm,
      skor_konsistensi: desaData.skor_konsistensi,
      kapasitas_tervalidasi_kg: capacity.kapasitas_tervalidasi_kg,
      skor_prioritas: skorPrioritas
    };
  } catch (error) {
    console.error('[Smart Split] Error calculating priority:', error);
    return null;
  }
}

/**
 * Hitung jarak antara dua koordinat (Haversine formula dalam km)
 */
function hitungJarak(
  lat1: number | null,
  lon1: number | null,
  lat2: number | null,
  lon2: number | null
): number {
  if (!lat1 || !lon1 || !lat2 || !lon2) {
    return 999; // Default jarak jika koordinat tidak lengkap
  }

  const R = 6371; // Radius bumi dalam km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * Jalankan algoritma Smart Split untuk satu order
 * @param order_id ID order
 * @param jumlah_diminta_kg Jumlah yang diminta pembeli
 * @param kopdes_id ID kopdes yang memproses order
 * @param config Konfigurasi bobot
 * @returns Hasil alokasi smart split
 */
export async function runSmartSplit(
  order_id: number,
  jumlah_diminta_kg: number,
  kopdes_id: number,
  config: SmartSplitConfig = DEFAULT_CONFIG
): Promise<SmartSplitResult> {
  try {
    console.log(`[Smart Split] Processing order ${order_id}, demand: ${jumlah_diminta_kg}kg`);

    // 1. Ambil semua desa yang aktif dengan kopdes tersebut
    const { data: kopdesList, error: kopdesError } = await supabase
      .from('kopdes')
      .select('desa_id')
      .eq('id', kopdes_id)
      .eq('aktif', true);

    if (kopdesError || !kopdesList || kopdesList.length === 0) {
      throw new Error('Tidak ada desa aktif untuk kopdes ini');
    }

    // 2. Hitung prioritas untuk semua desa
    const desaPrioritasList: DesaPrioritas[] = [];
    for (const kopdes of kopdesList) {
      const prioritas = await hitungPrioritasDesa(kopdes.desa_id, kopdes_id, config);
      if (prioritas && prioritas.kapasitas_tervalidasi_kg > 0) {
        desaPrioritasList.push(prioritas);
      }
    }

    // 3. Sort berdasarkan skor prioritas (descending)
    desaPrioritasList.sort((a, b) => b.skor_prioritas - a.skor_prioritas);

    // 4. Alokasikan order ke desa berdasarkan prioritas
    const alokasi: SmartSplitResult['alokasi'] = [];
    let sisaKebutuhan = jumlah_diminta_kg;
    let urutan = 1;

    for (const desa of desaPrioritasList) {
      if (sisaKebutuhan <= 0) break;

      // Cek toleransi ±15% dari kapasitas desa
      const kapasitasDesa = desa.kapasitas_tervalidasi_kg;
      const toleransiMin = kapasitasDesa * 0.85;
      const toleransiMax = kapasitasDesa * 1.15;

      // Jika sisa kebutuhan dalam toleransi, ambil semua dari desa ini
      let jumlahAmbil: number;
      if (sisaKebutuhan >= toleransiMin && sisaKebutuhan <= toleransiMax) {
        jumlahAmbil = sisaKebutuhan;
      } else if (sisaKebutuhan < toleransiMin) {
        // Sisa kebutuhan terlalu kecil, skip desa ini (cari desa dengan kapasitas lebih kecil)
        continue;
      } else {
        // Ambil maksimal kapasitas desa
        jumlahAmbil = kapasitasDesa;
      }

      alokasi.push({
        desa_id: desa.desa_id,
        jumlah_dialokasikan_kg: jumlahAmbil,
        urutan_prioritas: urutan++,
        skor_prioritas: desa.skor_prioritas
      });

      sisaKebutuhan -= jumlahAmbil;
    }

    // 5. Tentukan status
    const totalTeralokasi = alokasi.reduce((sum, a) => sum + a.jumlah_dialokasikan_kg, 0);
    let status: 'terpenuhi' | 'sebagian' | 'tidak_terpenuhi';
    if (totalTeralokasi === jumlah_diminta_kg) {
      status = 'terpenuhi';
    } else if (totalTeralokasi > 0) {
      status = 'sebagian';
    } else {
      status = 'tidak_terpenuhi';
    }

    console.log(`[Smart Split] Result: ${status}, allocated: ${totalTeralokasi}kg / ${jumlah_diminta_kg}kg`);

    return {
      order_id,
      jumlah_diminta_kg,
      alokasi,
      total_teralokasi_kg: totalTeralokasi,
      status
    };
  } catch (error) {
    console.error('[Smart Split] Error running smart split:', error);
    throw error;
  }
}
