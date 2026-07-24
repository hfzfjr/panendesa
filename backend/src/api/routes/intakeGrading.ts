import { Router, Request, Response, NextFunction } from 'express';
import multer from 'multer';
import { supabase } from '../../lib/supabase';
import { verifyToken, requireRole } from '../middlewares/authMiddleware';
import { updateTrustScore } from '../../lib/trust-score-engine';
import { analyzeProductImage } from '../../lib/gemini-vision';
import { intakeGradingRateLimit } from '../middlewares/rateLimitMiddleware';
import { validateOrderCapacity } from '../../lib/order-validator';

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
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    // Accept only image files
    const allowedMimes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('File harus berupa gambar (JPEG, PNG, atau WebP)'));
    }
  }
});

// Error handling middleware for multer
const handleMulterError = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        error: 'Ukuran file terlalu besar. Maksimal 5MB.'
      });
    }
    return res.status(400).json({
      success: false,
      error: err.message
    });
  }
  if (err) {
    return res.status(400).json({
      success: false,
      error: err.message
    });
  }
  next();
};

// POST /api/intake-grading - Create intake grading record (Petugas Kopdes only)
router.post('/',
  verifyToken,
  requireRole(['petugas_kopdes']),
  intakeGradingRateLimit,
  upload.single('foto'),
  handleMulterError,
  async (req: Request, res: Response) => {
    try {
      const { stok_estimasi_id, berat_aktual_kg, grade_override_manual } = req.body;
      const petugas_id = req.user!.user_id;

      // Request logging for debugging
      console.log('[Intake Grading] Request received');
      console.log('[Intake Grading] Headers:', JSON.stringify(req.headers, null, 2));
      console.log('[Intake Grading] Body:', JSON.stringify(req.body, null, 2));
      console.log('[Intake Grading] File:', req.file ? { originalname: req.file.originalname, mimetype: req.file.mimetype, size: req.file.size } : 'No file');

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

      // Validate grade_override_manual if provided
      if (grade_override_manual && !['A', 'B', 'C'].includes(grade_override_manual)) {
        return res.status(400).json({
          success: false,
          error: 'grade_override_manual harus berupa A, B, atau C'
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

      // Call Gemini Vision API for image analysis
      console.log('[Intake Grading] Calling Gemini Vision API...');
      const geminiResult = await analyzeProductImage(req.file.buffer, req.file.mimetype);

      let finalGrade: string;
      let isOverrideManual: boolean;
      let finalSkorWarna: number | null;
      let finalSkorUkuran: number | null;
      let finalPersenCacat: number | null;

      if (grade_override_manual) {
        // Manual override takes priority
        finalGrade = grade_override_manual;
        isOverrideManual = true;
        // Still save Gemini scores if available for reference
        if (geminiResult.berhasil) {
          finalSkorWarna = geminiResult.skor_warna || null;
          finalSkorUkuran = geminiResult.skor_ukuran || null;
          finalPersenCacat = geminiResult.persen_cacat || null;
        } else {
          finalSkorWarna = null;
          finalSkorUkuran = null;
          finalPersenCacat = null;
        }
      } else if (geminiResult.berhasil) {
        // Use Gemini grade
        finalGrade = geminiResult.grade_usulan || 'B';
        isOverrideManual = false;
        finalSkorWarna = geminiResult.skor_warna || null;
        finalSkorUkuran = geminiResult.skor_ukuran || null;
        finalPersenCacat = geminiResult.persen_cacat || null;
      } else {
        // Gemini failed and no manual override - request manual grade
        return res.status(400).json({
          success: false,
          error: 'Penilaian otomatis gagal. Silakan kirim ulang dengan mengisi grade_override_manual secara manual.',
          gemini_error: geminiResult.error
        });
      }

      // Upload foto to Supabase Storage
      let foto_url: string;
      try {
        // Generate unique filename
        const fileExt = req.file.mimetype.split('/')[1];
        const fileName = `${stokEstimasiId}_${Date.now()}.${fileExt}`;
        const filePath = `${fileName}`;

        console.log('[Intake Grading] Uploading file to Supabase Storage:', filePath);

        // Upload to Supabase Storage bucket "intake_grading"
        const { data: uploadData, error: uploadError } = await supabase
          .storage
          .from('intake_grading')
          .upload(filePath, req.file.buffer, {
            contentType: req.file.mimetype,
            upsert: false
          });

        if (uploadError) {
          console.error('[Intake Grading] Supabase Storage upload error:', uploadError);
          return res.status(500).json({
            success: false,
            error: 'Gagal upload foto ke storage. Silakan coba lagi.'
          });
        }

        // Get public URL
        const { data: { publicUrl } } = supabase
          .storage
          .from('intake_grading')
          .getPublicUrl(filePath);

        foto_url = publicUrl;
        console.log('[Intake Grading] File uploaded successfully:', foto_url);
      } catch (storageError) {
        console.error('[Intake Grading] Storage upload exception:', storageError);
        return res.status(500).json({
          success: false,
          error: 'Terjadi kesalahan saat upload foto ke storage'
        });
      }

      // Logic kejanggalan: bandingkan berat aktual dengan estimasi
      // Threshold 30% - jika selisih > 30%, tandai sebagai kejanggalan
      const estimasiKg = parseFloat(stokEstimasi.jumlah_kg);
      const aktualKg = parseFloat(berat_aktual_kg);
      const selisihPersen = Math.abs(estimasiKg - aktualKg) / estimasiKg * 100;
      const kejanggalan_terdeteksi = selisihPersen > 30;

      // Insert to intake_grading table
      const { data, error } = await supabase
        .from('intake_grading')
        .insert({
          stok_estimasi_id: stokEstimasiId,
          petugas_id,
          foto_url,
          skor_warna: finalSkorWarna,
          skor_ukuran: finalSkorUkuran,
          persen_cacat: finalPersenCacat,
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

      // Trigger order validation (non-blocking)
      console.log(`[Intake Grading] Triggering order validation for intake on stok_estimasi_id: ${stokEstimasiId}`);
      try {
        // 1. Ambil desa_id dan komoditas_id dari stok_estimasi
        const { data: stokEstimasiFull, error: stokFullError } = await supabase
          .from('stok_estimasi')
          .select('petani_id, komoditas_id, users!inner(desa_id)')
          .eq('id', stokEstimasiId)
          .single();

        if (stokFullError || !stokEstimasiFull) {
          console.error('[Intake Grading] Error fetching stok_estimasi full data for order validation:', stokFullError);
        } else {
          const petaniDesaId = (stokEstimasiFull as any).users?.desa_id;
          const komoditasId = stokEstimasiFull.komoditas_id;

          // 2. Cari kopdes WHERE desa_id = petaniDesaId AND aktif = true
          const { data: kopdesList, error: kopdesError } = await supabase
            .from('kopdes')
            .select('id')
            .eq('desa_id', petaniDesaId)
            .eq('aktif', true);

          if (kopdesError || !kopdesList || kopdesList.length === 0) {
            console.log('[Intake Grading] No active kopdes found for desa, skip order validation');
          } else {
            const kopdesIds = kopdesList.map(k => k.id);

            // 3. Cari orders WHERE status = 'dikonfirmasi_sementara' OR 'menunggu_tambahan_panen' AND komoditas_id = komoditasId AND kopdes_id IN kopdesIds
            const { data: ordersFromKopdes, error: ordersKopdesError } = await supabase
              .from('orders')
              .select('id')
              .in('status', ['dikonfirmasi_sementara', 'menunggu_tambahan_panen'])
              .eq('komoditas_id', komoditasId)
              .in('kopdes_id', kopdesIds);

            if (ordersKopdesError) {
              console.error('[Intake Grading] Error fetching orders from kopdes:', ordersKopdesError);
            } else {
              const orderIdsFromKopdes = new Set((ordersFromKopdes || []).map(o => o.id));

              // 4. Cari order_allocation WHERE desa_id = petaniDesaId
              const { data: orderAllocations, error: allocationError } = await supabase
                .from('order_allocation')
                .select('order_id')
                .eq('desa_id', petaniDesaId);

              if (allocationError) {
                console.error('[Intake Grading] Error fetching order_allocations:', allocationError);
              } else {
                const orderIdsFromAllocation = new Set((orderAllocations || []).map(a => a.order_id));

                // 5. Gabungkan dan dedupe order_id
                const allOrderIds = new Set([...orderIdsFromKopdes, ...orderIdsFromAllocation]);

                console.log(`[Intake Grading] Found ${allOrderIds.size} orders to validate`);

                // 6. Validasi setiap order (non-blocking per order)
                for (const orderId of allOrderIds) {
                  try {
                    await validateOrderCapacity(orderId);
                    console.log(`[Intake Grading] Successfully validated order ${orderId}`);
                  } catch (err) {
                    console.error(`[Intake Grading] Error validating order ${orderId} (non-blocking):`, err);
                    // Continue to next order even if this one fails
                  }
                }
              }
            }
          }
        }
      } catch (err) {
        console.error('Error triggering order validation (non-blocking):', err);
        // Sengaja tidak return/throw di sini -- kegagalan validasi order TIDAK BOLEH
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
