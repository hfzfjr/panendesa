"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  History, 
  BadgeDollarSign, 
  BarChart4, 
  HelpCircle,
  Settings,
  HeadphonesIcon
} from "lucide-react";

export default function AdminSidebar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Audit Log", href: "/admin/audit", icon: History },
    { name: "Kelola Harga", href: "/admin/harga", icon: BadgeDollarSign },
    { name: "Laporan", href: "/admin/laporan", icon: BarChart4 },
  ];

  const bottomItems = [
    { name: "Pengaturan", href: "/admin/pengaturan", icon: Settings },
    { name: "Bantuan", href: "/admin/bantuan", icon: HelpCircle },
  ];

  // Fix hydration issue with pathname
  if (!mounted) return null;

  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 flex flex-col h-screen shrink-0 relative z-20">
      
      {/* Brand/Logo Area */}
      <div className="h-20 flex flex-col justify-center px-6 border-b border-gray-200 bg-gray-50">
        <Link href="/admin" className="font-extrabold text-xl text-primary-dark tracking-tight hover:opacity-80 transition-opacity">
          PanenDesa
        </Link>
        <p className="text-[10px] text-gray-500 font-medium">Agri-Ecosystem Hub</p>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive 
                  ? "bg-primary-dark text-white font-bold shadow-sm" 
                  : "text-gray-600 hover:bg-gray-100 font-medium"
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? "text-white" : "text-gray-500 group-hover:text-primary-dark"}`} />
              <span className="text-sm">{item.name}</span>
            </Link>
          );
        })}
      </div>

      {/* Bottom Navigation */}
      <div className="p-4 space-y-2 border-t border-gray-200 bg-gray-50">
        <Link 
          href="/admin/dukungan"
          className="flex items-center justify-center gap-2 w-full bg-primary-dark hover:bg-green-800 text-white font-bold px-4 py-3 rounded-xl transition-colors shadow-sm mb-4"
        >
          <HeadphonesIcon className="w-4 h-4" />
          <span className="text-sm">Bantuan Teknis</span>
        </Link>

        {bottomItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-colors group ${
                isActive ? "text-primary-dark font-bold bg-green-50" : "text-gray-600 hover:bg-gray-100 font-medium"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-primary-dark" : "text-gray-400 group-hover:text-gray-600"}`} />
              <span className="text-sm">{item.name}</span>
            </Link>
          );
        })}
      </div>

    </div>
  );
}
