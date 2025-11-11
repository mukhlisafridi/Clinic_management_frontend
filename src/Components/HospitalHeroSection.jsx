import React from 'react';
import { Link } from 'react-router-dom';

const HospitalHeroSection = () => {
  return (
    <section className="bg-gradient-to-r from-blue-50 to-white min-h-screen flex items-center pt-8 md:pt-10">
      <div className="container mx-auto px-4 md:px-6 py-6 md:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Left Side - Content */}
          <div className="space-y-4 md:space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Your Health Is Our{' '}
              <span className="text-blue-600">Top Priority</span>
            </h1>
            
            <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
              Experience compassionate care with our expert team of healthcare professionals dedicated to your well-being.
            </p>
            
            <Link to="/appointment">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 md:px-8 py-3 md:py-4 mt-2 md:mt-3 rounded-lg shadow-lg transform transition hover:scale-105 duration-200 flex items-center gap-2 text-sm md:text-base">
                <svg 
                  className="w-4 h-4 md:w-5 md:h-5" 
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
            <div className="grid grid-cols-3 gap-3 md:gap-6 pt-4 md:pt-6">
              <div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-600">500+</h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-600">Expert Doctors</p>
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-600">50k+</h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-600">Happy Patients</p>
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-600">24/7</h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-600">Emergency Care</p>
              </div>
            </div>
          </div>

          {/* Right Side - Doctor Image */}
          <div className="relative mt-6 lg:mt-0">
            <div className="relative z-10">
              <img
                src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=600&h=800&fit=crop"
                alt="Professional Doctor"
                className="rounded-2xl shadow-2xl w-full object-cover max-h-[450px] sm:max-h-[500px] md:max-h-[550px] lg:max-h-[600px]"
                style={{ objectPosition: 'center top' }}
              />
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 md:-top-6 md:-right-6 w-48 h-48 md:w-72 md:h-72 bg-blue-200 rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 w-48 h-48 md:w-72 md:h-72 bg-blue-400 rounded-full opacity-20 blur-3xl"></div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HospitalHeroSection;