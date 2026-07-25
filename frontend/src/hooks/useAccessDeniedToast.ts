'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Toast } from '@/components/ui/Toast';

export function useAccessDeniedToast() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const accessDenied = searchParams.get('access_denied');

    if (accessDenied === 'true') {
      setShowToast(true);

      // Strip the query param without reloading
      const url = new URL(window.location.href);
      url.searchParams.delete('access_denied');
      router.replace(url.pathname + url.search);
    }
  }, [searchParams, router]);

  const handleClose = () => {
    setShowToast(false);
  };

  return {
    showToast,
    handleClose,
  };
}
