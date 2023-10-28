import { useNavigate } from "react-router-dom";
import myLogo from "../assets/LandingPage/logo.png";

function NavBar() {
  const navigate = useNavigate();

  return (
    <nav className="z-10 flex content-center justify-between w-full px-4 py-2 lg:px-48 md:px-12 bg-[#f7d538] fixed top-0">
      <div className="flex items-center">
        <img src={myLogo} alt="Logo" className="h-14 cursor-pointer" onClick={() => navigate("/")} />
      </div>
    </nav>
  );
}

export default NavBar;
