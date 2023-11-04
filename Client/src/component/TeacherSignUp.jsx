import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import boygirl from "../assets/BoyAndGirl.png";
import { useFormik } from "formik";
import { TeacherSignUpSchema } from "../SchemaValidation";

const TeacherSignUp = () => {
  const navigate = useNavigate();
  const { values, errors, handleBlur, handleChange, handleSubmit, touched } = useFormik({
    initialValues: { password: "", confirmPassword: "" },
    validationSchema: TeacherSignUpSchema,
    onSubmit: (values) => onSubmit(values, navigate),
  });

  const onSubmit = (values) => {
    navigate("/TeacherLogin");
  };

  return (
    <div className="flex items-center justify-center min-h-screen background ">
      <main className="w-full md:w-[80%] lg:w-[70%] xl:w-[60%] m-4 text-center   grid grid-cols-[35%_65%] ">
        <div className="grid grid-rows-[40%_15%_35%] text-white bg-[#252525] bg-opacity-95  ">
          <div className="flex items-center justify-center">
            <img className="object-cover w-fit h-[90%] m-0 " src={logo} alt="Logo" />
          </div>

          <div>
            <h1 className="text-6xl font-bold font-reemkufifont">EDUPLAY</h1>
          </div>

          <div className="flex items-center justify-center">
            <img className="object-cover w-fit h-[90%]" src={boygirl} alt="Logo" />
          </div>
        </div>

        <div className="bg-[#f7d538] opacity-95 flex flex-row  px-14 justify-center">
          <div>
            <h1 className="mt-24 font-extrabold px-14 text-8xl text-[#252525] font-expletus">SIGN UP </h1>
            <div>
              <form action="" onSubmit={handleSubmit}>
                <div className="flex justify-center gap-2 mt-8">
                  {/* First Name input */}
                  <input
                    className={`w-[100%] rounded-full flex p-4 px-10 text-4xl border-2 bg-[#252525] text-white placeholder-white font-kumbh
                                    ${touched.fname && errors.fname ? "border-red-500 shadow-lg shadow-red-500" : ""}`}
                    id="fname"
                    type="text"
                    placeholder="First Name"
                    name="fname"
                    value={values.fname}
                    onChange={handleChange}
                    onBlur={handleBlur}></input>

                  {/* Last Name input */}
                  <input
                    className={`w-[100%] justify-center p-4 px-10 flex items-center rounded-full border-2 text-4xl bg-[#252525] text-white placeholder-white font-kumbh
                                    ${touched.lname && errors.lname ? "border-red-500 shadow-lg shadow-red-500" : ""}`}
                    id="lname"
                    type="text"
                    placeholder="Last Name"
                    name="lname"
                    value={values.lname}
                    onChange={handleChange}
                    onBlur={handleBlur}></input>
                </div>

                {/* Email input */}
                <input
                  className={`w-[100%] justify-center mt-4 p-4  px-10 flex items-center rounded-full     text-4xl bg-[#252525] text-white placeholder-white font-kumbh
                                ${touched.email && errors.email ? "border-red-500 shadow-lg shadow-red-500" : ""}`}
                  id="email"
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}></input>

                {/* Password input */}
                <input
                  className={`w-[100%] justify-center mt-4 p-4 px-10 flex items-center rounded-full     text-4xl bg-[#252525] text-white placeholder-white font-kumbh
                                ${touched.password && errors.password ? "border-red-500 shadow-lg shadow-red-500" : ""}`}
                  id="password"
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}></input>

                {/* Confirm Password input */}
                <input
                  className={`w-[100%] justify-center mt-4 p-4 px-10 flex items-center rounded-full     text-4xl bg-[#252525] text-white placeholder-white font-kumbh
                                ${touched.confirmPassword && errors.confirmPassword ? "border-red-500 shadow-lg shadow-red-500" : ""}`}
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm Password "
                  name="confirmPassword"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}></input>

                {/* Sign-up button */}
                <button className="w-[50%] font-sourceSans3 text-center rounded-full p-2  mt-10 text-5xl bg-[#252525]  shadow-lg  text-white placeholder-white font-bold" type="submit">
                  SIGN UP
                </button>
              </form>

              {/* Sign-in link */}
              <p className="pb-4 mt-4 text-2xl font-medium font-sourceSans3">
                Already have an account?{" "}
                <Link to="/TeacherLogin" className="font-bold underline font-sourceSans3 ">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TeacherSignUp;
