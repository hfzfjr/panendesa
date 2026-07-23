"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Wallet, CheckCircle2, Clock, ChevronRight, ArrowLeft } from "lucide-react";

export default function LaporanPendapatanPage() {
  const [filter, setFilter] = useState("Lunas");

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6 pb-32 md:pb-8">
      <div className="pt-2">
        <Link href="/petani" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 font-bold mb-6 transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <span>Kembali ke Halaman Utama</span>
        </Link>
        <h1 className="text-3xl md:text-4xl font-extrabold text-primary-dark uppercase tracking-tight mb-2">
          BUKU TABUNGAN
        </h1>
        <p className="text-gray-600 font-medium text-lg md:text-xl">
          Pantau semua uang hasil panen Anda di sini.
        </p>
      </div>
      <div className="bg-primary-dark rounded-3xl p-6 md:p-8 shadow-xl shadow-green-900/20 text-white relative overflow-hidden">
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
          onClick={() => setFilter("Lunas")}
          className={`flex-1 py-4 font-black text-lg md:text-xl rounded-2xl border-2 transition-all flex items-center justify-center gap-2 shadow-sm ${filter === "Lunas" ? 'bg-primary-dark text-white border-primary-dark' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
        >
          💰 Sudah Cair
        </button>
        <button
          onClick={() => setFilter("Proses")}
          className={`flex-1 py-4 font-black text-lg md:text-xl rounded-2xl border-2 transition-all flex items-center justify-center gap-2 shadow-sm ${filter === "Proses" ? 'bg-orange-500 text-white border-orange-500' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
        >
          ⏳ Menunggu Proses
        </button>
      </div>
      <div className="space-y-4">
        {(filter === "Lunas" || filter === "Semua") && (
          <Link href="/petani/pendapatan/detail" className="bg-white rounded-3xl border-2 border-gray-100 hover:border-green-500 transition-colors shadow-sm overflow-hidden flex flex-col md:flex-row items-center md:items-stretch cursor-pointer group">
            <div className="w-full md:w-48 h-48 bg-gray-200 relative shrink-0">
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=600&auto=format&fit=crop"
                alt="Cabai Merah"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-green-500 text-white font-black px-3 py-1 rounded-full text-xs uppercase tracking-wider shadow-md">
                Lunas
              </div>
            </div>

            <div className="p-5 md:p-6 flex-1 flex flex-col justify-between w-full">
              <div>
                <h3 className="text-2xl font-black text-gray-900 mb-1">Cabai Merah</h3>
                <p className="text-gray-500 font-bold text-sm md:text-base">195kg (Grade A) • 12 Okt 2026</p>
              </div>
              <div className="mt-4 flex items-end justify-between">
                <div>
                  <p className="text-sm font-bold text-gray-500 mb-1">Uang Diterima:</p>
                  <p className="text-3xl font-black text-primary-dark">Rp 2.779.500</p>
                </div>
                <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-primary-dark group-hover:bg-primary-dark group-hover:text-white transition-colors">
                  <ChevronRight className="w-6 h-6" />
                </div>
              </div>
            </div>
          </Link>
        )}
        {(filter === "Lunas" || filter === "Semua") && (
          <Link href="/petani/pendapatan/detail" className="bg-white rounded-3xl border-2 border-gray-100 hover:border-green-500 transition-colors shadow-sm overflow-hidden flex flex-col md:flex-row items-center md:items-stretch cursor-pointer group">
            <div className="w-full md:w-48 h-48 bg-gray-200 relative shrink-0">
              <img
                src="https://images.unsplash.com/photo-1592688849767-e9526715f3de?q=80&w=600&auto=format&fit=crop"
                alt="Bawang Merah"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-green-500 text-white font-black px-3 py-1 rounded-full text-xs uppercase tracking-wider shadow-md">
                Lunas
              </div>
            </div>

            <div className="p-5 md:p-6 flex-1 flex flex-col justify-between w-full">
              <div>
                <h3 className="text-2xl font-black text-gray-900 mb-1">Bawang Merah</h3>
                <p className="text-gray-500 font-bold text-sm md:text-base">140kg (Grade B) • 10 Okt 2026</p>
              </div>
              <div className="mt-4 flex items-end justify-between">
                <div>
                  <p className="text-sm font-bold text-gray-500 mb-1">Uang Diterima:</p>
                  <p className="text-3xl font-black text-primary-dark">Rp 1.960.000</p>
                </div>
                <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-primary-dark group-hover:bg-primary-dark group-hover:text-white transition-colors">
                  <ChevronRight className="w-6 h-6" />
                </div>
              </div>
            </div>
          </Link>
        )}
        {(filter === "Proses" || filter === "Semua") && (
          <Link href="/dashboard/petani/pendapatan/detail" className="bg-white rounded-3xl border-2 border-gray-100 hover:border-orange-400 transition-colors shadow-sm overflow-hidden flex flex-col md:flex-row items-center md:items-stretch cursor-pointer group">
            <div className="w-full md:w-48 h-48 bg-gray-200 relative shrink-0">
              <img
                src="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=600&auto=format&fit=crop"
                alt="Tomat"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-orange-500 text-white font-black px-3 py-1 rounded-full text-xs uppercase tracking-wider shadow-md flex items-center gap-1">
                <Clock className="w-3 h-3" /> Diproses
              </div>
            </div>

            <div className="p-5 md:p-6 flex-1 flex flex-col justify-between w-full">
              <div>
                <h3 className="text-2xl font-black text-gray-900 mb-1">Tomat Sayur</h3>
                <p className="text-gray-500 font-bold text-sm md:text-base">75kg • Menunggu Kurir</p>
              </div>
              <div className="mt-4 flex items-end justify-between">
                <div>
                  <p className="text-sm font-bold text-gray-500 mb-1">Perkiraan Uang:</p>
                  <p className="text-2xl md:text-3xl font-black text-orange-500">Rp 500.000</p>
                </div>
                <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                  <ChevronRight className="w-6 h-6" />
                </div>
              </div>
            </div>
          </Link>
        )}
      </div>

      <button className="w-full py-4 font-bold text-primary-dark border-2 border-primary-dark rounded-2xl hover:bg-green-50 transition-colors">
        Tampilkan Lebih Banyak
      </button>

    </div>
  );
}
