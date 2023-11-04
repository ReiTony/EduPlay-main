import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Student_Navbar from "./Student_Navbar";

function Student_SharedLayout() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("userId") || localStorage.getItem("userType") !== "student") navigate("/");
  }, []);

  return (
    <div className="backgroundYellow flex flex-col min-h-screen">
      <Student_Navbar />
      <Outlet />
    </div>
  );
}

export default Student_SharedLayout;
