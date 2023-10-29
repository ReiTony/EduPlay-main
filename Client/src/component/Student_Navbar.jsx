import React, { useState } from "react";
import { HiMenu } from "react-icons/hi";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

function Student_Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="m-4 text-white bg-[#252525] rounded-3xl sticky top-0">
      <div className="flex items-center justify-between w-full p-2 ">
        <div className="flex items-center">
          <img className="w-24 m-0 " src={logo} alt="Logo" />
          <h1 className="pl-2 text-4xl font-bold xl:pr-40 font-reemkufifont">EDUPLAY</h1>
        </div>
        <div className="justify-end hidden w-full space-x-4 text-2xl font-bold font-expletus xl:flex">
          <Link to="/Student" className="p-5 hover:text-gray-500 ">
            HOME
          </Link>

          <Link to="/Student/Profile" className="p-5 hover:text-gray-500">
            PROFILE
          </Link>

          <Link to="/Student/Logout" className="p-5 hover:text-gray-500">
            LOGOUT
          </Link>
        </div>

        <div className=" xl:hidden">
          <HiMenu onClick={toggleMenu} className="text-3xl cursor-pointer" />
        </div>
      </div>
      {isMenuOpen && (
        <div className="py-4 bg-gray-800 xl:hidden">
          <div className="container flex flex-col items-center mx-auto space-y-4 font-expletus">
            <Link to="/" className="text-white">
              HOME
            </Link>
            <Link to="/Student/Profile" className="text-white">
              PROFILE
            </Link>
            <Link to="/Student/Logout" className="text-white">
              LOGOUT
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Student_Navbar;
