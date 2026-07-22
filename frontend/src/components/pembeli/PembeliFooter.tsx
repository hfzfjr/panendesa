import React from "react";
import Link from "next/link";

export function PembeliFooter() {
  return (
    <footer className="w-full bg-[#EAEBE6] px-6 py-8 lg:px-12 border-t border-gray-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start gap-1">
          <Link href="/" className="text-[var(--color-primary-dark)] font-bold text-xl tracking-tight">
            PanenDesa
          </Link>
          <p className="text-gray-500 text-xs">
            © 2026 PanenDesa Smart Marketplace. Farm-to-Table Efficiency.
          </p>
        </div>
        
        <div className="flex items-center gap-6 text-xs font-bold text-gray-600">
          <Link href="#" className="hover:text-[var(--color-primary)] transition-colors">About Us</Link>
          <Link href="#" className="hover:text-[var(--color-primary)] transition-colors">Help Center</Link>
          <Link href="#" className="hover:text-[var(--color-primary)] transition-colors">Terms of Service</Link>
          <Link href="#" className="hover:text-[var(--color-primary)] transition-colors">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
}
