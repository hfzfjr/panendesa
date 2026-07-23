"use client";

import React from "react";
import Link from "next/link";
import { Bell } from "lucide-react";

export function PetaniNavbar() {
  return (
    <header className="w-full h-16 bg-[#F9FAFB] border-b border-gray-200 fixed top-0 left-0 right-0 z-50 px-4 md:px-8 flex items-center justify-between">
      <Link href="/petani" className="font-bold text-[#1A1C19] text-xl flex items-center gap-2">
        <span className="text-gray-800">Panen</span>
        <span className="text-[#1B5E20]">Desa</span>
      </Link>

      <div className="flex items-center gap-4 md:gap-6">
        <Link href="/petani/notifications" className="relative text-gray-600 hover:text-gray-900 transition-colors">
          <Bell className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#F9FAFB]"></span>
        </Link>
        <Link href="/petani/profile" className="w-8 h-8 rounded-full overflow-hidden border-2 border-white shadow-sm ring-1 ring-gray-200">
          <img
            src="https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?q=80&w=100&auto=format&fit=crop"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </Link>
      </div>
    </header>
  );
}
