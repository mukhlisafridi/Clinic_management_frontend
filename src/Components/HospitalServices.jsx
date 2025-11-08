import React from "react";

const HospitalServices = () => {
  return (
    <>
      <div className="bg-gray-50 py-16 px-4">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            Our Medical Services
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
            Comprehensive healthcare solutions with state-of-the-art facilities and experienced medical professionals.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-2 sm:px-6 max-w-7xl mx-auto">
          
          {/* Service 1 - Emergency Care */}
          <div className="text-center bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition duration-300 group">
            <div className="w-16 sm:w-20 h-16 sm:h-20 mx-auto mb-4 sm:mb-6 bg-red-100 rounded-full flex items-center justify-center group-hover:bg-red-200 transition">
              <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
              24/7 Emergency Care
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Round-the-clock emergency services with highly trained staff and advanced life-saving equipment.
            </p>
          </div>

          {/* Service 2 - Cardiology */}
          <div className="text-center bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition duration-300 group">
            <div className="w-16 sm:w-20 h-16 sm:h-20 mx-auto mb-4 sm:mb-6 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition">
              <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
              Cardiology Department
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Comprehensive heart care with advanced diagnostics, treatment, and cardiac rehabilitation programs.
            </p>
          </div>

          {/* Service 3 - Laboratory */}
          <div className="text-center bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition duration-300 group">
            <div className="w-16 sm:w-20 h-16 sm:h-20 mx-auto mb-4 sm:mb-6 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
              Diagnostic Laboratory
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              State-of-the-art lab with accurate testing, quick results, and comprehensive diagnostic services.
            </p>
          </div>

          {/* Service 4 - Surgery */}
          <div className="text-center bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition duration-300 group">
            <div className="w-16 sm:w-20 h-16 sm:h-20 mx-auto mb-4 sm:mb-6 bg-purple-100 rounded-full flex items-center justify-center group-hover:bg-purple-200 transition">
              <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
              Advanced Surgery
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Minimally invasive procedures with experienced surgeons and modern operation theaters.
            </p>
          </div>

          {/* Service 5 - Pediatrics */}
          <div className="text-center bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition duration-300 group">
            <div className="w-16 sm:w-20 h-16 sm:h-20 mx-auto mb-4 sm:mb-6 bg-yellow-100 rounded-full flex items-center justify-center group-hover:bg-yellow-200 transition">
              <svg className="w-10 h-10 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
              Pediatric Care
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Specialized care for children with dedicated pediatricians and child-friendly environment.
            </p>
          </div>

          {/* Service 6 - Maternity */}
          <div className="text-center bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition duration-300 group">
            <div className="w-16 sm:w-20 h-16 sm:h-20 mx-auto mb-4 sm:mb-6 bg-pink-100 rounded-full flex items-center justify-center group-hover:bg-pink-200 transition">
              <svg className="w-10 h-10 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
              Maternity & Gynecology
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Complete maternity care with prenatal, delivery, and postnatal services for mother and baby.
            </p>
          </div>

        </div>
      </div>
    </>
  );
};

export default HospitalServices;