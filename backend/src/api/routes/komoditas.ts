import { Router, Request, Response } from 'express';
import { supabase } from '../../lib/supabase';
import { verifyToken } from '../middlewares/authMiddleware';

const router = Router();

/**
 * GET /api/komoditas
 * List all komoditas with optional category filter
 * Role: semua role terautentikasi
 * Query param: ?kategori=string (optional)
 */
router.get('/', verifyToken, async (req: Request, res: Response) => {
  try {
    const { kategori } = req.query;

    let query = supabase
      .from('komoditas')
      .select('id, nama_komoditas, satuan, kategori')
      .order('nama_komoditas', { ascending: true });

    // Apply category filter if provided
    if (kategori && typeof kategori === 'string') {
      query = query.eq('kategori', kategori);
    }

    const { data, error } = await query;

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
