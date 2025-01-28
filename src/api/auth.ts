import axios from 'axios';
import { AuthTokens, LoginCredentials, User } from '../types/auth';

const API_URL = import.meta.env.VITE_BACKEND_API_URL;
const API_VERSION = import.meta.env.VITE_BACKEND_API_VERSION;

const authApi = axios.create({
  baseURL: `${API_URL}${API_VERSION}/auth`,
  withCredentials: true,
});

export const login = async (credentials: LoginCredentials): Promise<AuthTokens> => {
  const { data } = await authApi.post<AuthTokens>('/login', credentials);
  return data;
};

export const refreshAccessToken = async (refreshToken: string): Promise<AuthTokens> => {
  const { data } = await authApi.post<AuthTokens>('/refresh', { refreshToken });
  return data;
};

export const logout = async () => {
  await authApi.post('/logout');
};

export const getUser = async (): Promise<User> => {
  const { data } = await authApi.get<User>('/me');
  return data;
};
