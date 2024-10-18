import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-[#6581A6] p-6 flex justify-between items-center">
      <div className="text-4xl relative top-[-15px] px-2 py-1 rounded">
        <span className="font-['Irish_Grover'] text-[#1D2C40]">Go</span>
        <span className="font-['Irish_Grover'] text-[#1D2C40]">Getter</span>
        <span className="font-['Irish_Grover'] text-[#1D2C40]">.com</span>
      </div>
      <div className="flex space-x-4">
        <a href="#" className="text-white hover:text-gray-300 pt-10 font-['Hammersmith_One'] text-[23px]">home</a>
        <a href="#" className="text-white hover:text-gray-300 pt-10 font-['Hammersmith_One'] text-[23px]">Jobs</a>
        <a href="#" className="text-white hover:text-gray-300 pt-10 font-['Hammersmith_One'] text-[23px]">freelancers</a>
        <a href="#" className="text-white hover:text-gray-300 pt-10 font-['Hammersmith_One'] text-[23px]">post</a>
        <a href="#" className="text-white hover:text-gray-300 pt-10 font-['Hammersmith_One'] text-[23px]">requests</a>
      </div>
      <div className="flex items-center space-x-4 relative top-[-15px]">
        <a href="#" className="text-[#BDD9F2] hover:text-gray-300 font-['Hammersmith_One'] text-[20px]">SignUp</a>
        <button className="bg-[#3D5473] text-[#BDD9F2] px-4 py-2 rounded hover:bg-gray-600 font-['Hammersmith_One'] text-[20px]">
          Connect Wallet
        </button>
      </div>
    </nav>
  );
};

export default Navbar;