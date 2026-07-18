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
        error: 'komoditas_id wajib diisi dan harus berupa angka'
      });
    }

    if (!jumlah_kg || typeof jumlah_kg !== 'number' || jumlah_kg <= 0) {
      return res.status(400).json({
        success: false,
        error: 'jumlah_kg wajib diisi dan harus lebih dari 0'
      });
    }

    if (!tanggal_target_panen) {
      return res.status(400).json({
        success: false,
        error: 'tanggal_target_panen wajib diisi'
      });
    }

    // Validate date format (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(tanggal_target_panen)) {
      return res.status(400).json({
        success: false,
        error: 'tanggal_target_panen harus dalam format YYYY-MM-DD'
      });
    }

    // Validate date is not in the past
    const targetDate = new Date(tanggal_target_panen);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (targetDate < today) {
      return res.status(400).json({
        success: false,
        error: 'tanggal_target_panen tidak boleh tanggal yang sudah lewat'
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
        error: 'Gagal membuat estimasi stok'
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
      error: 'Terjadi kesalahan server'
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
        error: 'Gagal mengambil estimasi stok'
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
      error: 'Terjadi kesalahan server'
    });
  }
});

// GET /api/stok-estimasi/:petani_id - Get stock estimations for specific petani
router.get('/:petani_id', verifyToken, async (req: Request, res: Response) => {
  try {
    const petaniIdParam = Array.isArray(req.params.petani_id) ? req.params.petani_id[0] : req.params.petani_id;
    const targetPetaniId = parseInt(petaniIdParam);
    const userRole = req.user!.role;
    const userId = req.user!.user_id;
    const userDesaId = req.user!.desa_id;

    if (isNaN(targetPetaniId)) {
      return res.status(400).json({
        success: false,
        error: 'petani_id tidak valid'
      });
    }

    // Role-based access control
    if (userRole === 'pembeli') {
      return res.status(403).json({
        success: false,
        error: 'Pembeli tidak memiliki akses ke endpoint ini'
      });
    }

    if (userRole === 'petani') {
      // Petani hanya boleh akses data miliknya sendiri
      if (targetPetaniId !== userId) {
        return res.status(403).json({
          success: false,
          error: 'Anda tidak memiliki akses ke data petani lain'
        });
      }
    }

    if (userRole === 'petugas_kopdes') {
      // Petugas kopdes hanya boleh akses petani di desa yang sama
      const { data: targetPetani, error: petaniError } = await supabase
        .from('users')
        .select('desa_id')
        .eq('id', targetPetaniId)
        .single();

      if (petaniError || !targetPetani) {
        return res.status(404).json({
          success: false,
          error: 'Petani tidak ditemukan'
        });
      }

      if (targetPetani.desa_id !== userDesaId) {
        return res.status(403).json({
          success: false,
          error: 'Anda tidak memiliki akses ke petani di desa lain'
        });
      }
    }

    // Admin boleh akses semua data, tidak perlu validasi tambahan

    // Fetch stock estimations for the target petani
    const { data, error } = await supabase
      .from('stok_estimasi')
      .select('*')
      .eq('petani_id', targetPetaniId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Database error:', error);
      return res.status(500).json({
        success: false,
        error: 'Gagal mengambil estimasi stok'
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
      error: 'Terjadi kesalahan server'
    });
  }
});

export default router;