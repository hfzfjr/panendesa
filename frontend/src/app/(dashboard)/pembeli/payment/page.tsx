"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Copy, Info, CheckCircle, Clock } from "lucide-react";
import { Button } from "../../../../components/ui/Button";

export default function PaymentPage() {
  const [activeTab, setActiveTab] = useState<"transfer" | "qris">("transfer");
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60); // 24 hours in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, "0")} : ${m.toString().padStart(2, "0")} : ${s.toString().padStart(2, "0")}`;
  };

  return (
    <main className="max-w-7xl mx-auto px-4 lg:px-8 py-8 md:py-12">

      {/* Back Button */}
      <Link href="/pembeli/checkout" className="inline-flex items-center gap-2 text-gray-700 hover:text-primary-dark font-medium mb-8 transition-colors">
        <ArrowLeft className="w-5 h-5" />
        Kembali
      </Link>

      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-4xl font-bold text-neutral-900 tracking-tight mb-2 md:mb-4">
          Pembayaran
        </h1>
        <div className="inline-flex items-center gap-2 bg-gray-100/80 px-4 py-2 rounded-lg text-sm text-gray-600">
          <ShieldCheck className="w-4 h-4 text-gray-400" />
          Silakan selesaikan pembayaran sesuai dengan metode yang Anda pilih.
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left Column: Payment Process */}
        <div className="lg:col-span-2 flex flex-col gap-6">

          {/* Status Header */}
          <div className="bg-red-50 rounded-t-2xl border-b-2 border-red-100 p-4 flex justify-between items-center text-sm font-bold text-red-600">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              MENUNGGU PEMBAYARAN
            </div>
            <div className="text-gray-500 font-medium flex items-center gap-2">
              Batas Waktu: <span className="text-red-600 font-bold">{formatTime(timeLeft)}</span>
            </div>
          </div>

          {/* Total Payment Box */}
          <div className="bg-white rounded-b-2xl rounded-t-none -mt-6 border border-t-0 border-gray-200 p-8 flex flex-col items-center justify-center shadow-sm">
            <span className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Total Pembayaran</span>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl md:text-5xl font-extrabold text-primary-dark">Rp 8.275.000</span>
              <button className="text-primary hover:text-primary-dark transition-colors p-2 rounded-full hover:bg-green-50">
                <Copy className="w-6 h-6" />
              </button>
            </div>
            <div className="bg-green-50 text-primary-dark text-xs font-semibold px-4 py-2 rounded-full flex items-center gap-2">
              <Info className="w-4 h-4" />
              Transfer nominal hingga <span className="font-extrabold">3 digit terakhir</span>
            </div>
          </div>

          {/* Tabs & Payment Method Details */}
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm mt-4">
            {/* Tabs */}
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab("transfer")}
                className={`flex-1 py-4 text-sm font-bold transition-colors ${activeTab === "transfer" ? "text-primary-dark border-b-2 border-primary-dark bg-green-50/30" : "text-gray-500 hover:text-gray-700 bg-gray-50/50 hover:bg-gray-100/50"}`}
              >
                Transfer Bank
              </button>
              <button
                onClick={() => setActiveTab("qris")}
                className={`flex-1 py-4 text-sm font-bold transition-colors ${activeTab === "qris" ? "text-primary-dark border-b-2 border-primary-dark bg-green-50/30" : "text-gray-500 hover:text-gray-700 bg-gray-50/50 hover:bg-gray-100/50"}`}
              >
                QRIS
              </button>
            </div>

            {/* Tab Content */}
            <div className="p-8">
              {activeTab === "transfer" && (
                <div className="flex flex-col gap-6 animate-in fade-in duration-300">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    <div>
                      <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Nama Rekening</div>
                      <div className="text-lg font-medium text-gray-900">PanenDesa Escrow (Mandiri/BCA)</div>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Nomor Virtual Account</div>
                      <div className="flex items-center justify-between bg-neutral-50 border border-gray-200 rounded-xl px-4 py-3">
                        <span className="text-xl font-bold tracking-widest text-gray-900">8809 1234 5678</span>
                        <button className="text-[10px] font-bold text-primary-dark flex items-center gap-1 hover:text-primary uppercase">
                          Salin <Copy className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "qris" && (
                <div className="flex flex-col items-center justify-center animate-in fade-in duration-300">
                  <h3 className="font-bold text-gray-800 mb-6 uppercase tracking-widest text-sm">Scan QRIS Untuk Membayar</h3>

                  {/* Fake QR Code using a pattern for demonstration */}
                  <div className="w-64 h-64 p-4 bg-white border border-gray-200 rounded-3xl shadow-sm mb-8 flex justify-center items-center">
                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=PanenDesaPaymentSimulator" alt="QRIS" className="w-full h-full object-contain" />
                  </div>

                  <div className="text-sm text-gray-500 mb-4">Mendukung pembayaran via:</div>
                  <div className="flex gap-4 items-center justify-center opacity-70 grayscale hover:grayscale-0 transition-all duration-300">
                    {/* Fake Logos for E-wallets */}
                    <span className="font-bold text-blue-600">BCA</span>
                    <span className="font-bold text-orange-500">ShopeePay</span>
                    <span className="font-bold text-purple-600">OVO</span>
                    <span className="font-bold text-blue-400">DANA</span>
                    <span className="font-bold text-green-500">GoPay</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Payment Instructions */}
          <div className="bg-neutral-100 rounded-2xl p-6 border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-4 text-sm">Instruksi Pembayaran</h3>

            {activeTab === "transfer" ? (
              <ul className="space-y-4">
                <li className="flex gap-3 text-sm text-gray-600">
                  <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center font-bold shrink-0 text-xs shadow-sm shadow-green-900/20">1</span>
                  <p className="mt-1">Buka aplikasi Mobile Banking pilihan Anda dan login.</p>
                </li>
                <li className="flex gap-3 text-sm text-gray-600">
                  <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center font-bold shrink-0 text-xs shadow-sm shadow-green-900/20">2</span>
                  <p className="mt-1">Pilih menu <span className="font-bold text-gray-800">Transfer</span> &gt; <span className="font-bold text-gray-800">Virtual Account</span>.</p>
                </li>
                <li className="flex gap-3 text-sm text-gray-600">
                  <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center font-bold shrink-0 text-xs shadow-sm shadow-green-900/20">3</span>
                  <p className="mt-1">Masukkan nomor Virtual Account <span className="font-bold text-gray-800">8809 1234 5678</span>.</p>
                </li>
                <li className="flex gap-3 text-sm text-gray-600">
                  <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center font-bold shrink-0 text-xs shadow-sm shadow-green-900/20">4</span>
                  <p className="mt-1">Pastikan nominal sesuai dengan total tagihan (termasuk kode unik).</p>
                </li>
              </ul>
            ) : (
              <ul className="space-y-4">
                <li className="flex gap-3 text-sm text-gray-600">
                  <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center font-bold shrink-0 text-xs shadow-sm shadow-green-900/20">1</span>
                  <p className="mt-1">Buka aplikasi e-wallet atau mobile banking Anda.</p>
                </li>
                <li className="flex gap-3 text-sm text-gray-600">
                  <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center font-bold shrink-0 text-xs shadow-sm shadow-green-900/20">2</span>
                  <p className="mt-1">Pilih menu Scan/Bayar dan arahkan ke kode QR di atas.</p>
                </li>
                <li className="flex gap-3 text-sm text-gray-600">
                  <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center font-bold shrink-0 text-xs shadow-sm shadow-green-900/20">3</span>
                  <p className="mt-1">Periksa nominal pembayaran dan selesaikan transaksi.</p>
                </li>
              </ul>
            )}
          </div>

          {/* Bottom Actions (Desktop Only) */}
          <div className="hidden lg:flex items-center gap-4 mt-4">
            <Link href="/pembeli/payment/success" className="w-full sm:w-auto">
              <Button className="w-full h-12 rounded-xl bg-primary-dark hover:bg-primary font-bold px-8 transition-colors">
                Cek Status Pembayaran
              </Button>
            </Link>
            <Link href="/pembeli/marketplace" className="text-sm font-medium text-gray-500 hover:text-primary-dark">
              Kembali ke Marketplace
            </Link>
          </div>

        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-1">
          <div className="space-y-6">

            {/* Order Summary Box */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="bg-primary-dark text-white px-6 py-4 flex justify-between items-center">
                <h3 className="font-bold text-lg">Ringkasan Pesanan</h3>
                <Info className="w-5 h-5 text-white/70" />
              </div>

              <div className="p-6">
                {/* Item Summary */}
                <div className="flex items-center gap-4 pb-4 border-b border-gray-100 mb-4">
                  <div className="w-16 h-12 rounded-lg overflow-hidden shrink-0">
                    <img src="https://images.unsplash.com/photo-1595855761081-37d45cb04791?q=80&w=200&auto=format&fit=crop" alt="Item" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-sm leading-tight">Cabai Merah Keriting</h4>
                    <p className="text-xs text-gray-500 mt-1">Grade A • 500kg</p>
                  </div>
                </div>

                {/* Calculations */}
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-medium text-gray-900">Rp 8.250.000</span>
                  </div>
                  <div className="flex justify-between items-center text-gray-600">
                    <span>Biaya Layanan</span>
                    <span className="font-medium text-gray-900">Rp 24.500</span>
                  </div>
                  <div className="flex justify-between items-center text-gray-900 font-bold">
                    <span>Kode Unik</span>
                    <span className="text-primary-dark">+Rp 500</span>
                  </div>

                  <div className="flex justify-between items-center pt-3 mt-3 border-t border-gray-100">
                    <span className="text-sm font-bold text-gray-700">Total</span>
                    <span className="text-base font-bold text-primary-dark">Rp 8.275.000</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Escrow Shield Right */}
            <div className="bg-green-50 rounded-2xl border border-green-900/10 p-5 flex flex-col gap-3 text-center sm:text-left sm:flex-row items-center sm:items-start">
              <div className="shrink-0">
                <CheckCircle className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="font-bold text-primary-dark text-sm mb-1">Secure Escrow Protection</h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Dana Anda aman di sistem escrow kami. Pembayaran akan diteruskan ke petani hanya setelah Anda mengonfirmasi penerimaan barang berkualitas.
                </p>
              </div>
            </div>

            {/* Support Link */}
            <div className="text-center pt-4">
              <p className="text-xs text-gray-500 mb-2">Butuh bantuan pembayarannya?</p>
              <Link href="#" className="text-sm font-bold text-primary-dark hover:text-primary flex items-center justify-center gap-1">
                Hubungi Support PanenDesa
                <ArrowLeft className="w-3 h-3 transform rotate-135" /> {/* Little diagonal arrow hack */}
              </Link>
            </div>

            {/* Bottom Actions (Mobile Only) */}
            <div className="flex lg:hidden flex-col gap-4 mt-6 pt-4 border-t border-gray-100">
              <Link href="/dashboard/pembeli/payment/success" className="w-full">
                <Button className="w-full h-12 rounded-xl bg-primary-dark hover:bg-primary font-bold px-8 transition-colors">
                  Cek Status Pembayaran
                </Button>
              </Link>
              <Link href="/dashboard/pembeli/marketplace" className="text-sm font-medium text-gray-500 hover:text-primary-dark text-center">
                Kembali ke Marketplace
              </Link>
            </div>

          </div>
        </div>

      </div>
    </main>

  );
}
