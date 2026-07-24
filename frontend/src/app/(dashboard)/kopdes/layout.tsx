import React from "react";
import { KopdesSidebar } from "../../../components/kopdes/KopdesSidebar";
import { KopdesNavbar } from "../../../components/kopdes/KopdesNavbar";
import { KopdesBottomNav } from "../../../components/kopdes/KopdesBottomNav";

export default function KopdesDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F3F4F6] pb-16 lg:pb-0 relative">
      <KopdesNavbar />
      <div className="pt-16 lg:flex">
        <KopdesSidebar />
        <main className="flex-1 lg:ml-64 bg-[#F9FAFB] min-h-[calc(100vh-64px)]">
          {children}
        </main>
      </div>
      <KopdesBottomNav />
    </div>
  );
}
