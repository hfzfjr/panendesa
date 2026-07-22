import React from "react";
import { PembeliNavbar } from "../../../components/pembeli/PembeliNavbar";
import { PembeliFooter } from "../../../components/pembeli/PembeliFooter";
import { PembeliBottomNav } from "../../../components/pembeli/PembeliBottomNav";

export default function PembeliLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F8FAF6] font-sans selection:bg-[var(--color-primary)] selection:text-white flex flex-col md:pb-0 pb-16">
      
      {/* Desktop Navbar (Hidden specific items on Mobile inside component) */}
      <PembeliNavbar />
      
      {/* Main Content Area */}
      <div className="flex-grow">
        {children}
      </div>

      {/* Desktop Footer (Hidden on Mobile) */}
      <div className="hidden md:block">
        <PembeliFooter />
      </div>

      {/* Mobile Bottom Navigation */}
      <PembeliBottomNav />
      
    </div>
  );
}
