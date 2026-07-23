"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Tractor, Store, Building2, ChevronRight } from "lucide-react";
import { Button } from "../../../components/ui/Button";

type Role = "petani" | "kopdes" | "pembeli" | null;

export default function RegisterPage() {
  const [step, setStep] = useState<1 | 2>(1);
  const [role, setRole] = useState<Role>(null);

  const handleRoleSelect = (selectedRole: Role) => {
    setRole(selectedRole);
    setStep(2);
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
      setRole(null);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-primary selection:text-white flex">

      {/* Left Column: Image & Branding (Hidden on mobile) */}
      <div className="hidden lg:flex lg:flex-col lg:w-1/2 lg:h-screen lg:bg-primary-dark lg:text-white lg:justify-between lg:overflow-hidden lg:p-12">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1592982537447-6f233486be22?q=80&w=1200&auto=format&fit=crop"
            alt="Agriculture"
            className="w-full h-full object-cover opacity-30 mix-blend-overlay"
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
          <h2 className="text-4xl font-bold mb-4 leading-tight">Bergabunglah dengan ekosistem kami.</h2>
          <p className="text-white/80 text-lg leading-relaxed">
            Pilih peran Anda dan mulai perjalanan menuju pertanian cerdas yang terhubung, efisien, dan menguntungkan semua pihak.
          </p>
        </div>
      </div>

      {/* Right Column: Dynamic Form Area */}
      <div className="w-full lg:w-1/2 flex flex-col min-h-screen px-6 sm:px-12 lg:px-16 xl:px-24 2xl:px-32 py-12 relative overflow-y-auto">

        {/* Navigation / Back Button */}
        <div className="absolute top-8 left-6 sm:left-12 lg:left-16 xl:left-24 2xl:left-32">
          {step === 1 ? (
            <Link href="/" className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-primary-dark transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Beranda
            </Link>
          ) : (
            <button onClick={handleBack} className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-primary-dark transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Pilih Peran Lain
            </button>
          )}
        </div>

        {/* Mobile Logo */}
        <Link href="/" className="lg:hidden font-bold text-3xl tracking-tight text-primary-dark mt-8 mb-8">
          PanenDesa
        </Link>

        {/* Step 1: Select Role */}
        {step === 1 && (
          <div className="mt-8 lg:mt-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Pilih Peran Anda</h1>
            <p className="text-gray-500 text-sm mb-10">Pilih jenis akun yang sesuai dengan kebutuhan Anda di platform PanenDesa.</p>

            <div className="space-y-4">

              {/* Role: Pembeli */}
              <button
                onClick={() => handleRoleSelect("pembeli")}
                className="w-full flex items-center justify-between p-6 border-2 border-gray-200 rounded-2xl hover:border-primary hover:bg-green-50/30 transition-all group text-left"
              >
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Building2 className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-1">Pembeli / Perusahaan</h3>
                    <p className="text-sm text-gray-500 line-clamp-2">Cari dan beli komoditas berkualitas langsung dari Koperasi Desa.</p>
                  </div>
                </div>
                <ChevronRight className="w-6 h-6 text-gray-300 group-hover:text-primary transition-colors shrink-0" />
              </button>

              {/* Role: Kopdes */}
              <button
                onClick={() => handleRoleSelect("kopdes")}
                className="w-full flex items-center justify-between p-6 border-2 border-gray-200 rounded-2xl hover:border-primary hover:bg-green-50/30 transition-all group text-left"
              >
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-xl bg-green-50 text-green-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Store className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-1">Koperasi Desa (Kopdes)</h3>
                    <p className="text-sm text-gray-500 line-clamp-2">Kelola hasil panen desa Anda dan distribusikan ke jaringan pasar luas.</p>
                  </div>
                </div>
                <ChevronRight className="w-6 h-6 text-gray-300 group-hover:text-primary transition-colors shrink-0" />
              </button>

              {/* Role: Petani */}
              <button
                onClick={() => handleRoleSelect("petani")}
                className="w-full flex items-center justify-between p-6 border-2 border-gray-200 rounded-2xl hover:border-primary hover:bg-green-50/30 transition-all group text-left"
              >
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Tractor className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-1">Petani</h3>
                    <p className="text-sm text-gray-500 line-clamp-2">Setor hasil panen Anda ke Kopdes dengan harga yang transparan.</p>
                  </div>
                </div>
                <ChevronRight className="w-6 h-6 text-gray-300 group-hover:text-primary transition-colors shrink-0" />
              </button>

            </div>
          </div>
        )}

        {/* Step 2: Form Input */}
        {step === 2 && role && (
          <div className="mt-8 lg:mt-16 animate-in fade-in slide-in-from-right-8 duration-500 pb-10">

            {/* Dynamic Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${role === 'pembeli' ? 'bg-blue-50 text-blue-600' :
                role === 'kopdes' ? 'bg-green-50 text-green-600' :
                  'bg-orange-50 text-orange-600'
                }`}>
                {role === 'pembeli' ? <Building2 className="w-5 h-5" /> :
                  role === 'kopdes' ? <Store className="w-5 h-5" /> :
                    <Tractor className="w-5 h-5" />}
              </div>
              <h1 className="text-2xl font-bold text-gray-900 capitalize">Daftar Akun {role}</h1>
            </div>

            <p className="text-gray-500 text-sm mb-8">
              Lengkapi data profil di bawah ini untuk menyelesaikan pendaftaran Anda.
            </p>

            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>

              {/* ----------------- FORM PETANI ----------------- */}
              {role === "petani" && (
                <>
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-gray-700">Nama Lengkap</label>
                    <input type="text" placeholder="Sesuai KTP" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:outline-none placeholder:text-gray-400" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-gray-700">NIK (Nomor Induk Kependudukan)</label>
                    <input type="text" placeholder="16 Digit NIK" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:outline-none placeholder:text-gray-400" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-gray-700">Asal Desa / Lokasi</label>
                    <input type="text" placeholder="Contoh: Desa Sukamaju, Cianjur" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:outline-none placeholder:text-gray-400" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-gray-700">Nomor HP</label>
                    <input type="text" placeholder="Contoh: 0812..." className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:outline-none placeholder:text-gray-400" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-gray-700">Kata Sandi</label>
                    <input type="password" placeholder="Min. 8 karakter" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:outline-none placeholder:text-gray-400" />
                  </div>
                </>
              )}

              {/* ----------------- FORM KOPDES ----------------- */}
              {role === "kopdes" && (
                <>
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-gray-700">Nama Koperasi</label>
                    <input type="text" placeholder="Contoh: Kopdes Makmur Abadi" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:outline-none placeholder:text-gray-400" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-gray-700">Nomor Badan Hukum / SK</label>
                    <input type="text" placeholder="Nomor perizinan operasional" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:outline-none placeholder:text-gray-400" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-gray-700">Desa Induk (Area Operasional)</label>
                    <input type="text" placeholder="Contoh: Desa Lembang, Bandung" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:outline-none placeholder:text-gray-400" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-gray-700">Nama Penanggung Jawab</label>
                    <input type="text" placeholder="Nama ketua/pengurus" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:outline-none placeholder:text-gray-400" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-bold text-gray-700">Nomor HP</label>
                      <input type="text" placeholder="0812..." className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:outline-none placeholder:text-gray-400" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-bold text-gray-700">Kata Sandi</label>
                      <input type="password" placeholder="••••••••" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:outline-none placeholder:text-gray-400" />
                    </div>
                  </div>
                </>
              )}

              {/* ----------------- FORM PEMBELI ----------------- */}
              {role === "pembeli" && (
                <>
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-gray-700">Nama Lengkap / Perusahaan</label>
                    <input type="text" placeholder="Nama Anda atau PT/CV" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:outline-none placeholder:text-gray-400" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-gray-700">Tipe Pembeli</label>
                    <select className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:outline-none text-gray-700 bg-white">
                      <option value="">-- Pilih Tipe --</option>
                      <option value="retail">Retail (Individu/Warung)</option>
                      <option value="b2b">Grosir B2B (Pabrik/Supermarket)</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-gray-700">Alamat Pengiriman Utama</label>
                    <textarea rows={3} placeholder="Alamat lengkap tujuan pengiriman" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:outline-none placeholder:text-gray-400 resize-none"></textarea>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-bold text-gray-700">Nomor HP</label>
                      <input type="text" placeholder="0812..." className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:outline-none placeholder:text-gray-400" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-bold text-gray-700">Kata Sandi</label>
                      <input type="password" placeholder="••••••••" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:outline-none placeholder:text-gray-400" />
                    </div>
                  </div>
                </>
              )}

              <div className="pt-4">
                <Button className="w-full h-12 rounded-xl bg-primary-dark hover:bg-primary font-bold text-[15px] transition-colors">
                  Buat Akun
                </Button>
                <p className="text-xs text-center text-gray-500 mt-4 leading-relaxed">
                  Dengan mendaftar, Anda menyetujui <span className="font-bold text-primary-dark">Syarat & Ketentuan</span> serta <span className="font-bold text-primary-dark">Kebijakan Privasi</span> PanenDesa.
                </p>
              </div>

            </form>
          </div>
        )}

        {/* Footer Link */}
        <div className="mt-auto pt-8 text-center text-sm text-gray-600">
          Sudah punya akun?{' '}
          <Link href="/auth/login" className="font-bold text-primary-dark hover:text-primary">
            Masuk di sini
          </Link>
        </div>

      </div>
    </div>
  );
}
