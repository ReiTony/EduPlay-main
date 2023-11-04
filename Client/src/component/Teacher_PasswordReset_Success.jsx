import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import boygirl from "../assets/BoyAndGirl.png";

function Teacher_PasswordResset_Success() {
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
        <section className="bg-[#f7d538] opacity-95 flex flex-row  justify-center">
          <div>
            <h2 className="mt-40 font-extrabold px-14 text-7xl font-expletus">Teacher</h2>
            <h1 className="font-extrabold mb-14 px-14 text-8xl font-expletus">Sign In </h1>
            <div>
              <h3 className="text-4xl font-extrabold text-[#00a656] px-14 font-kumbh">You have successfully reset your password.</h3>
              <Link to="/TeacherLogin">
                <button className="w-[60%] font-sourceSans3 text-center rounded-full  p-4 mt-8 text-3xl bg-black shadow-lg hover:shadow-green-400 text-white placeholder-white font-bold" type="submit">
                  Back to Login
                </button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Teacher_PasswordResset_Success;
