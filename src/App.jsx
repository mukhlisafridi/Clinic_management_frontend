
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './Components/ProtectedRoute';
import PublicRoute from './Components/PublicRoute';  

// Import pages
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterForm from './pages/RegisterForm';
import Appoinment from './pages/Appoinment';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Route - Anyone can access */}
          <Route path="/" element={<Home />} />
          
          {/* Login/Register - Only for non-logged-in users */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <RegisterForm />
              </PublicRoute>
            }
          />

          {/* Protected Routes - Patient Only */}
          <Route
            path="/appointment"
            element={
              <ProtectedRoute allowedRoles={['Patient']}>
                <Appoinment />
              </ProtectedRoute>
            }
          />

          {/* Protected Routes - Admin/Doctor Only */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={['Admin', 'Doctor']}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;