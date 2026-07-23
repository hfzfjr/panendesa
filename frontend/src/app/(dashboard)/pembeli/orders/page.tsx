"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Filter, Package, Truck, CheckCircle2, MessageCircle } from "lucide-react";
import { Button } from "../../../../components/ui/Button";

type OrderStatus = "Semua" | "Diproses" | "Dikirim" | "Selesai";

export default function OrderHistoryPage() {
  const [activeTab, setActiveTab] = useState<OrderStatus>("Semua");

  const tabs: OrderStatus[] = ["Semua", "Diproses", "Dikirim", "Selesai"];

  const mockOrders = [
    {
      id: "AGR-2024-99282",
      status: "Diproses",
      date: "26 Mei 2024",
      store: "Kopdes Tani Makmur",
      item: "Cabai Merah Keriting (Grade A)",
      qty: "500 kg",
      price: "Rp 12.500.000",
      image: "https://images.unsplash.com/photo-1526346698789-22fd84314424?q=80&w=150&auto=format&fit=crop"
    },
    {
      id: "AGR-2024-99281",
      status: "Dikirim",
      date: "25 Mei 2024",
      store: "Kopdes Makmur Jaya",
      item: "Tomat Ceri Hidroponik",
      qty: "100 kg",
      price: "Rp 2.100.000",
      image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=150&auto=format&fit=crop"
    },
    {
      id: "AGR-2024-99280",
      status: "Selesai",
      date: "20 Mei 2024",
      store: "Kopdes Sumber Rejeki",
      item: "Bawang Merah Super",
      qty: "200 kg",
      price: "Rp 6.000.000",
      image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?q=80&w=150&auto=format&fit=crop"
    }
  ];

  const filteredOrders = activeTab === "Semua"
    ? mockOrders
    : mockOrders.filter(o => o.status === activeTab);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Diproses": return <Package className="w-4 h-4 text-amber-600" />;
      case "Dikirim": return <Truck className="w-4 h-4 text-blue-600" />;
      case "Selesai": return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case "Diproses": return "bg-amber-50 text-amber-700 border-amber-200";
      case "Dikirim": return "bg-blue-50 text-blue-700 border-blue-200";
      case "Selesai": return "bg-green-50 text-green-700 border-green-200";
      default: return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <main className="max-w-4xl mx-auto px-4 lg:px-8 py-6 md:py-12 pb-28 min-h-screen">
      <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">Daftar Pesanan</h1>

      {/* Tabs */}
      <div className="flex overflow-x-auto hide-scrollbar gap-2 mb-6 pb-1">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${activeTab === tab
              ? "bg-(--color-primary-dark) text-white shadow-md"
              : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Order List */}
      <div className="space-y-4">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-2xl border border-gray-200 p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow">

              <div className="flex justify-between items-start mb-4 pb-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${getStatusBg(order.status)}`}>
                    {getStatusIcon(order.status)}
                    {order.status}
                  </span>
                  <span className="text-xs text-gray-500 font-medium">{order.date}</span>
                </div>
                <span className="text-xs font-bold text-gray-400">{order.id}</span>
              </div>

              <div className="flex gap-4">
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-200 shrink-0">
                  <img src={order.image} alt={order.item} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-gray-900 text-sm md:text-base truncate">{order.item}</h4>
                  <p className="text-xs text-gray-500 mb-1">{order.qty} • {order.store}</p>
                  <p className="font-bold text-primary-dark">{order.price}</p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end gap-3">
                {order.status === "Selesai" ? (
                  <>
                    <Button variant="custom" className="px-6 py-2 h-10 rounded-xl bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-bold text-sm transition-colors">
                      Beli Lagi
                    </Button>
                    <Link href={`/pembeli/orders/completed`}>
                      <Button className="px-6 py-2 h-10 rounded-xl bg-(--color-primary-dark) hover:bg-(--color-primary) text-white font-bold text-sm transition-colors">
                        Lihat Detail
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Button variant="custom" className="px-4 py-2 h-10 rounded-xl bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-bold text-sm transition-colors flex items-center gap-2">
                      <MessageCircle className="w-4 h-4" />
                      <span className="hidden sm:inline">Chat Penjual</span>
                      <span className="sm:hidden">Chat</span>
                    </Button>
                    <Link href={`/pembeli/orders/tracking`}>
                      <Button className="px-6 py-2 h-10 rounded-xl bg-(--color-primary-dark) hover:bg-(--color-primary) text-white font-bold text-sm transition-colors">
                        Lacak Pesanan
                      </Button>
                    </Link>
                  </>
                )}
              </div>

            </div>
          ))
        ) : (
          <div className="bg-white rounded-2xl border border-gray-200 p-8 md:p-12 text-center flex flex-col items-center">
            <Package className="w-16 h-16 text-gray-300 mb-4" />
            <h3 className="font-bold text-gray-900 text-lg mb-2">Belum ada pesanan</h3>
            <p className="text-gray-500 text-sm mb-6 max-w-sm">
              Anda belum memiliki pesanan dengan status &quot;{activeTab}&quot;. Yuk, mulai penuhi kebutuhan komoditas Anda!
            </p>
            <Link href="/pembeli/marketplace">
              <Button className="px-8 h-12 rounded-xl bg-(--color-primary-dark) hover:bg-(--color-primary) text-white font-bold transition-colors">
                Mulai Belanja
              </Button>
            </Link>
          </div>
        )}
      </div>

    </main>
  );
}
