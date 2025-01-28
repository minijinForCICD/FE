import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, AuthTokens, RegisterCredentials } from '../types/auth';
import * as authApi from '../api/auth';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshTokens: () => Promise<boolean>;
  register: (credentials: RegisterCredentials) => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: true,
      
      setLoading: (loading: boolean) => set({ isLoading: loading }),

      register: async (credentials: RegisterCredentials) => {
        try {
          set({ isLoading: true });
          await authApi.register(credentials);
        } catch (error) {
          console.error('Registration failed:', error);
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },
      

      login: async (email: string, password: string) => {
        try {
          set({ isLoading: true });
          const tokens = await authApi.login({ email, password });
          const user = await authApi.getUser();
          set({
            user,
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
            isAuthenticated: true,
          });
        } catch (error) {
          console.error('Login failed:', error);
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      logout: async () => {
        try {
          set({ isLoading: true });
          await authApi.logout();
          set({
            user: null,
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,
          });
        } catch (error) {
          console.error('Logout failed:', error);
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      refreshTokens: async () => {
        try {
          const refreshToken = get().refreshToken;
          if (!refreshToken) {
            set({ isLoading: false });
            return false;
          }

          const tokens = await authApi.refreshAccessToken(refreshToken);
          set({
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
            isAuthenticated: true,
          });
          return true;
        } catch (error) {
          console.error('Token refresh failed:', error);
          set({
            user: null,
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,
          });
          return false;
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        refreshToken: state.refreshToken,
      }),
    }
  )
);