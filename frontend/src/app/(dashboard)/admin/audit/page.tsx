"use client";

import React, { useState, useEffect } from "react";
import { History, Plus, Filter, Search, ChevronRight, ArrowLeft } from "lucide-react";
import { Button } from "../../../../components/ui/Button";
import { ErrorState } from "../../../../components/ui/ErrorState";
import { Toast } from "../../../../components/ui/Toast";
import { apiClient } from "../../../../lib/api-client";
import Link from "next/link";

export default function AuditLogPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error' | 'warning' | 'info'>('info');
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    tabel_terkait: '',
    record_id: '',
    aksi: '',
    catatan: ''
  });

  useEffect(() => {
    const fetchAuditLogs = async () => {
      try {
        const response = await apiClient.getAuditLog();
        if (response.success && response.data) {
          setAuditLogs(response.data);
        } else {
          setError(response.error || 'Gagal mengambil data audit log');
        }
      } catch (err) {
        setError('Terjadi kesalahan saat mengambil data audit log');
      } finally {
        setLoading(false);
      }
    };

    fetchAuditLogs();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.postAuditLog(
        formData.tabel_terkait,
        parseInt(formData.record_id),
        formData.aksi,
        formData.catatan || undefined
      );

      if (response.success && response.data) {
        setToastMessage('Catatan audit berhasil ditambahkan');
        setToastType('success');
        setShowToast(true);
        setShowAddForm(false);
        setFormData({ tabel_terkait: '', record_id: '', aksi: '', catatan: '' });

        // Refresh audit logs
        const refreshResponse = await apiClient.getAuditLog();
        if (refreshResponse.success && refreshResponse.data) {
          setAuditLogs(refreshResponse.data);
        }
      } else {
        setError(response.error || 'Gagal menambahkan catatan audit');
        setToastMessage(response.error || 'Gagal menambahkan catatan audit');
        setToastType('error');
        setShowToast(true);
      }
    } catch (err) {
      setError('Terjadi kesalahan saat menambahkan catatan audit');
      setToastMessage('Terjadi kesalahan saat menambahkan catatan audit');
      setToastType('error');
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-4 md:p-8 max-w-7xl mx-auto">
        <div className="animate-pulse space-y-4">
          <div className="h-10 bg-gray-200 rounded w-64"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
          <div className="space-y-2">
            <div className="h-16 bg-gray-200 rounded"></div>
            <div className="h-16 bg-gray-200 rounded"></div>
            <div className="h-16 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error && auditLogs.length === 0) {
    return (
      <div className="p-4 md:p-8 max-w-7xl mx-auto">
        <Link href="/admin" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary-dark font-bold transition-colors mb-6">
          <ArrowLeft className="w-5 h-5" />
          Kembali ke Dashboard
        </Link>
        <ErrorState message={error} onRetry={() => window.location.reload()} />
      </div>
    );
  }

  return (
    <>
      {showToast && (
        <Toast
          message={toastMessage}
          onClose={() => setShowToast(false)}
          type={toastType}
        />
      )}

      <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 pb-32 md:pb-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <Link href="/admin" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary-dark font-bold transition-colors mb-2">
              <ArrowLeft className="w-5 h-5" />
              Kembali ke Dashboard
            </Link>
            <h1 className="text-2xl md:text-3xl font-extrabold text-primary-dark tracking-tight mb-1">
              Audit Log
            </h1>
            <p className="text-gray-600 font-medium text-sm md:text-base">
              Riwayat aktivitas sistem dan perubahan data.
            </p>
          </div>
          <Button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center justify-center gap-2 bg-primary-dark hover:bg-green-800 text-white font-bold px-5 py-2.5 rounded-xl transition-colors shadow-sm text-sm w-full md:w-auto"
          >
            <Plus className="w-4 h-4" />
            Tambah Catatan
          </Button>
        </div>

        {/* Add Form */}
        {showAddForm && (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <History className="w-5 h-5 text-primary-dark" />
              Tambah Catatan Audit
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Tabel Terkait</label>
                  <input
                    type="text"
                    value={formData.tabel_terkait}
                    onChange={(e) => setFormData({ ...formData, tabel_terkait: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 py-3 px-4 rounded-xl outline-none focus:border-primary-dark font-medium"
                    placeholder="Misal: orders, users, desa"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Record ID</label>
                  <input
                    type="number"
                    value={formData.record_id}
                    onChange={(e) => setFormData({ ...formData, record_id: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 py-3 px-4 rounded-xl outline-none focus:border-primary-dark font-medium"
                    placeholder="ID record terkait"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Aksi</label>
                <input
                  type="text"
                  value={formData.aksi}
                  onChange={(e) => setFormData({ ...formData, aksi: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 text-gray-900 py-3 px-4 rounded-xl outline-none focus:border-primary-dark font-medium"
                  placeholder="Misal: UPDATE, DELETE, INSERT"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Catatan (opsional)</label>
                <textarea
                  value={formData.catatan}
                  onChange={(e) => setFormData({ ...formData, catatan: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 text-gray-900 py-3 px-4 rounded-xl outline-none focus:border-primary-dark font-medium"
                  placeholder="Catatan tambahan..."
                  rows={3}
                />
              </div>
              <div className="flex gap-3">
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-primary-dark hover:bg-primary text-white font-bold py-3 rounded-xl transition-colors disabled:opacity-50"
                >
                  {loading ? 'Menyimpan...' : 'Simpan Catatan'}
                </Button>
                <Button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  variant="custom"
                  className="flex-1 bg-white border-2 border-gray-200 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Batal
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Filter Bar */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Cari berdasarkan tabel, aksi, atau catatan..."
              className="w-full bg-gray-50 border border-gray-200 text-gray-900 py-3 pl-12 pr-4 rounded-xl outline-none focus:border-primary-dark font-medium"
            />
          </div>
          <Button variant="custom" className="flex items-center justify-center gap-2 bg-white border-2 border-gray-200 text-gray-700 font-bold px-5 py-3 rounded-xl hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
        </div>

        {/* Audit Log Table */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Waktu</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Tabel</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Record ID</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Aksi</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Catatan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {auditLogs.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                      Belum ada data audit log
                    </td>
                  </tr>
                ) : (
                  auditLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(log.created_at).toLocaleString('id-ID')}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {log.user_nama || 'System'}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-bold">
                          {log.tabel_terkait}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {log.record_id}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${
                          log.aksi === 'INSERT' ? 'bg-green-100 text-green-700' :
                          log.aksi === 'UPDATE' ? 'bg-blue-100 text-blue-700' :
                          log.aksi === 'DELETE' ? 'bg-red-100 text-red-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {log.aksi}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                        {log.catatan || '-'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </>
  );
}
