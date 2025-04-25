import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireEmployee?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireEmployee = false 
}) => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redireciona para a página de login se não estiver autenticado
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireEmployee && !user?.isEmployee) {
    // Redireciona para a página inicial se não for funcionário
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}; 