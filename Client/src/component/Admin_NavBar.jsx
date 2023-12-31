import { useState } from "react";
import { HiMenu } from "react-icons/hi";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";

function Admin_NavBar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogOut = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="m-4 text-white bg-[#252525] rounded-3xl sticky top-0">
      <div className="flex items-center justify-between w-full p-2 ">
        <div className="flex items-center">
          <img className="w-24 m-0 " src={logo} alt="Logo" />
          <div>
            <h1 className="flex pl-2 text-4xl font-bold xl:pr-40 font-reemkufifont">
              EDUPLAY <span className="mt-3 ml-2 text-xl">ADMIN</span>
            </h1>
          </div>
        </div>
        <div className="justify-end hidden w-full space-x-4 text-2xl font-bold font-expletus xl:flex">
          <Link to="/admin" className="p-5 hover:text-[#252525] hover:bg-[#a5d6a7] hover:rounded-sm ">
            HOME
          </Link>

          <button className="p-5 hover:text-[#252525] hover:bg-[#e54e4e] hover:rounded-sm" onClick={handleLogOut}>
            LOGOUT
          </button>
        </div>

        <div className=" xl:hidden">
          <HiMenu onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-3xl cursor-pointer" />
        </div>
      </div>
      {isMenuOpen && (
        <div className="py-4 bg-gray-800 xl:hidden">
          <div className="container flex flex-col items-center mx-auto space-y-4 font-expletus">
            <Link to="/admin" className="text-white">
              HOME
            </Link>
            <button className="text-white" onClick={handleLogOut}>
              LOGOUT
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Admin_NavBar;
