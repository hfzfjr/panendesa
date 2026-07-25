"use client";

import React, { useState, useEffect } from "react";
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
import { authStorage } from "@/lib/auth";
import { apiClient } from "@/lib/api-client";
import { ErrorState } from "@/components/ui/ErrorState";

interface Order {
  id: number;
  pembeli_id: number;
  komoditas_id: number;
  jumlah_diminta_kg: number;
  desa_id_prioritas: number;
  status: string;
  harga_final_per_kg?: number;
  harga_terkunci: boolean;
  fee_kopdes_persen_terpakai?: number;
  created_at: string;
  pembeli_nama?: string;
  komoditas_nama?: string;
}

export default function KopdesPesananPage() {
  const [activeTab, setActiveTab] = useState("Semua");
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<{ code?: number; message?: string } | null>(null);

  const tabs = ["Semua", "Menunggu Harga", "Siap Kirim", "Selesai"];

  useEffect(() => {
    const fetchOrders = async () => {
      const user = authStorage.getUser();
      if (!user?.kopdes_id) {
        setError({ code: 403, message: 'Kopdes Anda belum terdaftar. Hubungi admin untuk pendaftaran.' });
        setIsLoading(false);
        return;
      }

      try {
        const response = await apiClient.getOrdersByKopdes(user.kopdes_id);
        if (response.success && response.data) {
          setOrders(response.data);
        } else {
          setError({ message: response.error || 'Gagal mengambil data pesanan' });
        }
      } catch (err) {
        setError({ message: 'Terjadi kesalahan koneksi' });
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "dikonfirmasi_sementara": return "bg-accent text-neutral-900";
      case "siap_kirim": return "bg-success text-white";
      case "selesai": return "bg-gray-200 text-gray-700";
      case "dibatalkan": return "bg-danger text-white";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "dikonfirmasi_sementara": return "Menunggu Harga";
      case "siap_kirim": return "Siap Kirim";
      case "selesai": return "Selesai";
      case "dibatalkan": return "Dibatalkan";
      default: return status;
    }
  };

  const filterOrders = (status: string) => {
    if (status === "Semua") return orders;
    const statusMap: Record<string, string> = {
      "Menunggu Harga": "dikonfirmasi_sementara",
      "Siap Kirim": "siap_kirim",
      "Selesai": "selesai"
    };
    return orders.filter(order => order.status === statusMap[status]);
  };

  const filteredOrders = filterOrders(activeTab);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MEI', 'JUN', 'JUL', 'AGU', 'SEP', 'OKT', 'NOV', 'DES'];
    return {
      month: months[date.getMonth()],
      day: date.getDate().toString()
    };
  };

  if (isLoading) {
    return (
      <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 md:space-y-8">
        <div className="h-8 bg-gray-200 rounded animate-pulse w-64" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-2xl p-5 h-24 animate-pulse" />
          ))}
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-2xl p-5 h-32 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 md:p-8 max-w-7xl mx-auto">
        <ErrorState code={error.code} message={error.message} onRetry={() => window.location.reload()} />
      </div>
    );
  }

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
        <div className="bg-white rounded-2xl p-5 border-y border-r border-gray-100 border-l-[6px] border-l-primary shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center shrink-0">
            <ShoppingBag className="w-6 h-6 text-gray-500" />
          </div>
          <div>
            <p className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Total Order</p>
            <p className="text-2xl md:text-3xl font-black text-gray-900 leading-none">{orders.length}</p>
          </div>
        </div>

        {/* Aktif */}
        <div className="bg-white rounded-2xl p-5 border-y border-r border-gray-100 border-l-[6px] border-l-accent shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
            <ClipboardList className="w-6 h-6 text-accent" />
          </div>
          <div>
            <p className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Aktif</p>
            <p className="text-2xl md:text-3xl font-black text-gray-900 leading-none">{orders.filter(o => o.status === 'dikonfirmasi_sementara').length}</p>
          </div>
        </div>

        {/* Siap Kirim */}
        <div className="bg-white rounded-2xl p-5 border-y border-r border-gray-100 border-l-[6px] border-l-success shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center shrink-0">
            <Truck className="w-6 h-6 text-success" />
          </div>
          <div>
            <p className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Siap Kirim</p>
            <p className="text-2xl md:text-3xl font-black text-gray-900 leading-none">{orders.filter(o => o.status === 'siap_kirim').length}</p>
          </div>
        </div>

        {/* Selesai */}
        <div className="bg-white rounded-2xl p-5 border-y border-r border-gray-100 border-l-[6px] border-l-success shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6 text-success" />
          </div>
          <div>
            <p className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Selesai</p>
            <p className="text-2xl md:text-3xl font-black text-gray-900 leading-none">{orders.filter(o => o.status === 'selesai').length}</p>
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
              className={`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${activeTab === tab
                ? 'bg-primary text-white shadow-sm'
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
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center text-gray-500">
            Belum ada data pesanan
          </div>
        ) : (
          filteredOrders.map((order) => {
            const date = formatDate(order.created_at);
            const statusLabel = getStatusLabel(order.status);
            const buttonText = order.status === 'dikonfirmasi_sementara' ? 'Konfirmasi Harga' :
              order.status === 'siap_kirim' ? 'Proses Pengiriman' :
                order.status === 'selesai' ? 'Lihat Invoice' : 'Lihat Detail';
            const buttonColor = order.status === 'dikonfirmasi_sementara' || order.status === 'siap_kirim'
              ? 'bg-primary hover:bg-primary-dark text-white'
              : 'bg-gray-200 hover:bg-gray-300 text-gray-700';

            return (
              <div key={order.id} className="bg-white rounded-2xl border border-gray-200 p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row items-start md:items-center gap-5 md:gap-6 relative overflow-hidden">

                {/* Left Date Circle */}
                <div className="hidden md:flex flex-col items-center justify-center w-16 h-16 rounded-full bg-gray-50 border border-gray-100 shrink-0">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{date.month}</span>
                  <span className="text-xl font-black text-gray-900">{date.day}</span>
                </div>

                {/* Mobile Date & ID row */}
                <div className="flex md:hidden items-center justify-between w-full">
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col items-center justify-center w-12 h-12 rounded-full bg-gray-50 border border-gray-100 shrink-0">
                      <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">{date.month}</span>
                      <span className="text-base font-black text-gray-900">{date.day}</span>
                    </div>
                    <div className="font-bold text-gray-900">#{order.id}</div>
                  </div>
                  <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${getStatusBadge(order.status)}`}>
                    {statusLabel}
                  </span>
                </div>

                {/* Middle Content */}
                <div className="flex-1 space-y-2">
                  <div className="hidden md:flex items-center gap-3 mb-1">
                    <span className="font-bold text-gray-900 text-lg">#{order.id}</span>
                    <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${getStatusBadge(order.status)}`}>
                      {statusLabel}
                    </span>
                  </div>

                  <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                    {order.pembeli_nama || 'Pembeli tidak diketahui'}
                  </h2>

                  <div className="flex items-center gap-2 text-gray-500 text-sm md:text-base font-medium">
                    <Package className="w-4 h-4 shrink-0" />
                    <span>{order.komoditas_nama || `Komoditas #${order.komoditas_id}`} • {order.jumlah_diminta_kg.toLocaleString('id-ID')} Kg</span>
                  </div>
                </div>

                {/* Right Actions */}
                <div className="flex items-center justify-end w-full md:w-auto gap-3 pt-4 md:pt-0 border-t border-gray-100 md:border-0 mt-2 md:mt-0">
                  <button className="hidden md:flex w-10 h-10 rounded-full border border-gray-200 items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors shrink-0">
                    <Eye className="w-5 h-5" />
                  </button>

                  <Link
                    href={`/kopdes/pesanan/detail/${order.id}`}
                    className={`w-full md:w-auto text-center font-bold px-6 py-3 md:py-2.5 rounded-xl transition-colors shadow-sm flex items-center justify-center ${buttonColor}`}
                  >
                    {buttonText}
                  </Link>
                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
}
