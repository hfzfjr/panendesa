"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, PlusSquare, FileText, User } from "lucide-react";

export function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { name: "Beranda", href: "/dashboard/petani", icon: Home },
    { name: "Lapor", href: "/dashboard/petani/lapor", icon: PlusSquare },
    { name: "Riwayat", href: "/dashboard/petani/riwayat", icon: FileText },
    { name: "Profil", href: "/dashboard/petani/profil", icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 z-50 pb-safe md:hidden">
      <div className="flex justify-around items-center h-20 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link 
              key={item.name} 
              href={item.href}
              className={`flex flex-col items-center justify-center w-full h-full gap-1.5 transition-colors ${
                isActive ? "text-[var(--color-primary-dark)]" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <Icon className={`w-7 h-7 ${isActive ? "stroke-[2.5px]" : "stroke-2"}`} />
              <span className={`text-xs ${isActive ? "font-bold" : "font-medium"}`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
