"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Trash2, ShieldCheck, MapPin } from "lucide-react";
import { Button } from "../../../../components/ui/Button";

export default function CartPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 lg:px-8 py-6 md:py-12 pb-28 min-h-screen">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Link href="/dashboard/pembeli/marketplace" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6 text-gray-800" />
          </Link>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">Keranjang Belanja</h1>
        </div>
        <span className="bg-primary-dark/10 text-primary-dark px-3 py-1 rounded-full text-sm font-bold">
          1 Item
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">

        {/* Left Column - Cart Items */}
        <div className="lg:col-span-2 space-y-6">

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 md:p-6">
            {/* Vendor Name */}
            <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-100">
              <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-primary-dark focus:ring-primary-dark" defaultChecked />
              <ShieldCheck className="w-5 h-5 text-primary-dark" />
              <span className="font-bold text-gray-900 text-sm md:text-base">Kopdes Tani Makmur</span>
            </div>

            {/* Product Item */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-start gap-4 flex-1">
                <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-primary-dark focus:ring-primary-dark mt-1" defaultChecked />

                <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden bg-gray-200 shrink-0">
                  <img src="https://images.unsplash.com/photo-1526346698789-22fd84314424?q=80&w=150&auto=format&fit=crop" alt="Cabai Merah" className="w-full h-full object-cover" />
                </div>

                <div className="flex flex-col flex-1">
                  <h4 className="font-bold text-gray-900 text-sm md:text-base">Cabai Merah Keriting (Grade A)</h4>
                  <p className="text-xs text-gray-500 mb-2">Varietas Lembang • Panen Segar</p>
                  <p className="font-bold text-primary-dark text-lg">Rp 22.500 <span className="text-xs text-gray-500 font-normal">/ kg</span></p>
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-end gap-4 ml-9 sm:ml-0">
                <button className="text-gray-400 hover:text-red-500 transition-colors p-2">
                  <Trash2 className="w-5 h-5" />
                </button>

                <div className="flex items-center border border-gray-300 rounded-lg bg-white overflow-hidden">
                  <button className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center font-bold text-gray-600 hover:bg-gray-100 transition-colors border-r border-gray-300">
                    -
                  </button>
                  <div className="w-12 md:w-16 h-8 md:h-10 flex items-center justify-center font-bold text-gray-900 text-sm">
                    500
                  </div>
                  <button className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center font-bold text-gray-600 hover:bg-gray-100 transition-colors border-l border-gray-300">
                    +
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Right Column - Summary */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 md:p-6 sticky top-24">

            <div className="flex items-start gap-3 mb-6 pb-6 border-b border-gray-100">
              <MapPin className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">PENGIRIMAN KE</p>
                <p className="font-semibold text-gray-900 text-sm mb-1">Gudang Utama</p>
                <p className="text-xs text-gray-500 truncate max-w-50">Jl. Sudirman No. 45, Jakarta Selatan</p>
              </div>
            </div>

            <h3 className="font-bold text-gray-900 mb-4">Ringkasan Belanja</h3>

            <div className="space-y-3 mb-6 pb-6 border-b border-gray-100 text-sm">
              <div className="flex justify-between items-center text-gray-600">
                <span>Total Harga (500 kg)</span>
                <span className="font-semibold text-gray-900">Rp 11.250.000</span>
              </div>
              <div className="flex justify-between items-center text-gray-600">
                <span>Diskon Pembelian Grosir</span>
                <span className="font-semibold text-primary-dark">-Rp 500.000</span>
              </div>
            </div>

            <div className="flex justify-between items-end mb-6">
              <span className="font-bold text-gray-900">Total</span>
              <span className="font-extrabold text-primary-dark text-xl md:text-2xl">Rp 10.750.000</span>
            </div>

            <Link href="/dashboard/pembeli/checkout" className="block w-full">
              <Button className="w-full h-12 lg:h-14 rounded-xl bg-(--color-primary-dark) hover:bg-(--color-primary) text-white font-bold text-base transition-colors shadow-lg shadow-green-900/20">
                Beli (1)
              </Button>
            </Link>

          </div>
        </div>

      </div>
    </main>
  );
}
