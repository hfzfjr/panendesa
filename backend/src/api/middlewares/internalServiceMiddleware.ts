import { Request, Response, NextFunction } from 'express';

const INTERNAL_SERVICE_KEY = process.env.INTERNAL_SERVICE_KEY;

if (!INTERNAL_SERVICE_KEY) {
  throw new Error('INTERNAL_SERVICE_KEY environment variable is not set');
}

/**
 * Middleware untuk memverifikasi request dari internal service
 * Cek header X-Internal-Service-Key untuk akses ke endpoint internal
 */
export const verifyInternalService = (req: Request, res: Response, next: NextFunction): void => {
  const internalKey = req.headers['x-internal-service-key'];

  if (!internalKey) {
    res.status(403).json({
      success: false,
      error: 'Akses ditolak - endpoint internal'
    });
    return;
  }

  if (internalKey !== INTERNAL_SERVICE_KEY) {
    res.status(403).json({
      success: false,
      error: 'Akses ditolak - endpoint internal'
    });
    return;
  }

  next();
};
