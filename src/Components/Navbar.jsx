import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Modal from "./Modal"; // Importing Modal Component

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [active, setActive] = useState("Home");

  const toggleMenu = () => setIsOpen(!isOpen);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const handleClick = (name) => setActive(name);

  return (
    <>
      <div className="navbar bg-base-100 shadow-sm mt-5 flex items-center justify-between px-10 py-2">
        {/* Logo */}
        <div className="navbar-start flex items-center">
          <img
            src="https://themewagon.github.io/simple/images/Group2.svg"
            alt=""
            className="h-6"
          />
        </div>

        {/* Desktop Menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="flex space-x-6 text-lg font-semibold">
            {["Home", "About", "Blog", "Testimonials"].map((item) => (
              <li key={item}>
                <a
                  className={`${
                    active === item ? "text-red-500" : "text-black"
                  } focus:outline-none cursor-pointer transition-all duration-300`}
                  onClick={() => handleClick(item)}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Us Button */}
        <div className="navbar-end hidden lg:flex">
          <button
            className="bg-sky-500 text-white border border-sky-500 py-2 px-4 text-lg font-semibold hover:bg-white hover:text-sky-500 transition-all duration-300 ease-in-out"
            onClick={openModal}
          >
            Contact Us
          </button>
        </div>

        {/* Mobile Toggle Button */}
        <div className="navbar-end lg:hidden flex items-center">
          <button className="btn btn-ghost" onClick={toggleMenu}>
            {isOpen ? <FaTimes className="text-2xl text-black" /> : <FaBars className="text-2xl text-black" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full bg-base-100 z-10 transition-transform transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ width: "250px", boxShadow: "-2px 0px 5px rgba(0,0,0,0.2)" }}
      >
        {isOpen && (
          <button className="absolute top-4 right-4 text-2xl text-gray-700 lg:hidden" onClick={toggleMenu}>
            <FaTimes />
          </button>
        )}

        <ul className="menu p-8 mt-6 text-lg font-semibold">
          <img className="mb-4" src="https://themewagon.github.io/simple/images/Group2.svg" alt="" />
          {["Home", "About", "Blog", "Testimonials"].map((item) => (
            <li key={item} className="hover:bg-transparent">
              <a
                className={`${
                  active === item ? "text-red-500" : "text-black"
                } focus:outline-none cursor-pointer transition-all duration-300`}
                onClick={() => handleClick(item)}
              >
                {item}
              </a>
            </li>
          ))}
          <li>
            <button className="btn bg-[#50a1f1] text-white px-5 py-1 mt-4">
              Contact Us
            </button>
          </li>
        </ul>
      </div>

      {/* Modal */}
      {isModalOpen && <Modal closeModal={closeModal} />}
    </>
  );
};

export default Navbar;
