import React from "react";
import { Archive, Map, Banknote, ShieldCheck, TrendingUp, TrendingDown } from "lucide-react";

export function MarketplaceStats() {
  const stats = [
    {
      title: "Total Tersedia",
      value: "12.450",
      unit: "kg",
      subtext: "+5% hari ini",
      isUp: true,
      icon: <Archive className="w-5 h-5 text-green-700" />
    },
    {
      title: "Desa Tersedia",
      value: "18",
      unit: "Desa",
      subtext: "Cianjur, Garut, Bandung",
      icon: <Map className="w-5 h-5 text-green-700" />
    },
    {
      title: "Harga Rata-rata",
      value: "Rp 14.200",
      unit: "/kg",
      subtext: "-2% dari kemarin",
      isUp: false,
      icon: <Banknote className="w-5 h-5 text-green-700" />
    },
    {
      title: "Skor Rata-rata",
      value: "92.4",
      unit: "/100",
      subtext: "Sangat Konsisten",
      isGoodScore: true,
      icon: <ShieldCheck className="w-5 h-5 text-green-700" />
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, idx) => (
        <div key={idx} className="bg-green-50 rounded-2xl p-5 border border-green-900/10 flex flex-col justify-between h-36">
          <div className="flex justify-between items-start">
            <span className="text-sm font-medium text-gray-600">{stat.title}</span>
            <div className="w-8 h-8 flex items-center justify-center">
              {stat.icon}
            </div>
          </div>

          <div>
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
              <span className="text-xs font-semibold text-gray-500">{stat.unit}</span>
            </div>

            <div className={`text-xs font-bold flex items-center gap-1 ${stat.isGoodScore ? 'text-green-700' :
                (stat.isUp === true ? 'text-green-600' : stat.isUp === false ? 'text-red-500' : 'text-gray-500')
              }`}>
              {stat.isUp === true && <TrendingUp className="w-3 h-3" />}
              {stat.isUp === false && <TrendingDown className="w-3 h-3" />}
              {stat.subtext}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
