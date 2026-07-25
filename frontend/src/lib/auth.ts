export interface AuthUser {
  user_id: number;
  role: string;
  desa_id?: number | null;
  nama?: string;
  email?: string;
  kopdes_id?: number | null;
}

export const authStorage = {
  getAccessToken: (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('access_token');
  },

  setAccessToken: (token: string): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('access_token', token);
  },

  removeAccessToken: (): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('access_token');
  },

  getRefreshToken: (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('refresh_token');
  },

  setRefreshToken: (token: string): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('refresh_token', token);
  },

  removeRefreshToken: (): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('refresh_token');
  },

  // Legacy compatibility - map to access_token
  getToken: (): string | null => {
    return authStorage.getAccessToken();
  },

  setToken: (token: string): void => {
    authStorage.setAccessToken(token);
  },

  removeToken: (): void => {
    authStorage.removeAccessToken();
  },

  getUser: (): AuthUser | null => {
    if (typeof window === 'undefined') return null;
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  },

  setUser: (user: AuthUser): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('user', JSON.stringify(user));
  },

  removeUser: (): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('user');
  },

  clearAuth: (): void => {
    authStorage.removeAccessToken();
    authStorage.removeRefreshToken();
    authStorage.removeUser();

    // Clear cookie for middleware
    if (typeof window !== 'undefined') {
      document.cookie = 'access_token=; path=/; max-age=0';
    }
  },

  isAuthenticated: (): boolean => {
    return !!authStorage.getAccessToken();
  },
};

export const getDashboardPath = (role: string): string => {
  const rolePaths: Record<string, string> = {
    petani: '/petani',
    petugas_kopdes: '/kopdes',
    pembeli: '/pembeli',
    admin: '/admin',
  };

  return rolePaths[role] || '/';
};
