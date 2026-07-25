import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import request from 'supertest';
import express from 'express';
import { supabase } from '../../../lib/supabase';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import stokEstimasiRouter from '../stokEstimasi';

const app = express();
app.use(express.json());
app.use('/api/stok-estimasi', stokEstimasiRouter);

const JWT_SECRET = process.env.JWT_SECRET || 'test-secret';

describe('Stok Estimasi API - New Endpoint', () => {
  let testDesaId: number;
  let testKopdesUserId: number;
  let testKopdesToken: string;
  let testPetaniUserId: number;
  let testPetaniToken: string;
  let testPembeliUserId: number;
  let testPembeliToken: string;
  let testAdminUserId: number;
  let testAdminToken: string;
  let testKomoditasId: number;
  let testStokEstimasiId: number;

  beforeAll(async () => {
    // Create test desa
    const { data: desaData } = await supabase
      .from('desa')
      .insert({ nama_desa: 'Test Desa for Stok Estimasi' })
      .select()
      .single();

    if (!desaData) throw new Error('Failed to create test desa');
    testDesaId = desaData.id;

    // Create test komoditas
    const { data: komoditasData } = await supabase
      .from('komoditas')
      .insert({ nama_komoditas: 'Test Komoditas for Stok', satuan: 'kg' })
      .select()
      .single();

    if (!komoditasData) throw new Error('Failed to create test komoditas');
    testKomoditasId = komoditasData.id;

    // Create test petani user
    const petaniPasswordHash = await bcrypt.hash('password123', 10);
    const { data: petaniUser } = await supabase
      .from('users')
      .insert({
        email: `test-petani-stok-${Date.now()}@example.com`,
        password_hash: petaniPasswordHash,
        nama: 'Test Petani Stok',
        role: 'petani',
        desa_id: testDesaId
      })
      .select()
      .single();

    if (!petaniUser) throw new Error('Failed to create test petani user');
    testPetaniUserId = petaniUser.id;
    testPetaniToken = jwt.sign(
      {
        user_id: petaniUser.id,
        role: petaniUser.role,
        desa_id: petaniUser.desa_id,
        email: petaniUser.email
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Create test kopdes user (petugas_kopdes)
    const kopdesPasswordHash = await bcrypt.hash('password123', 10);
    const { data: kopdesUser } = await supabase
      .from('users')
      .insert({
        email: `test-kopdes-stok-${Date.now()}@example.com`,
        password_hash: kopdesPasswordHash,
        nama: 'Test Kopdes Stok',
        role: 'petugas_kopdes',
        desa_id: testDesaId
      })
      .select()
      .single();

    if (!kopdesUser) throw new Error('Failed to create test kopdes user');
    testKopdesUserId = kopdesUser.id;
    testKopdesToken = jwt.sign(
      {
        user_id: kopdesUser.id,
        role: kopdesUser.role,
        desa_id: kopdesUser.desa_id,
        email: kopdesUser.email
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Create test pembeli user
    const pembeliPasswordHash = await bcrypt.hash('password123', 10);
    const { data: pembeliUser } = await supabase
      .from('users')
      .insert({
        email: `test-pembeli-stok-${Date.now()}@example.com`,
        password_hash: pembeliPasswordHash,
        nama: 'Test Pembeli Stok',
        role: 'pembeli',
        desa_id: null
      })
      .select()
      .single();

    if (!pembeliUser) throw new Error('Failed to create test pembeli user');
    testPembeliUserId = pembeliUser.id;
    testPembeliToken = jwt.sign(
      {
        user_id: pembeliUser.id,
        role: pembeliUser.role,
        desa_id: pembeliUser.desa_id,
        email: pembeliUser.email
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Create test admin user
    const adminPasswordHash = await bcrypt.hash('password123', 10);
    const { data: adminUser } = await supabase
      .from('users')
      .insert({
        email: `test-admin-stok-${Date.now()}@example.com`,
        password_hash: adminPasswordHash,
        nama: 'Test Admin Stok',
        role: 'admin',
        desa_id: null
      })
      .select()
      .single();

    if (!adminUser) throw new Error('Failed to create test admin user');
    testAdminUserId = adminUser.id;
    testAdminToken = jwt.sign(
      {
        user_id: adminUser.id,
        role: adminUser.role,
        desa_id: adminUser.desa_id,
        email: adminUser.email
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Create test stok estimasi
    const { data: stokData } = await supabase
      .from('stok_estimasi')
      .insert({
        petani_id: testPetaniUserId,
        komoditas_id: testKomoditasId,
        jumlah_kg: 100,
        tanggal_target_panen: '2026-12-31',
        status: 'menunggu_panen'
      })
      .select()
      .single();

    if (!stokData) throw new Error('Failed to create test stok estimasi');
    testStokEstimasiId = stokData.id;
  });

  afterAll(async () => {
    // Clean up
    await supabase.from('stok_estimasi').delete().eq('id', testStokEstimasiId);
    await supabase.from('users').delete().eq('id', testPetaniUserId);
    await supabase.from('users').delete().eq('id', testKopdesUserId);
    await supabase.from('users').delete().eq('id', testPembeliUserId);
    await supabase.from('users').delete().eq('id', testAdminUserId);
    await supabase.from('komoditas').delete().eq('id', testKomoditasId);
    await supabase.from('desa').delete().eq('id', testDesaId);
  });

  describe('GET /api/stok-estimasi/desa/:desa_id', () => {
    it('should return stok estimasi for desa when kopdes user requests own desa', async () => {
      const response = await request(app)
        .get(`/api/stok-estimasi/desa/${testDesaId}`)
        .set('Authorization', `Bearer ${testKopdesToken}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('should return 403 when kopdes user requests different desa', async () => {
      // Create another desa
      const { data: otherDesa } = await supabase
        .from('desa')
        .insert({ nama_desa: 'Other Desa for Stok' })
        .select()
        .single();

      if (!otherDesa) throw new Error('Failed to create other desa');

      const response = await request(app)
        .get(`/api/stok-estimasi/desa/${otherDesa.id}`)
        .set('Authorization', `Bearer ${testKopdesToken}`);

      expect(response.status).toBe(403);
      expect(response.body.success).toBe(false);
      expect(response.body.error).toContain('Anda tidak memiliki akses');

      // Cleanup
      await supabase.from('desa').delete().eq('id', otherDesa.id);
    });

    it('should return stok estimasi for any desa when admin requests', async () => {
      const response = await request(app)
        .get(`/api/stok-estimasi/desa/${testDesaId}`)
        .set('Authorization', `Bearer ${testAdminToken}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('should return 403 when petani requests', async () => {
      const response = await request(app)
        .get(`/api/stok-estimasi/desa/${testDesaId}`)
        .set('Authorization', `Bearer ${testPetaniToken}`);

      expect(response.status).toBe(403);
      expect(response.body.success).toBe(false);
      expect(response.body.error).toContain('Anda tidak memiliki akses');
    });

    it('should return 403 when pembeli requests', async () => {
      const response = await request(app)
        .get(`/api/stok-estimasi/desa/${testDesaId}`)
        .set('Authorization', `Bearer ${testPembeliToken}`);

      expect(response.status).toBe(403);
      expect(response.body.success).toBe(false);
      expect(response.body.error).toContain('Anda tidak memiliki akses');
    });

    it('should return 400 when desa_id is not a number', async () => {
      const response = await request(app)
        .get('/api/stok-estimasi/desa/invalid')
        .set('Authorization', `Bearer ${testKopdesToken}`);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.error).toContain('harus berupa angka');
    });

    it('should return 200 with empty array when desa has no stok estimasi', async () => {
      // Create another desa with no stok estimasi
      const { data: emptyDesa } = await supabase
        .from('desa')
        .insert({ nama_desa: 'Empty Desa' })
        .select()
        .single();

      if (!emptyDesa) throw new Error('Failed to create empty desa');

      const response = await request(app)
        .get(`/api/stok-estimasi/desa/${emptyDesa.id}`)
        .set('Authorization', `Bearer ${testAdminToken}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data.length).toBe(0);

      // Cleanup
      await supabase.from('desa').delete().eq('id', emptyDesa.id);
    });

    it('should return 401 when not authenticated', async () => {
      const response = await request(app)
        .get(`/api/stok-estimasi/desa/${testDesaId}`);

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
    });
  });
});
