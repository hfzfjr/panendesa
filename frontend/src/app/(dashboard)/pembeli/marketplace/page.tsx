import React from "react";
import Link from "next/link";
import { Info, ArrowLeft } from "lucide-react";
import { MarketplaceFilter } from "../../../../components/pembeli/MarketplaceFilter";
import { MarketplaceResults } from "../../../../components/pembeli/MarketplaceResults";

export default function MarketplacePage() {
  return (
    <main className="max-w-7xl mx-auto px-4 lg:px-8 py-8 md:py-12">

      {/* Page Title */}
      <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-[#1A1C19] tracking-tight mb-6 md:mb-8">
        Hasil Pencarian: <span className="text-(--color-primary-dark)">Cabai Merah</span>
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
          <MarketplaceFilter />
          <MarketplaceResults />

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
