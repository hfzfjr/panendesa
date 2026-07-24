"use client";

import React, { useState } from "react";
import { 
  Settings, 
  Bell, 
  ShieldCheck, 
  Wallet, 
  Save,
  Smartphone,
  Check
} from "lucide-react";

export default function KopdesPengaturanPage() {
  const [activeTab, setActiveTab] = useState("Sistem & Otomatisasi");

  const tabs = [
    { id: "Sistem & Otomatisasi", icon: Settings },
    { id: "Notifikasi", icon: Bell },
    { id: "Keamanan", icon: ShieldCheck },
    { id: "Pembayaran", icon: Wallet },
  ];

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-6 md:space-y-8 pb-32 md:pb-8 min-h-screen">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-primary-dark tracking-tight mb-1">
          Pengaturan Sistem
        </h1>
        <p className="text-gray-500 font-medium text-sm md:text-base">
          Konfigurasi otomatisasi, notifikasi, dan keamanan platform Kopdes.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 md:gap-8">
        
        {/* Sidebar Tabs */}
        <div className="w-full md:w-64 shrink-0">
          <div className="bg-white rounded-2xl border border-gray-200 p-2 shadow-sm space-y-1">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                    isActive 
                      ? 'bg-primary-dark text-white shadow-sm' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                  {tab.id}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 space-y-6">
          
          {/* Section: Otomatisasi Smart Split */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-5 md:p-6 border-b border-gray-100 bg-gray-50/50">
              <h3 className="text-lg font-bold text-gray-900">Otomatisasi Smart Split</h3>
              <p className="text-sm text-gray-500 font-medium mt-1">Atur perilaku pencairan dana otomatis ke petani mitra.</p>
            </div>
            <div className="p-5 md:p-6 space-y-6">
              
              {/* Toggle 1 */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h4 className="font-bold text-gray-900">Transfer Otomatis (Auto-Disburse)</h4>
                  <p className="text-xs md:text-sm text-gray-500 mt-1">Otomatis mencairkan dana (97.5%) ke rekening petani segera setelah dana dari pembeli diterima oleh sistem.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-dark"></div>
                </label>
              </div>

              <div className="w-full h-px bg-gray-100"></div>

              {/* Toggle 2 */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h4 className="font-bold text-gray-900">Potongan Dana Koperasi (2.5%)</h4>
                  <p className="text-xs md:text-sm text-gray-500 mt-1">Potong secara otomatis fee 2.5% untuk kas koperasi dari setiap transaksi yang berhasil.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                  <input type="checkbox" className="sr-only peer" defaultChecked disabled />
                  <div className="w-11 h-6 bg-green-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-dark opacity-60"></div>
                </label>
              </div>

            </div>
          </div>

          {/* Section: Peringatan Sistem Gudang */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-5 md:p-6 border-b border-gray-100 bg-gray-50/50">
              <h3 className="text-lg font-bold text-gray-900">Peringatan Stok & Kapasitas</h3>
            </div>
            <div className="p-5 md:p-6 space-y-6">
              
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h4 className="font-bold text-gray-900 flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-primary-dark" />
                    Peringatan SMS / WhatsApp
                  </h4>
                  <p className="text-xs md:text-sm text-gray-500 mt-1">Kirim peringatan ke nomor HP Ketua Koperasi jika kapasitas gudang melebihi 90%.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-dark"></div>
                </label>
              </div>

            </div>
          </div>

          <div className="flex justify-end">
            <button className="w-full md:w-auto bg-primary-dark hover:bg-green-800 text-white font-bold px-8 py-3 rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2">
              <Save className="w-5 h-5" />
              Simpan Pengaturan
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
