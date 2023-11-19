import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "./NavBar";
import logo from "../assets/logo.png";
import boygirl from "../assets/BoyAndGirl.png";

function Teacher_ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();
    await axios
      .post(`${import.meta.env.VITE_API}teacher/reset-password`, { email, newPassword })
      .then(() => navigate("/teacher/login"))
      .catch(() => alert("Email does not exist!"));
  };

  return (
    <>
      <div className="flex flex-col justify-between min-h-screen background">
        <NavBar />
        <main className="w-[80%] md:w-[80%] lg:w-[70%] xl:w-[60%] text-center grid lg:grid-cols-[35%_65%] m-auto">
          <div className="grid grid-rows-[40%_15%_35%] text-white bg-[#252525]">
            <div className="flex items-center justify-center">
              <img className="object-cover w-fit h-[90%] m-0" src={logo} alt="Logo" />
            </div>
            <div>
              <h1 className="text-6xl font-bold font-reemkufifont">EDUPLAY</h1>
            </div>
            <div className="flex items-center justify-center">
              <img className="object-cover w-fit h-[90%]" src={boygirl} alt="Logo" />
            </div>
          </div>
          <form className="bg-[#2596be] flex flex-col gap-6 justify-center items-center px-16 py-4 font-sourceSans3">
            <h2 className="my-8 text-6xl font-extrabold px-14">Teacher Forgot Password</h2>
            <input type="text" className="bg-[#282424] w-full shadow-md rounded-full font-semibold text-2xl text-white px-8 py-3" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input
              type="password"
              className="bg-[#282424] w-full shadow-md rounded-full font-semibold text-2xl text-white px-8 py-3"
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button type="submit" className="bg-[#282424] rounded-full shadow-md text-white text-2xl font-bold px-10 py-3 mt-10 hover:brightness-90" onClick={handleResetPassword}>
              RESET PASSWORD
            </button>
          </form>
        </main>
      </div>
    </>
  );
}

export default Teacher_ForgotPassword;
