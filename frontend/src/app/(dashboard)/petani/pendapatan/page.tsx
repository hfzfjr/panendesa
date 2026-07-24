"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Wallet, CheckCircle2, ChevronRight, ChevronLeft } from "lucide-react";
import { mockPendapatan } from "@/lib/mockDataPetani";

export default function LaporanPendapatanPage() {
  const [filter, setFilter] = useState("Lunas");

  const filteredPendapatan = mockPendapatan.filter(p => {
    if (filter === "Semua") return true;
    return p.status === filter;
  });

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 pb-32 md:pb-8">
      <div className="flex items-center gap-4 border-b border-gray-100 pb-4 pt-2 mb-6">
        <Link href="/petani" className="hidden md:flex w-10 h-10 bg-white border border-gray-200 rounded-md items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors mt-2">
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <div>
          <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500 font-medium mb-1">
            <Link href="/petani" className="hover:text-primary-dark">Halaman Utama</Link>
            <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
            <span className="text-gray-900 font-bold">Buku Tabungan</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-primary-dark uppercase tracking-tight mb-2">
            BUKU TABUNGAN
          </h1>
          <p className="text-gray-600 font-medium text-lg md:text-xl">
            Pantau semua uang hasil panen Anda di sini.
          </p>
        </div>
      </div>
      
      <div className="bg-primary-dark rounded-lg p-6 md:p-8 shadow-xl shadow-green-900/20 text-white relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 opacity-10">
          <Wallet className="w-48 h-48" />
        </div>

        <div className="relative z-10 text-center">
          <p className="text-green-100 font-bold text-lg md:text-xl mb-2">Total Uang Diterima</p>
          <div className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6 wrap-break-word leading-tight text-yellow-400">
            Rp 25.500.000
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-3">
            <div className="bg-green-800/50 backdrop-blur-sm border border-green-700/50 px-4 py-2 rounded-full font-bold text-sm md:text-base flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-300" />
              12 Transaksi Lunas
            </div>
            <div className="bg-green-800/50 backdrop-blur-sm border border-green-700/50 px-4 py-2 rounded-full font-bold text-sm md:text-base flex items-center gap-2">
              <span className="text-xl">🌶️</span>
              Terlaris: Cabai
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-3">
        <button
          className={`flex-1 py-4 font-black text-lg md:text-xl rounded-md border-2 transition-all flex items-center justify-center gap-2 shadow-sm ${filter === "Lunas" ? 'bg-primary-dark text-white border-primary-dark' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
        >
          💰 Sudah Cair
        </button>
        <button
          onClick={() => setFilter("Proses")}
          className={`flex-1 py-4 font-black text-lg md:text-xl rounded-md border-2 transition-all flex items-center justify-center gap-2 shadow-sm ${filter === "Proses" ? 'bg-warning text-neutral-900 border-warning' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
        >
          ⏳ Menunggu Proses
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredPendapatan.map(item => (
          <Link key={item.id} href="/petani/pendapatan/detail" className={`bg-white rounded-lg border-2 border-gray-100 transition-colors shadow-sm overflow-hidden flex flex-col md:flex-row items-center md:items-stretch cursor-pointer group ${item.status === 'Lunas' ? 'hover:border-primary-dark' : 'hover:border-warning'}`}>
            <div className="w-full md:w-48 h-48 bg-gray-200 relative shrink-0">
              <img
                src={item.gambar}
                alt={item.komoditas}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className={`absolute top-3 left-3 text-white font-black px-3 py-1 rounded-sm text-xs uppercase tracking-wider shadow-md ${item.status === 'Lunas' ? 'bg-primary-dark' : 'bg-warning text-neutral-900'}`}>
                {item.status}
              </div>
            </div>

            <div className="p-5 md:p-6 flex-1 flex flex-col justify-between w-full">
              <div>
                <h3 className="text-2xl font-black text-gray-900 mb-1">{item.komoditas}</h3>
                <p className="text-gray-500 font-bold text-sm md:text-base">{item.jumlah} ({item.grade}) • {item.tanggal}</p>
              </div>
              <div className="mt-4 flex items-end justify-between">
                <div>
                  <p className="text-sm font-bold text-gray-500 mb-1">Uang Diterima:</p>
                  <p className={`text-3xl font-black ${item.status === 'Lunas' ? 'text-primary-dark' : 'text-warning'}`}>{item.uangDiterima}</p>
                </div>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${item.status === 'Lunas' ? 'bg-green-50 text-primary-dark group-hover:bg-primary-dark group-hover:text-white' : 'bg-warning/10 text-warning group-hover:bg-warning group-hover:text-neutral-900'}`}>
                  <ChevronRight className="w-6 h-6" />
                </div>
              </div>
            </div>
          </Link>
        ))}

        {filteredPendapatan.length === 0 && (
          <div className="col-span-1 lg:col-span-2 bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg p-12 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-4">
              <Wallet className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Belum ada catatan</h3>
            <p className="text-gray-500 font-medium">Tidak ada transaksi yang cocok dengan filter saat ini.</p>
          </div>
        )}
      </div>
    </div>
  );
}
