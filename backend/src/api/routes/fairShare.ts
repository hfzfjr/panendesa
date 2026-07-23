import { Router, Request, Response } from 'express';
import { supabase } from '../../lib/supabase';
import { verifyToken, requireRole } from '../middlewares/authMiddleware';

const router = Router();

/**
 * POST /api/fair-share/:order_id/calculate
 * Hitung distribusi hasil fair-share untuk order tertentu
 * Role: petugas_kopdes
 */
router.post('/:order_id/calculate', verifyToken, requireRole(['petugas_kopdes']), async (req: Request, res: Response) => {
  try {
    const { order_id } = req.params;
    const orderIdStr = Array.isArray(order_id) ? order_id[0] : order_id;
    const orderIdNum = parseInt(orderIdStr, 10);

    if (isNaN(orderIdNum)) {
      return res.status(400).json({
        success: false,
        error: 'order_id harus berupa angka yang valid'
      });
    }

    const userDesaId = req.user!.desa_id;

    // Cek desa_id petugas - kalau falsy, langsung 403
    if (!userDesaId) {
      return res.status(403).json({
        success: false,
        error: 'Anda tidak memiliki akses ke endpoint ini'
      });
    }

    // Ambil order dari database
    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .select('id, kopdes_id')
      .eq('id', orderIdNum)
      .single();

    if (orderError || !orderData) {
      return res.status(404).json({
        success: false,
        error: 'Order tidak ditemukan'
      });
    }

    // RBAC spesifik: bandingkan req.user.desa_id dengan desa_id milik kopdes_id order
    const { data: kopdesData, error: kopdesError } = await supabase
      .from('kopdes')
      .select('desa_id')
      .eq('id', orderData.kopdes_id)
      .single();

    if (kopdesError || !kopdesData) {
      return res.status(404).json({
        success: false,
        error: 'Kopdes tidak ditemukan'
      });
    }

    if (kopdesData.desa_id !== userDesaId) {
      return res.status(403).json({
        success: false,
        error: 'Anda tidak memiliki akses ke order ini'
      });
    }

    // Panggil RPC function calculate_fair_share
    const { data: rpcData, error: rpcError } = await supabase
      .rpc('calculate_fair_share', { p_order_id: orderIdNum });

    if (rpcError) {
      // Tangkap error dari Postgres (termasuk precondition gagal atau grade invalid)
      // Return 400 dengan pesan dari error.message supaya pesan RAISE EXCEPTION sampai ke user
      console.error('[Fair Share] RPC error:', rpcError);
      return res.status(400).json({
        success: false,
        error: rpcError.message || 'Gagal menghitung distribusi hasil'
      });
    }

    // Teruskan hasil dari RPC langsung
    return res.json(rpcData);

  } catch (error) {
    console.error('[Fair Share] Error calculating fair share:', error);
    return res.status(500).json({
      success: false,
      error: 'Terjadi kesalahan server'
    });
  }
});

/**
 * GET /api/fair-share/petani/:petani_id
 * Ambil riwayat distribusi hasil untuk petani tertentu
 * Role: petani
 */
router.get('/petani/:petani_id', verifyToken, requireRole(['petani']), async (req: Request, res: Response) => {
  try {
    const { petani_id } = req.params;
    const petaniIdStr = Array.isArray(petani_id) ? petani_id[0] : petani_id;
    const petaniIdNum = parseInt(petaniIdStr, 10);

    if (isNaN(petaniIdNum)) {
      return res.status(400).json({
        success: false,
        error: 'petani_id harus berupa angka yang valid'
      });
    }

    // RBAC: petani hanya boleh akses miliknya sendiri
    if (req.user!.user_id !== petaniIdNum) {
      return res.status(403).json({
        success: false,
        error: 'Anda tidak memiliki akses ke data ini'
      });
    }

    // Query fair_share_distribution dengan JOIN ke orders dan intake_grading
    const { data: distributionData, error: distributionError } = await supabase
      .from('fair_share_distribution')
      .select(`
        order_id,
        intake_grading_id,
        kontribusi_kg,
        pengali_grade,
        jumlah_diterima,
        created_at,
        orders (
          harga_final_per_kg,
          fee_kopdes_persen_terpakai
        ),
        intake_grading (
          grade
        )
      `)
      .eq('petani_id', petaniIdNum)
      .order('created_at', { ascending: false });

    if (distributionError) {
      console.error('[Fair Share] Error fetching distribution history:', distributionError);
      return res.status(500).json({
        success: false,
        error: 'Gagal mengambil riwayat distribusi'
      });
    }

    // Transform data ke format response yang diinginkan
    const transformedData = distributionData.map((item: any) => ({
      order_id: item.order_id,
      intake_grading_id: item.intake_grading_id,
      kontribusi_kg: item.kontribusi_kg,
      grade: item.intake_grading?.grade,
      pengali_grade: item.pengali_grade,
      jumlah_diterima: item.jumlah_diterima,
      fee_kopdes_persen_terpakai: item.orders?.fee_kopdes_persen_terpakai,
      harga_final_per_kg: item.orders?.harga_final_per_kg,
      created_at: item.created_at
    }));

    return res.json({
      success: true,
      data: transformedData
    });

  } catch (error) {
    console.error('[Fair Share] Error fetching petani distribution history:', error);
    return res.status(500).json({
      success: false,
      error: 'Terjadi kesalahan server'
    });
  }
});

export default router;
