"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { apiClient } from "@/lib/api-client";
import { authStorage, getDashboardPath, isProfileIncomplete } from "@/lib/auth";

export default function AuthCallbackPage() {
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Set timeout for fallback error if no session is detected
    const timeoutId = setTimeout(() => {
      console.error('[OAuth Callback] Timeout: No SIGNED_IN event received within 5 seconds');
      setError('Gagal mendapatkan sesi dari Google. Silakan coba login lagi.');
      setStatus('error');
    }, 5000);

    // Listen for auth state changes (implicit flow - session auto-detected from URL hash)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' || (event === 'INITIAL_SESSION' && session)) {
        clearTimeout(timeoutId);

        if (!session) {
          console.error('[OAuth Callback] Event received but session is null');
          setError('Gagal mendapatkan sesi dari Google. Silakan coba login lagi.');
          setStatus('error');
          return;
        }

        const supabaseAccessToken = session.access_token;

        try {
          // Step 2: Exchange Supabase token for custom JWT from backend
          const exchangeResponse = await apiClient.oauthExchange(supabaseAccessToken);

          if (!exchangeResponse.success || !exchangeResponse.data) {
            console.error('[OAuth Callback] Exchange failed:', exchangeResponse);
            setError(exchangeResponse.error || 'Gagal menukar token dengan server. Silakan coba lagi.');
            setStatus('error');
            return;
          }

          // Step 3: Store custom JWT tokens
          authStorage.setAccessToken(exchangeResponse.data.access_token);
          authStorage.setRefreshToken(exchangeResponse.data.refresh_token);

          // Set cookie for middleware (server-side auth check)
          document.cookie = `access_token=${exchangeResponse.data.access_token}; path=/; max-age=7200`; // 2 hours

          // Step 4: Fetch complete user data including kopdes_id via GET /api/users/me
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

            // Step 5: Check profile_completed flag and redirect accordingly
            if (isProfileIncomplete(meResponse.data)) {
              // Profile not completed for OAuth user - redirect to profile completion page
              router.push('/auth/complete-profile');
            } else {
              // Profile completed or user is manual (auth_id null) - redirect to dashboard
              const dashboardPath = getDashboardPath(meResponse.data.role);
              router.push(dashboardPath);
            }
          } else {
            // Fallback: use data from oauth-exchange response if getMe fails
            authStorage.setUser({
              user_id: exchangeResponse.data.user.id,
              role: exchangeResponse.data.user.role,
              desa_id: exchangeResponse.data.user.desa_id,
              nama: exchangeResponse.data.user.nama,
              email: exchangeResponse.data.user.email,
            });

            const dashboardPath = getDashboardPath(exchangeResponse.data.user.role);
            router.push(dashboardPath);
          }

          setStatus('success');
        } catch (err) {
          console.error('[OAuth Callback] Error during token exchange:', err);
          setError('Terjadi kesalahan saat memproses login dengan Google. Silakan coba lagi.');
          setStatus('error');
        }
      }
    });

    // Cleanup: unsubscribe listener and clear timeout on unmount
    return () => {
      clearTimeout(timeoutId);
      subscription.unsubscribe();
    };
  }, [router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary-dark mx-auto mb-4" />
          <h1 className="text-xl font-bold text-gray-900 mb-2">Memproses Login Google...</h1>
          <p className="text-gray-500 text-sm">Mohon tunggu sebentar, kami sedang menyelesaikan proses login Anda.</p>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Login Gagal</h1>
          <p className="text-gray-500 mb-6">{error || 'Terjadi kesalahan yang tidak diketahui.'}</p>
          <button
            onClick={() => router.push('/auth/login')}
            className="bg-primary-dark hover:bg-primary text-white font-bold px-6 py-3 rounded-xl transition-colors"
          >
            Kembali ke Halaman Login
          </button>
        </div>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Login Berhasil</h1>
          <p className="text-gray-500">Mengalihkan ke dashboard...</p>
        </div>
      </div>
    );
  }

  return null;
}
