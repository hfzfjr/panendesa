import React from "react";
import Link from "next/link";
import { 
  ArrowLeft, Check, Truck, Package, MapPin, 
  BarChart3, Phone, HelpCircle, History
} from "lucide-react";
import { Button } from "../../../../../components/ui/Button";

export default function OrderTrackingPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 lg:px-8 py-6 md:py-12 pb-28 min-h-screen">
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Link href="/dashboard/pembeli/orders" className="p-2 hover:bg-gray-100 rounded-full transition-colors -ml-2">
          <ArrowLeft className="w-6 h-6 text-gray-800" />
        </Link>
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">Pelacakan Pesanan</h1>
      </div>

      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1A1C19] tracking-tight mb-2">
          Lacak Pesanan #AGR-2024-99281
        </h1>
        <p className="text-gray-600 text-sm md:text-base">
          Komoditas: Beras Pandan Wangi - Kelompok Tani Desa Sukamaju
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
        
        {/* Left Column: Tracking Content */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Status Real-time (Stepper) */}
          <div className="bg-white rounded-2xl border border-gray-200 p-4 md:p-6 shadow-sm overflow-hidden">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 mb-6 md:mb-8">
              <h3 className="font-bold text-gray-900 flex items-center gap-2 text-lg">
                <MapPin className="w-5 h-5 text-[#1B5E20]" />
                Status Real-time
              </h3>
              <span className="bg-[#F59E0B] text-white text-xs font-bold px-3 py-1.5 rounded shadow-sm w-fit">
                Estimasi Tiba: Besok, 14 Okt 2024
              </span>
            </div>

            {/* Responsive Stepper Container */}
            <div className="relative pb-2 md:pb-6 mt-4">
              
              {/* Connecting Line */}
              <div className="absolute top-4 md:top-6 left-[10%] right-[10%] h-[2px] bg-gray-200 -z-10"></div>
              {/* Active Line (Up to step 4) */}
              <div className="absolute top-4 md:top-6 left-[10%] w-[75%] h-[2px] bg-[#3B5249] -z-10"></div>

              <div className="flex justify-between text-center relative z-10">
                
                {/* Step 1 */}
                <div className="flex flex-col items-center flex-1">
                  <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-[#3B5249] text-white flex items-center justify-center ring-[4px] md:ring-[6px] ring-white shadow-sm mb-2 md:mb-3">
                    <Check className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                  <div className="text-[9px] md:text-xs font-bold text-gray-900 leading-tight">Pesanan<br className="md:hidden"/> Dibuat</div>
                  <div className="hidden md:block text-[10px] text-gray-500 mt-1">11 Okt, 09:00</div>
                </div>

                {/* Step 2 */}
                <div className="flex flex-col items-center flex-1">
                  <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-[#3B5249] text-white flex items-center justify-center ring-[4px] md:ring-[6px] ring-white shadow-sm mb-2 md:mb-3">
                    <Check className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                  <div className="text-[9px] md:text-xs font-bold text-gray-900 leading-tight">Validasi<br className="md:hidden"/> Panen</div>
                  <div className="hidden md:block text-[10px] text-gray-500 mt-1">12 Okt, 08:00</div>
                </div>

                {/* Step 3 */}
                <div className="flex flex-col items-center flex-1">
                  <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-[#3B5249] text-white flex items-center justify-center ring-[4px] md:ring-[6px] ring-white shadow-sm mb-2 md:mb-3">
                    <FileCheckIcon className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                  <div className="text-[9px] md:text-xs font-bold text-gray-900 leading-tight">Kontrol<br className="md:hidden"/> Kualitas</div>
                  <div className="hidden md:block text-[10px] text-gray-500 mt-1">12 Okt, 16:20</div>
                </div>

                {/* Step 4 (Active/Current) */}
                <div className="flex flex-col items-center flex-1">
                  <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-[#F59E0B] text-white flex items-center justify-center ring-[4px] md:ring-[6px] ring-white shadow-md mb-2 md:mb-3 relative">
                     <div className="absolute inset-0 rounded-full ring-2 ring-[#F59E0B]/30 animate-pulse scale-125"></div>
                    <Truck className="w-4 h-4 md:w-5 md:h-5 relative z-10" />
                  </div>
                  <div className="text-[9px] md:text-xs font-bold text-gray-900 leading-tight">Dalam<br className="md:hidden"/> Pengiriman</div>
                  <div className="hidden md:block text-[10px] text-gray-500 mt-1">Sedang Berjalan</div>
                </div>

                {/* Step 5 (Pending) */}
                <div className="flex flex-col items-center flex-1">
                  <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-[#F3F4F6] text-gray-300 flex items-center justify-center ring-[4px] md:ring-[6px] ring-white mb-2 md:mb-3">
                    <Package className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                  <div className="text-[9px] md:text-xs font-bold text-gray-400 leading-tight">Selesai</div>
                  <div className="hidden md:block text-[10px] text-gray-300 mt-1">--</div>
                </div>

              </div>
            </div>
          </div>

          {/* Map Area */}
          <div className="bg-gray-200 rounded-2xl h-[200px] md:h-[300px] border border-gray-200 overflow-hidden relative shadow-sm">
            <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200&auto=format&fit=crop" alt="Map View" className="w-full h-full object-cover" />
            
            {/* Map Overlay Card */}
            <div className="absolute top-4 left-4 bg-white rounded-xl p-3 shadow-lg border border-gray-100 flex gap-3 items-center">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-0.5">POSISI SAAT INI</div>
                <div className="font-bold text-gray-900 text-sm">Tol Cipali KM 102</div>
              </div>
            </div>
            
            {/* Center Pin */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="w-8 h-8 text-[#1B5E20] animate-bounce">
                <MapPin className="w-full h-full fill-white" />
              </div>
            </div>
          </div>

          {/* Rincian Alokasi Panen */}
          <div className="bg-white rounded-2xl border border-gray-200 p-4 md:p-6 shadow-sm">
            <h3 className="font-bold text-gray-900 flex items-center gap-2 text-lg mb-6">
              <BarChart3 className="w-5 h-5 text-gray-400" />
              Rincian Alokasi Panen
            </h3>
            
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="pb-3 text-xs font-bold text-gray-500 uppercase tracking-wider">KOMODITAS</th>
                    <th className="pb-3 text-xs font-bold text-gray-500 uppercase tracking-wider">KUANTITAS & ASAL DESA</th>
                    <th className="pb-3 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center shrink-0">
                          <Check className="w-4 h-4 text-gray-400" />
                        </div>
                        <span className="font-bold text-sm text-gray-900">Cabai Merah Keriting</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className="font-bold text-gray-900 mr-1">500 kg</span>
                      <span className="text-gray-500 text-sm">Desa Sukamaju</span>
                    </td>
                    <td className="py-4 text-right">
                      <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-1 rounded">Terverifikasi</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center shrink-0">
                          <Check className="w-4 h-4 text-gray-400" />
                        </div>
                        <span className="font-bold text-sm text-gray-900">Cabai Merah Keriting</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className="font-bold text-gray-900 mr-1">250 kg</span>
                      <span className="text-gray-500 text-sm">Desa Karanganyar</span>
                    </td>
                    <td className="py-4 text-right">
                      <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-1 rounded">Terverifikasi</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Mobile View Alokasi */}
            <div className="md:hidden space-y-4">
              {/* Item 1 */}
              <div className="p-4 border border-gray-100 rounded-xl bg-gray-50/50 flex flex-col gap-3">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-white border border-gray-100 flex items-center justify-center shrink-0">
                      <Check className="w-4 h-4 text-gray-400" />
                    </div>
                    <span className="font-bold text-sm text-gray-900 leading-tight">Cabai Merah Keriting</span>
                  </div>
                  <span className="bg-gray-200 text-gray-600 text-[10px] font-bold px-2 py-1 rounded shrink-0">Terverifikasi</span>
                </div>
                <div className="flex justify-between items-center text-sm bg-white p-3 rounded-lg border border-gray-100">
                  <span className="text-gray-500 text-xs">Desa Sukamaju</span>
                  <span className="font-bold text-[#1B5E20]">500 kg</span>
                </div>
              </div>

              {/* Item 2 */}
              <div className="p-4 border border-gray-100 rounded-xl bg-gray-50/50 flex flex-col gap-3">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-white border border-gray-100 flex items-center justify-center shrink-0">
                      <Check className="w-4 h-4 text-gray-400" />
                    </div>
                    <span className="font-bold text-sm text-gray-900 leading-tight">Cabai Merah Keriting</span>
                  </div>
                  <span className="bg-gray-200 text-gray-600 text-[10px] font-bold px-2 py-1 rounded shrink-0">Terverifikasi</span>
                </div>
                <div className="flex justify-between items-center text-sm bg-white p-3 rounded-lg border border-gray-100">
                  <span className="text-gray-500 text-xs">Desa Karanganyar</span>
                  <span className="font-bold text-[#1B5E20]">250 kg</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Informasi Logistik */}
          <div className="bg-white rounded-2xl border border-gray-200 p-4 md:p-6 shadow-sm">
            <h3 className="font-bold text-gray-900 text-lg mb-5">Informasi Logistik</h3>
            
            <div className="bg-[#F8FAF6] border border-[#1B5E20]/10 rounded-xl p-4 flex gap-4 items-center mb-6">
              <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-200 shrink-0">
                <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=150&auto=format&fit=crop" alt="Driver" className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-base">Pak Slamet</h4>
                <p className="text-xs text-gray-500">Driver Utama</p>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Kurir</span>
                <span className="font-bold text-gray-900">AgriTruck Express</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Plat Nomor</span>
                <span className="font-bold text-gray-900 bg-gray-200 px-2 py-1 rounded border border-gray-300 font-mono tracking-widest text-xs">B 1234 AGR</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Kendaraan</span>
                <span className="font-bold text-gray-900">Hino Dutro Cargo</span>
              </div>
            </div>

            <div className="space-y-3">
              <Button variant="custom" className="w-full h-12 bg-[#3B5249] hover:bg-[#2A3B34] text-white font-bold transition-colors flex items-center justify-center gap-2">
                <Phone className="w-4 h-4" />
                Hubungi Driver
              </Button>
              <Button variant="custom" className="w-full h-12 bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 font-bold transition-colors flex items-center justify-center gap-2">
                <HelpCircle className="w-4 h-4 text-gray-400" />
                Bantuan
              </Button>
            </div>
          </div>

          {/* Riwayat Perjalanan (Dark Timeline) */}
          <div className="bg-[#2B2D2B] rounded-2xl overflow-hidden shadow-lg border border-gray-800">
            <div className="px-4 md:px-6 py-5 border-b border-gray-700 flex items-center gap-3">
              <History className="w-5 h-5 text-gray-300" />
              <h3 className="font-bold text-white text-lg">Riwayat Perjalanan</h3>
            </div>
            
            <div className="p-4 md:p-6 relative">
              {/* Timeline Line */}
              <div className="absolute left-[23px] md:left-[39px] top-8 bottom-12 w-0.5 bg-gray-700"></div>

              <div className="space-y-8 relative z-10">
                {/* Current */}
                <div className="flex gap-4 items-start">
                  <div className="mt-1 shrink-0 bg-[#2B2D2B] py-1">
                    <div className="w-4 h-4 rounded-full border-[3px] border-[#81C784] bg-[#2B2D2B]"></div>
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Dalam Pengiriman</h4>
                    <p className="text-[10px] text-gray-400 mb-2">13 Okt 2024, 09:45</p>
                    <p className="text-xs text-gray-300 leading-relaxed">
                      Pesanan telah keluar dari Hub Logistik Utama dan dalam perjalanan ke tujuan.
                    </p>
                  </div>
                </div>

                {/* Past 1 */}
                <div className="flex gap-4 items-start opacity-50">
                  <div className="mt-1 shrink-0 bg-[#2B2D2B] py-1">
                    <div className="w-4 h-4 rounded-full border-[3px] border-gray-600 bg-gray-600"></div>
                  </div>
                  <div>
                    <h4 className="font-bold text-white">QC Selesai</h4>
                    <p className="text-[10px] text-gray-400">12 Okt 2024, 16:20</p>
                  </div>
                </div>

                {/* Past 2 */}
                <div className="flex gap-4 items-start opacity-50">
                  <div className="mt-1 shrink-0 bg-[#2B2D2B] py-1">
                    <div className="w-4 h-4 rounded-full border-[3px] border-gray-600 bg-gray-600"></div>
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Penjemputan Panen</h4>
                    <p className="text-[10px] text-gray-400">12 Okt 2024, 08:00</p>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>

      </div>
    </main>
  );
}

function FileCheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <polyline points="9 15 11 17 15 12"/>
    </svg>
  );
}
