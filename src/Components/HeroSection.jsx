import React from "react";

const HeroSection = () => {
  return (
    <>
      <div className="flex justify-center items-center py-16 px-8">
        <div className="text-center max-w-4xl">
          {/* Heading */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-gray-800 mb-4">
            Search Engine Optimization & Marketing
          </h1>
          {/* Description */}
          <p className="text-lg text-gray-600 mb-8 ">
            Simple is a simple template with a creative design that solves all
            your marketing and SEO queries.
          </p>
          {/* Buttons Section */}
          <div className="flex justify-center space-x-6">
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
  <button className="bg-[#ffd0bf] text-[#fda281] border border-[#ff8a5f] py-2 px-4 sm:px-6 text-sm sm:text-base rounded-lg hover:bg-white hover:text-[#ff8a5f] hover:border-[#ff8a5f] transition duration-300">
    Get Started
  </button>

  <button className="bg-[#acffec] text-[#69d3ba] border border-[#69d3ba] py-2 px-4 sm:px-6 text-sm sm:text-base rounded-lg hover:bg-white hover:text-[#5ac5ac] hover:border-[#5ac5ac] transition duration-300">
    Learn More
  </button>
</div>

          </div>
        </div>
      </div>

      {/* Image Section */}
      <div className="flex justify-center py-5 px-8 -mt-16">
        <div className="w-full max-w-screen-md">
          <img
            src="https://themewagon.github.io/simple/images/Group171.svg"
            alt="Marketing and SEO Image"
            className="w-[500px] h-auto mx-auto"
          />
        </div>
      </div>
    </>
  );
};

export default HeroSection;
