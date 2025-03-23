import React from "react";

const ContactUs = () => {
  return (
    <div className="relative h-[50vh] sm:h-[60vh] bg-cover bg-center bg-no-repeat m-4 sm:m-12 lg:m-24 flex items-center justify-center" 
         style={{ backgroundImage: "url('/gdpr.jpg')" }}>
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-0"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-black px-4 sm:px-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
          Do you have any projects? 
          <span className="block">Contact us</span>
        </h1>
        
        <button className="mt-6 px-6 py-2 text-lg font-semibold bg-white text-red-600 border-2 border-red-600 rounded-3xl transition duration-300 ease-in-out hover:bg-red-600 hover:text-white">
          Contact Us
        </button>
      </div>
    </div>
  );
};

export default ContactUs;
