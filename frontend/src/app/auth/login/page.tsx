"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "../../../components/ui/Button";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-primary selection:text-white flex">

      {/* Left Column: Image & Branding (Hidden on mobile) */}
      <div className="hidden lg:flex lg:flex-col lg:w-1/2 lg:h-screen lg:bg-primary-dark lg:text-white lg:justify-between lg:overflow-hidden lg:p-12">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1595855761081-37d45cb04791?q=80&w=1200&auto=format&fit=crop"
            alt="Agriculture"
            className="w-full h-full object-cover opacity-40 mix-blend-overlay"
          />
        </div>

        <div className="relative z-10">
          <Link href="/" className="inline-block font-bold text-3xl tracking-tight mb-4 hover:opacity-80 transition-opacity">
            PanenDesa
          </Link>
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full text-sm font-semibold">
            <CheckCircle2 className="w-4 h-4 text-green-300" />
            Smart Marketplace
          </div>
        </div>

        <div className="relative z-10 max-w-md">
          <h2 className="text-4xl font-bold mb-4 leading-tight">Membangun ekosistem pangan yang adil dan transparan.</h2>
          <p className="text-white/80 text-lg leading-relaxed">
            Masuk ke akun Anda untuk mulai mengelola hasil panen, melakukan transaksi aman, dan berkontribusi pada efisiensi rantai pasok nasional.
          </p>
        </div>
      </div>

      {/* Right Column: Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-12 lg:px-16 xl:px-24 2xl:px-32 relative py-12 lg:py-0">

        {/* Back to Home Link */}
        <Link href="/" className="absolute top-8 left-6 sm:left-12 lg:left-16 xl:left-24 2xl:left-32 flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-primary-dark transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Beranda
        </Link>

        {/* Mobile Logo */}
        <Link href="/" className="lg:hidden font-bold text-3xl tracking-tight text-primary-dark mb-8">
          PanenDesa
        </Link>

        <div className="mb-8 mt-12 lg:mt-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Selamat Datang Kembali</h1>
          <p className="text-gray-500 text-sm">Silakan masukkan detail akun Anda untuk masuk ke sistem.</p>
        </div>

        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>

          <div className="space-y-1.5">
            <label className="text-sm font-bold text-gray-700">Nomor HP atau Email</label>
            <input
              type="text"
              placeholder="Contoh: 081234567890"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-gray-400"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold text-gray-700">Kata Sandi</label>
              <Link href="#" className="text-xs font-bold text-primary-dark hover:text-primary">
                Lupa kata sandi?
              </Link>
            </div>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-gray-400"
            />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input type="checkbox" id="remember" className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary" />
            <label htmlFor="remember" className="text-sm text-gray-600">Ingat saya di perangkat ini</label>
          </div>

          <Link href="/pembeli" className="block w-full pt-4">
            <Button className="w-full h-12 rounded-xl bg-primary-dark hover:bg-primary font-bold text-[15px] transition-colors">
              Masuk
            </Button>
          </Link>

        </form>

        <div className="mt-8 text-center text-sm text-gray-600">
          Belum punya akun?{' '}
          <Link href="/auth/register" className="font-bold text-primary-dark hover:text-primary">
            Daftar sekarang
          </Link>
        </div>

      </div>
    </div>
  );
}
