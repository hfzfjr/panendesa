const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

interface LoginResponse {
  success: boolean;
  data?: {
    access_token: string;
    refresh_token: string;
    user: {
      id: number;
      nama: string;
      role: string;
      desa_id: number | null;
      email: string;
    };
  };
  error?: string;
}

interface RegisterResponse {
  success: boolean;
  data?: {
    token: string;
    role: string;
    user_id: number;
  };
  error?: string;
}

interface RefreshResponse {
  success: boolean;
  data?: {
    access_token: string;
  };
  error?: string;
}

interface MeResponse {
  success: boolean;
  data?: {
    id: number;
    nama: string;
    email: string;
    role: string;
    desa_id: number | null;
    profile_completed?: boolean;
    kopdes_id?: number | null;
  };
  error?: string;
}

interface OAuthExchangeResponse {
  success: boolean;
  data?: {
    access_token: string;
    refresh_token: string;
    user: {
      id: number;
      nama: string;
      role: string;
      desa_id: number | null;
      email: string;
      profile_completed?: boolean;
    };
  };
  error?: string;
}

interface RegisterData {
  email: string;
  password: string;
  // Additional fields based on role
  nama_lengkap?: string;
  nik?: string;
  desa_id?: number;
  nama_koperasi?: string;
  nomor_badan_hukum?: string;
  nama_penanggung_jawab?: string;
  tipe_pembeli?: string;
  alamat_pengiriman?: string;
  nomor_hp?: string;
}

class ApiClient {
  private baseUrl: string;
  private isRefreshing = false;
  private refreshPromise: Promise<string | null> | null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private getAuthHeaders(): HeadersInit {
    const accessToken = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return headers;
  }

  private async refreshAccessToken(): Promise<string | null> {
    // Prevent multiple refresh attempts
    if (this.isRefreshing) {
      return this.refreshPromise;
    }

    this.isRefreshing = true;
    this.refreshPromise = this.performRefresh();

    try {
      return await this.refreshPromise;
    } finally {
      this.isRefreshing = false;
      this.refreshPromise = null;
    }
  }

