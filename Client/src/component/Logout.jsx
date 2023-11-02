import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios"; 

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const logoutStudent = async () => {
      try {
        const response = await axios.delete("http://localhost:5000/api/v1/Student/logout");
        
        // Check if the logout was successful
        if (response.status === 200) {
          Cookies.remove("studentToken");
          Cookies.remove("accessToken");
          Cookies.remove("refreshToken");

          navigate("/");

          toast.success("You have been logged out.", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      } catch (error) {
        console.error("Error during student logout:", error);

        toast.error("An error occurred during logout.", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

      }
    };

    logoutStudent(); 
  }, [navigate]);

  return null;
}

export default Logout;
