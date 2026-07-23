import React from "react";
import { PetaniSidebar } from "../../../components/petani/PetaniSidebar";
import { PetaniNavbar } from "../../../components/petani/PetaniNavbar";
import { PetaniBottomNav } from "../../../components/petani/PetaniBottomNav";

import { MessageCircle } from "lucide-react";

export default function PetaniDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F3F4F6] pb-16 lg:pb-0 relative">
      <PetaniNavbar />
      <div className="pt-16 lg:flex">
        <PetaniSidebar />
        <main className="flex-1 lg:ml-64 bg-[#F3F4F6] min-h-[calc(100vh-64px)]">
          {children}
        </main>
      </div>
      <PetaniBottomNav />
      
      {/* Tombol Bantuan WA Melayang (Global) */}
      <button className="fixed bottom-20 lg:bottom-8 left-4 lg:left-72 bg-[#25D366] text-white p-4 rounded-full shadow-xl flex items-center justify-center gap-2 hover:bg-[#128C7E] transition-all z-50 group">
        <MessageCircle className="w-8 h-8 md:w-6 md:h-6" />
        <span className="hidden md:inline-block font-bold pr-2">Tanya Admin</span>
      </button>
    </div>
  );
}
