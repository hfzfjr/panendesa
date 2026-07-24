"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Inbox, 
  Package, 
  ShoppingCart, 
  Users, 
  Truck, 
  FileText,
  Settings, 
  HelpCircle 
} from "lucide-react";

export function KopdesSidebar() {
  const pathname = usePathname();

  const mainLinks = [
    { name: "Dashboard", href: "/kopdes", icon: LayoutDashboard },
    { name: "Penerimaan / Intake", href: "/kopdes/penerimaan", icon: Inbox },
    { name: "Stok & Kapasitas", href: "/kopdes/stok", icon: Package },
    { name: "Pesanan Pembeli", href: "/kopdes/pesanan", icon: ShoppingCart },
    { name: "Data Petani", href: "/kopdes/petani", icon: Users },
    { name: "Logistik", href: "/kopdes/logistik", icon: Truck },
    { name: "Laporan", href: "/kopdes/laporan", icon: FileText },
  ];

  const bottomLinks = [
    { name: "Pengaturan", href: "/kopdes/pengaturan", icon: Settings },
    { name: "Panduan Aplikasi", href: "/kopdes/bantuan", icon: HelpCircle },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 h-screen bg-[#F9FAFB] border-r border-gray-200 fixed left-0 top-16 pt-6 pb-20 z-40 overflow-y-auto">
      <div className="px-6 mb-8">
        <h2 className="text-primary-dark font-bold text-sm">PanenDesa</h2>
        <p className="text-xs text-gray-500 mt-1">Agri-Ecosystem Hub</p>
      </div>

      <nav className="flex-1 px-4 space-y-1.5">
        {mainLinks.map((item) => {
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-md transition-all group ${
                isActive 
                  ? 'bg-primary-dark text-white font-bold shadow-sm' 
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 font-medium'
              }`}
            >
              <item.icon 
                className={`w-5 h-5 ${
                  isActive 
                    ? 'text-white' 
                    : 'text-gray-400 group-hover:text-gray-600'
                }`} 
                strokeWidth={isActive ? 2.5 : 2}
              />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="px-4 mt-8 pt-6 border-t border-gray-200">
        <div className="space-y-1.5">
          {bottomLinks.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-md transition-all group text-gray-600 hover:bg-gray-100 hover:text-gray-900 font-medium`}
            >
              <item.icon 
                className="w-5 h-5 text-gray-400 group-hover:text-gray-600" 
                strokeWidth={2}
              />
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
