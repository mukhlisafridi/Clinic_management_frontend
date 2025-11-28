import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "../utils/axios";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "../Components/Navbar"; 

const PatientRegisterForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    nic: "",
    dob: "",
    gender: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post("/user/patient/register", formData);

      if (response.data.success) {
        toast.success(response.data.message || "Registration successful!");
        
        login(response.data.user, response.data.token);

        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          nic: "",
          dob: "",
          gender: "",
          password: ""
        });

        setTimeout(() => {
          navigate("/appointment");
        }, 1000);
      }
    } catch (error) {
      console.error("Registration Error:", error);
      
      if (error.response) {
        toast.error(error.response.data.message || "Registration failed!");
      } else if (error.request) {
        toast.error("Server not responding. Please try again later.");
      } else {
        toast.error("An error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />  {/* Add Navbar */}
      
      {/* Added py-20 for top/bottom padding */}
      <div className="bg-gradient-to-br from-blue-50 via-white to-blue-50 min-h-screen flex items-center justify-center py-20 px-4">
        <Toaster position="top-right" reverseOrder={false} />
        
        <div className="max-w-6xl w-full mx-4 bg-white rounded-xl shadow-2xl overflow-hidden flex">
          
          {/* Left Side - Hospital Image */}
          <div className="hidden lg:block lg:w-2/5 relative overflow-hidden bg-gradient-to-br from-blue-600 to-blue-800">
            <div className="absolute inset-0 bg-black/10"></div>
            <img
              src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&h=900&fit=crop"
              alt="Hospital Healthcare"
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Join Our Healthcare Family
                </h3>
                <p className="text-blue-50 text-sm mb-4">
                  Register now to access world-class medical services
                </p>
                <div className="space-y-2 text-left">
                  <div className="flex items-center gap-2 text-white">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">24/7 Medical Support</span>
                  </div>
                  <div className="flex items-center gap-2 text-white">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">Expert Doctors</span>
                  </div>
                  <div className="flex items-center gap-2 text-white">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">Easy Appointments</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Registration Form */}
          <div className="w-full lg:w-3/5 p-6 md:p-8">
            {/* Header */}
            <div className="mb-5">
              <h2 className="text-xl md:text-2xl font-bold text-blue-900 mb-2">
                Patient <span className="text-blue-600">Registration</span>
              </h2>
              <p className="text-sm text-blue-700">
                Create your account to access our healthcare services
              </p>
            </div>

            {/*  Better spacing + padding bottom */}
            <form onSubmit={handleSubmit} className="space-y-4 pb-8">
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
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* First Name */}
                <div>
                  <label htmlFor="firstName" className="block text-sm font-semibold text-blue-900 mb-1.5">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    minLength={3}
                    autoComplete="off"
                    disabled={isLoading}
                    className="w-full px-3 py-2.5 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-blue-900 bg-white disabled:bg-gray-100"
                    placeholder="First name"
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label htmlFor="lastName" className="block text-sm font-semibold text-blue-900 mb-1.5">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    minLength={3}
                    autoComplete="off"
                    disabled={isLoading}
                    className="w-full px-3 py-2.5 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-blue-900 bg-white disabled:bg-gray-100"
                    placeholder="Last name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-blue-900 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    autoComplete="off"
                    disabled={isLoading}
                    className="w-full px-3 py-2.5 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-blue-900 bg-white disabled:bg-gray-100"
                    placeholder="email@example.com"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-blue-900 mb-1.5">
                    Phone Number * (11 digits)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    minLength={11}
                    maxLength={11}
                    autoComplete="off"
                    disabled={isLoading}
                    className="w-full px-3 py-2.5 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-blue-900 bg-white disabled:bg-gray-100"
                    placeholder="03001234567"
                  />
                </div>

                {/* NIC */}
                <div>
                  <label htmlFor="nic" className="block text-sm font-semibold text-blue-900 mb-1.5">
                    NIC Number * (13 digits)
                  </label>
                  <input
                    type="text"
                    id="nic"
                    name="nic"
                    value={formData.nic}
                    onChange={handleChange}
                    required
                    minLength={13}
                    maxLength={13}
                    autoComplete="off"
                    disabled={isLoading}
                    className="w-full px-3 py-2.5 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-blue-900 bg-white disabled:bg-gray-100"
                    placeholder="4220112345678"
                  />
                </div>

                {/* Date of Birth */}
                <div>
                  <label htmlFor="dob" className="block text-sm font-semibold text-blue-900 mb-1.5">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    id="dob"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                    autoComplete="off"
                    disabled={isLoading}
                    className="w-full px-3 py-2.5 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-blue-900 bg-white disabled:bg-gray-100"
                  />
                </div>

                {/* Gender */}
                <div>
                  <label htmlFor="gender" className="block text-sm font-semibold text-blue-900 mb-1.5">
                    Gender *
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                    autoComplete="off"
                    disabled={isLoading}
                    className="w-full px-3 py-2.5 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white text-blue-900 appearance-none cursor-pointer disabled:bg-gray-100"
                    style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%232563eb'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 0.75rem center", backgroundSize: "1.25em 1.25em" }}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="password" className="block text-sm font-semibold text-blue-900 mb-1.5">
                    Password * (Min 8 characters)
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      minLength={8}
                      autoComplete="new-password"
                      disabled={isLoading}
                      className="w-full px-3 py-2.5 pr-10 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-blue-900 bg-white disabled:bg-gray-100"
                      placeholder="Enter password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500 hover:text-blue-700 disabled:opacity-50"
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

              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 px-6 rounded-lg shadow-lg transform transition hover:scale-[1.02] duration-200 flex items-center justify-center gap-2 disabled:bg-blue-400 disabled:cursor-not-allowed disabled:transform-none mt-6"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Registering...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                    Register Now
                  </>
                )}
              </button>

              {/* Login Link */}
              <div className="text-center pt-4">
                <p className="text-sm text-blue-800">
                  Already have an account?{' '}
                  <Link to="/login" className="text-blue-600 hover:text-blue-800 hover:underline font-semibold transition">
                    Login here
                  </Link>
                </p>
              </div>
            </form>
          </div>

        </div>
      </div>
    </>
  );
};

export default PatientRegisterForm;