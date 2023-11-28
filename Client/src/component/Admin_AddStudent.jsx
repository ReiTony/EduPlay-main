import { useState } from "react";
import { IoArrowBackCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ErrorModal from "./ErrorModal";

function Admin_AddStudent() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [gradeLevel, setGradeLevel] = useState("1");
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${import.meta.env.VITE_API}teacher/addStudent`, { firstName, lastName, birthDay: birthDay.toString().padStart(2, "0"), birthMonth: birthMonth.toString().padStart(2, "0"), gradeLevel })
      .then((res) => navigate("/admin/student-accounts"))
      .catch((err) => setIsErrorModalOpen(true));
  };

  return (
    <>
      <header className="bg-[#d8cccc] rounded-full shadow-md text-4xl font-reemkufifont font-bold mx-4 p-4 px-6">
        <h1>STUDENT ACCOUNT MANAGEMENT</h1>
      </header>

      <main className="flex-grow bg-[#d8cccc] shadow-md rounded-3xl p-5 mx-4 my-3">
        <button className="flex flex-row items-center gap-2 bg-[#282424] shadow-md rounded-full font-bold text-white text-2xl me-auto mb-3 px-6 py-2" onClick={() => navigate(-1)}>
          <IoArrowBackCircle />
          BACK
        </button>

        <h1 className="font-bold font-reemkufifont lg:text-4xl">REGISTERED USERS - ADD STUDENT</h1>
        <div>
          <h1 className="p-10 font-bold lg:text-4xl">Fill in the information:</h1>
        </div>
        <form>
          <div className="grid gap-10 font-semibold lg:text-3xl lg:grid-cols-2">
            <div className="flex-col">
              <div className="flex items-center justify-center">
                <label htmlFor="firstName" className="pr-2 text-right">
                  First Name:
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => e.target.value.length <= 15 && setFirstName(e.target.value)}
                  id="firstName"
                  name="firstName"
                  placeholder="Enter First Name"
                  className="px-4 py-2 lg:w-[400px] rounded-full lg:mx-4 border-4 border-l-8 border-r-8 border-black"
                />
              </div>
            </div>
            <div className="flex-col">
              <div className="flex items-center justify-center">
                <label htmlFor="lastName" className="pr-2 text-right lg:ml-5">
                  Last Name:
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => e.target.value.length <= 15 && setLastName(e.target.value)}
                  id="lastName"
                  name="lastName"
                  placeholder="Enter Last Name"
                  className="px-4 py-2 lg:w-[400px] border-4 border-l-8 border-r-8 border-black rounded-full lg:mx-4"
                />
              </div>
            </div>
            <div className="flex-col">
              <div className="flex items-center justify-center">
                <label htmlFor="birthDay" className="pr-2 ml-5 text-right">
                  Birth Day:
                </label>
                <input
                  type="number"
                  value={birthDay}
                  onChange={(e) => ((e.target.value <= 31 && e.target.value >= 1) || e.target.value === "") && setBirthDay(e.target.value)}
                  id="birthDay"
                  name="birthDay"
                  className="px-4 py-2 lg:w-[400px] border-4 border-l-8 border-r-8 border-black rounded-full lg:mx-4"
                />
              </div>
            </div>
            <div className="flex-col">
              <div className="flex items-center justify-center">
                <label htmlFor="birthMonth" className="pr-2 ml-5 text-right">
                  Birth Month:
                </label>
                <input
                  type="number"
                  value={birthMonth}
                  onChange={(e) => ((e.target.value <= 12 && e.target.value >= 1) || e.target.value === "") && setBirthMonth(e.target.value)}
                  id="birthMonth"
                  name="birthMonth"
                  className="px-4 py-2 lg:w-[400px] border-4 border-l-8 border-r-8 border-black rounded-full lg:mx-4"
                />
              </div>
            </div>
            <div className="flex items-center justify-center">
              <label htmlFor="gradeLevel" className="pr-2 text-right">
                Grade Level:
              </label>
              <select value={gradeLevel} onChange={(e) => setGradeLevel(e.target.value)} className="px-4 py-2 lg:w-[400px] border-4 border-l-8 border-r-8 border-black rounded-full lg:mx-4">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>
          </div>
          <div className="flex justify-center p-5">
            <button
              type="submit"
              onClick={handleSubmit}
              className="px-10 py-2 text-3xl font-bold text-white bg-[#282424] rounded-full shadow-lg hover:brightness-90 shadow-black hover:scale-[.98] transition-transform transform-gpu">
              ADD
            </button>
          </div>
        </form>
      </main>
      <ErrorModal show={isErrorModalOpen} onHide={() => setIsErrorModalOpen(false)} errorInfo={"The student you are trying to add already exists."} />
    </>
  );
}

export default Admin_AddStudent;
