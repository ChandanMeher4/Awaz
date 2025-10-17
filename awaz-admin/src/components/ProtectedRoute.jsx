import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute() {
  const { isAdmin } = useAuth();

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  // If logged in, it will render the nested route (e.g., the AdminLayout)
  return <Outlet />;
}

export default ProtectedRoute;