import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { PembeliFooter } from "@/components/pembeli/PembeliFooter";
import {
  ShieldCheck,
  Truck,
  Tag,
  Share2,
  CheckCircle2,
  XCircle,
  Menu,
  ChevronDown,
  ArrowRight,
  TrendingUp,
  MapPin
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--color-neutral-100)] text-[var(--color-neutral-900)] font-sans selection:bg-[var(--color-primary)] selection:text-white flex flex-col">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 lg:px-12 bg-[#F5F5F0]/80 backdrop-blur-md sticky top-0 z-50 border-b border-[var(--color-primary)]/10">
        <div className="flex items-center gap-2">
          <div className="text-[var(--color-primary)] font-bold text-2xl tracking-tight">
            PanenDesa
          </div>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[var(--color-neutral-600)]">
          <Link href="#fitur" className="hover:text-[var(--color-primary)] transition-colors">
            Fitur Utama
          </Link>
          <Link href="#cara-kerja" className="hover:text-[var(--color-primary)] transition-colors">
            Cara Kerja
          </Link>
          <Link href="#tentang" className="hover:text-[var(--color-primary)] transition-colors">
            Tentang Kami
          </Link>
          <Link href="#faq" className="hover:text-[var(--color-primary)] transition-colors">
            FAQ
          </Link>
        </div>
        <div className="hidden md:block">
          <Button variant="primary" className="rounded-full px-6">
            Gabung Sekarang
          </Button>
        </div>
        <div className="md:hidden">
          <Menu className="w-6 h-6 text-[var(--color-neutral-900)]" />
        </div>
      </nav>

      <main className="flex-grow flex flex-col items-center">
        {/* Hero Section */}
        <section className="w-full max-w-7xl px-4 lg:px-8 pt-8 pb-16">
          <div className="bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] rounded-[32px] overflow-hidden relative shadow-xl">
            {/* Background Pattern/Glow */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
            
            <div className="relative z-10 px-8 py-16 lg:p-24 grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
                  Membangun Kedaulatan Pangan dari Desa
                </h1>
                <p className="text-lg text-white/90 max-w-lg leading-relaxed">
                  Sistem koordinasi rantai pasok kolektif untuk menghubungkan hasil panen desa langsung ke pasar dengan transparan dan adil.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <Button variant="accent" size="lg" className="rounded-full font-bold">
                    Gabung Sekarang
                  </Button>
                  <Button variant="outline" size="lg" className="rounded-full">
                    Pelajari Lebih Lanjut
                  </Button>
                </div>
              </div>

              {/* Image Collage (Berdasarkan Figma) */}
              <div className="hidden lg:flex items-end justify-end h-[600px] w-[461.76px]">
                {/* Group 57 */}
                <div className="w-[153.81px] h-[280.47px] rounded-l-[54.08px] overflow-hidden relative shadow-2xl">
                  <img src="/images/hero-tomat.jpg" alt="Ladang" className="object-cover w-full h-full" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(115, 205, 0, 0) 0%, rgba(10, 141, 15, 0.51) 100%)' }}></div>
                </div>
                
                {/* Group 58 */}
                <div className="w-[153.81px] h-[440.24px] rounded-tl-[54.08px] overflow-hidden relative shadow-2xl">
                  <img src="/images/hero-padi.jpg" alt="Panen" className="object-cover w-full h-full" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(167, 171, 26, 0.47) 100%)' }}></div>
                </div>
                
                {/* Group 59 */}
                <div className="w-[154.09px] h-[600px] rounded-t-[54.08px] rounded-br-[54.08px] overflow-hidden relative shadow-2xl">
                  <img src="/images/hero-jagung.jpg" alt="Jagung" className="object-cover w-full h-full" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(115, 205, 0, 0) 0%, rgba(10, 141, 15, 0.46) 100%)' }}></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Kenapa PanenDesa */}
        <section className="w-full max-w-7xl px-4 lg:px-8 py-16 text-center">
          <h2 className="text-3xl font-bold text-[var(--color-primary-dark)] mb-16">
            Kenapa PanenDesa?
          </h2>
          <div className="grid md:grid-cols-3 gap-12 lg:gap-24">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)]">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold">Transparan</h3>
              <p className="text-[var(--color-neutral-600)] text-sm leading-relaxed">
                Potongan fee selalu terlihat, pembagian hasil panen dihitung secara adil berdasarkan grade.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)]">
                <Truck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold">Tepat Waktu</h3>
              <p className="text-[var(--color-neutral-600)] text-sm leading-relaxed">
                Jadwal terkoordinir, sistem Smart Split menjamin alokasi antar desa terpenuhi secara efisien.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)]">
                <Tag className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold">Harga Adil</h3>
              <p className="text-[var(--color-neutral-600)] text-sm leading-relaxed">
                Harga kesepakatan langsung pasar tanpa rantai tengkulak panjang yang merugikan.
              </p>
            </div>
          </div>
        </section>

        {/* Bagaimana Cara Kerjanya */}
        <section id="cara-kerja" className="w-full bg-white py-24">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-[var(--color-neutral-900)] mb-20">
              Bagaimana Cara Kerjanya?
            </h2>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 relative">
              {/* Connector Line (Desktop) */}
              <div className="hidden md:block absolute top-8 left-[15%] right-[15%] h-0.5 bg-gray-200 z-0"></div>
              
              {[
                { step: "1", title: "Daftar & Login", desc: "Daftarkan diri Anda sebagai Petani, Petugas Kopdes, atau Pembeli." },
                { step: "2", title: "Masuk & Laporan", desc: "Input estimasi stok hasil panen dan pantau proses verifikasi di koperasi." },
                { step: "3", title: "Distribusi & Cuan", desc: "Terima pembagian hasil transparan dari penjualan terkoordinasi." },
              ].map((item, idx) => (
                <div key={idx} className="relative z-10 flex flex-col items-center max-w-xs w-full">
                  <div className="w-16 h-16 rounded-full bg-[var(--color-primary)] text-white text-2xl font-bold flex items-center justify-center mb-6 shadow-lg shadow-green-900/20">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-bold mb-3">{item.title}</h3>
                  <p className="text-[var(--color-neutral-600)] text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Fitur Unggulan */}
        <section id="fitur" className="w-full max-w-7xl px-4 lg:px-8 py-24">
          <div className="text-center mb-16">
            <span className="text-[var(--color-primary)] font-bold text-sm tracking-wider uppercase mb-3 block">
              Fitur Unggulan
            </span>
            <h2 className="text-3xl font-bold text-[var(--color-neutral-900)]">
              Inovasi Teknologi Pangan
            </h2>
            <p className="mt-4 text-[var(--color-neutral-600)] max-w-2xl mx-auto">
              Sistem kami didukung oleh algoritma canggih untuk memastikan efisiensi, kualitas, dan keadilan harga.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-green-50 text-[var(--color-primary)] flex items-center justify-center mb-6">
                <Share2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Smart Split Fulfillment</h3>
              <p className="text-[var(--color-neutral-600)] text-sm leading-relaxed">
                Algoritma alokasi pintar jika stok desa tidak cukup, membagi permintaan ke desa tetangga berdasarkan skor jarak & reputasi.
              </p>
            </div>
            
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-green-50 text-[var(--color-primary)] flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Trust Score Engine</h3>
              <p className="text-[var(--color-neutral-600)] text-sm leading-relaxed">
                Sistem reputasi yang menghitung skor akurasi antara estimasi vs realisasi panen, membangun kepercayaan kolektif desa.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-green-50 text-[var(--color-primary)] flex items-center justify-center mb-6">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Fair-Share Pricing</h3>
              <p className="text-[var(--color-neutral-600)] text-sm leading-relaxed">
                Membagikan hasil pendapatan ke setiap petani secara proporsional sesuai jumlah dan grade panen tanpa potongan tersembunyi.
              </p>
            </div>
          </div>
        </section>

        {/* Mengapa Harus PanenDesa (Comparison) */}
        <section className="w-full bg-[#EAEBE6] py-24">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-[var(--color-primary)] font-bold text-sm tracking-wider uppercase mb-3 block">
                  Perbandingan Proses
                </span>
                <h2 className="text-3xl font-bold text-[var(--color-neutral-900)] mb-6">
                  Mengapa Harus PanenDesa?
                </h2>
                <p className="text-[var(--color-neutral-600)] mb-10">
                  Lihat perbedaan nilai tambah yang diterima desa Anda dibandingkan pola tengkulak tradisional.
                </p>
                
                <div className="space-y-6">
                  <div className="bg-white rounded-2xl p-6 shadow-sm border-l-4 border-[var(--color-primary)]">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center">
                          <CheckCircle2 className="w-5 h-5" />
                        </div>
                        <h3 className="font-bold">PanenDesa</h3>
                      </div>
                      <span className="text-xs font-semibold text-[var(--color-primary)] bg-green-50 px-2 py-1 rounded-md">Direkomendasikan</span>
                    </div>
                    <ul className="space-y-3 text-sm text-[var(--color-neutral-600)]">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[var(--color-success)] mt-0.5" /> Harga kesepakatan adil & transparan
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[var(--color-success)] mt-0.5" /> Fee Kopdes tetap & diketahui sejak awal
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[var(--color-success)] mt-0.5" /> Kualitas dinilai objektif (AI + Manual)
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white/60 rounded-2xl p-6 border-l-4 border-[var(--color-danger)]">
                    <div className="flex items-center gap-3 mb-4 opacity-75">
                      <div className="w-8 h-8 rounded-full bg-[var(--color-danger)] text-white flex items-center justify-center">
                        <XCircle className="w-5 h-5" />
                      </div>
                      <h3 className="font-bold">Tengkulak Tradisional</h3>
                    </div>
                    <ul className="space-y-3 text-sm text-[var(--color-neutral-600)] opacity-75">
                      <li className="flex items-start gap-2">
                        <XCircle className="w-4 h-4 text-[var(--color-danger)] mt-0.5" /> Harga sering ditekan sepihak
                      </li>
                      <li className="flex items-start gap-2">
                        <XCircle className="w-4 h-4 text-[var(--color-danger)] mt-0.5" /> Margin perantara tidak jelas
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="aspect-square lg:aspect-auto lg:h-[500px] w-full rounded-[32px] overflow-hidden shadow-2xl">
                  <img src="https://images.unsplash.com/photo-1595855761081-37d45cb04791?q=80&w=800&auto=format&fit=crop" alt="Petani" className="w-full h-full object-cover" />
                </div>
                
                {/* Floating Card */}
                <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-xl flex items-center gap-4 border border-gray-100">
                  <div className="w-12 h-12 rounded-full bg-green-50 text-[var(--color-primary)] flex items-center justify-center">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[var(--color-neutral-600)] uppercase tracking-wider">Pendapatan Bersih</p>
                    <p className="text-2xl font-bold text-[var(--color-neutral-900)]">Lebih Adil</p>
                    <p className="text-xs text-[var(--color-success)] font-medium">Berdasarkan data PanenDesa</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Suara dari Ladang */}
        <section className="w-full max-w-7xl px-4 lg:px-8 py-24 text-center">
          <h2 className="text-3xl font-bold text-[var(--color-neutral-900)] mb-16">
            Suara dari Ladang dan Meja Makan
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 text-left">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <div className="text-[var(--color-primary)]/20 text-6xl font-serif leading-none mb-4">&quot;</div>
              <p className="text-lg text-[var(--color-neutral-900)] font-medium mb-8">
                Lebih tenang menjual lewat Kopdes. Harganya pasti, fee-nya jelas, dan yang paling penting saya dihargai sesuai kualitas panen saya, bukan disamaratakan.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                   <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop" alt="Petani" className="w-full h-full object-cover"/>
                </div>
                <div>
                  <p className="font-bold">Pak Budi</p>
                  <p className="text-sm text-[var(--color-primary)]">Petani Cabai - Sukamaju</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <div className="text-[var(--color-primary)]/20 text-6xl font-serif leading-none mb-4">&quot;</div>
              <p className="text-lg text-[var(--color-neutral-900)] font-medium mb-8">
                Kami sangat terbantu oleh sistem Smart Split. Saat stok satu desa tidak cukup, sistem langsung mengalokasikan dari desa tetangga tanpa repot cari sendiri.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop" alt="Pembeli" className="w-full h-full object-cover"/>
                </div>
                <div>
                  <p className="font-bold">PT Sukses Makmur</p>
                  <p className="text-sm text-[var(--color-primary)]">Pembeli B2B</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="w-full max-w-3xl px-4 lg:px-8 pb-24 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[var(--color-neutral-900)] mb-4">
              Pertanyaan Umum
            </h2>
          </div>
          
          <div className="space-y-4 text-left">
            {/* Accordion 1 - Open */}
            <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white">
              <button className="w-full px-6 py-4 text-left font-bold flex justify-between items-center text-[var(--color-primary-dark)]">
                Apakah PanenDesa gratis?
                <ChevronDown className="w-5 h-5 transform rotate-180" />
              </button>
              <div className="px-6 pb-4 text-sm text-[var(--color-neutral-600)] leading-relaxed border-t border-gray-100 pt-4">
                Pendaftaran gratis untuk Petani dan Pembeli. Koperasi Desa (Kopdes) mengenakan fee layanan berupa persentase kecil yang tetap dan transparan, yang ditampilkan sebelum harga disepakati.
              </div>
            </div>
            
            {/* Accordion 2 */}
            <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white">
              <button className="w-full px-6 py-4 text-left font-bold flex justify-between items-center hover:bg-gray-50">
                Siapa yang menentukan harga?
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>

            {/* Accordion 3 */}
            <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white">
              <button className="w-full px-6 py-4 text-left font-bold flex justify-between items-center hover:bg-gray-50">
                Apa itu Smart Split?
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>
            
            {/* Accordion 4 */}
            <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white">
              <button className="w-full px-6 py-4 text-left font-bold flex justify-between items-center hover:bg-gray-50">
                Bagaimana kualitas dinilai?
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full max-w-5xl px-4 lg:px-8 pb-24">
          <div className="bg-[var(--color-primary-dark)] rounded-[32px] p-12 text-center text-white relative overflow-hidden shadow-2xl">
            {/* Decor */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full transform translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--color-accent)]/10 rounded-full transform -translate-x-1/2 translate-y-1/2 blur-2xl"></div>
            
            <div className="relative z-10">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Siap Memulai Perubahan Bersama PanenDesa?
              </h2>
              <p className="text-white/80 mb-10 max-w-xl mx-auto">
                Bergabunglah dengan ekosistem pasok yang adil, transparan, dan memberdayakan.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="outline" className="bg-white !text-[var(--color-primary-dark)] hover:!bg-gray-100 border-none rounded-full px-8">
                  Coba Sekarang
                </Button>
                <Button variant="outline" className="rounded-full px-8">
                  Hubungi Kami
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <div className="mt-auto">
        <PembeliFooter />
      </div>
    </div>
  );
}
