import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { supabase } from '../../lib/supabase';

const router = Router();

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is not set');
}

// POST /api/auth/login
router.post('/login', async (req: Request, res: Response) => {
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
      .select('*')
      .eq('email', email)
      .single();

    if (error || !user) {
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

    // Generate JWT token
    const token = jwt.sign(
      {
        user_id: user.id,
        role: user.role,
        desa_id: user.desa_id
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Return success response
    return res.status(200).json({
      success: true,
      data: {
        token,
        role: user.role,
        user_id: user.id
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

// POST /api/auth/register
router.post('/register', async (req: Request, res: Response) => {
  try {
    const {
      email,
      password,
      role,
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

    // Basic validation
    if (!email || !password || !role) {
      return res.status(400).json({
        success: false,
        error: 'Email, password, dan role diperlukan'
      });
    }

    // Validate role
    const validRoles = ['petani', 'petugas_kopdes', 'pembeli', 'admin'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({
        success: false,
        error: 'Role tidak valid'
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

    // Role-specific validation and data preparation
    let userData: any = {
      email,
      password_hash,
      role,
      nama: nama_lengkap || email.split('@')[0],
      created_at: new Date().toISOString()
    };

    // Handle role-specific fields
    if (role === 'petani') {
      if (!nama_lengkap || !nik) {
        return res.status(400).json({
          success: false,
          error: 'Nama lengkap dan NIK diperlukan untuk petani'
        });
      }
      userData.nama = nama_lengkap;
      // desa_id is optional for petani (can be set later)
      if (desa_id) {
        userData.desa_id = desa_id;
      }
    } else if (role === 'petugas_kopdes') {
      if (!nama_koperasi || !nomor_badan_hukum || !nama_penanggung_jawab) {
        return res.status(400).json({
          success: false,
          error: 'Data koperasi tidak lengkap'
        });
      }
      userData.nama = nama_penanggung_jawab;
      // For kopdes, we need to handle desa_id - this is a simplified version
      // In production, you'd need to create/find the desa and kopdes records
      if (desa_id) {
        userData.desa_id = desa_id;
      }
    } else if (role === 'pembeli') {
      if (!nama_lengkap) {
        return res.status(400).json({
          success: false,
          error: 'Nama lengkap diperlukan untuk pembeli'
        });
      }
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
