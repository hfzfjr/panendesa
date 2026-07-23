import React from "react";
import { TrendingUp, TrendingDown, Wheat, Flame, Sprout, Droplets } from "lucide-react";

export function PriceEstimation() {
  const prices = [
    { name: "Padi Ciherang", price: "12.400", unit: "/kg", change: "+2.4%", isUp: true, icon: <Wheat className="w-5 h-5 text-green-600" />, bgColor: "bg-green-50" },
    { name: "Cabai Keriting", price: "45.000", unit: "/kg", change: "-1.2%", isUp: false, icon: <Flame className="w-5 h-5 text-red-600" />, bgColor: "bg-red-50" },
    { name: "Jagung Pipil", price: "6.200", unit: "/kg", change: "+0.8%", isUp: true, icon: <Sprout className="w-5 h-5 text-yellow-600" />, bgColor: "bg-yellow-50" },
    { name: "Minyak Kelapa", price: "22.800", unit: "/liter", change: "+5.1%", isUp: true, icon: <Droplets className="w-5 h-5 text-teal-600" />, bgColor: "bg-teal-50" },
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-4 lg:px-8 py-16 border-t border-gray-200">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">Estimasi Harga</h2>
          <p className="text-neutral-600 text-sm">
            Rerata harga komoditas minggu ini di tingkat desa.
          </p>
        </div>
        <div className="bg-neutral-100 px-4 py-2 rounded-lg text-xs font-medium text-gray-600 flex items-center gap-2">
          <span className="text-red-500 font-bold">*</span>
          Estimasi berbasis riset, <strong>bukan</strong> data transaksi real-time. <strong>Sumber:</strong> Riset Pasar Komoditas 2023
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {prices.map((item, idx) => (
          <div key={idx} className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col justify-between h-48 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="flex justify-between items-start">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.bgColor}`}>
                {item.icon}
              </div>
              <div className={`px-2 py-1 rounded text-xs font-bold ${item.isUp ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {item.change}
              </div>
            </div>

            <div className="mt-4 z-10 relative">
              <h3 className="text-sm font-bold text-gray-600 mb-1">{item.name}</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-primary-dark">Rp {item.price}</span>
                <span className="text-xs text-gray-500 font-medium">{item.unit}</span>
              </div>
            </div>

            {/* Simple CSS Curve Mockup */}
            <div className="absolute bottom-0 left-0 right-0 h-16 opacity-30 group-hover:opacity-50 transition-opacity">
              <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="w-full h-full">
                <path
                  d={item.isUp ? "M0,30 Q25,10 50,20 T100,5 L100,30 L0,30 Z" : "M0,5 Q25,15 50,10 T100,25 L100,30 L0,30 Z"}
                  fill={item.isUp ? "var(--color-primary)" : "var(--color-danger)"}
                />
                <path
                  d={item.isUp ? "M0,30 Q25,10 50,20 T100,5" : "M0,5 Q25,15 50,10 T100,25"}
                  fill="none"
                  stroke={item.isUp ? "var(--color-primary-dark)" : "var(--color-danger)"}
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
