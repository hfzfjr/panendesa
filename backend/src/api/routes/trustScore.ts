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
      // Mulai dari intake_grading (hanya yang punya intake), bukan dari stok_estimasi
      const { data: stokEstimasiList, error: stokError } = await supabase
        .from('stok_estimasi')
        .select('id, jumlah_kg')
        .eq('petani_id', petaniIdNum);

      if (stokError) {
        return res.status(500).json({
          success: false,
          error: 'Gagal mengambil riwayat transaksi'
        });
      }

      if (!stokEstimasiList || stokEstimasiList.length === 0) {
        return res.json({
          success: true,
          data: {
            skor_konsistensi: petaniData.skor_konsistensi,
            jumlah_transaksi_dihitung: 0,
            riwayat: []
          }
        });
      }

      const stokIds = stokEstimasiList.map(s => s.id);
      const stokMap = new Map(stokEstimasiList.map(s => [s.id, s.jumlah_kg]));

      // Ambil intake_grading untuk stok_estimasi ini, order by created_at desc, limit 10
      const { data: intakeList, error: intakeError } = await supabase
        .from('intake_grading')
        .select('stok_estimasi_id, berat_aktual_kg')
        .in('stok_estimasi_id', stokIds)
        .order('created_at', { ascending: false })
        .limit(10);

      if (intakeError) {
        return res.status(500).json({
          success: false,
          error: 'Gagal mengambil data intake grading'
        });
      }

      // Hanya include entri yang punya intake_grading (realisasi tidak null)
      const riwayat = (intakeList || []).map((intake: any) => {
        const estimasiKg = stokMap.get(intake.stok_estimasi_id) || 0;
        const realisasiKg = intake.berat_aktual_kg;
        const skorTransaksi = hitungSkorTransaksi(estimasiKg, realisasiKg);

        return {
          stok_estimasi_id: intake.stok_estimasi_id,
          estimasi_kg: estimasiKg,
          realisasi_kg: realisasiKg,
          skor_transaksi: skorTransaksi
        };
      });

      const jumlah_transaksi_dihitung = riwayat.length;

      return res.json({
        success: true,
        data: {
          skor_konsistensi: petaniData.skor_konsistensi,
          jumlah_transaksi_dihitung,
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
  });

/**
 * GET /api/trust-score/desa/:desa_id
 * Mendapatkan trust score desa agregat
 */
router.get('/desa/:desa_id',
  verifyToken,
  async (req: Request, res: Response) => {
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
          skor_konsistensi_desa: desaData.skor_konsistensi,
          jumlah_petani_aktif: count || 0
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
