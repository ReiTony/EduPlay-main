import React from "react";
import logo from "../assets/logo.png";
import boygirl from "../assets/BoyAndGirl.png";
import { useFormik } from "formik";
import { TeacherSchema } from "../SchemaValidation";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function TeacherLogin() {
  const navigate = useNavigate();

  const setAuthHeader = (token) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  };

  const onSubmit = async (values) => {
    try {
      // Get the user agent string
      const userAgent = navigator.userAgent;

      // Set the JWT token in Axios headers before making the request
      setAuthHeader();

      // Replace this URL with the actual API endpoint of your backend
      const apiUrl = "http://localhost:5000/api/v1/Teacher/login";

      const response = await axios.post(apiUrl, {
        email: values.TeacherEmail,
        password: values.TeacherPassword,
        userAgent: userAgent, // Include the userAgent field
      });

      if (response.status === 200) {
        const tokenTeacher = response.data.user.accessToken; // Get the access token from the response

        // Set the JWT token in Axios headers before making future requests
        setAuthHeader(tokenTeacher);

        console.log("Login successful");
        console.log(tokenTeacher);
        navigate("/Teacher_Homepage");
      } else {
        alert("Login failed. Invalid email or password.");
      }
    } catch (error) {
      console.error("An error occurred:", error);

      // Display the error message to the user or handle it as needed
      alert("An error occurred: " + error.message);
    }
  };

  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: {
        TeacherEmail: "",
        TeacherPassword: "",
      },
      validationSchema: TeacherSchema,
      onSubmit: (values) => onSubmit(values, navigate),
    });

  return (
    <div className="flex items-center justify-center min-h-screen background">
      <main className="w-full md:w-[80%] lg:w-[70%] xl:w-[60%] m-4 text-center grid grid-cols-[35%_65%]">
        <div className="grid grid-rows-[40%_15%_35%] text-white bg-[#252525] bg-opacity-95">
          <div className="flex items-center justify-center">
            <img
              className="object-cover w-fit h-[90%] m-0 "
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
        <section className="bg-[#f7d538] opacity-95 flex flex-row justify-center">
          <div className="text-center">
            <h2 className="font-extrabold mt-36 text-7xl font-expletus">
              Teacher
            </h2>
            <h1 className="font-extrabold mb-14 text-8xl font-expletus">
              SIGN IN
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <input
                  className={`w-[100%] rounded-full flex p-4 px-10 mt-8 text-4xl bg-black text-white border-2 placeholder-white font-kumbh ${
                    touched.TeacherEmail && errors.TeacherEmail
                      ? "border-red-500 shadow-lg shadow-red-500"
                      : ""
                  }`}
                  name="TeacherEmail"
                  type="text"
                  placeholder="Email"
                  value={values.TeacherEmail}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              <div className="mb-6">
                <input
                  className={`w-[100%] rounded-full flex p-4 px-10 mt-4 text-4xl bg-black text-white border-2 placeholder-white font-kumbh ${
                    touched.TeacherPassword && errors.TeacherPassword
                      ? "border-red-500 shadow-lg shadow-red-500"
                      : ""
                  }`}
                  id="TeacherPassword"
                  type="password"
                  placeholder="Password"
                  value={values.TeacherPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
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
              >
                SIGN IN
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
