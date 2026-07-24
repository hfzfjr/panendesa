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

