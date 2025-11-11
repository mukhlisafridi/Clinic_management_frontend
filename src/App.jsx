
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
import DoctorDashboard from './pages/DoctorsDashboard';
import ContactUs from './pages/ContactUs';  
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<ContactUs />} />  {/* ✅ Add Route */}
          
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

          {/* Protected Routes - Patient */}
          <Route
            path="/appointment"
            element={
              <ProtectedRoute allowedRoles={['Patient']}>
                <Appoinment />
              </ProtectedRoute>
            }
          />

          {/* Protected Routes - Admin */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={['Admin']}>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Protected Routes - Doctor */}
          <Route
            path="/doctor/dashboard"
            element={
              <ProtectedRoute allowedRoles={['Doctor']}>
                <DoctorDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;