import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './Components/ProtectedRoute';
import PublicRoute from './Components/PublicRoute';
import Navbar from './Components/Navbar';

import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterForm from './pages/RegisterForm';
import Appoinment from './pages/Appoinment';
import Dashboard from './pages/Dashboard';
import DoctorDashboard from './pages/DoctorsDashboard';
import ContactUs from './pages/ContactUs';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="overflow-x-hidden">
          {/* ✅ Navbar INSIDE Router - har page pe show hoga */}
          <Navbar />
          
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<ContactUs />} />
            
            {/* Login/Register */}
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

            {/* Protected - Patient */}
            <Route
              path="/appointment"
              element={
                <ProtectedRoute allowedRoles={['Patient']}>
                  <Appoinment />
                </ProtectedRoute>
              }
            />

            {/* Protected - Admin */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute allowedRoles={['Admin']}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* Protected - Doctor */}
            <Route
              path="/doctor/dashboard"
              element={
                <ProtectedRoute allowedRoles={['Doctor']}>
                  <DoctorDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;