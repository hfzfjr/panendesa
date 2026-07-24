import React from "react";
import Link from "next/link";
import { 
  Package, 
  Tractor, 
  Truck, 
  Users, 
  ClipboardList, 
  AlertCircle,
  TrendingUp,
  CheckCircle2
} from "lucide-react";

export default function KopdesDashboard() {
  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 md:space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-primary-dark tracking-tight mb-1">
          PanenDesa Overview
        </h1>
        <p className="text-gray-500 font-medium text-sm md:text-base">
          Kelola seluruh permintaan dan pengiriman komoditas desa.
        </p>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {/* Stok Hari Ini */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm relative overflow-hidden flex flex-col justify-between h-36">
          <div className="flex justify-between items-start">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">STOK HARI INI</h3>
            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center shrink-0">
              <Package className="w-5 h-5 text-primary-dark" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-gray-900 flex items-baseline gap-1">
              1.420 <span className="text-sm font-bold text-gray-500">kg</span>
            </div>
            <div className="flex items-center gap-1 text-xs font-bold text-green-600 mt-1">
              <TrendingUp className="w-3 h-3" />
              <span>+12% vs Kemarin</span>
            </div>
          </div>
        </div>

        {/* Petani Intake */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm relative overflow-hidden flex flex-col justify-between h-36">
          <div className="flex justify-between items-start">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">PETANI INTAKE</h3>
            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center shrink-0">
              <Tractor className="w-5 h-5 text-primary-dark" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-gray-900 flex items-baseline gap-1">
              24
            </div>
            <div className="text-xs font-medium text-gray-500 mt-1">
              Aktif di lokasi penimbangan
            </div>
          </div>
        </div>

        {/* Order Aktif */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm relative overflow-hidden flex flex-col justify-between h-36">
          <div className="flex justify-between items-start">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">ORDER AKTIF</h3>
            <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5 text-orange-600" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-gray-900 flex items-baseline gap-1">
              08
            </div>
            <div className="text-xs font-bold text-orange-600 mt-1">
              3 Perlu Konfirmasi Segera
            </div>
          </div>
        </div>

        {/* Petani Aktif */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm relative overflow-hidden flex flex-col justify-between h-36">
          <div className="flex justify-between items-start">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">PETANI AKTIF</h3>
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5 text-gray-600" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-gray-900 flex items-baseline gap-1">
              156
            </div>
            <div className="text-xs font-medium text-gray-500 mt-1">
              Total mitra terdaftar di zona
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
        
        {/* Left Column - Intake Hari Ini */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <ClipboardList className="w-5 h-5 text-primary-dark" />
              Intake Hari Ini
            </h2>
            <Link href="/kopdes/penerimaan" className="text-sm font-bold text-primary-dark hover:underline">
              Lihat Semua
            </Link>
          </div>

          <div className="space-y-3">
            {/* Pak Budi */}
            <div className="bg-white border border-gray-100 rounded-xl p-4 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 text-primary-dark font-bold rounded-full flex items-center justify-center shrink-0">
                  PB
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Pak Budi</h4>
                  <p className="text-xs text-gray-500 font-medium">Cabai Rawit • 45kg</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="hidden md:inline-flex bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-bold">
                  MENUNGGU
                </span>
                <Link href="/kopdes/penerimaan/baru" className="bg-primary-dark hover:bg-green-800 text-white font-bold text-sm px-5 py-2 rounded-md transition-colors flex items-center gap-1 shadow-sm">
                  <Package className="w-4 h-4" /> Proses
                </Link>
              </div>
            </div>

            {/* Pak Andi */}
            <div className="bg-white border border-gray-100 rounded-xl p-4 flex items-center justify-between shadow-sm opacity-75">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-100 text-gray-600 font-bold rounded-full flex items-center justify-center shrink-0">
                  PA
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Pak Andi</h4>
                  <p className="text-xs text-gray-500 font-medium">Bawang Merah • 120kg</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="hidden md:inline-flex bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                  SELESAI
                </span>
                <button className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-bold text-sm px-5 py-2 rounded-md transition-colors shadow-sm">
                  Detail
                </button>
              </div>
            </div>

            {/* Ibu Siti */}
            <div className="bg-white border border-gray-100 rounded-xl p-4 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-orange-100 text-orange-700 font-bold rounded-full flex items-center justify-center shrink-0">
                  IS
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Ibu Siti</h4>
                  <p className="text-xs text-gray-500 font-medium">Tomat Hijau • 32kg</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="hidden md:inline-flex bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-bold">
                  MENUNGGU
                </span>
                <Link href="/kopdes/penerimaan/baru" className="bg-primary-dark hover:bg-green-800 text-white font-bold text-sm px-5 py-2 rounded-md transition-colors flex items-center gap-1 shadow-sm">
                  <Package className="w-4 h-4" /> Proses
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Order Konfirmasi */}
        <div className="lg:col-span-5 bg-gray-50 rounded-2xl p-5 md:p-6 border border-gray-200">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
            <span className="text-red-500 text-xl">!</span> Order Konfirmasi
          </h2>

          <div className="space-y-4">
            {/* Order 1 */}
            <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary-dark"></div>
              <div className="flex justify-between items-start mb-3 pl-2">
                <div>
                  <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md">#ORD-001</span>
                  <h3 className="font-bold text-gray-900 mt-2 text-lg">Cabai Keriting</h3>
                </div>
                <Link href="/kopdes/pesanan/detail" className="text-[10px] font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full hover:bg-blue-100 transition-colors uppercase tracking-wider">
                  CEK HARGA
                </Link>
              </div>
              
              <div className="space-y-2 mb-4 pl-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Estimasi Volume:</span>
                  <span className="font-bold text-gray-900">200 kg</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Target Pick-up:</span>
                  <span className="font-bold text-gray-900">Besok, 08:00</span>
                </div>
              </div>

              <Link href="/kopdes/pesanan/detail" className="w-full bg-primary-dark hover:bg-green-800 text-white font-bold py-3 rounded-md transition-colors flex items-center justify-center gap-2 shadow-sm">
                <CheckCircle2 className="w-5 h-5" />
                Konfirmasi Order
              </Link>
            </div>

            {/* Order 2 */}
            <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary-dark"></div>
              <div className="flex justify-between items-start mb-3 pl-2">
                <div>
                  <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md">#ORD-002</span>
                  <h3 className="font-bold text-gray-900 mt-2 text-lg">Bawang Merah Brebes</h3>
                </div>
                <Link href="/kopdes/pesanan/detail" className="text-[10px] font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full hover:bg-blue-100 transition-colors uppercase tracking-wider">
                  CEK HARGA
                </Link>
              </div>
              
              <div className="space-y-2 mb-4 pl-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Estimasi Volume:</span>
                  <span className="font-bold text-gray-900">500 kg</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Target Pick-up:</span>
                  <span className="font-bold text-gray-900">26 Mei, 10:00</span>
                </div>
              </div>

              <Link href="/kopdes/pesanan/detail" className="w-full bg-primary-dark hover:bg-green-800 text-white font-bold py-3 rounded-md transition-colors flex items-center justify-center gap-2 shadow-sm">
                <CheckCircle2 className="w-5 h-5" />
                Konfirmasi Order
              </Link>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Banner */}
      <div className="bg-primary-dark rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg shadow-green-900/10 mt-8 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
          <Truck className="w-48 h-48 text-white" />
        </div>
        <div className="relative z-10 max-w-2xl">
          <h3 className="text-lg md:text-xl font-bold text-white mb-2">Siap untuk pengiriman sore?</h3>
          <p className="text-green-100 text-sm md:text-base leading-relaxed">
            Pastikan semua data timbangan sudah tersinkronisasi sebelum jam 16:00 untuk laporan harian otomatis.
          </p>
        </div>
        <button className="relative z-10 shrink-0 bg-white text-primary-dark font-bold px-8 py-3.5 rounded-lg shadow-md hover:bg-gray-50 transition-colors w-full md:w-auto text-sm md:text-base">
          Buka Laporan
        </button>
      </div>

    </div>
  );
}
