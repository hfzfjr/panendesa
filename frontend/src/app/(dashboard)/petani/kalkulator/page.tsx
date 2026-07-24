"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Calculator, ChevronLeft, ChevronRight, TrendingUp, AlertCircle, Info } from "lucide-react";

export default function KalkulatorEkonomiPage() {
  const [komoditas, setKomoditas] = useState("Cabai Merah Keriting");
  const [volume, setVolume] = useState<number>(100);

  // Mock Data (based on benchmark_margin_tengkulak etc)
  const hargaAcuan = komoditas === "Cabai Merah Keriting" ? 45000 : 25000;
  
  // Tengkulak logic: they take a 30% margin cut typically
  const marginTengkulak = 0.30;
  const hargaTengkulak = hargaAcuan * (1 - marginTengkulak);
  
  // PanenDesa logic: Kopdes takes 5% fee (fixed, transparent)
  const feeKopdes = 0.05;
  const hargaPanenDesa = hargaAcuan * (1 - feeKopdes);

  const pendapatanTengkulak = volume * hargaTengkulak;
  const pendapatanPanenDesa = volume * hargaPanenDesa;
  const selisihKeuntungan = pendapatanPanenDesa - pendapatanTengkulak;
  const persenKenaikan = (selisihKeuntungan / pendapatanTengkulak) * 100;

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

              <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-md mt-4">
                <div className="flex gap-2">
                  <Info className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                  <p className="text-xs text-blue-800 font-medium leading-relaxed">
                    Harga acuan pasar saat ini adalah <b>Rp {hargaAcuan.toLocaleString('id-ID')} / kg</b> (sumber: Data Pangan Nasional). Perhitungan ini bersifat estimasi untuk membantu Anda mengambil keputusan.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Result Cards */}
        <div className="md:col-span-7 space-y-6">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Tengkulak Card */}
            <div className="bg-white p-5 rounded-md border border-gray-200 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-gray-400"></div>
              <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Jalur Konvensional (Tengkulak)</h3>
              <p className="text-sm font-medium text-gray-600 mb-4">Estimasi margin perantara: ~30%</p>
              
              <p className="text-2xl font-bold text-gray-700 mb-1">
                Rp {pendapatanTengkulak.toLocaleString('id-ID')}
              </p>
              <p className="text-xs text-gray-500 font-medium">Harga Net: Rp {hargaTengkulak.toLocaleString('id-ID')}/kg</p>
            </div>

            {/* PanenDesa Card */}
            <div className="bg-primary-dark p-5 rounded-md text-white shadow-lg relative overflow-hidden">
              <div className="absolute right-0 bottom-0 opacity-10 translate-x-4 translate-y-4">
                <TrendingUp className="w-24 h-24" />
              </div>
              <div className="relative z-10">
                <h3 className="text-[10px] font-bold text-green-100 uppercase tracking-wider mb-1">Jalur Kolektif PanenDesa</h3>
                <p className="text-sm font-medium text-green-50 mb-4">Potongan operasional Koperasi: <b>Flat 5%</b></p>
                
                <p className="text-2xl font-black text-white mb-1">
                  Rp {pendapatanPanenDesa.toLocaleString('id-ID')}
                </p>
                <p className="text-xs text-green-100 font-medium">Harga Net: Rp {hargaPanenDesa.toLocaleString('id-ID')}/kg</p>
              </div>
            </div>
          </div>

          {/* Highlight Result */}
          <div className="bg-success/10 border border-success/30 rounded-md p-6 text-center flex flex-col items-center justify-center h-40">
            <h3 className="text-sm font-bold text-success mb-2 uppercase tracking-widest">Potensi Peningkatan Keuntungan</h3>
            <p className="text-4xl md:text-5xl font-black text-success">
              + {persenKenaikan.toFixed(1)}%
            </p>
            <p className="text-sm font-bold text-green-800 mt-2">
              (Rp {selisihKeuntungan.toLocaleString('id-ID')})
            </p>
          </div>
          
        </div>
      </div>
    </div>
  );
}
