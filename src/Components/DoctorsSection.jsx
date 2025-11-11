import React, { useState } from "react"; 
import { motion } from "framer-motion";
import Slider from "react-slick";

// Import slick-carousel styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const DoctorsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const doctors = [
    {
      pic: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop",
      name: "Dr. Michael Anderson",
      specialization: "Cardiologist",
      experience: "15 Years Experience",
    },
    {
      pic: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=300&h=300&fit=crop",
      name: "Dr. Sarah Johnson",
      specialization: "Pediatrician",
      experience: "12 Years Experience",
    },
    {
      pic: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop",
      name: "Dr. James Williams",
      specialization: "Orthopedic Surgeon",
      experience: "18 Years Experience",
    },
    {
      pic: "https://images.unsplash.com/photo-1638202993928-7267aad84c31?w=300&h=300&fit=crop",
      name: "Dr. Emily Parker",
      specialization: "Gynecologist",
      experience: "10 Years Experience",
    },
    {
      pic: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&h=300&fit=crop",
      name: "Dr. David Chen",
      specialization: "General Physician",
      experience: "20 Years Experience",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="relative px-4 sm:px-6 lg:px-8 py-12 md:py-16 bg-white">
      {/* Heading and Paragraph */}
      <div className="text-center mb-10 md:mb-12 max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
          Meet Our Expert Doctors
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-gray-600">
          Highly qualified medical professionals dedicated to your health and well-being
        </p>
      </div>

      <div className="max-w-7xl mx-auto">
        <Slider {...settings}>
          {doctors.map((doctor, index) => (
            <motion.div
              key={index}
              className="px-2 sm:px-3 md:px-4 py-4 md:py-6"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-gradient-to-br from-blue-50 to-white p-5 md:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center border border-blue-100">
                <div className="relative inline-block mb-4">
                  <img
                    src={doctor.pic}
                    alt={doctor.name}
                    className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full mx-auto object-cover border-4 border-blue-200"
                  />
                  <div className="absolute bottom-0 right-0 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-green-500 rounded-full border-2 sm:border-4 border-white"></div>
                </div>
                
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{doctor.name}</h3>
                <p className="text-sm sm:text-base text-blue-600 font-semibold mb-1">{doctor.specialization}</p>
                <p className="text-xs sm:text-sm text-gray-500 mb-4">{doctor.experience}</p>
                
                <button className="mt-2 md:mt-4 bg-blue-600 hover:bg-blue-700 text-white px-5 md:px-6 py-2 rounded-lg transition-all duration-300 text-xs sm:text-sm font-semibold">
                  Book Appointment
                </button>
              </div>
            </motion.div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default DoctorsSection;
