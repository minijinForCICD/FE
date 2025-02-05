import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '../states/authStore';

const REFRESH_THRESHOLD = 60 * 1000; // 1분

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // CORS 쿠키 처리를 위해 필요
});

const handleRequest = async (config: InternalAxiosRequestConfig) => {
  const { 
    accessToken, 
    accessTokenExpiresAt,
    refreshTokens
  } = useAuthStore.getState();

  if (!accessToken || !accessTokenExpiresAt) {
    return config;
  }

  const now = Date.now();
  const timeUntilExpiry = accessTokenExpiresAt - now;

  if (timeUntilExpiry < REFRESH_THRESHOLD) {
    const refreshSuccess = await refreshTokens();
    if (!refreshSuccess) {
      throw new Error('Token refresh failed');
    }
    const newToken = useAuthStore.getState().accessToken;
    config.headers.Authorization = `Bearer ${newToken}`;
  } else {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
};

api.interceptors.request.use(handleRequest, (error) => Promise.reject(error));

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// 타입 확장을 위한 인터페이스 선언 추가
interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as ExtendedAxiosRequestConfig;
    
    if (!originalRequest) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshSuccess = await useAuthStore.getState().refreshTokens();
        if (!refreshSuccess) {
          processQueue(new Error('Token refresh failed'));
          return Promise.reject(error);
        }

        const newToken = useAuthStore.getState().accessToken;
        processQueue(null, newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError as Error);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
