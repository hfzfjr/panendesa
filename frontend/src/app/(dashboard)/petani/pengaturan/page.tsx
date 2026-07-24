"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronRight, Bell, Shield, Key, Eye, Smartphone, Save } from "lucide-react";

export default function PetaniPengaturanPage() {
  const [notifWA, setNotifWA] = useState(true);
  const [notifPush, setNotifPush] = useState(true);
  const [publicProfile, setPublicProfile] = useState(true);

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto space-y-6 pb-32 md:pb-8 min-h-screen">
      
      {/* Header */}
      <div className="flex items-center gap-4 border-b border-gray-100 pb-4 pt-2 mb-6">
        <Link href="/petani/profile" className="w-10 h-10 bg-white border border-gray-200 rounded-md flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500 font-medium mb-1">
            <Link href="/petani" className="hover:text-primary-dark">Halaman Utama</Link>
            <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
            <Link href="/petani/profile" className="hover:text-primary-dark">Profil</Link>
            <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
            <span className="text-gray-900 font-bold">Pengaturan</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-primary-dark tracking-tight">
            PENGATURAN AKUN
          </h1>
        </div>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        
        {/* Notifikasi */}
        <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-4 md:p-5 border-b border-gray-100 flex items-center gap-3 bg-gray-50/50">
            <Bell className="w-5 h-5 text-primary-dark" />
            <h2 className="font-bold text-gray-900 text-lg">Notifikasi</h2>
          </div>
          <div className="p-4 md:p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-gray-800 mb-1">Notifikasi Aplikasi</p>
                <p className="text-sm text-gray-500">Peringatan laporan dan skor kepercayaan</p>
              </div>
              <button 
                onClick={() => setNotifPush(!notifPush)}
                className={`w-12 h-6 rounded-full transition-colors relative flex items-center ${notifPush ? 'bg-primary-dark' : 'bg-gray-300'}`}
              >
                <div className={`w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform ${notifPush ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
          </div>
        </section>

        {/* Keamanan & Privasi */}
        <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-4 md:p-5 border-b border-gray-100 flex items-center gap-3 bg-gray-50/50">
            <Shield className="w-5 h-5 text-primary-dark" />
            <h2 className="font-bold text-gray-900 text-lg">Keamanan & Privasi</h2>
          </div>
          <div className="p-4 md:p-5 space-y-4">
            <Link href="#" className="flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-primary-dark/10 transition-colors">
                  <Key className="w-5 h-5 text-gray-600 group-hover:text-primary-dark transition-colors" />
                </div>
                <div>
                  <p className="font-bold text-gray-800">Ubah Kata Sandi</p>
                  <p className="text-sm text-gray-500">Ganti PIN atau password akun Anda</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>
            <div className="w-full h-px bg-gray-100" />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <Eye className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-800 mb-1">Profil Publik</p>
                  <p className="text-sm text-gray-500">Tampilkan skor ke anggota Kopdes lain</p>
                </div>
              </div>
              <button 
                onClick={() => setPublicProfile(!publicProfile)}
                className={`w-12 h-6 rounded-full transition-colors relative flex items-center ${publicProfile ? 'bg-primary-dark' : 'bg-gray-300'}`}
              >
                <div className={`w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform ${publicProfile ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
          </div>
        </section>

      </div>

      <button className="w-full h-14 rounded-2xl bg-primary-dark hover:bg-green-800 text-white font-bold transition-colors flex items-center justify-center gap-2 shadow-sm mt-8">
        <Save className="w-5 h-5" />
        Simpan Perubahan
      </button>

    </div>
  );
}
