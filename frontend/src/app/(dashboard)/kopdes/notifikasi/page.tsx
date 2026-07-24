"use client";

import React from "react";
import { 
  Bell, 
  Package, 
  Wallet, 
  AlertTriangle,
  CheckCircle2,
  Clock
} from "lucide-react";

export default function KopdesNotifikasiPage() {
  const notifications = [
    {
      id: 1,
      type: "order",
      icon: Package,
      title: "Pesanan Baru Diterima",
      message: "PT Agromart Nusantara memesan 2.500 Kg Padi Giling. Segera periksa dan konfirmasi harga.",
      time: "10 menit yang lalu",
      isUnread: true,
      color: "bg-blue-100 text-blue-600"
    },
    {
      id: 2,
      type: "alert",
      icon: AlertTriangle,
      title: "Peringatan Stok Rendah",
      message: "Stok Cabai Merah saat ini tersisa kurang dari 500 Kg. Harap segera jadwalkan intake dari petani.",
      time: "1 jam yang lalu",
      isUnread: true,
      color: "bg-red-100 text-red-600"
    },
    {
      id: 3,
      type: "finance",
      icon: Wallet,
      title: "Pencairan Smart Split Berhasil",
      message: "Dana sebesar Rp 25.000.000 telah otomatis didistribusikan ke 3 rekening petani (Bpk. Budi, Ibu Siti, Bpk. Andi).",
      time: "2 jam yang lalu",
      isUnread: false,
      color: "bg-green-100 text-[#117A3E]"
    },
    {
      id: 4,
      type: "success",
      icon: CheckCircle2,
      title: "Pengiriman Selesai",
      message: "Armada B 9182 KJA telah sampai di lokasi tujuan (CV Makmur Berjaya) dan pembongkaran selesai dilakukan.",
      time: "Kemarin, 14:30 WIB",
      isUnread: false,
      color: "bg-gray-100 text-gray-600"
    }
  ];

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6 md:space-y-8 pb-32 md:pb-8 min-h-screen">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-primary-dark tracking-tight mb-1 flex items-center gap-3">
            <Bell className="w-6 h-6 md:w-8 md:h-8" />
            Pusat Notifikasi
          </h1>
          <p className="text-gray-500 font-medium text-sm md:text-base">
            Pantau semua aktivitas dan pembaruan penting sistem.
          </p>
        </div>
        <button className="text-sm font-bold text-primary-dark hover:underline bg-gray-50 px-4 py-2 rounded-lg">
          Tandai semua dibaca
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="divide-y divide-gray-100">
          
          {notifications.map((notif) => {
            const Icon = notif.icon;
            return (
              <div key={notif.id} className={`p-5 md:p-6 flex items-start gap-4 transition-colors hover:bg-gray-50 ${notif.isUnread ? 'bg-green-50/30' : ''}`}>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${notif.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                
                <div className="flex-1 space-y-1">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-1">
                    <h3 className={`font-bold text-base ${notif.isUnread ? 'text-gray-900' : 'text-gray-700'}`}>
                      {notif.title}
                    </h3>
                    <span className="text-xs font-medium text-gray-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {notif.time}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {notif.message}
                  </p>
                </div>

                {notif.isUnread && (
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500 shrink-0 mt-2"></div>
                )}
              </div>
            );
          })}

        </div>

        {/* Load More */}
        <div className="p-4 border-t border-gray-100 bg-gray-50 text-center">
          <button className="text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors">
            Muat Notifikasi Terdahulu
          </button>
        </div>
      </div>

    </div>
  );
}
