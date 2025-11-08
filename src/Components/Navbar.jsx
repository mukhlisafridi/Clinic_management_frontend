import React, { useState, useEffect } from "react";
import { FaBars, FaTimes, FaHospital } from "react-icons/fa";

const Navbar = () => {
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
  };

  return (
    <>
      {/* Top Navbar */}
      <div 
        className={`text-white shadow-md flex items-center justify-between px-6 md:px-10 py-3 fixed w-full z-20 transition-all duration-300 ${
          scrolled 
            ? "bg-white/10 backdrop-blur-lg border-b border-white/20" 
            : "bg-blue-600"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-2">
          <FaHospital className="text-3xl text-white" />
          <span className="text-xl font-bold">Hospital</span>
        </div>

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
                className="text-white transition-colors duration-300 focus:outline-none px-2 py-1"
                onClick={() => handleNavClick(item)}
              >
                {item}
              </button>
              {/* Underline with smooth transition */}
              <div 
                className={`absolute bottom-0 left-0 right-0 h-0.5 bg-white transition-all duration-300 ease-in-out transform origin-center ${
                  activeItem === item || hoveredItem === item
                    ? "scale-x-100 opacity-100"
                    : "scale-x-0 opacity-0"
                }`}
              ></div>
            </li>
          ))}
        </ul>

        {/* Desktop Login Button */}
        <div className="hidden lg:flex">
          <button className="bg-white text-blue-600 font-semibold px-4 py-2 rounded hover:bg-blue-50 transition-colors focus:outline-none">
            Login
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className="lg:hidden flex items-center pr-4 z-40 relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none rounded p-1"
          >
            {isOpen ? (
              <FaTimes className="text-2xl text-white" />
            ) : (
              <FaBars className="text-2xl text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-lg transform transition-transform duration-300 z-30 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ width: "250px" }}
      >
        {/* Sidebar Close Button */}
        <div className="flex justify-end p-4">
          <button
            onClick={() => setIsOpen(false)}
            className="focus:outline-none rounded p-1"
          >
            <FaTimes className="text-2xl text-blue-800" />
          </button>
        </div>

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
              {/* Underline for active item in mobile with smooth transition */}
              <div 
                className={`absolute bottom-0 left-2 right-2 h-0.5 bg-blue-600 transition-all duration-300 ease-in-out transform origin-left ${
                  activeItem === item
                    ? "scale-x-100 opacity-100"
                    : "scale-x-0 opacity-0"
                }`}
              ></div>
            </li>
          ))}
          <li>
            <button className="bg-blue-600 text-white w-full py-2 rounded mt-4 hover:bg-blue-700 transition-colors focus:outline-none">
              Login
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;