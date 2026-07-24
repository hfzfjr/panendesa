import React from "react";
import Link from "next/link";
import { Target, CalendarCheck, Leaf, Sparkles, ChevronRight, Apple, Sprout, Leaf as LeafIcon, ChevronLeft } from "lucide-react";

export default function TrustScorePage() {
  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8 pb-32 md:pb-8 bg-gray-50/50 min-h-screen">
      
      {/* Header */}
      <div className="flex items-center gap-4 border-b border-gray-100 pb-4 mb-6">
        <Link href="/petani" className="hidden md:flex w-10 h-10 bg-white border border-gray-200 rounded-md items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors mt-2">
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <div>
          <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500 font-medium mb-1">
            <Link href="/petani" className="hover:text-primary-dark">Halaman Utama</Link>
            <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
            <span className="text-gray-900 font-bold">Skor Kepercayaan</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-primary-dark uppercase tracking-tight mb-2">
            SKOR KEPERCAYAAN
          </h1>
          <p className="text-gray-600 font-medium">
            Kelola pendapatan dan rincian transaksi bagi hasil Anda secara transparan.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Big Card (Score Circle) */}
        <div className="lg:col-span-5 bg-white rounded-lg border border-gray-100 shadow-sm p-8 flex flex-col items-center justify-center relative overflow-hidden">
          {/* SVG Circle Progress */}
          <div className="relative w-64 h-64 flex items-center justify-center mb-6">
            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                stroke="#F3F4F6"
                strokeWidth="12"
              />
              {/* Progress circle */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                stroke="var(--color-primary-dark)"
                strokeWidth="12"
                strokeDasharray="251.2"
                strokeDashoffset="6.28" // Approx 97.5% progress
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-5xl font-black text-primary-dark">97.5</span>
              <span className="text-xs font-bold text-gray-500 tracking-widest mt-1">SKOR TOTAL</span>
            </div>
          </div>

          <div className="bg-success/10 text-success px-4 py-1.5 rounded-full font-bold text-sm mb-4">
            Sangat Konsisten
          </div>

          <p className="text-gray-600 text-center font-medium text-sm leading-relaxed px-4">
            Anda berada di peringkat <span className="font-bold text-gray-900">#1</span><br/>
            <span className="font-bold text-gray-900">dari 23 petani</span> di wilayah<br/>
            Anda.
          </p>
        </div>

        {/* Right Top (Score Breakdown) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Bar 1 */}
          <div className="bg-white rounded-md border border-gray-100 shadow-sm p-5 flex items-center gap-5">
            <div className="w-12 h-12 bg-green-50 text-green-700 rounded-xl flex items-center justify-center shrink-0">
              <Target className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-end mb-2">
                <h3 className="font-bold text-gray-900 text-lg">Akurasi Estimasi</h3>
                <span className="font-bold text-green-700 text-lg">97.5</span>
              </div>
              <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden mb-1">
                <div className="bg-primary-dark h-full rounded-full" style={{ width: '97.5%' }}></div>
              </div>
              <div className="flex justify-between items-center mt-1">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Bobot: 70%</p>
                <p className="text-[10px] font-bold text-primary-dark uppercase tracking-wider">Sangat Baik</p>
              </div>
            </div>
          </div>

          {/* Bar 2 */}
          <div className="bg-white rounded-md border border-gray-100 shadow-sm p-5 flex items-center gap-5">
            <div className="w-12 h-12 bg-green-50 text-green-700 rounded-xl flex items-center justify-center shrink-0">
              <CalendarCheck className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-end mb-2">
                <h3 className="font-bold text-gray-900 text-lg">Konsistensi Laporan</h3>
                <span className="font-bold text-green-700 text-lg">95.0</span>
              </div>
              <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden mb-1">
                <div className="bg-primary-dark h-full rounded-full" style={{ width: '95%' }}></div>
              </div>
              <div className="flex justify-between items-center mt-1">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Bobot: 20%</p>
                <p className="text-[10px] font-bold text-primary-dark uppercase tracking-wider">Baik</p>
              </div>
            </div>
          </div>

          {/* Bar 3 */}
          <div className="bg-white rounded-md border border-gray-100 shadow-sm p-5 flex items-center gap-5">
            <div className="w-12 h-12 bg-green-50 text-green-700 rounded-xl flex items-center justify-center shrink-0">
              <Leaf className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-end mb-2">
                <h3 className="font-bold text-gray-900 text-lg">Kualitas Perawatan</h3>
                <span className="font-bold text-green-700 text-lg">98.0</span>
              </div>
              <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden mb-1">
                <div className="bg-primary-dark h-full rounded-full" style={{ width: '98%' }}></div>
              </div>
              <div className="flex justify-between items-center mt-1">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Bobot: 10%</p>
                <p className="text-[10px] font-bold text-primary-dark uppercase tracking-wider">Sangat Baik</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
        
        {/* Bottom Left: Riwayat Transaksi */}
        <div className="lg:col-span-8 bg-white rounded-lg border border-gray-100 shadow-sm p-6 md:p-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-900">Riwayat Transaksi</h3>
            <button className="text-sm font-bold text-primary-dark hover:text-green-800 transition-colors">
              Lihat Semua
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[500px]">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="pb-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Tanggal</th>
                  <th className="pb-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Komoditas</th>
                  <th className="pb-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Estimasi vs Aktual</th>
                  <th className="pb-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider text-right pr-4">Skor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {/* Row 1 */}
                <tr className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 text-sm font-medium text-gray-700">12 Okt 2024</td>
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-600 shrink-0">
                        <Apple className="w-4 h-4" />
                      </div>
                      <span className="font-bold text-gray-900 text-sm">Tomat Cherry</span>
                    </div>
                  </td>
                  <td className="py-4 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">50kg</span>
                      <ChevronRight className="w-3 h-3 text-gray-300" />
                      <span className="font-bold text-gray-900">49.2kg</span>
                    </div>
                  </td>
                  <td className="py-4 text-right pr-2">
                    <span className="inline-block bg-success text-white px-2.5 py-1 rounded-sm text-xs font-bold">
                      98.4
                    </span>
                  </td>
                </tr>

                {/* Row 2 */}
                <tr className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 text-sm font-medium text-gray-700">05 Okt 2024</td>
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-600 shrink-0">
                        <Sprout className="w-4 h-4" />
                      </div>
                      <span className="font-bold text-gray-900 text-sm">Cabai Rawit</span>
                    </div>
                  </td>
                  <td className="py-4 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">25kg</span>
                      <ChevronRight className="w-3 h-3 text-gray-300" />
                      <span className="font-bold text-gray-900">24.5kg</span>
                    </div>
                  </td>
                  <td className="py-4 text-right pr-2">
                    <span className="inline-block bg-success text-white px-2.5 py-1 rounded-sm text-xs font-bold">
                      98.0
                    </span>
                  </td>
                </tr>

                {/* Row 3 */}
                <tr className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 text-sm font-medium text-gray-700">28 Sep 2024</td>
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-600 shrink-0">
                        <LeafIcon className="w-4 h-4" />
                      </div>
                      <span className="font-bold text-gray-900 text-sm">Bayam Jepang</span>
                    </div>
                  </td>
                  <td className="py-4 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">15kg</span>
                      <ChevronRight className="w-3 h-3 text-gray-300" />
                      <span className="font-bold text-gray-900">14.8kg</span>
                    </div>
                  </td>
                  <td className="py-4 text-right pr-2">
                    <span className="inline-block bg-success text-white px-2.5 py-1 rounded-sm text-xs font-bold">
                      98.6
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom Right: Tips Tingkatkan Skor */}
        <div className="lg:col-span-4 bg-primary rounded-lg shadow-lg p-6 md:p-8 text-white relative overflow-hidden flex flex-col justify-between h-full">
          {/* Big transparent circles for decoration */}
          <div className="absolute right-0 bottom-0 w-32 h-32 bg-white/10 rounded-full translate-x-1/2 translate-y-1/3"></div>
          <div className="absolute left-0 top-0 w-24 h-24 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          
          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              Tips Tingkatkan Skor
            </h3>
            
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm shrink-0 border border-white/10">
                  1
                </div>
                <div>
                  <h4 className="font-bold text-sm mb-1 text-green-50">Pelaporan Akurat</h4>
                  <p className="text-xs text-green-100/80 leading-relaxed font-medium">
                    Pastikan selisih berat estimasi dan aktual panen tidak lebih dari 5%.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm shrink-0 border border-white/10">
                  2
                </div>
                <div>
                  <h4 className="font-bold text-sm mb-1 text-green-50">Update Berkala</h4>
                  <p className="text-xs text-green-100/80 leading-relaxed font-medium">
                    Unggah foto perkembangan tanaman minimal 2 kali seminggu.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm shrink-0 border border-white/10">
                  3
                </div>
                <div>
                  <h4 className="font-bold text-sm mb-1 text-green-50">Pantau Cuaca</h4>
                  <p className="text-xs text-green-100/80 leading-relaxed font-medium">
                    Gunakan fitur weather monitoring untuk menyesuaikan jadwal panen.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <button className="mt-8 relative z-10 w-full bg-white hover:bg-gray-50 text-primary-dark font-bold py-3.5 px-4 rounded-md transition-colors shadow-sm">
            Baca Panduan Lengkap
          </button>
        </div>

      </div>
    </div>
  );
}
