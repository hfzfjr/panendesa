import { Router, Request, Response } from 'express';
import { supabase } from '../../lib/supabase';
import { verifyToken, requireRole } from '../middlewares/authMiddleware';
import { verifyInternalService } from '../middlewares/internalServiceMiddleware';
import { getDesaCapacity } from '../../lib/capacity-engine';
import { runSmartSplit } from '../../lib/smart-split';
import { validateOrderCapacity } from '../../lib/order-validator';

const router = Router();

/**
 * POST /api/orders
 * Membuat order baru dari pembeli
 * Role: pembeli
 */
router.post('/', verifyToken, requireRole(['pembeli']), async (req: Request, res: Response) => {
  try {
    const { komoditas_id, jumlah_diminta_kg, desa_id_prioritas } = req.body;

    // Validasi input dasar
    if (!komoditas_id || typeof komoditas_id !== 'number') {
      return res.status(400).json({
        success: false,
        error: 'komoditas_id wajib diisi dan harus berupa angka'
      });
    }

    if (!jumlah_diminta_kg || typeof jumlah_diminta_kg !== 'number' || jumlah_diminta_kg <= 0) {
      return res.status(400).json({
        success: false,
        error: 'jumlah_diminta_kg wajib diisi dan harus lebih dari 0'
      });
    }

    if (!desa_id_prioritas || typeof desa_id_prioritas !== 'number') {
      return res.status(400).json({
        success: false,
        error: 'desa_id_prioritas wajib diisi dan harus berupa angka'
      });
    }

    // Validasi komoditas_id ada di tabel komoditas
    const { data: komoditasData, error: komoditasError } = await supabase
      .from('komoditas')
      .select('id')
      .eq('id', komoditas_id)
      .single();

    if (komoditasError || !komoditasData) {
      return res.status(404).json({
        success: false,
        error: 'Komoditas tidak ditemukan'
      });
    }

    // Convert desa_id_prioritas -> kopdes_id
    const { data: kopdesData, error: kopdesError } = await supabase
      .from('kopdes')
      .select('id')
      .eq('desa_id', desa_id_prioritas)
      .eq('aktif', true)
      .single();

    if (kopdesError || !kopdesData) {
      return res.status(404).json({
        success: false,
        error: 'Desa tidak memiliki Kopdes aktif'
      });
    }

    // Cek kapasitas estimasi desa
    const capacity = await getDesaCapacity(desa_id_prioritas);
    if (capacity.kapasitas_estimasi_kg < jumlah_diminta_kg) {
      return res.status(400).json({
        success: false,
        error: 'Kapasitas estimasi desa ini tidak cukup untuk memenuhi permintaan'
      });
    }

    // Insert ke tabel orders
    const pembeli_id = req.user!.user_id;
    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .insert({
        pembeli_id,
        komoditas_id,
        kopdes_id: kopdesData.id,
        jumlah_diminta_kg,
        status: 'dikonfirmasi_sementara'
      })
      .select('id, status')
      .single();

    if (orderError) {
      console.error('[Orders] Error creating order:', orderError);
      return res.status(500).json({
        success: false,
        error: 'Gagal membuat order'
      });
    }

    return res.status(201).json({
      success: true,
      data: orderData
    });
  } catch (error) {
    console.error('[Orders] Server error:', error);
    return res.status(500).json({
      success: false,
      error: 'Terjadi kesalahan server'
    });
  }
});

/**
 * GET /api/orders/:pembeli_id
 * Mendapatkan daftar order milik pembeli
 * Role: pembeli (milik sendiri), admin
 */
