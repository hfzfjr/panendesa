"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ShoppingBag, Package, User } from "lucide-react";

export function PembeliBottomNav() {
  const pathname = usePathname();

  const navItems = [
    { name: "Beranda", href: "/pembeli", icon: Home },
    { name: "Pasar", href: "/pembeli/marketplace", icon: ShoppingBag },
    { name: "Pesanan", href: "/pembeli/orders", icon: Package },
    { name: "Profil", href: "/pembeli/profile", icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 z-50 pb-4 md:hidden">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          // Exactly matching href for Beranda, and prefix matching for others
          const isActive = item.href === "/pembeli"
            ? pathname === item.href
            : pathname.startsWith(item.href) && item.href !== "#";

          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${isActive ? "text-primary-dark" : "text-gray-400 hover:text-gray-600"
                }`}
            >
              <Icon className={`w-6 h-6 ${isActive ? "stroke-[2.5]" : "stroke-2"}`} />
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
