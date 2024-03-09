import { useState } from "react";
import { HiMenu } from "react-icons/hi";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

function Teacher_Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="m-4 text-white bg-[#252525] rounded-3xl sticky top-0">
      <div className="flex items-center justify-between w-full p-2">
        <div className="flex flex-grow items-center">
          <img className="h-12 sm:h-24" src={logo} alt="eduplay-logo" />
          <h1 className="flex text-xl sm:text-4xl font-bold font-reemkufifont flex-grow">
            EDUPLAY TEACHER
          </h1>
        </div>
        <div className="justify-end hidden text-2xl font-bold font-expletus xl:flex">
          <Link to="/teacher" className="p-5 hover:text-[#252525] hover:bg-[#a5d6a7] hover:rounded-sm ">
            HOME
          </Link>

          <Link to="/teacher/logout" className="p-5 hover:text-[#252525] hover:bg-[#e54e4e] hover:rounded-sm">
            LOGOUT
          </Link>
        </div>

        <div className=" xl:hidden">
          <HiMenu onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-3xl cursor-pointer" />
        </div>
      </div>
      {isMenuOpen && (
        <div className="py-4 bg-gray-800 xl:hidden rounded-b-3xl">
          <div className="container flex flex-col items-center mx-auto space-y-4 font-expletus">
            <Link to="/teacher" className="text-white">
              HOME
            </Link>
            <Link to="/teacher/logout" className="text-white">
              LOGOUT
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Teacher_Navbar;
