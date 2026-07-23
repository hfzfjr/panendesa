"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Leaf, Tractor, Wheat, Apple, MoreHorizontal, Rocket } from "lucide-react";

export default function TanamBaruPage() {
  const [komoditas, setKomoditas] = useState<string | null>("Cabai Merah");
  const [pengingat, setPengingat] = useState<string>("3 Hari");
  const [metodeTanam, setMetodeTanam] = useState<string>("Organik");

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6 pb-32 md:pb-8">
      <div className="pt-2">
        <Link href="/petani/tanaman" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 font-bold mb-6 transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <span>Kembali ke Tanaman Saya</span>
        </Link>
        <h1 className="text-2xl md:text-3xl font-extrabold text-primary-dark uppercase tracking-tight mb-2">
          MULAI SESI TANAM BARU
        </h1>
        <p className="text-gray-600 font-medium text-sm md:text-base">
          Daftarkan tanaman yang baru Anda tanam untuk mulai mendokumentasikan prosesnya, meningkatkan transparansi, dan nilai jual hasil panen Anda.
        </p>
      </div>

      <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-1">Pilih Komoditas</h2>
          <p className="text-gray-500 text-sm font-medium mb-6">Pilih jenis tanaman yang akan Anda mulai hari ini.</p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <button
              type="button"
              onClick={() => setKomoditas("Cabai Merah")}
              className={`relative flex flex-col items-center justify-center gap-3 p-5 rounded-2xl border-2 transition-all ${komoditas === "Cabai Merah" ? 'border-primary-dark bg-green-50 ring-4 ring-green-500/20' : 'border-gray-200 hover:border-gray-300 bg-white'}`}
            >
              {komoditas === "Cabai Merah" && (
                <div className="absolute -top-3 bg-primary-dark text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">Terpilih</div>
              )}
              <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center">
                <Leaf className="w-7 h-7 text-red-500" />
              </div>
              <div className="text-center">
                <span className="block font-bold text-gray-900">Cabai Merah</span>
                <span className="text-xs text-gray-500 font-medium">Rp 45.000/kg</span>
              </div>
            </button>
            <button
              type="button"
              onClick={() => setKomoditas("Bawang Merah")}
              className={`relative flex flex-col items-center justify-center gap-3 p-5 rounded-2xl border-2 transition-all ${komoditas === "Bawang Merah" ? 'border-primary-dark bg-green-50 ring-4 ring-green-500/20' : 'border-gray-200 hover:border-gray-300 bg-white'}`}
            >
              {komoditas === "Bawang Merah" && (
                <div className="absolute -top-3 bg-primary-dark text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">Terpilih</div>
              )}
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
                <Leaf className="w-7 h-7 text-primary-dark" />
              </div>
              <div className="text-center">
                <span className="block font-bold text-gray-900">Bawang Merah</span>
                <span className="text-xs text-gray-500 font-medium">Rp 30.000/kg</span>
              </div>
            </button>
            <button
              type="button"
              onClick={() => setKomoditas("Jagung")}
              className={`relative flex flex-col items-center justify-center gap-3 p-5 rounded-2xl border-2 transition-all ${komoditas === "Jagung" ? 'border-primary-dark bg-green-50 ring-4 ring-green-500/20' : 'border-gray-200 hover:border-gray-300 bg-white'}`}
            >
              {komoditas === "Jagung" && (
                <div className="absolute -top-3 bg-primary-dark text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">Terpilih</div>
              )}
              <div className="w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center">
                <Wheat className="w-7 h-7 text-yellow-600" />
              </div>
              <div className="text-center">
                <span className="block font-bold text-gray-900">Jagung</span>
                <span className="text-xs text-gray-500 font-medium">Rp 6.000/kg</span>
              </div>
            </button>
            <button
              type="button"
              onClick={() => setKomoditas("Beras")}
              className={`relative flex flex-col items-center justify-center gap-3 p-5 rounded-2xl border-2 transition-all ${komoditas === "Beras" ? 'border-primary-dark bg-green-50 ring-4 ring-green-500/20' : 'border-gray-200 hover:border-gray-300 bg-white'}`}
            >
              {komoditas === "Beras" && (
                <div className="absolute -top-3 bg-primary-dark text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">Terpilih</div>
              )}
              <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center">
                <Tractor className="w-7 h-7 text-green-600" />
              </div>
              <div className="text-center">
                <span className="block font-bold text-gray-900">Beras</span>
                <span className="text-xs text-gray-500 font-medium">Rp 14.000/kg</span>
              </div>
            </button>
            <button
              type="button"
              onClick={() => setKomoditas("Tomat")}
              className={`relative flex flex-col items-center justify-center gap-3 p-5 rounded-2xl border-2 transition-all ${komoditas === "Tomat" ? 'border-primary-dark bg-green-50 ring-4 ring-green-500/20' : 'border-gray-200 hover:border-gray-300 bg-white'}`}
            >
              {komoditas === "Tomat" && (
                <div className="absolute -top-3 bg-primary-dark text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">Terpilih</div>
              )}
              <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center">
                <Apple className="w-7 h-7 text-red-500" />
              </div>
              <div className="text-center">
                <span className="block font-bold text-gray-900">Tomat</span>
                <span className="text-xs text-gray-500 font-medium">Rp 9.000/kg</span>
              </div>
            </button>
            <button
              type="button"
              onClick={() => setKomoditas("Lainnya")}
              className={`relative flex flex-col items-center justify-center gap-3 p-5 rounded-2xl border-2 transition-all ${komoditas === "Lainnya" ? 'border-primary-dark bg-green-50 ring-4 ring-green-500/20' : 'border-gray-200 hover:border-gray-300 bg-white'}`}
            >
              {komoditas === "Lainnya" && (
                <div className="absolute -top-3 bg-primary-dark text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">Terpilih</div>
              )}
              <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center">
                <MoreHorizontal className="w-7 h-7 text-gray-500" />
              </div>
              <div className="text-center">
                <span className="block font-bold text-gray-900">Lainnya</span>
                <span className="text-xs text-gray-500 font-medium">Ketik Sendiri</span>
              </div>
            </button>
          </div>
        </div>
        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">Detail Tanaman</h2>
            <p className="text-gray-500 text-sm font-medium">Lengkapi informasi dasar penanaman.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-gray-700 font-bold text-sm">Varietas</label>
              <select className="w-full h-14 bg-gray-50 border-2 border-gray-200 rounded-xl px-4 text-lg font-medium text-gray-900 focus:border-primary-dark focus:ring-0 outline-none transition-colors">
                <option>Cabai Keriting - CMK 01</option>
                <option>Cabai Rawit</option>
                <option>Cabai Besar</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-gray-700 font-bold text-sm">Tanggal Tanam</label>
              <input
                type="date"
                className="w-full h-14 bg-gray-50 border-2 border-gray-200 rounded-xl px-4 text-lg font-medium text-gray-900 focus:border-primary-dark focus:ring-0 outline-none transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-gray-700 font-bold text-sm">Luas Lahan</label>
              <div className="relative">
                <input
                  type="number"
                  placeholder="0.00"
                  className="w-full h-14 bg-gray-50 border-2 border-gray-200 rounded-xl px-4 pr-16 text-lg font-medium text-gray-900 focus:border-primary-dark focus:ring-0 outline-none transition-colors"
                />
                <div className="absolute right-0 top-0 h-14 px-4 flex items-center justify-center text-gray-500 font-bold border-l-2 border-gray-200 bg-gray-100 rounded-r-xl">
                  ha
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-gray-700 font-bold text-sm">Lokasi Lahan</label>
              <input
                type="text"
                placeholder="Contoh: Sawah Blok A2, Kec. Karangploso"
                className="w-full h-14 bg-gray-50 border-2 border-gray-200 rounded-xl px-4 text-lg font-medium text-gray-900 focus:border-primary-dark focus:ring-0 outline-none transition-colors placeholder:text-gray-400 placeholder:text-base placeholder:font-normal"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-gray-700 font-bold text-sm">Perkiraan Panen (Bulan/Tahun)</label>
              <input
                type="month"
                className="w-full h-14 bg-gray-50 border-2 border-gray-200 rounded-xl px-4 text-lg font-medium text-gray-900 focus:border-primary-dark focus:ring-0 outline-none transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-gray-700 font-bold text-sm">Estimasi Hasil Panen</label>
              <div className="relative">
                <input
                  type="number"
                  placeholder="0"
                  className="w-full h-14 bg-gray-50 border-2 border-gray-200 rounded-xl px-4 pr-16 text-lg font-medium text-gray-900 focus:border-primary-dark focus:ring-0 outline-none transition-colors"
                />
                <div className="absolute right-0 top-0 h-14 px-4 flex items-center justify-center text-gray-500 font-bold border-l-2 border-gray-200 bg-gray-100 rounded-r-xl">
                  Kg
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">Catatan Awal</h2>
            <p className="text-gray-500 text-sm font-medium">Informasi tambahan mengenai kondisi awal.</p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-gray-700 font-bold text-sm mb-2">Metode Tanam</label>
              <div className="flex flex-col md:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => setMetodeTanam("Organik")}
                  className={`flex-1 py-4 font-bold text-lg rounded-2xl border-2 transition-all ${metodeTanam === "Organik" ? 'bg-primary-dark text-white border-primary-dark shadow-md' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
                >
                  🌱 Organik
                </button>
                <button
                  type="button"
                  onClick={() => setMetodeTanam("Biasa / Kimia")}
                  className={`flex-1 py-4 font-bold text-lg rounded-2xl border-2 transition-all ${metodeTanam === "Biasa / Kimia" ? 'bg-primary-dark text-white border-primary-dark shadow-md' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
                >
                  🧪 Biasa / Kimia
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-gray-700 font-bold text-sm">Sumber Bibit</label>
              <select className="w-full h-14 bg-gray-50 border-2 border-gray-200 rounded-xl px-4 text-lg font-medium text-gray-900 focus:border-primary-dark focus:ring-0 outline-none transition-colors">
                <option>Mandiri (Beli Sendiri)</option>
                <option>Bantuan Pemerintah / Desa</option>
                <option>Koperasi Petani</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-gray-700 font-bold text-sm">Kondisi Lahan</label>
              <select className="w-full h-14 bg-gray-50 border-2 border-gray-200 rounded-xl px-4 text-lg font-medium text-gray-900 focus:border-primary-dark focus:ring-0 outline-none transition-colors">
                <option>Sudah diolah (Siap tanam)</option>
                <option>Masih perlu digemburkan</option>
                <option>Baru selesai dibersihkan</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-gray-700 font-bold text-sm">Catatan Tambahan (Bila Ada)</label>
              <textarea
                rows={4}
                placeholder="Tuliskan catatan khusus atau kendala awal jika ada..."
                className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl p-4 text-lg font-medium text-gray-900 focus:border-primary-dark focus:ring-0 outline-none transition-colors placeholder:text-gray-400 placeholder:text-base placeholder:font-normal"
              ></textarea>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">Pengingat Laporan</h2>
            <p className="text-gray-500 text-sm font-medium">Seberapa sering Anda ingin menerima pengingat pengisian log harian?</p>
          </div>

          <div className="flex flex-col md:flex-row gap-3">
            <button
              type="button"
              onClick={() => setPengingat("3 Hari")}
              className={`flex-1 py-4 font-bold text-lg rounded-2xl border-2 transition-all ${pengingat === "3 Hari" ? 'bg-primary-dark text-white border-primary-dark shadow-md' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
            >
              Setiap 3 Hari
            </button>
            <button
              type="button"
              onClick={() => setPengingat("5 Hari")}
              className={`flex-1 py-4 font-bold text-lg rounded-2xl border-2 transition-all ${pengingat === "5 Hari" ? 'bg-primary-dark text-white border-primary-dark shadow-md' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
            >
              Setiap 5 Hari
            </button>
            <button
              type="button"
              onClick={() => setPengingat("7 Hari")}
              className={`flex-1 py-4 font-bold text-lg rounded-2xl border-2 transition-all ${pengingat === "7 Hari" ? 'bg-primary-dark text-white border-primary-dark shadow-md' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
            >
              Setiap 7 Hari
            </button>
          </div>
        </div>
        <div className="fixed bottom-0 left-0 right-0 md:static bg-white md:bg-transparent border-t md:border-none border-gray-200 p-4 md:p-0 z-40 md:flex md:justify-end md:gap-4 md:mt-8 pb-safe shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.1)] md:shadow-none">
          <div className="flex flex-col-reverse md:flex-row gap-3 max-w-4xl mx-auto w-full md:w-auto">
            <Link
              href="/petani/tanaman"
              className="w-full md:w-auto flex items-center justify-center py-4 px-8 font-bold text-gray-500 hover:text-gray-900 bg-gray-100 md:bg-white rounded-2xl transition-colors"
            >
              Batal
            </Link>
            <button className="w-full md:w-auto flex items-center justify-center gap-2 py-4 px-10 font-bold text-white bg-primary-dark hover:bg-green-800 rounded-2xl transition-colors shadow-lg">
              <Rocket className="w-5 h-5" />
              <span className="text-lg">Mulai Sesi Tanam</span>
            </button>
          </div>
        </div>

      </form>

    </div>
  );
}
