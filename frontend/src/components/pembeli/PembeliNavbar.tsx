"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, ShoppingCart, Menu } from "lucide-react";

export function PembeliNavbar() {
  const pathname = usePathname();

  const isMarketplace = pathname.includes("/marketplace");
  const isDashboard = !isMarketplace && pathname.includes("/pembeli");

  return (
    <nav className="bg-neutral-50 border-b border-gray-200 sticky top-0 z-50 w-full">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between px-4 lg:px-8 py-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="text-primary-dark font-bold text-xl md:text-2xl tracking-tight">
            PanenDesa
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-bold text-neutral-600">
          <Link href="/pembeli" className={`${isDashboard ? "text-primary-dark border-b-2 border-primary-dark" : "hover:text-primary border-b-2 border-transparent"} pb-1 transition-colors`}>
            Dashboard
          </Link>
          <Link href="#" className="hover:text-primary transition-colors pb-1 border-b-2 border-transparent">
            Pesanan Saya
          </Link>
          <Link href="#" className="hover:text-primary transition-colors pb-1 border-b-2 border-transparent">
            Tentang Kami
          </Link>
          <Link href="#" className="hover:text-primary transition-colors pb-1 border-b-2 border-transparent">
            Bantuan
          </Link>
        </div>

        <div className="flex items-center gap-4 md:gap-6 text-neutral-600">
          <Link href="/pembeli/notifications" className="hover:text-primary relative" aria-label="Notifikasi">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 border-2 border-neutral-50 rounded-full"></span>
          </Link>
          <Link href="/pembeli/cart" className="hover:text-primary" aria-label="Keranjang Belanja">
            <ShoppingCart className="w-5 h-5" />
          </Link>
          <Link href="/pembeli/profile" className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden cursor-pointer border-2 border-white shadow-sm hover:ring-2 hover:ring-primary-dark transition-all">
            <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop" alt="Profile" className="w-full h-full object-cover" />
          </Link>
        </div>
      </div>
    </nav>
  );
}
