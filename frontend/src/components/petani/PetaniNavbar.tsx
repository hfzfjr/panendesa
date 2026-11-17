"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Bell, Menu, X, LayoutDashboard, Sprout, ClipboardCheck, ShoppingCart, Truck, Award, Headphones, Settings, HelpCircle } from "lucide-react";
import { authStorage } from "@/lib/auth";

export function PetaniNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const [user, setUser] = useState<{ nama?: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = authStorage.getUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  const getInitials = (name?: string) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const menuLinks = [
    { name: "Halaman Utama", href: "/petani", icon: LayoutDashboard },
    { name: "Tanaman Saya", href: "/petani/tanaman", icon: Sprout },
    { name: "Buku Tabungan", href: "/petani/pendapatan", icon: ClipboardCheck },
    { name: "Pesanan Masuk", href: "/petani/pesanan", icon: ShoppingCart },
    { name: "Pengiriman", href: "/petani/logistik", icon: Truck },
    { name: "Skor Kepercayaan", href: "/petani/skor", icon: Award },
    { name: "Konsultasi Pertanian", href: "/petani/bantuan-teknis", icon: Headphones },
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

          <Link href="/petani" className="relative h-10 w-auto">
            <Image
              src="/logo/logo-tulisan.svg"
              alt="PanenDesa"
              width={200}
              height={40}
              className="h-10 w-auto"
              priority
            />
          </Link>
        </div>

        <div className="flex items-center gap-4 md:gap-6 text-neutral-600">
          <Link href="/petani/notifikasi" className="hover:text-primary relative" aria-label="Notifikasi">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 border-2 border-neutral-50 rounded-full"></span>
          </Link>
          <Link href="/petani/profil" className="w-8 h-8 rounded-full overflow-hidden border-2 border-white shadow-sm ring-1 ring-gray-200 cursor-pointer bg-primary-dark/10 flex items-center justify-center">
            {loading ? (
              <div className="w-full h-full bg-gray-200 animate-pulse"></div>
            ) : (
              <span className="text-xs font-bold text-primary-dark">{getInitials(user?.nama)}</span>
            )}
          </Link>
        </div>
      </header>

      {/* Mobile Slide-out Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-60 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMenuOpen(false)}
          ></div>

          {/* Drawer */}
          <div className="relative w-4/5 max-w-sm bg-white h-full shadow-2xl flex flex-col animate-slide-right">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <div className="relative h-10 w-auto">
                <Image
                  src="/logo/logo-tulisan.svg"
                  alt="PanenDesa"
                  width={200}
                  height={40}
                  className="h-10 w-auto"
                  priority
                />
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="w-8 h-8 flex items-center justify-center bg-gray-100 text-gray-500 rounded-full hover:bg-gray-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
              <p className="px-3 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Menu Utama</p>
              {menuLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium ${isActive
                      ? "bg-primary-dark text-white shadow-sm"
                      : "text-gray-700 hover:bg-gray-50"
                      }`}
                  >
                    <link.icon className="w-5 h-5" />
                    <span>{link.name}</span>
                  </Link>
                );
              })}
            </div>

            <div className="p-4 border-t border-gray-100">
              <div className="flex items-center gap-3 mb-4 px-2">
                <div className="w-10 h-10 rounded-full bg-primary-dark/10 flex items-center justify-center border-2 border-white shadow-sm ring-1 ring-gray-200">
                  {loading ? (
                    <div className="w-full h-full bg-gray-200 animate-pulse rounded-full"></div>
                  ) : (
                    <span className="text-xs font-bold text-primary-dark">{getInitials(user?.nama)}</span>
                  )}
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">{user?.nama || 'Petani'}</p>
                  <p className="text-xs text-green-600 font-bold">Petani Teladan (Tier 1)</p>
                </div>
              </div>
              <Link
                href="/petani/pengaturan"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors font-medium text-sm"
              >
                <Settings className="w-4 h-4" />
                <span>Pengaturan Akun</span>
              </Link>
              <button className="w-full mt-2 bg-red-50 text-red-600 hover:bg-red-100 font-bold py-2.5 rounded-xl transition-colors text-sm">
                Keluar Aplikasi
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
