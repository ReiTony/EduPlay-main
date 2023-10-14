import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function TokenTransfer() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("studentToken");
    if (token) {
      // Pass the token to Student_Profile and navigate
      navigate(`/Student/Profile?token=${token}`);
    } else {
      console.error("No token found.");
    }
  }, [navigate]);

  return null; // This component doesn't render anything
}

export default TokenTransfer;
