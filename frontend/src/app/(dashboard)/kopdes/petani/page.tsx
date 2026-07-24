"use client";

import React from "react";
import { 
  Search, 
  ChevronDown, 
  UserPlus, 
  ChevronLeft,
  ChevronRight,
  MoreHorizontal
} from "lucide-react";

export default function KopdesPetaniPage() {
  const farmers = [
    {
      initial: "B",
      initialColor: "bg-[#E8F8F5] text-[#117A3E]",
      name: "Pak Budi",
      id: "SKM-001",
      commodity: "Padi",
      stock: "1,250 kg",
      grade: "Grade A",
      gradeColor: "bg-[#205C3B] text-white",
      score: "98/100",
      status: "Aktif",
      statusColor: "bg-green-100 text-green-700"
    },
    {
      initial: "A",
      initialColor: "bg-[#EAF2F8] text-[#117A3E]",
      name: "Pak Andi",
      id: "SKM-042",
      commodity: "Jagung",
      stock: "850 kg",
      grade: "Grade B",
      gradeColor: "bg-gray-300 text-gray-700",
      score: "82/100",
      status: "Aktif",
      statusColor: "bg-green-100 text-green-700"
    },
    {
      initial: "S",
      initialColor: "bg-[#FDEBD0] text-[#935116]",
      name: "Ibu Siti",
      id: "SKM-015",
      commodity: "Cabai",
      stock: "120 kg",
      grade: "Grade A",
      gradeColor: "bg-[#205C3B] text-white",
      score: "95/100",
      status: "Aktif",
      statusColor: "bg-green-100 text-green-700"
    },
    {
      initial: "J",
      initialColor: "bg-gray-200 text-gray-700",
      name: "Pak Jono",
      id: "SKM-088",
      commodity: "Padi",
      stock: "0 kg",
      grade: "Grade C",
      gradeColor: "bg-red-100 text-red-700",
      score: "64/100",
      status: "Off-Season",
      statusColor: "bg-gray-200 text-gray-700"
    }
  ];

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-6 pb-32 md:pb-8 min-h-screen">
      
      {/* Header & Add Button */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-primary-dark tracking-tight mb-1">
            Daftar Petani Desa Sukamaju
          </h1>
          <p className="text-gray-600 font-medium text-sm md:text-base">
            Manajemen basis data produksi dan kepercayaan mitra lokal.
          </p>
        </div>
        <button className="w-full md:w-auto bg-[#117A3E] hover:bg-[#0c592d] text-white font-bold px-6 py-3 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm shrink-0">
          <UserPlus className="w-5 h-5" />
          Tambah Petani
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 md:p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row items-end md:items-center gap-4">
        <div className="w-full md:w-3/5">
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Pencarian Cepat</label>
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Masukkan nama atau ID petani..." 
              className="w-full bg-gray-100 border-transparent focus:border-[#117A3E] focus:bg-white focus:ring-0 rounded-xl pl-12 pr-4 py-3 text-sm font-medium transition-colors"
            />
          </div>
        </div>
        
        <div className="w-full md:w-auto md:flex-1">
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Komoditas</label>
          <div className="relative">
            <select className="w-full appearance-none bg-gray-100 border-transparent focus:border-[#117A3E] focus:bg-white focus:ring-0 rounded-xl px-4 py-3 text-sm font-medium transition-colors cursor-pointer">
              <option>Semua Komoditas</option>
              <option>Padi</option>
              <option>Jagung</option>
              <option>Cabai</option>
            </select>
            <ChevronDown className="w-5 h-5 text-gray-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        <button className="w-full md:w-auto border-2 border-[#117A3E] text-[#117A3E] hover:bg-green-50 font-bold px-6 py-2.5 rounded-xl transition-colors mt-2 md:mt-6">
          Terapkan
        </button>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100 text-[11px] font-bold text-gray-500 uppercase tracking-widest bg-gray-50/50">
              <th className="py-5 px-6">Nama Petani</th>
              <th className="py-5 px-6 text-center">Stok</th>
              <th className="py-5 px-6 text-center">Kepercayaan</th>
              <th className="py-5 px-6 text-center">Status</th>
              <th className="py-5 px-6 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {farmers.map((petani, idx) => (
              <tr key={idx} className="hover:bg-gray-50 transition-colors">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-lg ${petani.initialColor}`}>
                      {petani.initial}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-base">{petani.name}</div>
                      <div className="text-gray-500 text-xs mt-0.5">
                        {petani.id} • <span className={petani.commodity === 'Cabai' ? 'text-orange-600' : 'text-[#117A3E]'}>{petani.commodity}</span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6 text-center">
                  <span className="font-bold text-gray-900 text-base">{petani.stock}</span>
                </td>
                <td className="py-4 px-6 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${petani.gradeColor}`}>
                      {petani.grade}
                    </span>
                    <span className="font-bold text-gray-700 text-sm">{petani.score}</span>
                  </div>
                </td>
                <td className="py-4 px-6 text-center">
                  <span className={`px-3 py-1 rounded-full text-[11px] font-bold ${petani.statusColor}`}>
                    {petani.status}
                  </span>
                </td>
                <td className="py-4 px-6 text-right">
                  <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold px-5 py-2 rounded-lg text-sm transition-colors">
                    Detail
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {farmers.map((petani, idx) => (
          <div key={idx} className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm space-y-4">
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-xl ${petani.initialColor}`}>
                  {petani.initial}
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-lg">{petani.name}</div>
                  <div className="text-gray-500 text-sm mt-0.5">
                    {petani.id} • <span className={petani.commodity === 'Cabai' ? 'text-orange-600' : 'text-[#117A3E]'}>{petani.commodity}</span>
                  </div>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${petani.statusColor}`}>
                {petani.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-b border-gray-100 py-4">
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Stok Aktual</p>
                <p className="font-bold text-gray-900 text-lg">{petani.stock}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Kepercayaan</p>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${petani.gradeColor}`}>
                    {petani.grade}
                  </span>
                  <span className="font-bold text-gray-700 text-sm">{petani.score}</span>
                </div>
              </div>
            </div>

            <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold px-4 py-3 rounded-xl transition-colors">
              Detail Petani
            </button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-2">
        <p className="text-gray-500 font-medium text-sm text-center md:text-left">
          Menampilkan 1-4 dari 160 petani
        </p>
        <div className="flex items-center gap-2">
          <button className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="w-9 h-9 rounded-lg bg-[#117A3E] text-white font-bold flex items-center justify-center shadow-sm">
            1
          </button>
          <button className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 font-medium hover:bg-gray-50 transition-colors">
            2
          </button>
          <button className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 font-medium hover:bg-gray-50 transition-colors">
            3
          </button>
          <div className="w-9 h-9 flex items-center justify-center text-gray-400">
            <MoreHorizontal className="w-5 h-5" />
          </div>
          <button className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
}
