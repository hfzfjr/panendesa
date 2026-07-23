import { Search, ChevronDown, MapPin, Scale } from "lucide-react";
import { Button } from "../ui/Button";
import Link from "next/link";

export function SearchHero() {
  return (
    <section className="w-full flex flex-col items-center pt-16 pb-12 px-4">
      <div className="flex items-center gap-2 bg-success/10 text-success px-4 py-1.5 rounded-full text-xs font-bold mb-6">
        <ShieldIcon className="w-4 h-4" />
        DIPERCAYA OLEH 10.000+ PETANI
      </div>

      <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-neutral-900 text-center leading-tight mb-4 tracking-tight max-w-4xl">
        Efisiensi <span className="text-primary-dark">Farm-to-Table</span> Dalam Satu Genggaman
      </h1>

      <p className="text-neutral-600 text-center max-w-2xl text-sm md:text-lg mb-8 md:mb-12">
        Hubungkan langsung hasil panen Anda dengan pembeli retail dan grosir di seluruh Indonesia tanpa perantara yang rumit.
      </p>

      {/* Floating Search Card */}
      <div className="w-full max-w-4xl bg-white p-4 md:p-6 rounded-3xl shadow-xl shadow-green-900/5 border border-gray-100 flex flex-col gap-4">
        <div className="flex flex-col md:flex-row items-center w-full bg-white rounded-2xl border-2 border-gray-200 p-2 md:pl-4 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/20 transition-all gap-2 md:gap-0">
          <div className="flex items-center w-full md:w-auto grow px-2 md:px-0">
            <Search className="w-5 h-5 text-gray-400 mr-3" />
            <input
              type="text"
              placeholder="Cari kebutuhan panen Anda..."
              className="w-full bg-transparent outline-none text-neutral-900 placeholder-gray-400 py-2 md:py-0"
            />
          </div>
          <Link href="/pembeli/marketplace" className="w-full md:w-auto">
            <Button className="w-full md:w-auto rounded-xl px-8 py-3 md:py-2 bg-primary-dark hover:bg-primary">
              Cari Sekarang
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center justify-between bg-neutral-100 px-4 py-3 rounded-xl cursor-pointer hover:bg-gray-200 transition-colors">
            <span className="text-sm font-medium text-gray-700">Komoditas</span>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </div>
          <div className="flex items-center justify-between bg-neutral-100 px-4 py-3 rounded-xl focus-within:ring-2 focus-within:ring-gray-300 transition-shadow">
            <input
              type="text"
              placeholder="Jumlah (kg)"
              className="bg-transparent outline-none text-sm font-medium text-gray-700 w-full placeholder-gray-700"
            />
            <Scale className="w-4 h-4 text-gray-500" />
          </div>
          <div className="flex items-center justify-between bg-neutral-100 px-4 py-3 rounded-xl focus-within:ring-2 focus-within:ring-gray-300 transition-shadow">
            <input
              type="text"
              placeholder="Lokasi"
              className="bg-transparent outline-none text-sm font-medium text-gray-700 w-full placeholder-gray-700"
            />
            <MapPin className="w-4 h-4 text-gray-500" />
          </div>
        </div>
      </div>

      {/* Popular Tags */}
      <div className="flex flex-wrap items-center justify-center gap-3 mt-6 text-sm">
        <span className="text-gray-500">Sering dicari:</span>
        <span className="px-4 py-1.5 rounded-full border border-gray-200 bg-white text-gray-600 hover:border-primary cursor-pointer transition-colors">Cabai Merah</span>
        <span className="px-4 py-1.5 rounded-full border border-gray-200 bg-white text-gray-600 hover:border-primary cursor-pointer transition-colors">Bawang Merah</span>
        <span className="px-4 py-1.5 rounded-full border border-gray-200 bg-white text-gray-600 hover:border-primary cursor-pointer transition-colors">Jagung</span>
        <span className="px-4 py-1.5 rounded-full border border-gray-200 bg-white text-gray-600 hover:border-primary cursor-pointer transition-colors">Padi</span>
      </div>
    </section>
  );
}

function ShieldIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
