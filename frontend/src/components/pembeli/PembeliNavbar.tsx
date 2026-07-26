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

        <div className="flex items-center gap-2 md:gap-4 text-neutral-600">
          <Link href="/auth/login">
            <button className="text-sm font-bold text-gray-600 hover:text-primary-dark transition-colors px-3 py-2">
              Masuk
            </button>
          </Link>
          <Link href="/auth/register">
            <button className="text-sm font-bold bg-primary-dark hover:bg-primary text-white rounded-lg px-4 py-2 transition-colors shadow-sm hidden md:block">
              Daftar
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
