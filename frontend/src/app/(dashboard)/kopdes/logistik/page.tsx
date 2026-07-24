"use client";

import React from "react";
import { 
  Truck, 
  MapPin, 
  Navigation, 
  PackageCheck,
  Phone,
  Search,
  Filter
} from "lucide-react";

export default function KopdesLogistikPage() {
  const deliveries = [
    {
      id: "TRX-8291",
      driver: "Budi Santoso",
      plate: "B 9182 KJA",
      destination: "PT. Agromart Nusantara (Jakarta Selatan)",
      items: "2.500 Kg Padi Giling",
      status: "Dalam Perjalanan",
      statusColor: "bg-blue-100 text-blue-700",
      eta: "14:30 WIB"
    },
    {
      id: "TRX-8292",
      driver: "Anton Wijaya",
      plate: "D 1244 XZ",
      destination: "CV Makmur Berjaya (Bandung)",
      items: "5.000 Kg Jagung Pipil",
      status: "Menunggu Muat",
      statusColor: "bg-orange-100 text-orange-700",
      eta: "-"
    },
    {
      id: "TRX-8288",
      driver: "Hendra",
      plate: "B 7731 QA",
      destination: "Katering Bunda Sejahtera (Depok)",
      items: "500 Kg Beras Merah",
      status: "Tiba di Tujuan",
      statusColor: "bg-green-100 text-green-700",
      eta: "Terkirim 09:15 WIB"
    }
  ];

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 md:space-y-8 pb-32 md:pb-8 min-h-screen">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-primary-dark tracking-tight mb-1">
          Logistik & Pengiriman
        </h1>
        <p className="text-gray-500 font-medium text-sm md:text-base">
          Pantau pergerakan armada dan kelancaran distribusi ke pembeli.
        </p>
      </div>

      {/* 3 Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
            <Truck className="w-6 h-6 text-gray-600" />
          </div>
          <div>
            <p className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Armada Tersedia</p>
            <p className="text-2xl md:text-3xl font-black text-gray-900 leading-none">2<span className="text-sm text-gray-400 font-medium ml-1">/ 5 Kendaraan</span></p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center gap-4 border-b-[4px] border-b-blue-500">
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
            <Navigation className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <p className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Dalam Perjalanan</p>
            <p className="text-2xl md:text-3xl font-black text-gray-900 leading-none">3<span className="text-sm text-gray-400 font-medium ml-1">Tujuan</span></p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center gap-4 border-b-[4px] border-b-[#117A3E]">
          <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center shrink-0">
            <PackageCheck className="w-6 h-6 text-[#117A3E]" />
          </div>
          <div>
            <p className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Terkirim Hari Ini</p>
            <p className="text-2xl md:text-3xl font-black text-gray-900 leading-none">12<span className="text-sm text-gray-400 font-medium ml-1">Tujuan</span></p>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl border border-gray-200 p-3 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Cari ID pengiriman, sopir, atau tujuan..." 
            className="w-full bg-gray-100 border-transparent focus:border-primary-dark focus:bg-white focus:ring-0 rounded-xl pl-10 pr-4 py-2.5 text-sm font-medium transition-colors"
          />
        </div>
        <button className="flex items-center justify-center gap-2 text-gray-600 bg-gray-100 hover:bg-gray-200 font-bold px-5 py-2.5 rounded-xl transition-colors text-sm w-full md:w-auto">
          <Filter className="w-4 h-4" />
          Filter Status
        </button>
      </div>

      {/* Delivery List */}
      <div className="space-y-4">
        {deliveries.map((delivery, idx) => (
          <div key={idx} className="bg-white rounded-2xl border border-gray-200 p-5 md:p-6 shadow-sm flex flex-col lg:flex-row gap-6 relative overflow-hidden group">
            
            {/* Status Line Indicator */}
            <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${delivery.statusColor.split(' ')[0]}`}></div>

            <div className="flex-1 space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <span className="font-black text-lg text-gray-900">{delivery.id}</span>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${delivery.statusColor}`}>
                    {delivery.status}
                  </span>
                </div>
                {delivery.eta !== "-" && (
                  <div className="text-sm font-bold text-gray-500 bg-gray-50 px-3 py-1 rounded-lg w-fit">
                    ETA / Waktu: <span className="text-gray-900">{delivery.eta}</span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Driver Info */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                    <Truck className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-0.5">Kendaraan & Sopir</p>
                    <p className="font-bold text-gray-900">{delivery.plate}</p>
                    <p className="text-sm text-gray-600 font-medium">{delivery.driver}</p>
                  </div>
                </div>

                {/* Destination Info */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-[#117A3E]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-0.5">Tujuan Pengiriman</p>
                    <p className="font-bold text-gray-900">{delivery.destination}</p>
                    <p className="text-sm text-[#117A3E] font-bold mt-1">{delivery.items}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-row lg:flex-col justify-end gap-2 pt-4 lg:pt-0 border-t border-gray-100 lg:border-0 lg:border-l lg:pl-6 shrink-0 w-full lg:w-48">
              <button className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold px-4 py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm shadow-sm">
                <Phone className="w-4 h-4" />
                Hubungi Sopir
              </button>
              <button className="w-full bg-[#117A3E] hover:bg-[#0c592d] text-white font-bold px-4 py-2.5 rounded-xl transition-colors text-sm shadow-sm">
                Lacak Rute
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
