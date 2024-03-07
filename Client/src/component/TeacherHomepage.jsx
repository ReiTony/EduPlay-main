import { IoChevronForwardCircleSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

function TeacherHomepage() {
  return (
    <main className="flex flex-col gap-5 p-5">
      <div className="backgroundRed rounded-xl shadow-xl hover:shadow-red-500 shadow-black hover:scale-[.99] transition-transform transform-gpu">
        <div className="flex flex-col gap-2 sm:gap-6 p-4 sm:p-8 text-3xl font-semibold tracking-wider text-white sm:text-6xl font-sourceSans3">
          <h1>Manage </h1>
          <h1 className="ml-0 sm:ml-20">Accounts and</h1>
          <h1 className="ml-0 sm:ml-40">Information</h1>
          <Link to="/teacher/accounts">
            <button className="bg-[#ff5757] hover:bg-red-700 hover:shadow-lg hover:shadow-red-300 shadow-lg shadow-black flex items-center text-white font-bold py-2 px-4 ms-auto rounded-2xl hover:scale-[.99] transition-transform transform-gpu text-2xl sm:text-5xl">
              ACCOUNT MANAGEMENT
              <IoChevronForwardCircleSharp className="sm:text-6xl" />
            </button>
          </Link>
        </div>
      </div>

      <div className="backgroundBlue rounded-xl shadow-xl hover:shadow-blue-700 shadow-black hover:scale-[.99] transition-transform transform-gpu">
        <div className="flex flex-col gap-2 sm:gap-6 p-4 sm:p-8 text-3xl font-semibold tracking-wider text-white sm:text-6xl font-sourceSans3">
          <h1>Combine </h1>
          <h1 className="ml-0 sm:ml-20">Fun with</h1>
          <h1 className="ml-0 sm:ml-40">Knowledge</h1>
          <Link to="/teacher/accounts">
            <button className="bg-[#5271ff] hover:bg-[#2047f1] shadow-lg shadow-black hover:shadow-blue-300 flex items-center text-white font-bold py-2 px-4 ms-auto rounded-2xl hover:scale-[.99] transition-transform transform-gpu text-2xl sm:text-5xl">
              LEARNING GROUP
              <IoChevronForwardCircleSharp className="sm:text-6xl" />
            </button>
          </Link>
        </div>
      </div>

      <div className="backgroundGreen rounded-xl shadow-xl hover:shadow-green-500 shadow-black hover:scale-[.99] transition-transform transform-gpu">
        <div className="flex flex-col gap-2 sm:gap-6 p-4 sm:p-8 text-3xl font-semibold tracking-wider text-white sm:text-6xl font-sourceSans3">
          <h1>Creating</h1>
          <h1 className="ml-0 sm:ml-20">the Ultimate</h1>
          <h1 className="ml-0 sm:ml-40">Challenge</h1>
          <Link to="/teacher/assessments">
            <button className="bg-green-700 hover:bg-green-800 hover:shadow-green-300 shadow-black flex items-center px-4 py-2 font-bold ms-auto text-white rounded-2xl shadow-lg sm:text-5xl text-2xl hover:scale-[.99] transition-transform transform-gpu">
              CUSTOM ASSESSMENT
              <IoChevronForwardCircleSharp className="sm:text-6xl" />
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}

export default TeacherHomepage;
