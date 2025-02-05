import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, AuthResponse, RegisterCredentials, LoginCredentials } from '../types/auth';
import * as authApi from '../api/auth';
import { AxiosError } from 'axios';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  accessTokenExpiresAt: number | null;
  refreshTokenExpiresAt: number | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setAuth: (response: AuthResponse) => Partial<AuthState>;
  clearAuth: () => Partial<AuthState>;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => Promise<void>;
  updateAccessToken: (response: AuthResponse) => void;
  refreshTokens: () => Promise<boolean>;
  handleAuthError: (error: unknown) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      accessTokenExpiresAt: null,
      refreshTokenExpiresAt: null,
      isAuthenticated: false,
      isLoading: false,

      setAuth: (response: AuthResponse) => {
        const now = Date.now();
        const newState = {
          user: response.user,
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
          accessTokenExpiresAt: now + response.accessTokenExpiresIn,
          refreshTokenExpiresAt: now + response.refreshTokenExpiresIn,
          isAuthenticated: true,
        };
        set(newState);
        return newState;
      },

      clearAuth: () => {
        const newState = {
          user: null,
          accessToken: null,
          refreshToken: null,
          accessTokenExpiresAt: null,
          refreshTokenExpiresAt: null,
          isAuthenticated: false,
        };
        set(newState);
        return newState;
      },

      updateAccessToken: (response: AuthResponse) => {
        const now = Date.now();
        set({
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
          accessTokenExpiresAt: now + response.accessTokenExpiresIn,
          refreshTokenExpiresAt: now + response.refreshTokenExpiresIn,
        });
      },

      handleAuthError: (error: unknown) => {
        const isAxiosError = error instanceof AxiosError;
        if (isAxiosError && error.response?.status === 401) {
          get().clearAuth();
        }
        console.error('Auth error:', error);
        throw error;
      },

      refreshTokens: async () => {
        const { refreshToken, refreshTokenExpiresAt } = get();
        const now = Date.now();

        if (!refreshToken || !refreshTokenExpiresAt || refreshTokenExpiresAt < now) {
          get().clearAuth();
          return false;
        }

        try {
          const response = await authApi.refreshAccessToken(refreshToken);
          get().setAuth(response);
          return true;
        } catch (error) {
          get().handleAuthError(error);
          return false;
        }
      },

      login: async (credentials: LoginCredentials) => {
        try {
          set({ isLoading: true });
          const response = await authApi.login(credentials);
          get().setAuth(response);
        } catch (error) {
          get().handleAuthError(error);
        } finally {
          set({ isLoading: false });
        }
      },

      register: async (credentials: RegisterCredentials) => {
        try {
          set({ isLoading: true });
          const response = await authApi.register(credentials);
          get().setAuth(response);
        } catch (error) {
          get().handleAuthError(error);
        } finally {
          set({ isLoading: false });
        }
      },

      logout: async () => {
        try {
          set({ isLoading: true });
          await authApi.logout();
          get().clearAuth();
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        refreshToken: state.refreshToken,
        refreshTokenExpiresAt: state.refreshTokenExpiresAt,
      }),
    }
  )
);