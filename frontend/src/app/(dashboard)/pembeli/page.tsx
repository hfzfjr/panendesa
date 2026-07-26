"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, MapPin, Star, TrendingUp, ChevronRight, ShieldCheck, Truck } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DashboardPembeli() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/pembeli/marketplace?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const categories = [
    { name: "Sayuran", icon: "🥬", color: "bg-green-100 text-green-600" },
    { name: "Buah", icon: "🍉", color: "bg-red-100 text-red-600" },
    { name: "Biji-bijian", icon: "🌾", color: "bg-yellow-100 text-yellow-600" },
    { name: "Rempah", icon: "🧄", color: "bg-orange-100 text-orange-600" },
    { name: "Grosir", icon: "📦", color: "bg-blue-100 text-blue-600", hiddenMobile: true },
  ];

  const products = [
    { id: 1, name: "Cabai Merah Keriting", price: "Rp 35.000", unit: "kg", village: "Desa Cibodas", rating: 4.8, sold: "1.2rb", image: "https://images.unsplash.com/photo-1596199050105-6d5d32222916?q=80&w=600&auto=format&fit=crop" },
    { id: 2, name: "Tomat Merah Segar", price: "Rp 12.000", unit: "kg", village: "Desa Sukamaju", rating: 4.9, sold: "850", image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=600&auto=format&fit=crop" },
    { id: 3, name: "Bawang Merah Besar", price: "Rp 28.000", unit: "kg", village: "Desa Brebes", rating: 4.7, sold: "2.1rb", image: "https://images.unsplash.com/photo-1618512496248-a07ce83aa8cb?q=80&w=600&auto=format&fit=crop" },
    { id: 4, name: "Kentang Dieng Super", price: "Rp 18.000", unit: "kg", village: "Desa Dieng Kulon", rating: 5.0, sold: "3.4rb", image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?q=80&w=600&auto=format&fit=crop" },
    { id: 5, name: "Wortel Manis", price: "Rp 15.000", unit: "kg", village: "Desa Brastagi", rating: 4.6, sold: "500", image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?q=80&w=600&auto=format&fit=crop" },
    { id: 6, name: "Sawi Hijau Organik", price: "Rp 8.000", unit: "ikat", village: "Desa Lembang", rating: 4.9, sold: "4.2rb", image: "https://images.unsplash.com/photo-1622378930887-2ee0157f9202?q=80&w=600&auto=format&fit=crop" },
    { id: 7, name: "Jagung Manis", price: "Rp 10.000", unit: "kg", village: "Desa Ciwidey", rating: 4.8, sold: "1.1rb", image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?q=80&w=600&auto=format&fit=crop" },
    { id: 8, name: "Brokoli Hijau", price: "Rp 25.000", unit: "kg", village: "Desa Lembang", rating: 4.7, sold: "890", image: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?q=80&w=600&auto=format&fit=crop" },
  ];

  return (
    <main className="bg-gray-50 min-h-screen pb-24">
      
      {/* 1. TOP HEADER & SEARCH (Clean & Integrated) */}
      <div className="bg-primary-dark pt-8 pb-32 px-4 relative rounded-b-[40px] shadow-xl">
        {/* Background Pattern */}
        <div className="absolute inset-0 overflow-hidden rounded-b-[40px]">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Mau belanja hasil panen apa hari ini?</h1>
          <p className="text-white/80 text-sm md:text-base mb-8">Langsung dari petani desa, harga jujur dan transparan.</p>

          <form onSubmit={handleSearch} className="max-w-3xl relative">
            <input
              type="text"
              placeholder="Cari komoditas (contoh: Cabai, Tomat, Kopi...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-14 md:h-16 pl-14 pr-6 rounded-2xl bg-white text-gray-900 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border-0 focus:ring-4 focus:ring-green-500/30 text-lg"
            />
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-6 h-6" />
            <button type="submit" className="absolute right-2 top-2 bottom-2 bg-primary hover:bg-green-600 text-white px-6 md:px-8 rounded-xl font-bold transition-colors">
              Cari
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-20 relative z-20">
        
        {/* 2. CATEGORIES (Floating over the header) */}
        <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 mb-12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-gray-900">Kategori Pilihan</h2>
            <Link href="/pembeli/marketplace" className="text-sm font-bold text-primary-dark hover:text-primary flex items-center">
              Lihat Semua <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-4 md:grid-cols-5 gap-4 justify-items-center">
            {categories.map((cat, idx) => (
              <Link 
                key={idx} 
                href={`/pembeli/marketplace?category=${encodeURIComponent(cat.name)}`}
                className={`flex flex-col items-center gap-2 group cursor-pointer ${cat.hiddenMobile ? 'hidden md:flex' : 'flex'}`}
              >
                <div className={`w-14 h-14 md:w-16 md:h-16 rounded-[20px] ${cat.color} flex items-center justify-center text-2xl md:text-3xl transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-md`}>
                  {cat.icon}
                </div>
                <span className="text-xs md:text-sm font-bold text-gray-600 group-hover:text-primary-dark">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* 3. PRODUCT GRID (Clean and consistent) */}
        <div className="mb-12">
          <div className="flex justify-between items-end mb-6">
            <div>
              <div className="flex items-center gap-2 text-primary-dark font-bold text-sm tracking-wider uppercase mb-1">
                <TrendingUp className="w-4 h-4" /> Sedang Musim Panen
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Rekomendasi Hari Ini</h2>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product) => (
              <Link href={`/pembeli/marketplace/${product.id}`} key={product.id} className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.04)] overflow-hidden hover:shadow-xl transition-shadow group flex flex-col h-full">
                <div className="w-full aspect-square overflow-hidden bg-gray-100 relative">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-2 left-2 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase">
                    Grade A
                  </div>
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-semibold text-gray-900 text-sm md:text-base line-clamp-2 mb-1 group-hover:text-primary-dark transition-colors">{product.name}</h3>
                  <div className="text-lg font-bold text-gray-900 mb-2">{product.price}<span className="text-xs font-normal text-gray-500">/{product.unit}</span></div>
                  
                  <div className="mt-auto pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
                      <MapPin className="w-3.5 h-3.5" />
                      <span className="truncate">{product.village}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="flex items-center gap-1 text-amber-500">
                        <Star className="w-3.5 h-3.5 fill-amber-500" />
                        <span className="font-bold">{product.rating}</span>
                      </div>
                      <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                      <span className="text-gray-500">Terjual {product.sold}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* 4. TRUST BADGES (Simple text instead of massive cards) */}
        <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-6 shadow-sm">
          <div className="flex items-center gap-4 text-left w-full md:w-1/3">
            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-primary-dark shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900">Pembayaran Aman</h4>
              <p className="text-xs text-gray-500">Dana ditahan hingga barang tiba</p>
            </div>
          </div>
          <div className="hidden md:block w-px h-12 bg-gray-100"></div>
          <div className="flex items-center gap-4 text-left w-full md:w-1/3">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900">Pengiriman Koperasi</h4>
              <p className="text-xs text-gray-500">Lacak pengiriman secara real-time</p>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
