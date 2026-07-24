"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ChevronRight, 
  MapPin, 
  Camera, 
  Sparkles, 
  Edit2, 
  Save,
  AlertCircle
} from "lucide-react";

export default function IntakeBaruPage() {
  const [selectedGrade, setSelectedGrade] = useState("A");
  
  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 md:space-y-8 pb-32 md:pb-8 min-h-screen">
      
      {/* Header & Breadcrumbs */}
      <div>
        <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500 font-medium mb-2">
          <Link href="/kopdes" className="hover:text-primary-dark">Halaman Utama</Link>
          <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
          <Link href="/kopdes/penerimaan" className="hover:text-primary-dark">Penerimaan</Link>
          <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
          <span className="text-gray-900 font-bold">Intake Baru</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-primary-dark tracking-tight mb-1">
          Intake & Grading
        </h1>
        <p className="text-gray-500 font-medium text-sm md:text-base">
          Kelola seluruh permintaan dan pengiriman komoditas desa.
        </p>
      </div>

      {/* Top Section: Pilih Petani & Lokasi Lahan */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div className="bg-white p-5 md:p-6 border border-gray-200 rounded-2xl shadow-sm">
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">PILIH PETANI</label>
          <select className="w-full bg-white border border-gray-300 text-gray-900 py-3.5 px-4 rounded-xl outline-none focus:border-primary-dark font-medium shadow-sm appearance-none">
            <option>Pak Budi - Cabai Merah</option>
            <option>Pak Andi - Bawang Merah</option>
            <option>Ibu Siti - Tomat Hijau</option>
          </select>
        </div>
        
        <div className="bg-white p-5 md:p-6 border border-gray-200 rounded-2xl shadow-sm">
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">LOKASI LAHAN</label>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-primary-dark" />
            </div>
            <div>
              <h3 className="font-bold text-green-800 text-lg">Blok C2</h3>
              <p className="text-gray-500 font-medium">Desa Sukatani</p>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Section: Dokumentasi Produk */}
      <div className="bg-white p-5 md:p-6 border border-gray-200 rounded-2xl shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <h2 className="text-xl md:text-2xl font-bold text-primary-dark flex items-center gap-2">
            <Camera className="w-6 h-6" />
            Dokumentasi Produk
          </h2>
          <button className="bg-primary-dark hover:bg-green-800 text-white font-bold py-3 px-6 rounded-full transition-colors flex items-center justify-center gap-2 shadow-sm text-sm">
            <Camera className="w-4 h-4" />
            AMBIL FOTO
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="h-48 md:h-56 bg-gray-100 rounded-xl overflow-hidden border border-gray-200">
            <img src="https://images.unsplash.com/photo-1596489379201-92f7678564e9?q=80&w=600&auto=format&fit=crop" alt="Chili harvest" className="w-full h-full object-cover" />
          </div>
          <div className="h-48 md:h-56 bg-gray-100 rounded-xl overflow-hidden border border-gray-200">
            <img src="https://images.unsplash.com/photo-1627042633145-b780d842ba45?q=80&w=600&auto=format&fit=crop" alt="Chili weighing" className="w-full h-full object-cover" />
          </div>
          <div className="h-48 md:h-56 bg-gray-100 rounded-xl overflow-hidden border border-gray-200">
            <img src="https://images.unsplash.com/photo-1574484284002-952d92456975?q=80&w=600&auto=format&fit=crop" alt="Chili close up" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      {/* Bottom Grid: AI Grade vs Final Weight */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
        
        {/* Left Column: AI & Override */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* AI Recommendation */}
          <div className="bg-green-50/50 p-5 md:p-6 border border-green-100 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary-dark rounded-xl flex items-center justify-center shrink-0 shadow-md">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-primary-dark">AI Recommendation</h2>
                  <p className="text-gray-500 text-sm font-medium">Based on visual analysis</p>
                </div>
              </div>
              <div className="bg-primary-dark text-white font-black text-xl px-4 py-2 rounded-lg shadow-sm">
                GRADE A
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 md:gap-4">
              <div className="bg-white p-4 rounded-xl border border-green-50 shadow-sm">
                <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">WARNA</p>
                <p className="font-bold text-primary-dark text-base md:text-lg leading-tight">98% Solid<br/>Red</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-green-50 shadow-sm">
                <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">UKURAN</p>
                <p className="font-bold text-primary-dark text-base md:text-lg leading-tight">Avg<br/>12.5 cm</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-green-50 shadow-sm">
                <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">CACAT</p>
                <p className="font-bold text-primary-dark text-base md:text-lg leading-tight">0.2%<br/>Minor</p>
              </div>
            </div>
          </div>

          {/* Final Quality Grade */}
          <div className="bg-white p-5 md:p-6 border border-gray-200 rounded-2xl shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">FINAL QUALITY GRADE</h3>
              <button className="flex items-center gap-1 text-xs font-bold text-primary-dark hover:underline">
                <Edit2 className="w-3 h-3" /> OVERRIDE
              </button>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <button 
                onClick={() => setSelectedGrade("A")}
                className={`p-4 md:p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 ${selectedGrade === "A" ? 'border-primary-dark bg-green-50' : 'border-gray-100 hover:border-green-200'}`}
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center text-xl font-black ${selectedGrade === "A" ? 'bg-primary-dark text-white shadow-md' : 'bg-gray-200 text-gray-600'}`}>
                  A
                </div>
                <span className="text-xs font-bold text-gray-600 uppercase">PREMIUM</span>
              </button>

              <button 
                onClick={() => setSelectedGrade("B")}
                className={`p-4 md:p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 ${selectedGrade === "B" ? 'border-primary-dark bg-green-50' : 'border-gray-100 hover:border-green-200'}`}
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center text-xl font-black ${selectedGrade === "B" ? 'bg-primary-dark text-white shadow-md' : 'bg-gray-200 text-gray-600'}`}>
                  B
                </div>
                <span className="text-xs font-bold text-gray-600 uppercase">REGULAR</span>
              </button>

              <button 
                onClick={() => setSelectedGrade("C")}
                className={`p-4 md:p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 ${selectedGrade === "C" ? 'border-primary-dark bg-green-50' : 'border-gray-100 hover:border-green-200'}`}
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center text-xl font-black ${selectedGrade === "C" ? 'bg-primary-dark text-white shadow-md' : 'bg-gray-200 text-gray-600'}`}>
                  C
                </div>
                <span className="text-xs font-bold text-gray-600 uppercase">PROCESS</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Weight & Payment Estimation */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Berat Aktual */}
          <div className="bg-white p-5 md:p-6 border border-gray-200 rounded-2xl shadow-sm">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">BERAT AKTUAL</h3>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-5xl md:text-6xl font-black text-primary-dark tracking-tighter">195</span>
              <span className="text-xl font-bold text-gray-300 uppercase">KG</span>
            </div>

            {/* Alert Box */}
            <div className="bg-red-50/50 border border-red-100 rounded-xl p-4 flex gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-red-700 text-sm mb-1">Selisih Estimasi!</h4>
                <p className="text-red-600 text-xs font-medium leading-relaxed">
                  Berat 195 kg berbeda {">"}5% dari estimasi awal (210 kg).
                </p>
              </div>
            </div>
          </div>

          {/* Estimasi Pembayaran */}
          <div className="bg-green-50/50 border border-green-100 rounded-2xl p-5 md:p-6 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary-dark/5 rounded-bl-[100px]"></div>
            
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-6">ESTIMASI PEMBAYARAN</h3>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 font-bold">HARGA DASAR</span>
                <span className="font-bold text-gray-900">Rp 35.000 / kg</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 font-bold">TOTAL BRUTO</span>
                <span className="font-bold text-green-700">Rp 6.825.000</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-red-500 font-bold">POTONGAN ADMIN</span>
                <span className="font-bold text-red-600">-Rp 136.500</span>
              </div>
            </div>

            <div className="border-t border-green-200 pt-4">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">TOTAL BERSIH</h3>
              <div className="text-2xl md:text-3xl font-black text-primary-dark">
                Rp 6.688.500
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Simpan Button */}
      <button className="w-full bg-primary-dark hover:bg-green-800 text-white font-bold text-base md:text-lg py-5 rounded-2xl transition-colors flex items-center justify-center gap-3 shadow-lg mt-8 mb-4">
        <Save className="w-6 h-6" />
        SIMPAN INTAKE LAPANGAN
      </button>

    </div>
  );
}
