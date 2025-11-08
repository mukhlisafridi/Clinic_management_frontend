import React from "react";
import { CiFacebook, CiTwitter } from "react-icons/ci";
import { IoLogoInstagram } from "react-icons/io";
import { FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <footer className="bg-blue-50 p-8 sm:p-12 lg:p-20 text-gray-800">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center sm:text-left">
          
          {/* Hospital Info */}
          <div>
            <h2 className="text-2xl font-bold text-blue-600 mb-3">HealthCare+</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Providing quality healthcare services with compassion and excellence.
            </p>
            <p className="text-gray-800 font-semibold">24/7 Emergency</p>
            <p className="text-blue-600 font-bold text-lg">+92 321 9876543</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-700 hover:text-blue-600 transition">About Us</a></li>
              <li><a href="#" className="text-gray-700 hover:text-blue-600 transition">Our Services</a></li>
              <li><a href="#" className="text-gray-700 hover:text-blue-600 transition">Departments</a></li>
              <li><a href="#" className="text-gray-700 hover:text-blue-600 transition">Book Appointment</a></li>
              <li><a href="#" className="text-gray-700 hover:text-blue-600 transition">Contact Us</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-700 hover:text-blue-600 transition">Emergency Care</a></li>
              <li><a href="#" className="text-gray-700 hover:text-blue-600 transition">Cardiology</a></li>
              <li><a href="#" className="text-gray-700 hover:text-blue-600 transition">Pediatrics</a></li>
              <li><a href="#" className="text-gray-700 hover:text-blue-600 transition">Laboratory</a></li>
              <li><a href="#" className="text-gray-700 hover:text-blue-600 transition">Surgery</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Newsletter</h3>
            <p className="text-gray-700 mb-4">
              Subscribe for health tips and updates.
            </p>
            <form className="mt-4">
              <input
                type="email"
                placeholder="your.email@example.com"
                className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 bg-white outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="w-full mt-3 py-3 bg-blue-600 text-white font-semibold rounded-lg transition duration-300 hover:bg-blue-700">
                Subscribe
              </button>
            </form>
            
            {/* Social Media */}
            <div className="mt-6">
              <p className="text-gray-800 font-semibold mb-3">Follow Us</p>
              <div className="flex justify-center sm:justify-start gap-3 text-2xl">
                <a href="#" className="text-gray-700 hover:text-blue-600 transition">
                  <CiFacebook />
                </a>
                <a href="#" className="text-gray-700 hover:text-blue-400 transition">
                  <CiTwitter />
                </a>
                <a href="#" className="text-gray-700 hover:text-pink-500 transition">
                  <IoLogoInstagram />
                </a>
                <a href="#" className="text-gray-700 hover:text-blue-700 transition">
                  <FaLinkedinIn />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-12 pt-8 border-t border-gray-300 text-center">
          <p className="text-gray-700"> 123 Medical Center Street, Karachi, Pakistan</p>
          <p className="text-gray-700 mt-2">info@hospital.com |  +92 300 1234567</p>
        </div>
      </footer>

      {/* Copyright Section */}
      <div className="bg-white text-center py-6 text-gray-700 border-t border-gray-200">
        <p>Copyright © {new Date().getFullYear()} HealthCare+ Hospital. All rights reserved | Developed by Mukhlis Afridi</p>
      </div>
    </>
  );
};

export default Footer;