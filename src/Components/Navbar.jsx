import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaHospital } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Home");
  const [scrolled, setScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  
  const navItems = ["Home", "Contact Us", "Appointment"];

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (item) => {
    setActiveItem(item);
    setIsOpen(false);
    
    // Navigate based on item
    if (item === "Home") {
      navigate("/");
    } else if (item === "Contact Us") {
      navigate("/contact");
    } else if (item === "Appointment") {
      if (isAuthenticated) {
        navigate("/appointment");
      } else {
        toast.error("Please login first to book an appointment!");
        navigate("/login");
      }
    }
  };

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
    setIsOpen(false);
    navigate("/");
  };

  const handleLoginClick = () => {
    setIsOpen(false);
    navigate("/login");
  };

  const handleRegisterClick = () => {
    setIsOpen(false);
    navigate("/register");
  };

  return (
    <>
      {/* Top Navbar */}
      <div 
        className={`shadow-md flex items-center justify-between px-6 md:px-10 py-3 sticky top-0 w-full z-20 transition-all duration-300 ${
          scrolled 
            ? "bg-white border-b border-gray-200" 
            : "bg-blue-600"
        }`}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 cursor-pointer">
          <FaHospital className={`text-3xl transition-colors duration-300 ${scrolled ? 'text-blue-600' : 'text-white'}`} />
          <span className={`text-xl font-bold transition-colors duration-300 ${scrolled ? 'text-gray-900' : 'text-white'}`}>
            Hospital
          </span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex space-x-8 font-semibold text-lg">
          {navItems.map((item) => (
            <li 
              key={item} 
              className="relative"
              onMouseEnter={() => setHoveredItem(item)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <button 
                className={`transition-colors duration-300 focus:outline-none px-2 py-1 ${
                  scrolled ? 'text-gray-900 hover:text-blue-600' : 'text-white hover:text-gray-100'
                }`}
                onClick={() => handleNavClick(item)}
              >
                {item}
              </button>
              {/* Underline with smooth transition */}
              <div 
                className={`absolute bottom-0 left-0 right-0 h-0.5 transition-all duration-300 ease-in-out transform origin-center ${
                  scrolled ? 'bg-blue-600' : 'bg-white'
                } ${
                  activeItem === item || hoveredItem === item
                    ? "scale-x-100 opacity-100"
                    : "scale-x-0 opacity-0"
                }`}
              ></div>
            </li>
          ))}
          
          {/* Dashboard Link for Admin/Doctor */}
          {isAuthenticated && (user?.role === "Admin" || user?.role === "Doctor") && (
            <li 
              className="relative"
              onMouseEnter={() => setHoveredItem("Dashboard")}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <button 
                className={`transition-colors duration-300 focus:outline-none px-2 py-1 ${
                  scrolled ? 'text-gray-900 hover:text-blue-600' : 'text-white hover:text-gray-100'
                }`}
                onClick={() => {
                  setActiveItem("Dashboard");
                  if (user?.role === "Doctor") {
                    navigate("/doctor/dashboard");
                  } else {
                    navigate("/dashboard");
                  }
                }}
              >
                Dashboard
              </button>
              <div 
                className={`absolute bottom-0 left-0 right-0 h-0.5 transition-all duration-300 ease-in-out transform origin-center ${
                  scrolled ? 'bg-blue-600' : 'bg-white'
                } ${
                  activeItem === "Dashboard" || hoveredItem === "Dashboard"
                    ? "scale-x-100 opacity-100"
                    : "scale-x-0 opacity-0"
                }`}
              ></div>
            </li>
          )}
        </ul>

        {/* Desktop Login/User Section */}
        <div className="hidden lg:flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <span className={`text-sm font-medium transition-colors duration-300 ${
                scrolled ? 'text-gray-900' : 'text-white'
              }`}>
                Welcome, {user?.firstName}!
              </span>
              <button 
                onClick={handleLogout}
                className="bg-red-600 text-white font-semibold px-4 py-2 rounded hover:bg-red-700 transition-colors focus:outline-none"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={handleLoginClick}
                className={`font-semibold px-4 py-2 rounded transition-colors focus:outline-none ${
                  scrolled 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-white text-blue-600 hover:bg-blue-50'
                }`}
              >
                Login
              </button>
              <button 
                onClick={handleRegisterClick}
                className={`font-semibold px-4 py-2 rounded transition-colors focus:outline-none ${
                  scrolled 
                    ? 'bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50' 
                    : 'bg-blue-800 text-white border border-white/30 hover:bg-blue-900'
                }`}
              >
                Register
              </button>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none rounded p-1"
          >
            <FaBars className={`text-2xl transition-colors duration-300 ${
              scrolled ? 'text-gray-900' : 'text-white'
            }`} />
          </button>
        </div>
      </div>

      {/* Mobile Close Button - RESPONSIVE PADDING */}
      {isOpen && (
        <button
          onClick={() => setIsOpen(false)}
          className="lg:hidden fixed top-4 right-6 sm:right-10 z-[60] focus:outline-none hover:opacity-70 transition-opacity"
        >
          <FaTimes className="text-2xl sm:text-3xl text-gray-900" />
        </button>
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ width: "250px" }}
      >
        {/* Spacing for close button */}
        <div className="h-16"></div>

        {/* User Info in Mobile */}
        {isAuthenticated && (
          <div className="px-6 pb-4 border-b border-gray-200">
            <p className="text-xs text-gray-500 mb-1">Logged in as</p>
            <p className="text-sm font-bold text-blue-900">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs text-gray-600 mt-0.5">
              Role: {user?.role}
            </p>
          </div>
        )}

        {/* Sidebar Menu Items */}
        <ul className="flex flex-col mt-8 space-y-6 px-6 font-semibold text-blue-900">
          {navItems.map((item) => (
            <li key={item} className="relative">
              <button
                className={`w-full text-left transition-colors duration-300 focus:outline-none rounded px-2 py-1 ${
                  activeItem === item ? "text-blue-600" : "text-blue-900 hover:text-blue-600"
                }`}
                onClick={() => handleNavClick(item)}
              >
                {item}
              </button>
              {/* Underline for active item in mobile */}
              <div 
                className={`absolute bottom-0 left-2 right-2 h-0.5 bg-blue-600 transition-all duration-300 ease-in-out transform origin-left ${
                  activeItem === item
                    ? "scale-x-100 opacity-100"
                    : "scale-x-0 opacity-0"
                }`}
              ></div>
            </li>
          ))}
          
          {/* Dashboard Link for Admin/Doctor in Mobile */}
          {isAuthenticated && (user?.role === "Admin" || user?.role === "Doctor") && (
            <li className="relative">
              <button
                className={`w-full text-left transition-colors duration-300 focus:outline-none rounded px-2 py-1 ${
                  activeItem === "Dashboard" ? "text-blue-600" : "text-blue-900 hover:text-blue-600"
                }`}
                onClick={() => {
                  setActiveItem("Dashboard");
                  setIsOpen(false);
                  if (user?.role === "Doctor") {
                    navigate("/doctor/dashboard");
                  } else {
                    navigate("/dashboard");
                  }
                }}
              >
                Dashboard
              </button>
              <div 
                className={`absolute bottom-0 left-2 right-2 h-0.5 bg-blue-600 transition-all duration-300 ease-in-out transform origin-left ${
                  activeItem === "Dashboard"
                    ? "scale-x-100 opacity-100"
                    : "scale-x-0 opacity-0"
                }`}
              ></div>
            </li>
          )}

          {/* Mobile Login/Logout Buttons */}
          <li className="pt-4 border-t border-gray-200">
            {isAuthenticated ? (
              <button 
                onClick={handleLogout}
                className="bg-red-600 text-white w-full py-2 rounded hover:bg-red-700 transition-colors focus:outline-none"
              >
                Logout
              </button>
            ) : (
              <>
                <button 
                  onClick={handleLoginClick}
                  className="bg-blue-600 text-white w-full py-2 rounded mb-3 hover:bg-blue-700 transition-colors focus:outline-none"
                >
                  Login
                </button>
                <button 
                  onClick={handleRegisterClick}
                  className="bg-white text-blue-600 w-full py-2 rounded border-2 border-blue-600 hover:bg-blue-50 transition-colors focus:outline-none"
                >
                  Register
                </button>
              </>
            )}
          </li>
        </ul>
      </div>

      {/* Overlay for mobile menu */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Navbar;