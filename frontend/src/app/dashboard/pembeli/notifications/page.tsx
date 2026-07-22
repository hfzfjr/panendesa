"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Bell, CheckCircle2, Truck, Info, Store } from "lucide-react";

export default function NotificationsPage() {
  const notifications = [
    {
      id: 1,
      type: "success",
      title: "Pesanan Selesai",
      desc: "Pesanan #AGR-2024-99280 telah selesai. Terima kasih telah berbelanja!",
      time: "2 Jam yang lalu",
      read: false
    },
    {
      id: 2,
      type: "delivery",
      title: "Pesanan Dikirim",
      desc: "Pesanan #AGR-2024-99281 sedang dalam perjalanan menuju lokasi Anda.",
      time: "Hari ini, 10:00",
      read: false
    },
    {
      id: 3,
      type: "info",
      title: "Promo Spesial",
      desc: "Dapatkan potongan harga hingga 20% untuk komoditas sayuran hijau hari ini!",
      time: "Kemarin",
      read: true
    },
    {
      id: 4,
      type: "store",
      title: "Kopdes Tani Makmur",
      desc: "Stok Cabai Merah Keriting baru saja ditambah. Cek sekarang sebelum kehabisan!",
      time: "20 Mei 2024",
      read: true
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "success": return <CheckCircle2 className="w-6 h-6 text-green-600" />;
      case "delivery": return <Truck className="w-6 h-6 text-blue-600" />;
      case "info": return <Info className="w-6 h-6 text-amber-600" />;
      case "store": return <Store className="w-6 h-6 text-purple-600" />;
      default: return <Bell className="w-6 h-6 text-gray-600" />;
    }
  };

  const getBgColor = (type: string) => {
    switch (type) {
      case "success": return "bg-green-100";
      case "delivery": return "bg-blue-100";
      case "info": return "bg-amber-100";
      case "store": return "bg-purple-100";
      default: return "bg-gray-100";
    }
  };

  return (
    <main className="max-w-3xl mx-auto px-4 lg:px-8 py-6 md:py-12 pb-28 min-h-screen">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link href="/dashboard/pembeli" className="p-2 hover:bg-gray-100 rounded-full transition-colors -ml-2">
            <ArrowLeft className="w-6 h-6 text-gray-800" />
          </Link>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">Notifikasi</h1>
        </div>
        <button className="text-[#1B5E20] font-bold text-sm hover:underline">
          Tandai semua dibaca
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        {notifications.map((notif, index) => (
          <div 
            key={notif.id} 
            className={`p-4 md:p-6 flex items-start gap-4 transition-colors hover:bg-gray-50 cursor-pointer ${
              !notif.read ? "bg-green-50/30" : ""
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
                <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                  {notif.time}
                </span>
              </div>
              <p className={`text-sm ${!notif.read ? "text-gray-800 font-medium" : "text-gray-500"} line-clamp-2`}>
                {notif.desc}
              </p>
            </div>
            
            {!notif.read && (
              <div className="w-2 h-2 rounded-full bg-red-500 mt-2 shrink-0"></div>
            )}
          </div>
        ))}
      </div>

    </main>
  );
}
