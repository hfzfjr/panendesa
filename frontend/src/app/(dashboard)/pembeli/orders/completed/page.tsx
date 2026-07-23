"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft, PackageCheck, Star, MessageSquare,
  Leaf, Download, Store, ShieldCheck, Info
} from "lucide-react";
import { Button } from "../../../../../components/ui/Button";

export default function OrderCompletedPage() {
  const [supplierRating, setSupplierRating] = useState(5);
  const [logisticsRating, setLogisticsRating] = useState(0);

  return (
    <main className="max-w-7xl mx-auto px-4 lg:px-8 py-6 md:py-12 pb-28 min-h-screen">

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Link href="/pembeli/orders" className="p-2 hover:bg-gray-100 rounded-full transition-colors -ml-2">
          <ArrowLeft className="w-6 h-6 text-gray-800" />
        </Link>
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">Pesanan Selesai</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">

        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">

          {/* Ringkasan Penerimaan */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 md:p-6">
            <h3 className="font-bold text-gray-900 flex items-center gap-2 text-lg mb-6">
              <PackageCheck className="w-6 h-6 text-primary-dark" />
              Ringkasan Penerimaan
            </h3>

            <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-gray-100">
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">TANGGAL DITERIMA</p>
                <p className="font-bold text-gray-900 text-sm md:text-base">24 Mei 2024, 14:20 WIB</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">PENERIMA LOKASI</p>
                <p className="font-bold text-gray-900 text-sm md:text-base">Gudang Utama - Jakarta Selatan</p>
              </div>
            </div>

            {/* Item List */}
            <div className="bg-[#F2F7F2] border border-primary-dark/10 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-200 shrink-0">
                  <img src="https://images.unsplash.com/photo-1526346698789-22fd84314424?q=80&w=150&auto=format&fit=crop" alt="Cabai Merah" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm md:text-base">Cabai Merah Keriting (Grade A)</h4>
                  <p className="text-xs text-gray-500 mt-1">Kuantitas: 500 kg</p>
                </div>
              </div>
              <div className="font-bold text-primary-dark text-sm bg-white px-3 py-1.5 rounded-lg shadow-sm border border-primary-dark/10">
                Lolos QC
              </div>
            </div>
          </div>

          {/* Ulasan & Penilaian */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 md:p-6">
            <h3 className="font-bold text-gray-900 flex items-center gap-2 text-lg mb-6">
              <MessageSquare className="w-5 h-5 text-primary-dark" />
              Ulasan & Penilaian
            </h3>

            {/* Pemasok */}
            <div className="border border-gray-200 rounded-xl p-4 md:p-5 mb-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h4 className="font-bold text-gray-900">Kopdes Tani Makmur</h4>
                  <p className="text-xs text-gray-500">Pemasok Utama</p>
                </div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} onClick={() => setSupplierRating(star)} className="focus:outline-none">
                      <Star className={`w-6 h-6 ${star <= supplierRating ? 'fill-[#F59E0B] text-[#F59E0B]' : 'text-gray-300'}`} />
                    </button>
                  ))}
                </div>
              </div>
              <textarea
                className="w-full bg-[#F9FAFB] border border-gray-200 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary-dark/50"
                rows={3}
                placeholder="Bagaimana kualitas hasil tani?"
              ></textarea>
            </div>

            {/* Pengiriman */}
            <div className="border border-gray-200 rounded-xl p-4 md:p-5 mb-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h4 className="font-bold text-gray-900">PanenDesa Logistics</h4>
                  <p className="text-xs text-gray-500">Mitra Pengiriman</p>
                </div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} onClick={() => setLogisticsRating(star)} className="focus:outline-none">
                      <Star className={`w-6 h-6 ${star <= logisticsRating ? 'fill-[#F59E0B] text-[#F59E0B]' : 'text-gray-300'}`} />
                    </button>
                  ))}
                </div>
              </div>
              <textarea
                className="w-full bg-[#F9FAFB] border border-gray-200 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary-dark/50"
                rows={3}
                placeholder="Beri masukan untuk kecepatan pengiriman..."
              ></textarea>
            </div>

            <Button className="w-full h-12 rounded-xl bg-(--color-primary-dark) hover:bg-(--color-primary) text-white font-bold transition-colors">
              Kirim Penilaian
            </Button>
          </div>

          {/* Dampak Positif */}
          <div className="bg-linear-to-br from-primary-dark to-primary rounded-2xl p-5 md:p-6 text-white flex gap-4 items-start relative overflow-hidden shadow-md">
            {/* Decorative background element */}
            <div className="absolute -right-4 -bottom-4 opacity-10 pointer-events-none">
              <Leaf className="w-32 h-32" />
            </div>

            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0 border border-white/30 z-10 backdrop-blur-sm">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <div className="z-10">
              <h4 className="font-bold text-base md:text-lg mb-1">Dampak Positif Anda</h4>
              <p className="text-xs md:text-sm text-green-50 leading-relaxed">
                Dengan pengiriman langsung dari petani melalui PanenDesa, Anda telah mengurangi emisi karbon sebesar <span className="font-bold border-b border-white/50 pb-0.5">12kg CO2</span>. Anda luar biasa!
              </p>
            </div>
          </div>

        </div>

        {/* Right Column */}
        <div className="lg:col-span-1 space-y-4">

          {/* Ringkasan Pesanan */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="bg-primary-dark px-4 md:px-5 py-4 flex justify-between items-center">
              <h3 className="font-bold text-white text-lg">Ringkasan Pesanan</h3>
              <Info className="w-5 h-5 text-white/80" />
            </div>

            <div className="p-4 md:p-5">
              <div className="flex gap-3 items-center pb-4 border-b border-gray-100 mb-4">
                <div className="w-12 h-12 rounded-lg bg-gray-200 overflow-hidden shrink-0">
                  <img src="https://images.unsplash.com/photo-1526346698789-22fd84314424?q=80&w=150&auto=format&fit=crop" alt="Thumbnail" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Cabai Merah Keriting</h4>
                  <p className="text-[10px] text-gray-500 mt-0.5">Grade A • 500kg</p>
                </div>
              </div>

              <div className="space-y-3 mb-4 border-b border-gray-100 pb-4 text-sm">
                <div className="flex justify-between items-center text-gray-600">
                  <span>Harga Komoditas (500kg)</span>
                  <span className="font-bold text-gray-900">Rp 11.250.000</span>
                </div>
                <div className="flex justify-between items-center text-gray-600">
                  <span>Fee Kopdes (5%)</span>
                  <span className="font-bold text-gray-900">Rp 562.500</span>
                </div>
                <div className="flex justify-between items-center text-gray-600">
                  <span>QC & Logistik</span>
                  <span className="font-bold text-gray-900">Rp 687.500</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">TOTAL PEMBAYARAN</span>
                <span className="bg-primary-dark text-white text-[10px] font-bold px-2 py-1 rounded">LUNAS</span>
              </div>
              <div className="font-extrabold text-primary-dark text-2xl">
                Rp 12.500.000
              </div>
            </div>
          </div>

          <Button variant="custom" className="w-full h-12 rounded-xl bg-white border border-primary-dark text-primary-dark hover:bg-[#F2F7F2] font-bold transition-colors flex items-center justify-center gap-2">
            <Download className="w-4 h-4" />
            Unduh Invoice (PDF)
          </Button>

          <Link href="/pembeli" className="block w-full">
            <Button variant="custom" className="w-full h-12 rounded-xl bg-[#795548] hover:bg-[#5D4037] text-white font-bold transition-colors flex items-center justify-center gap-2">
              <Store className="w-4 h-4" />
              Kembali ke Marketplace
            </Button>
          </Link>

          {/* Guarantee Box */}
          <div className="bg-[#F2F7F2] rounded-xl border border-primary-dark/10 p-4">
            <div className="flex items-center gap-1 mb-2">
              <ShieldCheck className="w-4 h-4 text-primary-dark" />
              <h4 className="font-bold text-primary-dark text-xs">SafePanenDesa Guaranteed</h4>
            </div>
            <p className="text-[10px] text-gray-600 leading-relaxed">
              Transaksi ini dilindungi oleh asuransi pengiriman AgriMatch sebesar 100% dari nilai barang.
            </p>
          </div>

        </div>

      </div>
    </main>
  );
}
