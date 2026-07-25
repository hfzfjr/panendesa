"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronRight,
  MapPin,
  Camera,
  Sparkles,
  Edit2,
  Save,
  AlertCircle,
  Upload
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
}

export default function IntakeBaruPage() {
  const router = useRouter();
  const [selectedGrade, setSelectedGrade] = useState("A");
  const [selectedStokId, setSelectedStokId] = useState<number | null>(null);
  const [beratAktual, setBeratAktual] = useState("");
  const [foto, setFoto] = useState<File | null>(null);
  const [fotoPreview, setFotoPreview] = useState<string | null>(null);
  const [stokList, setStokList] = useState<StokEstimasi[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<{ code?: number; message?: string } | null>(null);
  const [success, setSuccess] = useState(false);

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
          const pendingStok = response.data.filter((item: StokEstimasi) => item.status === 'menunggu_panen');
          setStokList(pendingStok);
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Client-side validation
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!validTypes.includes(file.type)) {
      setError({ message: 'Format file harus JPG atau PNG' });
      return;
    }

    if (file.size > maxSize) {
      setError({ message: 'Ukuran file maksimal 10MB' });
      return;
    }

    setFoto(file);
    setError(null);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setFotoPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedStokId || !foto || !beratAktual) {
      setError({ message: 'Mohon lengkapi semua data yang diperlukan' });
      return;
    }

    const beratNum = parseFloat(beratAktual);
    if (isNaN(beratNum) || beratNum <= 0) {
      setError({ message: 'Berat aktual harus lebih dari 0' });
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('stok_estimasi_id', selectedStokId.toString());
      formData.append('foto', foto);
      formData.append('berat_aktual_kg', beratNum.toString());

      if (selectedGrade !== 'A') {
        formData.append('grade_override_manual', selectedGrade);
      }

      const response = await apiClient.postIntakeGrading(formData);

      if (response.success) {
        setSuccess(true);
        setTimeout(() => {
          router.push('/kopdes/penerimaan');
        }, 2000);
      } else {
        setError({ message: response.error || 'Gagal submit intake grading' });
      }
    } catch (err) {
      setError({ message: 'Terjadi kesalahan koneksi' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 md:space-y-8">
        <div className="h-8 bg-gray-200 rounded animate-pulse w-64" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="h-24 bg-gray-200 rounded-2xl animate-pulse" />
          <div className="h-24 bg-gray-200 rounded-2xl animate-pulse" />
        </div>
      </div>
    );
  }

  if (error && !isLoading) {
    return (
      <div className="p-4 md:p-8 max-w-7xl mx-auto">
        <ErrorState code={error.code} message={error.message} onRetry={() => window.location.reload()} />
      </div>
    );
  }

  if (success) {
    return (
      <div className="p-4 md:p-8 max-w-7xl mx-auto">
        <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Save className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-green-800 mb-2">Intake Berhasil Disimpan!</h2>
          <p className="text-green-600">Mengalihkan ke halaman penerimaan...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 md:space-y-8 pb-32 md:pb-8 min-h-screen">

      {/* Header & Breadcrumbs */}
      <div>
        <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500 font-medium mb-2">
          <Link href="/kopdes" className="hover:text-primary-dark">Halaman Utama</Link>
          <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
          <Link href="/kopdes/penerimaan" className="hover:text-primary-dark">Penerimaan</Link>
          <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
          <span className="text-gray-900 font-bold">Intake Baru</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-primary-dark tracking-tight mb-1">
          Intake & Grading
        </h1>
        <p className="text-gray-500 font-medium text-sm md:text-base">
          Kelola seluruh permintaan dan pengiriman komoditas desa.
        </p>
      </div>

      {/* Top Section: Pilih Stok Estimasi & Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div className="bg-white p-5 md:p-6 border border-gray-200 rounded-2xl shadow-sm">
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">PILIH STOK ESTIMASI</label>
          <select
            className="w-full bg-white border border-gray-300 text-gray-900 py-3.5 px-4 rounded-xl outline-none focus:border-primary-dark font-medium shadow-sm appearance-none"
            value={selectedStokId || ""}
            onChange={(e) => setSelectedStokId(e.target.value ? parseInt(e.target.value) : null)}
          >
            <option value="">Pilih stok estimasi...</option>
            {stokList.map((stok) => (
              <option key={stok.id} value={stok.id}>
                Petani #{stok.petani_id} - Komoditas #{stok.komoditas_id} - {stok.jumlah_kg} kg
              </option>
            ))}
          </select>
          {stokList.length === 0 && (
            <p className="text-xs text-gray-500 mt-2">Tidak ada stok estimasi dengan status "menunggu_panen"</p>
          )}
        </div>

        <div className="bg-white p-5 md:p-6 border border-gray-200 rounded-2xl shadow-sm">
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">INFO STOK</label>
          {selectedStokId ? (() => {
            const selectedStok = stokList.find(s => s.id === selectedStokId);
            return selectedStok ? (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-primary-dark" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">Petani #{selectedStok.petani_id}</p>
                    <p className="text-gray-500 text-xs">Komoditas #{selectedStok.komoditas_id}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Estimasi: <span className="font-bold text-primary-dark">{selectedStok.jumlah_kg.toLocaleString('id-ID', { maximumFractionDigits: 2 })} kg</span>
                </p>
                <p className="text-sm text-gray-600">
                  Target Panen: <span className="font-medium">{selectedStok.tanggal_target_panen}</span>
                </p>
              </div>
            ) : null;
          })() : (
            <p className="text-gray-400 text-sm">Pilih stok estimasi untuk melihat detail</p>
          )}
        </div>
      </div>

      {/* Middle Section: Dokumentasi Produk */}
      <div className="bg-white p-5 md:p-6 border border-gray-200 rounded-2xl shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <h2 className="text-xl md:text-2xl font-bold text-primary-dark flex items-center gap-2">
            <Camera className="w-6 h-6" />
            Dokumentasi Produk
          </h2>
          <label className="cursor-pointer bg-primary-dark hover:bg-green-800 text-white font-bold py-3 px-6 rounded-full transition-colors flex items-center justify-center gap-2 shadow-sm text-sm">
            <Upload className="w-4 h-4" />
            UPLOAD FOTO
            <input type="file" accept="image/jpeg,image/jpg,image/png" onChange={handleFileChange} className="hidden" />
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {fotoPreview ? (
            <div className="h-48 md:h-56 bg-gray-100 rounded-xl overflow-hidden border border-gray-200 col-span-1 sm:col-span-3">
              <img src={fotoPreview} alt="Uploaded product" className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="h-48 md:h-56 bg-gray-100 rounded-xl border border-gray-200 flex items-center justify-center col-span-1 sm:col-span-3">
              <div className="text-center text-gray-400">
                <Camera className="w-12 h-12 mx-auto mb-2" />
                <p className="text-sm font-medium">Upload foto produk</p>
                <p className="text-xs">JPG/PNG, maks 10MB</p>
              </div>
            </div>
          )}
        </div>
        {error && error.message?.includes('file') && (
          <div className="mt-4 bg-red-50 border border-red-100 rounded-xl p-4 flex gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <p className="text-red-600 text-sm font-medium">{error.message}</p>
          </div>
        )}
      </div>

      {/* Bottom Grid: AI Grade vs Final Weight */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">

        {/* Left Column: AI & Override */}
        <div className="lg:col-span-8 space-y-6">

          {/* AI Recommendation */}
          <div className="bg-green-50/50 p-5 md:p-6 border border-green-100 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary-dark rounded-xl flex items-center justify-center shrink-0 shadow-md">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-primary-dark">AI Recommendation</h2>
                  <p className="text-gray-500 text-sm font-medium">Based on visual analysis</p>
                </div>
              </div>
              <div className="bg-primary-dark text-white font-black text-xl px-4 py-2 rounded-lg shadow-sm">
                GRADE A
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 md:gap-4">
              <div className="bg-white p-4 rounded-xl border border-green-50 shadow-sm">
                <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">WARNA</p>
                <p className="font-bold text-primary-dark text-base md:text-lg leading-tight">98% Solid<br />Red</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-green-50 shadow-sm">
                <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">UKURAN</p>
                <p className="font-bold text-primary-dark text-base md:text-lg leading-tight">Avg<br />12.5 cm</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-green-50 shadow-sm">
                <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">CACAT</p>
                <p className="font-bold text-primary-dark text-base md:text-lg leading-tight">0.2%<br />Minor</p>
              </div>
            </div>
          </div>

          {/* Final Quality Grade */}
          <div className="bg-white p-5 md:p-6 border border-gray-200 rounded-2xl shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">FINAL QUALITY GRADE</h3>
              <button className="flex items-center gap-1 text-xs font-bold text-primary-dark hover:underline">
                <Edit2 className="w-3 h-3" /> OVERRIDE
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <button
                onClick={() => setSelectedGrade("A")}
                className={`p-4 md:p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 ${selectedGrade === "A" ? 'border-primary-dark bg-green-50' : 'border-gray-100 hover:border-green-200'}`}
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center text-xl font-black ${selectedGrade === "A" ? 'bg-primary-dark text-white shadow-md' : 'bg-gray-200 text-gray-600'}`}>
                  A
                </div>
                <span className="text-xs font-bold text-gray-600 uppercase">PREMIUM</span>
              </button>

              <button
                onClick={() => setSelectedGrade("B")}
                className={`p-4 md:p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 ${selectedGrade === "B" ? 'border-primary-dark bg-green-50' : 'border-gray-100 hover:border-green-200'}`}
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center text-xl font-black ${selectedGrade === "B" ? 'bg-primary-dark text-white shadow-md' : 'bg-gray-200 text-gray-600'}`}>
                  B
                </div>
                <span className="text-xs font-bold text-gray-600 uppercase">REGULAR</span>
              </button>

              <button
                onClick={() => setSelectedGrade("C")}
                className={`p-4 md:p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 ${selectedGrade === "C" ? 'border-primary-dark bg-green-50' : 'border-gray-100 hover:border-green-200'}`}
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center text-xl font-black ${selectedGrade === "C" ? 'bg-primary-dark text-white shadow-md' : 'bg-gray-200 text-gray-600'}`}>
                  C
                </div>
                <span className="text-xs font-bold text-gray-600 uppercase">PROCESS</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Weight & Payment Estimation */}
        <div className="lg:col-span-4 space-y-6">

          {/* Berat Aktual */}
          <div className="bg-white p-5 md:p-6 border border-gray-200 rounded-2xl shadow-sm">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">BERAT AKTUAL (KG)</h3>
            <input
              type="number"
              step="0.01"
              min="0"
              value={beratAktual}
              onChange={(e) => setBeratAktual(e.target.value)}
              className="w-full text-5xl md:text-6xl font-black text-primary-dark tracking-tighter bg-transparent outline-none border-b-2 border-gray-200 focus:border-primary-dark transition-colors"
              placeholder="0"
            />

            {selectedStokId && (() => {
              const selectedStok = stokList.find(s => s.id === selectedStokId);
              const beratNum = parseFloat(beratAktual);
              if (selectedStok && beratNum > 0) {
                const diff = Math.abs((beratNum - selectedStok.jumlah_kg) / selectedStok.jumlah_kg) * 100;
                if (diff > 5) {
                  return (
                    <div className="bg-red-50/50 border border-red-100 rounded-xl p-4 flex gap-3 mt-4">
                      <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-red-700 text-sm mb-1">Selisih Estimasi!</h4>
                        <p className="text-red-600 text-xs font-medium leading-relaxed">
                          Berat {beratNum.toLocaleString('id-ID', { maximumFractionDigits: 2 })} kg berbeda &gt;5% dari estimasi ({selectedStok.jumlah_kg.toLocaleString('id-ID', { maximumFractionDigits: 2 })} kg).
                        </p>
                      </div>
                    </div>
                  );
                }
              }
              return null;
            })()}
          </div>

          {/* Info Card */}
          <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-5 md:p-6 shadow-sm">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">INFORMASI</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                <p className="text-gray-700">Grade akan ditentukan oleh AI Vision berdasarkan foto yang diupload</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                <p className="text-gray-700">Anda dapat override grade secara manual jika hasil AI meragukan</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                <p className="text-gray-700">Pastikan berat aktual sesuai dengan hasil timbangan</p>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Simpan Button */}
      <form onSubmit={handleSubmit}>
        <button
          type="submit"
          disabled={isSubmitting || !selectedStokId || !foto || !beratAktual}
          className="w-full bg-primary-dark hover:bg-green-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold text-base md:text-lg py-5 rounded-2xl transition-colors flex items-center justify-center gap-3 shadow-lg mt-8 mb-4"
        >
          {isSubmitting ? (
            <>
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Menyimpan...
            </>
          ) : (
            <>
              <Save className="w-6 h-6" />
              SIMPAN INTAKE LAPANGAN
            </>
          )}
        </button>
      </form>

      {error && !error.message?.includes('file') && (
        <div className="bg-red-50 border border-red-100 rounded-xl p-4 flex gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <p className="text-red-600 text-sm font-medium">{error.message}</p>
        </div>
      )}

    </div>
  );
}
