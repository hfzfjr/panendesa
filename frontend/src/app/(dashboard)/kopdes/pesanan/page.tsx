"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ShoppingBag, 
  ClipboardList, 
  Truck, 
  CheckCircle2, 
  Calendar,
  Filter,
  Eye,
  Package
} from "lucide-react";

export default function KopdesPesananPage() {
  const [activeTab, setActiveTab] = useState("Semua");

  const tabs = ["Semua", "Menunggu Harga", "Siap Kirim", "Selesai"];

  const orders = [
    {
      id: "#ORD-281",
      date: { month: "MEI", day: "24" },
      status: "MENUNGGU HARGA",
      buyer: "PT Pangan Lestari Nusantara",
      product: "Padi Giling Kualitas A",
      weight: "2,500 Kg",
      buttonText: "Konfirmasi Harga",
      buttonColor: "bg-[#205C3B] hover:bg-[#15462a] text-white",
      link: "/kopdes/pesanan/detail"
    },
    {
      id: "#ORD-279",
      date: { month: "MEI", day: "22" },
      status: "SIAP KIRIM",
      buyer: "CV Makmur Berjaya",
      product: "Jagung Pipil Kering",
      weight: "5,000 Kg",
      buttonText: "Proses Pengiriman",
      buttonColor: "bg-[#205C3B] hover:bg-[#15462a] text-white",
      link: "#"
    },
    {
      id: "#ORD-275",
      date: { month: "MEI", day: "20" },
      status: "SELESAI",
      buyer: "Katering Bunda Sejahtera",
      product: "Beras Merah Organik",
      weight: "500 Kg",
      buttonText: "Lihat Invoice",
      buttonColor: "bg-gray-200 hover:bg-gray-300 text-gray-700",
      link: "#"
    },
    {
      id: "#ORD-270",
      date: { month: "MEI", day: "18" },
      status: "SELESAI",
      buyer: "Grosir Sembako Utama",
      product: "Kacang Kedelai",
      weight: "1,200 Kg",
      buttonText: "Lihat Invoice",
      buttonColor: "bg-gray-200 hover:bg-gray-300 text-gray-700",
      link: "#"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "MENUNGGU HARGA": return "bg-[#F5B041] text-white";
      case "SIAP KIRIM": return "bg-[#A9DFBF] text-[#196F3D]";
      case "SELESAI": return "bg-gray-200 text-gray-700";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 md:space-y-8 pb-32 md:pb-8 min-h-screen">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-primary-dark tracking-tight mb-1">
          Daftar Pesanan
        </h1>
        <p className="text-gray-500 font-medium text-sm md:text-base">
          Kelola seluruh permintaan dan pengiriman komoditas desa.
        </p>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {/* Total Order */}
        <div className="bg-white rounded-2xl p-5 border-y border-r border-gray-100 border-l-[6px] border-l-[#117A3E] shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center shrink-0">
            <ShoppingBag className="w-6 h-6 text-gray-500" />
          </div>
          <div>
            <p className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Total Order</p>
            <p className="text-2xl md:text-3xl font-black text-gray-900 leading-none">1,284</p>
          </div>
        </div>

        {/* Aktif */}
        <div className="bg-white rounded-2xl p-5 border-y border-r border-gray-100 border-l-[6px] border-l-[#D4AC0D] shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
            <ClipboardList className="w-6 h-6 text-[#D4AC0D]" />
          </div>
          <div>
            <p className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Aktif</p>
            <p className="text-2xl md:text-3xl font-black text-gray-900 leading-none">42</p>
          </div>
        </div>

        {/* Siap Kirim */}
        <div className="bg-white rounded-2xl p-5 border-y border-r border-gray-100 border-l-[6px] border-l-[#A9DFBF] shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center shrink-0">
            <Truck className="w-6 h-6 text-[#196F3D]" />
          </div>
          <div>
            <p className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Siap Kirim</p>
            <p className="text-2xl md:text-3xl font-black text-gray-900 leading-none">18</p>
          </div>
        </div>

        {/* Selesai */}
        <div className="bg-white rounded-2xl p-5 border-y border-r border-gray-100 border-l-[6px] border-l-[#2ECC71] shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6 text-[#2ECC71]" />
          </div>
          <div>
            <p className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Selesai</p>
            <p className="text-2xl md:text-3xl font-black text-gray-900 leading-none">1,224</p>
          </div>
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
                  ? 'bg-[#205C3B] text-white shadow-sm' 
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Right Filters */}
        <div className="flex items-center gap-3 px-2 pb-2 md:pb-0 md:px-4 shrink-0">
          <button className="flex items-center gap-2 bg-gray-100 text-gray-600 px-4 py-2 rounded-full text-sm font-bold hover:bg-gray-200 transition-colors">
            <Calendar className="w-4 h-4" />
            7 Hari Terakhir
          </button>
          <button className="text-gray-500 hover:text-gray-900 p-2 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Order List */}
      <div className="space-y-4">
        {orders.map((order, idx) => (
          <div key={idx} className="bg-white rounded-2xl border border-gray-200 p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row items-start md:items-center gap-5 md:gap-6 relative overflow-hidden">
            
            {/* Left Date Circle */}
            <div className="hidden md:flex flex-col items-center justify-center w-16 h-16 rounded-full bg-gray-50 border border-gray-100 shrink-0">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{order.date.month}</span>
              <span className="text-xl font-black text-gray-900">{order.date.day}</span>
            </div>

            {/* Mobile Date & ID row */}
            <div className="flex md:hidden items-center justify-between w-full">
              <div className="flex items-center gap-3">
                <div className="flex flex-col items-center justify-center w-12 h-12 rounded-full bg-gray-50 border border-gray-100 shrink-0">
                  <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">{order.date.month}</span>
                  <span className="text-base font-black text-gray-900">{order.date.day}</span>
                </div>
                <div className="font-bold text-gray-900">{order.id}</div>
              </div>
              <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${getStatusBadge(order.status)}`}>
                {order.status}
              </span>
            </div>

            {/* Middle Content */}
            <div className="flex-1 space-y-2">
              <div className="hidden md:flex items-center gap-3 mb-1">
                <span className="font-bold text-gray-900 text-lg">{order.id}</span>
                <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${getStatusBadge(order.status)}`}>
                  {order.status}
                </span>
              </div>
              
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                {order.buyer}
              </h2>
              
              <div className="flex items-center gap-2 text-gray-500 text-sm md:text-base font-medium">
                <Package className="w-4 h-4 shrink-0" />
                <span>{order.product} • {order.weight}</span>
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center justify-end w-full md:w-auto gap-3 pt-4 md:pt-0 border-t border-gray-100 md:border-0 mt-2 md:mt-0">
              <button className="hidden md:flex w-10 h-10 rounded-full border border-gray-200 items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors shrink-0">
                <Eye className="w-5 h-5" />
              </button>
              
              <Link 
                href={order.link}
                className={`w-full md:w-auto text-center font-bold px-6 py-3 md:py-2.5 rounded-xl transition-colors shadow-sm flex items-center justify-center ${order.buttonColor}`}
              >
                {order.buttonText}
              </Link>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
