
import React, { useState, useEffect } from "react"; 
import { motion } from "framer-motion";
import Slider from "react-slick";
import axios from "../utils/axios";
import { User } from "lucide-react";
import toast from "react-hot-toast";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const DoctorsSection = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/user/doctors');
        
        if (response.data.success) {
          const doctorsData = response.data.doctors.map(doc => ({
            id: doc._id,
            name: `${doc.firstName} ${doc.lastName}`,
            specialization: doc.doctorDepartment || "General Medicine",
            pic: doc.docAvatar?.url || null,  
            email: doc.email
          }));
          setDoctors(doctorsData);
        }
      } catch (error) {
        console.error("Error fetching doctors:", error);
        toast.error("Failed to load doctors");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const settings = {
    dots: true,
    infinite: doctors.length > 3,
    speed: 500,
    slidesToShow: Math.min(3, doctors.length),
    slidesToScroll: 1,
    autoplay: doctors.length > 3,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: Math.min(3, doctors.length),
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(2, doctors.length),
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

  const DoctorAvatar = ({ pic, name }) => {
    if (pic) {
      return (
        <img
          src={pic}
          alt={name}
          className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full mx-auto object-cover border-4 border-blue-200"
          onError={(e) => {
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "flex";
          }}
        />
      );
    }
    
    return null;
  };

  const AvatarPlaceholder = () => (
    <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full mx-auto bg-gradient-to-br from-blue-400 to-blue-600 border-4 border-blue-200 flex items-center justify-center">
      <User className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-white" />
    </div>
  );

  if (loading) {
    return (
      <div className="relative px-4 sm:px-6 lg:px-8 py-12 md:py-16 bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading doctors...</p>
        </div>
      </div>
    );
  }

  if (doctors.length === 0) {
    return (
      <div className="relative px-4 sm:px-6 lg:px-8 py-12 md:py-16 bg-white">
        <div className="text-center">
          <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No doctors available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative px-4 sm:px-6 lg:px-8 py-12 md:py-16 bg-white">
      {/* Heading */}
      <div className="text-center mb-10 md:mb-12 max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
          Meet Our Expert Doctors
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-gray-600">
          {doctors.length} highly qualified medical professionals dedicated to your health and well-being
        </p>
      </div>

      <div className="max-w-7xl mx-auto">
        <Slider {...settings}>
          {doctors.map((doctor) => (
            <motion.div
              key={doctor.id}
              className="px-2 sm:px-3 md:px-4 py-4 md:py-6"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-gradient-to-br from-blue-50 to-white p-5 md:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center border border-blue-100">
                <div className="relative inline-block mb-4">
                  <DoctorAvatar pic={doctor.pic} name={doctor.name} />
                  <div style={{ display: doctor.pic ? "none" : "flex" }}>
                    <AvatarPlaceholder />
                  </div>
                  <div className="absolute bottom-0 right-0 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-green-500 rounded-full border-2 sm:border-4 border-white"></div>
                </div>
                
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{doctor.name}</h3>
                <p className="text-sm sm:text-base text-blue-600 font-semibold mb-1">{doctor.specialization}</p>
                <p className="text-xs sm:text-sm text-gray-500 mb-4">{doctor.email}</p>
                
                <button 
                  onClick={() => window.location.href = '/appointment'}
                  className="mt-2 md:mt-4 bg-blue-600 hover:bg-blue-700 text-white px-5 md:px-6 py-2 rounded-lg transition-all duration-300 text-xs sm:text-sm font-semibold"
                >
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