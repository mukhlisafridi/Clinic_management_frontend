import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PublicRoute = ({ children }) => {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Agar user logged in hai, to redirect karo
  if (isAuthenticated) {
    // Admin/Doctor ko dashboard pe bhejo
    if (user?.role === 'Admin' || user?.role === 'Doctor') {
      return <Navigate to="/dashboard" replace />;
    }
    // Patient ko home page pe bhejo
    return <Navigate to="/" replace />;
  }

  // Agar not logged in, to login/register page dikhao
  return children;
};

export default PublicRoute;