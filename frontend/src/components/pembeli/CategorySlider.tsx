import React from "react";
import Link from "next/link";
import { Leaf, Apple, Wheat, Coffee, Fish, Carrot } from "lucide-react";

const categories = [
  { id: 1, name: "Sayuran", icon: <Carrot className="w-6 h-6" />, color: "bg-orange-100 text-orange-600" },
  { id: 2, name: "Buah-buahan", icon: <Apple className="w-6 h-6" />, color: "bg-red-100 text-red-600" },
  { id: 3, name: "Palawija", icon: <Wheat className="w-6 h-6" />, color: "bg-yellow-100 text-yellow-600" },
  { id: 4, name: "Rempah", icon: <Leaf className="w-6 h-6" />, color: "bg-green-100 text-green-600" },
  { id: 5, name: "Biji-bijian", icon: <Coffee className="w-6 h-6" />, color: "bg-amber-100 text-amber-600" },
  { id: 6, name: "Perikanan", icon: <Fish className="w-6 h-6" />, color: "bg-blue-100 text-blue-600" },
];

export function CategorySlider() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 lg:px-8 mb-12">
      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">Kategori Pilihan</h2>
      <div className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide pb-4">
        {categories.map((cat) => (
          <Link href={`/pembeli/marketplace?category=${cat.name}`} key={cat.id} className="flex flex-col items-center gap-3 min-w-[80px] md:min-w-[100px] group">
            <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-105 group-hover:shadow-md ${cat.color}`}>
              {cat.icon}
            </div>
            <span className="text-xs md:text-sm font-semibold text-gray-700 group-hover:text-primary-dark text-center">{cat.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
