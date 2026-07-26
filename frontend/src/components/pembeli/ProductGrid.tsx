import React from "react";
import Link from "next/link";
import { Star, MapPin } from "lucide-react";

const mockProducts = [
  {
    id: 1,
    name: "Cabai Merah Keriting",
    price: "Rp 35.000",
    unit: "kg",
    village: "Desa Sukamaju",
    rating: 4.8,
    sold: "1.2rb",
    image: "https://images.unsplash.com/photo-1596199050105-6d5d32222916?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Tomat Merah Segar",
    price: "Rp 12.000",
    unit: "kg",
    village: "Desa Cibodas",
    rating: 4.9,
    sold: "850",
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Bawang Merah Besar",
    price: "Rp 28.000",
    unit: "kg",
    village: "Desa Brebes",
    rating: 4.7,
    sold: "2.1rb",
    image: "https://images.unsplash.com/photo-1618512496248-a07ce83aa8cb?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "Kentang Dieng Super",
    price: "Rp 18.000",
    unit: "kg",
    village: "Desa Dieng Kulon",
    rating: 5.0,
    sold: "3.4rb",
    image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?q=80&w=600&auto=format&fit=crop"
  }
];

export function ProductGrid() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 lg:px-8 mb-16">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">Sedang Musim Panen</h2>
        <Link href="/pembeli/marketplace" className="text-sm font-bold text-primary-dark hover:underline">
          Lihat Semua
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {mockProducts.map((product) => (
          <Link href={`/pembeli/marketplace/${product.id}`} key={product.id} className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.04)] overflow-hidden hover:shadow-lg transition-shadow group flex flex-col h-full">
            <div className="w-full aspect-square overflow-hidden bg-gray-100 relative">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
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
    </section>
  );
}
