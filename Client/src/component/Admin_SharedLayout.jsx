import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Admin_NavBar from "./Admin_NavBar";

function Admin_SharedLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("userId") || localStorage.getItem("userType") !== "admin") navigate("/");
  }, []);

  return (
    <div className="flex flex-col flex-grow min-h-screen overflow-y-auto bg-[#f0e4e4]">
      <Admin_NavBar />
      <Outlet />
    </div>
  );
}

export default Admin_SharedLayout;
