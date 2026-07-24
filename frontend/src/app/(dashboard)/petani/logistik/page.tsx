import React from "react";
import Link from "next/link";
import { Truck, MapPin, PackageCheck, CalendarClock, ChevronRight, PhoneCall, ChevronLeft } from "lucide-react";

export default function LogistikPetaniPage() {
  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 pb-32 md:pb-8">
      
      {/* Header */}
      <div className="flex items-center gap-4 border-b border-gray-100 pb-4 pt-2 mb-6">
        <Link href="/petani" className="hidden md:flex w-10 h-10 bg-white border border-gray-200 rounded-md items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors mt-2">
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <div>
          <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500 font-medium mb-1">
            <Link href="/petani" className="hover:text-primary-dark">Halaman Utama</Link>
            <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
            <span className="text-gray-900 font-bold">Jadwal Penjemputan</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-primary-dark uppercase tracking-tight mb-2">
            Jadwal Penjemputan
          </h1>
          <p className="text-gray-600 text-lg md:text-xl font-medium">
            Pantau kedatangan kurir logistik yang akan mengambil hasil panen Anda.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Active Pickup (Big Card) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-md border border-gray-100 shadow-sm overflow-hidden flex flex-col">
            <div className="bg-primary-dark text-white p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative overflow-hidden">
              <div className="absolute right-0 bottom-0 opacity-10 translate-x-1/4 translate-y-1/4">
                <Truck className="w-64 h-64" />
              </div>
              <div className="relative z-10">
                <span className="bg-green-500/30 text-green-100 border border-green-400/30 font-bold px-3 py-1 rounded-full text-xs mb-3 inline-block">
                  HARI INI
                </span>
                <h2 className="text-2xl md:text-3xl font-black mb-1">Truk Menuju Lokasi Anda!</h2>
                <p className="text-green-100 font-medium text-lg">Estimasi Tiba: 14:30 WIB (Tersisa 45 menit)</p>
              </div>
              <div className="relative z-10 bg-white text-primary-dark font-bold px-6 py-4 rounded-md flex flex-col items-center shadow-lg">
                <span className="text-sm font-medium text-gray-500 mb-1">Suhu Truk</span>
                <span className="text-2xl font-black">18°C</span>
              </div>
            </div>
            
            <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8">
              <div className="flex-1 space-y-6">
                <div>
                  <h3 className="text-gray-500 font-bold text-sm uppercase tracking-wider mb-2">Komoditas Diangkut</h3>
                  <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-md border border-gray-100">
                    <div className="bg-green-100 w-12 h-12 rounded-md flex items-center justify-center shrink-0">
                      <PackageCheck className="w-6 h-6 text-green-700" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">Bawang Merah (Grade B)</h4>
                      <p className="text-gray-500 font-medium">Total: 200kg • Tujuan: Gudang Koperasi Pusat</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-gray-500 font-bold text-sm uppercase tracking-wider mb-2">Driver Truk</h3>
                  <div className="flex items-center justify-between bg-gray-50 p-4 rounded-md border border-gray-100">
                    <div className="flex items-center gap-4">
                      <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200&auto=format&fit=crop" alt="Driver" className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm" />
                      <div>
                        <h4 className="font-bold text-gray-900 text-lg">Pak Anton</h4>
                        <p className="text-gray-500 font-medium text-sm">Nopol: D 8821 XA (Truk Engkel)</p>
                      </div>
                    </div>
                    <button className="w-10 h-10 rounded-full bg-green-100 text-green-700 flex items-center justify-center hover:bg-green-200 transition-colors">
                      <PhoneCall className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Stepper */}
              <div className="md:w-1/3 border-l-2 border-dashed border-gray-200 pl-6 py-2">
                <div className="relative pl-6 pb-6 border-l-2 border-green-500">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-green-500 ring-4 ring-green-100"></div>
                  <h4 className="font-bold text-gray-900 text-sm">Menuju Titik Jemput</h4>
                  <p className="text-xs text-gray-500 font-medium mt-1">13:45 WIB - Jl. Raya Pos</p>
                </div>
                <div className="relative pl-6 pb-6 border-l-2 border-gray-200">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-gray-300 ring-4 ring-gray-100"></div>
                  <h4 className="font-bold text-gray-400 text-sm">Tiba di Lokasi</h4>
                  <p className="text-xs text-gray-400 font-medium mt-1">Estimasi 14:30 WIB</p>
                </div>
                <div className="relative pl-6">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-gray-300 ring-4 ring-gray-100"></div>
                  <h4 className="font-bold text-gray-400 text-sm">Selesai Muat</h4>
                  <p className="text-xs text-gray-400 font-medium mt-1">Estimasi 15:00 WIB</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Pickups */}
        <div className="space-y-6">
          <div className="bg-white rounded-md border border-gray-100 shadow-sm p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <CalendarClock className="w-6 h-6 text-primary-dark" /> Jadwal Mendatang
            </h3>
            
            <div className="space-y-4">
              {/* Item 1 */}
              <div className="border border-gray-100 rounded-md p-4 hover:border-green-300 transition-colors cursor-pointer group">
                <div className="flex justify-between items-start mb-3">
                  <div className="bg-blue-50 text-blue-700 font-bold px-2.5 py-1 rounded-md text-[10px]">BESOK</div>
                  <span className="text-gray-400 group-hover:text-green-600 transition-colors"><ChevronRight className="w-4 h-4" /></span>
                </div>
                <h4 className="font-bold text-gray-900 text-lg mb-1">Cabai Merah (500kg)</h4>
                <div className="flex items-center gap-2 text-sm text-gray-500 font-medium mb-3">
                  <CalendarClock className="w-4 h-4 text-gray-400" />
                  25 Jul 2026, 09:00 WIB
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-gray-500 bg-gray-50 px-3 py-2 rounded-md">
                  <MapPin className="w-3 h-3" /> Gudang Cirebon
                </div>
              </div>

              {/* Item 2 */}
              <div className="border border-gray-100 rounded-md p-4 hover:border-green-300 transition-colors cursor-pointer group">
                <div className="flex justify-between items-start mb-3">
                  <div className="bg-gray-100 text-gray-600 font-bold px-2.5 py-1 rounded-md text-[10px]">LUSA</div>
                  <span className="text-gray-400 group-hover:text-green-600 transition-colors"><ChevronRight className="w-4 h-4" /></span>
                </div>
                <h4 className="font-bold text-gray-900 text-lg mb-1">Padi Ciherang (1 Ton)</h4>
                <div className="flex items-center gap-2 text-sm text-gray-500 font-medium mb-3">
                  <CalendarClock className="w-4 h-4 text-gray-400" />
                  26 Jul 2026, 11:00 WIB
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-gray-500 bg-gray-50 px-3 py-2 rounded-md">
                  <MapPin className="w-3 h-3" /> Penggilingan Pusat
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
