import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { supabaseAdmin } from '../../lib/supabase';

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
    const { data: user, error } = await supabaseAdmin
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

export default router;
