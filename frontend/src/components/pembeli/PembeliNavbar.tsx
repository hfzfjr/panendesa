"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, ShoppingCart, User, Search } from "lucide-react";

export function PembeliNavbar() {
  const pathname = usePathname();

  const isMarketplace = pathname.includes("/marketplace");
  const isDashboard = !isMarketplace && pathname.includes("/pembeli") && pathname.split("/").length <= 3;
  const isPesanan = pathname.includes("/pesanan");

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 w-full shadow-sm">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between px-4 lg:px-8 py-3 md:py-4">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link href="/pembeli" className="text-primary-dark font-extrabold text-xl md:text-2xl tracking-tight flex items-center gap-2">
            <span className="w-8 h-8 md:w-9 md:h-9 bg-primary text-white rounded-lg flex items-center justify-center text-lg shadow-sm">P</span>
            PanenDesa
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-bold text-gray-500">
          <Link href="/pembeli" className={`${isDashboard ? "text-primary-dark border-b-2 border-primary-dark" : "hover:text-primary border-b-2 border-transparent"} pb-1 transition-colors`}>
            Beranda
          </Link>
          <Link href="/pembeli/marketplace" className={`${isMarketplace ? "text-primary-dark border-b-2 border-primary-dark" : "hover:text-primary border-b-2 border-transparent"} pb-1 transition-colors`}>
            Marketplace
          </Link>
          <Link href="/pembeli/pesanan" className={`${isPesanan ? "text-primary-dark border-b-2 border-primary-dark" : "hover:text-primary border-b-2 border-transparent"} pb-1 transition-colors`}>
            Pesanan Saya
          </Link>
        </div>

        {/* Right Actions: Search, Cart, Notif, Profile */}
        <div className="flex items-center gap-3 md:gap-5 text-gray-600">
          
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors hidden md:block">
            <Search className="w-5 h-5" />
          </button>
          
          <Link href="/pembeli/keranjang" className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
          </Link>
          
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
          </button>

          {/* User Profile */}
          <div className="hidden md:flex items-center gap-2 pl-2 border-l border-gray-200">
            <div className="text-right">
              <p className="text-sm font-bold text-gray-900 leading-tight">Gilang</p>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Pembeli</p>
            </div>
            <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center border border-gray-200 overflow-hidden cursor-pointer hover:shadow-md transition-shadow">
              <User className="w-5 h-5 text-gray-500" />
            </div>
          </div>

        </div>
      </div>
    </nav>
  );
}
