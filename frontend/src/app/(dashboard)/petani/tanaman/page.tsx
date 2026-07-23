"use client";

import React from "react";
import Link from "next/link";
import { PlusCircle, Sprout, Search, Filter, ChevronRight, AlertCircle, Calendar } from "lucide-react";

export default function TanamanSayaPage() {
  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6 pb-32 md:pb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-primary-dark uppercase tracking-tight mb-2">
            TANAMAN SAYA
          </h1>
          <p className="text-gray-600 text-lg md:text-xl font-medium">
            Pantau semua kebun yang Sedang Ditanam maupun Sudah Panen.
          </p>
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
        <button className="bg-primary-dark text-white font-bold px-6 py-3 rounded-2xl shrink-0 shadow-sm">
          Semua (4)
        </button>
        <button className="bg-white text-gray-600 border-2 border-gray-200 font-bold px-6 py-3 rounded-2xl shrink-0 hover:bg-gray-50">
          Sedang Ditanam
        </button>
        <button className="bg-white text-gray-600 border-2 border-gray-200 font-bold px-6 py-3 rounded-2xl shrink-0 hover:bg-gray-50">
          Sudah Panen
        </button>
      </div>
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-l-4 border-primary-dark pl-3 mb-6">
          <h2 className="text-xl font-bold text-gray-900">Sedang Ditanam</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Link href="/petani/tanaman/detail" className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden flex flex-col group cursor-pointer hover:border-primary-dark transition-colors">
            <div className="h-48 md:h-56 w-full bg-gray-200 relative overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=600&auto=format&fit=crop"
                alt="Cabai Merah"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-primary-dark text-white font-bold px-3 py-1.5 rounded-xl text-sm shadow-md">
                Stok Tersedia
              </div>
              <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-primary-dark font-bold px-3 py-1.5 rounded-xl text-sm shadow-sm">
                90% Selesai
              </div>
            </div>
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-2xl font-bold text-gray-900 group-hover:text-primary-dark transition-colors">Cabai Merah</h3>
                <span className="text-gray-500 text-sm font-medium">Mei - Juli 2026</span>
              </div>
              <div className="flex items-center gap-4 text-gray-600 text-sm font-medium mb-4">
                <span>0.5 ha</span>
                <span>•</span>
                <span>7 Laporan</span>
              </div>
              <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                <div className="bg-primary-dark w-[90%] h-full rounded-full"></div>
              </div>
            </div>
          </Link>
          <Link href="/petani/tanaman/detail" className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden flex flex-col group cursor-pointer hover:border-primary-dark transition-colors">
            <div className="h-48 md:h-56 w-full bg-gray-200 relative overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1592688849767-e9526715f3de?q=80&w=600&auto=format&fit=crop"
                alt="Bawang Merah"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-primary-dark font-bold px-3 py-1.5 rounded-xl text-sm shadow-sm">
                50% Selesai
              </div>
            </div>
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-2xl font-bold text-gray-900 group-hover:text-primary-dark transition-colors">Bawang Merah</h3>
                <span className="text-gray-500 text-sm font-medium">Juni - Agustus 2026</span>
              </div>
              <div className="flex items-center gap-4 text-gray-600 text-sm font-medium mb-4">
                <span>0.8 ha</span>
                <span>•</span>
                <span>3 Laporan</span>
              </div>
              <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                <div className="bg-primary-dark w-[50%] h-full rounded-full"></div>
              </div>
            </div>
          </Link>

        </div>
      </div>

    </div>
  );
}
