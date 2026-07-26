import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  ShieldCheck,
  Truck,
  Tag,
  Share2,
  CheckCircle2,
  XCircle,
  ChevronDown,
  TrendingUp,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-(--color-neutral-100) text-(--color-neutral-900) font-sans selection:bg-(--color-primary) selection:text-(--color-neutral-900) flex flex-col">
      {/* Navbar */}
      <Navbar />

      <main className="grow flex flex-col items-center">
        {/* Hero Section - 100vh Section Wrapper with Inner Card */}
        <section className="w-full h-screen min-h-175 flex items-center justify-center px-4 lg:px-8 bg-white">
          <div className="w-full max-w-7xl h-[85vh] min-h-137.5 bg-linear-to-br from-(--color-primary) to-(--color-primary-dark) rounded-[40px] overflow-hidden relative shadow-xl flex items-center">
            {/* Background Pattern/Glow */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
            
            {/* Animated Blobs */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
            <div className="absolute top-0 right-32 w-96 h-96 bg-green-400/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 right-20 w-96 h-96 bg-emerald-400/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>

            <div className="relative z-10 w-full px-8 lg:px-16 grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h1 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight">
                  Membangun Kedaulatan Pangan dari Desa
                </h1>
                <p className="text-base lg:text-lg text-white/90 max-w-lg leading-relaxed font-medium">
                  Sistem koordinasi rantai pasok desa yang transparan, mengelola hasil panen kolektif melalui Koperasi Desa untuk kesejahteraan petani.
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <Link href="/auth/register">
                    <Button variant="accent" size="lg" className="rounded-full font-bold shadow-lg bg-(--color-accent) text-white hover:bg-yellow-600">
                      Gabung Sekarang
                    </Button>
                  </Link>
                  <Button variant="outline" size="lg" className="rounded-full text-white border-white hover:bg-white/10">
                    Pelajari Lebih Lanjut
                  </Button>
                </div>
              </div>

              {/* Floating Glassmorphism Design */}
              <div className="hidden lg:flex relative items-center justify-center h-full min-h-[500px]">
                {/* Main Image */}
                <div className="relative w-80 h-[420px] rounded-[32px] overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500 z-10 border-4 border-white/20">
                  <img 
                    src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800&auto=format&fit=crop" 
                    alt="Sayuran Segar" 
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="inline-block px-3 py-1 bg-green-500/90 backdrop-blur rounded-full text-white text-xs font-bold mb-2">
                      Panen Hari Ini
                    </div>
                    <p className="text-white font-extrabold text-xl">Sayuran Organik Premium</p>
                    <p className="text-white/90 text-sm mt-1">Langsung dari Petani Lokal</p>
                  </div>
                </div>

                {/* Floating Card 1: Price Tag */}
                <div className="absolute -left-12 top-24 bg-white/20 backdrop-blur-lg border border-white/30 p-4 rounded-2xl shadow-xl z-20 transform -translate-y-4 hover:-translate-y-6 transition-transform duration-300">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-(--color-primary-dark) shadow-inner">
                      <TrendingUp className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-white/90 text-xs font-medium uppercase tracking-wider">Cabai Rawit Merah</p>
                      <p className="text-white font-extrabold text-xl">Rp 45.000<span className="text-sm font-normal text-white/70">/kg</span></p>
                    </div>
                  </div>
                </div>

                {/* Floating Card 2: Verified */}
                <div className="absolute -right-8 bottom-32 bg-white/20 backdrop-blur-lg border border-white/30 p-4 rounded-2xl shadow-xl z-20 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-inner">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-white font-extrabold text-lg">Terverifikasi</p>
                      <p className="text-white/90 text-xs">Standar Koperasi Desa</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Quick Links */}
        <section className="w-full max-w-7xl mx-auto px-4 lg:px-8 -mt-10 relative z-20">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white p-6 lg:p-8">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6 text-center">Kategori Pilihan</h3>
            <div className="grid grid-cols-4 md:grid-cols-5 gap-4 lg:gap-8 justify-items-center">
              {[
                { name: "Sayuran", icon: "🥬", color: "bg-green-100 text-green-600" },
                { name: "Buah", icon: "🍉", color: "bg-red-100 text-red-600" },
                { name: "Biji-bijian", icon: "🌾", color: "bg-yellow-100 text-yellow-600" },
                { name: "Rempah", icon: "🧄", color: "bg-orange-100 text-orange-600" },
                { name: "Grosir", icon: "📦", color: "bg-blue-100 text-blue-600", hiddenMobile: true },
              ].map((cat, idx) => (
                <Link 
                  href={`/pembeli/marketplace?category=${encodeURIComponent(cat.name)}`}
                  key={idx} 
                  className={`flex flex-col items-center gap-3 cursor-pointer group ${cat.hiddenMobile ? 'hidden md:flex' : 'flex'}`}
                >
                  <div className={`w-14 h-14 lg:w-16 lg:h-16 rounded-[20px] ${cat.color} flex items-center justify-center text-2xl lg:text-3xl shadow-sm group-hover:scale-110 group-hover:shadow-md transition-all duration-300 transform group-hover:-translate-y-1`}>
                    {cat.icon}
                  </div>
                  <span className="text-xs lg:text-sm font-bold text-gray-600 group-hover:text-primary-dark transition-colors">
                    {cat.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Daftar Komoditas / Marketplace Preview */}
        <section id="komoditas" className="w-full bg-gradient-to-b from-[#FAFAFA] to-green-50/40 py-28">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <div className="flex justify-between items-end mb-10">
              <div>
                <span className="text-[var(--color-primary)] font-bold text-sm tracking-wider uppercase mb-2 block">
                  Marketplace
                </span>
                <h2 className="text-3xl font-extrabold text-[var(--color-neutral-900)]">
                  Komoditas Tersedia
                </h2>
              </div>
              <Link href="/pembeli">
                <Button variant="outline" className="hidden md:flex items-center gap-2 border-[var(--color-primary-dark)] text-[var(--color-primary-dark)] hover:bg-green-50">
                  Lihat Semua
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {[
                { id: "1", name: "Cabai Merah Keriting Premium", price: "Rp 35.000", unit: "kg", village: "Desa Cibodas", rating: 4.8, sold: "1.2rb", grade: "Grade A", img: "https://images.unsplash.com/photo-1596199050105-6d5d32222916?q=80&w=600&auto=format&fit=crop" },
                { id: "2", name: "Tomat Merah Segar", price: "Rp 12.000", unit: "kg", village: "Desa Sukamaju", rating: 4.9, sold: "850", grade: "Grade A", img: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=600&auto=format&fit=crop" },
                { id: "3", name: "Bawang Merah Besar", price: "Rp 28.000", unit: "kg", village: "Desa Brebes", rating: 4.7, sold: "2.1rb", grade: "Grade B", img: "https://images.unsplash.com/photo-1618512496248-a07ce83aa8cb?q=80&w=600&auto=format&fit=crop" },
                { id: "4", name: "Kentang Dieng Super", price: "Rp 18.000", unit: "kg", village: "Desa Dieng Kulon", rating: 5.0, sold: "3.4rb", grade: "Grade A", img: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?q=80&w=600&auto=format&fit=crop" },
              ].map((item, idx) => {
                const getGradeColor = (grade: string) => {
                  if (grade.includes("A")) return "bg-gradient-to-r from-amber-400 to-yellow-500 text-white shadow-yellow-500/30";
                  if (grade.includes("B")) return "bg-gradient-to-r from-slate-400 to-slate-500 text-white shadow-slate-500/30";
                  return "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-green-500/30";
                };
                
                return (
                  <Link href={`/pembeli/marketplace/${item.id}`} key={idx} className="group flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 overflow-hidden relative h-full">
                    
                    {/* Image Section */}
                    <div className="w-full aspect-square overflow-hidden bg-gray-50 relative">
                      <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" />
                      
                      {/* Overlay Gradient for Text */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {/* Premium Grade Badge */}
                      <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-full flex items-center gap-1 text-[10px] font-black uppercase tracking-wider shadow-md ${getGradeColor(item.grade)}`}>
                        <ShieldCheck className="w-3 h-3" />
                        {item.grade}
                      </div>
                    </div>
                    
                    {/* Content Section */}
                    <div className="p-4 flex flex-col flex-1 relative bg-white">
                      <h3 className="font-extrabold text-gray-900 text-sm md:text-base line-clamp-2 mb-1.5 group-hover:text-[var(--color-primary-dark)] transition-colors leading-snug">
                        {item.name}
                      </h3>
                      
                      <div className="text-lg md:text-xl font-black text-gray-900 mb-3 tracking-tight">
                        {item.price}
                        <span className="text-xs font-medium text-gray-400 ml-0.5">/{item.unit}</span>
                      </div>
                      
                      <div className="mt-auto pt-3 border-t border-gray-100">
                        <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-2.5 font-medium">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin w-3.5 h-3.5 text-red-400 shrink-0"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                          <span className="truncate">{item.village}</span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-xs">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star w-3.5 h-3.5 fill-amber-400 text-amber-400"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                            <span className="font-bold text-gray-700">{item.rating}</span>
                          </div>
                          <div className="text-[11px] font-medium text-gray-400 bg-gray-50 px-2 py-0.5 rounded-md">
                            Terjual {item.sold}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
            
            <div className="mt-8 md:hidden flex justify-center">
              <Link href="/pembeli">
                <Button variant="outline" className="w-full border-[var(--color-primary-dark)] text-[var(--color-primary-dark)]">
                  Lihat Semua Komoditas
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Bagaimana Cara Kerjanya */}
        <section id="cara-kerja" className="w-full bg-white py-28">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 text-center">
            <h2 className="text-3xl font-extrabold text-(--color-neutral-900) mb-20">
              Bagaimana Cara Kerjanya?
            </h2>

            <div className="flex flex-col md:flex-row items-center justify-center gap-12 relative">
              {/* Connector Line (Desktop) */}
              <div className="hidden md:block absolute top-8 left-[15%] right-[15%] h-0.5 bg-gray-200 z-0"></div>

              {[
                { step: "1", title: "Daftar & Login", desc: "Daftarkan diri Anda sebagai Petani, Petugas Kopdes, atau Pembeli." },
                { step: "2", title: "Masuk & Laporan", desc: "Input estimasi stok hasil panen dan pantau proses verifikasi di koperasi." },
                { step: "3", title: "Distribusi & Cuan", desc: "Terima pembagian hasil transparan dari penjualan terkoordinasi." },
              ].map((item, idx) => (
                <div key={idx} className="relative z-10 flex flex-col items-center max-w-xs w-full">
                  <div className="w-16 h-16 rounded-full bg-(--color-primary) text-white text-2xl font-bold flex items-center justify-center mb-6 shadow-lg shadow-green-900/20">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-bold mb-3">{item.title}</h3>
                  <p className="text-(--color-neutral-600) text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Kenapa PanenDesa - Bento Box Style */}
        <section className="w-full bg-slate-50 py-28 border-y border-slate-100">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-primary-dark font-extrabold text-sm tracking-widest uppercase mb-3 block">Keunggulan</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-neutral-900 tracking-tight">
                Kenapa Memilih PanenDesa?
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {/* Card 1 */}
              <div className="bg-white rounded-[32px] p-8 shadow-sm hover:shadow-2xl border border-gray-100 transform hover:-translate-y-2 transition-all duration-300 group">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white mb-8 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-4">100% Transparan</h3>
                <p className="text-neutral-500 text-sm leading-relaxed font-medium">
                  Potongan biaya platform selalu terlihat sejak awal. Pembagian hasil panen kepada setiap petani dihitung secara transparan dan otomatis berdasarkan kualitas.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-white rounded-[32px] p-8 shadow-sm hover:shadow-2xl border border-gray-100 transform hover:-translate-y-2 transition-all duration-300 group">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white mb-8 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Truck className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-4">Pengiriman Cepat</h3>
                <p className="text-neutral-500 text-sm leading-relaxed font-medium">
                  Rantai logistik yang dikelola Koperasi Desa memastikan jadwal pengiriman selalu terkoordinasi rapi untuk menjaga kesegaran hasil panen Anda.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-white rounded-[32px] p-8 shadow-sm hover:shadow-2xl border border-gray-100 transform hover:-translate-y-2 transition-all duration-300 group">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white mb-8 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Tag className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-4">Harga Paling Adil</h3>
                <p className="text-neutral-500 text-sm leading-relaxed font-medium">
                  Sistem kami memangkas rantai tengkulak yang terlalu panjang. Petani mendapatkan bayaran lebih besar, dan Anda mendapat harga yang lebih jujur.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Fitur Unggulan */}
        <section id="fitur" className="w-full bg-gradient-to-b from-white to-green-50/50 py-28">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-(--color-primary) font-bold text-sm tracking-wider uppercase mb-3 block">
                Fitur Unggulan
              </span>
              <h2 className="text-3xl font-extrabold text-(--color-neutral-900)">
                Inovasi Teknologi Pangan
              </h2>
              <p className="mt-4 text-(--color-neutral-600) max-w-2xl mx-auto">
                Sistem kami didukung oleh algoritma canggih untuk memastikan efisiensi, kualitas, dan keadilan harga.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-green-50 text-(--color-primary) flex items-center justify-center mb-6">
                  <Share2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Smart Split Fulfillment</h3>
                <p className="text-(--color-neutral-600) text-sm leading-relaxed">
                  Algoritma alokasi pintar jika stok desa tidak cukup, membagi permintaan ke desa tetangga berdasarkan skor jarak & reputasi.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-green-50 text-(--color-primary) flex items-center justify-center mb-6">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Trust Score Engine</h3>
                <p className="text-(--color-neutral-600) text-sm leading-relaxed">
                  Sistem reputasi yang menghitung skor akurasi antara estimasi vs realisasi panen, membangun kepercayaan kolektif desa.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-green-50 text-(--color-primary) flex items-center justify-center mb-6">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Fair-Share Pricing</h3>
                <p className="text-(--color-neutral-600) text-sm leading-relaxed">
                  Membagikan hasil pendapatan ke setiap petani secara proporsional sesuai jumlah dan grade panen tanpa potongan tersembunyi.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mengapa Harus PanenDesa (Comparison) */}
        <section className="w-full bg-slate-50 py-28">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-(--color-primary) font-bold text-sm tracking-wider uppercase mb-3 block">
                  Perbandingan Proses
                </span>
                <h2 className="text-3xl font-extrabold text-(--color-neutral-900) mb-6">
                  Mengapa Harus PanenDesa?
                </h2>
                <p className="text-(--color-neutral-600) mb-10">
                  Lihat perbedaan nilai tambah yang diterima desa Anda dibandingkan pola tengkulak tradisional.
                </p>

                <div className="space-y-6">
                  <div className="bg-white rounded-2xl p-6 shadow-sm border-l-4 border-(--color-primary)">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-(--color-primary) text-white flex items-center justify-center">
                          <CheckCircle2 className="w-5 h-5" />
                        </div>
                        <h3 className="font-bold">PanenDesa</h3>
                      </div>
                      <span className="text-xs font-semibold text-(--color-primary) bg-green-50 px-2 py-1 rounded-md">Direkomendasikan</span>
                    </div>
                    <ul className="space-y-3 text-sm text-(--color-neutral-600)">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-(--color-success) mt-0.5" /> Harga kesepakatan adil & transparan
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-(--color-success) mt-0.5" /> Fee Kopdes tetap & diketahui sejak awal
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-(--color-success) mt-0.5" /> Kualitas dinilai objektif (AI + Manual)
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white/60 rounded-2xl p-6 border-l-4 border-(--color-danger)">
                    <div className="flex items-center gap-3 mb-4 opacity-75">
                      <div className="w-8 h-8 rounded-full bg-(--color-danger) text-white flex items-center justify-center">
                        <XCircle className="w-5 h-5" />
                      </div>
                      <h3 className="font-bold">Tengkulak Tradisional</h3>
                    </div>
                    <ul className="space-y-3 text-sm text-(--color-neutral-600) opacity-75">
                      <li className="flex items-start gap-2">
                        <XCircle className="w-4 h-4 text-(--color-danger)] mt-0.5" /> Harga sering ditekan sepihak
                      </li>
                      <li className="flex items-start gap-2">
                        <XCircle className="w-4 h-4 text-(--color-danger)] mt-0.5" /> Margin perantara tidak jelas
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="aspect-square lg:aspect-auto lg:h-125 w-full rounded-4xl overflow-hidden shadow-2xl">
                  <img src="https://images.unsplash.com/photo-1595855761081-37d45cb04791?q=80&w=800&auto=format&fit=crop" alt="Petani" className="w-full h-full object-cover" />
                </div>

                {/* Floating Card */}
                <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-xl flex items-center gap-4 border border-gray-100">
                  <div className="w-12 h-12 rounded-full bg-green-50 text-(--color-primary) flex items-center justify-center">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-(--color-neutral-600) uppercase tracking-wider">Pendapatan Bersih</p>
                    <p className="text-2xl font-bold text-(--color-neutral-900)">Lebih Adil</p>
                    <p className="text-xs text-(--color-success) font-medium">Berdasarkan data PanenDesa</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Impact Numbers & Testimonials */}
        <section className="w-full bg-white py-28 relative overflow-hidden border-t border-gray-100">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-green-50/50 rounded-l-[100px] z-0"></div>
          <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-primary-dark font-extrabold text-sm tracking-widest uppercase mb-3 block">Dampak Nyata</span>
                <h2 className="text-4xl lg:text-5xl font-extrabold text-neutral-900 mb-8 leading-tight tracking-tight">
                  Tumbuh Bersama <br/>Ribuan Petani
                </h2>
                
                <div className="grid grid-cols-2 gap-8 mb-12">
                  <div>
                    <h4 className="text-5xl font-extrabold text-primary-dark mb-2">150+</h4>
                    <p className="text-neutral-600 font-medium">Desa Tergabung</p>
                  </div>
                  <div>
                    <h4 className="text-5xl font-extrabold text-primary-dark mb-2">10k+</h4>
                    <p className="text-neutral-600 font-medium">Ton Komoditas Terjual</p>
                  </div>
                  <div>
                    <h4 className="text-5xl font-extrabold text-primary-dark mb-2">30%</h4>
                    <p className="text-neutral-600 font-medium">Kenaikan Laba Petani</p>
                  </div>
                  <div>
                    <h4 className="text-5xl font-extrabold text-primary-dark mb-2">0</h4>
                    <p className="text-neutral-600 font-medium">Biaya Tersembunyi</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {/* Testimonial 1 */}
                <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 transform hover:-translate-x-4 transition-transform duration-300">
                  <div className="flex text-yellow-400 mb-4">
                    {[...Array(5)].map((_, i) => <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>)}
                  </div>
                  <p className="text-lg text-neutral-800 font-medium mb-6 italic">
                    &quot;Lebih tenang menjual lewat Kopdes. Harganya pasti, fee-nya jelas, dan yang paling penting saya dihargai sesuai kualitas panen saya.&quot;
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                      <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop" alt="Petani" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="font-bold text-neutral-900">Pak Budi</p>
                      <p className="text-xs text-primary-dark font-medium">Petani Cabai - Sukamaju</p>
                    </div>
                  </div>
                </div>

                {/* Testimonial 2 */}
                <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 transform translate-x-8 hover:translate-x-4 transition-transform duration-300">
                  <div className="flex text-yellow-400 mb-4">
                    {[...Array(5)].map((_, i) => <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>)}
                  </div>
                  <p className="text-lg text-neutral-800 font-medium mb-6 italic">
                    &quot;Sistem Smart Split sangat luar biasa. Saat stok desa sebelah kosong, pesanan otomatis dialihkan ke desa kami.&quot;
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                      <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop" alt="Pembeli" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="font-bold text-neutral-900">Ibu Sari</p>
                      <p className="text-xs text-primary-dark font-medium">Pengurus Kopdes - Makmur Jaya</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mega CTA Section */}
        <section className="w-full px-4 lg:px-8 pb-12 pt-8">
          <div className="max-w-7xl mx-auto bg-gradient-to-br from-[#2c4c31] to-[#1a2e1e] rounded-[40px] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
            {/* Decorative background circles */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full transform translate-x-1/3 -translate-y-1/3 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-400/10 rounded-full transform -translate-x-1/3 translate-y-1/3 blur-3xl"></div>
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
                Saatnya Membangun <br/><span className="text-yellow-400">Kedaulatan Pangan</span>
              </h2>
              <p className="text-lg text-white/80 mb-12 font-medium max-w-2xl mx-auto">
                Bergabunglah dengan ekosistem rantai pasok paling adil di Indonesia. Mulai jual hasil panen Anda atau beli komoditas segar langsung dari sumbernya.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <Link href="/auth/register" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full h-14 bg-yellow-400 hover:bg-yellow-500 text-neutral-900 font-extrabold rounded-full px-10 text-lg shadow-[0_0_20px_rgba(250,204,21,0.4)] transition-all hover:scale-105">
                    Daftar Gratis Sekarang
                  </Button>
                </Link>
                <Link href="/pembeli" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="w-full h-14 rounded-full px-10 text-lg text-white border-2 border-white/30 hover:bg-white/10 font-bold transition-all">
                    Lihat Marketplace
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}