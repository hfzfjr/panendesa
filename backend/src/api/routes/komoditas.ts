import { Router, Request, Response } from 'express';
import { supabase } from '../../lib/supabase';
import { verifyToken } from '../middlewares/authMiddleware';

const router = Router();

/**
 * GET /api/komoditas
 * List all komoditas
 * Role: semua role terautentikasi
 */
router.get('/', verifyToken, async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('komoditas')
      .select('id, nama_komoditas, satuan')
      .order('nama_komoditas', { ascending: true });

    if (error) {
      console.error('[Komoditas] Error fetching komoditas:', error);
      return res.status(500).json({
        success: false,
        error: 'Gagal mengambil data komoditas'
      });
    }

    return res.json({
      success: true,
      data: data || []
    });
  } catch (error) {
    console.error('[Komoditas] Server error:', error);
    return res.status(500).json({
      success: false,
      error: 'Terjadi kesalahan server'
    });
  }
});

export default router;
