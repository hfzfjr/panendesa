"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Sprout, Calendar, Scale, Save, Info, AlertCircle } from "lucide-react";
import { authStorage } from "@/lib/auth";
import { apiClient } from "@/lib/api-client";

export default function TambahTanamanPage() {
  const router = useRouter();
  const [komoditasId, setKomoditasId] = useState("");
  const [jumlahKg, setJumlahKg] = useState("");
  const [tanggalTargetPanen, setTanggalTargetPanen] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!komoditasId || !jumlahKg || !tanggalTargetPanen) {
      setError('Mohon lengkapi semua field yang diperlukan');
      return;
    }

    const jumlahNum = parseFloat(jumlahKg);
    if (isNaN(jumlahNum) || jumlahNum <= 0) {
      setError('Jumlah panen harus lebih dari 0');
      return;
    }

    // Validasi tanggal tidak boleh lampau
    const targetDate = new Date(tanggalTargetPanen);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (targetDate < today) {
      setError('Tanggal target panen tidak boleh tanggal lampau');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await apiClient.postStokEstimasi(parseInt(komoditasId), jumlahNum, tanggalTargetPanen);

      if (response.success) {
        router.push('/petani/tanaman');
      } else {
        setError(response.error || 'Gagal mendaftarkan tanaman');
      }
    } catch (err) {
      setError('Terjadi kesalahan koneksi');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto space-y-6 pb-32 md:pb-8">
      {/* Header */}
      <div className="flex items-center gap-4 border-b border-gray-100 pb-4 mb-6">
        <Link href="/petani/tanaman" className="w-10 h-10 bg-white border border-gray-200 rounded-md flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors mt-2">
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <div>
          <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500 font-medium mb-1">
            <Link href="/petani" className="hover:text-primary-dark">Halaman Utama</Link>
            <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
            <Link href="/petani/tanaman" className="hover:text-primary-dark">Tanaman Saya</Link>
            <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
            <span className="text-gray-900 font-bold">Tambah Tanaman</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">Tambah Tanaman Baru</h1>
          <p className="text-gray-500 font-medium hidden md:block">Daftarkan siklus tanam baru Anda.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Form Detail */}
        <div className="bg-white rounded-lg p-6 md:p-8 border border-gray-100 shadow-sm space-y-6">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Sprout className="w-5 h-5 text-primary-dark" />
            Informasi Komoditas
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Jenis Komoditas</label>
              <select
                required
                value={komoditasId}
                onChange={(e) => setKomoditasId(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 py-3.5 px-4 rounded-md outline-none focus:border-primary-dark font-medium"
              >
                <option value="" disabled selected>-- Pilih Jenis Komoditas --</option>
                <option value="1">Cabai Merah</option>
                <option value="2">Bawang Merah</option>
                <option value="3">Tomat</option>
                <option value="4">Padi</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-gray-400" /> Estimasi Jumlah Panen
              </label>
              <div className="relative">
                <input
                  type="number"
                  required
                  value={jumlahKg}
                  onChange={(e) => setJumlahKg(e.target.value)}
                  placeholder="Contoh: 500"
                  className="w-full bg-gray-50 border border-gray-200 text-gray-900 py-3.5 pl-4 pr-16 rounded-md outline-none focus:border-primary-dark font-medium"
                />
                <div className="absolute inset-y-0 right-0 flex items-center px-4 bg-gray-100 border-l border-gray-200 rounded-r-md text-gray-500 font-bold text-sm">
                  kg
                </div>
              </div>
            </div>

            <div>
              <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-gray-400" /> Tanggal Target Panen
              </label>
              <input
                type="date"
                required
                value={tanggalTargetPanen}
                onChange={(e) => setTanggalTargetPanen(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 py-3.5 px-4 rounded-md outline-none focus:border-primary-dark font-medium"
              />
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-4 flex gap-3 border border-blue-100">
            <Info className="w-5 h-5 text-blue-500 shrink-0" />
            <p className="text-sm font-medium text-blue-800">
              Koperasi akan menggunakan data estimasi panen Anda untuk menawarkan komoditas ke calon pembeli skala besar (B2B).
            </p>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 rounded-xl p-4 flex gap-3 border border-red-100">
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
            <p className="text-sm font-medium text-red-600">{error}</p>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full font-bold text-lg py-4 rounded-md transition-all shadow-md flex items-center justify-center gap-2 ${isSubmitting
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-primary hover:bg-primary-dark text-white'
            }`}
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
              Mendaftarkan...
            </>
          ) : (
            'Daftarkan Tanaman'
          )}
        </button>
      </form>
    </div>
  );
}
