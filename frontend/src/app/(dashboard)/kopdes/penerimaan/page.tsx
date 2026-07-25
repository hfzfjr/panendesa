"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Inbox,
  Filter,
  Search,
  Package,
  Calendar,
  ChevronRight,
  MoreHorizontal
} from "lucide-react";
import { authStorage } from "@/lib/auth";
import { apiClient } from "@/lib/api-client";
import { ErrorState } from "@/components/ui/ErrorState";

interface IntakeGrading {
  id: number;
  stok_estimasi_id: number;
  petugas_id: number;
  foto_url: string;
  skor_warna: number;
  skor_ukuran: number;
  persen_cacat: number;
  grade: string;
  grade_override_manual: boolean;
  berat_aktual_kg: number;
  kejanggalan_terdeteksi: boolean;
  created_at: string;
}

export default function KopdesPenerimaanPage() {
  const [activeTab, setActiveTab] = useState("Semua");
  const tabs = ["Semua", "Grade A", "Grade B", "Grade C"];
  const [intakeList, setIntakeList] = useState<IntakeGrading[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<{ code?: number; message?: string } | null>(null);

  useEffect(() => {
    const fetchIntake = async () => {
      const user = authStorage.getUser();
      if (!user?.desa_id) {
        setError({ code: 403, message: 'Data desa tidak ditemukan' });
        setIsLoading(false);
        return;
      }

      try {
        const response = await apiClient.getIntakeGradingDesa(user.desa_id);
        if (response.success && response.data) {
          setIntakeList(response.data);
        } else {
          setError({ message: response.error || 'Gagal mengambil data intake' });
        }
      } catch (err) {
        setError({ message: 'Terjadi kesalahan koneksi' });
      } finally {
        setIsLoading(false);
      }
    };

    fetchIntake();
  }, []);

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A': return 'bg-green-100 text-green-700';
      case 'B': return 'bg-yellow-100 text-yellow-700';
      case 'C': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredList = activeTab === "Semua"
    ? intakeList
    : intakeList.filter(item => item.grade === activeTab.charAt(0));

  if (isLoading) {
    return (
      <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-6 md:space-y-8">
        <div className="h-8 bg-gray-200 rounded animate-pulse w-64" />
        <div className="bg-white rounded-2xl border border-gray-200 p-2 shadow-sm h-12 animate-pulse" />
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-200 p-5 h-32 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 md:p-8 max-w-6xl mx-auto">
        <ErrorState code={error.code} message={error.message} onRetry={() => window.location.reload()} />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-6 md:space-y-8 pb-32 md:pb-8 min-h-screen">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-primary-dark tracking-tight mb-1">
            Penerimaan & Intake
          </h1>
          <p className="text-gray-500 font-medium text-sm md:text-base">
            Kelola antrean hasil panen petani yang masuk ke gudang hari ini.
          </p>
        </div>
        <div className="bg-primary-light text-primary-dark px-4 py-2 rounded-xl font-bold flex items-center gap-2 w-fit">
          <Calendar className="w-5 h-5" />
          <span>{new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
        </div>
      </div>

      {/* Filter / Tabs */}
      <div className="bg-white rounded-2xl border border-gray-200 p-2 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">

        {/* Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-2 md:pb-0 hide-scrollbar px-2 pt-2 md:pt-0">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${activeTab === tab
                ? 'bg-primary-dark text-white shadow-sm'
                : 'text-gray-500 hover:bg-gray-100'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Right Filters */}
        <div className="flex items-center gap-3 px-2 pb-2 md:pb-0 md:px-4 shrink-0">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari petani/ID..."
              className="bg-gray-100 border-transparent focus:border-primary focus:bg-white focus:ring-0 rounded-full pl-9 pr-4 py-2 text-sm font-medium w-full md:w-48 transition-colors"
            />
          </div>
          <button className="text-gray-500 hover:text-gray-900 p-2 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors shrink-0">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Intake List */}
      <div className="space-y-4">
        {filteredList.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center text-gray-500">
            Belum ada data intake grading
          </div>
        ) : (
          filteredList.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl border border-gray-200 p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row items-start md:items-center gap-5 relative overflow-hidden">

              {/* Left Box (Time & ID) */}
              <div className="flex md:flex-col items-center justify-between md:justify-center w-full md:w-28 md:h-24 rounded-xl bg-gray-50 border border-gray-100 p-3 shrink-0">
                <span className="text-gray-500 font-bold text-sm">{new Date(item.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</span>
                <span className="font-black text-primary-dark text-lg md:mt-1">INT-{item.id}</span>
                <span className={`md:hidden px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getGradeColor(item.grade)}`}>
                  Grade {item.grade}
                  {item.grade_override_manual && <span className="ml-1 text-[8px]">(Manual)</span>}
                </span>
              </div>

              {/* Middle Content */}
              <div className="flex-1 space-y-2 w-full">
                <div className="hidden md:flex items-center gap-3 mb-1">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getGradeColor(item.grade)}`}>
                    Grade {item.grade}
                    {item.grade_override_manual && <span className="ml-1 text-[8px]">(Manual)</span>}
                  </span>
                  {item.kejanggalan_terdeteksi && (
                    <span className="px-2 py-1 rounded text-[10px] font-bold bg-red-100 text-red-700">
                      Kejanggalan Terdeteksi
                    </span>
                  )}
                </div>

                <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-2">
                  Petugas #{item.petugas_id}
                  <span className="text-sm font-medium text-gray-400">(Stok Estimasi #{item.stok_estimasi_id})</span>
                </h2>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-gray-600 text-sm md:text-base font-medium">
                  <div className="flex items-center gap-1.5">
                    <Package className="w-4 h-4 text-primary" />
                    Berat Aktual: <span className="font-bold text-gray-900">{item.berat_aktual_kg.toLocaleString('id-ID', { maximumFractionDigits: 2 })} kg</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                    Skor Warna: <span className="font-bold text-gray-900">{item.skor_warna?.toFixed(2) || '-'}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                    Cacat: <span className="font-bold text-gray-900">{item.persen_cacat?.toFixed(1) || 0}%</span>
                  </div>
                </div>
              </div>

              {/* Right Action */}
              <div className="flex items-center justify-end w-full md:w-auto pt-4 md:pt-0 border-t border-gray-100 md:border-0 mt-2 md:mt-0">
                <button className="w-full md:w-auto text-center font-bold px-8 py-3 md:py-2.5 rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2 bg-gray-100 text-gray-700 hover:bg-gray-200">
                  Detail
                </button>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
