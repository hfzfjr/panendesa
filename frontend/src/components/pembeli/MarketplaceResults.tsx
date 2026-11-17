import React from "react";
import Link from "next/link";
import { MapPin, ShoppingCart, ShieldCheck } from "lucide-react";

interface Komoditas {
  id: number;
  nama_komoditas: string;
  satuan: string;
  kategori: string | null;
}

interface DesaCapacity {
  desa_id: number;
  nama_desa: string;
  kapasitas_estimasi_kg: number;
  kapasitas_tervalidasi_kg: number;
}

interface HargaAcuan {
  komoditas_id: number;
  harga: number;
}

interface MarketplaceResultsProps {
  komoditasList?: Komoditas[];
  desaData?: DesaCapacity[];
  hargaAcuanList?: HargaAcuan[];
  loading?: boolean;
}

export function MarketplaceResults({
  komoditasList = [],
  desaData = [],
  hargaAcuanList = [],
  loading = false
}: MarketplaceResultsProps) {
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

  const getHargaForKomoditas = (komoditasId: number): string => {
    const harga = hargaAcuanList.find((h) => h.komoditas_id === komoditasId);
    if (!harga) return "Rp -";
    return `Rp ${harga.harga.toLocaleString("id-ID")}`;
  };

  const getDesaWithCapacity = (komoditasId: number): string => {
    const desaWithStock = desaData.filter((d) => d.kapasitas_estimasi_kg > 0 || d.kapasitas_tervalidasi_kg > 0);
    if (desaWithStock.length === 0) return "Belum ada stok";
    if (desaWithStock.length === 1) return desaWithStock[0].nama_desa;
    return `${desaWithStock.length} Desa`;
  };

  if (loading) {
    return (
      <div className="mb-8">
        <div className="text-center text-gray-500 py-8">Memuat komoditas...</div>
      </div>
    );
  }

  if (komoditasList.length === 0) {
    return (
      <div className="mb-8">
        <div className="text-center text-gray-500 py-8">Belum ada komoditas tersedia</div>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {komoditasList.map((komoditas) => (
          <Link href={`/pembeli/marketplace/${komoditas.id}`} key={komoditas.id} className="group flex flex-col h-full bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 overflow-hidden relative">

            {/* Image Section */}
            <div className="w-full aspect-square overflow-hidden bg-gray-50 relative">
              <img src={getImageForCategory(komoditas.kategori)} alt={komoditas.nama_komoditas} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" />

              {/* Overlay Gradient for Text */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Hover Action Button (Hidden on Mobile, Shows on Hover in Desktop) */}
              <div className="absolute bottom-3 right-3 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hidden md:flex">
                <button className="bg-white text-[var(--color-primary-dark)] p-2.5 rounded-full shadow-xl hover:bg-green-50 hover:scale-110 transition-transform">
                  <ShoppingCart className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-4 flex flex-col flex-1 relative bg-white">
              <h3 className="font-extrabold text-gray-900 text-sm md:text-base line-clamp-2 mb-1.5 group-hover:text-[var(--color-primary-dark)] transition-colors leading-snug">
                {komoditas.nama_komoditas}
              </h3>

              <div className="flex items-baseline gap-1 mb-3">
                <span className="text-xs text-gray-500">Estimasi</span>
                <div className="text-lg md:text-xl font-black text-gray-900 tracking-tight">
                  {getHargaForKomoditas(komoditas.id)}
                  <span className="text-xs font-medium text-gray-400 ml-0.5">/{komoditas.satuan}</span>
                </div>
              </div>

              <div className="mt-auto pt-3 border-t border-gray-100">
                <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-2.5 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0" />
                  <span className="truncate">{getDesaWithCapacity(komoditas.id)}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-[11px] font-medium text-gray-400 bg-gray-50 px-2 py-0.5 rounded-md">
                    Ajukan Permintaan
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
