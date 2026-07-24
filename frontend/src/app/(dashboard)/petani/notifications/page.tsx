"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Bell, CheckCircle2, Truck, Info, Sprout, ChevronRight } from "lucide-react";

export default function PetaniNotificationsPage() {
  const notifications = [
    {
      id: 1,
      type: "success",
      title: "Pesanan Selesai",
      desc: "Pesanan #AGR-2024-99280 telah selesai. Uang telah masuk ke Buku Tabungan Anda.",
      time: "2 Jam yang lalu",
      read: false
    },
    {
      id: 2,
      type: "delivery",
      title: "Jadwal Penjemputan",
      desc: "Truk Kopdes akan menjemput hasil panen Cabai Merah Anda esok hari pukul 08:00.",
      time: "Hari ini, 10:00",
      read: false
    },
    {
      id: 3,
      type: "info",
      title: "Peringatan Laporan",
      desc: "Laporan pertumbuhan Cabai Merah Anda tertunda 2 hari. Segera laporkan agar skor Anda tidak turun.",
      time: "Kemarin",
      read: true
    },
    {
      id: 4,
      type: "sprout",
      title: "Tips Tanam Cerdas",
      desc: "Musim hujan akan tiba. Pastikan drainase sawah Blok C Anda berfungsi dengan baik.",
      time: "20 Mei 2026",
      read: true
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "success": return <CheckCircle2 className="w-6 h-6 text-green-600" />;
      case "delivery": return <Truck className="w-6 h-6 text-blue-600" />;
      case "info": return <Info className="w-6 h-6 text-amber-600" />;
      case "sprout": return <Sprout className="w-6 h-6 text-primary-dark" />;
      default: return <Bell className="w-6 h-6 text-gray-600" />;
    }
  };

  const getBgColor = (type: string) => {
    switch (type) {
      case "success": return "bg-green-100";
      case "delivery": return "bg-blue-100";
      case "info": return "bg-amber-100";
      case "sprout": return "bg-primary-dark/10";
      default: return "bg-gray-100";
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto space-y-6 pb-32 md:pb-8 min-h-screen">

      {/* Header */}
      <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4 pt-2">
        <div className="flex items-center gap-4">
          <Link href="/petani" className="w-10 h-10 bg-white border border-gray-200 rounded-md flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500 font-medium mb-1">
              <Link href="/petani" className="hover:text-primary-dark">Halaman Utama</Link>
              <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
              <span className="text-gray-900 font-bold">Notifikasi</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-primary-dark tracking-tight">
              NOTIFIKASI
            </h1>
          </div>
        </div>
        <button className="text-primary-dark font-bold text-sm hover:underline hidden md:block">
          Tandai semua dibaca
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        {notifications.map((notif, index) => (
          <div
            key={notif.id}
            className={`p-4 md:p-6 flex items-start gap-4 transition-colors hover:bg-gray-50 cursor-pointer ${!notif.read ? "bg-green-50/30" : ""
              } ${index !== notifications.length - 1 ? "border-b border-gray-100" : ""}`}
          >
            <div className={`w-12 h-12 rounded-full shrink-0 flex items-center justify-center ${getBgColor(notif.type)}`}>
              {getIcon(notif.type)}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start mb-1">
                <h3 className={`font-bold text-base ${!notif.read ? "text-gray-900" : "text-gray-700"}`}>
                  {notif.title}
                </h3>
                <span className="text-xs text-gray-500 whitespace-nowrap ml-2 mt-1">
                  {notif.time}
                </span>
              </div>
              <p className={`text-sm ${!notif.read ? "text-gray-800 font-medium" : "text-gray-500"}`}>
                {notif.desc}
              </p>
            </div>

            {!notif.read && (
              <div className="w-2 h-2 rounded-full bg-red-500 mt-2 shrink-0"></div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
}
