import React from "react";
import Link from "next/link";
import { ShieldCheck, ArrowRight } from "lucide-react";

const mockVillages = [
  {
    id: 1,
    name: "Desa Cibodas",
    region: "Jawa Barat",
    score: 98,
    specialty: "Sayuran Organik",
    image: "https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?q=80&w=300&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Desa Dieng Kulon",
    region: "Jawa Tengah",
    score: 96,
    specialty: "Kentang & Bawang",
    image: "https://images.unsplash.com/photo-1595855761081-37d45cb04791?q=80&w=300&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Desa Sembalun",
    region: "NTB",
    score: 95,
    specialty: "Bawang Putih",
    image: "https://images.unsplash.com/photo-1506806732259-39c2d0268443?q=80&w=300&auto=format&fit=crop"
  }
];

export function TopVillages() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 lg:px-8 mb-16">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">Petani & Desa Terpercaya</h2>
        <Link href="/pembeli/marketplace" className="hidden md:flex items-center gap-1 text-sm font-bold text-gray-500 hover:text-primary-dark">
          Lihat Semua <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {mockVillages.map((village) => (
          <Link href={`/pembeli/marketplace`} key={village.id} className="bg-gradient-to-br from-white to-green-50/30 rounded-3xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow group flex items-center gap-4">
            <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 relative">
              <img src={village.image} alt={village.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-1.5 mb-1">
                <ShieldCheck className="w-4 h-4 text-blue-500" />
                <h3 className="font-bold text-gray-900 group-hover:text-primary-dark transition-colors">{village.name}</h3>
              </div>
              <p className="text-xs text-gray-500 mb-2">{village.region} • {village.specialty}</p>
              
              <div className="flex items-center gap-1.5 bg-green-100/50 w-fit px-2 py-1 rounded-lg">
                <span className="text-xs font-bold text-primary-dark">Skor {village.score}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
