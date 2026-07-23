import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-[#F6F6F2] py-8 px-6 lg:px-12 border-t border-gray-200">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Bagian Kiri: Logo & Copyright */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <Link href="/" className="text-[#166534] font-bold text-2xl tracking-tight">
            PanenDesa
          </Link>
          <p className="text-gray-600 text-sm font-medium">
            © 2026 PanenDesa Smart Marketplace. Farm-to-Table Efficiency.
          </p>
        </div>

        {/* Bagian Kanan: Tautan Navigasi Bawah */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-[15px] text-gray-800 font-medium">
          <Link 
            href="/about" 
            className="underline underline-offset-4 decoration-gray-400 hover:text-[#166534] hover:decoration-[#166534] transition-all"
          >
            About Us
          </Link>
          <Link 
            href="/help" 
            className="underline underline-offset-4 decoration-gray-400 hover:text-[#166534] hover:decoration-[#166534] transition-all"
          >
            Help Center
          </Link>
          <Link 
            href="/terms" 
            className="underline underline-offset-4 decoration-gray-400 hover:text-[#166534] hover:decoration-[#166534] transition-all"
          >
            Terms of Service
          </Link>
          <Link 
            href="/privacy" 
            className="underline underline-offset-4 decoration-gray-400 hover:text-[#166534] hover:decoration-[#166534] transition-all"
          >
            Privacy Policy
          </Link>
        </div>

      </div>
    </footer>
  );
}