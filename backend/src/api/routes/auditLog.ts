import { Router, Request, Response } from 'express';
import { supabase } from '../../lib/supabase';
import { verifyToken, requireRole } from '../middlewares/authMiddleware';

const router = Router();

/**
 * GET /api/audit-log
 * Ambil riwayat audit log
 * Role: admin
 */
router.get('/', verifyToken, requireRole(['admin']), async (req: Request, res: Response) => {
  try {
    const { tabel, record_id } = req.query;

    let query = supabase
      .from('audit_log')
      .select('*')
      .order('created_at', { ascending: false });

    // Filter opsional: tabel_terkait
    if (tabel && typeof tabel === 'string') {
      query = query.eq('tabel_terkait', tabel);
    }

    // Filter opsional: record_id
    if (record_id !== undefined) {
      const recordIdNum = parseInt(record_id as string, 10);
      if (!isNaN(recordIdNum)) {
        query = query.eq('record_id', recordIdNum);
      }
    }

    const { data: auditLogData, error: auditLogError } = await query;

    if (auditLogError) {
      console.error('[Audit Log] Error fetching audit log:', auditLogError);
      return res.status(500).json({
        success: false,
        error: 'Gagal mengambil riwayat audit log'
      });
    }

    return res.json({
      success: true,
      data: auditLogData
    });

  } catch (error) {
    console.error('[Audit Log] Error fetching audit log:', error);
    return res.status(500).json({
      success: false,
      error: 'Terjadi kesalahan server'
    });
  }
});

/**
 * POST /api/audit-log
 * Tambah entry baru ke audit log
 * Role: admin
 */
router.post('/', verifyToken, requireRole(['admin']), async (req: Request, res: Response) => {
  try {
    const { tabel_terkait, record_id, aksi, catatan } = req.body;

    // Validasi input
    if (!tabel_terkait || typeof tabel_terkait !== 'string' || tabel_terkait.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'tabel_terkait wajib diisi dan tidak boleh kosong'
      });
    }

    if (!aksi || typeof aksi !== 'string' || aksi.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'aksi wajib diisi dan tidak boleh kosong'
      });
    }

    if (!record_id || typeof record_id !== 'number' || isNaN(record_id)) {
      return res.status(400).json({
        success: false,
        error: 'record_id wajib diisi dan harus berupa angka yang valid'
      });
    }

    // admin_id diambil dari req.user.user_id
    const adminId = req.user!.user_id;

    const { data: insertData, error: insertError } = await supabase
      .from('audit_log')
      .insert({
        admin_id: adminId,
        tabel_terkait: tabel_terkait.trim(),
        record_id,
        aksi: aksi.trim(),
        catatan: catatan ? catatan.trim() : null
      })
      .select('id')
      .single();

    if (insertError) {
      console.error('[Audit Log] Error inserting audit log:', insertError);
      return res.status(500).json({
        success: false,
        error: 'Gagal menambahkan entry audit log'
      });
    }

    return res.json({
      success: true,
      data: {
        id: insertData.id
      }
    });

  } catch (error) {
    console.error('[Audit Log] Error inserting audit log:', error);
    return res.status(500).json({
      success: false,
      error: 'Terjadi kesalahan server'
    });
  }
});

export default router;
