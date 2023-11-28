import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function EmailVerified() {
  const navigate = useNavigate();
  const [isVerifying, setIsVerifying] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const verificationToken = searchParams.get("token");
    const email = searchParams.get("email");
    axios
      .post(`${import.meta.env.VITE_API}teacher/verify-email`, { verificationToken, email })
      .then(() => setIsSuccess(true))
      .catch(() => setIsSuccess(false))
      .finally(() => setIsVerifying(false));
  }, []);

  return (
    <div className="flex justify-center min-h-screen bg-[#f8d43c]">
      <div className="flex flex-col justify-center items-center gap-4 font-sourceSans3" style={{ maxWidth: "768px" }}>
        {isVerifying ? (
          <h1 className="text-5xl font-bold text-center">Verifying...</h1>
        ) : (
          <>
            <h1 className="text-5xl font-bold text-center">{isSuccess ? "Email Verification Successful!" : "Email Verification Failed!"}</h1>
            {isSuccess && <h4 className="text-xl font-bold text-center">Your email has been successfully verified.</h4>}
            <button className="text-lg bg-neutral-50 shadow-md my-4 py-2 px-12 font-bold rounded-full hover:brightness-95 hover:shadow-lg" onClick={() => navigate("/teacher/login")}>
              GO TO LOGIN PAGE
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default EmailVerified;
