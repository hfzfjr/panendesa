"use client";

import React from "react";
import { Bell, Menu } from "lucide-react";
import Link from "next/link";

interface AdminTopbarProps {
  onMenuClick?: () => void;
}

export default function AdminTopbar({ onMenuClick }: AdminTopbarProps) {
  return (
    <div className="h-20 bg-gray-50 border-b border-gray-200 flex items-center justify-between px-4 md:px-8 shrink-0 sticky top-0 z-10 w-full">
      
      {/* Mobile Menu & Logo */}
      <div className="flex items-center gap-4 md:hidden">
        <button 
          onClick={onMenuClick}
          className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
        <Link href="/admin" className="font-extrabold text-xl text-primary-dark tracking-tight">
          PanenDesa
        </Link>
      </div>

      <div className="hidden md:block">
        {/* Empty space for desktop left side (Logo is in sidebar) */}
      </div>

      {/* Right Side: Notification & Profile */}
      <div className="flex items-center gap-6">
        
        {/* Notification Bell */}
        <button className="relative p-2 text-gray-600 hover:bg-gray-200 rounded-full transition-colors group">
          <Bell className="w-5 h-5 group-hover:text-gray-900 transition-colors" />
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 border-2 border-gray-50 rounded-full"></span>
        </button>

        <div className="w-px h-8 bg-gray-300"></div>

        {/* Profile */}
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="hidden md:block text-right">
            <p className="text-sm font-bold text-gray-900 leading-none">Administrator</p>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">SUPER ADMIN</p>
          </div>
          <img 
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop" 
            alt="Admin Profile" 
            className="w-10 h-10 rounded-full object-cover border-2 border-gray-200 group-hover:border-primary-dark transition-colors"
          />
        </div>

      </div>
    </div>
  );
}
