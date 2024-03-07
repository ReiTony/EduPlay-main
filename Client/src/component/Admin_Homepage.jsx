import { IoChevronForwardCircleSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Admin_Homepage() {
  const navigate = useNavigate();

  return (
    // <main className="flex flex-col gap-5 p-5">
    //   <div className="backgroundRed rounded-xl shadow-xl hover:shadow-red-500 shadow-black hover:scale-[.99] transition-transform transform-gpu">
    //     <div className="flex flex-col gap-2 sm:gap-6 p-4 sm:p-8 text-3xl font-semibold tracking-wider text-white sm:text-6xl font-sourceSans3">

    <main className="flex flex-col gap-5 p-5">
      <div className="bg-[#d8cccc] rounded-xl hover:scale-[.99] transition-transform transform-gpu hover:neutral-blue-700 shadow-black shadow-xl">
        <div className="flex flex-col gap-2 sm:gap-6 p-4 sm:p-8 text-3xl font-semibold tracking-wider text-white sm:text-6xl font-sourceSans3">
          <h1>Manage</h1>
          <h1 className="ml-0 sm:ml-20">Student</h1>
          <h1 className="ml-0 sm:ml-40">Accounts</h1>
          <Link to="student-accounts">
            <button className="bg-[#282424] hover:bg-neutral-700 hover:shadow-lg hover:shadow-neutral-300 shadow-lg shadow-black flex items-center text-white font-bold py-2 px-4 ms-auto rounded-2xl hover:scale-[.99] transition-transform transform-gpu text-2xl sm:text-5xl">
              ACCOUNT MANAGEMENT
              <IoChevronForwardCircleSharp className="sm:text-6xl" />
            </button>
          </Link>
        </div>
      </div>

      <div className="bg-[#d8cccc] rounded-xl hover:scale-[.99] transition-transform transform-gpu hover:neutral-blue-700 shadow-black shadow-xl">
        <div className="flex flex-col gap-2 sm:gap-6 p-4 sm:p-8 text-3xl font-semibold tracking-wider text-white sm:text-6xl font-sourceSans3">
          <h1>Manage</h1>
          <h1 className="ml-0 sm:ml-20">Teacher</h1>
          <h1 className="ml-0 sm:ml-40">Accounts</h1>
          <Link to="teacher-accounts">
            <button className="bg-[#282424] hover:bg-neutral-700 hover:shadow-lg hover:shadow-neutral-300 shadow-lg shadow-black flex items-center text-white font-bold py-2 px-4 ms-auto rounded-2xl hover:scale-[.99] transition-transform transform-gpu text-2xl sm:text-5xl">
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
