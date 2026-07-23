"use client";

import React from "react";
import Link from "next/link";
import {
  User, Settings, MapPin, CreditCard, Bell,
  HelpCircle, LogOut, ChevronRight
} from "lucide-react";
import { Button } from "../../../../components/ui/Button";

export default function ProfilePage() {
  const menuItems = [
    { icon: User, label: "Informasi Pribadi", href: "#" },
    { icon: MapPin, label: "Alamat Pengiriman", href: "#" },
    { icon: CreditCard, label: "Metode Pembayaran", href: "#" },
    { icon: Bell, label: "Notifikasi", href: "#" },
    { icon: Settings, label: "Pengaturan Akun", href: "#" },
    { icon: HelpCircle, label: "Bantuan & Dukungan", href: "#" },
  ];

  return (
    <main className="max-w-2xl mx-auto px-4 lg:px-8 py-6 md:py-12 pb-28 min-h-screen">
      <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">Profil Saya</h1>

      {/* Profile Header Card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-6 flex items-center gap-5 relative overflow-hidden">
        {/* Background accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-dark/5 rounded-full -translate-y-1/2 translate-x-1/3"></div>

        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gray-200 border-4 border-white shadow-md shrink-0 overflow-hidden relative z-10">
          <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop" alt="Profile Avatar" className="w-full h-full object-cover" />
        </div>

        <div className="relative z-10">
          <h2 className="font-bold text-gray-900 text-lg md:text-xl mb-1">Amanda Sari</h2>
          <p className="text-sm text-gray-500 mb-2">amanda.sari@email.com</p>
          <span className="inline-flex items-center bg-primary-dark/10 text-primary-dark px-3 py-1 rounded-full text-xs font-bold">
            Member Aktif
          </span>
        </div>
      </div>

      {/* Menu List */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mb-6">
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
                <div className="w-10 h-10 rounded-full bg-neutral-50 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-primary-dark" />
                </div>
                <span className="font-medium text-gray-800">{item.label}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>
          );
        })}
      </div>

      {/* Logout Button */}
      <Button variant="custom" className="w-full h-14 rounded-2xl bg-white border border-red-200 text-red-600 hover:bg-red-50 font-bold transition-colors flex items-center justify-center gap-2">
        <LogOut className="w-5 h-5" />
        Keluar Akun
      </Button>

    </main>
  );
}
