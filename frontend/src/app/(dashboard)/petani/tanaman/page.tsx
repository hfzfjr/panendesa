"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PlusCircle, Sprout, Search, Filter, ChevronRight, ChevronLeft, AlertCircle, Calendar } from "lucide-react";
import { mockTanaman } from "@/lib/mockDataPetani";

export default function TanamanSayaPage() {
  const [filter, setFilter] = useState("Semua");

  const filteredTanaman = mockTanaman.filter(t => {
    if (filter === "Semua") return true;
    return t.status === filter;
  });

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 pb-32 md:pb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 mb-4 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <Link href="/petani" className="hidden md:flex w-10 h-10 bg-white border border-gray-200 rounded-md items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500 font-medium mb-1">
              <Link href="/petani" className="hover:text-primary-dark">Halaman Utama</Link>
              <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
              <span className="text-gray-900 font-bold">Tanaman Saya</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-primary-dark uppercase tracking-tight mb-2">
              TANAMAN SAYA
            </h1>
            <p className="text-gray-600 text-lg md:text-xl font-medium hidden md:block">
              Pantau semua kebun yang Sedang Ditanam maupun Sudah Panen.
            </p>
          </div>
        </div>
        <Link
          href="/petani/tanaman/baru"
          className="bg-primary-dark hover:bg-green-800 text-white font-bold px-6 py-4 rounded-2xl flex items-center justify-center gap-2 transition-colors shadow-md shrink-0"
        >
          <PlusCircle className="w-6 h-6" />
          <span className="text-lg">Mulai Tanam</span>
        </Link>
      </div>
      <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-hide">
        <button 
          onClick={() => setFilter("Semua")}
          className={`${filter === "Semua" ? "bg-primary-dark text-white shadow-sm" : "bg-white text-gray-600 border-2 border-gray-200 hover:bg-gray-50"} font-bold px-6 py-3 rounded-2xl shrink-0 transition-colors`}
        >
          Semua ({mockTanaman.length})
        </button>
        <button 
          onClick={() => setFilter("Sedang Ditanam")}
          className={`${filter === "Sedang Ditanam" ? "bg-primary-dark text-white shadow-sm" : "bg-white text-gray-600 border-2 border-gray-200 hover:bg-gray-50"} font-bold px-6 py-3 rounded-2xl shrink-0 transition-colors`}
        >
          Sedang Ditanam
        </button>
        <button 
          onClick={() => setFilter("Sudah Panen")}
          className={`${filter === "Sudah Panen" ? "bg-primary-dark text-white shadow-sm" : "bg-white text-gray-600 border-2 border-gray-200 hover:bg-gray-50"} font-bold px-6 py-3 rounded-2xl shrink-0 transition-colors`}
        >
          Sudah Panen
        </button>
      </div>
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-l-4 border-primary-dark pl-3 mb-6">
          <h2 className="text-xl font-bold text-gray-900">{filter === "Semua" ? "Semua Tanaman" : filter}</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredTanaman.map((tanaman) => (
            <Link key={tanaman.id} href="/petani/tanaman/detail" className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden flex flex-col group cursor-pointer hover:border-primary-dark transition-colors">
              <div className="h-48 md:h-56 w-full bg-gray-200 relative overflow-hidden">
                <img
                  src={tanaman.gambar}
                  alt={tanaman.nama}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {tanaman.keterangan === "Stok Tersedia" && (
                  <div className="absolute top-3 left-3 bg-primary-dark text-white font-bold px-3 py-1.5 rounded-xl text-sm shadow-md">
                    Stok Tersedia
                  </div>
                )}
                <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-primary-dark font-bold px-3 py-1.5 rounded-xl text-sm shadow-sm">
                  {tanaman.progress}% Selesai
                </div>
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-primary-dark transition-colors">{tanaman.nama}</h3>
                  <span className="text-gray-500 text-sm font-medium">2026</span>
                </div>
                <div className="flex items-center gap-4 text-gray-600 text-sm font-medium mb-4">
                  <span>0.5 ha</span>
                  <span>•</span>
                  <span>Laporan Rutin</span>
                </div>
                <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                  <div className="bg-primary-dark h-full rounded-full transition-all duration-1000" style={{ width: `${tanaman.progress}%` }}></div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        {filteredTanaman.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500 font-medium">Belum ada tanaman di kategori ini.</p>
          </div>
        )}
      </div>

    </div>
  );
}
