import React, { useState,useEffect } from "react";
import Cookies from "js-cookie";
import logo from "../assets/logo.png";
import boygirl from "../assets/BoyAndGirl.png";
import { useFormik } from "formik";
import { TeacherSchema } from "../SchemaValidation"; // Make sure to use consistent naming
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function TeacherLogin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const setAuthHeader = (token) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  };

  const setTokenCookie = (token) => {
    // Set an HTTPOnly cookie with the token
    Cookies.set("teacherToken", JSON.stringify(token), { secure: true, sameSite: "strict" });
  };

  // Add a function to check if the token cookie exists
  const hasTokenCookie = () => {
    return !!Cookies.get("teacherToken");
  };

  const onSubmit = async (values, setSubmitting) => { // Add setSubmitting as a parameter
    try {
      const userAgent = navigator.userAgent;
      const apiUrl = "http://localhost:5000/api/v1/Teacher/login";
      const response = await axios.post(apiUrl, {
        email: values.TeacherEmail,
        password: values.TeacherPassword,
        userAgent: userAgent,
      });
      //Print Token to Console
      console.log("Response Data:", response.data.user.user);
      if (response.status === 200) {
        const tokenTeacher = response.data.user.user;
        setTokenCookie(tokenTeacher);

        setAuthHeader(tokenTeacher);

        console.log("Login successful");
        navigate("/Teacher_Homepage");
      } else {
        alert("Login failed. Invalid email or password.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert("An error occurred: " + error.message);
    } finally {
      setSubmitting(false);
    }
  };


  useEffect(() => {
    if (hasTokenCookie()) {
      const tokenStudent = Cookies.get("teacherToken");
      setAuthHeader(tokenStudent);
      navigate("/Teacher_Homepage");
    }
  }, []); // Empty dependency array ensures this effect runs once on component mount

  const {
    values,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
    isSubmitting,
  } = useFormik({
    initialValues: {
      TeacherEmail: "",
      TeacherPassword: "",
    },
    validationSchema: TeacherSchema, // Make sure to use consistent validation schema
    onSubmit: (values, { setSubmitting }) => onSubmit(values, setSubmitting), // Add setSubmitting
  });

  return (
    <div className="flex items-center justify-center min-h-screen background">
      <main className="w-full md:w-[80%] lg:w-[70%] xl:w-[60%] m-4 text-center grid grid-cols-[35%_65%]">
        <div className="grid grid-rows-[40%_15%_35%] text-white bg-[#252525] bg-opacity-95">
          <div className="flex items-center justify-center">
            <img
              className="object-cover w-fit h-[90%] m-0"
              src={logo}
              alt="Logo"
            />
          </div>

          <div>
            <h1 className="text-6xl font-bold font-reemkufifont">EDUPLAY</h1>
          </div>

          <div className="flex items-center justify-center">
            <img
              className="object-cover w-fit h-[90%]"
              src={boygirl}
              alt="Logo"
            />
          </div>
        </div>
        <section className="bg-[#f7d538] opacity-95 flex flex-row justify-center p-5">
          <div>
            <h2 className="mt-40 font-extrabold px-14 text-7xl font-expletus">
              Teacher
            </h2>
            <h1 className="font-extrabold mb-14 px-14 text-8xl font-expletus">
              Sign In
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="TeacherEmail" className={`block mb-2 text-xl font-semibold ${touched.TeacherEmail && errors.TeacherEmail ? "text-red-500" : ""}`}>
                  Email
                </label>
                <input
                  id="TeacherEmail"
                  name="TeacherEmail"
                  type="text"
                  className={`w-[100%] rounded-full flex p-4 px-10 mt-2 text-4xl bg-black text-white border-2 font-kumbh ${touched.TeacherEmail && errors.TeacherEmail ? "border-red-500" : ""}`}
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
                    className={`w-[100%] justify-center flex items-center rounded-full px-10 border-2 p-4 text-4xl bg-black text-white font-kumbh ${touched.TeacherPassword && errors.TeacherPassword ? "border-red-500" : ""}`}
                    value={values.TeacherPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={isSubmitting}
                  />
                  <span
                    className="absolute text-xl cursor-pointer top-7 right-5"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEye className="text-white" /> : <FaEyeSlash className="text-white" />}
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center mt-3">
                <div>
                  <label className="block font-bold text-gray-500">
                    <input className="leading-tight" type="checkbox" />
                    <span className="ml-1 text-lg">Remember me</span>
                  </label>
                </div>
                <div>
                  <Link
                    to="/Teacher_Send_Email"
                    className="inline-block text-lg font-bold text-blue-500 align-baseline hover:text-blue-800"
                  >
                    Forgot Password?
                  </Link>
                </div>
              </div>
              <button
                className="w-[80%] font-sourceSans3 text-center rounded-full p-4 mt-8 text-5xl bg-black shadow-lg hover:shadow-green-400 text-white placeholder-white font-bold"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing in..." : "Sign In"}
              </button>
            </form>
            <p className="pb-4 mt-2 text-2xl font-medium font-sourceSans3">
              Don't have an account?{" "}
              <Link
                to="/TeacherSignUp"
                className="font-bold font-sourceSans3 text-blue-500 hover:text-blue-800"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default TeacherLogin;
