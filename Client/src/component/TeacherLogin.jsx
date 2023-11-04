import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import boygirl from "../assets/BoyAndGirl.png";
import { useFormik } from "formik";
import { TeacherSchema } from "../SchemaValidation"; // Make sure to use consistent naming
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import NavBar from "./NavBar";

function TeacherLogin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("userId") && localStorage.getItem("userType") === "teacher") navigate("/teacher");
  }, []);

  const onSubmit = async (values, setSubmitting) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API}teacher/login`, { email: values.TeacherEmail, password: values.TeacherPassword }, { withCredentials: true });
      localStorage.setItem("userId", res.data.user.user.userId)
      localStorage.setItem("userType", "teacher")
      navigate("/teacher")
    } catch (error) {
      alert(error.message);
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
    <div className="flex justify-center min-h-screen background">
      <NavBar />
      <main className="w-full md:w-[80%] lg:w-[70%] xl:w-[60%] text-center grid grid-cols-[35%_65%] mt-24 mb-16">
        <div className="grid grid-rows-[40%_15%_35%] text-white bg-[#252525] bg-opacity-95">
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
        <section className="bg-[#2596be] opacity-95 flex flex-col gap-14 justify-center px-16 py-4">
          <h2 className="font-extrabold px-14 text-6xl font-expletus my-8">Teacher Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="TeacherEmail" className={`block mb-2 text-xl font-semibold ${touched.TeacherEmail && errors.TeacherEmail ? "text-red-500" : ""}`}>
                Email
              </label>
              <input
                id="TeacherEmail"
                name="TeacherEmail"
                type="text"
                className={`w-[100%] rounded-full flex p-4 px-10 mt-2 text-xl bg-black text-white border-2 font-kumbh ${touched.TeacherEmail && errors.TeacherEmail ? "border-red-500" : ""}`}
                value={values.TeacherEmail}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isSubmitting}
              />
            </div>
            <div className="mb-6">
              <label htmlFor="TeacherPassword" className={`block mt-4 mb-2 text-xl font-semibold ${touched.TeacherPassword && errors.TeacherPassword ? "text-red-500" : ""}`}>
                Password
              </label>
              <div className="relative">
                <input
                  id="TeacherPassword"
                  name="TeacherPassword"
                  type={showPassword ? "text" : "password"}
                  className={`w-[100%] justify-center flex items-center rounded-full px-10 border-2 p-4 text-xl bg-black text-white font-kumbh ${touched.TeacherPassword && errors.TeacherPassword ? "border-red-500" : ""}`}
                  value={values.TeacherPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={isSubmitting}
                />
                <span className="absolute text-xl cursor-pointer top-7 right-5" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaEye className="text-white" /> : <FaEyeSlash className="text-white" />}
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center mt-4">
              <div className="flex">
                <label className="block font-bold text-gray-500 ms-4">
                  <input className="leading-tight" type="checkbox" />
                  <span className="ms-2 text-xl text-neutral-800">Remember me</span>
                </label>
              </div>
              <div>
                <Link to="/Teacher_Send_Email" className="inline-block text-lg font-bold text-neutral-800 underline align-baseline hover:text-blue-800">
                  Forgot Password?
                </Link>
              </div>
            </div>
            <button className="font-sourceSans3 text-center rounded-full px-12 py-3 mt-4 text-2xl bg-black shadow-lg hover:shadow-green-400 text-white placeholder-white font-bold" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}

export default TeacherLogin;
