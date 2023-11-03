import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios"; 

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const logoutTeacher = async () => {
      try {
        localStorage.clear();
        const response = await axios.delete("http://localhost:5000/api/v1/Teacher/logout", {withCredentials: true});
        
        // Check if the logout was successful
        if (response.status === 200) {
          Cookies.remove("teacherToken");
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
        console.error("Error during teacher logout:", error);

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

    logoutTeacher(); 
  }, [navigate]);

  return null;
}

export default Logout;
