import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear tokens and cookies
    Cookies.remove("studentToken");
    Cookies.remove("teacherToken");
    localStorage.clear();

    // Navigate to the root route
    navigate("/");

    // Show a toast message to confirm logout
    toast.success("You have been logged out.", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }, [navigate]);

  return null;
}

export default Logout;
