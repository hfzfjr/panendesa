"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Headphones, MessageSquare, PhoneCall, Mail, ChevronRight, CheckCircle2, ChevronLeft } from "lucide-react";

export default function BantuanTeknisPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate network request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 pb-32 md:pb-8">
      {/* Header */}
      <div className="flex items-center gap-4 border-b border-gray-100 pb-4 pt-2 mb-6">
        <Link href="/petani" className="hidden md:flex w-10 h-10 bg-white border border-gray-200 rounded-md items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors mt-2">
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <div>
          <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500 font-medium mb-1">
            <Link href="/petani" className="hover:text-primary-dark">Halaman Utama</Link>
            <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
            <span className="text-gray-900 font-bold">Konsultasi Pertanian</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 uppercase tracking-tight mb-2">
            Konsultasi Pertanian
          </h1>
          <p className="text-gray-500 font-medium text-lg md:text-xl">
            Ada kendala? Tim Koperasi PanenDesa siap membantu Anda.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Quick Contact Cards */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-primary-dark rounded-md p-6 md:p-8 shadow-lg text-white relative overflow-hidden">
            <div className="absolute -right-6 -bottom-6 opacity-10">
              <Headphones className="w-32 h-32" />
            </div>
            <div className="relative z-10">
              <h2 className="text-xl font-bold mb-1">Pusat Panggilan Petani</h2>
              <p className="text-green-100 text-sm mb-6">Buka Senin - Sabtu (08:00 - 17:00 WIB)</p>
              
              <div className="space-y-4">
                <a href="tel:08001234567" className="flex items-center gap-4 bg-white/10 hover:bg-white/20 transition-colors p-4 rounded-md backdrop-blur-sm border border-white/10 group">
                  <div className="w-12 h-12 bg-white text-primary-dark rounded-full flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                    <PhoneCall className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-green-50 text-xs font-bold tracking-wider uppercase mb-0.5">Bebas Pulsa</p>
                    <p className="text-lg font-black tracking-widest">0800-123-4567</p>
                  </div>
                </a>
                
                <a href="https://wa.me/6281234567890" target="_blank" rel="noreferrer" className="flex items-center gap-4 bg-white/10 hover:bg-white/20 transition-colors p-4 rounded-md backdrop-blur-sm border border-white/10 group">
                  <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-green-50 text-xs font-bold tracking-wider uppercase mb-0.5">WhatsApp Admin</p>
                    <p className="text-lg font-black tracking-widest">0812-3456-7890</p>
                  </div>
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-md p-6 border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Mail className="w-5 h-5 text-gray-400" /> Kontak Alternatif
            </h3>
            <p className="text-sm text-gray-500 font-medium mb-1">Email Koperasi:</p>
            <p className="text-gray-900 font-bold mb-4">bantuan@panendesa.id</p>
            
            <p className="text-sm text-gray-500 font-medium mb-1">Alamat Kantor Pusat:</p>
            <p className="text-gray-900 font-bold text-sm leading-relaxed">
              Gedung Koperasi Tani Makmur, Jl. Raya Pos No. 12<br/>
              Kab. Malang, Jawa Timur 65111
            </p>
          </div>
        </div>

        {/* Ticket Form */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-md p-6 md:p-8 border border-gray-100 shadow-sm h-full">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Kirim Pesan Bantuan</h2>
            <p className="text-gray-500 font-medium mb-6">Tuliskan kendala Anda, tim kami akan membalas via telepon atau notifikasi aplikasi.</p>

            {isSuccess ? (
              <div className="bg-green-50 border border-green-100 rounded-md p-8 text-center h-[300px] flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Pesan Berhasil Terkirim!</h3>
                <p className="text-gray-600 font-medium mb-6 max-w-sm">
                  Nomor Tiket Anda: <b>#TKT-8842</b>. Tim kami akan segera menghubungi Anda dalam 1x24 jam kerja.
                </p>
                <button 
                  onClick={() => setIsSuccess(false)}
                  className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold px-6 py-2.5 rounded-md transition-colors shadow-sm"
                >
                  Kirim Pesan Lain
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Nama Lengkap</label>
                    <input 
                      type="text" 
                      defaultValue="Pak Budi"
                      readOnly
                      className="w-full bg-gray-100 border border-gray-200 text-gray-500 py-3.5 px-4 rounded-md outline-none font-medium cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Kategori Masalah</label>
                    <select required className="w-full bg-gray-50 border border-gray-200 text-gray-900 py-3.5 px-4 rounded-md outline-none focus:border-primary-dark font-medium">
                      <option value="" disabled selected>-- Pilih Kategori --</option>
                      <option value="aplikasi">Kendala Aplikasi / Error</option>
                      <option value="panen">Konsultasi Hama & Panen</option>
                      <option value="pembayaran">Masalah Uang / Pembayaran</option>
                      <option value="logistik">Masalah Truk Penjemput</option>
                      <option value="lainnya">Lainnya</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Detail Kendala</label>
                  <textarea 
                    rows={5}
                    required
                    placeholder="Ceritakan secara rinci kendala yang sedang Anda hadapi agar tim kami bisa cepat membantu..."
                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 py-3.5 px-4 rounded-md outline-none focus:border-primary-dark font-medium resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className={`w-full md:w-auto font-bold text-base py-3.5 px-8 rounded-md transition-all shadow-md flex items-center justify-center gap-2 ml-auto ${
                    isSubmitting 
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                      : 'bg-primary-dark hover:bg-primary text-white'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
                      Mengirim...
                    </>
                  ) : (
                    <>
                      Kirim Tiket Masalah <ChevronRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
