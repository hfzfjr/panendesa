// Load environment variables FIRST before any other imports
import './config';

import express, { Request, Response } from 'express';
import cors from 'cors';
import stokEstimasiRouter from './api/routes/stokEstimasi';
import authRouter from './api/routes/auth';

const app = express();
const PORT = process.env.PORT || 3001;

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

// Start server
app.listen(PORT, () => {
  console.log(`PanenDesa Backend running on port ${PORT}`);
});
