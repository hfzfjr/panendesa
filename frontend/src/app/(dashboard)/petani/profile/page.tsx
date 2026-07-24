"use client";

import React from "react";
import Link from "next/link";
import {
  User, Settings, MapPin, ClipboardCheck, Bell,
  HelpCircle, LogOut, ChevronRight, ArrowLeft
} from "lucide-react";

export default function PetaniProfilePage() {
  const menuItems = [
    { icon: User, label: "Informasi Pribadi", href: "#" },
    { icon: MapPin, label: "Alamat Lahan & Rumah", href: "#" },
    { icon: ClipboardCheck, label: "Rekening Bank", href: "#" },
    { icon: Bell, label: "Notifikasi", href: "/petani/notifications" },
    { icon: Settings, label: "Pengaturan Akun", href: "#" },
    { icon: HelpCircle, label: "Konsultasi Pertanian", href: "/petani/bantuan-teknis" },
  ];

  return (
    <div className="p-4 md:p-8 max-w-2xl mx-auto space-y-6 pb-32 md:pb-8 min-h-screen">
      
      {/* Header */}
      <div className="flex items-center gap-4 border-b border-gray-100 pb-4 pt-2 mb-6">
        <Link href="/petani" className="w-10 h-10 bg-white border border-gray-200 rounded-md flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500 font-medium mb-1">
            <Link href="/petani" className="hover:text-primary-dark">Halaman Utama</Link>
            <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
            <span className="text-gray-900 font-bold">Profil</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-primary-dark tracking-tight">
            PROFIL SAYA
          </h1>
        </div>
      </div>

      {/* Profile Header Card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex items-center gap-5 relative overflow-hidden">
        {/* Background accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-dark/5 rounded-full -translate-y-1/2 translate-x-1/3"></div>

        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gray-200 border-4 border-white shadow-md shrink-0 overflow-hidden relative z-10">
          <img src="https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?q=80&w=100&auto=format&fit=crop" alt="Profile Avatar" className="w-full h-full object-cover" />
        </div>

        <div className="relative z-10">
          <h2 className="font-bold text-gray-900 text-lg md:text-xl mb-1">Pak Budi</h2>
          <p className="text-sm text-gray-500 mb-2">budi.petani@email.com</p>
          <span className="inline-flex items-center bg-primary-dark text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm">
            Petani Aktif
          </span>
        </div>
      </div>

      {/* Menu List */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <Link
              key={index}
              href={item.href}
              className={`flex items-center justify-between p-4 md:p-5 hover:bg-gray-50 transition-colors ${index !== menuItems.length - 1 ? "border-b border-gray-100" : ""
                }`}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary-dark/5 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-primary-dark" />
                </div>
                <span className="font-bold text-gray-800">{item.label}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>
          );
        })}
      </div>

      {/* Logout Button */}
      <button className="w-full h-14 rounded-2xl bg-white border border-red-200 text-red-600 hover:bg-red-50 font-bold transition-colors flex items-center justify-center gap-2 shadow-sm">
        <LogOut className="w-5 h-5" />
        Keluar Akun
      </button>

    </div>
  );
}
