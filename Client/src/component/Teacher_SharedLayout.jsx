import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Teacher_Navbar from "./Teacher_Navbar";

function Teacher_SharedLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("userId") || localStorage.getItem("userType") !== "teacher") navigate("/");
  }, []);

  return (
    <div className="flex flex-col flex-grow min-h-screen overflow-y-auto backgroundMainTeacher">
      <Teacher_Navbar />
      <Outlet />
    </div>
  );
}

export default Teacher_SharedLayout;
