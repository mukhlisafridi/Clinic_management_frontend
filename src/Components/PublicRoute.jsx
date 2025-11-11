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
    // Admin ko dashboard pe bhejo
    if (user?.role === 'Admin') {
      return <Navigate to="/dashboard" replace />;
    }
    // ✅ Doctor ko doctor dashboard pe bhejo
    if (user?.role === 'Doctor') {
      return <Navigate to="/doctor/dashboard" replace />;
    }
    // Patient ko home bhejo
    return <Navigate to="/" replace />;
  }

  // Not logged in, show login/register page
  return children;
};

export default PublicRoute;
