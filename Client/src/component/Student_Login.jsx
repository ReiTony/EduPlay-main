import React, { useState, useEffect } from "react";
import Cookies from "js-cookie"; // Import the js-cookie library
import logo from "../assets/logo.png";
import boygirl from "../assets/BoyAndGirl.png";
import { useFormik } from "formik";
import { studentSchema } from "../SchemaValidation";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from "axios";

function Student_Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const setAuthHeader = (token) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  };

  // Add a function to set a cookie with a JWT token
  const setTokenCookie = (token) => {
    // Set an HTTPOnly cookie with the token
    Cookies.set("studentToken", JSON.stringify(token), { secure: true, sameSite: "none" });
  };

  // Add a function to check if the token cookie exists
  const hasTokenCookie = () => {
    return !!Cookies.get("studentToken");
  };

  const onSubmit = async (values, setSubmitting) => {
    try {
      const userAgent = navigator.userAgent;
      const apiUrl = "http://localhost:5000/api/v1/Student/login";

      const response = await axios.post(apiUrl, {
        username: values.username,
        password: values.password,
        userAgent: userAgent,
      });

      console.log("Response Data:", response.data.user.user);

      if (response.status === 200) {
        // Store the JWT token as a cookie
        const tokenStudent = response.data.user.user;
        setTokenCookie(tokenStudent);

        // Set the Authorization header for Axios
        setAuthHeader(tokenStudent);

        // Redirect to the student homepage
        navigate("/Student");
      } else {
        // Display an error message to the user
        alert("Login failed. Invalid username or password.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert("An error occurred: " + error.message);
    } finally {
      setSubmitting(false); // Reset the form submission state
    }
  };

  // Check if a token cookie exists when the component mounts
  useEffect(() => {
    if (hasTokenCookie()) {
      const tokenStudent = Cookies.get("studentToken");
      setAuthHeader(tokenStudent);
      navigate("/Student");
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
      username: "",
      password: "",
    },
    validationSchema: studentSchema,
    onSubmit: (values, { setSubmitting }) => onSubmit(values, setSubmitting),
  });

  return (
    <div className="flex items-center justify-center min-h-screen background">
  <main className="w-full md:w-[80%] lg:w-[70%] xl:w-[60%] m-4 text-center grid grid-cols-[35%_65%]">
    <div className="grid grid-rows-[40%_15%_35%] text-white bg-[#252525] bg-opacity-95  ">
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
        <h1 className="mt-40 font-extrabold px-14 text-7xl font-expletus">
          Student Login
        </h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username" className={`block mb-2 text-xl font-semibold ${touched.username && errors.username ? "text-red-500" : ""}`}>
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            className={`w-[100%] rounded-full flex p-4 px-10 mt-4 text-4xl bg-black text-white border-2  font-kumbh ${touched.username && errors.username ? "border-red-500 " : ""}`}
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
          />
          <label htmlFor="password" className={`block mt-4 mb-2 text-xl font-semibold ${touched.password && errors.password ? "text-red-500" : ""}`}>
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              className={`w-[100%] justify-center flex items-center rounded-full px-10 border-2 p-4 text-4xl bg-black text-white  font-kumbh ${touched.password && errors.password ? "border-red-500 " : ""
                }`}
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting}
            />
            <span
              className="absolute text-xl cursor-pointer top-7 right-5 "
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEye className="text-white" /> : <FaEyeSlash className="text-white" />}
            </span>
          </div>
          <div className="flex mt-4">
            <label className="block font-bold text-gray-500 ">
              <input className="leading-tight" type="checkbox" />
              <span className="ml-1 text-lg">Remember me</span>
            </label>
          </div>
          <button
            className="w-[80%] font-sourceSans3 text-center rounded-full p-4 mt-4 text-5xl bg-black shadow-lg hover:shadow-green-400 text-white placeholder-white font-bold transition duration-300 ease-in-out transform hover:scale-105"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </section>
  </main>
</div>
  );
}

export default Student_Login;
