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
      

    </div>
  );
}
