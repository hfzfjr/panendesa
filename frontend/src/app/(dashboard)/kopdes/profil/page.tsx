"use client";

import React from "react";
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Camera,
  ShieldCheck,
  Save
} from "lucide-react";

export default function KopdesProfilPage() {
  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-6 md:space-y-8 pb-32 md:pb-8 min-h-screen">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-primary-dark tracking-tight mb-1">
          Profil Koperasi
        </h1>
        <p className="text-gray-500 font-medium text-sm md:text-base">
          Kelola informasi identitas dan kontak resmi koperasi Anda.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        
        {/* Left Column: Photo & Quick Status */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex flex-col items-center text-center relative">
            <div className="relative group cursor-pointer mb-4">
              <div className="w-32 h-32 rounded-full bg-green-50 border-4 border-white shadow-md flex items-center justify-center overflow-hidden">
                <span className="text-5xl font-black text-primary-dark opacity-50">KS</span>
              </div>
              <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <h2 className="text-xl font-bold text-gray-900 mb-1">Koperasi Sukamaju</h2>
            <p className="text-sm text-gray-500 font-medium flex items-center justify-center gap-1">
              <ShieldCheck className="w-4 h-4 text-blue-500" />
              Terverifikasi Nasional
            </p>

            <div className="w-full h-px bg-gray-100 my-5"></div>

            <div className="w-full text-left space-y-3">
              <div className="flex items-start gap-3">
                <Building2 className="w-5 h-5 text-gray-400 shrink-0" />
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase">NIK Koperasi</p>
                  <p className="text-sm font-bold text-gray-900">32.05.12.3456.789</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-400 shrink-0" />
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase">Wilayah Operasi</p>
                  <p className="text-sm font-medium text-gray-900">Desa Sukamaju, Jawa Barat</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Forms */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-5 md:p-6 border-b border-gray-100 bg-gray-50/50">
              <h3 className="text-lg font-bold text-gray-900">Informasi Umum</h3>
            </div>
            <div className="p-5 md:p-6 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-gray-700">Nama Koperasi</label>
                  <input type="text" defaultValue="Koperasi Tani Sukamaju Bersama" className="w-full bg-gray-50 border border-gray-200 focus:border-primary-dark focus:bg-white focus:ring-1 focus:ring-primary-dark rounded-xl px-4 py-2.5 text-sm font-medium transition-colors outline-none" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-gray-700">Nomor Induk Koperasi (NIK)</label>
                  <input type="text" defaultValue="32.05.12.3456.789" className="w-full bg-gray-50 border border-gray-200 focus:border-primary-dark focus:bg-white focus:ring-1 focus:ring-primary-dark rounded-xl px-4 py-2.5 text-sm font-medium transition-colors outline-none" />
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-sm font-bold text-gray-700">Alamat Lengkap</label>
                  <textarea defaultValue="Jl. Raya Agrikultur No. 88, Desa Sukamaju, Kec. Bumi Makmur, Kab. Pertanian, Jawa Barat 40999" rows={3} className="w-full bg-gray-50 border border-gray-200 focus:border-primary-dark focus:bg-white focus:ring-1 focus:ring-primary-dark rounded-xl px-4 py-2.5 text-sm font-medium transition-colors outline-none resize-none"></textarea>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-5 md:p-6 border-b border-gray-100 bg-gray-50/50">
              <h3 className="text-lg font-bold text-gray-900">Kontak Pengurus</h3>
            </div>
            <div className="p-5 md:p-6 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-gray-700">Nama Ketua Koperasi</label>
                  <input type="text" defaultValue="Bpk. H. Suparman" className="w-full bg-gray-50 border border-gray-200 focus:border-primary-dark focus:bg-white focus:ring-1 focus:ring-primary-dark rounded-xl px-4 py-2.5 text-sm font-medium transition-colors outline-none" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-gray-700">Jabatan</label>
                  <input type="text" defaultValue="Ketua Umum" disabled className="w-full bg-gray-100 border border-gray-200 text-gray-500 rounded-xl px-4 py-2.5 text-sm font-medium cursor-not-allowed" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-gray-700">Nomor Telepon / WhatsApp</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input type="text" defaultValue="+62 812-3456-7890" className="w-full bg-gray-50 border border-gray-200 focus:border-primary-dark focus:bg-white focus:ring-1 focus:ring-primary-dark rounded-xl pl-10 pr-4 py-2.5 text-sm font-medium transition-colors outline-none" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-gray-700">Alamat Email Resmi</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input type="email" defaultValue="admin@kopdes-sukamaju.id" className="w-full bg-gray-50 border border-gray-200 focus:border-primary-dark focus:bg-white focus:ring-1 focus:ring-primary-dark rounded-xl pl-10 pr-4 py-2.5 text-sm font-medium transition-colors outline-none" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button className="w-full md:w-auto bg-primary-dark hover:bg-green-800 text-white font-bold px-8 py-3 rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2">
              <Save className="w-5 h-5" />
              Simpan Perubahan
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
