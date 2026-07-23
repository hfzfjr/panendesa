"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Camera, UploadCloud, Leaf, AlertTriangle, CheckCircle2, Droplets, FlaskConical, Shovel, Send } from "lucide-react";

export default function LaporanBaruPage() {
  const [fase, setFase] = useState<string>("Tumbuh (Vegetatif)");
  const [kondisi, setKondisi] = useState<string | null>(null);
  const [isDisiram, setIsDisiram] = useState(true);
  const [isDipupuk, setIsDipupuk] = useState(false);
  const [isDibersihkan, setIsDibersihkan] = useState(false);

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6 pb-32 md:pb-8">
      <div className="pt-2">
        <Link href="/dashboard/petani" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 font-bold mb-6 transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <span>Kembali ke Halaman Utama</span>
        </Link>
        <h1 className="text-2xl md:text-3xl font-extrabold text-primary-dark uppercase tracking-tight mb-2">
          LAPOR PERTUMBUHAN: CABAI MERAH
        </h1>
        <p className="text-gray-600 font-medium text-sm md:text-base">
          Cukup ambil foto dan pilih kondisi tanaman Anda hari ini. Tidak perlu mengetik panjang lebar.
        </p>
      </div>

      <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-primary-dark">
              <span className="font-black text-lg">1</span>
            </div>
            <h2 className="text-xl font-bold text-gray-900">Foto Tanaman Hari Ini</h2>
          </div>

          <button type="button" className="w-full border-4 border-dashed border-primary-dark/30 hover:border-primary-dark bg-green-50/50 hover:bg-green-50 rounded-2xl h-48 md:h-64 flex flex-col items-center justify-center gap-4 transition-colors group">
            <div className="w-16 h-16 bg-primary-dark text-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
              <Camera className="w-8 h-8" />
            </div>
            <div className="text-center">
              <span className="block font-bold text-primary-dark text-lg md:text-xl">Ambil Foto Langsung</span>
              <span className="text-sm text-gray-500 font-medium">Atau pilih dari galeri HP Anda</span>
            </div>
          </button>
        </div>
        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-primary-dark">
              <span className="font-black text-lg">2</span>
            </div>
            <h2 className="text-xl font-bold text-gray-900">Masuk Tahap Apa Sekarang?</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {["Bibit", "Tumbuh (Vegetatif)", "Mulai Berbunga", "Mulai Berbuah"].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setFase(item)}
                className={`py-4 px-2 font-bold text-base md:text-lg rounded-2xl border-2 transition-all ${fase === item ? 'bg-primary-dark text-white border-primary-dark shadow-md' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-primary-dark">
              <span className="font-black text-lg">3</span>
            </div>
            <h2 className="text-xl font-bold text-gray-900">Bagaimana Kondisinya?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setKondisi("Sehat")}
              className={`flex items-center gap-4 p-6 rounded-2xl border-4 transition-all ${kondisi === "Sehat" ? 'border-green-500 bg-green-50' : 'border-gray-100 hover:border-gray-200 bg-white'}`}
            >
              <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center shrink-0 shadow-md">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div className="text-left">
                <span className="block font-black text-2xl text-green-700">Sehat & Subur</span>
                <span className="text-green-600/80 font-medium text-sm">Tidak ada hama terlihat</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setKondisi("Bermasalah")}
              className={`flex items-center gap-4 p-6 rounded-2xl border-4 transition-all ${kondisi === "Bermasalah" ? 'border-red-500 bg-red-50' : 'border-gray-100 hover:border-gray-200 bg-white'}`}
            >
              <div className="w-16 h-16 bg-red-500 text-white rounded-full flex items-center justify-center shrink-0 shadow-md">
                <AlertTriangle className="w-10 h-10" />
              </div>
              <div className="text-left">
                <span className="block font-black text-2xl text-red-700">Ada Masalah</span>
                <span className="text-red-600/80 font-medium text-sm">Hama, daun kuning, layu, dll</span>
              </div>
            </button>
          </div>
          {kondisi === "Bermasalah" && (
            <div className="mt-6 p-5 bg-red-50 border-2 border-red-200 rounded-2xl">
              <label className="block font-bold text-red-900 mb-2">Ceritakan sedikit masalahnya (Opsional)</label>
              <textarea
                rows={3}
                className="w-full bg-white border-2 border-red-200 rounded-xl p-4 text-lg font-medium text-gray-900 focus:border-red-500 focus:ring-0 outline-none transition-colors"
                placeholder="Contoh: Daunnya mulai keriting dan kuning..."
              ></textarea>
            </div>
          )}
        </div>
        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-primary-dark">
              <span className="font-black text-lg">4</span>
            </div>
            <h2 className="text-xl font-bold text-gray-900">Apa yang Anda Lakukan Hari Ini?</h2>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <label className={`flex items-center justify-between p-5 rounded-2xl border-2 cursor-pointer transition-colors ${isDisiram ? 'border-primary-dark bg-green-50' : 'border-gray-200 bg-white'}`}>
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isDisiram ? 'bg-primary-dark text-white' : 'bg-gray-100 text-gray-500'}`}>
                  <Droplets className="w-6 h-6" />
                </div>
                <span className={`font-bold text-lg md:text-xl ${isDisiram ? 'text-primary-dark' : 'text-gray-700'}`}>Saya Menyiram Lahan</span>
              </div>
              <input
                type="checkbox"
                checked={isDisiram}
                onChange={() => setIsDisiram(!isDisiram)}
                className="w-8 h-8 rounded border-gray-300 text-primary-dark focus:ring-primary-dark cursor-pointer"
              />
            </label>
            <label className={`flex items-center justify-between p-5 rounded-2xl border-2 cursor-pointer transition-colors ${isDipupuk ? 'border-primary-dark bg-green-50' : 'border-gray-200 bg-white'}`}>
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isDipupuk ? 'bg-primary-dark text-white' : 'bg-gray-100 text-gray-500'}`}>
                  <FlaskConical className="w-6 h-6" />
                </div>
                <span className={`font-bold text-lg md:text-xl ${isDipupuk ? 'text-primary-dark' : 'text-gray-700'}`}>Saya Memberi Pupuk</span>
              </div>
              <input
                type="checkbox"
                checked={isDipupuk}
                onChange={() => setIsDipupuk(!isDipupuk)}
                className="w-8 h-8 rounded border-gray-300 text-primary-dark focus:ring-primary-dark cursor-pointer"
              />
            </label>
            <label className={`flex items-center justify-between p-5 rounded-2xl border-2 cursor-pointer transition-colors ${isDibersihkan ? 'border-primary-dark bg-green-50' : 'border-gray-200 bg-white'}`}>
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isDibersihkan ? 'bg-primary-dark text-white' : 'bg-gray-100 text-gray-500'}`}>
                  <Shovel className="w-6 h-6" />
                </div>
                <span className={`font-bold text-lg md:text-xl ${isDibersihkan ? 'text-primary-dark' : 'text-gray-700'}`}>Membersihkan Lahan/Gulma</span>
              </div>
              <input
                type="checkbox"
                checked={isDibersihkan}
                onChange={() => setIsDibersihkan(!isDibersihkan)}
                className="w-8 h-8 rounded border-gray-300 text-primary-dark focus:ring-primary-dark cursor-pointer"
              />
            </label>
          </div>
        </div>
        <div className="fixed bottom-0 left-0 right-0 md:static bg-white md:bg-transparent border-t md:border-none border-gray-200 p-4 md:p-0 z-40 shadow-lg md:shadow-none">
          <div className="max-w-4xl mx-auto flex gap-3">
            <button
              type="button"
              className={`w-full flex items-center justify-center gap-2 py-4 px-10 font-black text-white text-lg rounded-2xl transition-all shadow-xl ${kondisi ? 'bg-primary-dark hover:bg-green-800' : 'bg-gray-300 cursor-not-allowed shadow-none'}`}
              disabled={!kondisi}
            >
              <Send className="w-6 h-6" />
              <span>Kirim Laporan</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}