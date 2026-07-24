"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Menu, X, LayoutDashboard, Inbox, Package, ShoppingCart, Users, Truck, FileText, Settings, HelpCircle } from "lucide-react";

export function KopdesNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const menuLinks = [
    { name: "Dashboard", href: "/kopdes", icon: LayoutDashboard },
    { name: "Penerimaan / Intake", href: "/kopdes/penerimaan", icon: Inbox },
    { name: "Stok & Kapasitas", href: "/kopdes/stok", icon: Package },
    { name: "Pesanan Pembeli", href: "/kopdes/pesanan", icon: ShoppingCart },
    { name: "Data Petani", href: "/kopdes/petani", icon: Users },
    { name: "Logistik", href: "/kopdes/logistik", icon: Truck },
    { name: "Laporan", href: "/kopdes/laporan", icon: FileText },
  ];

  return (
    <>
      <header className="w-full h-16 bg-[#F9FAFB] border-b border-gray-200 fixed top-0 left-0 right-0 z-50 px-4 md:px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Mobile Hamburger Button */}
          <button 
            className="lg:hidden text-gray-700 hover:bg-gray-100 p-1.5 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <Link href="/kopdes" className="text-primary-dark font-bold text-xl md:text-2xl tracking-tight">
            PanenDesa
          </Link>
        </div>

        <div className="flex items-center gap-4 md:gap-6 text-neutral-600">
          <Link href="/kopdes/notifications" className="hover:text-primary relative" aria-label="Notifikasi">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 border-2 border-neutral-50 rounded-full"></span>
          </Link>
          <Link href="/kopdes/profile" className="w-8 h-8 rounded-full overflow-hidden border-2 border-white shadow-sm ring-1 ring-gray-200 cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=100&auto=format&fit=crop"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </Link>
        </div>
      </header>

      {/* Mobile Slide-out Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden flex">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMenuOpen(false)}
          ></div>

          {/* Menu Panel */}
          <div className="relative w-72 max-w-full bg-[#F9FAFB] h-full flex flex-col shadow-2xl animate-in slide-in-from-left">
            <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200 shrink-0">
              <span className="text-primary-dark font-bold text-xl tracking-tight">PanenDesa</span>
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-500 hover:bg-gray-100 p-1.5 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 px-4 space-y-1">
              <div className="mb-4 px-2">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Menu Koperasi</p>
              </div>
              {menuLinks.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                      isActive 
                        ? 'bg-primary-dark text-white font-bold shadow-sm' 
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 font-medium'
                    }`}
                  >
                    <item.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                    {item.name}
                  </Link>
                );
              })}

              <div className="mt-8 mb-4 px-2">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Lainnya</p>
              </div>
              <Link
                href="/kopdes/pengaturan"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-md transition-colors text-gray-600 hover:bg-gray-100 hover:text-gray-900 font-medium"
              >
                <Settings className="w-5 h-5 text-gray-500" />
                Pengaturan
              </Link>
              <Link
                href="/kopdes/bantuan"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-md transition-colors text-gray-600 hover:bg-gray-100 hover:text-gray-900 font-medium"
              >
                <HelpCircle className="w-5 h-5 text-gray-500" />
                Panduan Aplikasi
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
