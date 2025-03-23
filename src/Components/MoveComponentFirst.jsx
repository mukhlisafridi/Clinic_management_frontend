import React, { useEffect, useState } from "react";

const MoveComponentFirst = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("firstSection");
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
    <div id="firstSection" className="px-4 sm:px-6 md:px-12 lg:px-24 min-h-screen flex flex-col justify-center items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Text Content */}
        <div className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6">
            We Offer a Full Range <span className="block">of Digital Marketing Services!</span>
          </h2>
          <p className="text-base sm:text-lg mb-4 md:mb-6">
            Lorem ipsum dolor sit amet, tincidunt vestibulum. Fusce egeabus consectetuer turpis, suspendisse.
          </p>
          <p className="text-base sm:text-lg">
            Lorem ipsum dolor sit amet, tincidunt vestibulum. Fusce egeabus consectetu.
          </p>
        </div>

        {/* Image Content */}
        <div className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
          <img
            src="https://themewagon.github.io/simple/images/Group1.png"
            alt="Digital Marketing"
            className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default MoveComponentFirst;
