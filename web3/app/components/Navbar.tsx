'use client'
import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa'; // Import Font Awesome icons
import Link from 'next/link';
import MyDropdown from './button';
 

const Navbar: React.FC = () => {
  // State to toggle mobile menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <nav className="bg-[#6581A6] p-4 md:p-6 flex flex-wrap justify-between items-center">
      {/* Logo Section */}
      <div className="text-3xl md:text-4xl relative top-[-5px] md:top-[-15px] px-2 py-1 rounded">
        <span className="font-['Irish_Grover'] text-[#1D2C40]">Go</span>
        <span className="font-['Irish_Grover'] text-[#1D2C40]">Getter</span>
        <span className="font-['Irish_Grover'] text-[#1D2C40]">.com</span>
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex space-x-4">
        <a href="#" className="text-white hover:text-gray-300 pt-3 md:pt-10 font-['Hammersmith_One'] text-[20px] md:text-[23px]">home</a>
        <a href="#" className="text-white hover:text-gray-300 pt-3 md:pt-10 font-['Hammersmith_One'] text-[20px] md:text-[23px]">Jobs</a>
        <a href="#" className="text-white hover:text-gray-300 pt-3 md:pt-10 font-['Hammersmith_One'] text-[20px] md:text-[23px]">freelancers</a>
        <a href="#" className="text-white hover:text-gray-300 pt-3 md:pt-10 font-['Hammersmith_One'] text-[20px] md:text-[23px]">post</a>
        <a href="#" className="text-white hover:text-gray-300 pt-3 md:pt-10 font-['Hammersmith_One'] text-[20px] md:text-[23px]">requests</a>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex space-x-4">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-white hover:text-gray-300 font-['Hammersmith_One'] text-[20px]"
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />} {/* Use icons instead of text */}
        </button>
      </div>

      {/* Mobile Menu Links (toggle visibility based on isMenuOpen state) */}
      {isMenuOpen && (
        <div className="md:hidden flex flex-col space-y-4 mt-4 w-full">
          <a href="#" className="text-white hover:text-gray-300 pt-2 font-['Hammersmith_One'] text-[20px]">home</a>
          <a href="#" className="text-white hover:text-gray-300 pt-2 font-['Hammersmith_One'] text-[20px]">Jobs</a>
          <a href="#" className="text-white hover:text-gray-300 pt-2 font-['Hammersmith_One'] text-[20px]">freelancers</a>
          <a href="#" className="text-white hover:text-gray-300 pt-2 font-['Hammersmith_One'] text-[20px]">post</a>
          <a href="#" className="text-white hover:text-gray-300 pt-2 font-['Hammersmith_One'] text-[20px]">requests</a>
        </div>
      )}

      <div className="flex items-center space-x-2 md:space-x-4 relative top-[-5px] md:top-[-15px]">
        <Link href="/login" className="text-[#BDD9F2] hover:text-gray-300 font-['Hammersmith_One'] text-[18px] md:text-[20px]">SignUp</Link>
        <MyDropdown/>
      </div>
    </nav>
  );
};

export default Navbar;
