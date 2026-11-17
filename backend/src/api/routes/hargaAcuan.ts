import { Router, Request, Response } from 'express';
import { supabase } from '../../lib/supabase';
import { verifyToken } from '../middlewares/authMiddleware';

const router = Router();

/**
 * GET /api/harga-acuan
 * Mendapatkan daftar harga acuan untuk semua komoditas
 * Role: semua role terautentikasi
 */
router.get('/', verifyToken, async (req: Request, res: Response) => {
  try {
    const { komoditas_id } = req.query;

    let query = supabase
      .from('harga_acuan')
      .select(`
        id,
        komoditas_id,
        harga_referensi_per_kg,
        sumber,
        tanggal,
        komoditas (
          id,
          nama_komoditas,
          satuan
        )
      `)
      .order('tanggal', { ascending: false });

    // Filter by komoditas_id if provided
    if (komoditas_id) {
      const komoditasIdNum = parseInt(komoditas_id as string);
      if (!isNaN(komoditasIdNum)) {
        query = query.eq('komoditas_id', komoditasIdNum);
      }
    }

    const { data, error } = await query;

    if (error) {
      console.error('[Harga Acuan] Error fetching harga acuan:', error);
      return res.status(500).json({
        success: false,
        error: 'Gagal mengambil data harga acuan'
      });
    }

    // Transform data to consistent format
    const transformedData = data?.map((item: any) => ({
      id: item.id,
      komoditas_id: item.komoditas_id,
      nama_komoditas: item.komoditas?.nama_komoditas,
      satuan: item.komoditas?.satuan,
      harga: item.harga_referensi_per_kg,
      sumber: item.sumber,
      tanggal_update: item.tanggal
    })) || [];

    return res.json({
      success: true,
      data: transformedData
    });
  } catch (error) {
    console.error('[Harga Acuan] Server error:', error);
    return res.status(500).json({
      success: false,
      error: 'Terjadi kesalahan server'
    });
  }
});

export default router;
