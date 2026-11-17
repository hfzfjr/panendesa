"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Download, Calendar, Filter, MapPin, Truck, ChevronLeft, ChevronRight, CheckCircle2, Clock, AlertCircle, RefreshCw, Sprout, Package } from "lucide-react";
import { authStorage } from "@/lib/auth";
import { apiClient } from "@/lib/api-client";
import { ErrorState } from "@/components/ui/ErrorState";

interface PesananItem {
  id: number;
  pembeli_nama: string;
  komoditas_nama: string;
  jumlah_kg: number;
  total_harga: number | null;
  status: string;
  tanggal: string;
  grade: string | null;
}

export default function PesananPage() {
  const [pesananList, setPesananList] = useState<PesananItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<{ code?: number; message?: string } | null>(null);
  const [statusFilter, setStatusFilter] = useState("Semua");

  useEffect(() => {
    const fetchPesanan = async () => {
      const user = authStorage.getUser();
      if (!user?.user_id) {
        setError({ code: 403, message: 'User tidak ditemukan' });
        setIsLoading(false);
        return;
      }

      try {
        const response = await apiClient.get(`/orders/petani/${user.user_id}`);
        if (response.success && response.data) {
          setPesananList(response.data);
        } else {
          setError({ message: response.error || 'Gagal mengambil data pesanan' });
        }
      } catch (err) {
        setError({ message: 'Terjadi kesalahan koneksi' });
      } finally {
        setIsLoading(false);
      }
    };

    fetchPesanan();
  }, []);

  const filteredList = pesananList.filter(item => {
    if (statusFilter === "Semua") return true;
    if (statusFilter === "Berjalan") return item.status === "Berjalan";
    if (statusFilter === "Selesai") return item.status === "Selesai";
    return true;
  });

  const totalAktif = pesananList.filter(item => item.status === "Berjalan").length;
  const totalSelesai = pesananList.filter(item => item.status === "Selesai").length;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Selesai': return 'bg-green-100 text-green-700';
      case 'Berjalan': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Selesai': return <CheckCircle2 className="w-3.5 h-3.5" />;
      case 'Berjalan': return <RefreshCw className="w-3.5 h-3.5 animate-spin-slow" />;
      default: return <Clock className="w-3.5 h-3.5" />;
    }
  };

  const getCommodityIcon = (komoditasNama: string) => {
    const nama = komoditasNama.toLowerCase();
    if (nama.includes('cabai') || nama.includes('bawang') || nama.includes('sayur')) {
      return <Sprout className="w-12 h-12 text-green-600" />;
    }
    return <Package className="w-12 h-12 text-green-600" />;
  };

  if (isLoading) {
    return (
      <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 pb-32 md:pb-8 bg-gray-50/50 min-h-screen">
        <div className="h-8 bg-gray-200 rounded animate-pulse w-64 mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-gray-200 rounded-md h-24 animate-pulse" />
          ))}
        </div>
        <div className="bg-gray-200 rounded-md h-16 animate-pulse mb-4" />
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-gray-200 rounded-md h-40 animate-pulse" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 md:p-8 max-w-7xl mx-auto pb-32 md:pb-8 bg-gray-50/50 min-h-screen">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Daftar Pesanan Saya</h1>
        <ErrorState code={error.code} message={error.message} onRetry={() => window.location.reload()} />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 pb-32 md:pb-8 bg-gray-50/50 min-h-screen">

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 mb-2">
        <div className="flex items-center gap-4">
          <Link href="/petani" className="hidden md:flex w-10 h-10 bg-white border border-gray-200 rounded-md items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500 font-medium mb-1">
              <Link href="/petani" className="hover:text-primary-dark">Halaman Utama</Link>
              <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
              <span className="text-gray-900 font-bold">Pesanan Masuk</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
              Daftar Pesanan Saya
            </h1>
            <p className="text-gray-500 text-sm md:text-base hidden md:block">
              Kelola penjualan dan pantau bagi hasil panen Anda secara transparan.
            </p>
          </div>
        </div>
        <button className="flex items-center justify-center gap-2 bg-primary-dark hover:bg-primary text-white px-5 py-2.5 rounded-md font-semibold transition-colors shadow-sm">
          <Download className="w-4 h-4" />
          Unduh Laporan Penjualan
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Stat 1 */}
        <div className="bg-white p-5 rounded-md border border-gray-100 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-2">
            <p className="text-gray-500 font-medium">Total Pesanan Aktif</p>
            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
              <Truck className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-end gap-3">
            <h2 className="text-4xl font-bold text-gray-900">{totalAktif}</h2>
          </div>
        </div>

        {/* Stat 2 */}
        <div className="bg-white p-5 rounded-md border border-gray-100 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-2">
            <p className="text-gray-500 font-medium">Pesanan Selesai</p>
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="flex flex-col justify-end">
            <h2 className="text-4xl font-bold text-gray-900 mb-1">{totalSelesai}</h2>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-md border border-gray-100 shadow-sm flex flex-col lg:flex-row gap-4 items-end">
        <div className="w-full lg:w-1/4">
          <label className="block text-xs font-semibold text-gray-500 mb-1.5">Komoditas</label>
          <select className="w-full bg-gray-50 border border-gray-200 text-gray-700 py-2.5 px-3 rounded-xl outline-none focus:border-green-500 text-sm">
            <option>Semua Komoditas</option>
          </select>
        </div>
        <div className="w-full lg:w-1/4">
          <label className="block text-xs font-semibold text-gray-500 mb-1.5">Status</label>
          <select
            className="w-full bg-gray-50 border border-gray-200 text-gray-700 py-2.5 px-3 rounded-xl outline-none focus:border-green-500 text-sm"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="Semua">Semua Status</option>
            <option value="Berjalan">Berjalan</option>
            <option value="Selesai">Selesai</option>
          </select>
        </div>
        <div className="w-full lg:w-1/3">
          <label className="block text-xs font-semibold text-gray-500 mb-1.5">Rentang Tanggal</label>
          <div className="relative">
            <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Semua Tanggal"
              className="w-full bg-gray-50 border border-gray-200 text-gray-700 py-2.5 pl-9 pr-3 rounded-xl outline-none focus:border-green-500 text-sm"
              readOnly
            />
          </div>
        </div>
        <div className="w-full lg:w-auto ml-auto">
          <button className="w-full lg:w-auto flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-5 py-2.5 rounded-xl font-semibold transition-colors text-sm border border-gray-200">
            <Filter className="w-4 h-4" />
            Filter Lanjut
          </button>
        </div>
      </div>

      {/* Order List */}
      <div className="space-y-4">
        {filteredList.length === 0 ? (
          <div className="bg-white rounded-md border border-gray-100 shadow-sm p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Belum ada pesanan</h3>
            <p className="text-gray-500 text-sm">Anda belum memiliki pesanan dengan status yang dipilih.</p>
          </div>
        ) : (
          filteredList.map((pesanan) => (
            <div key={pesanan.id} className="bg-white rounded-md border border-gray-100 shadow-sm overflow-hidden flex flex-col">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border-b border-gray-100 bg-gray-50/50 gap-3">
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">ID Pesanan</p>
                    <p className={`text-sm font-bold ${pesanan.status === 'Selesai' ? 'text-green-700' : 'text-blue-700'}`}>#PD-{pesanan.id}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Tanggal</p>
                    <p className="text-sm font-semibold text-gray-700">{new Date(pesanan.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                  </div>
                </div>
                <div className={`${getStatusBadge(pesanan.status)} font-bold px-3 py-1 rounded-full text-xs flex items-center gap-1.5 self-start sm:self-auto uppercase`}>
                  {getStatusIcon(pesanan.status)}
                  {pesanan.status}
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex flex-col md:flex-row gap-5">
                {/* Image Placeholder */}
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden shrink-0 bg-green-50 border border-gray-100 relative flex items-center justify-center">
                  {getCommodityIcon(pesanan.komoditas_nama)}
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1.5">{pesanan.komoditas_nama}</h3>
                      <div className="flex items-center gap-3 text-sm text-gray-600 font-medium mb-3">
                        {pesanan.grade && (
                          <span className="flex items-center gap-1"><span className="text-yellow-500">★</span> Grade {pesanan.grade}</span>
                        )}
                        <span className="flex items-center gap-1"><span className="text-gray-400">⚖</span> {pesanan.jumlah_kg.toLocaleString('id-ID')} kg</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-600 px-2.5 py-1 rounded-lg text-xs font-medium border border-gray-200">
                          <MapPin className="w-3 h-3" /> Gudang Kopdes
                        </span>
                        <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-600 px-2.5 py-1 rounded-lg text-xs font-medium border border-gray-200">
                          <Truck className="w-3 h-3" /> Logistik PanenDesa
                        </span>
                      </div>
                    </div>

                    {/* Price block */}
                    <div className="lg:text-right">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                        {pesanan.status === 'Selesai' ? 'Pendapatan Bersih' : 'Estimasi Pendapatan'}
                      </p>
                      <p className="text-xl md:text-2xl font-bold text-green-700">
                        {pesanan.total_harga ? `Rp ${pesanan.total_harga.toLocaleString('id-ID')}` : '-'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="px-5 py-4 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gray-50/30">
                <p className="text-xs text-gray-500 font-medium">
                  Pembeli: {pesanan.pembeli_nama}
                </p>
                <Link href={`/petani/pesanan/detail/${pesanan.id}`} className="inline-flex items-center justify-center gap-2 bg-primary-dark hover:bg-primary text-white px-5 py-2 rounded-md text-sm font-semibold transition-colors">
                  {pesanan.status === 'Berjalan' ? 'Lihat Detail Pesanan' : 'Lihat Rincian Bagi Hasil'} <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {filteredList.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-200 mt-6">
          <p className="text-sm text-gray-500 font-medium">
            Menampilkan {filteredList.length} pesanan
          </p>
        </div>
      )}

    </div>
  );
}
