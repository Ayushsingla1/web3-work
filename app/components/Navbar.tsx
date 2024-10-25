'use client';
import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa'; // Import Font Awesome icons
import Link from 'next/link';
import MyDropdown from './button';
import { useContext } from 'react';
import { MyContext } from '@/components/Context';
import { useDisconnect } from 'wagmi';
import { useRouter } from 'next/navigation';
const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn , setIsLoggedIn] = useState(false);
  const { findUser , logOut} = useContext((MyContext))
  const {disconnect} = useDisconnect()
  const router = useRouter();
  useEffect(()=>{
    const user = async() => {
      const res = await findUser()
      if(res) {setIsLoggedIn(true)}
      else setIsLoggedIn(false);
      }
      user();
  })

  const logOutHanlder = async() => {
    await logOut()
    setIsLoggedIn(false);
    disconnect();
    router.push('/');
  }
  return (
    <div className="bg-[#6581A6] w-full p-4 md:p-6 flex flex-wrap justify-between items-center">
      {/* Logo Section */}
      <div className="text-3xl md:text-4xl relative top-[-5px] md:top-[-15px] px-2 py-1 rounded">
        <span className="font-['Irish_Grover'] text-[#1D2C40]">Go</span>
        <span className="font-['Irish_Grover'] text-[#1D2C40]">Getter</span>
        <span className="font-['Irish_Grover'] text-[#1D2C40]">.com</span>
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex space-x-4">
        <Link href="/" className="text-white hover:text-gray-300 pt-3 md:pt-10 font-['Hammersmith_One'] text-[20px] md:text-[23px]">
          home
        </Link>
        <Link href="/jobs" className="text-white hover:text-gray-300 pt-3 md:pt-10 font-['Hammersmith_One'] text-[20px] md:text-[23px]">
          Jobs
        </Link>
        <Link href="/freelancers" className="text-white hover:text-gray-300 pt-3 md:pt-10 font-['Hammersmith_One'] text-[20px] md:text-[23px]">
          freelancers
        </Link>
        <Link href="/post" className="text-white hover:text-gray-300 pt-3 md:pt-10 font-['Hammersmith_One'] text-[20px] md:text-[23px]">
          post
        </Link>
        <Link href="/requests" className="text-white hover:text-gray-300 pt-3 md:pt-10 font-['Hammersmith_One'] text-[20px] md:text-[23px]">
          requests
        </Link>
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
          <Link href="/" className="text-white hover:text-gray-300 pt-2 font-['Hammersmith_One'] text-[20px]">
            home
          </Link>
          <Link href="/jobs" className="text-white hover:text-gray-300 pt-2 font-['Hammersmith_One'] text-[20px]">
            Jobs
          </Link>
          <Link href="/freelancers" className="text-white hover:text-gray-300 pt-2 font-['Hammersmith_One'] text-[20px]">
            freelancers
          </Link>
          <Link href="/post" className="text-white hover:text-gray-300 pt-2 font-['Hammersmith_One'] text-[20px]">
            post
          </Link>
          <Link href="/requests" className="text-white hover:text-gray-300 pt-2 font-['Hammersmith_One'] text-[20px]">
            requests
          </Link>
        </div>
      )}

      <div className="flex items-center space-x-2 md:space-x-4 relative top-[-5px] md:top-[-15px]">
        {
          isLoggedIn ? (<button onClick={()=>{logOutHanlder()}} className="text-[#BDD9F2] hover:text-gray-300 font-['Hammersmith_One'] text-[18px] md:text-[20px]">SignOut</button>) : (<Link href="/login" className="text-[#BDD9F2] hover:text-gray-300 font-['Hammersmith_One'] text-[18px] md:text-[20px]">
          SignIn
        </Link>)
        }
        <MyDropdown />
      </div>
    </div>
  );
};

export default Navbar;
