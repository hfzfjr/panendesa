"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Wallet, CheckCircle2, ChevronRight, ChevronLeft } from "lucide-react";
import { authStorage } from "@/lib/auth";
import { apiClient } from "@/lib/api-client";
import { ErrorState } from "@/components/ui/ErrorState";

interface FairShareItem {
  id: number;
  order_id: number;
  intake_grading_id: number;
  kontribusi_kg: number;
  grade: string;
  pengali_grade: number;
  jumlah_diterima: number;
  fee_kopdes_persen: number;
  fee_kopdes_nominal: number;
  harga_final_per_kg: number;
  komoditas_nama?: string;
  created_at: string;
}

export default function LaporanPendapatanPage() {
  const [fairShareList, setFairShareList] = useState<FairShareItem[]>([]);
  const [filter, setFilter] = useState("Semua");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<{ code?: number; message?: string } | null>(null);

  useEffect(() => {
    const fetchFairShare = async () => {
      const user = authStorage.getUser();
      if (!user?.user_id) {
        setError({ code: 403, message: 'User tidak ditemukan' });
        setIsLoading(false);
        return;
      }

      try {
        const response = await apiClient.getFairSharePetani(user.user_id);
        if (response.success && response.data) {
          setFairShareList(response.data);
        } else {
          setError({ message: response.error || 'Gagal mengambil data fair share' });
        }
      } catch (err) {
        setError({ message: 'Terjadi kesalahan koneksi' });
      } finally {
        setIsLoading(false);
      }
    };

    fetchFairShare();
  }, []);

  const filteredList = fairShareList.filter(item => {
    if (filter === "Semua") return true;
    // For now, show all items since we don't have a status field in the API response
    return true;
  });

  const totalDiterima = fairShareList.reduce((sum, item) => sum + item.jumlah_diterima, 0);
  const totalFee = fairShareList.reduce((sum, item) => sum + (item.fee_kopdes_nominal || 0), 0);

  if (isLoading) {
    return (
      <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
        <div className="h-12 bg-gray-200 rounded animate-pulse w-64" />
        <div className="h-8 bg-gray-200 rounded animate-pulse w-48" />
        <div className="bg-gray-200 rounded-lg h-32 animate-pulse" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-gray-200 rounded-lg h-40 animate-pulse" />
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
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 pb-32 md:pb-8">
      <div className="flex items-center gap-4 border-b border-gray-100 pb-4 pt-2 mb-6">
        <Link href="/petani" className="hidden md:flex w-10 h-10 bg-white border border-gray-200 rounded-md items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors mt-2">
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <div>
          <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500 font-medium mb-1">
            <Link href="/petani" className="hover:text-primary-dark">Halaman Utama</Link>
            <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
            <span className="text-gray-900 font-bold">Buku Tabungan</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-primary-dark uppercase tracking-tight mb-2">
            BUKU TABUNGAN
          </h1>
          <p className="text-gray-600 font-medium text-lg md:text-xl">
            Pantau semua uang hasil panen Anda di sini.
          </p>
        </div>
      </div>

      <div className="bg-primary-dark rounded-lg p-6 md:p-8 shadow-xl shadow-green-900/20 text-white relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 opacity-10">
          <Wallet className="w-48 h-48" />
        </div>

        <div className="relative z-10 text-center">
          <p className="text-green-100 font-bold text-lg md:text-xl mb-2">Total Uang Diterima</p>
          <div className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6 wrap-break-word leading-tight text-yellow-400">
            Rp {totalDiterima.toLocaleString('id-ID')}
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-3">
            <div className="bg-green-800/50 backdrop-blur-sm border border-green-700/50 px-4 py-2 rounded-full font-bold text-sm md:text-base flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-300" />
              {fairShareList.length} Transaksi
            </div>
            <div className="bg-green-800/50 backdrop-blur-sm border border-green-700/50 px-4 py-2 rounded-full font-bold text-sm md:text-base flex items-center gap-2">
              <span className="text-xl">💰</span>
              Total Fee: Rp {totalFee.toLocaleString('id-ID')}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-3">
        <button
          onClick={() => setFilter("Semua")}
          className={`flex-1 py-4 font-black text-lg md:text-xl rounded-md border-2 transition-all flex items-center justify-center gap-2 shadow-sm ${filter === "Semua" ? 'bg-primary-dark text-white border-primary-dark' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
        >
          💰 Semua
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredList.map(item => (
          <Link key={item.id} href={`/petani/pendapatan/detail/${item.id}`} className="bg-white rounded-lg border-2 border-gray-100 transition-colors shadow-sm overflow-hidden flex flex-col md:flex-row items-center md:items-stretch cursor-pointer group hover:border-primary-dark">
            <div className="w-full md:w-48 h-48 bg-gray-200 relative shrink-0">
              <div className="w-full h-full bg-linear-to-br from-green-100 to-green-200 flex items-center justify-center">
                <Wallet className="w-16 h-16 text-green-600" />
              </div>
              <div className="absolute top-3 left-3 bg-primary-dark text-white font-black px-3 py-1 rounded-sm text-xs uppercase tracking-wider shadow-md">
                Grade {item.grade}
              </div>
            </div>

            <div className="p-5 md:p-6 flex-1 flex flex-col justify-between w-full">
              <div>
                <h3 className="text-2xl font-black text-gray-900 mb-1">{item.komoditas_nama || `Komoditas #${item.order_id}`}</h3>
                <p className="text-gray-500 font-bold text-sm md:text-base">{item.kontribusi_kg} kg (Grade {item.grade}) • {new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                <p className="text-gray-400 text-xs mt-1">Fee Kopdes: {item.fee_kopdes_persen}% (Rp {item.fee_kopdes_nominal.toLocaleString('id-ID')})</p>
              </div>
              <div className="mt-4 flex items-end justify-between">
                <div>
                  <p className="text-sm font-bold text-gray-500 mb-1">Uang Diterima:</p>
                  <p className="text-3xl font-black text-primary-dark">Rp {item.jumlah_diterima.toLocaleString('id-ID')}</p>
                </div>
                <div className="w-12 h-12 rounded-full flex items-center justify-center transition-colors bg-green-50 text-primary-dark group-hover:bg-primary-dark group-hover:text-white">
                  <ChevronRight className="w-6 h-6" />
                </div>
              </div>
            </div>
          </Link>
        ))}

        {filteredList.length === 0 && (
          <div className="col-span-1 lg:col-span-2 bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg p-12 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-4">
              <Wallet className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Belum ada catatan</h3>
            <p className="text-gray-500 font-medium">Belum ada transaksi fair-share yang tercatat.</p>
          </div>
        )}
      </div>
    </div>
  );
}
