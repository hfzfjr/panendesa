"use client";

import React from "react";
import { 
  Package, 
  ArrowDownToLine, 
  ArrowUpFromLine,
  FileDown,
  Warehouse,
  TrendingUp,
  Activity
} from "lucide-react";

export default function KopdesStokPage() {
  const mutasiHistory = [
    { type: "IN", name: "Intake Harian", item: "Cabai Merah (Grade A)", amount: "+ 150 kg", date: "Hari ini, 09:30", color: "text-green-600", bg: "bg-green-100" },
    { type: "OUT", name: "Pengiriman", item: "Padi Giling (Grade B)", amount: "- 500 kg", date: "Hari ini, 08:15", color: "text-red-600", bg: "bg-red-100" },
    { type: "IN", name: "Intake Harian", item: "Jagung Pipil (Grade A)", amount: "+ 850 kg", date: "Kemarin, 14:20", color: "text-green-600", bg: "bg-green-100" },
    { type: "OUT", name: "Pengiriman", item: "Cabai Merah (Grade C)", amount: "- 200 kg", date: "Kemarin, 10:05", color: "text-red-600", bg: "bg-red-100" },
  ];

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 md:space-y-8 pb-32 md:pb-8 min-h-screen">
      
      {/* Header & Aksi Cepat */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-primary-dark tracking-tight mb-1">
            Stok & Kapasitas Gudang
          </h1>
          <p className="text-gray-600 font-medium text-sm md:text-base">
            Pantau ketersediaan komoditas dan batas kapasitas simpan gudang koperasi.
          </p>
        </div>
        <button className="w-full md:w-auto border-2 border-[#117A3E] text-[#117A3E] hover:bg-green-50 font-bold px-6 py-3 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm shrink-0">
          <FileDown className="w-5 h-5" />
          Unduh Laporan Stok
        </button>
      </div>

      {/* Visualisasi Kapasitas Gudang (Atas) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
        
        {/* Kapasitas Gudang (Hero Card) */}
        <div className="lg:col-span-8 bg-white p-5 md:p-8 rounded-2xl border border-gray-200 shadow-sm relative overflow-hidden">
          <div className="absolute -right-10 -top-10 text-gray-50 opacity-50 pointer-events-none">
            <Warehouse className="w-64 h-64" />
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg md:text-xl font-bold text-gray-900 flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary-dark" />
                Tingkat Keterisian Gudang
              </h2>
              <span className="bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1 rounded-full">Kapasitas Maks: 50 Ton</span>
            </div>

            <div className="flex items-end gap-2 mb-4">
              <span className="text-4xl md:text-5xl font-black text-primary-dark">65%</span>
              <span className="text-gray-500 font-medium mb-1 md:mb-2">Terisi (32.500 kg)</span>
            </div>

            {/* Progress Bar Besar */}
            <div className="h-6 w-full bg-gray-100 rounded-full overflow-hidden flex shadow-inner">
              <div 
                className="h-full bg-gradient-to-r from-[#205C3B] to-[#2ECC71] rounded-full relative" 
                style={{ width: '65%' }}
              >
                {/* Stripe effect inside progress bar */}
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,.15) 50%, rgba(255,255,255,.15) 75%, transparent 75%, transparent)', backgroundSize: '1rem 1rem' }}></div>
              </div>
            </div>
            <div className="flex justify-between text-xs font-bold text-gray-400 mt-2">
              <span>0%</span>
              <span>Sisa 17.500 kg</span>
              <span>100%</span>
            </div>
          </div>
        </div>

        {/* IN & OUT Cards */}
        <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-4 md:gap-6">
          <div className="bg-white p-5 border border-gray-100 rounded-2xl shadow-sm flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                <ArrowDownToLine className="w-4 h-4 text-green-600" />
              </div>
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">MASUK HARI INI</h3>
            </div>
            <div className="text-2xl font-black text-gray-900 ml-10">
              1,200 <span className="text-sm font-medium text-gray-500">kg</span>
            </div>
          </div>
          
          <div className="bg-white p-5 border border-gray-100 rounded-2xl shadow-sm flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                <ArrowUpFromLine className="w-4 h-4 text-red-600" />
              </div>
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">KELUAR HARI INI</h3>
            </div>
            <div className="text-2xl font-black text-gray-900 ml-10">
              800 <span className="text-sm font-medium text-gray-500">kg</span>
            </div>
          </div>
        </div>
      </div>

      {/* Rincian Komoditas (Tengah) */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Package className="w-5 h-5 text-primary-dark" />
          Rincian Stok per Komoditas
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          
          {/* Padi */}
          <div className="bg-white border border-gray-200 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <h3 className="font-bold text-gray-900 text-lg mb-1">Padi Giling</h3>
            <p className="text-gray-500 text-sm mb-4">Total Stok Tersedia</p>
            <div className="text-3xl font-black text-[#117A3E] mb-5">12.500 <span className="text-base text-gray-500 font-medium">kg</span></div>
            
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-gray-700">Grade A</span>
                  <span className="text-gray-500">8.750 kg (70%)</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#117A3E]" style={{ width: '70%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-gray-700">Grade B</span>
                  <span className="text-gray-500">3.750 kg (30%)</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-400" style={{ width: '30%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Jagung */}
          <div className="bg-white border border-gray-200 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <h3 className="font-bold text-gray-900 text-lg mb-1">Jagung Pipil</h3>
            <p className="text-gray-500 text-sm mb-4">Total Stok Tersedia</p>
            <div className="text-3xl font-black text-orange-500 mb-5">8.200 <span className="text-base text-gray-500 font-medium">kg</span></div>
            
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-gray-700">Grade A</span>
                  <span className="text-gray-500">8.200 kg (100%)</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500" style={{ width: '100%' }}></div>
                </div>
              </div>
              <div className="opacity-50">
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-gray-400">Grade B</span>
                  <span className="text-gray-400">0 kg (0%)</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden"></div>
              </div>
            </div>
          </div>

          {/* Cabai */}
          <div className="bg-white border border-gray-200 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <h3 className="font-bold text-gray-900 text-lg mb-1">Cabai Merah</h3>
            <p className="text-gray-500 text-sm mb-4">Total Stok Tersedia</p>
            <div className="text-3xl font-black text-red-600 mb-5">1.200 <span className="text-base text-gray-500 font-medium">kg</span></div>
            
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-gray-700">Grade A</span>
                  <span className="text-gray-500">600 kg (50%)</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-red-600" style={{ width: '50%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-gray-700">Grade B</span>
                  <span className="text-gray-500">600 kg (50%)</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-400" style={{ width: '50%' }}></div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Tabel Riwayat Mutasi Stok (Bawah) */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mt-6">
        <div className="p-4 md:p-6 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
          <h2 className="text-lg md:text-xl font-bold text-primary-dark flex items-center gap-2">
            Riwayat Mutasi Stok
          </h2>
          <button className="text-sm font-bold text-primary-dark hover:underline">Lihat Semua</button>
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-[11px] font-bold text-gray-500 uppercase tracking-widest">
                <th className="py-4 px-6 w-20">Tipe</th>
                <th className="py-4 px-6">Transaksi</th>
                <th className="py-4 px-6">Komoditas & Grade</th>
                <th className="py-4 px-6">Waktu</th>
                <th className="py-4 px-6 text-right">Jumlah</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {mutasiHistory.map((log, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold ${log.bg} ${log.color}`}>
                      {log.type}
                    </span>
                  </td>
                  <td className="py-4 px-6 font-bold text-gray-900">{log.name}</td>
                  <td className="py-4 px-6 font-medium text-gray-700">{log.item}</td>
                  <td className="py-4 px-6 text-gray-500">{log.date}</td>
                  <td className={`py-4 px-6 text-right font-black ${log.color}`}>{log.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card List View */}
        <div className="md:hidden divide-y divide-gray-100">
          {mutasiHistory.map((log, idx) => (
            <div key={idx} className="p-4 flex items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${log.bg}`}>
                  {log.type === 'IN' ? <ArrowDownToLine className={`w-5 h-5 ${log.color}`} /> : <ArrowUpFromLine className={`w-5 h-5 ${log.color}`} />}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{log.name}</h4>
                  <p className="text-xs text-gray-500 mb-1">{log.item}</p>
                  <p className="text-[10px] text-gray-400">{log.date}</p>
                </div>
              </div>
              <div className={`font-black text-lg ${log.color}`}>
                {log.amount}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
