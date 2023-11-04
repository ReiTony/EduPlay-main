import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import boygirl from "../assets/BoyAndGirl.png";
import { useFormik } from "formik";
import { studentSchema } from "../SchemaValidation";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import NavBar from "./NavBar";

function Student_Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("userId") && localStorage.getItem("userType") === "student") navigate("/student");
  }, []);

  const onSubmit = async (values, setSubmitting) => {
    try {
      const body = { username: values.username, password: values.password };
      let temp = await axios.post(`${import.meta.env.VITE_API}student/login`, body, { withCredentials: true });
      localStorage.setItem("userId", temp.data.user.user.userId);
      temp = await axios.get(`${import.meta.env.VITE_API}student/${temp.data.user.user.userId}`, { withCredentials: true });
      localStorage.setItem("gradeLevel", temp.data.gradeLevel);
      localStorage.setItem("userType", "student");
      navigate("/student");
    } catch (error) {
      alert(error.message);
    }
  };

  const { values, errors, handleBlur, handleChange, handleSubmit, touched, isSubmitting } = useFormik({
    initialValues: { username: "", password: "" },
    validationSchema: studentSchema,
    onSubmit: (values, { setSubmitting }) => onSubmit(values, setSubmitting),
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

        <section className="bg-[#f7d538] opacity-95 flex flex-col gap-14 justify-center px-16 py-4">
          <h2 className="font-extrabold px-14 text-6xl font-expletus my-8">Student Login</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username" className={`block mb-2 text-xl font-semibold ${touched.username && errors.username ? "text-red-500" : ""}`}>
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              className={`w-[100%] rounded-full flex p-4 px-10 mt-2 text-xl bg-black text-white border-2 font-kumbh ${touched.username && errors.username ? "border-red-500 " : ""}`}
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
                className={`w-[100%] justify-center flex items-center rounded-full px-10 border-2 p-4 text-xl bg-black text-white font-kumbh ${touched.password && errors.password ? "border-red-500 " : ""}`}
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isSubmitting}
              />
              <span className="absolute text-xl cursor-pointer top-7 right-5 " onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEye className="text-white" /> : <FaEyeSlash className="text-white" />}
              </span>
            </div>
            <div className="flex mt-4">
              <label className="block font-bold text-gray-500 ms-4">
                <input className="leading-tight" type="checkbox" />
                <span className="ms-2 text-xl">Remember me</span>
              </label>
            </div>
            <button
              className="font-sourceSans3 text-center rounded-full px-12 py-3 mt-4 text-2xl bg-black shadow-lg hover:shadow-green-400 text-white placeholder-white font-bold transition duration-300 ease-in-out transform hover:scale-105"
              type="submit"
              disabled={isSubmitting}>
              {isSubmitting ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}

export default Student_Login;
