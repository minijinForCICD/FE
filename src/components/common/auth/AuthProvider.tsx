import React, { useEffect } from 'react';
import { useAuthStore } from '../../../states/authStore';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { refreshTokens, isLoading } = useAuthStore();

  useEffect(() => {
    const initAuth = async () => {
      try {
        await refreshTokens();
      } catch (error) {
        console.error('Auth initialization failed:', error);
      } finally {
        !isLoading;
      }
    };

    initAuth();
  }, []);

  return children;
};