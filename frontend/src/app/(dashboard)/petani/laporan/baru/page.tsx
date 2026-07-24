"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Camera, ChevronLeft, ChevronRight, UploadCloud, Leaf, AlertCircle, Save } from "lucide-react";

export default function LaporanKondisiBaruPage() {
  const [komoditas, setKomoditas] = useState("");
  const [kondisi, setKondisi] = useState("");
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
        <div className="bg-white p-8 md:p-12 rounded-md shadow-lg border border-gray-100 text-center flex flex-col items-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-primary-dark mb-6">
            <Save className="w-12 h-12" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Laporan Tersimpan!</h2>
          <p className="text-gray-600 text-lg mb-8 max-w-md">
            Terima kasih telah memperbarui kondisi tanaman Anda. Ini akan membantu meningkatkan Skor Kepercayaan Anda.
          </p>
          <Link href="/petani" className="bg-primary-dark hover:bg-primary text-white font-bold px-8 py-4 rounded-md transition-colors shadow-md w-full sm:w-auto">
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto space-y-6 pb-32 md:pb-8">
      {/* Header */}
      <div className="flex items-center gap-4 border-b border-gray-100 pb-4 mb-6">
        <Link href="/petani" className="w-10 h-10 bg-white border border-gray-200 rounded-md flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors mt-2">
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <div>
          <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500 font-medium mb-1">
            <Link href="/petani" className="hover:text-primary-dark">Halaman Utama</Link>
            <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
            <span className="text-gray-900 font-bold">Lapor Kondisi</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">Lapor Kondisi</h1>
          <p className="text-gray-500 font-medium hidden md:block">Perbarui status tanaman Anda secara berkala.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Upload Foto */}
        <div className="bg-white rounded-md p-6 md:p-8 border border-gray-100 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Camera className="w-5 h-5 text-primary-dark" />
            Foto Kondisi Terkini
          </h2>
          <div className="border-2 border-dashed border-gray-300 rounded-md bg-gray-50 p-8 flex flex-col items-center justify-center text-center hover:bg-gray-100 transition-colors cursor-pointer group">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-400 group-hover:text-primary-dark group-hover:scale-110 transition-all mb-4">
              <UploadCloud className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-gray-700 text-lg mb-1">Unggah Foto (Opsional)</h3>
            <p className="text-gray-500 text-sm max-w-xs">
              Klik untuk memilih atau tarik file foto ke area ini (Maks. 5MB)
            </p>
          </div>
        </div>

        {/* Form Detail */}
        <div className="bg-white rounded-md p-6 md:p-8 border border-gray-100 shadow-sm space-y-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Leaf className="w-5 h-5 text-primary-dark" />
            Informasi Laporan
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Pilih Tanaman</label>
              <select 
                value={komoditas} 
                onChange={(e) => setKomoditas(e.target.value)}
                required
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 py-3.5 px-4 rounded-md outline-none focus:border-primary-dark font-medium"
              >
                <option value="" disabled>-- Pilih Tanaman yang Sedang Ditanam --</option>
                <option value="1">Cabai Merah (Petak 1)</option>
                <option value="2">Bawang Merah (Petak 2)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Status Pertumbuhan</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {['Normal', 'Kekeringan', 'Terserang Hama', 'Siap Panen'].map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setKondisi(status)}
                    className={`py-3 px-2 rounded-md border text-sm font-bold transition-all ${
                      kondisi === status 
                        ? 'bg-primary-dark border-primary-dark text-white shadow-md' 
                        : 'bg-white border-gray-200 text-gray-600 hover:border-primary-dark'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center justify-between">
                Catatan Tambahan
                <span className="text-gray-400 font-normal text-xs">Opsional</span>
              </label>
              <textarea 
                rows={4}
                placeholder="Ceritakan detail kondisi tanaman Anda di sini..."
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 py-3 px-4 rounded-md outline-none focus:border-primary-dark font-medium resize-none"
              ></textarea>
            </div>
          </div>

          <div className="bg-warning/10 rounded-md p-4 flex gap-3 border border-warning/20">
            <AlertCircle className="w-5 h-5 text-warning shrink-0" />
            <p className="text-sm font-medium text-neutral-900">
              Laporan rutin akan meningkatkan nilai <b>Skor Kepercayaan</b> Anda di mata pembeli.
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
              : 'bg-primary-dark hover:bg-primary text-white'
          }`}
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
              Menyimpan...
            </>
          ) : (
            'Kirim Laporan'
          )}
        </button>
      </form>
    </div>
  );
}