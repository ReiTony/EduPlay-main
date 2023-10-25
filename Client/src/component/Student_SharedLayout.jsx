import Student_Navbar from "./Student_Navbar";
import { Outlet } from "react-router-dom";

function Student_SharedLayout() {
  return (
    <div className="backgroundYellow flex flex-col min-h-screen">
      <Student_Navbar />
      <Outlet />
    </div>
  );
}

export default Student_SharedLayout;
