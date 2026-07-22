"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Star, TrendingUp, Camera, Package, MapPin, Calendar, CheckCircle2 } from "lucide-react";

export default function DetailTanamanPage() {
  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6 pb-32 md:pb-8">
      <div className="pt-2">
        <Link href="/dashboard/petani/tanaman" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 font-bold mb-6 transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <span>Kembali ke Tanaman Saya</span>
        </Link>
        <h1 className="text-2xl md:text-3xl font-extrabold text-[#1B5E20] uppercase tracking-tight mb-2">
          RAPOR TANAMAN: CABAI MERAH
        </h1>
        <div className="flex flex-wrap gap-3">
          <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
            <MapPin className="w-4 h-4" /> Sawah Blok C
          </span>
          <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
            <Calendar className="w-4 h-4" /> Ditanam: 1 Mei 2026
          </span>
        </div>
      </div>
      <div className="bg-[#1B5E20] rounded-3xl p-6 md:p-8 shadow-xl shadow-green-900/20 text-white relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 opacity-10">
          <TrendingUp className="w-48 h-48" />
        </div>
        
        <div className="relative z-10 space-y-6">
          <div>
            <p className="text-green-100 font-bold mb-1">Status Saat Ini</p>
            <h2 className="text-3xl md:text-4xl font-black text-white flex items-center gap-2">
              Berbuah (Siap Panen) 🌶️
            </h2>
            <div className="w-full bg-green-900/50 h-3 rounded-full mt-4 overflow-hidden">
              <div className="bg-green-400 w-[90%] h-full rounded-full"></div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-green-700">
            <div>
              <p className="text-green-100 font-bold mb-1">Nilai Rapor</p>
              <div className="flex items-end gap-2">
                <span className="text-4xl md:text-5xl font-black text-yellow-400">97.5</span>
                <span className="text-sm font-bold text-yellow-400 mb-1 flex items-center gap-1">
                  <Star className="w-4 h-4 fill-current" /> A+
                </span>
              </div>
            </div>
            <div>
              <p className="text-green-100 font-bold mb-1">Potensi Uang</p>
              <div className="text-2xl md:text-3xl font-black text-white">
                Rp 2.7 Juta
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Riwayat Pertumbuhan</h2>
        
        <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-1 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-green-500 text-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-md z-10">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-green-50 p-4 rounded-2xl border border-green-100 shadow-sm">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-[#1B5E20]">Tahap Buah Akhir</span>
                <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">10 Juli</span>
              </div>
              <p className="text-gray-600 text-sm font-medium">Kondisi sangat sehat. Disiram dan diberi pupuk.</p>
            </div>
          </div>
          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-[#1B5E20] text-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded-2xl border border-gray-100">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-gray-900">Mulai Berbunga</span>
                <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded-full">30 Mei</span>
              </div>
              <p className="text-gray-500 text-sm">Bunga mulai bermunculan. Aman dari hama.</p>
            </div>
          </div>
          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-[#1B5E20] text-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded-2xl border border-gray-100">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-gray-900">Mulai Tumbuh (V1)</span>
                <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded-full">15 Mei</span>
              </div>
              <p className="text-gray-500 text-sm">Bibit berhasil pindah tanam. Tumbuh daun baru.</p>
            </div>
          </div>
          
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 md:static bg-white md:bg-transparent border-t md:border-none border-gray-200 p-4 md:p-0 z-40 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.1)] md:shadow-none pb-safe">
        <div className="max-w-4xl mx-auto flex gap-3">
          <Link 
            href="/dashboard/petani/laporan/baru" 
            className="flex-1 flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2 py-3 md:py-4 px-2 font-black bg-white text-[#1B5E20] border-2 border-[#1B5E20] rounded-2xl hover:bg-green-50 transition-all shadow-md"
          >
            <Camera className="w-6 h-6" />
            <span className="text-sm md:text-lg">Lapor Kondisi</span>
          </Link>
          
          <button 
            type="button" 
            className="flex-1 flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2 py-3 md:py-4 px-2 font-black bg-orange-500 text-white rounded-2xl hover:bg-orange-600 transition-all shadow-xl"
          >
            <Package className="w-6 h-6" />
            <span className="text-sm md:text-lg">Lapor Siap Panen</span>
          </button>
        </div>
      </div>

    </div>
  );
}
