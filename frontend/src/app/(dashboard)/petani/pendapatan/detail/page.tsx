"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Download, Share2, Receipt, Users, CheckCircle2, Building2 } from "lucide-react";
import { authStorage } from "@/lib/auth";
import { apiClient } from "@/lib/api-client";
import { ErrorState } from "@/components/ui/ErrorState";

interface FairShareDetail {
  id: number;
  order_id: number;
  petani_id: number;
  kontribusi_kg: number;
  grade: string;
  jumlah_diterima: number;
  fee_kopdes_persen: number;
  fee_kopdes_nominal: number;
  harga_final_per_kg: number;
  created_at: string;
  komoditas_nama?: string;
  pembeli_nama?: string;
}

export default function DetailBagiHasilPage() {
  const params = useParams();
  const router = useRouter();
  const [fairShare, setFairShare] = useState<FairShareDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<{ code?: number; message?: string } | null>(null);

  useEffect(() => {
    const fetchFairShareDetail = async () => {
      const user = authStorage.getUser();
      if (!user?.user_id) {
        setError({ code: 403, message: 'User tidak ditemukan' });
        setIsLoading(false);
        return;
      }

      try {
        const response = await apiClient.getFairSharePetani(user.user_id);
        if (response.success && response.data) {
          const item = response.data.find((d: FairShareDetail) => d.id === parseInt(params.id as string));
          if (item) {
            setFairShare(item);
          } else {
            setError({ code: 404, message: 'Data tidak ditemukan' });
          }
        } else {
          setError({ message: response.error || 'Gagal mengambil detail fair share' });
        }
      } catch (err) {
        setError({ message: 'Terjadi kesalahan koneksi' });
      } finally {
        setIsLoading(false);
      }
    };

    fetchFairShareDetail();
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
        <div className="h-12 bg-gray-200 rounded animate-pulse w-64" />
        <div className="h-8 bg-gray-200 rounded animate-pulse w-48" />
        <div className="bg-gray-200 rounded-lg h-32 animate-pulse" />
        <div className="bg-gray-200 rounded-lg h-64 animate-pulse" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 md:p-8 max-w-7xl mx-auto">
        <ErrorState code={error.code} message={error.message} onRetry={() => router.back()} />
      </div>
    );
  }

  if (!fairShare) {
    return (
      <div className="p-4 md:p-8 max-w-7xl mx-auto">
        <ErrorState code={404} message="Data tidak ditemukan" onRetry={() => router.back()} />
      </div>
    );
  }

  const subTotal = fairShare.harga_final_per_kg * fairShare.kontribusi_kg;
  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 pb-32 md:pb-8">
      <div className="pt-2">
        <Link href="/petani/pendapatan" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 font-bold mb-6 transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <span>Kembali ke Buku Tabungan</span>
        </Link>
        <h1 className="text-2xl md:text-3xl font-extrabold text-primary-dark uppercase tracking-tight mb-2">
          NOTA PEMBAYARAN {fairShare.komoditas_nama?.toUpperCase() || 'KOMODITAS'}
        </h1>
        <p className="text-gray-600 font-medium text-sm md:text-base">
          Rincian uang masuk dari Penjualan Bersama (Order #{fairShare.order_id}).
        </p>
      </div>
      <div className="bg-primary-dark rounded-3xl p-6 md:p-8 shadow-xl shadow-green-900/20 text-white relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 opacity-10">
          <Receipt className="w-48 h-48" />
        </div>

        <div className="relative z-10">
          <p className="text-green-100 font-bold text-lg md:text-xl mb-1">Total Uang Anda</p>
          <div className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6 wrap-break-word leading-tight text-yellow-400">
            Rp {fairShare.jumlah_diterima.toLocaleString('id-ID')}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-6 border-t border-green-700/50">
            <div>
              <p className="text-green-100 text-sm font-bold mb-1">Grade Produk:</p>
              <div className="font-black text-xl">
                Grade {fairShare.grade}
              </div>
            </div>
            <div>
              <p className="text-green-100 text-sm font-bold mb-1">Kontribusi Anda:</p>
              <div className="font-black text-xl">
                {fairShare.kontribusi_kg} kg
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-3xl border-2 border-gray-100 shadow-sm overflow-hidden">
        <div className="bg-gray-50 border-b-2 border-gray-100 p-5 md:p-6 flex items-center gap-3">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-gray-500 shadow-sm">
            <Receipt className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black text-gray-900">Rincian Perhitungan</h2>
        </div>

        <div className="p-6 md:p-8 space-y-4 font-mono text-lg md:text-xl text-gray-800">
          <div className="flex justify-between items-end border-b-2 border-dashed border-gray-200 pb-3">
            <div>
              <span className="block font-bold">Harga Jual (Grade {fairShare.grade})</span>
              <span className="text-sm text-gray-500 font-sans">Harga final per kg</span>
            </div>
            <span className="font-bold">Rp {fairShare.harga_final_per_kg.toLocaleString('id-ID')} / kg</span>
          </div>
          <div className="flex justify-between items-end border-b-2 border-dashed border-gray-200 pb-3">
            <div>
              <span className="block font-bold">Kontribusi Anda</span>
              <span className="text-sm text-gray-500 font-sans">Grade {fairShare.grade}</span>
            </div>
            <span className="font-bold">x {fairShare.kontribusi_kg} kg</span>
          </div>
          <div className="flex justify-between items-center py-2 text-primary-dark">
            <span className="font-black font-sans">SUB-TOTAL</span>
            <span className="font-bold">Rp {subTotal.toLocaleString('id-ID')}</span>
          </div>
          <div className="flex justify-between items-end border-b-2 border-solid border-gray-300 pb-4 text-red-600">
            <div>
              <span className="block font-bold">Potongan Koperasi ({fairShare.fee_kopdes_persen}%)</span>
              <span className="text-sm text-red-400 font-sans">Biaya layanan Kopdes</span>
            </div>
            <span className="font-bold">- Rp {fairShare.fee_kopdes_nominal.toLocaleString('id-ID')}</span>
          </div>
          <div className="flex justify-between items-center pt-2">
            <span className="font-black text-2xl font-sans text-gray-900">UANG BERSIH</span>
            <span className="font-black text-3xl md:text-4xl text-primary-dark">Rp {fairShare.jumlah_diterima.toLocaleString('id-ID')}</span>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-3xl p-6 border-2 border-gray-100 shadow-sm">
        <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-primary-dark">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Uang Teman Sekelompok</h2>
            <p className="text-gray-500 text-sm font-medium">Transparansi pembagian hasil panen 500kg</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-green-50 border-2 border-green-200 rounded-2xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary-dark text-white font-black text-xl rounded-full flex items-center justify-center">
                A
              </div>
              <div>
                <span className="block font-black text-gray-900 text-lg">Anda Sendiri</span>
                <span className="text-green-700 font-bold text-sm bg-green-100 px-2 py-0.5 rounded-full">195 kg</span>
              </div>
            </div>
            <div className="text-right">
              <span className="block font-black text-primary-dark text-xl">Rp 2.779.500</span>
            </div>
          </div>
          <div className="flex items-center justify-between p-4 bg-white border-2 border-gray-100 rounded-2xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-200 text-gray-600 font-black text-xl rounded-full flex items-center justify-center">
                B
              </div>
              <div>
                <span className="block font-black text-gray-900 text-lg">Pak Budi</span>
                <span className="text-gray-600 font-bold text-sm bg-gray-100 px-2 py-0.5 rounded-full">150 kg</span>
              </div>
            </div>
            <div className="text-right">
              <span className="block font-black text-gray-600 text-lg">Rp 2.137.500</span>
            </div>
          </div>
          <div className="flex items-center justify-between p-4 bg-white border-2 border-gray-100 rounded-2xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-200 text-gray-600 font-black text-xl rounded-full flex items-center justify-center">
                A
              </div>
              <div>
                <span className="block font-black text-gray-900 text-lg">Pak Andi</span>
                <span className="text-gray-600 font-bold text-sm bg-gray-100 px-2 py-0.5 rounded-full">100 kg</span>
              </div>
            </div>
            <div className="text-right">
              <span className="block font-black text-gray-600 text-lg">Rp 1.211.250</span>
            </div>
          </div>
          <div className="flex items-center justify-between p-4 bg-white border-2 border-gray-100 rounded-2xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-200 text-gray-600 font-black text-xl rounded-full flex items-center justify-center">
                S
              </div>
              <div>
                <span className="block font-black text-gray-900 text-lg">Ibu Siti</span>
                <span className="text-gray-600 font-bold text-sm bg-gray-100 px-2 py-0.5 rounded-full">55 kg</span>
              </div>
            </div>
            <div className="text-right">
              <span className="block font-black text-gray-600 text-lg">Rp 548.625</span>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 md:static bg-white md:bg-transparent border-t md:border-none border-gray-200 p-4 md:p-0 z-40 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.1)] md:shadow-none pb-safe">
        <div className="max-w-7xl mx-auto flex gap-3">
          <button
            type="button"
            className="flex-1 flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2 py-3 md:py-4 px-2 font-black bg-white text-primary-dark border-2 border-primary-dark rounded-2xl hover:bg-green-50 transition-all shadow-md"
          >
            <Download className="w-6 h-6" />
            <span className="text-sm md:text-lg">Unduh Nota (PDF)</span>
          </button>

          <button
            type="button"
            className="flex-1 flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2 py-3 md:py-4 px-2 font-black bg-green-500 text-white rounded-2xl hover:bg-green-600 transition-all shadow-xl"
          >
            <Share2 className="w-6 h-6" />
            <span className="text-sm md:text-lg">Kirim via WA</span>
          </button>
        </div>
      </div>

    </div>
  );
}
