"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Filter, Package, Truck, CheckCircle2, MessageCircle } from "lucide-react";
import { Button } from "../../../../components/ui/Button";
import { ErrorState } from "../../../../components/ui/ErrorState";
import { apiClient } from "../../../../lib/api-client";

type OrderStatus = "Semua" | "Diproses" | "Dikirim" | "Selesai";

export default function OrderHistoryPage() {
  const [activeTab, setActiveTab] = useState<OrderStatus>("Semua");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [pembeliId, setPembeliId] = useState<number | null>(null);

  const tabs: OrderStatus[] = ["Semua", "Diproses", "Dikirim", "Selesai"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // First get user data to get pembeli_id
        const userResponse = await apiClient.getMe();
        if (userResponse.success && userResponse.data) {
          setPembeliId(userResponse.data.id);

          // Then fetch orders
          const ordersResponse = await apiClient.getOrdersByPembeli(userResponse.data.id);
          if (ordersResponse.success && ordersResponse.data) {
            setOrders(ordersResponse.data);
          } else {
            setError(ordersResponse.error || 'Gagal mengambil data pesanan');
          }
        } else {
          setError(userResponse.error || 'Gagal mengambil data pengguna');
        }
      } catch (err) {
        setError('Terjadi kesalahan saat mengambil data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredOrders = activeTab === "Semua"
    ? orders
    : orders.filter(o => {
      // Map backend status to frontend tabs
      const statusMap: Record<string, OrderStatus> = {
        'dikonfirmasi_sementara': 'Diproses',
        'siap_kirim': 'Diproses',
        'dikirim': 'Dikirim',
        'selesai': 'Selesai',
        'dibatalkan': 'Selesai',
      };
      return statusMap[o.status] === activeTab;
    });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "dikonfirmasi_sementara":
      case "siap_kirim":
      case "Diproses":
        return <Package className="w-4 h-4 text-amber-600" />;
      case "dikirim":
      case "Dikirim":
        return <Truck className="w-4 h-4 text-blue-600" />;
      case "selesai":
      case "Selesai":
        return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case "dikonfirmasi_sementara":
        return "bg-accent text-neutral-900 border-accent"; // Amber with dark text per design_tokens.md
      case "siap_kirim":
      case "Diproses":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "dikirim":
      case "Dikirim":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "selesai":
      case "Selesai":
        return "bg-success text-white border-success";
      case "dibatalkan":
        return "bg-danger text-white border-danger";
      default: return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getStatusLabel = (status: string) => {
    const labelMap: Record<string, string> = {
      'dikonfirmasi_sementara': 'Dikonfirmasi',
      'siap_kirim': 'Siap Kirim',
      'dikirim': 'Dikirim',
      'selesai': 'Selesai',
      'dibatalkan': 'Dibatalkan',
    };
    return labelMap[status] || status;
  };

  if (loading) {
    return (
      <main className="max-w-4xl mx-auto px-4 lg:px-8 py-6 md:py-12 pb-28 min-h-screen">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-6 w-32"></div>
          <div className="flex gap-2 mb-6">
            <div className="h-10 bg-gray-200 rounded-full w-20"></div>
            <div className="h-10 bg-gray-200 rounded-full w-20"></div>
            <div className="h-10 bg-gray-200 rounded-full w-20"></div>
            <div className="h-10 bg-gray-200 rounded-full w-20"></div>
          </div>
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 h-40"></div>
            <div className="bg-white rounded-2xl border border-gray-200 p-6 h-40"></div>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="max-w-4xl mx-auto px-4 lg:px-8 py-6 md:py-12 pb-28 min-h-screen">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">Daftar Pesanan</h1>
        <ErrorState message={error} onRetry={() => window.location.reload()} />
      </main>
    );
  }

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
                    {getStatusLabel(order.status)}
                  </span>
                  <span className="text-xs text-gray-500 font-medium">{new Date(order.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                </div>
                <span className="text-xs font-bold text-gray-400">#{order.id}</span>
              </div>

              <div className="flex gap-4">
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-200 shrink-0">
                  <img src="https://images.unsplash.com/photo-1526346698789-22fd84314424?q=80&w=150&auto=format&fit=crop" alt="Komoditas" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-gray-900 text-sm md:text-base truncate">Order #{order.id}</h4>
                  <p className="text-xs text-gray-500 mb-1">{order.jumlah_diminta_kg} kg • Kopdes ID: {order.kopdes_id}</p>
                  <p className="font-bold text-primary-dark">{order.harga_final_per_kg ? `Rp ${order.harga_final_per_kg.toLocaleString('id-ID')}/kg` : 'Harga belum ditentukan'}</p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end gap-3">
                {order.status === "selesai" ? (
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
