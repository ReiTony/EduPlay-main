import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Teacher_Navbar from "./Teacher_Navbar";

function Teacher_SharedLayout() {
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!localStorage.getItem("userId") || localStorage.getItem("userType") !== "teacher") navigate("/");
  }, []);

  return (
    <div className="bg-[#08a4e4] flex flex-col min-h-screen flex-grow overflow-y-auto">
      <Teacher_Navbar />
      <Outlet />
    </div>
  );
}

export default Teacher_SharedLayout;
