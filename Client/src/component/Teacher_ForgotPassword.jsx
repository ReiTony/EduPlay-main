import { useState } from "react";
import axios from "axios";
import NavBar from "./NavBar";
import logo from "../assets/logo.png";
import boygirl from "../assets/BoyAndGirl.png";
import ErrorModal from "./ErrorModal";

function Teacher_ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isEmailSentModalOpen, setIsEmailSentModalOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setIsSending(true);
    await axios
      .post(`${import.meta.env.VITE_API}teacher/forgot-password`, { email })
      .then(() => setIsEmailSentModalOpen(true))
      .catch(() => setIsErrorModalOpen(true))
      .finally(() => setIsSending(false));
  };

  return (
    <>
      <div className="flex flex-col justify-between min-h-screen background">
        <NavBar />
        <main className="w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] text-center grid lg:grid-cols-[35%_65%] m-auto ">
          <div className="hidden bg-[#252525] rounded-l-lg p-4 xl:p-10 lg:flex flex-col justify-center items-center gap-2">
            <img src={logo} alt="logo" />
            <h1 className="text-5xl text-white font-bold font-reemkufifont">EDUPLAY</h1>
            <img src={boygirl} alt="Logo" />
          </div>

          <form className="bg-[#2596be] flex flex-col gap-2 justify-center items-center px-4 sm:px-16 py-6 font-sourceSans3">
            <img src="/images/ijms_logo.png" className="w-40 mx-auto" alt="logo of IJMS" />
            <h2 className="mt-2 mb-6 text-4xl sm:text-5xl font-extrabold">Teacher Forgot Password</h2>
            <input type="text" className="bg-[#282424] w-full shadow-md rounded-full font-semibold text-2xl text-white px-8 py-3" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <button type="submit" className="bg-[#282424] rounded-full shadow-md text-white text-2xl font-bold px-10 py-3 mt-8 hover:brightness-90" onClick={handleResetPassword} disabled={isSending}>
              {isSending ? "SENDING EMAIL..." : "SEND EMAIL"}
            </button>
          </form>
        </main>
      </div>
      <ErrorModal show={isEmailSentModalOpen} onHide={() => setIsEmailSentModalOpen(false)} errorInfo={"Please check your email for the link."} />
      <ErrorModal show={isErrorModalOpen} onHide={() => setIsErrorModalOpen(false)} errorInfo={"Email does not exist!"} />
    </>
  );
}

export default Teacher_ForgotPassword;
