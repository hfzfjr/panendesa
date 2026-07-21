import { GoogleGenAI } from '@google/genai';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY environment variable is not set');
}

const client = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

export interface GradingResult {
  berhasil: boolean;
  skor_warna?: number;
  skor_ukuran?: number;
  persen_cacat?: number;
  grade_usulan?: string;
  alasan?: string;
  error?: string;
}

const GRADING_SCHEMA = {
  type: 'object',
  properties: {
    skor_warna: {
      type: 'number',
      description: 'Skor kualitas warna produk (0.00 = buruk, 1.00 = sempurna)',
      minimum: 0,
      maximum: 1,
    },
    skor_ukuran: {
      type: 'number',
      description: 'Skor keseragaman ukuran produk (0.00 = buruk, 1.00 = sempurna)',
      minimum: 0,
      maximum: 1,
    },
    persen_cacat: {
      type: 'number',
      description: 'Persentase cacat permukaan (0 = tidak ada cacat, 100 = rusak total)',
      minimum: 0,
      maximum: 100,
    },
    grade_usulan: {
      type: 'string',
      description: 'Grade usulan berdasarkan analisis visual',
      enum: ['A', 'B', 'C'],
    },
    alasan: {
      type: 'string',
      description: 'Alasan singkat penilaian grade (maksimal 100 karakter)',
    },
  },
  required: ['skor_warna', 'skor_ukuran', 'persen_cacat', 'grade_usulan', 'alasan'],
};

const PROMPT = `Analisis kualitas produk pertanian pada gambar ini dan berikan penilaian terstruktur.

Kriteria penilaian:
- Skor warna: 0.00-1.00 (sempurna = warna segar dan seragam, buruk = layu/kusam/berubah warna)
- Skor ukuran: 0.00-1.00 (sempurna = ukuran seragam, buruk = sangat tidak seragam)
- Persen cacat: 0-100 (0 = bersih, 100 = rusak total)
- Grade: A (sangat baik), B (cukup baik), C (perlu perbaikan)

Jawab HANYA dengan JSON sesuai schema yang diberikan.`;

export async function analyzeProductImage(imageBuffer: Buffer, mimeType: string): Promise<GradingResult> {
  try {
    console.log('[Gemini Vision] Starting image analysis...');

    // Convert buffer to base64
    const base64Image = imageBuffer.toString('base64');

    const interaction = await client.interactions.create({
      model: 'gemini-3.5-flash',
      input: [
        { type: 'text', text: PROMPT },
        { type: 'image', data: base64Image, mime_type: mimeType },
      ],
      response_format: {
        type: 'text',
        mime_type: 'application/json',
        schema: GRADING_SCHEMA,
      },
    });

    const outputText = interaction.output_text;

    if (!outputText) {
      console.error('[Gemini Vision] No output text from Gemini API');
      return {
        berhasil: false,
        error: 'Tidak ada response dari Gemini API',
      };
    }

    console.log('[Gemini Vision] Raw response:', outputText);

    // Parse JSON response
    const result = JSON.parse(outputText);

    // Validate response structure
    if (
      typeof result.skor_warna !== 'number' ||
      typeof result.skor_ukuran !== 'number' ||
      typeof result.persen_cacat !== 'number' ||
      typeof result.grade_usulan !== 'string' ||
      typeof result.alasan !== 'string'
    ) {
      console.error('[Gemini Vision] Invalid response structure:', result);
      return {
        berhasil: false,
        error: 'Response structure tidak valid dari Gemini API',
      };
    }

    console.log('[Gemini Vision] Analysis successful:', result);

    return {
      berhasil: true,
      skor_warna: result.skor_warna,
      skor_ukuran: result.skor_ukuran,
      persen_cacat: result.persen_cacat,
      grade_usulan: result.grade_usulan,
      alasan: result.alasan,
    };
  } catch (error) {
    console.error('[Gemini Vision] Error during analysis:', error);

    // Return error object instead of throwing
    return {
      berhasil: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}
