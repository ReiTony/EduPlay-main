import { useNavigate } from "react-router-dom";
import myLogo from "../assets/LandingPage/logo.png";

function NavBar() {
  const navigate = useNavigate();

  return (
    <nav className="flex items-center gap-6 w-full px-4 py-2 lg:px-48 md:px-12 bg-[#f7d538] z-10">
      <img src="/public/images/ijms_logo.png" className="w-20" alt="logo of IJMS" />
      <img src={myLogo} alt="Logo" className="cursor-pointer h-14 mb-2" onClick={() => navigate("/")} />
    </nav>
  );
}

export default NavBar;
