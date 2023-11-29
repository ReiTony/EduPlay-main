import { IoChevronForwardCircleSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function Admin_Homepage() {
  const navigate = useNavigate();

  return (
    <main className="flex flex-col gap-5 p-5">
      <div className="bg-[#d8cccc] h-[24rem] relative rounded-3xl hover:scale-[.99] transition-transform transform-gpu hover:neutral-blue-700 shadow-black shadow-xl">
        <div className="absolute p-8 text-3xl font-bold tracking-wider text-white lg:text-6xl font-sourceSans3">
          <h1>Manage</h1>
          <br />
          <h1 className="ml-20">Student</h1>
          <br />
          <h1 className="ml-40">Accounts</h1>
        </div>
        <div className="absolute bottom-0 right-0 p-4">
          <button
            className="bg-[#282424] hover:bg-neutral-700 hover:shadow-lg hover:shadow-neutral-300 shadow-lg shadow-black flex items-center lg:text-5xl text-white  font-bold py-2 px-4 rounded-full hover:scale-[.99] transition-transform transform-gpu"
            onClick={() => navigate("student-accounts")}>
            <div>ACCOUNT MANAGEMENT</div>
            <IoChevronForwardCircleSharp className="lg:text-6xl " />
          </button>
        </div>
      </div>

      <div className="bg-[#d8cccc] h-[24rem] relative rounded-3xl hover:scale-[.99] transition-transform transform-gpu hover:neutral-blue-700 shadow-black shadow-xl">
        <div className="absolute p-8 text-3xl font-bold tracking-wider text-white lg:text-6xl font-sourceSans3">
          <h1>Manage </h1>
          <br />
          <h1 className="ml-20">Teacher</h1>
          <br />
          <h1 className="ml-40">Accounts</h1>
        </div>
        <div className="absolute bottom-0 right-0 p-4">
          <button
            className="bg-[#282424] hover:bg-neutral-700 shadow-lg shadow-black hover:shadow-neutral-300 flex items-center lg:text-5xl text-white  font-bold py-2 px-4 rounded-full hover:scale-[.99] transition-transform transform-gpu"
            onClick={() => navigate("teacher-accounts")}>
            <div>ACCOUNT MANAGEMENT</div>
            <IoChevronForwardCircleSharp className="lg:text-6xl " />
          </button>
        </div>
      </div>
    </main>
  );
}

export default Admin_Homepage;
