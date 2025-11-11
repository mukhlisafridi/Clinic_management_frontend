import React, { useEffect, useState } from "react";

const DoctorExpertiseSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("doctorSection");
      if (section) {
        const rect = section.getBoundingClientRect();
        setIsVisible(rect.top < window.innerHeight - 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div id="doctorSection" className="px-4 sm:px-6 md:px-12 lg:px-24 py-12 md:py-16 lg:min-h-screen flex flex-col justify-center items-center bg-gray-50">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12 items-center max-w-7xl w-full">
        
        {/* Text Content - Order 1 on mobile, Order 2 on desktop */}
        <div className={`order-1 lg:order-2 transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-gray-900">
            Expert Medical Team <span className="text-blue-600 block">Dedicated to Your Health</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg mb-4 md:mb-6 text-gray-600 leading-relaxed">
            Our team of highly qualified doctors brings years of experience and specialized expertise across multiple medical disciplines. We are committed to providing exceptional care tailored to your individual needs.
          </p>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed mb-6">
            With continuous training and the latest medical advancements, our specialists ensure you receive world-class treatment in a compassionate environment.
          </p>
          
          {/* Features List */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-sm sm:text-base text-gray-700">Experienced Medical Professionals</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-sm sm:text-base text-gray-700">Advanced Medical Equipment</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-sm sm:text-base text-gray-700">Patient-Centered Approach</span>
            </div>
          </div>
          
          <button className="bg-blue-600 text-white py-2.5 md:py-3 px-6 md:px-8 mt-6 text-sm sm:text-base md:text-lg font-semibold hover:bg-white hover:text-blue-600 border-2 border-blue-600 transition-all duration-300 rounded-lg shadow-md hover:shadow-lg">
            Meet Our Doctors
          </button>
        </div>

        {/* Image Content - Order 2 on mobile, Order 1 on desktop */}
        <div className={`order-2 lg:order-1 mt-8 lg:mt-0 transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&h=700&fit=crop"
              alt="Expert Doctors"
              className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto rounded-2xl shadow-2xl"
            />
            {/* Decorative Elements */}
            <div className="absolute -bottom-4 -left-4 w-24 sm:w-32 h-24 sm:h-32 bg-blue-200 rounded-full opacity-30 blur-2xl -z-10"></div>
            <div className="absolute -top-4 -right-4 w-24 sm:w-32 h-24 sm:h-32 bg-blue-400 rounded-full opacity-20 blur-2xl -z-10"></div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DoctorExpertiseSection;
