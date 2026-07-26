import React, { useState } from "react";
import { ChevronDown, MapPin, ArrowDownAZ, Filter, SlidersHorizontal } from "lucide-react";

interface MarketplaceFilterProps {
  desaData?: any[];
}

export function MarketplaceFilter({ desaData = [] }: MarketplaceFilterProps) {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const categories = ["Semua", "Sayuran", "Buah", "Biji-bijian", "Rempah", "Grosir"];

  return (
    <div className="w-full mb-6 space-y-4">
      {/* 1. Horizontal Scrollable Category Pills */}
      <div className="flex overflow-x-auto hide-scrollbar gap-2 pb-2 -mx-4 px-4 md:mx-0 md:px-0">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
              activeCategory === cat
                ? "bg-[var(--color-primary)] text-white shadow-md shadow-green-900/10 transform scale-105"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:border-gray-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 2. Secondary Filters (Location & Sort) */}
      <div className="flex flex-col md:flex-row gap-3">
        {/* Mobile Filter Button (Visible only on mobile) */}
        <button className="md:hidden w-full flex items-center justify-center gap-2 bg-white border border-gray-200 rounded-xl p-3 text-sm font-bold text-gray-700 hover:bg-gray-50 shadow-sm">
          <SlidersHorizontal className="w-4 h-4" />
          Filter & Urutkan
        </button>

        {/* Desktop/Tablet Filters (Hidden on small mobile if we wanted, but let's keep them styled nice for all) */}
        <div className="hidden md:flex flex-1 gap-3">
          {/* Lokasi Dropdown */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin className="h-5 w-5 text-gray-400" />
            </div>
            <select className="block w-full pl-10 pr-10 py-3 text-sm text-gray-900 bg-white border border-gray-200 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-primary-dark/20 focus:border-primary-dark font-medium cursor-pointer shadow-sm hover:border-gray-300 transition-colors">
              <option value="">Semua Lokasi ({desaData.length} Desa)</option>
              {desaData.map((desa, idx) => (
                <option key={idx} value={desa.desa_id}>{desa.nama_desa}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <ChevronDown className="h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Urutkan Dropdown */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <ArrowDownAZ className="h-5 w-5 text-gray-400" />
            </div>
            <select className="block w-full pl-10 pr-10 py-3 text-sm text-gray-900 bg-white border border-gray-200 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-primary-dark/20 focus:border-primary-dark font-medium cursor-pointer shadow-sm hover:border-gray-300 transition-colors">
              <option value="relevan">Paling Relevan</option>
              <option value="termurah">Harga Termurah</option>
              <option value="terlaris">Paling Laris</option>
              <option value="terdekat">Jarak Terdekat</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <ChevronDown className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  );
}
