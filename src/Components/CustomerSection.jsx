import React, { useState } from "react"; 
import { motion } from "framer-motion";
import Slider from "react-slick"; // Import react-slick for the slider functionality

// Import slick-carousel styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CustomerSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const users = [
    {
      pic: "https://themewagon.github.io/simple/images/face2.jpg",
      name: "Tony Martinez",
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia minus ipsa numquam.",
      company: "Marketing manager",
    },
    {
      pic: "https://themewagon.github.io/simple/images/face3.jpg",
      name: "Jane Smith",
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia minus ipsa numquam.",
      company: "Innovate Ltd.",
    },
    {
      pic: "	https://themewagon.github.io/simple/images/face20.jpg",
      name: "Cody Lambert",
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia minus ipsa numquam.",
      company: "Marketing manager",
    },
    {
      pic: "https://themewagon.github.io/simple/images/face1.jpg",
      name: "Tony Martinez",
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia minus ipsa numquam.",
      company: "software engineer.",
    },
    {
      pic: "https://themewagon.github.io/simple/images/face15.jpg",
      name: "Michael Brown",
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia minus ipsa numquam.",
      company: "TechWorks",
    },
  ];

  const settings = {
    dots: true, // Enable navigation dots
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024, // Medium screens
        settings: {
          slidesToShow: 2, // 2 users on medium screens
        },
      },
      {
        breakpoint: 640, // Small screens
        settings: {
          slidesToShow: 1, // 1 user on small screens
        },
      },
      {
        breakpoint: 1280, // Large screens
        settings: {
          slidesToShow: 3, // 3 users on large screens
        },
      },
    ],
  };

  return (
    <div className="relative px-4 lg:px-6">
      {/* Heading and Paragraph */}
      <div className="text-center my-10">
        <h2 className="text-3xl font-bold">What our customers have to say</h2>
        <p className="text-lg text-gray-600 mt-4">Lorem ipsum dolor sit amet, tincidunt vestibulum.</p>
      </div>

      <Slider {...settings}>
        {users.map((user, index) => (
          <motion.div
            key={index}
            className="px-4 py-6 w-4/12 sm:w-5/12 lg:w-1/4" // Smaller width for the cards
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-gray-100 p-4 rounded-lg shadow-lg text-center"> {/* Reduced padding inside the card */}
              <img
                src={user.pic}
                alt="User"
                className="w-28 h-28 rounded-full mx-auto mb-4" // Reduced image size
              />
              <h3 className="text-xl font-semibold">{user.name}</h3>
              <p className="text-gray-600">{user.title}</p>
              <p className="text-gray-500">{user.company}</p>
            </div>
          </motion.div>
        ))}
      </Slider>
    </div>
  );
};

export default CustomerSection;
