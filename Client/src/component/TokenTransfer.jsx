import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function TokenTransfer() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("studentToken");
    if (token) navigate(`/student/profile?token=${token}`);
    else console.error("No token found.");
  }, [navigate]);

  return null;
}

export default TokenTransfer;
