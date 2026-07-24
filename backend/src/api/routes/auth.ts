import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { supabase } from '../../lib/supabase';
import { authRateLimit } from '../middlewares/rateLimitMiddleware';
import {
  generateRefreshToken,
  storeRefreshToken,
  validateRefreshToken,
  revokeRefreshToken,
  ACCESS_TOKEN_EXPIRY
} from '../../lib/refreshToken';

const router = Router();

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is not set');
}

// POST /api/auth/oauth-exchange
// Exchange Supabase OAuth access token for custom JWT token
// This allows OAuth users to use the same authentication system as manual login users
router.post('/oauth-exchange', authRateLimit, async (req: Request, res: Response) => {
  try {
    const { access_token } = req.body;

    // Validation
    if (!access_token) {
      return res.status(400).json({
        success: false,
        error: 'Access token diperlukan'
      });
    }

    // Verify the Supabase access token by getting user info
    // This validates the token signature and expiration with Supabase
    const { data: { user }, error: authError } = await supabase.auth.getUser(access_token);

    if (authError || !user) {
      return res.status(401).json({
        success: false,
        error: 'Token Supabase tidak valid atau sudah kadaluarsa'
      });
    }

    // Get the auth_id (UUID) from Supabase user
    const auth_id = user.id;

    // Query custom users table by auth_id
    const { data: customUser, error: userError } = await supabase
      .from('users')
      .select('id, nama, role, desa_id, email, profile_completed, skor_konsistensi')
      .eq('auth_id', auth_id)
      .single();

    if (userError || !customUser) {
      return res.status(404).json({
        success: false,
        error: 'User tidak ditemukan. Silakan coba lagi atau hubungi admin jika masalah berlanjut.'
      });
    }

    // Generate custom JWT access token with IDENTICAL payload structure to manual login
    const accessToken = jwt.sign(
      {
        user_id: customUser.id,
        role: customUser.role,
        desa_id: customUser.desa_id,
        email: customUser.email
      },
      JWT_SECRET,
      { expiresIn: ACCESS_TOKEN_EXPIRY }
    );

    // Generate refresh token (long-lived: 30 days)
    const refreshToken = generateRefreshToken();
    const refreshStored = await storeRefreshToken(customUser.id, refreshToken);

    if (!refreshStored) {
      console.error('Failed to store refresh token for user:', customUser.id);
      // Continue anyway - user can still login, just won't have refresh capability
    }

    // Return success response with both tokens and user data
    return res.status(200).json({
      success: true,
      data: {
        access_token: accessToken,
        refresh_token: refreshToken,
        user: {
          id: customUser.id,
          nama: customUser.nama,
          role: customUser.role,
          desa_id: customUser.desa_id,
          email: customUser.email,
          profile_completed: customUser.profile_completed
        }
      }
    });
  } catch (error) {
    console.error('OAuth exchange error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// POST /api/auth/login
router.post('/login', authRateLimit, async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Email dan password diperlukan'
      });
    }

    // Query user from database using admin client (bypass RLS)
    const { data: user, error } = await supabase
      .from('users')
      .select('id, nama, role, desa_id, email, password_hash, skor_konsistensi')
      .eq('email', email)
      .single();

    if (error || !user) {
      return res.status(401).json({
        success: false,
        error: 'Email atau password tidak valid'
      });
    }

    // SECURITY: Reject login if password_hash is NULL (OAuth users must use OAuth flow)
    if (!user.password_hash) {
      return res.status(401).json({
        success: false,
        error: 'Email atau password tidak valid'
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        error: 'Email atau password tidak valid'
      });
    }

    // Strip password_hash from user object before response
    const { password_hash, ...userSafe } = user;

    // Generate JWT access token (short-lived: 2 hours)
    const accessToken = jwt.sign(
      {
        user_id: userSafe.id,
        role: userSafe.role,
        desa_id: userSafe.desa_id,
        email: userSafe.email
      },
      JWT_SECRET,
      { expiresIn: ACCESS_TOKEN_EXPIRY }
    );

    // Generate refresh token (long-lived: 30 days)
    const refreshToken = generateRefreshToken();
    const refreshStored = await storeRefreshToken(userSafe.id, refreshToken);

    if (!refreshStored) {
      console.error('Failed to store refresh token for user:', userSafe.id);
      // Continue anyway - user can still login, just won't have refresh capability
    }

    // Return success response with both tokens
    return res.status(200).json({
      success: true,
      data: {
        access_token: accessToken,
        refresh_token: refreshToken,
        user: {
          id: userSafe.id,
          nama: userSafe.nama,
          role: userSafe.role,
          desa_id: userSafe.desa_id,
          email: userSafe.email
        }
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// POST /api/auth/refresh
// Exchange refresh token for new access token
router.post('/refresh', authRateLimit, async (req: Request, res: Response) => {
  try {
    const { refresh_token } = req.body;

    // Validation
    if (!refresh_token) {
      return res.status(400).json({
        success: false,
        error: 'Refresh token diperlukan'
      });
    }

    // Validate refresh token and get user ID
    const userId = await validateRefreshToken(refresh_token);

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'Refresh token tidak valid, silakan login ulang'
      });
    }

    // Query user from database
    const { data: user, error } = await supabase
      .from('users')
      .select('id, nama, role, desa_id, email')
      .eq('id', userId)
      .single();

    if (error || !user) {
      return res.status(401).json({
        success: false,
        error: 'User tidak ditemukan, silakan login ulang'
      });
    }

    // Generate new access token
    const newAccessToken = jwt.sign(
      {
        user_id: user.id,
        role: user.role,
        desa_id: user.desa_id,
        email: user.email
      },
      JWT_SECRET,
      { expiresIn: ACCESS_TOKEN_EXPIRY }
    );

    // Return new access token
    return res.status(200).json({
      success: true,
      data: {
        access_token: newAccessToken
      }
    });
  } catch (error) {
    console.error('Refresh token error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// POST /api/auth/logout
// Revoke refresh token
router.post('/logout', authRateLimit, async (req: Request, res: Response) => {
  try {
    const { refresh_token } = req.body;

    // Validation
    if (!refresh_token) {
      return res.status(400).json({
        success: false,
        error: 'Refresh token diperlukan'
      });
    }

    // Revoke the refresh token
    const revoked = await revokeRefreshToken(refresh_token);

    if (!revoked) {
      // Token might not exist or already revoked - that's okay for logout
      console.log('Refresh token not found or already revoked during logout');
    }

    // Return success
    return res.status(200).json({
      success: true,
      message: 'Logout berhasil'
    });
  } catch (error) {
    console.error('Logout error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// POST /api/auth/register
// SECURITY: Self-registration is hardcoded to role='pembeli' to prevent privilege escalation
// For other roles, admin must create accounts via a separate protected endpoint
router.post('/register', authRateLimit, async (req: Request, res: Response) => {
  try {
    const {
      email,
      password,
      nama_lengkap,
      nik,
      desa_id,
      nama_koperasi,
      nomor_badan_hukum,
      nama_penanggung_jawab,
      tipe_pembeli,
      alamat_pengiriman,
      nomor_hp
    } = req.body;

    // SECURITY: Strip role from request body to prevent self-assignment
    const { role, ...safeBody } = req.body;

    // Basic validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Email dan password diperlukan'
      });
    }

    // Check if email already exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: 'Email sudah terdaftar'
      });
    }

    // Hash password
    const password_hash = await bcrypt.hash(password, 10);

    // SECURITY: Hardcode role to 'pembeli' for self-registration
    let userData: any = {
      email,
      password_hash,
      role: 'pembeli', // HARDCODED: Self-registration always creates 'pembeli'
      nama: nama_lengkap || email.split('@')[0],
      created_at: new Date().toISOString()
    };

    // Handle pembeli-specific fields (only role allowed for self-registration)
    if (nama_lengkap) {
      userData.nama = nama_lengkap;
    }

    // Insert user
    const { data: newUser, error: insertError } = await supabase
      .from('users')
      .insert(userData)
      .select()
      .single();

    if (insertError || !newUser) {
      console.error('Insert error:', insertError);
      return res.status(500).json({
        success: false,
        error: 'Gagal membuat akun'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        user_id: newUser.id,
        role: newUser.role,
        desa_id: newUser.desa_id
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Return success response
    return res.status(201).json({
      success: true,
      data: {
        token,
        role: newUser.role,
        user_id: newUser.id
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

export default router;
