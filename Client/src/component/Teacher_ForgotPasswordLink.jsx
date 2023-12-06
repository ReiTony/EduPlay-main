import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Teacher_ForgotPasswordLink() {
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(window.location.search);
  const token = searchParams.get("token");
  const email = searchParams.get("email");
  const [isVerifying, setIsVerifying] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [isChanging, setIsChanging] = useState(false);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setIsChanging(true);
    axios
      .post(`${import.meta.env.VITE_API}teacher/reset-password?token=${token}&email=${email}`, { newPassword })
      .then(() => setIsSuccess(true))
      .catch(() => setIsSuccess(false))
      .finally(() => setIsVerifying(false));
    setIsChanging(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f8d43c]">
      <div className="flex flex-col justify-center items-center bg-white rounded-2xl shadow-md gap-4 font-sourceSans3 px-4 py-10 sm:px-16 m-4" style={{ maxWidth: "768px" }}>
        <h1 className="text-4xl text-center font-bold my-6">Teacher Forgot Password</h1>
        {isVerifying ? (
          <form className="flex flex-col items-center justify-center gap-4">
            <input type="password" className="rounded-full border-2 w-full text-2xl px-6 py-2" placeholder="Enter new password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            <button type="submit" className="bg-[#282424] rounded-full shadow-md w-full text-white text-xl font-bold px-10 py-3 hover:brightness-90" onClick={handleChangePassword} disabled={isChanging}>
              {isChanging ? "CHANGING PASSWORD..." : "CHANGE PASSWORD"}
            </button>
          </form>
        ) : (
          <>
            <h1 className="text-5xl font-bold text-center">{isSuccess ? "Change Password Successful!" : "Change Password Failed!"}</h1>
            <button className="text-lg bg-[#282424] shadow-md my-4 py-2 px-12 text-white font-bold rounded-full hover:brightness-95 hover:shadow-lg" onClick={() => navigate("/teacher/login")}>
              GO TO LOGIN PAGE
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Teacher_ForgotPasswordLink;
