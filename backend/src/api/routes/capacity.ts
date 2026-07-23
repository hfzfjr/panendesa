import { Router, Request, Response } from 'express';
import { verifyToken } from '../middlewares/authMiddleware';
import { getDesaCapacity } from '../../lib/capacity-engine';

const router = Router();

/**
 * GET /api/capacity/:desa_id
 * Mendapatkan kapasitas agregat desa (estimasi, tervalidasi, skor konsistensi)
 * Role: semua role terautentikasi
 */
router.get('/:desa_id',
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const { desa_id } = req.params;

      // Validasi: desa_id harus string
      if (Array.isArray(desa_id)) {
        return res.status(400).json({
          success: false,
          error: 'Parameter desa_id tidak valid'
        });
      }

      const desaIdNum = parseInt(desa_id);

      if (isNaN(desaIdNum)) {
        return res.status(400).json({
          success: false,
          error: 'desa_id harus berupa angka'
        });
      }

      // Hitung kapasitas desa
      const capacityData = await getDesaCapacity(desaIdNum);

      return res.json({
        success: true,
        data: capacityData
      });
    } catch (error) {
      console.error('[Capacity] Error:', error);
      
      // Cek apakah error karena desa tidak ditemukan
      if (error instanceof Error && error.message.includes('not found')) {
        return res.status(404).json({
          success: false,
          error: 'Desa tidak ditemukan'
        });
      }

      return res.status(500).json({
        success: false,
        error: 'Terjadi kesalahan server'
      });
    }
  }
);

export default router;
