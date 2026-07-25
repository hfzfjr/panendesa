import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import request from 'supertest';
import express from 'express';
import { supabase } from '../../../lib/supabase';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ordersRouter from '../orders';

const app = express();
app.use(express.json());
app.use('/api/orders', ordersRouter);

const JWT_SECRET = process.env.JWT_SECRET || 'test-secret';

describe('Orders API - New Endpoints', () => {
  let testKopdesId: number;
  let testKopdesUserId: number;
  let testKopdesToken: string;
  let testPembeliId: number;
  let testPembeliUserId: number;
  let testPembeliToken: string;
  let testAdminUserId: number;
  let testAdminToken: string;
  let testDesaId: number;
  let testOrderId: number;
  let testKomoditasId: number;

  beforeAll(async () => {
    // Create test desa
    const { data: desaData } = await supabase
      .from('desa')
      .insert({ nama_desa: 'Test Desa for Orders' })
      .select()
      .single();

    if (!desaData) throw new Error('Failed to create test desa');
    testDesaId = desaData.id;

    // Create test kopdes
    const { data: kopdesData } = await supabase
      .from('kopdes')
      .insert({
        desa_id: testDesaId,
        nama_kopdes: 'Test Kopdes',
        fee_persen: 5,
        aktif: true
      })
      .select()
      .single();

    if (!kopdesData) throw new Error('Failed to create test kopdes');
    testKopdesId = kopdesData.id;

    // Create test komoditas
    const { data: komoditasData } = await supabase
      .from('komoditas')
      .insert({ nama_komoditas: 'Test Komoditas', satuan: 'kg' })
      .select()
      .single();

    if (!komoditasData) throw new Error('Failed to create test komoditas');
    testKomoditasId = komoditasData.id;

    // Create test kopdes user (petugas_kopdes)
    const kopdesPasswordHash = await bcrypt.hash('password123', 10);
    const { data: kopdesUser } = await supabase
      .from('users')
      .insert({
        email: `test-kopdes-${Date.now()}@example.com`,
        password_hash: kopdesPasswordHash,
        nama: 'Test Kopdes User',
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
        email: `test-pembeli-${Date.now()}@example.com`,
        password_hash: pembeliPasswordHash,
        nama: 'Test Pembeli User',
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
        email: `test-admin-${Date.now()}@example.com`,
        password_hash: adminPasswordHash,
        nama: 'Test Admin User',
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

    // Create test order
    const { data: orderData } = await supabase
      .from('orders')
      .insert({
        pembeli_id: testPembeliUserId,
        komoditas_id: testKomoditasId,
        kopdes_id: testKopdesId,
        jumlah_diminta_kg: 100,
        status: 'dikonfirmasi_sementara'
      })
      .select()
      .single();

    if (!orderData) throw new Error('Failed to create test order');
    testOrderId = orderData.id;
  });

  afterAll(async () => {
    // Clean up
    await supabase.from('orders').delete().eq('id', testOrderId);
    await supabase.from('users').delete().eq('id', testKopdesUserId);
    await supabase.from('users').delete().eq('id', testPembeliUserId);
    await supabase.from('users').delete().eq('id', testAdminUserId);
    await supabase.from('kopdes').delete().eq('id', testKopdesId);
    await supabase.from('komoditas').delete().eq('id', testKomoditasId);
    await supabase.from('desa').delete().eq('id', testDesaId);
  });

  describe('GET /api/orders/kopdes/:kopdes_id', () => {
    it('should return orders for kopdes when kopdes user requests own kopdes', async () => {
      const response = await request(app)
        .get(`/api/orders/kopdes/${testKopdesId}`)
        .set('Authorization', `Bearer ${testKopdesToken}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('should return 403 when kopdes user requests different kopdes', async () => {
      // Create another kopdes in different desa
      const { data: otherDesa } = await supabase
        .from('desa')
        .insert({ nama_desa: 'Other Desa' })
        .select()
        .single();

      if (!otherDesa) throw new Error('Failed to create other desa');

      const { data: otherKopdes } = await supabase
        .from('kopdes')
        .insert({
          desa_id: otherDesa.id,
          nama_kopdes: 'Other Kopdes',
          fee_persen: 5,
          aktif: true
        })
        .select()
        .single();

      if (!otherKopdes) throw new Error('Failed to create other kopdes');

      const response = await request(app)
        .get(`/api/orders/kopdes/${otherKopdes.id}`)
        .set('Authorization', `Bearer ${testKopdesToken}`);

      expect(response.status).toBe(403);
      expect(response.body.success).toBe(false);
      expect(response.body.error).toContain('Anda tidak memiliki akses');

      // Cleanup
      await supabase.from('kopdes').delete().eq('id', otherKopdes.id);
      await supabase.from('desa').delete().eq('id', otherDesa.id);
    });

    it('should return orders for any kopdes when admin requests', async () => {
      const response = await request(app)
        .get(`/api/orders/kopdes/${testKopdesId}`)
        .set('Authorization', `Bearer ${testAdminToken}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('should return 403 when pembeli requests', async () => {
      const response = await request(app)
        .get(`/api/orders/kopdes/${testKopdesId}`)
        .set('Authorization', `Bearer ${testPembeliToken}`);

      expect(response.status).toBe(403);
      expect(response.body.success).toBe(false);
    });

    it('should return 400 when kopdes_id is not a number', async () => {
      const response = await request(app)
        .get('/api/orders/kopdes/invalid')
        .set('Authorization', `Bearer ${testKopdesToken}`);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.error).toContain('harus berupa angka');
    });

    it('should return 404 when kopdes does not exist', async () => {
      const response = await request(app)
        .get('/api/orders/kopdes/99999')
        .set('Authorization', `Bearer ${testAdminToken}`);

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.error).toContain('Kopdes tidak ditemukan');
    });

    it('should return 401 when not authenticated', async () => {
      const response = await request(app)
        .get(`/api/orders/kopdes/${testKopdesId}`);

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /api/orders/:id', () => {
    it('should return order detail when pembeli requests own order', async () => {
      const response = await request(app)
        .get(`/api/orders/${testOrderId}`)
        .set('Authorization', `Bearer ${testPembeliToken}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.id).toBe(testOrderId);
      expect(response.body.data.pembeli_id).toBe(testPembeliUserId);
    });

    it('should return order detail when kopdes user requests related order', async () => {
      const response = await request(app)
        .get(`/api/orders/${testOrderId}`)
        .set('Authorization', `Bearer ${testKopdesToken}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.id).toBe(testOrderId);
    });

    it('should return order detail when admin requests any order', async () => {
      const response = await request(app)
        .get(`/api/orders/${testOrderId}`)
        .set('Authorization', `Bearer ${testAdminToken}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.id).toBe(testOrderId);
    });

    it('should return 403 when pembeli requests different order', async () => {
      // Create another pembeli
      const otherPasswordHash = await bcrypt.hash('password123', 10);
      const { data: otherPembeli } = await supabase
        .from('users')
        .insert({
          email: `other-pembeli-${Date.now()}@example.com`,
          password_hash: otherPasswordHash,
          nama: 'Other Pembeli',
          role: 'pembeli',
          desa_id: null
        })
        .select()
        .single();

      if (!otherPembeli) throw new Error('Failed to create other pembeli');

      const otherToken = jwt.sign(
        {
          user_id: otherPembeli.id,
          role: otherPembeli.role,
          desa_id: otherPembeli.desa_id,
          email: otherPembeli.email
        },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      const response = await request(app)
        .get(`/api/orders/${testOrderId}`)
        .set('Authorization', `Bearer ${otherToken}`);

      expect(response.status).toBe(403);
      expect(response.body.success).toBe(false);
      expect(response.body.error).toContain('Anda tidak memiliki akses');

      // Cleanup
      await supabase.from('users').delete().eq('id', otherPembeli.id);
    });

    it('should return 403 when kopdes user requests order from different desa', async () => {
      // Create kopdes in different desa
      const { data: otherDesa } = await supabase
        .from('desa')
        .insert({ nama_desa: 'Other Desa for Order' })
        .select()
        .single();

      if (!otherDesa) throw new Error('Failed to create other desa');

      const { data: otherKopdes } = await supabase
        .from('kopdes')
        .insert({
          desa_id: otherDesa.id,
          nama_kopdes: 'Other Kopdes for Order',
          fee_persen: 5,
          aktif: true
        })
        .select()
        .single();

      if (!otherKopdes) throw new Error('Failed to create other kopdes');

      const otherPasswordHash = await bcrypt.hash('password123', 10);
      const { data: otherKopdesUser } = await supabase
        .from('users')
        .insert({
          email: `other-kopdes-user-${Date.now()}@example.com`,
          password_hash: otherPasswordHash,
          nama: 'Other Kopdes User',
          role: 'petugas_kopdes',
          desa_id: otherDesa.id
        })
        .select()
        .single();

      if (!otherKopdesUser) throw new Error('Failed to create other kopdes user');

      const otherKopdesToken = jwt.sign(
        {
          user_id: otherKopdesUser.id,
          role: otherKopdesUser.role,
          desa_id: otherKopdesUser.desa_id,
          email: otherKopdesUser.email
        },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      const response = await request(app)
        .get(`/api/orders/${testOrderId}`)
        .set('Authorization', `Bearer ${otherKopdesToken}`);

      expect(response.status).toBe(403);
      expect(response.body.success).toBe(false);
      expect(response.body.error).toContain('Anda tidak memiliki akses');

      // Cleanup
      await supabase.from('users').delete().eq('id', otherKopdesUser.id);
      await supabase.from('kopdes').delete().eq('id', otherKopdes.id);
      await supabase.from('desa').delete().eq('id', otherDesa.id);
    });

    it('should return 403 when petani requests', async () => {
      const petaniPasswordHash = await bcrypt.hash('password123', 10);
      const { data: petaniUser } = await supabase
        .from('users')
        .insert({
          email: `test-petani-${Date.now()}@example.com`,
          password_hash: petaniPasswordHash,
          nama: 'Test Petani',
          role: 'petani',
          desa_id: testDesaId
        })
        .select()
        .single();

      if (!petaniUser) throw new Error('Failed to create test petani');

      const petaniToken = jwt.sign(
        {
          user_id: petaniUser.id,
          role: petaniUser.role,
          desa_id: petaniUser.desa_id,
          email: petaniUser.email
        },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      const response = await request(app)
        .get(`/api/orders/${testOrderId}`)
        .set('Authorization', `Bearer ${petaniToken}`);

      expect(response.status).toBe(403);
      expect(response.body.success).toBe(false);
      expect(response.body.error).toContain('Anda tidak memiliki akses');

      // Cleanup
      await supabase.from('users').delete().eq('id', petaniUser.id);
    });

    it('should return 400 when id is not a number', async () => {
      const response = await request(app)
        .get('/api/orders/invalid')
        .set('Authorization', `Bearer ${testPembeliToken}`);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.error).toContain('harus berupa angka');
    });

    it('should return 404 when order does not exist', async () => {
      const response = await request(app)
        .get('/api/orders/99999')
        .set('Authorization', `Bearer ${testAdminToken}`);

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.error).toContain('Order tidak ditemukan');
    });

    it('should return 401 when not authenticated', async () => {
      const response = await request(app)
        .get(`/api/orders/${testOrderId}`);

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
    });
  });
});
