import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function Teacher_EditStudent() {
  const navigate = useNavigate();
  const { accountId } = useParams();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gradeLevel, setGrade] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [birthMonth, setBirthMonth] = useState("");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API}teacher/showStudent/${accountId}`)
      .then((res) => {
        const { firstName, lastName, gradeLevel, birthDay, birthMonth } = res.data.student;
        setFirstName(firstName);
        setLastName(lastName);
        setGrade(gradeLevel);
        setBirthDay(birthDay);
        setBirthMonth(birthMonth);
      })
      .catch((err) => alert(err.message));
  }, []);

  const handleSave = async () => {
    axios
      .patch(`${import.meta.env.VITE_API}teacher/updateStudent/${accountId}`, { firstName, lastName, gradeLevel, birthDay: birthDay.toString().padStart(2, "0"), birthMonth: birthMonth.toString().padStart(2, "0") })
      .then((res) => navigate(-1))
      .catch((err) => alert(err.message));
  };

  return (
    <div className="flex flex-col flex-grow gap-4 p-4 ">
      <header className="gap-3 p-4 text-4xl font-bold text-white backgroundRed rounded-3xl font-reemkufifont ">
        <h1>ACCOUNT MANAGEMENT</h1>
      </header>
      <div className="flex flex-col gap-4 p-5 text-3xl font-bold shadow-xl backgroundRed rounded-3xl shadow-red-300">
        <div className="text-4xl font-bold text-white font-sourceSans3">REGISTERED USERS - EDIT STUDENT</div>

        <div className="flex flex-row items-center gap-4 mt-6">
          <label htmlFor="firstname" className="text-white">First Name:</label>
          <input type="text" className="px-4 py-1 border-2 border-red-300 rounded-full focus:outline-none focus:border-red-400 focus:shadow-md focus:shadow-red-300" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" id="firstname" />
        </div>

        <div className="flex flex-row items-center gap-4">
          <label htmlFor="lastname" className="text-white">Last Name:</label>
          <input type="text" className="px-4 py-1 border-2 border-red-300 rounded-full focus:outline-none focus:border-red-400 focus:shadow-md focus:shadow-red-300" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" id="lastname" />
        </div>

        <div className="flex flex-row items-center gap-4">
          <label htmlFor="gradelevel" className="text-white">Grade:</label>
          <input type="number" className="px-4 py-1 border-red-300 border-2 rounded-full lg:ml-[4rem] focus:outline-none focus:border-red-400 focus:shadow-md focus:shadow-red-300" value={gradeLevel} onChange={(e) => setGrade(e.target.value)} placeholder="Grade" id="gradelevel" min="1" max="3" />
        </div>

        <div className="flex flex-row items-center gap-4">
          <label className="text-white">Birth Date:</label>
          <select className="px-4 py-1 border-2 border-red-300 rounded-full" value={birthMonth} onChange={(e) => setBirthMonth(e.target.value)}>
            {months.map((i, ind) => (
              <option className="px-4 py-1 border-2 border-red-300 rounded-full focus:outline-none focus:border-red-400 focus:shadow-md focus:shadow-red-300" value={ind + 1} key={ind}>
                {i}
              </option>
            ))}
          </select>
          <input type="number" className="px-4 py-1 border-2 border-red-300 rounded-full w-28 focus:outline-none focus:border-red-400 focus:shadow-md focus:shadow-red-300" value={birthDay} onChange={(e) => setBirthDay(e.target.value)} placeholder="Birth Day" />
        </div>

        <div className="flex flex-row justify-center gap-4">
          <button className="bg-[#d00c24] rounded-full shadow-md text-white px-8 py-2 hover:brightness-90  hover:bg-red-700 hover:shadow-lg hover:shadow-red-300 shadow-black hover:scale-[.98] transition-transform transform-gpu" onClick={() => navigate(-1)}>
            CANCEL
          </button>
          <button className="  text-white px-8 py-2  bg-green-500 rounded-full shadow-lg hover:brightness-90 shadow-black hover:scale-[.98] transition-transform transform-gpu hover:shadow-green-300" onClick={handleSave}>
            SAVE
          </button>
        </div>
      </div>
    </div>
  );
}

export default Teacher_EditStudent;

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
