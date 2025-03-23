import React from "react";

const Feature = () => {
  return (
    <>
      <div className="text-center py-16 px-4">
        {/* Section Heading */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
          How does it work
        </h1>
        <p className="text-base sm:text-lg text-gray-600 mb-10 max-w-3xl mx-auto">
          One theme that serves as an easy-to-use operational toolkit that meets
          customer's needs.
        </p>

        {/* Feature Items Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-2 sm:px-6">
          {/* Feature 1 */}
          <div className="text-center bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition duration-300">
            <img
              src="https://themewagon.github.io/simple/images/Group12.svg"
              alt="Speed Optimisation"
              className="w-16 sm:w-20 h-16 sm:h-20 mx-auto mb-4 sm:mb-6"
            />
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
              Speed Optimisation
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Lorem ipsum dolor sit amet, tincidunt vestibulum. Fusce egeabus
              consectetuer turpis, suspendisse.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="text-center bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition duration-300">
            <img
              src="https://themewagon.github.io/simple/images/Group7.svg"
              alt="SEO and Backlinks"
              className="w-16 sm:w-20 h-16 sm:h-20 mx-auto mb-4 sm:mb-6"
            />
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
              SEO and Backlinks
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Lorem ipsum dolor sit amet, tincidunt vestibulum. Fusce egeabus
              consectetuer turpis, suspendisse.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="text-center bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition duration-300">
            <img
              src="https://themewagon.github.io/simple/images/Group5.svg"
              alt="Content Marketing"
              className="w-16 sm:w-20 h-16 sm:h-20 mx-auto mb-4 sm:mb-6"
            />
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
              Content Marketing
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Lorem ipsum dolor sit amet, tincidunt vestibulum. Fusce egeabus
              consectetuer turpis, suspendisse.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Feature;
