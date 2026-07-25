"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PlusCircle, Sprout, ChevronLeft, ChevronRight } from "lucide-react";
import { authStorage } from "@/lib/auth";
import { apiClient } from "@/lib/api-client";
import { ErrorState } from "@/components/ui/ErrorState";

interface StokEstimasi {
  id: number;
  petani_id: number;
  komoditas_id: number;
  jumlah_kg: number;
  tanggal_target_panen: string;
  status: string;
  created_at: string;
  komoditas_nama?: string;
}

export default function TanamanSayaPage() {
  const [stokList, setStokList] = useState<StokEstimasi[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<{ code?: number; message?: string } | null>(null);

  useEffect(() => {
    const fetchStok = async () => {
      const user = authStorage.getUser();
      if (!user?.user_id) {
        setError({ code: 403, message: 'User tidak ditemukan' });
        setIsLoading(false);
        return;
      }

      try {
        const response = await apiClient.getStokEstimasiPetani(user.user_id);
        if (response.success && response.data) {
          setStokList(response.data);
        } else {
          setError({ message: response.error || 'Gagal mengambil data stok estimasi' });
        }
      } catch (err) {
        setError({ message: 'Terjadi kesalahan koneksi' });
      } finally {
        setIsLoading(false);
      }
    };

    fetchStok();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'menunggu_panen': return 'bg-warning text-neutral-900';
      case 'tervalidasi': return 'bg-success text-white';
      case 'dibatalkan': return 'bg-danger text-white';
      default: return 'bg-gray-200 text-gray-700';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'menunggu_panen': return 'Menunggu Panen';
      case 'tervalidasi': return 'Tervalidasi';
      case 'dibatalkan': return 'Dibatalkan';
      default: return status;
    }
  };

  if (isLoading) {
    return (
      <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
        <div className="h-12 bg-gray-200 rounded animate-pulse w-64" />
        <div className="h-8 bg-gray-200 rounded animate-pulse w-48" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-gray-200 rounded-3xl h-64 animate-pulse" />
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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 mb-4 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <Link href="/petani" className="hidden md:flex w-10 h-10 bg-white border border-gray-200 rounded-md items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500 font-medium mb-1">
              <Link href="/petani" className="hover:text-primary-dark">Halaman Utama</Link>
              <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
              <span className="text-gray-900 font-bold">Tanaman Saya</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-primary-dark uppercase tracking-tight mb-2">
              TANAMAN SAYA
            </h1>
            <p className="text-gray-600 text-lg md:text-xl font-medium hidden md:block">
              Pantau semua kebun yang Sedang Ditanam maupun Sudah Panen.
            </p>
          </div>
        </div>
        <Link
          href="/petani/tanaman/baru"
          className="bg-primary-dark hover:bg-green-800 text-white font-bold px-6 py-4 rounded-2xl flex items-center justify-center gap-2 transition-colors shadow-md shrink-0"
        >
          <PlusCircle className="w-6 h-6" />
          <span className="text-lg">Mulai Tanam</span>
        </Link>
      </div>
      <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-hide">
        <div className="text-gray-500 font-medium text-sm">
          Total: {stokList.length} laporan stok
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-l-4 border-primary-dark pl-3 mb-6">
          <h2 className="text-xl font-bold text-gray-900">Laporan Stok Estimasi</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {stokList.map((stok) => (
            <Link key={stok.id} href={`/petani/tanaman/detail/${stok.id}`} className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden flex flex-col group cursor-pointer hover:border-primary-dark transition-colors">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-primary-dark transition-colors">
                      {stok.komoditas_nama || `Komoditas #${stok.komoditas_id}`}
                    </h3>
                    <p className="text-gray-500 text-sm font-medium mt-1">
                      Estimasi: {stok.jumlah_kg.toLocaleString('id-ID')} kg
                    </p>
                  </div>
                  <span className={`px-3 py-1.5 rounded-xl text-sm font-bold ${getStatusBadge(stok.status)}`}>
                    {getStatusLabel(stok.status)}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-gray-600 text-sm font-medium">
                  <span>Target Panen: {new Date(stok.tanggal_target_panen).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        {stokList.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500 font-medium">Belum ada laporan stok estimasi.</p>
            <Link href="/petani/laporan/baru" className="inline-block mt-4 text-primary-dark font-bold hover:underline">
              Buat laporan stok sekarang
            </Link>
          </div>
        )}
      </div>

    </div>
  );
}
