import React from "react";
import { Truck, ShieldCheck } from "lucide-react";

export function FeatureCards() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 lg:px-8 py-16 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Logistik Card */}
        <div className="bg-green-50/50 p-10 rounded-3xl flex flex-col md:flex-row gap-8 items-start hover:shadow-lg transition-shadow border border-gray-200/50">
          <div className="w-20 h-20 bg-green-200/50 rounded-2xl flex items-center justify-center text-primary-dark shrink-0">
            <Truck className="w-10 h-10" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-primary-dark mb-3">Logistik Terintegrasi</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              Kami bermitra dengan penyedia jasa logistik spesialis pangan untuk menjaga kesegaran hasil tani hingga ke gudang Anda.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-white border border-gray-200 text-xs font-bold text-gray-700 px-3 py-1.5 rounded-full">Lacak Real-time</span>
              <span className="bg-white border border-gray-200 text-xs font-bold text-gray-700 px-3 py-1.5 rounded-full">Cold Chain Ready</span>
              <span className="bg-white border border-gray-200 text-xs font-bold text-gray-700 px-3 py-1.5 rounded-full">Asuransi Pengiriman</span>
            </div>
          </div>
        </div>

        {/* Escrow Card */}
        <div className="bg-neutral-200 p-10 rounded-3xl flex flex-col md:flex-row gap-8 items-start hover:shadow-lg transition-shadow border border-gray-200/50">
          <div className="w-20 h-20 bg-neutral-300 rounded-2xl flex items-center justify-center text-neutral-600 shrink-0">
            <ShieldCheck className="w-10 h-10" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-neutral-600 mb-3">Pembayaran Aman (Escrow)</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              Dana Anda akan ditahan oleh sistem kami dan baru akan diteruskan ke petani setelah barang Anda terima dan konfirmasi.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-white border border-gray-200 text-xs font-bold text-gray-700 px-3 py-1.5 rounded-full">Rekber Resmi</span>
              <span className="bg-white border border-gray-200 text-xs font-bold text-gray-700 px-3 py-1.5 rounded-full">Proteksi Buyer</span>
              <span className="bg-white border border-gray-200 text-xs font-bold text-gray-700 px-3 py-1.5 rounded-full">Refund Guarantee</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
