import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../../states/authStore';
import { Spinner } from '../../common/Spinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireRole?: 'user' | 'admin';
}

export const ProtectedRoute = ({ children, requireRole }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading, user } = useAuthStore();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireRole && user?.role !== requireRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
}; 