import React from "react";

const StudySection = () => {
  return (
    <>
      {/* Center Heading */}
      <div className="flex justify-center items-center flex-col my-8  px-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Our Case Studies
        </h1>
        <p className="text-center text-lg text-gray-600 mb-8 max-w-2xl">
          Lorem ipsum dolor sit amet, tincidunt vestibulum. Fusce egeabus consectetuer turpis, suspendisse.
        </p>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-6">
        {/* Card 1 */}
        <div className="relative group bg-gray-200 overflow-hidden shadow-lg rounded-lg">
          <img
            src="https://themewagon.github.io/simple/images/Group95.svg"
            alt="Card Image"
            className="w-full h-48 object-cover"
          />
          <div className="p-4 text-center">
            <h2 className="text-xl font-semibold">Online Marketing</h2>
            <p className="text-gray-600">SEO, Marketing, Strategy</p>
          </div>
          <div className="absolute inset-0 bg-blue-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out group-hover:bg-[rgb(57,90,147)] flex justify-center items-center">
            <button className="bg-red-500 text-white py-2 px-6 rounded-md text-lg font-semibold">
              Read More
            </button>
          </div>
        </div>

        {/* Card 2 */}
        <div className="relative group bg-gray-200 overflow-hidden shadow-lg rounded-lg">
          <img
            src="https://themewagon.github.io/simple/images/Group108.svg"
            alt="Card Image"
            className="w-full h-48 object-cover"
          />
          <div className="p-4 text-center">
            <h2 className="text-xl font-semibold">Web Development</h2>
            <p className="text-gray-600">Developing, Designing</p>
          </div>
          <div className="absolute inset-0 bg-blue-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out group-hover:bg-[rgb(57,90,147)] flex justify-center items-center">
            <button className="bg-red-500 text-white py-2 px-6 rounded-md text-lg font-semibold">
              Read More
            </button>
          </div>
        </div>

        {/* Card 3 */}
        <div className="relative group bg-gray-200 overflow-hidden shadow-lg rounded-lg">
          <img
            src="https://themewagon.github.io/simple/images/Group126.svg"
            alt="Card Image"
            className="w-full h-48 object-cover"
          />
          <div className="p-4 text-center">
            <h2 className="text-xl font-semibold">Web Designing</h2>
            <p className="text-gray-600">Designing, Developing</p>
          </div>
          <div className="absolute inset-0 bg-blue-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out group-hover:bg-[rgb(57,90,147)] flex justify-center items-center">
            <button className="bg-red-500 text-white py-2 px-6 rounded-md text-lg font-semibold">
              Read More
            </button>
          </div>
        </div>

        {/* Card 4 */}
        <div className="relative group bg-gray-200 overflow-hidden shadow-lg rounded-lg">
          <img
            src="https://themewagon.github.io/simple/images/Group115.svg"
            alt="Card Image"
            className="w-full h-48 object-cover"
          />
          <div className="p-4 text-center">
            <h2 className="text-xl font-semibold">Software Development</h2>
            <p className="text-gray-600">Developing, Designing</p>
          </div>
          <div className="absolute inset-0 bg-blue-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out group-hover:bg-[rgb(57,90,147)] flex justify-center items-center">
            <button className="bg-red-500 text-white py-2 px-6 rounded-md text-lg font-semibold">
              Read More
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudySection;
