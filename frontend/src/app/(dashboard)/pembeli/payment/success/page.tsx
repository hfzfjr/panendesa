import React from "react";
import Link from "next/link";
import { Check, HelpCircle } from "lucide-react";
import { Button } from "../../../../../components/ui/Button";

export default function PaymentSuccessPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 lg:px-8 pt-8 pb-28 md:py-16 lg:py-24 flex flex-col items-center justify-center min-h-screen md:min-h-[80vh]">

      {/* Success Icon */}
      <div className="w-24 h-24 rounded-full bg-primary-dark/5 flex items-center justify-center mb-6">
        <div className="w-16 h-16 rounded-full bg-primary-dark text-white flex items-center justify-center shadow-lg shadow-green-900/20">
          <Check className="w-8 h-8 stroke-3" />
        </div>
      </div>

      {/* Header */}
      <h1 className="text-2xl md:text-4xl font-bold text-primary-dark mb-3 text-center">
        Pembayaran Berhasil!
      </h1>
      <p className="text-gray-600 text-center mb-10 max-w-md text-sm md:text-base">
        Terima kasih! Pesanan Anda sedang kami proses untuk validasi kapasitas desa.
      </p>

      {/* Order Details Card */}
      <div className="w-full bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8 mb-6">

        {/* Top half */}
        <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-4 mb-6 pb-6 border-b border-gray-100">
          <div>
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">ID Pesanan</div>
            <div className="font-extrabold text-gray-900 text-lg">#AGR-2024-99281</div>
          </div>
          <div className="md:text-right">
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Pembayaran</div>
            <div className="font-extrabold text-primary-dark text-xl">Rp 8.275.000</div>
          </div>
        </div>

        {/* Bottom half */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex gap-3 items-center">
            <div className="w-10 h-10 rounded-xl bg-primary-dark/5 flex items-center justify-center text-gray-500 shrink-0 border border-gray-100">
              {/* Dummy QRIS Icon */}
              <svg className="w-5 h-5 text-primary-dark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <rect x="7" y="7" width="3" height="3" />
                <rect x="14" y="7" width="3" height="3" />
                <rect x="7" y="14" width="3" height="3" />
                <rect x="14" y="14" width="3" height="3" />
              </svg>
            </div>
            <div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Metode Pembayaran</div>
              <div className="font-semibold text-gray-900 text-sm">QRIS (Gopay/OVO/Dana)</div>
            </div>
          </div>

          <div className="flex gap-3 items-center">
            <div className="w-10 h-10 rounded-xl bg-primary-dark/5 flex items-center justify-center text-gray-500 shrink-0 border border-gray-100">
              <svg className="w-5 h-5 text-primary-dark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Waktu Transaksi</div>
              <div className="font-semibold text-gray-900 text-sm">12 Okt 2024, 09:45 WIB</div>
            </div>
          </div>
        </div>

      </div>

      {/* Next Steps Alert */}
      <div className="w-full bg-[#F2F7F2] rounded-2xl border border-primary-dark/10 p-5 flex gap-4 items-start mb-8">
        <div className="w-6 h-6 rounded-full bg-primary-dark text-white flex items-center justify-center shrink-0 mt-0.5">
          <HelpCircle className="w-4 h-4" />
        </div>
        <div>
          <h4 className="font-bold text-gray-900 text-sm mb-1">Apa selanjutnya?</h4>
          <p className="text-sm text-gray-600 leading-relaxed">
            Tim logistik saat ini sedang berkoordinasi langsung dengan kelompok tani desa untuk memvalidasi stok panen terbaru sesuai pesanan Anda. Kami memastikan kualitas komoditas tetap terjaga sebelum pengiriman dimulai.
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="w-full flex flex-col sm:flex-row gap-4 mt-2">
        <Link href="/pembeli/orders/tracking" className="flex-1 w-full">
          <Button className="w-full h-12 rounded-xl bg-(--color-primary-dark) hover:bg-(--color-primary) text-white font-bold text-sm md:text-base transition-colors flex items-center justify-center gap-2">
            <TruckIcon className="w-5 h-5" />
            Lacak Pesanan
          </Button>
        </Link>

        <Link href="/pembeli" className="flex-1 w-full">
          <Button variant="custom" className="w-full h-12 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900 font-bold text-sm md:text-base transition-colors flex items-center justify-center">
            Kembali ke Dashboard
          </Button>
        </Link>
      </div>

    </main>
  );
}

function TruckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M5 18H3c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v11" />
      <path d="M14 9h4l4 4v5c0 .6-.4 1-1 1h-2" />
      <circle cx="7" cy="18" r="2" />
      <circle cx="17" cy="18" r="2" />
    </svg>
  );
}
