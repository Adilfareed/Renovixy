import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

/* =======================
   API Configuration
======================= */

export const apiService: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/* =======================
   Types
======================= */

export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T = any> {
  success: boolean;
  data: {
    items: T[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
  message?: string;
}

/* =======================
   Interceptors
======================= */

// Request interceptor to add auth token
apiService.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiService.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('renovixy_auth_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

/* =======================
   Helper Functions
======================= */

export const getAuthToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token') || localStorage.getItem('renovixy_auth_token');
  }
  return null;
};

export const setAuthToken = (token: string | null) => {
  if (typeof window !== 'undefined') {
    if (token) {
      localStorage.setItem('token', token);
      localStorage.setItem('renovixy_auth_token', token);
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('renovixy_auth_token');
    }
  }
};

/* =======================
   HTTP Methods
======================= */

export const api = {
  get: <T = any>(url: string, config?: AxiosRequestConfig) =>
    apiService.get<ApiResponse<T>>(url, config),
    
  post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) =>
    apiService.post<ApiResponse<T>>(url, data, config),
    
  put: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) =>
    apiService.put<ApiResponse<T>>(url, data, config),
    
  delete: <T = any>(url: string, config?: AxiosRequestConfig) =>
    apiService.delete<ApiResponse<T>>(url, config),
    
  patch: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) =>
    apiService.patch<ApiResponse<T>>(url, data, config),
};

export default apiService;
