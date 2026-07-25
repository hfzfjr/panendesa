import { Router, Request, Response } from 'express';
import { verifyToken } from '../middlewares/authMiddleware';
import { getAllDesaCapacity } from '../../lib/capacity-engine';

const router = Router();

/**
 * GET /api/desa
 * List all desa with capacity data
 * Role: semua role terautentikasi
 * Response includes: id, nama_desa, latitude, longitude, skor_konsistensi, 
 *                    kapasitas_estimasi_kg, kapasitas_tervalidasi_kg
 */
router.get('/', verifyToken, async (req: Request, res: Response) => {
  try {
    const desaData = await getAllDesaCapacity();

    return res.json({
      success: true,
      data: desaData
    });
  } catch (error) {
    console.error('[Desa] Error fetching desa:', error);
    return res.status(500).json({
      success: false,
      error: 'Gagal mengambil data desa'
    });
  }
});

export default router;
