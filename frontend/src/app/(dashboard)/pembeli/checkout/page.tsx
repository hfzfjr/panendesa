import React from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, MapPin, Info, Truck, CheckCircle2, ChevronRight, Star } from "lucide-react";
import { Button } from "../../../../components/ui/Button";

export default function CheckoutPage() {
  return (
    <>
      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-6 md:py-12 pb-28">

        {/* Header with Back Button */}
        <div className="flex items-center gap-3 mb-6 md:mb-8">
          <Link href="/pembeli/cart" className="p-2 hover:bg-gray-100 rounded-full transition-colors -ml-2">
            <ArrowLeft className="w-6 h-6 text-gray-800" />
          </Link>
          <div className="flex flex-col">
            <h1 className="text-xl md:text-3xl font-extrabold text-neutral-900 tracking-tight">
              Checkout Pesanan
            </h1>
            <p className="text-gray-500 text-sm md:text-base hidden sm:block">Periksa kembali pesanan Anda sebelum membayar</p>
          </div>
        </div>
        <div className="inline-flex items-center gap-2 bg-gray-100/80 px-4 py-2 rounded-lg text-sm text-gray-600 mb-6">
          <ShieldCheck className="w-4 h-4 text-gray-400" />
          Pastikan rincian pesanan Anda sudah sesuai sebelum melakukan pembayaran.
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">

            {/* Box 1: Asal Distribusi */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2 font-bold text-gray-800">
                  <Truck className="w-5 h-5 text-primary" />
                  Asal Distribusi
                </div>
                <div className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                  OPTIMIZED BY AI
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Kopdes 1 */}
                <div className="border border-gray-100 rounded-xl p-4 bg-neutral-50">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">Kopdes Tani Makmur</h4>
                      <p className="text-xs text-gray-500">Ciwidey, Jawa Barat</p>
                    </div>
                    <div className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded">
                      300 kg
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                    <span className="flex items-center gap-1"><Star className="w-3 h-3 text-orange-400 fill-orange-400" /> 4.9/5.0</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> 42km</span>
                  </div>

                  <div className="pt-3 border-t border-gray-200">
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Daftar Petani Penyuplai</p>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-green-200 text-green-800 flex items-center justify-center font-bold text-[8px]">PB</span>
                          <span className="font-medium text-gray-700">Pak Budi</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-gray-400">Grade A</span>
                          <span className="font-bold text-gray-900">150 kg</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-green-200 text-green-800 flex items-center justify-center font-bold text-[8px]">IS</span>
                          <span className="font-medium text-gray-700">Ibu Siti</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-gray-400">Grade A</span>
                          <span className="font-bold text-gray-900">150 kg</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Kopdes 2 */}
                <div className="border border-gray-100 rounded-xl p-4 bg-neutral-50">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">Kopdes Harapan Mulya</h4>
                      <p className="text-xs text-gray-500">Lembang, Jawa Barat</p>
                    </div>
                    <div className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded">
                      200 kg
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                    <span className="flex items-center gap-1"><Star className="w-3 h-3 text-orange-400 fill-orange-400" /> 4.7/5.0</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> 18km</span>
                  </div>

                  <div className="pt-3 border-t border-gray-200">
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Daftar Petani Penyuplai</p>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-green-200 text-green-800 flex items-center justify-center font-bold text-[8px]">PA</span>
                          <span className="font-medium text-gray-700">Pak Andi</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-gray-400">Grade A</span>
                          <span className="font-bold text-gray-900">200 kg</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Box 2: Rincian Distribusi */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="bg-green-50 px-6 py-4 flex items-center gap-2 font-bold text-primary-dark border-b border-gray-200">
                <Truck className="w-4 h-4" /> {/* Fallback icon, design uses group icon */}
                Rincian Distribusi Petani
              </div>
              <div className="p-6 overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="pb-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Nama Petani</th>
                      <th className="pb-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Alokasi (KG)</th>
                      <th className="pb-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Estimasi Grade</th>
                      <th className="pb-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Nilai Transaksi</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr className="border-b border-gray-50">
                      <td className="py-4 text-gray-800 font-medium">Pak Budi</td>
                      <td className="py-4 text-gray-600">150 kg</td>
                      <td className="py-4"><span className="bg-green-100 text-green-800 text-[10px] font-bold px-2 py-1 rounded">GRADE A</span></td>
                      <td className="py-4 font-bold text-gray-900">Rp 2.250.000</td>
                    </tr>
                    <tr className="border-b border-gray-50">
                      <td className="py-4 text-gray-800 font-medium">Pak Andi</td>
                      <td className="py-4 text-gray-600">200 kg</td>
                      <td className="py-4"><span className="bg-green-100 text-green-800 text-[10px] font-bold px-2 py-1 rounded">GRADE A</span></td>
                      <td className="py-4 font-bold text-gray-900">Rp 3.000.000</td>
                    </tr>
                    <tr>
                      <td className="py-4 text-gray-800 font-medium">Ibu Siti</td>
                      <td className="py-4 text-gray-600">150 kg</td>
                      <td className="py-4"><span className="bg-green-100 text-green-800 text-[10px] font-bold px-2 py-1 rounded">GRADE A</span></td>
                      <td className="py-4 font-bold text-gray-900">Rp 2.250.000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="bg-neutral-100 px-6 py-3 border-t border-gray-100 flex gap-2 text-xs text-gray-500 items-start">
                <Info className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                Transparansi Biaya: Nilai transaksi di atas belum termasuk fee platform 5% yang digunakan untuk pemeliharaan sistem dan asuransi gagal panen.
              </div>
            </div>

            {/* Box 3: Dokumentasi */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2 text-sm">
                <span className="w-4 h-4 bg-green-100 text-green-700 flex items-center justify-center rounded">🖼</span>
                Dokumentasi Produk (Grade A)
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="relative rounded-xl overflow-hidden aspect-video group">
                  <img src="https://images.unsplash.com/photo-1595855761081-37d45cb04791?q=80&w=300&auto=format&fit=crop" alt="Sampel" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent flex items-end p-2">
                    <span className="text-white text-[10px] font-bold">Sampel 01</span>
                  </div>
                </div>
                <div className="relative rounded-xl overflow-hidden aspect-video group">
                  <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=300&auto=format&fit=crop" alt="Pengeringan" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent flex items-end p-2">
                    <span className="text-white text-[10px] font-bold">Pengeringan</span>
                  </div>
                </div>
                <div className="relative rounded-xl overflow-hidden aspect-video group">
                  <img src="https://images.unsplash.com/photo-1592982537447-6f233486be22?q=80&w=300&auto=format&fit=crop" alt="Penggilingan" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent flex items-end p-2">
                    <span className="text-white text-[10px] font-bold">Penggilingan</span>
                  </div>
                </div>
                <div className="relative rounded-xl overflow-hidden aspect-video group">
                  <img src="https://images.unsplash.com/photo-1601383569838-89c02ff433b8?q=80&w=300&auto=format&fit=crop" alt="Penyimpanan" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent flex items-end p-2">
                    <span className="text-white text-[10px] font-bold">Penyimpanan</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Escrow Banner */}
            <div className="bg-green-50 rounded-2xl border border-green-900/10 p-6 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 sm:gap-6">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm">
                <ShieldCheck className="w-8 h-8 text-primary" />
              </div>
              <div>
                <div className="flex flex-col sm:flex-row items-center gap-2 mb-2 sm:mb-1">
                  <h3 className="font-bold text-primary-dark">PanenDesa Escrow Protection</h3>
                  <span className="bg-primary text-white text-[8px] font-bold px-1.5 py-0.5 rounded uppercase">Official</span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Dana Anda aman di sistem escrow kami. Pembayaran hanya akan diteruskan ke petani setelah Anda melakukan konfirmasi penerimaan barang dan hasil Quality Control (QC) sesuai standar operasional kami.
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">

              {/* Box Rincian Biaya */}
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                <div className="bg-primary-dark text-white px-6 py-4 flex justify-between items-center">
                  <h3 className="font-bold text-lg">Rincian Biaya</h3>
                  <Info className="w-5 h-5 text-white/70" />
                </div>

                <div className="p-6 space-y-4 text-sm">
                  <div className="flex justify-between items-center text-gray-600">
                    <span>Harga Produk (500kg x 15rb)</span>
                    <span className="font-bold text-gray-900">Rp 7.500.000</span>
                  </div>
                  <div className="flex justify-between items-center text-gray-600">
                    <span>Fee Kopdes (5%)</span>
                    <span className="font-bold text-green-700">+ Rp 375.000</span>
                  </div>
                  <div className="flex justify-between items-center text-gray-600">
                    <span>Biaya QC (SGS Certified)</span>
                    <span className="font-bold text-gray-900">Rp 150.000</span>
                  </div>
                  <div className="flex justify-between items-center text-gray-600 pb-4 border-b border-gray-100">
                    <span>Estimasi Ongkir</span>
                    <span className="font-bold text-gray-900">Rp 250.000</span>
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <span className="text-xs font-bold text-gray-500 tracking-wider">TOTAL PEMBAYARAN</span>
                    <span className="text-lg font-bold text-primary-dark">Rp 8.275.000</span>
                  </div>

                  <div className="bg-red-50 text-red-800 text-xs p-3 rounded-lg flex items-start gap-2 mt-4 border border-red-100">
                    <Info className="w-4 h-4 shrink-0 mt-0.5 opacity-70" />
                    Harga final Rp 15.000/kg. Fee Kopdes 5%. Dengan melanjutkan, harga akan dikunci (Locked) dan tidak dapat berubah.
                  </div>
                </div>

                <div className="border-t border-gray-100 p-6 pt-4 bg-gray-50/50">
                  <h4 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                    <BanknoteIcon className="w-4 h-4" />
                    Pilihan Pembayaran
                  </h4>

                  <div className="space-y-3">
                    {/* Option 1 */}
                    <label className="flex items-start gap-3 p-4 rounded-xl border-2 border-primary bg-neutral-50 cursor-pointer relative">
                      <input type="radio" name="payment" className="mt-1 w-4 h-4 text-primary" defaultChecked />
                      <div>
                        <div className="font-bold text-gray-900 text-sm">Bayar Penuh</div>
                        <div className="text-xs text-gray-500 mt-1">Pelunasan instan di awal.</div>
                      </div>
                      <div className="absolute top-3 right-3 bg-primary-dark text-white text-[8px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                        Rekomendasi
                      </div>
                    </label>

                    {/* Option 2 */}
                    <label className="flex items-start gap-3 p-4 rounded-xl border border-gray-200 bg-white cursor-pointer hover:border-gray-300 transition-colors">
                      <input type="radio" name="payment" className="mt-1 w-4 h-4" />
                      <div>
                        <div className="font-bold text-gray-900 text-sm">Deposit 20%</div>
                        <div className="text-xs text-gray-500 mt-1">Bayar Rp 1.655.000 sekarang.</div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="hidden lg:block space-y-3 mt-4">
                <Link href="/pembeli/payment" className="block">
                  <Button className="w-full h-14 rounded-xl bg-primary-dark hover:bg-primary font-bold text-[15px] flex justify-between items-center px-6 transition-colors">
                    Konfirmasi & Bayar Sekarang
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </Link>
                <div className="flex items-start gap-2 mt-4 text-xs text-gray-500">
                  <ShieldCheck className="w-4 h-4 text-green-600 shrink-0" />
                  <p>Pembayaran dijamin aman dengan <strong>PanenDesa Escrow</strong>.</p>
                </div>
              </div>

              {/* Map Box */}
              <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-sm relative h-48 bg-gray-100 mt-4">
                <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=600&auto=format&fit=crop" alt="Map" className="w-full h-full object-cover opacity-60 mix-blend-multiply" />
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-lg transform -translate-x-10 -translate-y-6">
                    <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-[10px] font-bold">PB</div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-lg transform translate-x-12 translate-y-4">
                    <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-[10px] font-bold">PA</div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-primary-dark text-white flex items-center justify-center shadow-lg">
                    <Truck className="w-4 h-4" />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>

      {/* Mobile Sticky Action Bar */}
      <div className="lg:hidden fixed bottom-16 left-0 w-full bg-white border-t border-gray-200 p-4 z-40 shadow-sm">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-bold text-gray-600">Total Tagihan</span>
          <span className="text-lg font-black text-primary-dark">Rp 2.165.000</span>
        </div>
        <Link href="/dashboard/pembeli/payment" className="block">
          <Button className="w-full h-12 rounded-xl bg-primary-dark hover:bg-primary font-bold text-[15px] flex justify-center items-center transition-colors">
            Bayar Sekarang
          </Button>
        </Link>
      </div>
    </>
  );
}

function BanknoteIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="20" height="12" x="2" y="6" rx="2" />
      <circle cx="12" cy="12" r="2" />
      <path d="M6 12h.01M18 12h.01" />
    </svg>
  );
}
