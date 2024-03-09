import { IoChevronForwardCircleSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

function Admin_Homepage() {
  return (
    <main className="flex flex-col gap-5 p-5">
      <div className="backgroundRed rounded-xl hover:scale-[.99] transition-transform transform-gpu hover:neutral-blue-700 shadow-black shadow-xl">
        <div className="flex flex-col gap-2 sm:gap-6 p-4 sm:p-8 text-3xl font-semibold tracking-wider text-white sm:text-6xl font-sourceSans3">
          <h1>Manage</h1>
          <h1 className="ml-0 sm:ml-20">Student</h1>
          <h1 className="ml-0 sm:ml-40">Accounts</h1>
          <Link to="student-accounts">
            <button className="bg-[#ff5757] hover:bg-red-700 hover:shadow-lg hover:shadow-red-300 shadow-lg shadow-black flex items-center text-white font-bold py-2 px-4 ms-auto rounded-2xl hover:scale-[.99] transition-transform transform-gpu text-2xl sm:text-5xl">
              ACCOUNT MANAGEMENT
              <IoChevronForwardCircleSharp className="sm:text-6xl" />
            </button>
          </Link>
        </div>
      </div>

      <div className="backgroundGreen rounded-xl shadow-xl hover:shadow-green-500 shadow-black hover:scale-[.99] transition-transform transform-gpu">
        <div className="flex flex-col gap-2 sm:gap-6 p-4 sm:p-8 text-3xl font-semibold tracking-wider text-white sm:text-6xl font-sourceSans3">
          <h1>Manage</h1>
          <h1 className="ml-0 sm:ml-20">Teacher</h1>
          <h1 className="ml-0 sm:ml-40">Accounts</h1>
          <Link to="teacher-accounts">
            <button className="bg-green-700 hover:bg-green-800 hover:shadow-green-300 shadow-black flex items-center px-4 py-2 font-bold ms-auto text-white rounded-2xl shadow-lg sm:text-5xl text-2xl hover:scale-[.99] transition-transform transform-gpu">
              ACCOUNT MANAGEMENT
              <IoChevronForwardCircleSharp className="sm:text-6xl" />
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}

export default Admin_Homepage;
