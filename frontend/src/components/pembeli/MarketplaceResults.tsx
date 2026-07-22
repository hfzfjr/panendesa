import React from "react";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { Button } from "../ui/Button";

export function MarketplaceResults() {
  const results = [
    {
      id: 1,
      village: "Desa Sukamaju",
      location: "5.2km dari lokasi Anda • Cianjur",
      grade: "Grade A",
      score: 94.2,
      scoreLabel: "SANGAT KONSISTEN",
      scoreColor: "bg-[#1B5E20]", // Dark green
      gradeColor: "bg-[#2E7D32]", // Green
      stockVal: 1200,
      stockEst: 1500,
      price: "15.000",
      image: "https://images.unsplash.com/photo-1595855761081-37d45cb04791?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: 2,
      village: "Desa Mekarsari",
      location: "8.7km dari lokasi Anda • Garut",
      grade: "Grade B+",
      score: 88.5,
      scoreLabel: "KONSISTEN",
      scoreColor: "bg-[#E0E0E0] text-gray-700", // Greyish
      gradeColor: "bg-[#8D6E63]", // Brown
      stockVal: 850,
      stockEst: 2000,
      price: "13.800",
      image: "https://images.unsplash.com/photo-1592982537447-6f233486be22?q=80&w=600&auto=format&fit=crop"
    }
  ];

  return (
    <div className="flex flex-col gap-6 mb-8">
      {results.map((item) => {
        const progressPercent = Math.min(100, Math.round((item.stockVal / item.stockEst) * 100));
        
        return (
          <div key={item.id} className="bg-white rounded-2xl border border-gray-200 p-4 md:p-6 shadow-sm flex flex-col md:flex-row gap-6 items-start hover:shadow-md transition-shadow">
            
            {/* Image Container */}
            <Link href={`/dashboard/pembeli/marketplace/${item.id}`} className="w-full md:w-48 h-48 rounded-xl overflow-hidden relative shrink-0 block group">
              <img src={item.image} alt={item.village} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className={`absolute top-3 left-3 px-3 py-1 text-white text-xs font-bold rounded-full ${item.gradeColor}`}>
                {item.grade}
              </div>
            </Link>

            {/* Content Container */}
            <div className="flex-1 w-full flex flex-col justify-between h-full min-h-[192px]">
              
              {/* Header: Title & Badge */}
              <div className="flex flex-col md:flex-row justify-between items-start mb-4 gap-2">
                <div>
                  <Link href={`/dashboard/pembeli/marketplace/${item.id}`}>
                    <h3 className="text-xl font-bold text-gray-900 hover:text-[var(--color-primary-dark)] transition-colors">{item.village}</h3>
                  </Link>
                  <div className="flex items-center gap-1.5 text-sm text-gray-500 mt-1">
                    <MapPin className="w-4 h-4" />
                    {item.location}
                  </div>
                </div>
                
                <div className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 ${item.scoreColor.includes('text') ? item.scoreColor : item.scoreColor + ' text-white'}`}>
                  <span>{item.score}</span>
                  <span className="uppercase tracking-wider text-[10px]">{item.scoreLabel}</span>
                </div>
              </div>

              {/* Progress Bar (Stock) */}
              <div className="mb-6">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-xs font-semibold text-gray-500">Stok Tervalidasi</span>
                  <span className="text-xs font-bold text-[var(--color-primary-dark)]">
                    {item.stockVal.toLocaleString('id-ID')}kg / <span className="text-gray-500">{item.stockEst.toLocaleString('id-ID')}kg (Est)</span>
                  </span>
                </div>
                <div className="w-full bg-[#EAEBE6] rounded-full h-2.5 overflow-hidden flex">
                  <div className="bg-[var(--color-primary-dark)] h-full rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }}></div>
                </div>
              </div>

              {/* Footer: Price & Button */}
              <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end mt-auto pt-4 border-t border-gray-100 gap-4">
                <div className="w-full sm:w-auto">
                  <div className="text-xs font-semibold text-gray-500 mb-1">Harga Unit</div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-[var(--color-primary-dark)]">Rp {item.price}</span>
                    <span className="text-xs text-gray-500 font-medium">/kg</span>
                  </div>
                </div>
                <Link href={`/dashboard/pembeli/marketplace/${item.id}`} className="w-full sm:w-auto">
                  <Button className="w-full bg-[var(--color-primary-dark)] hover:bg-[var(--color-primary)] px-8 shadow-sm">
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
