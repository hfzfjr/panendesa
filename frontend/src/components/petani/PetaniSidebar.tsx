"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Sprout, 
  ClipboardCheck, 
  ShoppingCart, 
  Truck, 
  History,
  Headphones,
  Settings,
  HelpCircle
} from "lucide-react";

export function PetaniSidebar() {
  const pathname = usePathname();

  const mainLinks = [
    { name: "Halaman Utama", href: "/dashboard/petani", icon: LayoutDashboard },
    { name: "Tanaman Saya", href: "/dashboard/petani/tanaman", icon: Sprout },
    { name: "Buku Tabungan", href: "/dashboard/petani/pendapatan", icon: ClipboardCheck },
    { name: "Pesanan Masuk", href: "/dashboard/petani/pesanan", icon: ShoppingCart },
    { name: "Pengiriman", href: "/dashboard/petani/logistik", icon: Truck },
    { name: "Riwayat", href: "/dashboard/petani/audit", icon: History },
  ];

  const bottomLinks = [
    { name: "Bantuan Teknis", href: "/dashboard/petani/bantuan-teknis", icon: Headphones, isButton: true },
    { name: "Pengaturan", href: "/dashboard/petani/pengaturan", icon: Settings },
    { name: "Bantuan", href: "/dashboard/petani/bantuan", icon: HelpCircle },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 h-screen bg-[#F9FAFB] border-r border-gray-200 fixed left-0 top-16 pt-6 pb-20 z-40 overflow-y-auto">
      <div className="px-6 mb-8">
        <h2 className="text-[#1B5E20] font-bold text-sm">PanenDesa</h2>
        <p className="text-gray-500 text-xs mt-1">Agri-Ecosystem Hub</p>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {mainLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium ${
                isActive
                  ? "bg-[#1B5E20] text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <link.icon className="w-5 h-5" />
              <span>{link.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="px-4 mt-auto pt-6 space-y-2">
        {bottomLinks.map((link) => {
          if (link.isButton) {
            return (
              <Link
                key={link.name}
                href={link.href}
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#1B5E20] text-white font-bold shadow-md hover:bg-green-800 transition-colors mb-4"
              >
                <link.icon className="w-5 h-5" />
                <span>{link.name}</span>
              </Link>
            );
          }
          return (
            <Link
              key={link.name}
              href={link.href}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors font-medium text-sm"
            >
              <link.icon className="w-4 h-4" />
              <span>{link.name}</span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
