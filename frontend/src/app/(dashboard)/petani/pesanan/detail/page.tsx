"use client";

import React from "react";
import Link from "next/link";
import { Download, Copy, ChevronRight, ChevronLeft, CheckCircle2, TrendingUp, Package, MapPin, Calculator, ShieldCheck, Clock } from "lucide-react";

export default function PesananDetailBagiHasilPage() {
  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 pb-32 md:pb-8 bg-gray-50/50 min-h-screen">
      
      {/* Breadcrumb & Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 mb-4 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <Link href="/petani/pesanan" className="w-10 h-10 bg-white border border-gray-200 rounded-md flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500 font-medium mb-1">
              <Link href="/petani" className="hover:text-primary-dark">Halaman Utama</Link>
              <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
              <Link href="/petani/pesanan" className="hover:text-primary-dark">Pesanan Masuk</Link>
              <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
              <span className="text-gray-900 font-bold">Detail Bagi Hasil</span>
            </div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl md:text-4xl font-extrabold text-primary-dark">
                Order #001
              </h1>
              <span className="bg-success text-white text-xs font-bold px-3 py-1.5 rounded-full mt-1">
                Terverifikasi
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 px-5 py-2.5 rounded-md font-semibold transition-colors shadow-sm text-sm">
            <Copy className="w-4 h-4" />
            Salin Rincian
          </button>
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-primary-dark hover:bg-primary text-white px-5 py-2.5 rounded-md font-semibold transition-colors shadow-sm text-sm">
            <Download className="w-4 h-4" />
            Download PDF
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* LEFT COLUMN */}
        <div className="w-full lg:w-2/3 space-y-6">
          
          {/* Rincian Perhitungan */}
          <div className="bg-white rounded-md border border-gray-100 shadow-sm p-6 relative overflow-hidden">
            <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
              <div className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-primary-dark" />
                <h2 className="text-xl font-bold text-gray-900">Rincian Perhitungan</h2>
              </div>
              <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-2.5 py-1 rounded-md">
                Update: 12 Okt 2023, 14:20
              </span>
            </div>

            <div className="space-y-8 relative">
              {/* Vertical line connecting steps */}
              <div className="absolute left-4 top-4 bottom-12 w-0.5 bg-gray-200 z-0 hidden sm:block"></div>

              {/* Step 1 */}
              <div className="flex items-start gap-4 relative z-10">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-600 shrink-0 text-sm border-2 border-white shadow-sm hidden sm:flex">
                  1
                </div>
                <div className="flex-1 flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Harga Dasar Komoditas</p>
                    <p className="text-gray-900 font-medium text-sm md:text-base">Harga jual rata-rata ke mitra retail/wholesaler</p>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="text-lg md:text-xl font-semibold text-gray-900">Rp 15.000 <span className="text-xs text-gray-500 font-normal">/kg</span></p>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-4 relative z-10">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-600 shrink-0 text-sm border-2 border-white shadow-sm hidden sm:flex">
                  2
                </div>
                <div className="flex-1 flex flex-col sm:flex-row justify-between sm:items-start gap-2">
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Potongan Operasional (Fee Kopdes 5%)</p>
                    <p className="text-gray-900 font-medium text-sm md:text-base mb-3">Alokasi logistik, gudang, dan pemeliharaan</p>
                    <div className="inline-block bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1.5 rounded-lg border border-gray-200">
                      Harga Netto Petani: Rp 14.250 /kg
                    </div>
                  </div>
                  <div className="text-left sm:text-right mt-2 sm:mt-0">
                    <p className="text-lg md:text-xl font-semibold text-red-500">- Rp 750 <span className="text-xs text-red-400 font-normal">/kg</span></p>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-4 relative z-10">
                <div className="w-8 h-8 rounded-full bg-primary-dark text-white flex items-center justify-center font-bold shrink-0 text-sm border-2 border-white shadow-sm hidden sm:flex">
                  3
                </div>
                <div className="flex-1 w-full">
                  <p className="text-[10px] font-bold text-primary-dark uppercase tracking-wider mb-2">Kontribusi Hasil Panen Saya</p>
                  <div className="bg-green-50/50 border border-green-200/60 rounded-md p-4 md:p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h4 className="font-bold text-gray-900 text-base md:text-lg mb-1">Volume Terverifikasi</h4>
                      <p className="text-xs text-gray-500 font-medium">Gudang Kolektif Desa A, Malang</p>
                    </div>
                    <div className="text-left sm:text-right w-full sm:w-auto">
                      <p className="text-xs text-gray-600 font-semibold mb-1">195 kg × Rp 14.250</p>
                      <p className="text-2xl md:text-3xl font-bold text-primary-dark">Rp 2.779.500</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Distribusi Semua Petani */}
          <div className="bg-white rounded-md border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-1">Distribusi Semua Petani</h2>
                <p className="text-xs text-gray-500 font-medium">Transparansi kolektif untuk Order #001</p>
              </div>
              <div className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 font-bold px-3 py-1.5 rounded-full text-[10px] uppercase border border-green-100">
                <ShieldCheck className="w-3.5 h-3.5" /> Transparansi Penuh
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-gray-50/50 text-gray-500 text-[10px] uppercase font-bold tracking-wider">
                  <tr>
                    <th className="px-6 py-4 border-b border-gray-100">ID Petani</th>
                    <th className="px-6 py-4 border-b border-gray-100">Nama (Inisial)</th>
                    <th className="px-6 py-4 border-b border-gray-100">Volume (Kg)</th>
                    <th className="px-6 py-4 border-b border-gray-100">Proporsi (%)</th>
                    <th className="px-6 py-4 border-b border-gray-100 text-right">Total Terima (Rp)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-800 font-medium">
                  <tr className="bg-green-50/20">
                    <td className="px-6 py-4">P-0122</td>
                    <td className="px-6 py-4 font-bold text-primary-dark">Suwarno <br/><span className="text-[10px]">(SAYA)</span></td>
                    <td className="px-6 py-4">195 kg</td>
                    <td className="px-6 py-4">15.6%</td>
                    <td className="px-6 py-4 text-right font-bold text-gray-900">2.779.500</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-gray-500">P-0118</td>
                    <td className="px-6 py-4">Ah*** B.</td>
                    <td className="px-6 py-4">310 kg</td>
                    <td className="px-6 py-4">24.8%</td>
                    <td className="px-6 py-4 text-right font-bold text-gray-900">4.417.500</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-gray-500">P-0131</td>
                    <td className="px-6 py-4">Ri*** S.</td>
                    <td className="px-6 py-4">250 kg</td>
                    <td className="px-6 py-4">20.0%</td>
                    <td className="px-6 py-4 text-right font-bold text-gray-900">3.562.500</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-gray-500">P-0142</td>
                    <td className="px-6 py-4">Ma*** T.</td>
                    <td className="px-6 py-4">495 kg</td>
                    <td className="px-6 py-4">39.6%</td>
                    <td className="px-6 py-4 text-right font-bold text-gray-900">7.053.750</td>
                  </tr>
                </tbody>
                <tfoot className="bg-gray-100/50 font-bold text-gray-900">
                  <tr>
                    <td colSpan={2} className="px-6 py-4 text-[10px] uppercase tracking-wider text-gray-500">Total Kolektif</td>
                    <td className="px-6 py-4">1.250 kg</td>
                    <td className="px-6 py-4">100%</td>
                    <td className="px-6 py-4 text-right text-base text-primary-dark">17.813.250</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
          
        </div>

        {/* RIGHT COLUMN */}
        <div className="w-full lg:w-1/3 space-y-6">
          
          {/* Total Estimasi Pendapatan Card */}
          <div className="bg-primary-dark rounded-md p-6 text-white shadow-xl shadow-green-900/10 relative overflow-hidden">
            {/* Background design */}
            <div className="absolute -right-8 -bottom-8 opacity-10">
              <Calculator className="w-40 h-40" />
            </div>
            
            <div className="relative z-10">
              <p className="text-[10px] font-bold text-green-100 uppercase tracking-wider mb-2">Total Estimasi Pendapatan</p>
              <h2 className="text-3xl md:text-4xl font-black mb-8 break-words">
                Rp 2.779.500
              </h2>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-md p-4 border border-white/20">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-green-100 font-medium">Status Transfer</span>
                  <span className="bg-green-400 text-green-900 text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest">Aman</span>
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <Clock className="w-4 h-4 text-green-100" />
                  Menunggu Konfirmasi
                </div>
              </div>
            </div>
          </div>

          {/* Wawasan Pasar */}
          <div className="bg-white rounded-md border border-gray-100 shadow-sm p-6">
            <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-5">Wawasan Pasar</h3>
            
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600 shrink-0">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Tren Harga</p>
                  <p className="text-sm font-bold text-gray-900">+2.5% dibanding minggu lalu</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 shrink-0 border border-gray-100">
                  <Package className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Status Stok</p>
                  <p className="text-sm font-bold text-gray-900">1.250 kg (Habis Terjual)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Lokasi Panen */}
          <div className="bg-white rounded-md border border-gray-100 shadow-sm overflow-hidden">
            <div className="h-32 bg-gray-200 w-full relative">
              <img 
                src="https://images.unsplash.com/photo-1628102491629-778571d893a3?q=80&w=600&auto=format&fit=crop" 
                alt="Lokasi Lahan" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-5 flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary-dark shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] font-bold text-primary-dark uppercase tracking-wider mb-1">Lokasi Panen</p>
                <p className="text-sm font-medium text-gray-700 leading-relaxed">
                  Gudang Kolektif Desa A,<br/>
                  Malang, Jawa Timur
                </p>
              </div>
            </div>
          </div>

          {/* Info Block */}
          <div className="bg-gray-50 border border-gray-200 rounded-md p-5 text-center">
            <p className="text-xs text-gray-600 font-medium mb-3">Ada ketidaksesuaian data pada rincian bagi hasil ini?</p>
            <button className="w-full bg-white border border-gray-300 text-gray-700 text-xs font-bold py-2.5 rounded-md hover:bg-gray-50 transition-colors shadow-sm">
              Hubungi Admin Koperasi
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
