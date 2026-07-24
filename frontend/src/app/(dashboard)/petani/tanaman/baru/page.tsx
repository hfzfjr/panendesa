"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Sprout, Map, Calendar, Scale, Save, Info } from "lucide-react";

export default function TambahTanamanPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate network request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="p-4 md:p-8 max-w-3xl mx-auto min-h-[70vh] flex items-center justify-center">
        <div className="bg-white p-8 md:p-12 rounded-lg shadow-lg border border-gray-100 text-center flex flex-col items-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-primary-dark mb-6">
            <Save className="w-12 h-12" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Tanaman Berhasil Ditambahkan!</h2>
          <p className="text-gray-600 text-lg mb-8 max-w-md">
            Komoditas baru Anda telah terdaftar dalam sistem dan akan dipantau oleh Koperasi.
          </p>
          <Link href="/petani/tanaman" className="bg-primary hover:bg-primary-dark text-white font-bold px-8 py-4 rounded-md transition-colors shadow-md w-full sm:w-auto">
            Lihat Daftar Tanaman
          </Link>
        </div>
      </div>
    );
  }

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
              <select required className="w-full bg-gray-50 border border-gray-200 text-gray-900 py-3.5 px-4 rounded-md outline-none focus:border-primary-dark font-medium">
                <option value="" disabled selected>-- Pilih Jenis Komoditas --</option>
                <option value="cabai">Cabai Merah</option>
                <option value="bawang">Bawang Merah</option>
                <option value="tomat">Tomat</option>
                <option value="padi">Padi</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-1.5">
                  <Map className="w-4 h-4 text-gray-400" /> Luas Lahan Tanam
                </label>
                <div className="relative">
                  <input 
                    type="number" 
                    required 
                    placeholder="Contoh: 1000"
                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 py-3.5 pl-4 pr-16 rounded-md outline-none focus:border-primary-dark font-medium"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center px-4 bg-gray-100 border-l border-gray-200 rounded-r-md text-gray-500 font-bold text-sm">
                    m²
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-1.5">
                  <Scale className="w-4 h-4 text-gray-400" /> Estimasi Jumlah Panen
                </label>
                <div className="relative">
                  <input 
                    type="number" 
                    required 
                    placeholder="Contoh: 500"
                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 py-3.5 pl-4 pr-16 rounded-md outline-none focus:border-primary-dark font-medium"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center px-4 bg-gray-100 border-l border-gray-200 rounded-r-md text-gray-500 font-bold text-sm">
                    kg
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-gray-400" /> Tanggal Target Panen
              </label>
              <input 
                type="date" 
                required 
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 py-3.5 px-4 rounded-md outline-none focus:border-primary-dark font-medium"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center justify-between">
                Alamat Lahan Tanam
              </label>
              <textarea 
                rows={2}
                required
                placeholder="Misal: Jl. Raya Desa Sukamaju RT 02 RW 01"
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 py-3 px-4 rounded-md outline-none focus:border-primary-dark font-medium resize-none"
              ></textarea>
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center justify-between">
                Catatan Lokasi Petak
                <span className="text-gray-400 font-normal text-xs">Opsional</span>
              </label>
              <textarea 
                rows={3}
                placeholder="Misal: Petak 3 dekat sungai"
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 py-3 px-4 rounded-md outline-none focus:border-primary-dark font-medium resize-none"
              ></textarea>
            </div>

          </div>

          <div className="bg-blue-50 rounded-xl p-4 flex gap-3 border border-blue-100">
            <Info className="w-5 h-5 text-blue-500 shrink-0" />
            <p className="text-sm font-medium text-blue-800">
              Koperasi akan menggunakan data estimasi panen Anda untuk menawarkan komoditas ke calon pembeli skala besar (B2B).
            </p>
          </div>
        </div>

        {/* Submit */}
        <button 
          type="submit" 
          disabled={isSubmitting}
          className={`w-full font-bold text-lg py-4 rounded-md transition-all shadow-md flex items-center justify-center gap-2 ${
            isSubmitting 
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
