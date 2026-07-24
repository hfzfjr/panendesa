"use client";

import React from "react";
import { 
  Download, 
  Users, 
  Building2, 
  ShoppingCart, 
  PackageSearch,
  AlertTriangle,
  Clock,
  TrendingDown,
  ArrowRight,
  MoreHorizontal,
  CircleDot,
  BarChart4
} from "lucide-react";

export default function AdminDashboardPage() {
  const stats = [
    { label: "TOTAL PETANI", value: "120", suffix: "orang", trend: "+5 minggu", icon: Users },
    { label: "KOPDES AKTIF", value: "15", suffix: "desa", trend: "+2 minggu", icon: Building2 },
    { label: "BUYER TERDAFTAR", value: "8", suffix: "buyer", trend: "+1 minggu", icon: ShoppingCart },
    { label: "TOTAL ORDER", value: "45", suffix: "order", trend: "+10 minggu", icon: PackageSearch },
  ];

  const alerts = [
    {
      type: "critical",
      title: "Kejanggalan terdeteksi",
      time: "Baru saja",
      desc: "Lonjakan harga input komoditas Cabai di Desa Sukamaju tidak wajar.",
      action: "Investigasi",
      icon: AlertTriangle,
      iconBg: "bg-red-50 text-red-500"
    },
    {
      type: "warning",
      title: "Order menunggu >3 hari",
      time: "2 jam lalu",
      desc: "Order #005 (500kg Jagung) belum dikonfirmasi oleh Kopdes terkait.",
      action: "Hubungi Kopdes",
      icon: Clock,
      iconBg: "bg-orange-50 text-orange-500"
    },
    {
      type: "info",
      title: "Trust Score turun",
      time: "Kemarin",
      desc: "Desa Bina Jaya mengalami penurunan skor dari 87 ke 78 poin.",
      action: "Lihat Analitik",
      icon: TrendingDown,
      iconBg: "bg-gray-200 text-gray-500"
    }
  ];

  const activities = [
    { title: "Perubahan Harga Cabai", sub: "Oleh: Admin Taufik", status: "SUKSES", time: "15 Menit Lalu" },
    { title: "Pendaftaran Kopdes Baru", sub: "Desa Makmur Jaya", status: "PENDING", time: "1 Jam Lalu" },
    { title: "Pencairan Dana #TRX992", sub: "Rp 12.500.000", status: "SUKSES", time: "3 Jam Lalu" },
    { title: "Buyer Bergabung", sub: "PT. Pangan Nusantara", status: "SUKSES", time: "Kemarin" },
  ];

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 md:space-y-8 pb-32 md:pb-8 min-h-screen">
      
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-primary-dark tracking-tight mb-1">
            Selamat Datang, Admin.
          </h1>
          <p className="text-gray-600 font-medium text-sm md:text-base">
            Kelola seluruh permintaan dan pengiriman komoditas desa.
          </p>
        </div>
        <button className="flex items-center justify-center gap-2 bg-primary-dark hover:bg-green-800 text-white font-bold px-5 py-2.5 rounded-xl transition-colors shadow-sm text-sm w-full md:w-auto">
          <Download className="w-4 h-4" />
          Unduh Rekap Bulanan
        </button>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm flex flex-col justify-between">
              <div className="flex justify-between items-start mb-6">
                <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary-dark" />
                </div>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                  {stat.trend}
                </span>
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">{stat.label}</p>
                <p className="text-3xl font-black text-gray-900 leading-none">
                  {stat.value} <span className="text-sm font-medium text-gray-500 ml-1">{stat.suffix}</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        
        {/* Left Column: Perlu Perhatian */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col h-[400px]">
          <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <h2 className="font-bold text-lg text-gray-900">Perlu Perhatian</h2>
            <span className="bg-red-600 text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
              3 ALERTS
            </span>
          </div>
          <div className="flex-1 overflow-y-auto">
            {alerts.map((alert, idx) => {
              const Icon = alert.icon;
              return (
                <div key={idx} className="p-5 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${alert.iconBg}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className={`font-bold text-sm ${alert.type === 'critical' ? 'text-red-600' : 'text-gray-900'}`}>
                          {alert.title}
                        </h3>
                        <span className="text-[10px] font-bold text-gray-400">{alert.time}</span>
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed mb-3 pr-4">
                        {alert.desc}
                      </p>
                      <button className={`text-xs font-bold flex items-center gap-1 hover:underline ${
                        alert.type === 'critical' ? 'text-primary-dark' : 
                        alert.type === 'warning' ? 'text-primary-dark' : 'text-primary-dark'
                      }`}>
                        {alert.action}
                        {alert.type === 'critical' && <ArrowRight className="w-3 h-3" />}
                        {alert.type === 'warning' && <span className="ml-0.5 border border-current rounded-[2px] w-3 h-3 flex items-center justify-center">-</span>}
                        {alert.type === 'info' && <BarChart4 className="w-3 h-3" />}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Aktivitas Terbaru */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col h-[400px]">
          <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <h2 className="font-bold text-lg text-gray-900">Aktivitas Terbaru</h2>
            <button className="text-xs font-bold text-primary-dark hover:underline">
              Lihat Semua
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 px-5 py-3 border-b border-gray-100 bg-gray-50/50 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
              <div className="col-span-6 md:col-span-5">AKTIVITAS</div>
              <div className="col-span-3 hidden md:block">STATUS</div>
              <div className="col-span-4 md:col-span-3 text-right md:text-left">WAKTU</div>
              <div className="col-span-2 md:col-span-1 text-right">AKSI</div>
            </div>

            {/* List */}
            {activities.map((act, idx) => (
              <div key={idx} className="grid grid-cols-12 gap-4 px-5 py-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors items-center">
                <div className="col-span-8 md:col-span-5 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                    <CircleDot className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="truncate">
                    <h3 className="font-bold text-sm text-gray-900 truncate">{act.title}</h3>
                    <p className="text-xs text-gray-500 truncate">{act.sub}</p>
                  </div>
                </div>
                <div className="col-span-3 hidden md:block">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider ${
                    act.status === 'SUKSES' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                  }`}>
                    {act.status}
                  </span>
                </div>
                <div className="col-span-4 md:col-span-3 text-xs font-medium text-gray-500 text-right md:text-left">
                  {act.time}
                </div>
                <div className="col-span-2 md:col-span-1 flex justify-end">
                  <button className="p-1 hover:bg-gray-200 rounded text-gray-400 hover:text-gray-700 transition-colors">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>

      {/* Bottom Section: Peta */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <h2 className="font-bold text-lg text-gray-900">Geografi Sebaran Kopdes</h2>
          <div className="flex items-center gap-4 text-xs font-bold text-gray-600">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-primary-dark"></div>
              Aktif
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-amber-800"></div>
              Dalam Review
            </div>
          </div>
        </div>
        
        <div className="w-full h-[300px] bg-gray-200 rounded-xl relative overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 opacity-40 mix-blend-multiply" style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200&auto=format&fit=crop')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "grayscale(100%)"
          }}></div>
          
          <div className="relative z-10 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full font-bold text-gray-700 shadow-sm border border-gray-200">
            Peta Interaktif Sedang Dimuat...
          </div>
        </div>
      </div>

    </div>
  );
}
