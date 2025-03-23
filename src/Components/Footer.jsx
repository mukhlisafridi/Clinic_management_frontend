import React from "react";
import { CiFacebook, CiTwitter } from "react-icons/ci";
import { IoLogoInstagram } from "react-icons/io";
import { FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <footer className="p-8 sm:p-12 lg:p-20 text-black">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center sm:text-left">
          
          {/* Logo & Contact */}
          <div>
            <img
              src="https://themewagon.github.io/simple/images/Group2.svg"
              alt="Logo"
              className="mx-auto sm:mx-0"
            />
            <p className="mt-4">
              mikayla_beer@feil.name 
              <span className="block">906-179-8309</span>
            </p>
          </div>

          {/* Get in Touch */}
          <div>
            <h1 className="text-2xl font-semibold">Get in Touch</h1>
            <p className="mt-2">
              Don’t miss any updates of our <span className="block">new templates and extensions!</span>
            </p>
            <form className="mt-4">
              <input
                type="email"
                placeholder="username@site.com"
                className="w-full p-2 border border-gray-400 rounded-md"
              />
              <button className="w-36 mt-3 py-1.5 bg-black text-white border border-black rounded-md transition duration-300 hover:bg-white hover:text-black">
                Subscribe
              </button>
            </form>
          </div>

          {/* Our Guidelines */}
          <div>
            <h1 className="text-2xl font-semibold">Our Guidelines</h1>
            <p className="mt-2">Terms</p>
            <p className="mt-2">Privacy Policy</p>
            <p className="mt-2">Cookie Policy</p>
            <p className="mt-2">Discover</p>
          </div>

          {/* Address & Social Media */}
          <div>
            <h1 className="text-2xl font-semibold">Our Address</h1>
            <p className="mt-2">
              518 Schmeler Neck <span className="block">Bartlett, Illinois</span>
            </p>
            <div className="flex justify-center sm:justify-start gap-3 text-2xl mt-4">
              <CiFacebook className="cursor-pointer hover:text-blue-600" />
              <CiTwitter className="cursor-pointer hover:text-blue-400" />
              <IoLogoInstagram className="cursor-pointer hover:text-pink-500" />
              <FaLinkedinIn className="cursor-pointer hover:text-blue-700" />
            </div>
          </div>
        </div>
      </footer>

      {/* Copyright Section */}
      <hr className="border-gray-300" />
      <div className="text-center py-6">
        <p>Copyright © {new Date().getFullYear()} - All rights reserved by Mukhlis Afridi Developer</p>
      </div>
    </>
  );
};

export default Footer;
