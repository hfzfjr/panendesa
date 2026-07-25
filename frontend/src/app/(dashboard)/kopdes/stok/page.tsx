"use client";

import React, { useEffect, useState } from "react";
import {
  Package,
  ArrowDownToLine,
  ArrowUpFromLine,
  FileDown,
  Warehouse,
  TrendingUp,
  Activity
} from "lucide-react";
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
}

export default function KopdesStokPage() {
  const [stokList, setStokList] = useState<StokEstimasi[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<{ code?: number; message?: string } | null>(null);

  useEffect(() => {
    const fetchStok = async () => {
      const user = authStorage.getUser();
      if (!user?.desa_id) {
        setError({ code: 403, message: 'Data desa tidak ditemukan' });
        setIsLoading(false);
        return;
      }

      try {
        const response = await apiClient.getStokEstimasiDesa(user.desa_id);
        if (response.success && response.data) {
          setStokList(response.data);
        } else {
          setError({ message: response.error || 'Gagal mengambil data stok' });
        }
      } catch (err) {
        setError({ message: 'Terjadi kesalahan koneksi' });
      } finally {
        setIsLoading(false);
      }
    };

    fetchStok();
  }, []);

  if (isLoading) {
    return (
      <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 md:space-y-8">
        <div className="h-8 bg-gray-200 rounded animate-pulse w-64" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
          <div className="lg:col-span-8 h-64 bg-gray-200 rounded-2xl animate-pulse" />
          <div className="lg:col-span-4 space-y-4">
            <div className="h-24 bg-gray-200 rounded-2xl animate-pulse" />
            <div className="h-24 bg-gray-200 rounded-2xl animate-pulse" />
          </div>
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

  const totalEstimasi = stokList.reduce((sum, item) => sum + item.jumlah_kg, 0);

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 md:space-y-8 pb-32 md:pb-8 min-h-screen">

      {/* Header & Aksi Cepat */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-primary-dark tracking-tight mb-1">
            Stok & Kapasitas Gudang
          </h1>
          <p className="text-gray-600 font-medium text-sm md:text-base">
            Pantau ketersediaan komoditas dan batas kapasitas simpan gudang koperasi.
          </p>
        </div>
        <button className="w-full md:w-auto border-2 border-[#117A3E] text-[#117A3E] hover:bg-green-50 font-bold px-6 py-3 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm shrink-0">
          <FileDown className="w-5 h-5" />
          Unduh Laporan Stok
        </button>
      </div>

      {/* Visualisasi Kapasitas Gudang (Atas) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">

        {/* Kapasitas Gudang (Hero Card) */}
        <div className="lg:col-span-8 bg-white p-5 md:p-8 rounded-2xl border border-gray-200 shadow-sm relative overflow-hidden">
          <div className="absolute -right-10 -top-10 text-gray-50 opacity-50 pointer-events-none">
            <Warehouse className="w-64 h-64" />
          </div>

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg md:text-xl font-bold text-gray-900 flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary-dark" />
                Tingkat Keterisian Gudang
              </h2>
              <span className="bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1 rounded-full">Kapasitas Maks: 50 Ton</span>
            </div>

            <div className="flex items-end gap-2 mb-4">
              <span className="text-4xl md:text-5xl font-black text-primary-dark">{totalEstimasi > 0 ? Math.round((totalEstimasi / 50000) * 100) : 0}%</span>
              <span className="text-gray-500 font-medium mb-1 md:mb-2">Estimasi ({totalEstimasi.toLocaleString('id-ID', { maximumFractionDigits: 0 })} kg)</span>
            </div>

            {/* Progress Bar Besar */}
            <div className="h-6 w-full bg-gray-100 rounded-full overflow-hidden flex shadow-inner">
              <div
                className="h-full bg-linear-to-r from-(--color-primary-dark) to-(--color-primary) rounded-full relative"
                style={{ width: `${totalEstimasi > 0 ? Math.min((totalEstimasi / 50000) * 100, 100) : 0}%` }}
              >
                {/* Stripe effect inside progress bar */}
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,.15) 50%, rgba(255,255,255,.15) 75%, transparent 75%, transparent)', backgroundSize: '1rem 1rem' }}></div>
              </div>
            </div>
            <div className="flex justify-between text-xs font-bold text-gray-400 mt-2">
              <span>0%</span>
              <span>Sisa {(50000 - totalEstimasi).toLocaleString('id-ID', { maximumFractionDigits: 0 })} kg</span>
              <span>100%</span>
            </div>
          </div>
        </div>

        {/* IN & OUT Cards */}
        <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-4 md:gap-6">
          <div className="bg-white p-5 border border-gray-100 rounded-2xl shadow-sm flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                <ArrowDownToLine className="w-4 h-4 text-green-600" />
              </div>
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">MASUK HARI INI</h3>
            </div>
            <div className="text-2xl font-black text-gray-900 ml-10">
              1,200 <span className="text-sm font-medium text-gray-500">kg</span>
            </div>
          </div>

          <div className="bg-white p-5 border border-gray-100 rounded-2xl shadow-sm flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                <ArrowUpFromLine className="w-4 h-4 text-red-600" />
              </div>
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">KELUAR HARI INI</h3>
            </div>
            <div className="text-2xl font-black text-gray-900 ml-10">
              800 <span className="text-sm font-medium text-gray-500">kg</span>
            </div>
          </div>
        </div>
      </div>

      {/* Rincian Komoditas (Tengah) */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Package className="w-5 h-5 text-primary-dark" />
          Rincian Stok per Komoditas
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">

          {/* Padi */}
          <div className="bg-white border border-gray-200 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <h3 className="font-bold text-gray-900 text-lg mb-1">Padi Giling</h3>
            <p className="text-gray-500 text-sm mb-4">Total Stok Tersedia</p>
            <div className="text-3xl font-black text-[#117A3E] mb-5">12.500 <span className="text-base text-gray-500 font-medium">kg</span></div>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-gray-700">Grade A</span>
                  <span className="text-gray-500">8.750 kg (70%)</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#117A3E]" style={{ width: '70%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-gray-700">Grade B</span>
                  <span className="text-gray-500">3.750 kg (30%)</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-400" style={{ width: '30%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Jagung */}
          <div className="bg-white border border-gray-200 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <h3 className="font-bold text-gray-900 text-lg mb-1">Jagung Pipil</h3>
            <p className="text-gray-500 text-sm mb-4">Total Stok Tersedia</p>
            <div className="text-3xl font-black text-orange-500 mb-5">8.200 <span className="text-base text-gray-500 font-medium">kg</span></div>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-gray-700">Grade A</span>
                  <span className="text-gray-500">8.200 kg (100%)</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500" style={{ width: '100%' }}></div>
                </div>
              </div>
              <div className="opacity-50">
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-gray-400">Grade B</span>
                  <span className="text-gray-400">0 kg (0%)</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden"></div>
              </div>
            </div>
          </div>

          {/* Cabai */}
          <div className="bg-white border border-gray-200 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <h3 className="font-bold text-gray-900 text-lg mb-1">Cabai Merah</h3>
            <p className="text-gray-500 text-sm mb-4">Total Stok Tersedia</p>
            <div className="text-3xl font-black text-red-600 mb-5">1.200 <span className="text-base text-gray-500 font-medium">kg</span></div>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-gray-700">Grade A</span>
                  <span className="text-gray-500">600 kg (50%)</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-red-600" style={{ width: '50%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-gray-700">Grade B</span>
                  <span className="text-gray-500">600 kg (50%)</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-400" style={{ width: '50%' }}></div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Tabel Riwayat Stok Estimasi (Bawah) */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mt-6">
        <div className="p-4 md:p-6 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
          <h2 className="text-lg md:text-xl font-bold text-primary-dark flex items-center gap-2">
            Riwayat Stok Estimasi
          </h2>
          <span className="text-sm font-bold text-gray-500">{stokList.length} catatan</span>
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-[11px] font-bold text-gray-500 uppercase tracking-widest">
                <th className="py-4 px-6">Petani ID</th>
                <th className="py-4 px-6">Komoditas ID</th>
                <th className="py-4 px-6">Jumlah (kg)</th>
                <th className="py-4 px-6">Target Panen</th>
                <th className="py-4 px-6">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {stokList.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-500">
                    Belum ada data stok estimasi
                  </td>
                </tr>
              ) : (
                stokList.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 font-bold text-gray-900">{item.petani_id}</td>
                    <td className="py-4 px-6 font-medium text-gray-700">{item.komoditas_id}</td>
                    <td className="py-4 px-6 font-black text-primary-dark">{item.jumlah_kg.toLocaleString('id-ID', { maximumFractionDigits: 2 })}</td>
                    <td className="py-4 px-6 text-gray-500">{item.tanggal_target_panen}</td>
                    <td className="py-4 px-6">
                      <span className="px-2 py-1 rounded text-[10px] font-bold bg-yellow-100 text-yellow-700">
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Card List View */}
        <div className="md:hidden divide-y divide-gray-100">
          {stokList.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              Belum ada data stok estimasi
            </div>
          ) : (
            stokList.map((item) => (
              <div key={item.id} className="p-4 flex items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                    <Package className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Petani #{item.petani_id}</h4>
                    <p className="text-xs text-gray-500 mb-1">Komoditas #{item.komoditas_id}</p>
                    <p className="text-[10px] text-gray-400">{item.tanggal_target_panen}</p>
                  </div>
                </div>
                <div className="font-black text-lg text-primary-dark">
                  {item.jumlah_kg.toLocaleString('id-ID', { maximumFractionDigits: 0 })} kg
                </div>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
}
