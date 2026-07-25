"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Calculator, ChevronLeft, ChevronRight, TrendingUp, AlertCircle, Info } from "lucide-react";
import { ErrorState } from "../../../../components/ui/ErrorState";
import { apiClient } from "../../../../lib/api-client";

export default function KalkulatorEkonomiPage() {
  const [komoditas, setKomoditas] = useState("Cabai Merah Keriting");
  const [volume, setVolume] = useState<number>(100);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [economicData, setEconomicData] = useState<any>(null);

  // Komoditas ID mapping
  const komoditasIdMap: { [key: string]: number } = {
    "Cabai Merah Keriting": 1,
    "Bawang Merah": 2,
  };

  useEffect(() => {
    const fetchEconomicImpact = async () => {
      setLoading(true);
      setError(null);

      try {
        const komoditasId = komoditasIdMap[komoditas];
        const response = await apiClient.getEconomicImpact(komoditasId);

        if (response.success && response.data) {
          setEconomicData(response.data);
        } else {
          setError(response.error || 'Gagal mengambil data dampak ekonomi');
        }
      } catch (err) {
        setError('Terjadi kesalahan saat mengambil data dampak ekonomi');
      } finally {
        setLoading(false);
      }
    };

    fetchEconomicImpact();
  }, [komoditas]);

  // Calculate based on API data
  const hargaRataPanenDesa = economicData?.harga_rata_panendesa_per_kg || 0;
  const hargaEstimasiTengkulak = economicData?.estimasi_harga_tengkulak_per_kg || 0;
  const selisihPersen = economicData?.selisih_persen || 0;

  const pendapatanPanenDesa = volume * hargaRataPanenDesa;
  const pendapatanTengkulak = volume * hargaEstimasiTengkulak;
  const selisihKeuntungan = pendapatanPanenDesa - pendapatanTengkulak;

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6 pb-32 md:pb-8">
      {/* Header */}
      <div className="flex items-center gap-4 border-b border-gray-100 pb-4 mb-6">
        <Link href="/petani" className="w-10 h-10 bg-white border border-gray-200 rounded-md flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors mt-2">
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <div>
          <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500 font-medium mb-1">
            <Link href="/petani" className="hover:text-primary-dark">Halaman Utama</Link>
            <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
            <span className="text-gray-900 font-bold">Kalkulator Ekonomi</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">Kalkulator Dampak Ekonomi</h1>
          <p className="text-gray-500 font-medium hidden md:block">Bandingkan potensi pendapatan Anda secara transparan.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* Input Form */}
        <div className="md:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-md border border-gray-100 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-primary-dark" /> Parameter Simulasi
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Pilih Komoditas</label>
                <select
                  value={komoditas}
                  onChange={(e) => setKomoditas(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 text-gray-900 py-3 px-4 rounded-md outline-none focus:border-primary-dark font-medium"
                >
                  <option value="Cabai Merah Keriting">Cabai Merah Keriting</option>
                  <option value="Bawang Merah">Bawang Merah</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Estimasi Volume Panen (Kg)</label>
                <input
                  type="number"
                  value={volume || ''}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  min="1"
                  className="w-full bg-gray-50 border border-gray-200 text-gray-900 py-3 px-4 rounded-md outline-none focus:border-primary-dark font-medium"
                  placeholder="Misal: 100"
                />
              </div>

              {economicData && (
                <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-md mt-4">
                  <div className="flex gap-2">
                    <Info className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                    <p className="text-xs text-blue-800 font-medium leading-relaxed">
                      {economicData.label}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Result Cards */}
        <div className="md:col-span-7 space-y-6">
          {loading ? (
            <div className="bg-white p-6 rounded-md border border-gray-100 shadow-sm animate-pulse">
              <div className="h-32 bg-gray-200 rounded"></div>
            </div>
          ) : error ? (
            <ErrorState message={error} onRetry={() => window.location.reload()} />
          ) : economicData ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Tengkulak Card */}
                <div className="bg-white p-5 rounded-md border border-gray-200 shadow-sm relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-1 h-full bg-gray-400"></div>
                  <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Jalur Konvensional (Tengkulak)</h3>
                  <p className="text-sm font-medium text-gray-600 mb-4">Estimasi harga per kg</p>

                  <p className="text-2xl font-bold text-gray-700 mb-1">
                    Rp {pendapatanTengkulak.toLocaleString('id-ID')}
                  </p>
                  <p className="text-xs text-gray-500 font-medium">Harga Net: Rp {hargaEstimasiTengkulak.toLocaleString('id-ID')}/kg</p>
                </div>

                {/* PanenDesa Card */}
                <div className="bg-primary-dark p-5 rounded-md text-white shadow-lg relative overflow-hidden">
                  <div className="absolute right-0 bottom-0 opacity-10 translate-x-4 translate-y-4">
                    <TrendingUp className="w-24 h-24" />
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-[10px] font-bold text-green-100 uppercase tracking-wider mb-1">Jalur Kolektif PanenDesa</h3>
                    <p className="text-sm font-medium text-green-50 mb-4">Harga rata-rata per kg</p>

                    <p className="text-2xl font-black text-white mb-1">
                      Rp {pendapatanPanenDesa.toLocaleString('id-ID')}
                    </p>
                    <p className="text-xs text-green-100 font-medium">Harga Net: Rp {hargaRataPanenDesa.toLocaleString('id-ID')}/kg</p>
                  </div>
                </div>
              </div>

              {/* Highlight Result */}
              <div className={`rounded-md p-6 text-center flex flex-col items-center justify-center h-40 ${selisihPersen >= 0 ? 'bg-success/10 border border-success/30' : 'bg-red-50 border border-red-200'
                }`}>
                <h3 className="text-sm font-bold text-gray-700 mb-2 uppercase tracking-widest">Potensi Peningkatan Keuntungan</h3>
                <p className={`text-4xl md:text-5xl font-black ${selisihPersen >= 0 ? 'text-success' : 'text-red-600'
                  }`}>
                  {selisihPersen >= 0 ? '+' : ''}{selisihPersen.toFixed(1)}%
                </p>
                <p className="text-sm font-bold text-gray-700 mt-2">
                  (Rp {selisihKeuntungan.toLocaleString('id-ID')})
                </p>
              </div>

              {/* Source Reference */}
              <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
                <div className="flex gap-2">
                  <Info className="w-4 h-4 text-gray-500 mt-0.5 shrink-0" />
                  <p className="text-xs text-gray-600 font-medium leading-relaxed">
                    <strong>Sumber Referensi Margin:</strong> {economicData.sumber_referensi_margin || 'Data Pangan Nasional'}
                  </p>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
