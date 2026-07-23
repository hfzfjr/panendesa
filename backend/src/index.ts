// Load environment variables FIRST before any other imports
import './config';

import express, { Request, Response } from 'express';
import cors from 'cors';
import stokEstimasiRouter from './api/routes/stokEstimasi';
import authRouter from './api/routes/auth';
import intakeGradingRouter from './api/routes/intakeGrading';
import trustScoreRouter from './api/routes/trustScore';
import capacityRouter from './api/routes/capacity';
import ordersRouter from './api/routes/orders';
import fairShareRouter from './api/routes/fairShare';
import auditLogRouter from './api/routes/auditLog';
import economicImpactRouter from './api/routes/economicImpact';

const app = express();
const PORT = process.env.PORT || 3001;

// Trust proxy for Cloudflare Tunnel (production)
app.set('trust proxy', 1);

// Middleware
app.use(cors());
app.use(express.json());

// Health check route
app.get('/', (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'PanenDesa Backend Ready'
  });
});

// API Routes
app.use('/api/auth', authRouter);
app.use('/api/stok-estimasi', stokEstimasiRouter);
app.use('/api/intake-grading', intakeGradingRouter);
app.use('/api/trust-score', trustScoreRouter);
app.use('/api/capacity', capacityRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/fair-share', fairShareRouter);
app.use('/api/audit-log', auditLogRouter);
app.use('/api/economic-impact', economicImpactRouter);

// Start server
app.listen(PORT, () => {
  console.log(`PanenDesa Backend running on port ${PORT}`);
});
