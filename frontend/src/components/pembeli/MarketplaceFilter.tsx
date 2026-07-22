import React from "react";
import { ChevronDown, MapPin, SlidersHorizontal, Package } from "lucide-react";
import { Button } from "../ui/Button";

export function MarketplaceFilter() {
  return (
    <div className="w-full bg-white md:rounded-2xl md:border border-gray-200 md:p-4 md:shadow-sm flex overflow-x-auto hide-scrollbar gap-3 md:gap-4 mb-6 pb-2 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0">
      
      {/* Komoditas Dropdown */}
      <div className="flex-none md:flex-1">
        <div className="flex items-center justify-between bg-[#F2F4F0] px-4 py-2 md:py-3 rounded-full md:rounded-xl cursor-pointer hover:bg-gray-200 transition-colors whitespace-nowrap">
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-800">Cabai Merah</span>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-500 ml-3" />
        </div>
      </div>

      {/* Lokasi Dropdown */}
      <div className="flex-none md:flex-1">
        <div className="flex items-center justify-between bg-[#F2F4F0] px-4 py-2 md:py-3 rounded-full md:rounded-xl cursor-pointer hover:bg-gray-200 transition-colors whitespace-nowrap">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-800">Jawa Barat</span>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-500 ml-3 md:hidden" />
        </div>
      </div>

      {/* Urutkan Dropdown */}
      <div className="flex-none md:flex-1">
        <div className="flex items-center justify-between bg-[#F2F4F0] px-4 py-2 md:py-3 rounded-full md:rounded-xl cursor-pointer hover:bg-gray-200 transition-colors whitespace-nowrap">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-800">Termurah</span>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-500 ml-3" />
        </div>
      </div>

      {/* Filter Lanjutan Button */}
      <div className="flex-none">
        <Button className="h-10 md:h-[46px] rounded-full md:rounded-xl px-4 md:px-6 bg-[var(--color-primary-dark)] hover:bg-[var(--color-primary)] flex items-center gap-2 whitespace-nowrap">
          <SlidersHorizontal className="w-4 h-4" />
          <span className="hidden md:inline">Filter Lanjutan</span>
          <span className="md:hidden">Filter</span>
        </Button>
      </div>

    </div>
  );
}
