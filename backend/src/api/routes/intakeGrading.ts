import { Router, Request, Response } from 'express';
import multer from 'multer';
import { supabase } from '../../lib/supabase';
import { verifyToken, requireRole } from '../middlewares/authMiddleware';
import { updateTrustScore } from '../../lib/trust-score-engine';

// Extend Express Request type to include file from multer
declare global {
  namespace Express {
    interface Request {
      file?: Express.Multer.File;
    }
  }
}

const router = Router();

// Multer configuration for file upload (memory storage for now)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  }
});

// POST /api/intake-grading - Create intake grading record (Petugas Kopdes only)
router.post('/',
  verifyToken,
  requireRole(['petugas_kopdes']),
  upload.single('foto'),
  async (req: Request, res: Response) => {
    try {
      const { stok_estimasi_id, berat_aktual_kg, grade_override_manual, grade, skor_warna, skor_ukuran, persen_cacat } = req.body;
      const petugas_id = req.user!.user_id;

      // Validation
      if (!stok_estimasi_id || isNaN(parseInt(stok_estimasi_id))) {
        return res.status(400).json({
          success: false,
          error: 'stok_estimasi_id wajib diisi dan harus berupa angka'
        });
      }

      if (!berat_aktual_kg || isNaN(parseFloat(berat_aktual_kg)) || parseFloat(berat_aktual_kg) <= 0) {
        return res.status(400).json({
          success: false,
          error: 'berat_aktual_kg wajib diisi dan harus lebih dari 0'
        });
      }

      if (!req.file) {
        return res.status(400).json({
          success: false,
          error: 'foto wajib diupload'
        });
      }

      // Placeholder validation for manual grade fields (will be replaced by Gemini Vision)
      if (grade && !['A', 'B', 'C'].includes(grade)) {
        return res.status(400).json({
          success: false,
          error: 'grade harus berupa A, B, atau C'
        });
      }

      // Check if stok_estimasi exists
      const stokEstimasiId = parseInt(stok_estimasi_id);
      const { data: stokEstimasi, error: stokError } = await supabase
        .from('stok_estimasi')
        .select('id, petani_id, jumlah_kg')
        .eq('id', stokEstimasiId)
        .single();

      if (stokError || !stokEstimasi) {
        return res.status(404).json({
          success: false,
          error: 'stok_estimasi tidak ditemukan'
        });
      }

      // Upload foto to Supabase Storage (placeholder - for now just use a dummy URL)
      // TODO: Implement proper file upload to Supabase Storage in next phase
      const foto_url = `https://placeholder.com/foto/${Date.now()}.jpg`;

      // Logic kejanggalan: bandingkan berat aktual dengan estimasi
      // Threshold 30% - jika selisih > 30%, tandai sebagai kejanggalan
      const estimasiKg = parseFloat(stokEstimasi.jumlah_kg);
      const aktualKg = parseFloat(berat_aktual_kg);
      const selisihPersen = Math.abs(estimasiKg - aktualKg) / estimasiKg * 100;
      const kejanggalan_terdeteksi = selisihPersen > 30;

      // Determine final grade
      let finalGrade: string;
      let isOverrideManual: boolean;

      if (grade_override_manual) {
        finalGrade = grade_override_manual;
        isOverrideManual = true;
      } else {
        // Use placeholder grade from body (will be replaced by Gemini Vision)
        finalGrade = grade || 'B'; // Default to B if not provided
        isOverrideManual = false;
      }

      // Insert to intake_grading table
      const { data, error } = await supabase
        .from('intake_grading')
        .insert({
          stok_estimasi_id: stokEstimasiId,
          petugas_id,
          foto_url,
          skor_warna: skor_warna ? parseFloat(skor_warna) : null,
          skor_ukuran: skor_ukuran ? parseFloat(skor_ukuran) : null,
          persen_cacat: persen_cacat ? parseFloat(persen_cacat) : null,
          grade: finalGrade,
          grade_override_manual: isOverrideManual,
          berat_aktual_kg: aktualKg,
          kejanggalan_terdeteksi
        })
        .select()
        .single();

      if (error) {
        console.error('Database error:', error);
        return res.status(500).json({
          success: false,
          error: 'Gagal membuat intake grading'
        });
      }

      // Update trust score (awaited for deterministic execution, but failure won't fail the response)
      console.log(`[Intake Grading] Triggering trust score update for petani_id: ${stokEstimasi.petani_id}`);
      try {
        await updateTrustScore(stokEstimasi.petani_id);
      } catch (err) {
        console.error('Error updating trust score (non-blocking):', err);
        // Sengaja tidak return/throw di sini -- kegagalan update skor TIDAK BOLEH
        // menggagalkan response utama insert intake_grading
      }

      return res.status(201).json({
        success: true,
        data: {
          grade: data.grade,
          skor_warna: data.skor_warna,
          skor_ukuran: data.skor_ukuran,
          persen_cacat: data.persen_cacat,
          kejanggalan_terdeteksi: data.kejanggalan_terdeteksi,
          grade_override_manual: data.grade_override_manual
        }
      });
    } catch (error) {
      console.error('Server error:', error);
      return res.status(500).json({
        success: false,
        error: 'Terjadi kesalahan server'
      });
    }
  }
);

// GET /api/intake-grading/:desa_id - Get intake grading records for a desa
router.get('/:desa_id', verifyToken, requireRole(['petugas_kopdes', 'admin']), async (req: Request, res: Response) => {
  try {
    const desaIdParam = Array.isArray(req.params.desa_id) ? req.params.desa_id[0] : req.params.desa_id;
    const targetDesaId = parseInt(desaIdParam);
    const userRole = req.user!.role;
    const userDesaId = req.user!.desa_id;

    if (isNaN(targetDesaId)) {
      return res.status(400).json({
        success: false,
        error: 'desa_id tidak valid'
      });
    }

    // Role-based access control
    if (userRole === 'petugas_kopdes') {
      // Petugas kopdes hanya boleh akses desa sendiri
      if (targetDesaId !== userDesaId) {
        return res.status(403).json({
          success: false,
          error: 'Anda tidak memiliki akses ke desa lain'
        });
      }
    }

    // Admin boleh akses semua desa, tidak perlu validasi tambahan

    // Fetch intake grading records for the desa
    // Join with stok_estimasi to get petani info, then join with users to get petani name
    const { data, error } = await supabase
      .from('intake_grading')
      .select(`
        *,
        stok_estimasi!inner (
          petani_id,
          jumlah_kg,
          users!inner (
            nama,
            desa_id
          )
        )
      `)
      .eq('stok_estimasi.users.desa_id', targetDesaId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Database error:', error);
      return res.status(500).json({
        success: false,
        error: 'Gagal mengambil intake grading'
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
