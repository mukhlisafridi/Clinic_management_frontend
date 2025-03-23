import React, { useEffect, useState } from "react";

const MoveComponentSecond = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("secondSection");
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
    <div id="secondSection" className="px-6 lg:px-28 min-h-screen flex flex-col justify-center items-center">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Image Content */}
        <div className={`  transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
          <img
            src="https://themewagon.github.io/simple/images/Group2.png"
            alt="Digital Marketing"
            className="w-full max-w-sm lg:max-w-md mx-auto"
          />
        </div>

        {/* Text Content */}
        <div className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
          <h2 className="text-3xl font-bold mb-6  ">
            Leading Digital Agency <span className="block">for Business Solution.</span>
          </h2>
          <p className="text-lg mb-6">
            Power-packed with impressive features and well-optimized, this template is designed to provide the best performance in all circumstances.
          </p>
          <p className="text-lg">
            Its smart features make it a powerful stand-alone website building tool.
          </p>
          <button className="bg-sky-500 text-white py-2 px-6 mt-5 text-lg font-semibold hover:bg-white hover:text-sky-500 border border-sky-500 transition-all duration-300">
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

export default MoveComponentSecond;
