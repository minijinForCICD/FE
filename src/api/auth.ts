import axios from 'axios';
import { AuthResponse, LoginCredentials, RegisterCredentials, User } from '../types/auth';

const BACKEND_API_URL = import.meta.env.VITE_API_URL;
const BACKEND_API_VERSION = import.meta.env.VITE_BACKEND_API_VERSION;

const authApi = axios.create({
  baseURL: `${BACKEND_API_URL}${BACKEND_API_VERSION}/auth`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const { data } = await authApi.post<AuthResponse>('/login', credentials);
  return data;
};

export const register = async (credentials: RegisterCredentials): Promise<AuthResponse> => {
  const { data } = await authApi.post<AuthResponse>('/register', credentials);
  return data;
};

export const refreshAccessToken = async (refreshToken: string): Promise<AuthResponse> => {
  const { data } = await authApi.post<AuthResponse>('/refresh', { refreshToken });
  return data;
};

export const logout = async (): Promise<void> => {
  await authApi.post('/logout');
};

export const getUser = async (): Promise<User> => {
  const { data } = await authApi.get<User>('/me');
  return data;
};

export const googleLogin = async (googleToken: string): Promise<AuthResponse> => {
  const { data } = await authApi.post<AuthResponse>('/google', { token: googleToken });
  return data;
};

export const requestPasswordReset = async (email: string): Promise<void> => {
  await authApi.post('/password-reset-request', { email });
};

export const resetPassword = async (token: string, newPassword: string): Promise<void> => {
  await authApi.post('/password-reset', { token, newPassword });
};

export const verifyEmail = async (token: string): Promise<void> => {
  await authApi.post('/verify-email', { token });
};

export const updateProfile = async (userId: number, updates: Partial<User>): Promise<User> => {
  const { data } = await authApi.patch<User>(`/users/${userId}`, updates);
  return data;
};

authApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      switch (status) {
        case 401:
          console.error('Authentication error:', data.message);
          break;
        case 403:
          console.error('Permission denied:', data.message);
          break;
        case 422:
          console.error('Validation error:', data.errors);
          break;
        default:
          console.error('API error:', data.message);
      }
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Request error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default authApi;