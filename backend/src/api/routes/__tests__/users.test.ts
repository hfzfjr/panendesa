import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import request from 'supertest';
import express from 'express';
import { supabase } from '../../../lib/supabase';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import usersRouter from '../users';

const app = express();
app.use(express.json());
app.use('/api/users', usersRouter);

const JWT_SECRET = process.env.JWT_SECRET || 'test-secret';

describe('Users API - Complete Profile', () => {
  let testUserId: number;
  let testToken: string;

  beforeAll(async () => {
    // Create a test user with profile_completed = false
    const passwordHash = await bcrypt.hash('password123', 10);
    const { data: newUser, error } = await supabase
      .from('users')
      .insert({
        email: `test-oauth-user-${Date.now()}@example.com`,
        password_hash: passwordHash,
        nama: 'Test OAuth User',
        role: 'pembeli',
        desa_id: null,
        profile_completed: false
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
  });

  afterAll(async () => {
    // Clean up test user
    if (testUserId) {
      await supabase.from('users').delete().eq('id', testUserId);
    }
  });

  it('should complete profile with valid nama', async () => {
    const response = await request(app)
      .patch('/api/users/me/complete-profile')
      .set('Authorization', `Bearer ${testToken}`)
      .send({ nama: 'Test User Updated' });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.nama).toBe('Test User Updated');
    expect(response.body.data.profile_completed).toBe(true);
    expect(response.body.data.role).toBe('pembeli'); // Role should not change
  });

  it('should reject empty nama', async () => {
    const response = await request(app)
      .patch('/api/users/me/complete-profile')
      .set('Authorization', `Bearer ${testToken}`)
      .send({ nama: '' });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.error).toContain('Nama wajib diisi');
  });

  it('should reject missing nama', async () => {
    const response = await request(app)
      .patch('/api/users/me/complete-profile')
      .set('Authorization', `Bearer ${testToken}`)
      .send({});

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.error).toContain('Nama wajib diisi');
  });

  it('should ignore role field in request body (security test)', async () => {
    // First, reset profile_completed to false for testing
    await supabase.from('users').update({ profile_completed: false }).eq('id', testUserId);

    const response = await request(app)
      .patch('/api/users/me/complete-profile')
      .set('Authorization', `Bearer ${testToken}`)
      .send({
        nama: 'Test User',
        role: 'admin'  // Attempt to self-assign admin role
      });

    expect(response.status).toBe(200);
    expect(response.body.data.role).toBe('pembeli'); // Role should still be 'pembeli', not 'admin'
  });

  it('should ignore desa_id field in request body (security test)', async () => {
    // Reset profile_completed to false for testing
    await supabase.from('users').update({ profile_completed: false }).eq('id', testUserId);

    const response = await request(app)
      .patch('/api/users/me/complete-profile')
      .set('Authorization', `Bearer ${testToken}`)
      .send({
        nama: 'Test User',
        desa_id: 1  // Attempt to self-assign desa_id
      });

    expect(response.status).toBe(200);
    expect(response.body.data.desa_id).toBeNull(); // desa_id should still be null
  });

  it('should get current user profile', async () => {
    const response = await request(app)
      .get('/api/users/me')
      .set('Authorization', `Bearer ${testToken}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.id).toBe(testUserId);
    expect(response.body.data.profile_completed).toBeDefined();
  });

  it('should reject request without authentication', async () => {
    const response = await request(app)
      .patch('/api/users/me/complete-profile')
      .send({ nama: 'Test User' });

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
  });
});

describe('Users API - GET /api/users/me with kopdes_id', () => {
  let petugasKopdesUserId: number;
  let petugasKopdesToken: string;
  let testDesaId: number;
  let testKopdesId: number;
  let nonPetugasUserId: number;
  let nonPetugasToken: string;

  beforeAll(async () => {
    // Create test desa
    const { data: newDesa } = await supabase
      .from('desa')
      .insert({
        nama_desa: 'Desa Test Kopdes'
      })
      .select()
      .single();

    if (!newDesa) throw new Error('Failed to create test desa');
    testDesaId = newDesa.id;

    // Create test kopdes
    const { data: newKopdes } = await supabase
      .from('kopdes')
      .insert({
        desa_id: testDesaId,
        nama_kopdes: 'Kopdes Test',
        fee_persen: 5.0
      })
      .select()
      .single();

    if (!newKopdes) throw new Error('Failed to create test kopdes');
    testKopdesId = newKopdes.id;

    // Create petugas_kopdes user
    const passwordHash = await bcrypt.hash('password123', 10);
    const { data: newUser } = await supabase
      .from('users')
      .insert({
        email: `test-petugas-kopdes-${Date.now()}@example.com`,
        password_hash: passwordHash,
        nama: 'Test Petugas Kopdes',
        role: 'petugas_kopdes',
        desa_id: testDesaId,
        profile_completed: true
      })
      .select()
      .single();

    if (!newUser) throw new Error('Failed to create test petugas_kopdes');
    petugasKopdesUserId = newUser.id;

    petugasKopdesToken = jwt.sign(
      {
        user_id: newUser.id,
        role: newUser.role,
        desa_id: newUser.desa_id
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Create non-petugas_kopdes user for comparison
    const { data: nonPetugasUser } = await supabase
      .from('users')
      .insert({
        email: `test-non-petugas-${Date.now()}@example.com`,
        password_hash: passwordHash,
        nama: 'Test Non Petugas',
        role: 'petani',
        desa_id: null,
        profile_completed: true
      })
      .select()
      .single();

    if (!nonPetugasUser) throw new Error('Failed to create test non-petugas');
    nonPetugasUserId = nonPetugasUser.id;

    nonPetugasToken = jwt.sign(
      {
        user_id: nonPetugasUser.id,
        role: nonPetugasUser.role,
        desa_id: nonPetugasUser.desa_id
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
  });

  afterAll(async () => {
    // Clean up
    if (petugasKopdesUserId) {
      await supabase.from('users').delete().eq('id', petugasKopdesUserId);
    }
    if (nonPetugasUserId) {
      await supabase.from('users').delete().eq('id', nonPetugasUserId);
    }
    if (testKopdesId) {
      await supabase.from('kopdes').delete().eq('id', testKopdesId);
    }
    if (testDesaId) {
      await supabase.from('desa').delete().eq('id', testDesaId);
    }
  });

  it('should include kopdes_id for petugas_kopdes role', async () => {
    const response = await request(app)
      .get('/api/users/me')
      .set('Authorization', `Bearer ${petugasKopdesToken}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.kopdes_id).toBe(testKopdesId);
  });

  it('should return null kopdes_id for non-petugas_kopdes role', async () => {
    const response = await request(app)
      .get('/api/users/me')
      .set('Authorization', `Bearer ${nonPetugasToken}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.kopdes_id).toBeNull();
  });

  it('should return null kopdes_id if kopdes not found for desa', async () => {
    // Create desa without kopdes
    const { data: orphanDesa } = await supabase
      .from('desa')
      .insert({
        nama_desa: 'Desa Orphan Test'
      })
      .select()
      .single();

    if (!orphanDesa) throw new Error('Failed to create orphan desa');

    // Create petugas_kopdes for desa without kopdes
    const passwordHash = await bcrypt.hash('password123', 10);
    const { data: orphanUser } = await supabase
      .from('users')
      .insert({
        email: `test-orphan-kopdes-${Date.now()}@example.com`,
        password_hash: passwordHash,
        nama: 'Test Orphan Petugas',
        role: 'petugas_kopdes',
        desa_id: orphanDesa.id,
        profile_completed: true
      })
      .select()
      .single();

    if (!orphanUser) throw new Error('Failed to create orphan petugas');

    const orphanToken = jwt.sign(
      {
        user_id: orphanUser.id,
        role: orphanUser.role,
        desa_id: orphanUser.desa_id
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    const response = await request(app)
      .get('/api/users/me')
      .set('Authorization', `Bearer ${orphanToken}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.kopdes_id).toBeNull();

    // Clean up
    await supabase.from('users').delete().eq('id', orphanUser.id);
    await supabase.from('desa').delete().eq('id', orphanDesa.id);
  });
});