router.get('/:pembeli_id', verifyToken, async (req: Request, res: Response) => {
  try {
    const { pembeli_id } = req.params;

    // Validasi: pembeli_id harus string
    if (Array.isArray(pembeli_id)) {
      return res.status(400).json({
        success: false,
        error: 'Parameter pembeli_id tidak valid'
      });
    }

    const pembeliIdNum = parseInt(pembeli_id);

    if (isNaN(pembeliIdNum)) {
      return res.status(400).json({
        success: false,
        error: 'pembeli_id harus berupa angka'
      });
    }

    const userRole = req.user!.role;
    const userId = req.user!.user_id;

    // RBAC: pembeli hanya boleh akses data miliknya sendiri
    if (userRole === 'pembeli') {
      if (pembeliIdNum !== userId) {
        return res.status(403).json({
          success: false,
          error: 'Anda tidak memiliki akses ke order pembeli lain'
        });
      }
    }

    // Role lain selain admin dan pembeli ditolak
    if (userRole !== 'pembeli' && userRole !== 'admin') {
      return res.status(403).json({
        success: false,
        error: 'Anda tidak memiliki akses ke endpoint ini'
      });
    }

    // Admin boleh akses semua data, tidak perlu validasi tambahan

    // Fetch orders
    const { data, error } = await supabase
      .from('orders')
      .select('id, komoditas_id, kopdes_id, jumlah_diminta_kg, status, harga_final_per_kg, harga_terkunci, created_at')
      .eq('pembeli_id', pembeliIdNum)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[Orders] Error fetching orders:', error);
      return res.status(500).json({
        success: false,
        error: 'Gagal mengambil data order'
      });
    }

    return res.json({
      success: true,
      data: data || []
    });
  } catch (error) {
    console.error('[Orders] Server error:', error);
    return res.status(500).json({
      success: false,
      error: 'Terjadi kesalahan server'
    });
  }
});

/**
 * POST /api/orders/:id/cancel
 * Membatalkan order
 * Role: pembeli (milik sendiri), admin
 */
router.post('/:id/cancel', verifyToken, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Validasi: id harus string
    if (Array.isArray(id)) {
      return res.status(400).json({
        success: false,
        error: 'Parameter id tidak valid'
      });
    }

    const orderIdNum = parseInt(id);

    if (isNaN(orderIdNum)) {
      return res.status(400).json({
        success: false,
        error: 'id harus berupa angka'
      });
    }

    const userRole = req.user!.role;
    const userId = req.user!.user_id;

    // Ambil order dari database
    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .select('id, pembeli_id, harga_terkunci')
      .eq('id', orderIdNum)
      .single();

    if (orderError || !orderData) {
      return res.status(404).json({
        success: false,
        error: 'Order tidak ditemukan'
      });
    }

    // RBAC: pembeli hanya boleh cancel order miliknya sendiri
    if (userRole === 'pembeli') {
      if (orderData.pembeli_id !== userId) {
        return res.status(403).json({
          success: false,
          error: 'Anda tidak memiliki akses ke order ini'
        });
      }
    }

    // Role lain selain admin dan pembeli ditolak
    if (userRole !== 'pembeli' && userRole !== 'admin') {
      return res.status(403).json({
        success: false,
        error: 'Anda tidak memiliki akses ke endpoint ini'
      });
    }

    // Admin boleh cancel semua order, tidak perlu validasi tambahan

    // Cek harga_terkunci
    if (orderData.harga_terkunci) {
      return res.status(400).json({
        success: false,
        error: 'Order tidak bisa dibatalkan karena harga sudah dikunci'
      });
    }

    // Update status jadi 'dibatalkan'
    const { error: updateError } = await supabase
      .from('orders')
      .update({ status: 'dibatalkan' })
      .eq('id', orderIdNum);

    if (updateError) {
      console.error('[Orders] Error canceling order:', updateError);
      return res.status(500).json({
        success: false,
        error: 'Gagal membatalkan order'
      });
    }

    return res.json({
      success: true,
      data: { status: 'dibatalkan' }
    });
  } catch (error) {
    console.error('[Orders] Server error:', error);
    return res.status(500).json({
      success: false,
      error: 'Terjadi kesalahan server'
    });
  }
});

