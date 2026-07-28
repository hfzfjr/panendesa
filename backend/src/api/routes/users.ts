import { Router, Request, Response } from 'express';
import { supabase } from '../../lib/supabase';
import { verifyToken } from '../middlewares/authMiddleware';

const router = Router();

// PATCH /api/users/me/complete-profile
// Allows users to complete their profile after OAuth registration
// SECURITY: Does NOT allow role or desa_id to be modified
router.patch('/me/complete-profile', verifyToken, async (req: Request, res: Response) => {
  try {
    const user_id = req.user!.user_id;
    const { nama } = req.body;

    // Validation: nama is required
    if (!nama || typeof nama !== 'string' || nama.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Nama wajib diisi dan tidak boleh kosong'
      });
    }

    // SECURITY: Explicitly strip role and desa_id from request body
    // This prevents self-assignment of sensitive fields
    const { role, desa_id, ...safeUpdateData } = req.body;

    // Only allow updating nama and profile_completed
    const updateData: any = {
      nama: nama.trim(),
      profile_completed: true
    };

    // Update user profile
    const { data: updatedUser, error } = await supabase
      .from('users')
      .update(updateData)
      .eq('id', user_id)
      .select('id, nama, email, role, desa_id, profile_completed')
      .single();

    if (error || !updatedUser) {
      console.error('Profile update error:', error);
      return res.status(500).json({
        success: false,
        error: 'Gagal memperbarui profil'
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        id: updatedUser.id,
        nama: updatedUser.nama,
        email: updatedUser.email,
        role: updatedUser.role,
        desa_id: updatedUser.desa_id,
        profile_completed: updatedUser.profile_completed
      }
    });
  } catch (error) {
    console.error('Complete profile error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// GET /api/users/me
// Get current user's profile
router.get('/me', verifyToken, async (req: Request, res: Response) => {
  try {
    const user_id = req.user!.user_id;

    const { data: user, error } = await supabase
      .from('users')
      .select('id, nama, email, role, desa_id, auth_id, profile_completed, skor_konsistensi')
      .eq('id', user_id)
      .single();

    if (error || !user) {
      return res.status(404).json({
        success: false,
        error: 'User tidak ditemukan'
      });
    }

    // For petugas_kopdes role, resolve kopdes_id from desa_id
    let kopdes_id = null;
    if (user.role === 'petugas_kopdes' && user.desa_id) {
      const { data: kopdes } = await supabase
        .from('kopdes')
        .select('id')
        .eq('desa_id', user.desa_id)
        .single();

      if (kopdes) {
        kopdes_id = kopdes.id;
      }
      // If no kopdes found for the desa, kopdes_id remains null (graceful handling)
    }

    return res.status(200).json({
      success: true,
      data: {
        ...user,
        kopdes_id // Only included for petugas_kopdes, null for others or if not found
      }
    });
  } catch (error) {
    console.error('Get user error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

export default router;