  private async performRefresh(): Promise<string | null> {
    const refreshToken = typeof window !== 'undefined' ? localStorage.getItem('refresh_token') : null;

    if (!refreshToken) {
      return null;
    }

    try {
      const response = await fetch(`${this.baseUrl}/api/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh_token: refreshToken }),
      });

      const data: RefreshResponse = await response.json();

      if (data.success && data.data?.access_token) {
        localStorage.setItem('access_token', data.data.access_token);
        return data.data.access_token;
      }

      // Refresh failed, clear tokens
      this.clearAuth();
      return null;
    } catch (error) {
      console.error('Refresh token error:', error);
      this.clearAuth();
      return null;
    }
  }

  private clearAuth(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
    }
  }

  private async fetchWithAuth(url: string, options: RequestInit = {}): Promise<Response> {
    let response = await fetch(url, {
      ...options,
      headers: this.getAuthHeaders(),
    });

    // Handle 401 with refresh token
    if (response.status === 401) {
      const newAccessToken = await this.refreshAccessToken();

      if (newAccessToken) {
        // Retry original request with new token
        response = await fetch(url, {
          ...options,
          headers: {
            ...options.headers,
            'Authorization': `Bearer ${newAccessToken}`,
          },
        });
      } else {
        // Refresh failed, redirect to login will be handled by caller
        window.location.href = '/auth/login';
      }
    }

    return response;
  }

  async login(email: string, password: string): Promise<LoginResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data: LoginResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        error: 'Gagal terhubung ke server',
      };
    }
  }

  async register(userData: RegisterData): Promise<RegisterResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data: RegisterResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Register error:', error);
      return {
        success: false,
        error: 'Gagal terhubung ke server',
      };
    }
  }

  async oauthExchange(supabaseAccessToken: string): Promise<OAuthExchangeResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/api/auth/oauth-exchange`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ access_token: supabaseAccessToken }),
      });

      const data: OAuthExchangeResponse = await response.json();
      return data;
    } catch (error) {
      console.error('OAuth exchange error:', error);
      return {
        success: false,
        error: 'Gagal terhubung ke server',
      };
    }
  }

  async get(endpoint: string): Promise<any> {
    try {
      const response = await this.fetchWithAuth(`${this.baseUrl}${endpoint}`, {
        method: 'GET',
      });

      return await response.json();
    } catch (error) {
      console.error('GET error:', error);
      return { success: false, error: 'Gagal mengambil data' };
    }
  }

  async post(endpoint: string, data: any): Promise<any> {
    try {
      const response = await this.fetchWithAuth(`${this.baseUrl}${endpoint}`, {
        method: 'POST',
        body: JSON.stringify(data),
      });

      return await response.json();
    } catch (error) {
      console.error('POST error:', error);
      return { success: false, error: 'Gagal mengirim data' };
    }
  }

  async put(endpoint: string, data: any): Promise<any> {
    try {
      const response = await this.fetchWithAuth(`${this.baseUrl}${endpoint}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });

      return await response.json();
    } catch (error) {
      console.error('PUT error:', error);
      return { success: false, error: 'Gagal mengupdate data' };
    }
  }

  async delete(endpoint: string): Promise<any> {
    try {
      const response = await this.fetchWithAuth(`${this.baseUrl}${endpoint}`, {
        method: 'DELETE',
      });

      return await response.json();
    } catch (error) {
      console.error('DELETE error:', error);
      return { success: false, error: 'Gagal menghapus data' };
    }
  }

  async getMe(): Promise<MeResponse> {
    try {
      const response = await this.fetchWithAuth(`${this.baseUrl}/api/users/me`, {
        method: 'GET',
      });

      return await response.json();
    } catch (error) {
      console.error('Get me error:', error);
      return {
        success: false,
        error: 'Gagal mengambil data profil',
      };
    }
  }

  async getCapacity(desaId: number): Promise<any> {
    try {
      const response = await this.fetchWithAuth(`${this.baseUrl}/api/capacity/${desaId}`, {
        method: 'GET',
      });

      return await response.json();
    } catch (error) {
      console.error('Get capacity error:', error);
      return { success: false, error: 'Gagal mengambil data kapasitas' };
    }
  }

  async getStokEstimasiDesa(desaId: number): Promise<any> {
    try {
      const response = await this.fetchWithAuth(`${this.baseUrl}/api/stok-estimasi/desa/${desaId}`, {
        method: 'GET',
      });

      return await response.json();
    } catch (error) {
      console.error('Get stok estimasi desa error:', error);
      return { success: false, error: 'Gagal mengambil data stok estimasi' };
    }
  }

  async getIntakeGradingDesa(desaId: number): Promise<any> {
    try {
      const response = await this.fetchWithAuth(`${this.baseUrl}/api/intake-grading/${desaId}`, {
        method: 'GET',
      });

      return await response.json();
    } catch (error) {
      console.error('Get intake grading desa error:', error);
      return { success: false, error: 'Gagal mengambil data intake grading' };
    }
  }

  async postIntakeGrading(formData: FormData): Promise<any> {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;

      const response = await fetch(`${this.baseUrl}/api/intake-grading`, {
        method: 'POST',
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        return { success: false, error: errorData.error || 'Gagal submit intake grading' };
      }

      return await response.json();
    } catch (error) {
      console.error('Post intake grading error:', error);
      return { success: false, error: 'Gagal submit intake grading' };
    }
  }

  async getOrdersByKopdes(kopdesId: number): Promise<any> {
    try {
      const response = await this.fetchWithAuth(`${this.baseUrl}/api/orders/kopdes/${kopdesId}`, {
        method: 'GET',
      });

      return await response.json();
    } catch (error) {
      console.error('Get orders by kopdes error:', error);
      return { success: false, error: 'Gagal mengambil data pesanan' };
    }
  }

  async getOrderById(orderId: number): Promise<any> {
    try {
      const response = await this.fetchWithAuth(`${this.baseUrl}/api/orders/${orderId}`, {
        method: 'GET',
      });

      return await response.json();
    } catch (error) {
      console.error('Get order by id error:', error);
      return { success: false, error: 'Gagal mengambil detail pesanan' };
    }
  }

  async confirmOrderPrice(orderId: number, hargaFinalPerKg: number): Promise<any> {
    try {
      const response = await this.fetchWithAuth(`${this.baseUrl}/api/orders/${orderId}/confirm-price`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ harga_final_per_kg: hargaFinalPerKg }),
      });

      return await response.json();
    } catch (error) {
      console.error('Confirm order price error:', error);
      return { success: false, error: 'Gagal mengkonfirmasi harga' };
    }
  }

  async getTrustScorePetani(petaniId: number): Promise<any> {
    try {
      const response = await this.fetchWithAuth(`${this.baseUrl}/api/trust-score/petani/${petaniId}`, {
        method: 'GET',
      });

      return await response.json();
    } catch (error) {
      console.error('Get trust score petani error:', error);
      return { success: false, error: 'Gagal mengambil skor konsistensi' };
    }
  }

  async getStokEstimasiPetani(petaniId: number): Promise<any> {
    try {
      const response = await this.fetchWithAuth(`${this.baseUrl}/api/stok-estimasi/${petaniId}`, {
        method: 'GET',
      });

      return await response.json();
    } catch (error) {
      console.error('Get stok estimasi petani error:', error);
      return { success: false, error: 'Gagal mengambil data stok estimasi' };
    }
  }

  async postStokEstimasi(komoditasId: number, jumlahKg: number, tanggalTargetPanen: string): Promise<any> {
    try {
      const response = await this.fetchWithAuth(`${this.baseUrl}/api/stok-estimasi`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          komoditas_id: komoditasId,
          jumlah_kg: jumlahKg,
          tanggal_target_panen: tanggalTargetPanen,
        }),
      });

      return await response.json();
    } catch (error) {
      console.error('Post stok estimasi error:', error);
      return { success: false, error: 'Gagal submit stok estimasi' };
    }
  }

  async getFairSharePetani(petaniId: number): Promise<any> {
    try {
      const response = await this.fetchWithAuth(`${this.baseUrl}/api/fair-share/petani/${petaniId}`, {
        method: 'GET',
      });

      return await response.json();
    } catch (error) {
      console.error('Get fair share petani error:', error);
      return { success: false, error: 'Gagal mengambil data fair share' };
    }
  }

  async postOrder(komoditasId: number, jumlahDimintaKg: number, desaIdPrioritas: number): Promise<any> {
    try {
      const response = await this.fetchWithAuth(`${this.baseUrl}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          komoditas_id: komoditasId,
          jumlah_diminta_kg: jumlahDimintaKg,
          desa_id_prioritas: desaIdPrioritas,
        }),
      });

      return await response.json();
    } catch (error) {
      console.error('Post order error:', error);
      return { success: false, error: 'Gagal membuat pesanan' };
    }
  }

  async getOrdersByPembeli(pembeliId: number): Promise<any> {
    try {
      const response = await this.fetchWithAuth(`${this.baseUrl}/api/orders/${pembeliId}`, {
        method: 'GET',
      });

      return await response.json();
    } catch (error) {
      console.error('Get orders by pembeli error:', error);
      return { success: false, error: 'Gagal mengambil data pesanan' };
    }
  }

  async getTrustScoreDesa(desaId: number): Promise<any> {
    try {
      const response = await this.fetchWithAuth(`${this.baseUrl}/api/trust-score/desa/${desaId}`, {
        method: 'GET',
      });

      return await response.json();
    } catch (error) {
      console.error('Get trust score desa error:', error);
      return { success: false, error: 'Gagal mengambil skor konsistensi desa' };
    }
  }

  async getDesa(): Promise<any> {
    try {
      const response = await this.fetchWithAuth(`${this.baseUrl}/api/desa`, {
        method: 'GET',
      });

      return await response.json();
    } catch (error) {
      console.error('Get desa error:', error);
      return { success: false, error: 'Gagal mengambil data desa' };
    }
  }

  async getAuditLog(tabel?: string, recordId?: number): Promise<any> {
    try {
      const params = new URLSearchParams();
      if (tabel) params.append('tabel', tabel);
      if (recordId) params.append('record_id', recordId.toString());

      const url = `${this.baseUrl}/api/audit-log${params.toString() ? `?${params.toString()}` : ''}`;
      const response = await this.fetchWithAuth(url, {
        method: 'GET',
      });

      return await response.json();
    } catch (error) {
      console.error('Get audit log error:', error);
      return { success: false, error: 'Gagal mengambil data audit log' };
    }
  }

  async postAuditLog(tabelTerikait: string, recordId: number, aksi: string, catatan?: string): Promise<any> {
    try {
      const response = await this.fetchWithAuth(`${this.baseUrl}/api/audit-log`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tabel_terkait: tabelTerikait,
          record_id: recordId,
          aksi: aksi,
          catatan: catatan,
        }),
      });

      return await response.json();
    } catch (error) {
      console.error('Post audit log error:', error);
      return { success: false, error: 'Gagal menambahkan catatan audit' };
    }
  }

  async getEconomicImpact(komoditasId: number, desaId?: number): Promise<any> {
    try {
      const params = new URLSearchParams();
      if (desaId) params.append('desa_id', desaId.toString());

      const url = `${this.baseUrl}/api/economic-impact/${komoditasId}${params.toString() ? `?${params.toString()}` : ''}`;
      const response = await this.fetchWithAuth(url, {
        method: 'GET',
      });

      return await response.json();
    } catch (error) {
      console.error('Get economic impact error:', error);
      return { success: false, error: 'Gagal mengambil data dampak ekonomi' };
    }
  }

  async logout(): Promise<{ success: boolean; error?: string }> {
    const refreshToken = typeof window !== 'undefined' ? localStorage.getItem('refresh_token') : null;

    try {
      if (refreshToken) {
        await fetch(`${this.baseUrl}/api/auth/logout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ refresh_token: refreshToken }),
        });
      }

      this.clearAuth();
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      // Clear local auth even if backend logout fails
      this.clearAuth();
      return { success: true };
    }
  }
}

export const apiClient = new ApiClient(API_URL);
