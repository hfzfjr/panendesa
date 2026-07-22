import React from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "../ui/Button";
import Link from "next/link";

export function VillageCapacity() {
  const villages = [
    {
      name: "Desa Sukamaju",
      image: "https://images.unsplash.com/photo-1595855761081-37d45cb04791?q=80&w=600&auto=format&fit=crop",
      trustScore: 98,
      estCapacity: "12.500 Kg",
      valCapacity: "11.850 Kg"
    },
    {
      name: "Desa Karanganyar",
      image: "https://images.unsplash.com/photo-1592982537447-6f233486be22?q=80&w=600&auto=format&fit=crop",
      trustScore: 95,
      estCapacity: "8.200 Kg",
      valCapacity: "7.800 Kg"
    },
    {
      name: "Desa Mekarjaya",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=600&auto=format&fit=crop",
      trustScore: 92,
      estCapacity: "15.000 Kg",
      valCapacity: "13.500 Kg"
    }
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-4 lg:px-8 py-16 border-t border-gray-200">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4 md:gap-0">
        <div>
          <h2 className="text-2xl font-bold text-[#1A1C19] mb-2">Kapasitas Produksi Desa</h2>
          <p className="text-[var(--color-neutral-600)] text-sm">
            Desa dengan performa panen tertinggi dan validasi terverifikasi.
          </p>
        </div>
        <Link href="#" className="flex items-center gap-1 text-sm font-bold text-gray-700 hover:text-[var(--color-primary-dark)] transition-colors group whitespace-nowrap">
          Lihat Semua Desa
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {villages.map((village, idx) => (
          <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="relative h-48 w-full">
              <img src={village.image} alt={village.name} className="w-full h-full object-cover" />
              <div className="absolute top-4 left-4 bg-[var(--color-primary)] text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Terverifikasi
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-900">{village.name}</h3>
                <div className="text-right">
                  <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-0.5">Trust Score</div>
                  <div className="text-sm font-bold text-[var(--color-primary)]">{village.trustScore}/100</div>
                </div>
              </div>
              
              <div className="space-y-3 mb-8">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Est. Kapasitas:</span>
                  <span className="font-bold text-gray-900">{village.estCapacity}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Kapasitas Tervalidasi:</span>
                  <span className="font-bold text-[var(--color-primary-dark)]">{village.valCapacity}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-[var(--color-primary)] h-full rounded-full" style={{ width: `${village.trustScore}%` }}></div>
                </div>
              </div>
              
              <Button variant="outline" className="w-full !text-[var(--color-primary-dark)] border-[var(--color-primary)]/30 hover:bg-green-50">
                Lihat Katalog
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
