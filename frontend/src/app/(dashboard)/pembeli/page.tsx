"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, MapPin, TrendingUp, ChevronRight, ShieldCheck, Truck } from "lucide-react";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/api-client";

interface Komoditas {
  id: number;
  nama_komoditas: string;
  satuan: string;
  kategori: string | null;
}

interface HargaAcuan {
  komoditas_id: number;
  nama_komoditas: string;
  satuan: string;
  harga: number;
}

interface Category {
  name: string;
  icon: string;
  color: string;
}

export default function DashboardPembeli() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [komoditasList, setKomoditasList] = useState<Komoditas[]>([]);
  const [hargaAcuanList, setHargaAcuanList] = useState<HargaAcuan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [komoditasRes, hargaAcuanRes] = await Promise.all([
        apiClient.getKomoditas(),
        apiClient.getHargaAcuan(),
      ]);

      if (komoditasRes.success) {
        setKomoditasList(komoditasRes.data);

        // Extract unique categories
        const uniqueCategories = Array.from(
          new Set(komoditasRes.data.map((k: Komoditas) => k.kategori).filter(Boolean))
        ) as string[];

        // Map categories to icons and colors
        const categoryMap: Record<string, { icon: string; color: string }> = {
          "Sayuran": { icon: "🥬", color: "bg-green-100 text-green-600" },
          "Buah": { icon: "🍉", color: "bg-red-100 text-red-600" },
          "Biji-bijian & Serealia": { icon: "🌾", color: "bg-yellow-100 text-yellow-600" },
          "Umbi-umbian": { icon: "🥔", color: "bg-amber-100 text-amber-600" },
          "Rempah": { icon: "🧄", color: "bg-orange-100 text-orange-600" },
          "Kacang-kacangan": { icon: "🥜", color: "bg-lime-100 text-lime-600" },
          "Kopi/Teh/Kakao": { icon: "☕", color: "bg-stone-100 text-stone-600" },
        };

        const mappedCategories: Category[] = uniqueCategories.map((cat) => ({
          name: cat,
          icon: categoryMap[cat]?.icon || "📦",
          color: categoryMap[cat]?.color || "bg-gray-100 text-gray-600",
        }));

        setCategories(mappedCategories);
      }

      if (hargaAcuanRes.success) {
        setHargaAcuanList(hargaAcuanRes.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/pembeli/marketplace?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const getHargaForKomoditas = (komoditasId: number): string => {
    const harga = hargaAcuanList.find((h) => h.komoditas_id === komoditasId);
    if (!harga) return "Rp -";
    return `Rp ${harga.harga.toLocaleString("id-ID")}`;
  };

  const getImageForCategory = (kategori: string | null): string => {
    const categoryImages: Record<string, string> = {
      "Sayuran": "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=600&auto=format&fit=crop",
      "Buah": "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?q=80&w=600&auto=format&fit=crop",
      "Biji-bijian & Serealia": "https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=600&auto=format&fit=crop",
      "Umbi-umbian": "https://images.unsplash.com/photo-1518977676601-b53f82aba655?q=80&w=600&auto=format&fit=crop",
      "Rempah": "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=600&auto=format&fit=crop",
      "Kacang-kacangan": "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=600&auto=format&fit=crop",
      "Kopi/Teh/Kakao": "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=600&auto=format&fit=crop",
    };
    return categoryImages[kategori || ""] || "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=600&auto=format&fit=crop";
  };

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
          {loading ? (
            <div className="text-center text-gray-500 py-8">Memuat kategori...</div>
          ) : categories.length === 0 ? (
            <div className="text-center text-gray-500 py-8">Belum ada kategori tersedia</div>
          ) : (
            <div className="grid grid-cols-4 md:grid-cols-5 gap-4 justify-items-center">
              {categories.map((cat, idx) => (
                <Link
                  key={idx}
                  href={`/pembeli/marketplace?category=${encodeURIComponent(cat.name)}`}
                  className="flex flex-col items-center gap-2 group cursor-pointer"
                >
                  <div className={`w-14 h-14 md:w-16 md:h-16 rounded-[20px] ${cat.color} flex items-center justify-center text-2xl md:text-3xl transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-md`}>
                    {cat.icon}
                  </div>
                  <span className="text-xs md:text-sm font-bold text-gray-600 group-hover:text-primary-dark">{cat.name}</span>
                </Link>
              ))}
            </div>
          )}
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

          {loading ? (
            <div className="text-center text-gray-500 py-8">Memuat komoditas...</div>
          ) : komoditasList.length === 0 ? (
            <div className="text-center text-gray-500 py-8">Belum ada komoditas tersedia</div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {komoditasList.map((komoditas) => (
                <Link href={`/pembeli/marketplace/${komoditas.id}`} key={komoditas.id} className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.04)] overflow-hidden hover:shadow-xl transition-shadow group flex flex-col h-full">
                  <div className="w-full aspect-square overflow-hidden bg-gray-100 relative">
                    <img src={getImageForCategory(komoditas.kategori)} alt={komoditas.nama_komoditas} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="font-semibold text-gray-900 text-sm md:text-base line-clamp-2 mb-1 group-hover:text-primary-dark transition-colors">{komoditas.nama_komoditas}</h3>
                    <div className="flex items-baseline gap-1 mb-2">
                      <span className="text-xs text-gray-500">Estimasi</span>
                      <div className="text-lg font-bold text-gray-900">{getHargaForKomoditas(komoditas.id)}<span className="text-xs font-normal text-gray-500">/{komoditas.satuan}</span></div>
                    </div>

                    <div className="mt-auto pt-3 border-t border-gray-100">
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <MapPin className="w-3.5 h-3.5" />
                        <span className="truncate">Tersedia di beberapa desa</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
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
