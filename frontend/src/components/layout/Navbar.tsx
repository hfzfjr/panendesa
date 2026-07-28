"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <nav className="flex items-center justify-between px-6 py-5 lg:px-12 bg-white sticky top-0 z-50 border-b border-gray-100">

                {/* Bagian Kiri: Hamburger + Logo */}
                <div className="flex items-center gap-3 md:w-1/4">
                    {/* Hamburger Button - Mobile Only */}
                    <button
                        onClick={() => setIsMenuOpen(true)}
                        className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <Menu className="w-6 h-6 text-[#324F37]" />
                    </button>

                    {/* Logo */}
                    <Link href="/" className="text-[#324F37] font-extrabold text-2xl tracking-tight">
                        PanenDesa
                    </Link>
                </div>

                {/* Bagian Tengah: Menu Navigasi - Desktop Only */}
                <div className="hidden md:flex flex-1 items-center justify-center gap-10 text-[15px] font-bold text-[#324F37]">
                    <Link href="/dashboard" className="border-b-[3px] border-[#324F37] pb-1">
                        Dashboard
                    </Link>
                    <Link href="/pembeli" className="hover:opacity-75 transition-opacity pb-1">
                        Marketplace
                    </Link>
                    <Link href="/tentang" className="hover:opacity-75 transition-opacity pb-1">
                        Tentang Kami
                    </Link>
                    <Link href="/kontak" className="hover:opacity-75 transition-opacity pb-1">
                        Kontak
                    </Link>
                </div>

                {/* Bagian Kanan: Tombol Masuk (Selalu Terlihat) */}
                <div className="flex items-center justify-end md:w-1/4">
                    <Link
                        href="/auth/login"
                        className="bg-[#324F37] hover:bg-[#223625] text-white font-bold py-3 px-8 rounded-full transition-colors text-[15px]"
                    >
                        Masuk
                    </Link>
                </div>

            </nav>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="fixed inset-0 z-60 md:hidden flex">
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={() => setIsMenuOpen(false)}
                    ></div>

                    {/* Drawer */}
                    <div className="relative w-4/5 max-w-sm bg-white h-full shadow-2xl flex flex-col">
                        <div className="flex items-center justify-between p-5 border-b border-gray-100">
                            <span className="text-[#324F37] font-extrabold text-2xl tracking-tight">PanenDesa</span>
                            <button
                                onClick={() => setIsMenuOpen(false)}
                                className="w-8 h-8 flex items-center justify-center bg-gray-100 text-gray-500 rounded-full hover:bg-gray-200 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
                            <Link
                                href="/dashboard"
                                onClick={() => setIsMenuOpen(false)}
                                className="block px-4 py-3 text-[#324F37] font-bold text-[15px] hover:bg-gray-50 rounded-lg transition-colors"
                            >
                                Dashboard
                            </Link>
                            <Link
                                href="/pembeli"
                                onClick={() => setIsMenuOpen(false)}
                                className="block px-4 py-3 text-[#324F37] font-bold text-[15px] hover:bg-gray-50 rounded-lg transition-colors"
                            >
                                Marketplace
                            </Link>
                            <Link
                                href="/tentang"
                                onClick={() => setIsMenuOpen(false)}
                                className="block px-4 py-3 text-[#324F37] font-bold text-[15px] hover:bg-gray-50 rounded-lg transition-colors"
                            >
                                Tentang Kami
                            </Link>
                            <Link
                                href="/kontak"
                                onClick={() => setIsMenuOpen(false)}
                                className="block px-4 py-3 text-[#324F37] font-bold text-[15px] hover:bg-gray-50 rounded-lg transition-colors"
                            >
                                Kontak
                            </Link>
                        </div>

                        <div className="p-4 border-t border-gray-100">
                            <Link
                                href="/auth/register"
                                onClick={() => setIsMenuOpen(false)}
                                className="block w-full bg-[#324F37] hover:bg-[#223625] text-white font-bold py-3 px-8 rounded-full transition-colors text-[15px] text-center"
                            >
                                Gabung Sekarang
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}