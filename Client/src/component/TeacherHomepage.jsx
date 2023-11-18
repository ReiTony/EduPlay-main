import { IoChevronForwardCircleSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

function TeacherHomepage() {
  return (
    <main className="flex flex-col gap-5 p-5">
      <div className="backgroundRed h-[24rem] relative rounded-xl shadow-xl hover:shadow-red-500 shadow-black hover:scale-[.99] transition-transform transform-gpu">
        <div className="absolute p-8 text-3xl font-bold tracking-wider text-white lg:text-6xl font-sourceSans3">
          <h1>Manage </h1>
          <br />
          <h1 className="ml-20">Accounts and</h1>
          <br />
          <h1 className="ml-40">Information</h1>
        </div>
        <div className="absolute bottom-0 right-0 p-4">
          <Link to="/teacher/accounts">
            <button className="bg-[#ff5757] hover:bg-red-700 hover:shadow-lg hover:shadow-red-300 shadow-lg shadow-black flex items-center lg:text-5xl text-white  font-bold py-2 px-4 rounded-full hover:scale-[.99] transition-transform transform-gpu">
              <div>ACCOUNT MANAGEMENT</div>
              <IoChevronForwardCircleSharp className="lg:text-6xl " />
            </button>
          </Link>
        </div>
      </div>

      <div className="backgroundBlue h-[24rem] relative rounded-xl hover:scale-[.99] transition-transform transform-gpu hover:shadow-blue-700 shadow-black shadow-xl">
        <div className="absolute p-8 text-3xl font-bold tracking-wider text-white lg:text-6xl font-sourceSans3">
          <h1>Combine </h1>
          <br />
          <h1 className="ml-20">Fun with</h1>
          <br />
          <h1 className="ml-40">Knowledge</h1>
        </div>
        <div className="absolute bottom-0 right-0 p-4">
          <a href="/teacher/learning-group">
            <button className="bg-[#5271ff] hover:bg-[#2047f1] shadow-lg shadow-black hover:shadow-blue-300 flex items-center lg:text-5xl text-white  font-bold py-2 px-4 rounded-full hover:scale-[.99] transition-transform transform-gpu">
              <div>LEARNING GROUP</div>
              <IoChevronForwardCircleSharp className="lg:text-6xl " />
            </button>
          </a>
        </div>
      </div>

      <div className="backgroundGreen h-[24rem] relative rounded-xl  hover:scale-[.99] transition-transform transform-gpu shadow-xl shadow-black hover:shadow-green-500">
        <div className="absolute p-8 text-3xl font-bold tracking-wider text-white lg:text-6xl font-sourceSans3">
          <h1>Creating</h1> <br />
          <h1 className="ml-20">the Ultimate</h1> <br />
          <h1 className="ml-40">Challenge</h1>
        </div>
        <div className="absolute bottom-0 right-0 p-4">
          <a href="/teacher/assessments">
            <button className="flex items-center px-4 py-2 font-bold text-white bg-green-700 rounded-full shadow-lg hover:bg-green-800 hover:shadow-green-300 shadow-black lg:text-5xl hover:scale-[.99] transition-transform transform-gpu">
              <div>CUSTOM ASSESSMENT</div>
              <IoChevronForwardCircleSharp className="lg:text-6xl" />
            </button>
          </a>
        </div>
      </div>
    </main>
  );
}

export default TeacherHomepage;
