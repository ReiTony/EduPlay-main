import { Link } from "react-router-dom";
import myLogo from "../assets/LandingPage/logo.png";

function NavBar() {
  return (
    <>
      <nav className="flex flex-row items-center justify-start px-4 py-0 md:px-12 lg:px-48 md:py-2 fixed top-0 w-full z-10 bg-[#f7d538]">
        <Link to="/about">
          <img src="/images/ijms_logo.png" className="w-20" alt="logo of IJMS" />
        </Link>
        <Link to="/">
          <img src={myLogo} alt="Logo" className="cursor-pointer h-14 mb-2" />
        </Link>
      </nav>
      <div className="h-[5rem] md:h-[5rem]" />
    </>
  );
}

export default NavBar;
