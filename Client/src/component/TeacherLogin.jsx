import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import boygirl from "../assets/BoyAndGirl.png";
import { useFormik } from "formik";
import { TeacherSchema } from "../SchemaValidation"; // Make sure to use consistent naming
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import NavBar from "./NavBar";
import ErrorModal from "./ErrorModal";

function TeacherLogin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorInfo, setErrorInfo] = useState("Error");

  useEffect(() => {
    if (localStorage.getItem("userId") && localStorage.getItem("userType") === "teacher") navigate("/teacher");
  }, []);

  const onSubmit = async (values, setSubmitting) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API}teacher/login`, { email: values.TeacherEmail, password: values.TeacherPassword }, { withCredentials: true });
      localStorage.setItem("userId", res.data.user.user.userId);
      localStorage.setItem("userType", "teacher");
      navigate("/teacher");
    } catch (err) {
      if (err.code === "ERR_NETWORK") setErrorInfo("You are not connected to the internet.");
      else if (err.response.status === 500) setErrorInfo("Invalid teacher credentials.");
      else setErrorInfo("Error");
      setIsErrorModalOpen(true);
    } finally {
      setSubmitting(false);
    }
  };

  const { values, errors, handleBlur, handleChange, handleSubmit, touched, isSubmitting } = useFormik({
    initialValues: { TeacherEmail: "", TeacherPassword: "" },
    validationSchema: TeacherSchema, // Make sure to use consistent validation schema
    onSubmit: (values, { setSubmitting }) => onSubmit(values, setSubmitting), // Add setSubmitting
  });

  return (
    <>
      <div className="flex flex-col min-h-[100dvh] background2 overflow-y-auto">
        <NavBar />
        <main className="w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] text-center grid lg:grid-cols-[35%_65%] m-auto py-10 my-auto">
          <div className="hidden bg-[#252525] rounded-l-lg p-4 xl:p-10 lg:flex flex-col justify-center items-center gap-2">
            <img src={logo} alt="logo" />
            <h1 className="text-5xl text-white font-bold font-reemkufifont">EDUPLAY</h1>
            <img src={boygirl} alt="Logo" />
          </div>

          <section className="bg-[#2596be] opacity-95 flex flex-col px-4 py-6 justify-center rounded-r-lg lg:rounded-l-none rounded-lg lg:px-16 py-auto shadow-2xl shadow-black">
            <img src="/images/ijms_logo.png" className="w-40 mx-auto" alt="logo of IJMS" />
            <h2 className="text-4xl lg:text-6xl font-extrabold font-expletus my-4">Teacher Login</h2>
            <form onSubmit={handleSubmit} className="flex flex-col items-center mt-4">
              <label htmlFor="TeacherEmail" className={`text-xl font-semibold me-auto ms-6 ${touched.TeacherEmail && errors.TeacherEmail ? "text-red-500" : ""}`}>
                Email
              </label>
              <input
                id="TeacherEmail"
                name="TeacherEmail"
                type="text"
                className={`w-full rounded-full flex p-4 px-10 mt-2 text-xl bg-black text-white border-2 font-kumbh ${touched.TeacherEmail && errors.TeacherEmail ? "border-red-500" : ""}`}
                value={values.TeacherEmail}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isSubmitting}
              />
              <label htmlFor="TeacherPassword" className={`text-xl font-semibold me-auto ms-6 mt-6 ${touched.TeacherPassword && errors.TeacherPassword ? "text-red-500" : ""}`}>
                Password
              </label>
              <div className="relative w-full">
                <input
                  id="TeacherPassword"
                  name="TeacherPassword"
                  type={showPassword ? "text" : "password"}
                  className={`w-full rounded-full flex p-4 px-10 mt-2 text-xl bg-black text-white border-2 font-kumbh ${touched.TeacherPassword && errors.TeacherPassword ? "border-red-500" : ""}`}
                  value={values.TeacherPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={isSubmitting}
                />
                <span className="absolute text-xl cursor-pointer top-8 right-6" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaEye className="text-white" /> : <FaEyeSlash className="text-white" />}
                </span>
              </div>
              <button className="text-lg font-bold underline ms-auto mt-4 text-neutral-800 hover:text-blue-800" type="button" onClick={() => navigate("/teacher/forgot-password")}>
                Forgot Password?
              </button>
              <button type="submit" className="px-12 py-3 mt-4 text-2xl font-bold text-center text-white placeholder-white bg-black rounded-full shadow-lg font-sourceSans3 hover:shadow-green-400" disabled={isSubmitting}>
                {isSubmitting ? "SIGNING IN..." : "SIGN IN"}
              </button>
            </form>
          </section>
        </main>
      </div>
      <ErrorModal show={isErrorModalOpen} onHide={() => setIsErrorModalOpen(false)} errorInfo={errorInfo} />
    </>
  );
}

export default TeacherLogin;
