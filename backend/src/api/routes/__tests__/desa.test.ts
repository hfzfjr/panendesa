import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import request from 'supertest';
import express from 'express';
import { supabase } from '../../../lib/supabase';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import desaRouter from '../desa';

const app = express();
app.use(express.json());
app.use('/api/desa', desaRouter);

const JWT_SECRET = process.env.JWT_SECRET || 'test-secret';

describe('Desa API - GET /api/desa', () => {
  let testUserId: number;
  let testToken: string;
  let testDesaIds: number[] = [];

  beforeAll(async () => {
    // Create a test user
    const passwordHash = await bcrypt.hash('password123', 10);
    const { data: newUser, error } = await supabase
      .from('users')
      .insert({
        email: `test-desa-user-${Date.now()}@example.com`,
        password_hash: passwordHash,
        nama: 'Test Desa User',
        role: 'pembeli',
        desa_id: null,
        profile_completed: true
      })
      .select()
      .single();

    if (error || !newUser) {
      throw new Error(`Failed to create test user: ${error?.message}`);
    }

    testUserId = newUser.id;
    testToken = jwt.sign(
      {
        user_id: newUser.id,
        role: newUser.role,
        desa_id: newUser.desa_id
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Create test desa records
    const desa1 = await supabase
      .from('desa')
      .insert({
        nama_desa: 'Desa Test 1',
        latitude: -6.2088,
        longitude: 106.8456,
        skor_konsistensi: 95.50
      })
      .select()
      .single();

    if (desa1.data) testDesaIds.push(desa1.data.id);

    const desa2 = await supabase
      .from('desa')
      .insert({
        nama_desa: 'Desa Test 2',
        latitude: -6.1751,
        longitude: 106.8650,
        skor_konsistensi: 88.75
      })
      .select()
      .single();

    if (desa2.data) testDesaIds.push(desa2.data.id);
  });

  afterAll(async () => {
    // Clean up test data
    if (testUserId) {
      await supabase.from('users').delete().eq('id', testUserId);
    }
    for (const desaId of testDesaIds) {
      await supabase.from('desa').delete().eq('id', desaId);
    }
  });

  it('should get list of desa with authentication', async () => {
    const response = await request(app)
      .get('/api/desa')
      .set('Authorization', `Bearer ${testToken}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.data.length).toBeGreaterThan(0);
  });

  it('should include required fields in response', async () => {
    const response = await request(app)
      .get('/api/desa')
      .set('Authorization', `Bearer ${testToken}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);

    if (response.body.data.length > 0) {
      const firstDesa = response.body.data[0];
      expect(firstDesa).toHaveProperty('desa_id');
      expect(firstDesa).toHaveProperty('nama_desa');
      expect(firstDesa).toHaveProperty('kapasitas_estimasi_kg');
      expect(firstDesa).toHaveProperty('kapasitas_tervalidasi_kg');
      expect(firstDesa).toHaveProperty('skor_konsistensi_desa');
    }
  });

  it('should reject request without authentication', async () => {
    const response = await request(app)
      .get('/api/desa');

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
  });

  it('should return correct response format', async () => {
    const response = await request(app)
      .get('/api/desa')
      .set('Authorization', `Bearer ${testToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('success');
    expect(response.body).toHaveProperty('data');
    expect(typeof response.body.success).toBe('boolean');
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it('should include capacity data for each desa', async () => {
    const response = await request(app)
      .get('/api/desa')
      .set('Authorization', `Bearer ${testToken}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);

    if (response.body.data.length > 0) {
      const firstDesa = response.body.data[0];
      expect(typeof firstDesa.kapasitas_estimasi_kg).toBe('number');
      expect(typeof firstDesa.kapasitas_tervalidasi_kg).toBe('number');
      expect(firstDesa.kapasitas_estimasi_kg).toBeGreaterThanOrEqual(0);
      expect(firstDesa.kapasitas_tervalidasi_kg).toBeGreaterThanOrEqual(0);
    }
  });
});
