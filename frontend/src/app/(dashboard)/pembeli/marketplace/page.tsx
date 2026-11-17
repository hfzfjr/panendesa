"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Info, ArrowLeft } from "lucide-react";
import { MarketplaceFilter } from "../../../../components/pembeli/MarketplaceFilter";
import { MarketplaceResults } from "../../../../components/pembeli/MarketplaceResults";
import { ErrorState } from "../../../../components/ui/ErrorState";
import { apiClient } from "../../../../lib/api-client";

interface Komoditas {
  id: number;
  nama_komoditas: string;
  satuan: string;
  kategori: string | null;
}

interface HargaAcuan {
  komoditas_id: number;
  harga: number;
}

function MarketplaceContent() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [desaData, setDesaData] = useState<any[]>([]);
  const [komoditasList, setKomoditasList] = useState<Komoditas[]>([]);
  const [hargaAcuanList, setHargaAcuanList] = useState<HargaAcuan[]>([]);
  const [categories, setCategories] = useState<string[]>(["Semua"]);
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");

  const searchParams = useSearchParams();
  const query = searchParams.get("q") || searchParams.get("category") || "Semua Komoditas";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [desaRes, komoditasRes, hargaAcuanRes] = await Promise.all([
          apiClient.getDesa(),
          apiClient.getKomoditas(),
          apiClient.getHargaAcuan(),
        ]);

        if (desaRes.success && desaRes.data) {
          setDesaData(desaRes.data);
        }

        if (komoditasRes.success && komoditasRes.data) {
          setKomoditasList(komoditasRes.data);

          // Extract unique categories
          const uniqueCategories = Array.from(
            new Set(komoditasRes.data.map((k: Komoditas) => k.kategori).filter(Boolean))
          ) as string[];
          setCategories(["Semua", ...uniqueCategories]);
        }

        if (hargaAcuanRes.success && hargaAcuanRes.data) {
          setHargaAcuanList(hargaAcuanRes.data);
        }
      } catch (err) {
        setError('Terjadi kesalahan saat mengambil data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    // Filter komoditas based on category
    if (category === "Semua") {
      // Fetch all komoditas again
      apiClient.getKomoditas().then((res) => {
        if (res.success) setKomoditasList(res.data);
      });
    } else {
      // Fetch komoditas by category
      apiClient.getKomoditas(category).then((res) => {
        if (res.success) setKomoditasList(res.data);
      });
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 pt-8 pb-24">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-10 bg-gray-200 rounded mb-6 w-64"></div>
            <div className="h-16 bg-gray-200 rounded-2xl mb-8"></div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="aspect-square bg-gray-200 rounded-2xl"></div>
              <div className="aspect-square bg-gray-200 rounded-2xl"></div>
              <div className="aspect-square bg-gray-200 rounded-2xl"></div>
              <div className="aspect-square bg-gray-200 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gray-50 pt-8 pb-24">
        <div className="max-w-[1200px] mx-auto px-4">
          <Link href="/pembeli" className="inline-flex items-center gap-2 text-gray-700 hover:text-primary-dark font-medium mb-8 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            Kembali
          </Link>
          <ErrorState message={error} onRetry={() => window.location.reload()} />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f3f4f5] pt-6 pb-24">
      <div className="max-w-[1200px] mx-auto px-4">

        {/* Back Button */}
        <Link href="/pembeli" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary-dark font-bold mb-6 transition-colors">
          <ArrowLeft className="w-5 h-5" />
          Kembali ke Beranda
        </Link>

        {/* Page Title / Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
            Menampilkan hasil untuk: <span className="text-primary-dark">"{query}"</span>
          </h1>
          <p className="text-gray-500 mt-1">Ditemukan {komoditasList.length} komoditas segar langsung dari petani.</p>
        </div>

        {/* Content: Filters and Results */}
        <div className="w-full">
          {/* Components */}
          <MarketplaceFilter
            desaData={desaData}
            categories={categories}
            onCategoryChange={handleCategoryChange}
          />

          {/* Disclaimer Box */}
          <div className="w-full bg-white rounded-xl p-4 flex gap-3 text-sm text-gray-600 border border-gray-100 shadow-sm mb-6 items-start">
            <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
            <p>
              <strong>Harga Transparan:</strong> Estimasi berbasis riset, bukan data transaksi real-time. Harga dapat berubah sesuai kesepakatan dengan Koperasi Desa.
            </p>
          </div>

          <MarketplaceResults
            komoditasList={komoditasList}
            desaData={desaData}
            hargaAcuanList={hargaAcuanList}
            loading={loading}
          />
        </div>

      </div>
    </main>
  );
}

export default function MarketplacePage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Memuat...</div>}>
      <MarketplaceContent />
    </Suspense>
  );
}
