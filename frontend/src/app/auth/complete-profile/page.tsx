'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/lib/api-client';
import { getDashboardPath, isProfileIncomplete } from '@/lib/auth';

export default function CompleteProfilePage() {
  const router = useRouter();
  const [nama, setNama] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch current user data
    const fetchUserData = async () => {
      try {
        const meResponse = await apiClient.getMe();

        if (!meResponse.success || !meResponse.data) {
          // User not authenticated, redirect to login
          router.push('/auth/login');
          return;
        }

        const user = meResponse.data;

        // Guard: redirect if not OAuth user or profile already completed
        if (!isProfileIncomplete(user)) {
          const dashboardPath = getDashboardPath(user.role);
          router.push(dashboardPath);
          return;
        }

        // Prefill nama if available
        if (user.nama) {
          setNama(user.nama);
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Gagal mengambil data profil. Silakan refresh halaman.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Frontend validation
    if (!nama || nama.trim().length === 0) {
      setError('Nama wajib diisi');
      return;
    }

    setSubmitting(true);

    try {
      const response = await apiClient.completeProfile(nama.trim());

      if (response.success) {
        // Profile completed, redirect to dashboard
        const meResponse = await apiClient.getMe();
        if (meResponse.success && meResponse.data) {
          const dashboardPath = getDashboardPath(meResponse.data.role);
          router.push(dashboardPath);
        }
      } else {
        setError(response.error || 'Gagal melengkapi profil. Silakan coba lagi.');
      }
    } catch (err) {
      console.error('Error completing profile:', err);
      setError('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-100">
        <div className="text-neutral-600">Memuat...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-100 p-4">
      <div className="bg-white rounded-md p-8 w-full max-w-md shadow-sm">
        <h1 className="text-2xl font-bold text-neutral-900 mb-2">
          Lengkapi Profil
        </h1>
        <p className="text-neutral-600 mb-6">
          Silakan lengkapi nama Anda untuk melanjutkan.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="nama" className="block text-neutral-900 font-semibold mb-2">
              Nama
            </label>
            <input
              type="text"
              id="nama"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              placeholder="Masukkan nama lengkap"
              className="w-full px-4 py-3 border border-neutral-600 rounded-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              disabled={submitting}
            />
          </div>

          {error && (
            <div className="mb-4 p-3 bg-danger text-white rounded-sm text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? 'Menyimpan...' : 'Simpan Profil'}
          </button>
        </form>
      </div>
    </div>
  );
}
