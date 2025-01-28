import React, { useEffect } from 'react';
import { useAuthStore } from '../../../states/authStore';
import { Loading } from '../Loading';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { refreshTokens, setLoading } = useAuthStore();

  useEffect(() => {
    const initAuth = async () => {
      try {
        await refreshTokens();
      } catch (error) {
        console.error('Auth initialization failed:', error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  return children;
};