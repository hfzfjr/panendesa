'use client';

import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  code?: number;
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({ code, message, onRetry }: ErrorStateProps) {
  const getDefaultMessage = () => {
    if (code === 403) return 'Anda tidak memiliki akses ke halaman ini';
    if (code === 404) return 'Data tidak ditemukan';
    if (code === 500) return 'Terjadi kesalahan server';
    if (code) return `Error ${code}`;
    return message || 'Terjadi kesalahan';
  };

  const displayMessage = message || getDefaultMessage();

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="bg-red-50 rounded-full p-4 mb-4">
        <AlertCircle className="w-8 h-8 text-red-500" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {code ? `Error ${code}` : 'Terjadi Kesalahan'}
      </h3>
      <p className="text-gray-600 mb-4 max-w-md">{displayMessage}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <RefreshCw size={16} />
          Coba Lagi
        </button>
      )}
    </div>
  );
}
