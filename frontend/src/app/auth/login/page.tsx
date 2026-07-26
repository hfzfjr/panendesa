"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "../../../components/ui/Button";
import { apiClient } from "../../../lib/api-client";
import { authStorage, getDashboardPath } from "../../../lib/auth";
import { supabase } from "../../../lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(null);
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        setError('Gagal memulai login dengan Google. Silakan coba lagi.');
        setIsGoogleLoading(false);
      }
      // If successful, user will be redirected to Google OAuth page
    } catch (err) {
      setError('Terjadi kesalahan saat memulai login dengan Google.');
      setIsGoogleLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient.login(formData.email, formData.password);

      if (response.success && response.data) {
        // Store access_token and refresh_token
        authStorage.setAccessToken(response.data.access_token);
        authStorage.setRefreshToken(response.data.refresh_token);

        // Set cookie for middleware (server-side auth check)
        document.cookie = `access_token=${response.data.access_token}; path=/; max-age=7200`; // 2 hours

        // Fetch complete user data including kopdes_id from GET /api/users/me
        const meResponse = await apiClient.getMe();

        if (meResponse.success && meResponse.data) {
          // Store complete user data
          authStorage.setUser({
            user_id: meResponse.data.id,
            role: meResponse.data.role,
            desa_id: meResponse.data.desa_id,
            nama: meResponse.data.nama,
            email: meResponse.data.email,
            kopdes_id: meResponse.data.kopdes_id,
          });

          // Redirect to appropriate dashboard based on role
          const dashboardPath = getDashboardPath(meResponse.data.role);
          router.push(dashboardPath);
        } else {
          // Fallback to login response user data if getMe fails
          authStorage.setUser({
            user_id: response.data.user.id,
            role: response.data.user.role,
            desa_id: response.data.user.desa_id,
            nama: response.data.user.nama,
            email: response.data.user.email,
          });

          const dashboardPath = getDashboardPath(response.data.user.role);
          router.push(dashboardPath);
        }
      } else {
        setError(response.error || 'Login gagal. Silakan coba lagi.');
      }
    } catch (err) {
      setError('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen font-sans selection:bg-primary selection:text-white flex items-center justify-center relative p-4 py-12 bg-gray-50">
      
      {/* Clean Background */}
      <div className="absolute inset-0 z-0 bg-gray-50 fixed"></div>

      {/* Floating Centered Card */}
      <div className="w-full max-w-[440px] bg-white/95 backdrop-blur-xl rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-white p-6 sm:p-10 relative z-10 my-auto">
        
        {/* Back Button */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-primary-dark transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Beranda
          </Link>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2 tracking-tight">Selamat Datang</h1>
          <p className="text-gray-500 text-sm font-medium">Masuk ke akun PanenDesa Anda.</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-50/80 backdrop-blur-sm border border-red-100 rounded-2xl text-red-600 text-sm font-medium flex items-center gap-2">
            {error}
          </div>
        )}

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-gray-700 ml-1">Email / Nomor HP</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Contoh: 081234567890"
              className="w-full px-5 py-3.5 bg-gray-50/50 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-gray-400 font-medium text-gray-900"
              disabled={isLoading}
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center ml-1">
              <label className="text-sm font-bold text-gray-700">Kata Sandi</label>
              <Link href="#" className="text-xs font-bold text-primary-dark hover:text-primary transition-colors">
                Lupa sandi?
              </Link>
            </div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-5 py-3.5 bg-gray-50/50 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-gray-400 font-medium text-gray-900"
              disabled={isLoading}
            />
          </div>

          <div className="flex items-center gap-2 pt-1 pb-2 ml-1">
            <input type="checkbox" id="remember" className="w-4 h-4 rounded-md border-gray-300 text-primary focus:ring-primary/20 transition-colors" />
            <label htmlFor="remember" className="text-sm font-medium text-gray-600">Ingat saya</label>
          </div>

          <Button
            type="submit"
            className="w-full h-14 rounded-2xl bg-primary-dark hover:bg-primary font-extrabold text-[15px] transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98]"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Memproses...
              </>
            ) : (
              'Masuk Sekarang'
            )}
          </Button>
        </form>

        {/* Divider */}
        <div className="mt-8 relative flex items-center justify-center">
          <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
          <div className="relative flex justify-center text-xs font-bold text-gray-400 px-4 bg-white/95">
            ATAU MASUK DENGAN
          </div>
        </div>

        {/* Google Login */}
        <div className="mt-8">
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isGoogleLoading || isLoading}
            className="w-full h-14 flex items-center justify-center gap-3 bg-white border border-gray-200 rounded-2xl text-sm font-bold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all focus:outline-none focus:ring-4 focus:ring-gray-100 disabled:opacity-50 disabled:cursor-not-allowed group shadow-sm"
          >
            {isGoogleLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Memproses...
              </>
            ) : (
              <>
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Google
              </>
            )}
          </button>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500 font-medium">
          Belum punya akun?{' '}
          <Link href="/auth/register" className="font-bold text-primary-dark hover:text-primary transition-colors">
            Daftar sekarang
          </Link>
        </div>

      </div>
    </div>
  );
}
