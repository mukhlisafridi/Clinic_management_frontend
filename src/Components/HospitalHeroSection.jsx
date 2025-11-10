import React from 'react';
import { Link } from 'react-router-dom';

const HospitalHeroSection = () => {
  return (
    <section className="bg-gradient-to-r from-blue-50 to-white min-h-screen flex items-center pt-28 md:pt-32 lg:pt-36">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Content */}
          <div className="space-y-6 px-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Your Health Is Our{' '}
              <span className="text-blue-600">Top Priority</span>
            </h1>
            
            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
              Experience compassionate care with our expert team of healthcare professionals dedicated to your well-being.
            </p>
            
           <Link to ="/appointment">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 mt-3 rounded-lg shadow-lg transform transition hover:scale-105 duration-200 flex items-center gap-2">
              <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
                />
              </svg>
              Get Appointment
            </button>
           
           </Link>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 md:gap-6 pt-8">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-blue-600">500+</h3>
                <p className="text-sm md:text-base text-gray-600">Expert Doctors</p>
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-blue-600">50k+</h3>
                <p className="text-sm md:text-base text-gray-600">Happy Patients</p>
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-blue-600">24/7</h3>
                <p className="text-sm md:text-base text-gray-600">Emergency Care</p>
              </div>
            </div>
          </div>

          {/* Right Side - Doctor Image */}
          <div className="relative px-4">
            <div className="relative z-10">
              <img
                src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=600&h=800&fit=crop"
                alt="Professional Doctor"
                className="rounded-2xl shadow-2xl w-full h-auto object-cover"
              />
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-6 -right-6 w-72 h-72 bg-blue-200 rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute -bottom-6 -left-6 w-72 h-72 bg-blue-400 rounded-full opacity-20 blur-3xl"></div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HospitalHeroSection;