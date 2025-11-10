import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './Components/ProtectedRoute';


// Import with CORRECT file names
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterForm from './pages/RegisterForm';
import Appoinment from './pages/Appoinment';
import Dashboard from './pages/Dashboard';  // ✅ Correct spelling now

function App() {
  return (
    <AuthProvider>
      <Router>
       
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterForm />} />

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

export default App