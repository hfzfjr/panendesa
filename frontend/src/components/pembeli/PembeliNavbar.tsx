"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, ShoppingCart, User, Search, Menu, X } from "lucide-react";

export function PembeliNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isMarketplace = pathname.includes("/marketplace");
  const isDashboard = !isMarketplace && pathname.includes("/pembeli") && pathname.split("/").length <= 3;
  const isPesanan = pathname.includes("/pesanan");

  return (
    <>
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

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>

          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-60 md:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          ></div>

          {/* Drawer */}
          <div className="relative w-4/5 max-w-sm bg-white h-full shadow-2xl flex flex-col">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 bg-primary text-white rounded-lg flex items-center justify-center text-lg shadow-sm">P</span>
                <span className="text-primary-dark font-extrabold text-xl tracking-tight">PanenDesa</span>
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="w-8 h-8 flex items-center justify-center bg-gray-100 text-gray-500 rounded-full hover:bg-gray-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
              <Link
                href="/pembeli"
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium ${isDashboard
                    ? "bg-primary-dark text-white shadow-sm"
                    : "text-gray-700 hover:bg-gray-50"
                  }`}
              >
                Beranda
              </Link>
              <Link
                href="/pembeli/marketplace"
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium ${isMarketplace
                    ? "bg-primary-dark text-white shadow-sm"
                    : "text-gray-700 hover:bg-gray-50"
                  }`}
              >
                Marketplace
              </Link>
              <Link
                href="/pembeli/pesanan"
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium ${isPesanan
                    ? "bg-primary-dark text-white shadow-sm"
                    : "text-gray-700 hover:bg-gray-50"
                  }`}
              >
                Pesanan Saya
              </Link>

              <div className="mt-8 mb-4 px-2">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Akun</p>
              </div>
              <Link
                href="/pembeli/keranjang"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors font-medium"
              >
                <ShoppingCart className="w-5 h-5" />
                Keranjang
              </Link>
              <Link
                href="/pembeli/notifikasi"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors font-medium"
              >
                <Bell className="w-5 h-5" />
                Notifikasi
              </Link>
              <Link
                href="/pembeli/profil"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors font-medium"
              >
                <User className="w-5 h-5" />
                Profil
              </Link>
            </div>

            <div className="p-4 border-t border-gray-100">
              <div className="flex items-center gap-3 mb-4 px-2">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center border border-gray-200">
                  <User className="w-5 h-5 text-gray-500" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">Gilang</p>
                  <p className="text-xs text-gray-500">Pembeli</p>
                </div>
              </div>
              <button className="w-full bg-red-50 text-red-600 hover:bg-red-100 font-bold py-2.5 rounded-xl transition-colors text-sm">
                Keluar Aplikasi
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
