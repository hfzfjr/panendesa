"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Inbox,
  Filter,
  Search,
  Package,
  Calendar,
  ChevronRight,
  MoreHorizontal
} from "lucide-react";

export default function KopdesPenerimaanPage() {
  const [activeTab, setActiveTab] = useState("Antrean Hari Ini");
  const tabs = ["Antrean Hari Ini", "Sedang Diproses", "Selesai"];

  const incomingIntakes = [
    {
      id: "INT-882",
      name: "Pak Budi",
      commodity: "Cabai Merah",
      estimatedWeight: "150 Kg",
      time: "08:30 WIB",
      status: "Menunggu",
      statusColor: "bg-orange-100 text-orange-700",
      location: "Blok C2",
      buttonText: "Proses Intake",
      buttonColor: "bg-primary-dark hover:bg-green-800 text-white",
      link: "/kopdes/penerimaan/baru"
    },
    {
      id: "INT-883",
      name: "Ibu Siti",
      commodity: "Padi Giling",
      estimatedWeight: "800 Kg",
      time: "09:15 WIB",
      status: "Menunggu",
      statusColor: "bg-orange-100 text-orange-700",
      location: "Blok A1",
      buttonText: "Proses Intake",
      buttonColor: "bg-primary-dark hover:bg-green-800 text-white",
      link: "/kopdes/penerimaan/baru"
    },
    {
      id: "INT-884",
      name: "Pak Jono",
      commodity: "Jagung Pipil",
      estimatedWeight: "450 Kg",
      time: "10:00 WIB",
      status: "Menunggu",
      statusColor: "bg-orange-100 text-orange-700",
      location: "Blok B4",
      buttonText: "Proses Intake",
      buttonColor: "bg-primary-dark hover:bg-green-800 text-white",
      link: "/kopdes/penerimaan/baru"
    }
  ];

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-6 md:space-y-8 pb-32 md:pb-8 min-h-screen">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-primary-dark tracking-tight mb-1">
            Penerimaan & Intake
          </h1>
          <p className="text-gray-500 font-medium text-sm md:text-base">
            Kelola antrean hasil panen petani yang masuk ke gudang hari ini.
          </p>
        </div>
        <div className="bg-primary-light text-primary-dark px-4 py-2 rounded-xl font-bold flex items-center gap-2 w-fit">
          <Calendar className="w-5 h-5" />
          <span>{new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
        </div>
      </div>

      {/* Filter / Tabs */}
      <div className="bg-white rounded-2xl border border-gray-200 p-2 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-2 md:pb-0 hide-scrollbar px-2 pt-2 md:pt-0">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${
                activeTab === tab 
                  ? 'bg-primary-dark text-white shadow-sm' 
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Right Filters */}
        <div className="flex items-center gap-3 px-2 pb-2 md:pb-0 md:px-4 shrink-0">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Cari petani/ID..." 
              className="bg-gray-100 border-transparent focus:border-primary focus:bg-white focus:ring-0 rounded-full pl-9 pr-4 py-2 text-sm font-medium w-full md:w-48 transition-colors"
            />
          </div>
          <button className="text-gray-500 hover:text-gray-900 p-2 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors shrink-0">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Intake List */}
      <div className="space-y-4">
        {incomingIntakes.map((item, idx) => (
          <div key={idx} className="bg-white rounded-2xl border border-gray-200 p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row items-start md:items-center gap-5 relative overflow-hidden">
            
            {/* Left Box (Time & ID) */}
            <div className="flex md:flex-col items-center justify-between md:justify-center w-full md:w-28 md:h-24 rounded-xl bg-gray-50 border border-gray-100 p-3 shrink-0">
              <span className="text-gray-500 font-bold text-sm">{item.time}</span>
              <span className="font-black text-primary-dark text-lg md:mt-1">{item.id}</span>
              <span className={`md:hidden px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${item.statusColor}`}>
                {item.status}
              </span>
            </div>

            {/* Middle Content */}
            <div className="flex-1 space-y-2 w-full">
              <div className="hidden md:flex items-center gap-3 mb-1">
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${item.statusColor}`}>
                  {item.status}
                </span>
              </div>
              
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-2">
                {item.name}
                <span className="text-sm font-medium text-gray-400">({item.location})</span>
              </h2>
              
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-gray-600 text-sm md:text-base font-medium">
                <div className="flex items-center gap-1.5">
                  <Package className="w-4 h-4 text-primary" />
                  {item.commodity}
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                  Estimasi: <span className="font-bold text-gray-900">{item.estimatedWeight}</span>
                </div>
              </div>
            </div>

            {/* Right Action */}
            <div className="flex items-center justify-end w-full md:w-auto pt-4 md:pt-0 border-t border-gray-100 md:border-0 mt-2 md:mt-0">
              <Link 
                href={item.link}
                className={`w-full md:w-auto text-center font-bold px-8 py-3 md:py-2.5 rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2 ${item.buttonColor}`}
              >
                <Inbox className="w-5 h-5" />
                {item.buttonText}
              </Link>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
