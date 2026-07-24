import { Router, Request, Response } from 'express';
import { supabase } from '../../lib/supabase';
import { verifyToken } from '../middlewares/authMiddleware';
import { hitungEconomicImpact } from '../../lib/economic-impact-calc';

const router = Router();

/**
 * GET /api/economic-impact/:komoditas_id
 * Hitung economic impact calculator untuk komoditas tertentu
 * Role: semua role terautentikasi
 */
router.get('/:komoditas_id', verifyToken, async (req: Request, res: Response) => {
  try {
    const { komoditas_id } = req.params;
    const komoditasIdStr = Array.isArray(komoditas_id) ? komoditas_id[0] : komoditas_id;
    const komoditasIdNum = parseInt(komoditasIdStr, 10);

    if (isNaN(komoditasIdNum)) {
      return res.status(400).json({
        success: false,
        error: 'komoditas_id harus berupa angka yang valid'
      });
    }

    const { desa_id } = req.query;
    const desaId = desa_id ? parseInt(desa_id as string, 10) : undefined;

    // Validasi komoditas_id ada di tabel komoditas
    const { data: komoditasData, error: komoditasError } = await supabase
      .from('komoditas')
      .select('id')
      .eq('id', komoditasIdNum)
      .single();

    if (komoditasError || !komoditasData) {
      return res.status(404).json({
        success: false,
        error: 'Komoditas tidak ditemukan'
      });
    }

    // Panggil hitungEconomicImpact
    const result = await hitungEconomicImpact(komoditasIdNum, desaId);

    // Response WAJIB include field label
    return res.json({
      success: true,
      data: {
        harga_rata_panendesa_per_kg: result.harga_rata_panendesa_per_kg,
        estimasi_harga_tengkulak_per_kg: result.estimasi_harga_tengkulak_per_kg,
        selisih_persen: result.selisih_persen,
        sumber_referensi_margin: result.sumber_referensi_margin,
        label: 'Estimasi berbasis riset, bukan data transaksi real-time',
        periode_data: result.periode_data
      }
    });

  } catch (error) {
    console.error('[Economic Impact] Error calculating economic impact:', error);

    // Kalau error karena tidak ada data fair_share_distribution sama sekali
    if (error instanceof Error && error.message.includes('Belum ada data transaksi')) {
      return res.status(200).json({
        success: true,
        data: {
          harga_rata_panendesa_per_kg: 0,
          estimasi_harga_tengkulak_per_kg: 0,
          selisih_persen: 0,
          sumber_referensi_margin: '',
          label: 'Estimasi berbasis riset, bukan data transaksi real-time',
          periode_data: 'belum_ada_data',
          catatan: 'Belum ada data transaksi untuk komoditas ini'
        }
      });
    }

    // Kalau error karena data referensi tidak ditemukan (harga_acuan atau benchmark_margin)
    if (error instanceof Error && (error.message.includes('Harga acuan') || error.message.includes('Benchmark margin'))) {
      return res.status(404).json({
        success: false,
        error: error.message
      });
    }

    return res.status(500).json({
      success: false,
      error: 'Terjadi kesalahan server'
    });
  }
});

export default router;
