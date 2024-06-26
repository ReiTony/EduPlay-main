import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import boygirl from "../assets/BoyAndGirl.png";
import { useFormik } from "formik";
import { studentSchema } from "../SchemaValidation";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import NavBar from "./NavBar";
import ErrorModal from "./ErrorModal";

function Admin_Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorInfo, setErrorInfo] = useState("Error");

  useEffect(() => {
    if (localStorage.getItem("userId") && localStorage.getItem("userType") === "admin") navigate("/admin");
  }, []);

  const onSubmit = async (values, setSubmitting) => {
    try {
      const body = { email: values.username, password: values.password };
      let temp = await axios.post(`${import.meta.env.VITE_API}admin/login`, body, { withCredentials: true });
      localStorage.setItem("userId", temp.data.user.user.userId);
      localStorage.setItem("userType", "admin");
      navigate("/admin");
    } catch (err) {
      if (err.code === "ERR_NETWORK") setErrorInfo("You are not connected to the internet.");
      else if (err.response.status === 401) setErrorInfo("Invalid admin credentials.");
      else setErrorInfo("Error");
      setIsErrorModalOpen(true);
    }
  };

  const { values, errors, handleBlur, handleChange, handleSubmit, touched, isSubmitting } = useFormik({
    initialValues: { username: "", password: "" },
    validationSchema: studentSchema,
    onSubmit: (values, { setSubmitting }) => onSubmit(values, setSubmitting),
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

          <section className="bg-[#f0e4e4] opacity-95 flex flex-col px-4 py-6 justify-center rounded-r-lg lg:rounded-l-none rounded-lg lg:px-16 py-auto shadow-2xl shadow-black">
            <img src="/images/ijms_logo.png" className="w-40 mx-auto" alt="logo of IJMS" />
            <h2 className="my-2 text-4xl font-extrabold lg:text-6xl lg:my-8 font-expletus">Admin Login</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="username" className={`items-start ml-6 flex mb-2 text-xl font-semibold ${touched.username && errors.username ? "text-red-500" : ""}`}>
                Email
              </label>
              <input
                id="username"
                name="username"
                type="text"
                className={`w-[100%] rounded-full flex p-4 px-10 mt-2 text-xl bg-black text-white border-2 font-kumbh ${touched.username && errors.username ? "border-red-500 " : "border-green-500"}`}
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isSubmitting}
              />
              <label htmlFor="password" className={`items-start ml-6 flex mt-4 mb-2 text-xl font-semibold ${touched.password && errors.password ? "text-red-500" : ""}`}>
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className={`w-[100%] justify-center flex items-center rounded-full px-10 border-2 p-4 text-xl bg-black text-white font-kumbh ${touched.password && errors.password ? "border-red-500 " : "border-green-500"}`}
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={isSubmitting}
                />
                <span className="absolute text-xl cursor-pointer top-6 right-5 " onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaEye className="text-white" /> : <FaEyeSlash className="text-white" />}
                </span>
              </div>
              <button
                className="px-12 py-3 mt-10 text-2xl font-bold text-center text-white placeholder-white transition duration-300 ease-in-out transform bg-black rounded-full shadow-lg font-sourceSans3 hover:shadow-green-400 hover:scale-105"
                type="submit"
                disabled={isSubmitting}>
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

export default Admin_Login;
