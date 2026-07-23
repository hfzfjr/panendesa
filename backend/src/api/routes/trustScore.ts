import { Router, Request, Response } from 'express';
import { supabase } from '../../lib/supabase';
import { verifyToken } from '../middlewares/authMiddleware';
import { hitungSkorTransaksi } from '../../lib/trust-score-engine';

const router = Router();

/**
 * GET /api/trust-score/petani/:petani_id
 * Mendapatkan trust score petani beserta riwayat transaksi
 */
router.get('/petani/:petani_id',
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const { petani_id } = req.params;
      const userRole = req.user?.role;
      const userId = req.user?.user_id;
      const userDesaId = req.user?.desa_id;

      // Validasi: petani_id harus string
      if (Array.isArray(petani_id)) {
        return res.status(400).json({
          success: false,
          error: 'Parameter petani_id tidak valid'
        });
      }

      const petaniIdNum = parseInt(petani_id);

      // Validasi: petani hanya bisa lihat data sendiri
      if (userRole === 'petani' && petaniIdNum !== userId) {
        return res.status(403).json({
          success: false,
          error: 'Petani hanya bisa melihat trust score sendiri'
        });
      }

      // Validasi: petugas_kopdes hanya bisa akses petani di desa yang sama
      if (userRole === 'petugas_kopdes') {
        if (!userDesaId) {
          return res.status(403).json({
            success: false,
            error: 'Petugas kopdes harus memiliki desa_id yang valid'
          });
        }

        const { data: petaniData } = await supabase
          .from('users')
          .select('desa_id')
          .eq('id', petaniIdNum)
          .eq('role', 'petani')
          .single();

        if (!petaniData || petaniData.desa_id !== userDesaId) {
          return res.status(403).json({
            success: false,
            error: 'Petugas kopdes hanya bisa melihat petani di desa yang sama'
          });
        }
      }

      // Validasi: hanya role tertentu yang boleh akses
      if (!['admin', 'petugas_kopdes', 'petani'].includes(userRole as string)) {
        return res.status(403).json({
          success: false,
          error: 'Role tidak memiliki akses ke endpoint ini'
        });
      }

      // Ambil data petani
      const { data: petaniData, error: petaniError } = await supabase
        .from('users')
        .select('id, nama, skor_konsistensi, desa_id')
        .eq('id', petaniIdNum)
        .eq('role', 'petani')
        .single();

      if (petaniError || !petaniData) {
        return res.status(404).json({
          success: false,
          error: 'Petani tidak ditemukan'
        });
      }

      // Ambil riwayat transaksi (10 terakhir) - query sama dengan updateTrustScore
      const { data: stokEstimasiList, error: stokError } = await supabase
        .from('stok_estimasi')
        .select('id, jumlah_kg, created_at')
        .eq('petani_id', petaniIdNum)
        .order('created_at', { ascending: false })
        .limit(10);

      if (stokError) {
        return res.status(500).json({
          success: false,
          error: 'Gagal mengambil riwayat transaksi'
        });
      }

      const stokIds = stokEstimasiList?.map(s => s.id) || [];

      // Ambil intake_grading untuk stok_estimasi ini
      const { data: intakeList, error: intakeError } = await supabase
        .from('intake_grading')
        .select('stok_estimasi_id, berat_aktual_kg, created_at')
        .in('stok_estimasi_id', stokIds)
        .order('created_at', { ascending: false });

      if (intakeError) {
        return res.status(500).json({
          success: false,
          error: 'Gagal mengambil data intake grading'
        });
      }

      // Map stok_estimasi_id ke data intake
      const intakeMap = new Map(
        (intakeList || []).map((item: any) => [item.stok_estimasi_id, item])
      );

      // Gabungkan data dan hitung skor_transaksi
      const riwayat = (stokEstimasiList || []).map(stok => {
        const intake = intakeMap.get(stok.id);
        const estimasiKg = stok.jumlah_kg;
        const realisasiKg = intake?.berat_aktual_kg || null;
        const skorTransaksi = realisasiKg !== null ? hitungSkorTransaksi(estimasiKg, realisasiKg) : null;

        return {
          stok_estimasi_id: stok.id,
          estimasi_kg: estimasiKg,
          realisasi_kg: realisasiKg,
          skor_transaksi: skorTransaksi,
          tanggal: intake?.created_at || stok.created_at
        };
      });

      return res.json({
        success: true,
        data: {
          petani_id: petaniData.id,
          nama: petaniData.nama,
          skor_konsistensi: petaniData.skor_konsistensi,
          riwayat
        }
      });
    } catch (error) {
      console.error('[Trust Score] Error:', error);
      return res.status(500).json({
        success: false,
        error: 'Terjadi kesalahan server'
      });
    }
  }
);

/**
 * GET /api/trust-score/desa/:desa_id
 * Mendapatkan trust score desa agregat
 */
router.get('/desa/:desa_id',
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const { desa_id } = req.params;
      const userRole = req.user?.role;
      const userDesaId = req.user?.desa_id;

      // Validasi: desa_id harus string
      if (Array.isArray(desa_id)) {
        return res.status(400).json({
          success: false,
          error: 'Parameter desa_id tidak valid'
        });
      }

      const desaIdNum = parseInt(desa_id);

      // Validasi: petugas_kopdes hanya bisa akses desa miliknya sendiri
      if (userRole === 'petugas_kopdes') {
        if (!userDesaId) {
          return res.status(403).json({
            success: false,
            error: 'Petugas kopdes harus memiliki desa_id yang valid'
          });
        }

        if (desaIdNum !== userDesaId) {
          return res.status(403).json({
            success: false,
            error: 'Petugas kopdes hanya bisa melihat desa miliknya sendiri'
          });
        }
      }

      // Validasi: hanya role tertentu yang boleh akses
      if (!['admin', 'petugas_kopdes'].includes(userRole as string)) {
        return res.status(403).json({
          success: false,
          error: 'Role tidak memiliki akses ke endpoint ini'
        });
      }

      // Ambil data desa
      const { data: desaData, error: desaError } = await supabase
        .from('desa')
        .select('id, nama_desa, skor_konsistensi')
        .eq('id', desaIdNum)
        .single();

      if (desaError || !desaData) {
        return res.status(404).json({
          success: false,
          error: 'Desa tidak ditemukan'
        });
      }

      // Hitung jumlah petani di desa
      const { count, error: countError } = await supabase
        .from('users')
        .select('*', { count: 'exact', head: true })
        .eq('desa_id', desaIdNum)
        .eq('role', 'petani');

      if (countError) {
        return res.status(500).json({
          success: false,
          error: 'Gagal menghitung jumlah petani'
        });
      }

      return res.json({
        success: true,
        data: {
          desa_id: desaData.id,
          nama_desa: desaData.nama_desa,
          skor_konsistensi: desaData.skor_konsistensi,
          jumlah_petani: count || 0
        }
      });
    } catch (error) {
      console.error('[Trust Score] Error:', error);
      return res.status(500).json({
        success: false,
        error: 'Terjadi kesalahan server'
      });
    }
  }
);

export default router;
