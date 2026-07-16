import { Router, Request, Response } from 'express';
import { supabase } from '../../lib/supabase';
import { verifyToken, requireRole } from '../middlewares/authMiddleware';

const router = Router();

// POST /api/stok-estimasi - Create stock estimation (Petani only)
router.post('/', verifyToken, requireRole(['petani']), async (req: Request, res: Response) => {
  try {
    const { komoditas_id, jumlah_kg, tanggal_target_panen } = req.body;

    // Validation
    if (!komoditas_id || typeof komoditas_id !== 'number') {
      return res.status(400).json({
        success: false,
        error: 'komoditas_id is required and must be a number'
      });
    }

    if (!jumlah_kg || typeof jumlah_kg !== 'number' || jumlah_kg <= 0) {
      return res.status(400).json({
        success: false,
        error: 'jumlah_kg is required and must be greater than 0'
      });
    }

    if (!tanggal_target_panen) {
      return res.status(400).json({
        success: false,
        error: 'tanggal_target_panen is required'
      });
    }

    // Get petani_id from authenticated user (NOT from request body)
    const petani_id = req.user!.user_id;

    // Insert into database
    const { data, error } = await supabase
      .from('stok_estimasi')
      .insert({
        petani_id,
        komoditas_id,
        jumlah_kg,
        tanggal_target_panen: new Date(tanggal_target_panen).toISOString(),
        status: 'menunggu_panen'
      })
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to create stock estimation'
      });
    }

    return res.status(201).json({
      success: true,
      data
    });
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// GET /api/stok-estimasi - Get stock estimations for authenticated petani
router.get('/', verifyToken, requireRole(['petani']), async (req: Request, res: Response) => {
  try {
    const petani_id = req.user!.user_id;

    // Fetch stock estimations for this petani only
    const { data, error } = await supabase
      .from('stok_estimasi')
      .select('*')
      .eq('petani_id', petani_id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Database error:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to fetch stock estimations'
      });
    }

    return res.status(200).json({
      success: true,
      data: data || []
    });
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

export default router;
