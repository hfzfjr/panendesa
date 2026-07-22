"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Sprout, ClipboardCheck, ShoppingCart } from "lucide-react";

export function PetaniBottomNav() {
  const pathname = usePathname();

  const navItems = [
    { name: "Halaman Utama", href: "/dashboard/petani", icon: LayoutDashboard },
    { name: "Tanaman Saya", href: "/dashboard/petani/tanaman", icon: Sprout },
    { name: "Buku Tabungan", href: "/dashboard/petani/pendapatan", icon: ClipboardCheck },
    { name: "Pesanan", href: "/dashboard/petani/pesanan", icon: ShoppingCart },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 z-50 flex items-center justify-around px-2 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] pb-safe">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        
        return (
          <Link
            key={item.name}
            href={item.href}
            className="flex flex-col items-center justify-center w-full h-full gap-1 pt-1"
          >
            <div className={`p-1.5 rounded-full transition-colors ${isActive ? 'bg-green-50' : 'bg-transparent'}`}>
              <item.icon 
                className={`w-6 h-6 ${isActive ? 'text-[#1B5E20]' : 'text-gray-400'}`} 
                strokeWidth={isActive ? 2.5 : 2}
              />
            </div>
            <span 
              className={`text-[10px] font-bold ${isActive ? 'text-[#1B5E20]' : 'text-gray-400'}`}
            >
              {item.name}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
