import React from "react";
import Link from "next/link";
import { Wallet, Camera, PlusCircle, Sprout, ChevronRight, AlertCircle } from "lucide-react";

export default function PetaniDashboard() {
  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6 md:space-y-8">
      <div className="pt-2 pb-2">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#1B5E20] uppercase tracking-tight mb-2">
          Halo, Pak Budi!
        </h1>
        <p className="text-gray-600 text-lg md:text-xl font-medium">
          Semoga panen hari ini lancar dan berkah.
        </p>
      </div>
      <div className="bg-[#FFF8E1] border-2 border-orange-400 rounded-2xl p-4 md:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm animate-pulse-slow">
        <div className="flex items-center gap-4">
          <div className="bg-orange-500 text-white w-12 h-12 rounded-full flex items-center justify-center shrink-0">
            <AlertCircle className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-orange-900 font-bold text-lg md:text-xl mb-1">Perhatian!</h2>
            <p className="text-orange-800 text-sm md:text-base font-medium">
              Laporan pertumbuhan <b>Cabai Merah</b> Anda tertunda 2 hari. Segera laporkan agar skor Anda tidak turun.
            </p>
          </div>
        </div>
        <button className="w-full md:w-auto bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl transition-colors shrink-0 shadow-md">
          Lapor Sekarang
        </button>
      </div>
      <div className="bg-[#1B5E20] rounded-3xl p-6 md:p-8 shadow-xl shadow-green-900/20 text-white relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 opacity-10">
          <Wallet className="w-48 h-48" />
        </div>
        
        <div className="relative z-10">
          <h3 className="font-bold text-green-100 text-lg md:text-xl mb-2">Total Uang Anda Bulan Ini</h3>
          <div className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4 break-words leading-tight">
            Rp 25.500.000
          </div>
          <p className="text-green-100 font-medium text-sm md:text-base">
            Uang sudah bisa dicairkan ke Rekening BRI Anda.
          </p>
          <button className="mt-6 bg-white text-[#1B5E20] font-bold text-lg px-8 py-3 rounded-full hover:bg-gray-100 transition-colors shadow-md">
            Tarik Uang
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Link href="/dashboard/petani/laporan/baru" className="bg-white border-2 border-[#1B5E20] rounded-2xl p-4 md:p-6 flex flex-col items-center justify-center gap-3 hover:bg-green-50 transition-colors shadow-sm group">
          <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
            <Camera className="w-7 h-7 text-[#1B5E20]" />
          </div>
          <span className="font-bold text-[#1B5E20] text-lg text-center leading-tight">Lapor<br/>Kondisi</span>
        </Link>

        <Link href="/dashboard/petani/tanaman/baru" className="bg-white border-2 border-gray-200 rounded-2xl p-4 md:p-6 flex flex-col items-center justify-center gap-3 hover:bg-gray-50 transition-colors shadow-sm group">
          <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
            <PlusCircle className="w-7 h-7 text-gray-600" />
          </div>
          <span className="font-bold text-gray-700 text-lg text-center leading-tight">Tambah<br/>Tanaman</span>
        </Link>
      </div>
      <div className="mt-8">
        <div className="flex items-center gap-2 mb-6">
          <Sprout className="w-7 h-7 text-[#1B5E20]" />
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">Kebun Saya</h2>
        </div>

        <div className="space-y-4">
          <Link href="/dashboard/petani/tanaman/1" className="block bg-white rounded-2xl p-4 shadow-sm border border-gray-200 flex items-center gap-4 hover:border-[#1B5E20] hover:shadow-md transition-all group">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden shrink-0">
              <img 
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=400&auto=format&fit=crop" 
                alt="Cabai Merah" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">Cabai Merah</h3>
              <span className="inline-block bg-green-100 text-[#1B5E20] font-bold px-3 py-1 rounded-lg text-sm">
                SIAP PANEN
              </span>
            </div>
            <div className="pr-2 text-gray-400 group-hover:text-[#1B5E20] transition-colors">
              <ChevronRight className="w-8 h-8" />
            </div>
          </Link>
          <Link href="/dashboard/petani/tanaman/2" className="block bg-white rounded-2xl p-4 shadow-sm border border-gray-200 flex items-center gap-4 hover:border-[#1B5E20] hover:shadow-md transition-all group">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden shrink-0">
              <img 
                src="https://images.unsplash.com/photo-1518972551139-446718d79b9b?q=80&w=400&auto=format&fit=crop" 
                alt="Bawang Merah" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">Bawang Merah</h3>
              <span className="inline-block bg-yellow-100 text-yellow-700 font-bold px-3 py-1 rounded-lg text-sm">
                MASA PERAWATAN
              </span>
            </div>
            <div className="pr-2 text-gray-400 group-hover:text-[#1B5E20] transition-colors">
              <ChevronRight className="w-8 h-8" />
            </div>
          </Link>

        </div>
      </div>

    </div>
  );
}
