import React from "react";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { Button } from "../ui/Button";

interface MarketplaceResultsProps {
  desaData?: any[];
}

export function MarketplaceResults({ desaData = [] }: MarketplaceResultsProps) {
  // Use real desaData if available, otherwise show empty state
  if (desaData.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-8 md:p-12 text-center flex flex-col items-center">
        <MapPin className="w-16 h-16 text-gray-300 mb-4" />
        <h3 className="font-bold text-gray-900 text-lg mb-2">Belum ada desa tersedia</h3>
        <p className="text-gray-500 text-sm max-w-sm">
          Data desa sedang dimuat atau belum tersedia. Silakan coba lagi nanti.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 mb-8">
      {desaData.map((item) => {
        const progressPercent = item.kapasitas_estimasi_kg > 0
          ? Math.min(100, Math.round((item.kapasitas_tervalidasi_kg / item.kapasitas_estimasi_kg) * 100))
          : 0;

        // Determine score color based on skor_konsistensi
        const getScoreColor = (score: number) => {
          if (score >= 90) return "bg-primary-dark text-white";
          if (score >= 80) return "bg-neutral-600 text-white";
          return "bg-neutral-200 text-gray-700";
        };

        const getScoreLabel = (score: number) => {
          if (score >= 90) return "SANGAT KONSISTEN";
          if (score >= 80) return "KONSISTEN";
          return "CUKUP";
        };

        const scoreColor = getScoreColor(item.skor_konsistensi);
        const scoreLabel = getScoreLabel(item.skor_konsistensi);

        return (
          <div key={item.desa_id} className="bg-white rounded-2xl border border-gray-200 p-4 md:p-6 shadow-sm flex flex-col md:flex-row gap-6 items-start hover:shadow-md transition-shadow">

            {/* Image Container */}
            <Link href={`/pembeli/marketplace/${item.desa_id}`} className="w-full md:w-48 h-48 rounded-xl overflow-hidden relative shrink-0 block group">
              <img src="https://images.unsplash.com/photo-1595855761081-37d45cb04791?q=80&w=600&auto=format&fit=crop" alt={item.nama_desa} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-3 left-3 px-3 py-1 text-white text-xs font-bold rounded-full bg-primary">
                Grade A
              </div>
            </Link>

            {/* Content Container */}
            <div className="flex-1 w-full flex flex-col justify-between h-full min-h-48">

              {/* Header: Title & Badge */}
              <div className="flex flex-col md:flex-row justify-between items-start mb-4 gap-2">
                <div>
                  <Link href={`/pembeli/marketplace/${item.desa_id}`}>
                    <h3 className="text-xl font-bold text-gray-900 hover:text-primary-dark transition-colors">{item.nama_desa}</h3>
                  </Link>
                  <div className="flex items-center gap-1.5 text-sm text-gray-500 mt-1">
                    <MapPin className="w-4 h-4" />
                    {item.latitude && item.longitude ? `${item.latitude.toFixed(4)}, ${item.longitude.toFixed(4)}` : 'Lokasi tidak tersedia'}
                  </div>
                </div>

                <div className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 ${scoreColor}`}>
                  <span>{item.skor_konsistensi.toFixed(1)}</span>
                  <span className="uppercase tracking-wider text-[10px]">{scoreLabel}</span>
                </div>
              </div>

              {/* Progress Bar (Stock) */}
              <div className="mb-6">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-xs font-semibold text-gray-500">Stok Tervalidasi</span>
                  <span className="text-xs font-bold text-primary-dark">
                    {item.kapasitas_tervalidasi_kg.toLocaleString('id-ID')}kg / <span className="text-gray-500">{item.kapasitas_estimasi_kg.toLocaleString('id-ID')}kg (Est)</span>
                  </span>
                </div>
                <div className="w-full bg-neutral-100 rounded-full h-2.5 overflow-hidden flex">
                  <div className="bg-primary-dark h-full rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }}></div>
                </div>
              </div>

              {/* Footer: Price & Button */}
              <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end mt-auto pt-4 border-t border-gray-100 gap-4">
                <div className="w-full sm:w-auto">
                  <div className="text-xs font-semibold text-gray-500 mb-1">Kapasitas Tersedia</div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-primary-dark">{item.kapasitas_tervalidasi_kg.toLocaleString('id-ID')}</span>
                    <span className="text-xs text-gray-500 font-medium">kg</span>
                  </div>
                </div>
                <Link href={`/pembeli/marketplace/${item.desa_id}`} className="w-full sm:w-auto">
                  <Button className="w-full bg-primary-dark hover:bg-primary px-8 shadow-sm">
                    Lihat Detail
                  </Button>
                </Link>
              </div>

            </div>
          </div>
        );
      })}
    </div>
  );
}
