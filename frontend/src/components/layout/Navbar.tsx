import React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";

export default function Navbar() {
    return (
        <nav className="flex items-center justify-between px-6 py-5 lg:px-12 bg-white sticky top-0 z-50 border-b border-gray-100">

            {/* Bagian Kiri: Logo */}
            <div className="flex items-center md:w-1/4">
                <Link href="/" className="text-[#324F37] font-extrabold text-2xl tracking-tight">
                    PanenDesa
                </Link>
            </div>

            {/* Bagian Tengah: Menu Navigasi */}
            <div className="hidden md:flex flex-1 items-center justify-center gap-10 text-[15px] font-bold text-[#324F37]">
                <Link href="/dashboard" className="border-b-[3px] border-[#324F37] pb-1">
                    Dashboard
                </Link>
                <Link href="/hasil-panen" className="hover:opacity-75 transition-opacity pb-1">
                    Hasil Panen
                </Link>
                <Link href="/tentang" className="hover:opacity-75 transition-opacity pb-1">
                    Tentang Kami
                </Link>
                <Link href="/kontak" className="hover:opacity-75 transition-opacity pb-1">
                    Kontak
                </Link>
            </div>

            {/* Bagian Kanan: Tombol Gabung */}
            <div className="hidden md:flex items-center justify-end md:w-1/4">
                <Link
                    href="/auth/register"
                    className="bg-[#324F37] hover:bg-[#223625] text-white font-bold py-3 px-8 rounded-full transition-colors text-[15px]"
                >
                    Gabung Sekarang
                </Link>
            </div>

            {/* Menu Mobile */}
            <div className="md:hidden">
                <Menu className="w-6 h-6 text-[#324F37] cursor-pointer" />
            </div>

        </nav>
    );
}