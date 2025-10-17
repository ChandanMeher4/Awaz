
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import StudentLayout from '../layouts/StudentLayout';

function StudentProtectedRoute() {
  const { isStudent } = useAuth();

  if (!isStudent) {
    
    return <Navigate to="/login" replace />;
  }

  
  return <StudentLayout />;
}
export default StudentProtectedRoute;