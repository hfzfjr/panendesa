"use client";

import React from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Store, 
  MapPin, 
  Map, 
  Users, 
  Filter, 
  Search, 
  Banknote,
  Download,
  CheckCircle2
} from "lucide-react";

export default function KopdesOrderDetailPage() {
  const suppliers = [
    { name: "Ahmad Subarjo", grade: "A", weight: 850, desa: "Sukamaju", total: "Rp 12.750.000" },
    { name: "Siti Aminah", grade: "A", weight: 650, desa: "Sukamaju", total: "Rp 9.750.000" },
    { name: "Bambang Susanto", grade: "B", weight: 600, desa: "Harapan", total: "Rp 7.800.000" },
    { name: "Dedi Kurniawan", grade: "C", weight: 400, desa: "Harapan", total: "Rp 4.400.000" },
  ];

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case "A": return "bg-[#00602B] text-white";
      case "B": return "bg-[#F5B041] text-white";
      case "C": return "bg-[#E74C3C] text-white";
      default: return "bg-gray-200 text-gray-800";
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-6 pb-32 md:pb-8 min-h-screen">
      
      {/* Top Navigation */}
      <Link href="/kopdes/pesanan" className="inline-flex items-center gap-2 text-gray-700 hover:text-primary-dark font-bold text-lg mb-2 transition-colors">
        <ArrowLeft className="w-5 h-5" />
        Kembali ke Pesanan Pembeli
      </Link>

      <h1 className="text-3xl md:text-4xl font-extrabold text-primary-dark tracking-tight mb-6">
        Order Detail: #001
      </h1>

      {/* Info Cards (Pembeli & Distribusi) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {/* Card Pembeli */}
        <div className="bg-white p-5 md:p-6 border border-gray-200 rounded-2xl shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Store className="w-5 h-5 text-primary-dark" />
            <h3 className="text-xs font-bold text-primary-dark uppercase tracking-wider">PEMBELI</h3>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">PT. Agromart Nusantara</h2>
          <div className="flex items-start gap-2 text-gray-500">
            <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
            <span className="text-sm font-medium">Jakarta Selatan, DKI Jakarta</span>
          </div>
        </div>

        {/* Card Alokasi Distribusi */}
        <div className="bg-white p-5 md:p-6 border border-gray-200 rounded-2xl shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Map className="w-5 h-5 text-primary-dark" />
            <h3 className="text-xs font-bold text-primary-dark uppercase tracking-wider">ALOKASI DISTRIBUSI DESA</h3>
          </div>
          
          {/* Progress Bar */}
          <div className="h-4 w-full bg-gray-100 rounded-full overflow-hidden flex mb-4">
            <div className="h-full bg-[#117A3E]" style={{ width: '60%' }} title="Desa Sukamaju 60%"></div>
            <div className="h-full bg-[#205C3B]" style={{ width: '40%' }} title="Desa Harapan 40%"></div>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-4 text-sm font-bold text-gray-700">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#117A3E]"></div>
              Desa Sukamaju (60%)
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#205C3B]"></div>
              Desa Harapan (40%)
            </div>
          </div>

          <div className="inline-block bg-green-50 text-green-800 text-xs font-bold px-3 py-1.5 rounded-md">
            Total: 2,500 Kg
          </div>
        </div>
      </div>

      {/* Tabel / List Petani Penyuplai */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden mt-2">
        <div className="p-4 md:p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gray-50/50">
          <h2 className="text-lg md:text-xl font-bold text-primary-dark flex items-center gap-2">
            <Users className="w-5 h-5 md:w-6 md:h-6" />
            Daftar Petani Penyuplai
          </h2>
          <div className="flex items-center gap-3 self-end md:self-auto">
            <button className="text-gray-500 hover:text-gray-900 p-2"><Filter className="w-5 h-5" /></button>
            <button className="text-gray-500 hover:text-gray-900 p-2"><Search className="w-5 h-5" /></button>
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-xs font-bold text-gray-500 uppercase tracking-wider bg-white">
                <th className="py-4 px-6">Nama Petani</th>
                <th className="py-4 px-6">Grade</th>
                <th className="py-4 px-6">Kontribusi (KG)</th>
                <th className="py-4 px-6">Desa</th>
                <th className="py-4 px-6 text-right">Nilai Diterima</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {suppliers.map((petani, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 font-bold text-gray-900">{petani.name}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-md font-bold ${getGradeColor(petani.grade)}`}>
                      {petani.grade}
                    </span>
                  </td>
                  <td className="py-4 px-6 font-medium text-gray-900">{petani.weight} Kg</td>
                  <td className="py-4 px-6">
                    <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full font-medium text-xs">
                      {petani.desa}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right font-bold text-green-700">{petani.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card List View */}
        <div className="md:hidden divide-y divide-gray-100">
          {suppliers.map((petani, idx) => (
            <div key={idx} className="p-4 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-gray-900 text-base">{petani.name}</h4>
                <span className={`inline-flex items-center justify-center w-7 h-7 rounded-md font-bold text-sm ${getGradeColor(petani.grade)}`}>
                  {petani.grade}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500 font-medium">Kontribusi</span>
                <span className="font-bold text-gray-900">{petani.weight} Kg</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500 font-medium">Desa</span>
                <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full font-medium text-xs">
                  {petani.desa}
                </span>
              </div>
              <div className="flex items-center justify-between mt-2 pt-3 border-t border-gray-50">
                <span className="text-gray-500 font-bold text-xs">Nilai Diterima</span>
                <span className="font-bold text-green-700 text-base">{petani.total}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rincian Harga & Fee */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm relative overflow-hidden mt-6">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-bl-[100px] pointer-events-none"></div>
        <div className="p-5 md:p-6 md:px-8">
          <div className="flex items-center gap-2 mb-6">
            <Banknote className="w-5 h-5 text-primary-dark" />
            <h3 className="text-xs font-bold text-primary-dark uppercase tracking-wider">RINCIAN HARGA & FEE</h3>
          </div>

          <div className="space-y-4 mb-6 md:mb-8 text-sm md:text-base">
            <div className="flex justify-between items-center">
              <span className="font-bold text-gray-600 uppercase text-xs md:text-sm">SUBTOTAL HARGA KOTOR</span>
              <span className="font-bold text-gray-900">Rp 34.700.000</span>
            </div>
            <div className="flex justify-between items-center text-red-600">
              <span className="font-bold uppercase text-xs md:text-sm">TOTAL FEE KOPDES (2.5%)</span>
              <span className="font-bold">- Rp 867.500</span>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h3 className="font-bold text-gray-600 uppercase text-xs mb-1">TOTAL BERSIH PETANI</h3>
              <span className="inline-block bg-gray-100 text-gray-500 text-[10px] font-bold px-2 py-1 rounded">Kumulatif 4 Petani</span>
            </div>
            <div className="text-3xl md:text-4xl font-black text-primary-dark text-right">
              <span className="text-xl md:text-2xl mr-1">Rp</span>
              33.832.500
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 md:p-5 shadow-sm flex flex-col md:flex-row items-center justify-end gap-3 mt-6">
        <button className="w-full md:w-auto bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-bold px-6 py-3 md:py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm">
          <Download className="w-4 h-4" />
          Download PDF
        </button>
        <button className="w-full md:w-auto bg-primary-dark hover:bg-green-800 text-white font-bold px-8 py-3 md:py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm shadow-sm">
          <CheckCircle2 className="w-4 h-4" />
          Konfirmasi Harga
        </button>
      </div>

    </div>
  );
}
