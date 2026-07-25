import { Router, Request, Response } from 'express';
import { supabase } from '../../lib/supabase';
import { verifyToken, requireRole } from '../middlewares/authMiddleware';

const router = Router();

// POST /api/stok-estimasi - Create stock estimation (Petani only)
router.post('/', verifyToken, requireRole(['petani']), async (req: Request, res: Response) => {
  try {
    const { komoditas_id, jumlah_kg, tanggal_target_panen } = req.body;

    // Validation
    const komoditasIdNum = typeof komoditas_id === 'string' ? parseInt(komoditas_id) : komoditas_id;
    if (!komoditasIdNum || isNaN(komoditasIdNum)) {
      return res.status(400).json({
        success: false,
        error: 'komoditas_id wajib diisi dan harus berupa angka'
      });
    }

    const jumlahKgNum = typeof jumlah_kg === 'string' ? parseFloat(jumlah_kg) : jumlah_kg;
    if (!jumlahKgNum || isNaN(jumlahKgNum) || jumlahKgNum <= 0) {
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
        komoditas_id: komoditasIdNum,
        jumlah_kg: jumlahKgNum,
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

/**
 * GET /api/stok-estimasi/desa/:desa_id
 * Mendapatkan daftar stok estimasi dari semua petani di desa tertentu
 * Role: petugas_kopdes (hanya desa miliknya sendiri), admin
 */
router.get('/desa/:desa_id', verifyToken, async (req: Request, res: Response) => {
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

    const userRole = req.user!.role;
    const userDesaId = req.user!.desa_id;

    // RBAC: petugas_kopdes hanya boleh akses desa miliknya sendiri
    if (userRole === 'petugas_kopdes') {
      if (!userDesaId) {
        return res.status(403).json({
          success: false,
          error: 'Anda tidak memiliki akses ke endpoint ini'
        });
      }

      if (desaIdNum !== userDesaId) {
        return res.status(403).json({
          success: false,
          error: 'Anda tidak memiliki akses ke desa lain'
        });
      }
    }

    // Role lain selain admin dan petugas_kopdes ditolak
    if (userRole !== 'petugas_kopdes' && userRole !== 'admin') {
      return res.status(403).json({
        success: false,
        error: 'Anda tidak memiliki akses ke endpoint ini'
      });
    }

    // Admin boleh akses semua data, tidak perlu validasi tambahan

    // Fetch semua petani di desa tsb
    const { data: petaniList, error: petaniError } = await supabase
      .from('users')
      .select('id')
      .eq('desa_id', desaIdNum)
      .eq('role', 'petani');

    if (petaniError) {
      console.error('[Stok Estimasi] Error fetching petani list:', petaniError);
      return res.status(500).json({
        success: false,
        error: 'Gagal mengambil data petani'
      });
    }

    if (!petaniList || petaniList.length === 0) {
      return res.json({
        success: true,
        data: []
      });
    }

    const petaniIds = petaniList.map(p => p.id);

    // Fetch stok estimasi untuk semua petani di desa tsb
    const { data, error } = await supabase
      .from('stok_estimasi')
      .select('*')
      .in('petani_id', petaniIds)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[Stok Estimasi] Error fetching stok estimasi:', error);
      return res.status(500).json({
        success: false,
        error: 'Gagal mengambil estimasi stok'
      });
    }

    return res.json({
      success: true,
      data: data || []
    });
  } catch (error) {
    console.error('[Stok Estimasi] Server error:', error);
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