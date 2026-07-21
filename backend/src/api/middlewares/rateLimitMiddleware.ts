import { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';

const WINDOW_MS = 60 * 1000; // 1 minute window
const MAX_REQUESTS = 20; // 20 requests per minute per user

// Custom key generator based on user_id from JWT
const keyGenerator = (req: Request): string => {
  const userId = req.user?.user_id;
  if (!userId) {
    return 'anonymous';
  }
  console.log(`[Rate Limit] User ID: ${userId}, Key: ${userId.toString()}`);
  return userId.toString();
};

// Rate limiter middleware for /api/intake-grading endpoint
export const intakeGradingRateLimit = rateLimit({
  windowMs: WINDOW_MS,
  max: MAX_REQUESTS,
  keyGenerator,
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  handler: (req: Request, res: Response) => {
    console.log(`[Rate Limit] Limit exceeded for user: ${req.user?.user_id}`);
    res.status(429).json({
      success: false,
      error: 'Terlalu banyak permintaan. Maksimal 20 permintaan per menit per petugas. Silakan tunggu sebentar.'
    });
  },
  skip: (req: Request) => {
    // Skip rate limiting for admin users
    const shouldSkip = req.user?.role === 'admin';
    if (shouldSkip) {
      console.log(`[Rate Limit] Skipping for admin: ${req.user?.user_id}`);
    }
    return shouldSkip;
  }
});
