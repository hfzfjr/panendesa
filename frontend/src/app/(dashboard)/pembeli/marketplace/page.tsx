"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Info, ArrowLeft } from "lucide-react";
import { MarketplaceFilter } from "../../../../components/pembeli/MarketplaceFilter";
import { MarketplaceResults } from "../../../../components/pembeli/MarketplaceResults";
import { ErrorState } from "../../../../components/ui/ErrorState";
import { apiClient } from "../../../../lib/api-client";

export default function MarketplacePage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [desaData, setDesaData] = useState<any[]>([]);

  useEffect(() => {
    const fetchDesaData = async () => {
      try {
        const response = await apiClient.getDesa();
        if (response.success && response.data) {
          setDesaData(response.data);
        } else {
          setError(response.error || 'Gagal mengambil data desa');
        }
      } catch (err) {
        setError('Terjadi kesalahan saat mengambil data desa');
      } finally {
        setLoading(false);
      }
    };

    fetchDesaData();
  }, []);

  if (loading) {
    return (
      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-8 md:py-12">
        <div className="animate-pulse">
          <div className="h-10 bg-gray-200 rounded mb-6 w-64"></div>
          <div className="h-32 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-4">
            <div className="h-48 bg-gray-200 rounded"></div>
            <div className="h-48 bg-gray-200 rounded"></div>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <Link href="/pembeli" className="inline-flex items-center gap-2 text-gray-700 hover:text-(--color-primary-dark) font-medium mb-8 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            Kembali
          </Link>
          <ErrorState message={error} onRetry={() => window.location.reload()} />
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 lg:px-8 py-8 md:py-12">

      {/* Page Title */}
      <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-[#1A1C19] tracking-tight mb-6 md:mb-8">
        Marketplace Komoditas
      </h1>

      <div className="max-w-4xl mx-auto">
        {/* Content: Filters and Results */}
        <div className="w-full">

          {/* Back Button */}
          <Link href="/pembeli" className="inline-flex items-center gap-2 text-gray-700 hover:text-(--color-primary-dark) font-medium mb-8 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            Kembali
          </Link>

          {/* Components */}
          <MarketplaceFilter desaData={desaData} />
          <MarketplaceResults desaData={desaData} />

          {/* Disclaimer Box */}
          <div className="w-full bg-[#F2F4F0] rounded-xl p-4 flex gap-3 text-sm text-gray-600 border border-gray-200/60 mt-4 items-start">
            <Info className="w-5 h-5 text-(--color-primary-dark) shrink-0 mt-0.5" />
            <p className="italic">
              Estimasi berbasis riset, bukan data transaksi real-time. Sumber: Riset Pasar Komoditas 2026
            </p>
          </div>

        </div>
      </div>

    </main>
  );
}
