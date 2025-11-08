
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
    <div id="doctorSection" className="px-6 lg:px-28 min-h-screen flex flex-col justify-center items-center bg-gray-50 pt-16 md:pt-20 lg:pt-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        
        {/* Text Content - Order 1 on mobile, Order 2 on desktop */}
        <div className={`order-1 lg:order-2 transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            Expert Medical Team <span className="text-blue-600 block">Dedicated to Your Health</span>
          </h2>
          <p className="text-base md:text-lg mb-6 text-gray-600 leading-relaxed">
            Our team of highly qualified doctors brings years of experience and specialized expertise across multiple medical disciplines. We are committed to providing exceptional care tailored to your individual needs.
          </p>
          <p className="text-base md:text-lg text-gray-600 leading-relaxed">
            With continuous training and the latest medical advancements, our specialists ensure you receive world-class treatment in a compassionate environment.
          </p>
          
          <button className="bg-blue-600 text-white py-3 px-8 mt-6 text-base md:text-lg font-semibold hover:bg-white hover:text-blue-600 border-2 border-blue-600 transition-all duration-300 rounded-lg shadow-md hover:shadow-lg">
            Meet Our Doctors
          </button>
        </div>

        {/* Image Content - Order 2 on mobile, Order 1 on desktop */}
        <div className={`order-2 lg:order-1 transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&h=700&fit=crop"
              alt="Expert Doctors"
              className="w-full max-w-sm lg:max-w-md mx-auto rounded-2xl shadow-2xl"
            />
            {/* Decorative Elements */}
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-200 rounded-full opacity-30 blur-2xl -z-10"></div>
            <div className="absolute -top-4 -right-4 w-32 h-32 bg-blue-400 rounded-full opacity-20 blur-2xl -z-10"></div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DoctorExpertiseSection;