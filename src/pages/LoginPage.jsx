import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast, Toaster } from 'react-hot-toast';
import basURL from '../utils/axios.js';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Patient');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await basURL.post(
        '/user/login',
        { email, password, role }
      );

      const userData = response.data.user;
      login(userData);
      
      toast.success('Login successful!');
      
      if (userData.role === 'Admin') {
        navigate('/dashboard');
      } else if (userData.role === 'Doctor') {
        navigate('/doctor/dashboard');
      } else {
        navigate('/');
      }
      
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-blue-50 h-screen flex items-center justify-center overflow-hidden">
      <Toaster position="top-right" reverseOrder={false} />
      
      <div className="max-w-5xl w-full mx-4 bg-white rounded-xl shadow-2xl overflow-hidden flex max-h-[95vh]">
        
        {/* Left Side - Login Form */}
        <div className="w-full lg:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-blue-900 mb-2">
              Welcome Back!
            </h2>
            <p className="text-sm text-blue-700">
              Login to access your healthcare dashboard
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <style>{`
              input:-webkit-autofill,
              input:-webkit-autofill:hover,
              input:-webkit-autofill:focus,
              input:-webkit-autofill:active {
                -webkit-box-shadow: 0 0 0 30px white inset !important;
                -webkit-text-fill-color: #1e3a8a !important;
                transition: background-color 5000s ease-in-out 0s;
              }
            `}</style>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-blue-900 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  autoComplete="off"
                  className="w-full pl-10 pr-4 py-2.5 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-blue-900 bg-white disabled:bg-gray-50"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-semibold text-blue-900 mb-1.5">
                Login As
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <select
                  id="role"
                  name="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                  disabled={loading}
                  className="w-full pl-10 pr-4 py-2.5 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-blue-900 bg-white appearance-none cursor-pointer disabled:bg-gray-50"
                  style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%232563eb'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 0.75rem center", backgroundSize: "1.25em 1.25em" }}
                >
                  <option value="Patient">Patient</option>
                  <option value="Doctor">Doctor</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-blue-900 mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                  autoComplete="off"
                  className="w-full pl-10 pr-12 py-2.5 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-blue-900 bg-white disabled:bg-gray-50"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500 hover:text-blue-700 disabled:opacity-50 transition"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <a href="#" className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transform transition hover:scale-[1.02] duration-200 flex items-center justify-center gap-2 disabled:bg-blue-400 disabled:cursor-not-allowed disabled:transform-none mt-6"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging in...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  Login to Account
                </>
              )}
            </button>

            <div className="text-center pt-4">
              <p className="text-sm text-blue-800">
                Don't have an account?{' '}
                <Link to="/register" className="text-blue-600 hover:text-blue-800 hover:underline font-semibold transition">
                  Register here
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* Right Side - Hospital/Doctor Image */}
        <div className="hidden lg:block lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-blue-500 to-blue-700">
          <div className="absolute inset-0 bg-black/10"></div>
          <img
            src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&h=1000&fit=crop"
            alt="Professional Doctor"
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/60 to-transparent">
            <h3 className="text-2xl font-bold text-white mb-2">
              Your Health, Our Priority
            </h3>
            <p className="text-blue-100 text-sm">
              Access world-class healthcare services 24/7
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;