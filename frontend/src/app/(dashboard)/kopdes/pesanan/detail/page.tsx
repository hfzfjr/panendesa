"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Store,
  MapPin,
  Map,
  Users,
  Filter,
  Search,
  Banknote,
  Download,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
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

export default function KopdesOrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = parseInt(params.id as string);

  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<{ code?: number; message?: string } | null>(null);
  const [hargaInput, setHargaInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) {
        setError({ code: 400, message: 'ID pesanan tidak valid' });
        setIsLoading(false);
        return;
      }

      try {
        const response = await apiClient.getOrderById(orderId);
        if (response.success && response.data) {
          setOrder(response.data);
          if (response.data.harga_final_per_kg) {
            setHargaInput(response.data.harga_final_per_kg.toString());
          }
        } else {
          setError({ message: response.error || 'Gagal mengambil detail pesanan' });
        }
      } catch (err) {
        setError({ message: 'Terjadi kesalahan koneksi' });
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  const handleConfirmPrice = async (e: React.FormEvent) => {
    e.preventDefault();

    const hargaNum = parseFloat(hargaInput);
    if (isNaN(hargaNum) || hargaNum <= 0) {
      setError({ message: 'Harga harus lebih dari 0' });
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await apiClient.confirmOrderPrice(orderId, hargaNum);

      if (response.success) {
        setSuccess(true);
        setTimeout(() => {
          router.push('/kopdes/pesanan');
        }, 2000);
      } else {
        setError({ message: response.error || 'Gagal mengkonfirmasi harga' });
      }
    } catch (err) {
      setError({ message: 'Terjadi kesalahan koneksi' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case "A": return "bg-success text-white";
      case "B": return "bg-warning text-neutral-900";
      case "C": return "bg-danger text-white";
      default: return "bg-gray-200 text-gray-800";
    }
  };

  if (isLoading) {
    return (
      <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-6">
        <div className="h-8 bg-gray-200 rounded animate-pulse w-64" />
        <div className="h-12 bg-gray-200 rounded animate-pulse w-48" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-5 h-32 animate-pulse rounded-2xl" />
          <div className="bg-white p-5 h-32 animate-pulse rounded-2xl" />
        </div>
        <div className="bg-white p-5 h-64 animate-pulse rounded-2xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 md:p-8 max-w-5xl mx-auto">
        <ErrorState code={error.code} message={error.message} onRetry={() => window.location.reload()} />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="p-4 md:p-8 max-w-5xl mx-auto">
        <ErrorState code={404} message="Pesanan tidak ditemukan" onRetry={() => window.location.reload()} />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-6 pb-32 md:pb-8 min-h-screen">

      {/* Top Navigation */}
      <Link href="/kopdes/pesanan" className="inline-flex items-center gap-2 text-gray-700 hover:text-primary-dark font-bold text-lg mb-2 transition-colors">
        <ArrowLeft className="w-5 h-5" />
        Kembali ke Pesanan Pembeli
      </Link>

      <h1 className="text-3xl md:text-4xl font-extrabold text-primary-dark tracking-tight mb-6">
        Order Detail: #{order.id}
      </h1>

      {/* Info Cards (Pembeli & Distribusi) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {/* Card Pembeli */}
        <div className="bg-white p-5 md:p-6 border border-gray-200 rounded-2xl shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Store className="w-5 h-5 text-primary-dark" />
            <h3 className="text-xs font-bold text-primary-dark uppercase tracking-wider">PEMBELI</h3>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">{order.pembeli_nama || 'Pembeli tidak diketahui'}</h2>
          <div className="flex items-start gap-2 text-gray-500">
            <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
            <span className="text-sm font-medium">Jakarta Selatan, DKI Jakarta</span>
          </div>
        </div>

        {/* Card Alokasi Distribusi */}
        <div className="bg-white p-5 md:p-6 border border-gray-200 rounded-2xl shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Map className="w-5 h-5 text-primary-dark" />
            <h3 className="text-xs font-bold text-primary-dark uppercase tracking-wider">ALOKASI DISTRIBUSI DESA</h3>
          </div>

          {/* Progress Bar */}
          <div className="h-4 w-full bg-gray-100 rounded-full overflow-hidden flex mb-4">
            <div className="h-full bg-[#117A3E]" style={{ width: '60%' }} title="Desa Sukamaju 60%"></div>
            <div className="h-full bg-[#205C3B]" style={{ width: '40%' }} title="Desa Harapan 40%"></div>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-4 text-sm font-bold text-gray-700">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#117A3E]"></div>
              Desa Sukamaju (60%)
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#205C3B]"></div>
              Desa Harapan (40%)
            </div>
          </div>

          <div className="inline-block bg-green-50 text-green-800 text-xs font-bold px-3 py-1.5 rounded-md">
            Total: 2,500 Kg
          </div>
        </div>
      </div>

      {/* Tabel / List Petani Penyuplai */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden mt-2">
        <div className="p-4 md:p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gray-50/50">
          <h2 className="text-lg md:text-xl font-bold text-primary-dark flex items-center gap-2">
            <Users className="w-5 h-5 md:w-6 md:h-6" />
            Daftar Petani Penyuplai
          </h2>
          <div className="flex items-center gap-3 self-end md:self-auto">
            <button className="text-gray-500 hover:text-gray-900 p-2"><Filter className="w-5 h-5" /></button>
            <button className="text-gray-500 hover:text-gray-900 p-2"><Search className="w-5 h-5" /></button>
          </div>
        </div>

        <div className="p-8 text-center text-gray-500">
          <p>Daftar petani penyuplai akan muncul setelah fair-share distribution dihitung.</p>
          <p className="text-sm mt-1">Fitur ini akan tersedia di fase berikutnya.</p>
        </div>
      </div>

      {/* Rincian Harga & Fee */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm relative overflow-hidden mt-6">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-bl-[100px] pointer-events-none"></div>
        <div className="p-5 md:p-6 md:px-8">
          <div className="flex items-center gap-2 mb-6">
            <Banknote className="w-5 h-5 text-primary-dark" />
            <h3 className="text-xs font-bold text-primary-dark uppercase tracking-wider">RINCIAN HARGA & FEE</h3>
          </div>

          {/* Callout Fee Kopdes - WAJIB tampil SEBELUM konfirmasi */}
          <div className="bg-neutral-100 border-l-4 border-accent rounded-md p-4 mb-6">
            <h4 className="font-bold text-neutral-900 text-sm mb-2">Fee Kopdes</h4>
            <p className="text-neutral-900 text-sm mb-1">Persentase: {order.fee_kopdes_persen_terpakai ? `${order.fee_kopdes_persen_terpakai}%` : 'Belum ditentukan'}</p>
            {hargaInput && order.fee_kopdes_persen_terpakai && (
              <p className="text-neutral-600 text-xs">
                Estimasi bersih per kg setelah fee: Rp {(parseFloat(hargaInput) * (1 - order.fee_kopdes_persen_terpakai / 100)).toLocaleString('id-ID', { maximumFractionDigits: 0 })}
              </p>
            )}
          </div>

          {/* Form Konfirmasi Harga */}
          {!order.harga_terkunci ? (
            <form onSubmit={handleConfirmPrice}>
              <div className="mb-6">
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
                  Harga Final per Kg (Rp)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={hargaInput}
                  onChange={(e) => setHargaInput(e.target.value)}
                  className="w-full text-2xl font-bold text-gray-900 bg-gray-50 border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-primary focus:outline-none transition-colors"
                  placeholder="Masukkan harga..."
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-4 mb-6 text-sm md:text-base">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-600 uppercase text-xs md:text-sm">ESTIMASI TOTAL KOTOR</span>
                  <span className="font-bold text-gray-900">
                    {hargaInput ? `Rp ${(parseFloat(hargaInput) * order.jumlah_diminta_kg).toLocaleString('id-ID', { maximumFractionDigits: 0 })}` : '-'}
                  </span>
                </div>
                {hargaInput && order.fee_kopdes_persen_terpakai && (
                  <div className="flex justify-between items-center text-red-600">
                    <span className="font-bold uppercase text-xs md:text-sm">ESTIMASI TOTAL FEE ({order.fee_kopdes_persen_terpakai}%)</span>
                    <span className="font-bold">
                      - Rp {(parseFloat(hargaInput) * order.jumlah_diminta_kg * (order.fee_kopdes_persen_terpakai / 100)).toLocaleString('id-ID', { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                )}
              </div>

              <div className="border-t border-gray-200 pt-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-gray-600 uppercase text-xs mb-1">ESTIMASI TOTAL BERSIH</h3>
                    <span className="inline-block bg-gray-100 text-gray-500 text-[10px] font-bold px-2 py-1 rounded">Setelah Fee Kopdes</span>
                  </div>
                  <div className="text-3xl md:text-4xl font-black text-primary-dark text-right">
                    {hargaInput && order.fee_kopdes_persen_terpakai ? (
                      <>
                        <span className="text-xl md:text-2xl mr-1">Rp</span>
                        {(parseFloat(hargaInput) * order.jumlah_diminta_kg * (1 - order.fee_kopdes_persen_terpakai / 100)).toLocaleString('id-ID', { maximumFractionDigits: 0 })}
                      </>
                    ) : '-'}
                  </div>
                </div>
              </div>
            </form>
          ) : (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-success" />
              <div>
                <h4 className="font-bold text-success text-sm">Harga Terkunci</h4>
                <p className="text-gray-700 text-xs">Harga final Rp {order.harga_final_per_kg?.toLocaleString('id-ID', { maximumFractionDigits: 0 })} / kg telah dikonfirmasi dan tidak dapat diubah.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 md:p-5 shadow-sm flex flex-col md:flex-row items-center justify-end gap-3 mt-6">
        <button className="w-full md:w-auto bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-bold px-6 py-3 md:py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm">
          <Download className="w-4 h-4" />
          Download PDF
        </button>
        {!order.harga_terkunci && (
          <button
            type="submit"
            onClick={handleConfirmPrice}
            disabled={isSubmitting || !hargaInput}
            className="w-full md:w-auto bg-primary hover:bg-primary-dark disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold px-8 py-3 md:py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm shadow-sm"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Memproses...
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                Konfirmasi Harga
              </>
            )}
          </button>
        )}
      </div>

      {success && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex gap-3 mt-4">
          <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
          <p className="text-success text-sm font-medium">Harga berhasil dikonfirmasi. Mengalihkan...</p>
        </div>
      )}

      {error && !((error as any).message || String(error)).includes('koneksi') && (
        <div className="bg-red-50 border border-red-100 rounded-xl p-4 flex gap-3 mt-4">
          <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <p className="text-red-600 text-sm font-medium">{(error as any).message || String(error)}</p>
        </div>
      )}

    </div>
  );
}
