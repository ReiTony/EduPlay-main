import { Link } from "react-router-dom";
import myLogo from "../assets/LandingPage/logo.png";

function NavBar() {
  return (
    <nav className="flex items-center gap-6 w-full px-4 py-2 lg:px-48 md:px-12 bg-[#f7d538] z-10">
      <Link to="/about">
        <img src="/images/ijms_logo.png" className="w-20" alt="logo of IJMS" />
      </Link>
      <Link to="/">
        <img src={myLogo} alt="Logo" className="cursor-pointer h-14 mb-2" />
      </Link>
    </nav>
  );
}

export default NavBar;
