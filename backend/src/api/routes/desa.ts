import { Router, Request, Response } from 'express';
import { verifyToken } from '../middlewares/authMiddleware';
import { getAllDesaCapacity } from '../../lib/capacity-engine';

const router = Router();

/**
 * GET /api/desa
 * List all desa with capacity data
 * Role: semua role terautentikasi
 * Query param opsional: ?komoditas_id=number
 * Response includes: id, nama_desa, latitude, longitude, skor_konsistensi,
 *                    kapasitas_estimasi_kg, kapasitas_tervalidasi_kg
 * Catatan: jika komoditas_id diberikan, kapasitas yang dikembalikan HANYA untuk komoditas tersebut
 */
router.get('/', verifyToken, async (req: Request, res: Response) => {
  try {
    const { komoditas_id } = req.query;
    const komoditasIdNum = komoditas_id ? parseInt(komoditas_id as string) : undefined;

    // Validate komoditas_id if provided
    if (komoditas_id && (isNaN(komoditasIdNum!) || komoditasIdNum! <= 0)) {
      return res.status(400).json({
        success: false,
        error: 'Parameter komoditas_id tidak valid'
      });
    }

    const desaData = await getAllDesaCapacity(komoditasIdNum);

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
