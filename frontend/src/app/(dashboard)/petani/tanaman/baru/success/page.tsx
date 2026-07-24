import React from "react";
import Link from "next/link";
import { CheckCircle2, FileText, Eye, LayoutDashboard, MapPin, ClipboardList } from "lucide-react";

export default function TanamBaruSuccessPage() {
  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8 md:space-y-10 pb-24 md:pb-8 text-center pt-8 md:pt-12">
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="w-24 h-24 md:w-32 md:h-32 bg-green-100 text-primary-dark rounded-full flex items-center justify-center mb-2 animate-bounce-slow shadow-sm">
          <CheckCircle2 className="w-16 h-16 md:w-20 md:h-20" />
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-primary-dark tracking-tight">
          Tanam Baru Berhasil!
        </h1>
        <p className="text-gray-600 font-medium text-lg max-w-md mx-auto leading-snug">
          Data penanaman Anda telah berhasil tercatat dalam sistem PanenDesa.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm flex flex-col h-full">
          <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
            <FileText className="w-6 h-6 text-primary-dark" />
            <h2 className="text-xl font-bold text-gray-900">Ringkasan Tanam</h2>
          </div>

          <div className="space-y-5 flex-1">
            <div className="flex justify-between items-center border-b border-gray-100 pb-3 border-dashed">
              <span className="text-gray-500 font-medium">Komoditas</span>
              <span className="font-bold text-gray-900">Cabai Merah</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-100 pb-3 border-dashed">
              <span className="text-gray-500 font-medium">Varietas</span>
              <span className="font-bold text-gray-900">Cabai Keriting</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-100 pb-3 border-dashed">
              <span className="text-gray-500 font-medium">Metode Tanam</span>
              <span className="font-bold text-primary-dark flex items-center gap-1">
                🌱 Organik
              </span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-100 pb-3 border-dashed">
              <span className="text-gray-500 font-medium">Perkiraan Panen</span>
              <span className="font-bold text-gray-900">Agustus 2026</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-100 pb-3 border-dashed">
              <span className="text-gray-500 font-medium">Estimasi Hasil</span>
              <span className="font-bold text-gray-900">1.200 Kg</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-100 pb-3 border-dashed">
              <span className="text-gray-500 font-medium">Luas Lahan</span>
              <span className="font-bold text-gray-900">0.5 ha</span>
            </div>
            <div className="flex justify-between items-center pt-1">
              <span className="text-gray-500 font-medium">Lokasi</span>
              <span className="font-bold text-gray-900 flex items-center gap-1">
                <MapPin className="w-4 h-4 text-primary-dark" />
                Sawah Blok C
              </span>
            </div>
          </div>
        </div>
        <div className="bg-primary-dark rounded-3xl p-6 shadow-xl shadow-green-900/10 text-white flex flex-col h-full relative overflow-hidden">
          <div className="absolute -right-8 -bottom-8 opacity-10">
            <ClipboardList className="w-48 h-48" />
          </div>
          <div className="flex items-center gap-2 mb-6 border-b border-green-800 pb-4 relative z-10">
            <CheckCircle2 className="w-6 h-6 text-green-200" />
            <h2 className="text-xl font-bold text-white">Langkah Selanjutnya</h2>
          </div>

          <div className="space-y-6 relative z-10">
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-green-100 text-primary-dark rounded-full flex items-center justify-center font-black shrink-0">1</div>
              <div>
                <h3 className="font-bold text-green-100 mb-1">Buat laporan pertama</h3>
                <p className="text-green-50/80 text-sm leading-relaxed">Catat kondisi awal bibit dan media tanam hari ini.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-green-800 text-green-100 rounded-full flex items-center justify-center font-black shrink-0">2</div>
              <div>
                <h3 className="font-bold text-green-100 mb-1">Dokumentasikan pertumbuhan</h3>
                <p className="text-green-50/80 text-sm leading-relaxed">Unggah foto perkembangan setiap minggu untuk dianalisis.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-green-800 text-green-100 rounded-full flex items-center justify-center font-black shrink-0">3</div>
              <div>
                <h3 className="font-bold text-green-100 mb-1">Lapor stok saat panen</h3>
                <p className="text-green-50/80 text-sm leading-relaxed">Pasarkan hasil panen Anda secara langsung ke pembeli.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
      <div className="flex flex-col md:flex-row justify-center gap-4 pt-6 max-w-3xl mx-auto">
        <Link
          href="/petani/laporan/baru"
          className="flex-1 bg-primary-dark text-white font-bold py-4 px-6 rounded-2xl shadow-lg flex items-center justify-center gap-2 hover:bg-green-800 transition-colors"
        >
          <FileText className="w-5 h-5" />
          <span className="text-lg">Buat Laporan Pertama</span>
        </Link>
        <Link
          href="/petani/tanaman/1"
          className="flex-1 bg-white text-primary-dark border-2 border-primary-dark font-bold py-4 px-6 rounded-2xl shadow-sm flex items-center justify-center gap-2 hover:bg-green-50 transition-colors"
        >
          <Eye className="w-5 h-5" />
          <span className="text-lg">Lihat Detail Tanaman</span>
        </Link>
      </div>
      <div className="flex justify-center mt-4">
        <Link
          href="/petani"
          className="w-full md:w-auto bg-gray-100 text-gray-700 font-bold py-4 px-12 rounded-2xl flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors"
        >
          <LayoutDashboard className="w-5 h-5" />
          <span className="text-lg">Kembali ke Halaman Utama</span>
        </Link>
      </div>

    </div>
  );
}
