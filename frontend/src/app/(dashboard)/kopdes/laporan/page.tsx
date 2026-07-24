"use client";

import React from "react";
import { 
  BarChart3, 
  TrendingUp, 
  Wallet, 
  Package, 
  Users,
  Download,
  Calendar,
  ChevronDown,
  Award
} from "lucide-react";

export default function KopdesLaporanPage() {
  const topFarmers = [
    { rank: 1, name: "Pak Budi", id: "SKM-001", volume: "4,500 Kg", income: "Rp 67.500.000" },
    { rank: 2, name: "Pak Andi", id: "SKM-042", volume: "3,200 Kg", income: "Rp 48.000.000" },
    { rank: 3, name: "Ibu Siti", id: "SKM-015", volume: "2,800 Kg", income: "Rp 42.000.000" },
    { rank: 4, name: "Pak Jono", id: "SKM-088", volume: "1,500 Kg", income: "Rp 22.500.000" },
  ];

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 md:space-y-8 pb-32 md:pb-8 min-h-screen">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-primary-dark tracking-tight mb-1">
            Laporan & Analitik
          </h1>
          <p className="text-gray-500 font-medium text-sm md:text-base">
            Pantau performa finansial, tren harga komoditas, dan produktivitas koperasi.
          </p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <button className="flex-1 md:flex-none bg-white border border-gray-200 text-gray-700 font-bold px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors shadow-sm text-sm">
            <Calendar className="w-4 h-4" />
            Bulan Ini
            <ChevronDown className="w-4 h-4" />
          </button>
          <button className="flex-1 md:flex-none bg-primary-dark hover:bg-green-800 text-white font-bold px-4 py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm text-sm">
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        
        {/* Omzet Kotor */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm relative overflow-hidden group">
          <div className="absolute right-0 top-0 w-24 h-24 bg-blue-50 rounded-bl-[100px] pointer-events-none group-hover:scale-110 transition-transform"></div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
              <BarChart3 className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Pendapatan Kotor</h3>
          </div>
          <p className="text-2xl font-black text-gray-900 mb-1">Rp 1.450.000.000</p>
          <div className="flex items-center gap-1 text-xs font-bold text-green-600">
            <TrendingUp className="w-3 h-3" />
            <span>+15% dari bulan lalu</span>
          </div>
        </div>

        {/* Keuntungan Bersih (Fee) */}
        <div className="bg-white rounded-2xl p-5 border-2 border-[#117A3E] shadow-sm relative overflow-hidden group">
          <div className="absolute right-0 top-0 w-24 h-24 bg-green-50 rounded-bl-[100px] pointer-events-none group-hover:scale-110 transition-transform"></div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#E8F8F5] flex items-center justify-center shrink-0">
              <Wallet className="w-5 h-5 text-[#117A3E]" />
            </div>
            <h3 className="text-xs font-bold text-[#117A3E] uppercase tracking-wider">Total Fee Koperasi (2.5%)</h3>
          </div>
          <p className="text-3xl font-black text-[#117A3E] mb-1">Rp 36.250.000</p>
          <div className="text-xs font-medium text-green-700">Keuntungan operasional bersih</div>
        </div>

        {/* Total Volume */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm relative overflow-hidden group">
          <div className="absolute right-0 top-0 w-24 h-24 bg-orange-50 rounded-bl-[100px] pointer-events-none group-hover:scale-110 transition-transform"></div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
              <Package className="w-5 h-5 text-orange-600" />
            </div>
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Volume Panen (Ton)</h3>
          </div>
          <p className="text-2xl font-black text-gray-900 mb-1">145 Ton</p>
          <div className="flex items-center gap-1 text-xs font-bold text-green-600">
            <TrendingUp className="w-3 h-3" />
            <span>+5 Ton dari bulan lalu</span>
          </div>
        </div>

        {/* Petani Aktif */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm relative overflow-hidden group">
          <div className="absolute right-0 top-0 w-24 h-24 bg-purple-50 rounded-bl-[100px] pointer-events-none group-hover:scale-110 transition-transform"></div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Petani Penerima Dana</h3>
          </div>
          <p className="text-2xl font-black text-gray-900 mb-1">156 Petani</p>
          <div className="text-xs font-medium text-gray-500">Menerima pembayaran bulan ini</div>
        </div>

      </div>

      {/* Main Charts & Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        
        {/* Left Column: Placeholder for Chart & Top Commodities */}
        <div className="lg:col-span-2 space-y-6 md:space-y-8">
          
          {/* Chart Placeholder */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm h-80 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">Tren Pendapatan & Fee</h2>
              <select className="bg-gray-50 border-none text-xs font-bold text-gray-500 rounded px-2 py-1">
                <option>6 Bulan Terakhir</option>
              </select>
            </div>
            <div className="flex-1 bg-gray-50 rounded-xl flex items-center justify-center border border-dashed border-gray-200 relative overflow-hidden">
              <div className="flex items-end gap-2 w-full h-full p-4 pt-10 justify-around">
                {[40, 65, 45, 80, 55, 100].map((h, i) => (
                  <div key={i} className="w-10 md:w-16 bg-[#117A3E] rounded-t-md opacity-80" style={{ height: `${h}%` }}></div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Commodities */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Komoditas Penyumbang Tertinggi</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between font-bold text-sm mb-1">
                  <span className="text-gray-800">Padi Giling (Grade A)</span>
                  <span className="text-[#117A3E]">Rp 850 Juta</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#117A3E]" style={{ width: '60%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between font-bold text-sm mb-1">
                  <span className="text-gray-800">Jagung Pipil Kering</span>
                  <span className="text-orange-500">Rp 450 Juta</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500" style={{ width: '35%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between font-bold text-sm mb-1">
                  <span className="text-gray-800">Cabai Merah</span>
                  <span className="text-red-500">Rp 150 Juta</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500" style={{ width: '15%' }}></div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Top Farmers */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm h-full">
            <div className="flex items-center gap-2 mb-6">
              <Award className="w-5 h-5 text-yellow-500" />
              <h2 className="text-lg font-bold text-gray-900">Petani Pahlawan Desa</h2>
            </div>
            <p className="text-xs text-gray-500 mb-4">Kontributor panen tertinggi bulan ini berdasarkan volume dan kualitas Grade A.</p>
            
            <div className="space-y-4">
              {topFarmers.map((petani, idx) => (
                <div key={idx} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm shrink-0 ${
                    idx === 0 ? 'bg-yellow-100 text-yellow-700' : 
                    idx === 1 ? 'bg-gray-200 text-gray-600' :
                    idx === 2 ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-500'
                  }`}>
                    #{petani.rank}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 text-sm">{petani.name}</h4>
                    <p className="text-[10px] text-gray-500">{petani.id} • {petani.volume}</p>
                  </div>
                  <div className="font-bold text-[#117A3E] text-sm text-right">
                    {petani.income}
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-6 bg-gray-50 text-primary-dark font-bold py-2 rounded-lg text-sm hover:bg-green-50 transition-colors">
              Lihat Semua Petani
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
