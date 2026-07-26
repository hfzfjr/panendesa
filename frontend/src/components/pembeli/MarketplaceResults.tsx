import React from "react";
import Link from "next/link";
import { MapPin, Star, ShoppingCart, ShieldCheck } from "lucide-react";

interface MarketplaceResultsProps {
  desaData?: any[];
}

export function MarketplaceResults({ desaData = [] }: MarketplaceResultsProps) {
  // We use mock products for the UI representation as requested by the user,
  // attaching them to existing desaData if available to keep links working.
  const mockProducts = [
    {
      id: desaData[0]?.desa_id || 1,
      name: "Cabai Merah Keriting Premium",
      price: "Rp 35.000",
      unit: "kg",
      village: desaData[0]?.nama_desa || "Desa Cibodas",
      rating: 4.8,
      sold: "1.2rb",
      grade: "Grade A",
      image: "https://images.unsplash.com/photo-1596199050105-6d5d32222916?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: desaData[1]?.desa_id || 2,
      name: "Tomat Merah Segar",
      price: "Rp 12.000",
      unit: "kg",
      village: desaData[1]?.nama_desa || "Desa Sukamaju",
      rating: 4.9,
      sold: "850",
      grade: "Grade A",
      image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: desaData[2]?.desa_id || 3,
      name: "Bawang Merah Besar",
      price: "Rp 28.000",
      unit: "kg",
      village: desaData[2]?.nama_desa || "Desa Brebes",
      rating: 4.7,
      sold: "2.1rb",
      grade: "Grade B",
      image: "https://images.unsplash.com/photo-1618512496248-a07ce83aa8cb?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: desaData[3]?.desa_id || 4,
      name: "Kentang Dieng Super",
      price: "Rp 18.000",
      unit: "kg",
      village: desaData[3]?.nama_desa || "Desa Dieng Kulon",
      rating: 5.0,
      sold: "3.4rb",
      grade: "Grade A",
      image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: desaData[4]?.desa_id || 5,
      name: "Wortel Manis Brastagi",
      price: "Rp 15.000",
      unit: "kg",
      village: desaData[4]?.nama_desa || "Desa Brastagi",
      rating: 4.6,
      sold: "500",
      grade: "Grade B",
      image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: desaData[5]?.desa_id || 6,
      name: "Sayur Sawi Hijau Organik",
      price: "Rp 8.000",
      unit: "ikat",
      village: desaData[5]?.nama_desa || "Desa Lembang",
      rating: 4.9,
      sold: "4.2rb",
      grade: "Grade C",
      image: "https://images.unsplash.com/photo-1622378930887-2ee0157f9202?q=80&w=600&auto=format&fit=crop"
    }
  ];

  const getGradeColor = (grade: string) => {
    if (grade.includes("A")) return "bg-gradient-to-r from-amber-400 to-yellow-500 text-white shadow-yellow-500/30";
    if (grade.includes("B")) return "bg-gradient-to-r from-slate-400 to-slate-500 text-white shadow-slate-500/30";
    return "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-green-500/30";
  };

  return (
    <div className="mb-8">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {mockProducts.map((product) => (
          <Link href={`/pembeli/marketplace/${product.id}`} key={product.id} className="group flex flex-col h-full bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 overflow-hidden relative">
            
            {/* Image Section */}
            <div className="w-full aspect-square overflow-hidden bg-gray-50 relative">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" />
              
              {/* Overlay Gradient for Text */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Premium Grade Badge */}
              <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-full flex items-center gap-1 text-[10px] font-black uppercase tracking-wider shadow-md ${getGradeColor(product.grade)}`}>
                <ShieldCheck className="w-3 h-3" />
                {product.grade}
              </div>

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
                {product.name}
              </h3>
              
              <div className="text-lg md:text-xl font-black text-gray-900 mb-3 tracking-tight">
                {product.price}
                <span className="text-xs font-medium text-gray-400 ml-0.5">/{product.unit}</span>
              </div>
              
              <div className="mt-auto pt-3 border-t border-gray-100">
                <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-2.5 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0" />
                  <span className="truncate">{product.village}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="font-bold text-gray-700">{product.rating}</span>
                  </div>
                  <div className="text-[11px] font-medium text-gray-400 bg-gray-50 px-2 py-0.5 rounded-md">
                    Terjual {product.sold}
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