/**
 * POST /api/orders/:id/confirm-price
 * Mengkonfirmasi harga final order
 * Role: petugas_kopdes
 */
router.post('/:id/confirm-price', verifyToken, requireRole(['petugas_kopdes']), async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { harga_final_per_kg } = req.body;

    // Validasi: id harus string
    if (Array.isArray(id)) {
      return res.status(400).json({
        success: false,
        error: 'Parameter id tidak valid'
      });
    }

    const orderIdNum = parseInt(id);

    if (isNaN(orderIdNum)) {
      return res.status(400).json({
        success: false,
        error: 'id harus berupa angka'
      });
    }

    // Validasi harga_final_per_kg
    if (!harga_final_per_kg || typeof harga_final_per_kg !== 'number' || harga_final_per_kg <= 0) {
      return res.status(400).json({
        success: false,
        error: 'harga_final_per_kg wajib diisi dan harus lebih dari 0'
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
      .select('id, kopdes_id, harga_terkunci')
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

    // Cek harga_terkunci - kalau sudah true, tolak
    if (orderData.harga_terkunci) {
      return res.status(400).json({
        success: false,
        error: 'Harga sudah dikunci sebelumnya, tidak bisa diubah'
      });
    }

    // Ambil fee_persen aktif dari tabel kopdes
    const { data: kopdesFeeData, error: kopdesFeeError } = await supabase
      .from('kopdes')
      .select('fee_persen')
      .eq('id', orderData.kopdes_id)
      .single();

    if (kopdesFeeError || !kopdesFeeData) {
      return res.status(404).json({
        success: false,
        error: 'Kopdes tidak ditemukan'
      });
    }

    // Update order dengan harga_final_per_kg, fee_kopdes_persen_terpakai, harga_terkunci = true, dan status = 'siap_kirim'
    const { data: updateData, error: updateError } = await supabase
      .from('orders')
      .update({
        harga_final_per_kg,
        fee_kopdes_persen_terpakai: kopdesFeeData.fee_persen,
        harga_terkunci: true,
        status: 'siap_kirim'
      })
      .eq('id', orderIdNum)
      .select('harga_terkunci, fee_kopdes_persen_terpakai')
      .single();

    if (updateError) {
      // Cek apakah error karena trigger database (race condition)
      // Postgres RAISE EXCEPTION tanpa SQLSTATE eksplisit pakai code 'P0001'
      if (updateError.code === 'P0001') {
        return res.status(400).json({
          success: false,
          error: 'Harga sudah dikunci oleh request lain, tidak bisa diubah'
        });
      }

      console.error('[Orders] Error confirming price:', updateError);
      return res.status(500).json({
        success: false,
        error: 'Gagal mengkonfirmasi harga'
      });
    }

    return res.json({
      success: true,
      data: updateData
    });
  } catch (error) {
    console.error('[Orders] Server error:', error);
    return res.status(500).json({
      success: false,
      error: 'Terjadi kesalahan server'
    });
  }
});

/**
 * POST /api/orders/:id/validate
 * Validasi kapasitas tervalidasi vs kebutuhan order, trigger smart split jika perlu
 * Role: internal/sistem (dipanggil otomatis oleh backend)
 */
router.post('/:id/validate', verifyInternalService, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Validasi: id harus string
    if (Array.isArray(id)) {
      return res.status(400).json({
        success: false,
        error: 'Parameter id tidak valid'
      });
    }

    const orderIdNum = parseInt(id);

    if (isNaN(orderIdNum)) {
      return res.status(400).json({
        success: false,
        error: 'id harus berupa angka'
      });
    }

    // Panggil fungsi validateOrderCapacity
    const result = await validateOrderCapacity(orderIdNum);

    return res.json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('[Orders] Server error:', error);
    return res.status(500).json({
      success: false,
      error: 'Terjadi kesalahan server'
    });
  }
});

export default router;
