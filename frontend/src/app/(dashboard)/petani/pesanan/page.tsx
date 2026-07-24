"use client";

import React from "react";
import Link from "next/link";
import { Download, Calendar, Filter, MapPin, Truck, ChevronLeft, ChevronRight, CheckCircle2, Clock, AlertCircle, RefreshCw } from "lucide-react";
import { mockPesanan } from "@/lib/mockDataPetani";
export default function PesananMockupPage() {
  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 pb-32 md:pb-8 bg-gray-50/50 min-h-screen">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 mb-2">
        <div className="flex items-center gap-4">
          <Link href="/petani" className="hidden md:flex w-10 h-10 bg-white border border-gray-200 rounded-md items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500 font-medium mb-1">
              <Link href="/petani" className="hover:text-primary-dark">Halaman Utama</Link>
              <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
              <span className="text-gray-900 font-bold">Pesanan Masuk</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
              Daftar Pesanan Saya
            </h1>
            <p className="text-gray-500 text-sm md:text-base hidden md:block">
              Kelola penjualan dan pantau bagi hasil panen Anda secara transparan.
            </p>
          </div>
        </div>
        <button className="flex items-center justify-center gap-2 bg-primary-dark hover:bg-primary text-white px-5 py-2.5 rounded-md font-semibold transition-colors shadow-sm">
          <Download className="w-4 h-4" />
          Unduh Laporan Penjualan
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Stat 1 */}
        <div className="bg-white p-5 rounded-md border border-gray-100 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-2">
            <p className="text-gray-500 font-medium">Total Pesanan Aktif</p>
            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
              <Truck className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-end gap-3">
            <h2 className="text-4xl font-bold text-gray-900">12</h2>
            <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-md mb-1">+2 Baru</span>
          </div>
        </div>

        {/* Stat 2 */}
        <div className="bg-white p-5 rounded-md border border-gray-100 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-2">
            <p className="text-gray-500 font-medium">Menunggu Konfirmasi</p>
            <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-500">
              <AlertCircle className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-end gap-3">
            <h2 className="text-4xl font-bold text-gray-900">3</h2>
            <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded-md mb-1">Perlu Tindakan</span>
          </div>
        </div>

        {/* Stat 3 */}
        <div className="bg-white p-5 rounded-md border border-gray-100 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-2">
            <p className="text-gray-500 font-medium">Pesanan Selesai</p>
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="flex flex-col justify-end">
            <h2 className="text-4xl font-bold text-gray-900 mb-1">148</h2>
            <span className="text-gray-400 text-xs font-medium">Bulan Ini (Mei 2024)</span>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-md border border-gray-100 shadow-sm flex flex-col lg:flex-row gap-4 items-end">
        <div className="w-full lg:w-1/4">
          <label className="block text-xs font-semibold text-gray-500 mb-1.5">Komoditas</label>
          <select className="w-full bg-gray-50 border border-gray-200 text-gray-700 py-2.5 px-3 rounded-xl outline-none focus:border-green-500 text-sm">
            <option>Semua Komoditas</option>
            <option>Cabai Merah Keriting</option>
            <option>Bawang Merah</option>
          </select>
        </div>
        <div className="w-full lg:w-1/4">
          <label className="block text-xs font-semibold text-gray-500 mb-1.5">Status</label>
          <select className="w-full bg-gray-50 border border-gray-200 text-gray-700 py-2.5 px-3 rounded-xl outline-none focus:border-green-500 text-sm">
            <option>Semua Status</option>
            <option>Selesai</option>
            <option>Dalam Proses</option>
            <option>Konfirmasi</option>
          </select>
        </div>
        <div className="w-full lg:w-1/3">
          <label className="block text-xs font-semibold text-gray-500 mb-1.5">Rentang Tanggal</label>
          <div className="relative">
            <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="1 Mei - 31 Mei 2024" 
              className="w-full bg-gray-50 border border-gray-200 text-gray-700 py-2.5 pl-9 pr-3 rounded-xl outline-none focus:border-green-500 text-sm"
              readOnly
            />
          </div>
        </div>
        <div className="w-full lg:w-auto ml-auto">
          <button className="w-full lg:w-auto flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-5 py-2.5 rounded-xl font-semibold transition-colors text-sm border border-gray-200">
            <Filter className="w-4 h-4" />
            Filter Lanjut
          </button>
        </div>
      </div>

      {/* Order List */}
      <div className="space-y-4">
        {mockPesanan.map((pesanan) => (
          <div key={pesanan.id} className="bg-white rounded-md border border-gray-100 shadow-sm overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border-b border-gray-100 bg-gray-50/50 gap-3">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">ID Pesanan</p>
                  <p className={`text-sm font-bold ${pesanan.status === 'Selesai' ? 'text-green-700' : pesanan.status === 'Berjalan' ? 'text-blue-700' : 'text-orange-700'}`}>#PD-202610{pesanan.id.toString().padStart(2, '0')}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Tanggal</p>
                  <p className="text-sm font-semibold text-gray-700">{pesanan.tanggal}</p>
                </div>
              </div>
              <div className={`${pesanan.status === 'Selesai' ? 'bg-green-100 text-green-700' : pesanan.status === 'Berjalan' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'} font-bold px-3 py-1 rounded-full text-xs flex items-center gap-1.5 self-start sm:self-auto uppercase`}>
                {pesanan.status === 'Selesai' && <CheckCircle2 className="w-3.5 h-3.5" />}
                {pesanan.status === 'Berjalan' && <RefreshCw className="w-3.5 h-3.5 animate-spin-slow" />}
                {pesanan.status === 'Perlu Persetujuan' && <AlertCircle className="w-3.5 h-3.5" />}
                {pesanan.status}
              </div>
            </div>
            
            {/* Body */}
            <div className="p-5 flex flex-col md:flex-row gap-5">
              {/* Image */}
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden shrink-0 bg-gray-100 border border-gray-100 relative">
                <img 
                  src={pesanan.gambar} 
                  alt={pesanan.komoditas} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Content */}
              <div className="flex-1 flex flex-col justify-between">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1.5">{pesanan.komoditas}</h3>
                    <div className="flex items-center gap-3 text-sm text-gray-600 font-medium mb-3">
                      <span className="flex items-center gap-1"><span className="text-yellow-500">★</span> Grade A</span>
                      <span className="flex items-center gap-1"><span className="text-gray-400">⚖</span> {pesanan.jumlah}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-600 px-2.5 py-1 rounded-lg text-xs font-medium border border-gray-200">
                        <MapPin className="w-3 h-3" /> Gudang Malang, Jatim
                      </span>
                      <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-600 px-2.5 py-1 rounded-lg text-xs font-medium border border-gray-200">
                        <Truck className="w-3 h-3" /> Logistik PanenDesa
                      </span>
                    </div>
                  </div>
                  
                  {/* Price block */}
                  <div className="lg:text-right">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Pendapatan Bersih</p>
                    <p className="text-xl md:text-2xl font-bold text-green-700">{pesanan.totalHarga}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Footer */}
            <div className="px-5 py-4 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gray-50/30">
              <p className="text-xs text-gray-500 font-medium">
                Pembeli: {pesanan.pembeli}
              </p>
              <Link href="/petani/pesanan/detail" className={`inline-flex items-center justify-center gap-2 ${pesanan.status === 'Perlu Persetujuan' ? 'bg-warning text-neutral-900 hover:opacity-90' : 'bg-primary-dark hover:bg-primary text-white'} px-5 py-2 rounded-md text-sm font-semibold transition-colors`}>
                {pesanan.status === 'Perlu Persetujuan' ? 'Tinjau Tawaran' : 'Lihat Rincian Bagi Hasil'} <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-200 mt-6">
        <p className="text-sm text-gray-500 font-medium">
          Menampilkan 1-3 dari 160 pesanan
        </p>
        <div className="flex items-center gap-1.5">
          <button className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 rounded-md bg-primary-dark text-white font-bold text-sm flex items-center justify-center">
            1
          </button>
          <button className="w-8 h-8 rounded-lg border border-gray-200 text-gray-600 font-medium text-sm flex items-center justify-center hover:bg-gray-50">
            2
          </button>
          <button className="w-8 h-8 rounded-lg border border-gray-200 text-gray-600 font-medium text-sm flex items-center justify-center hover:bg-gray-50">
            3
          </button>
          <span className="text-gray-400 px-1">...</span>
          <button className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
}
