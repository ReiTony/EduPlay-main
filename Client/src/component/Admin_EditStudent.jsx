import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoArrowBackCircle } from "react-icons/io5";
import axios from "axios";

function Admin_EditStudent() {
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
    <div className="flex flex-col flex-grow font-bold">
      <h1 className="backgroundRed text-white mx-1 sm:mx-4 rounded-2xl gap-3 p-4 text-2xl sm:text-4xl font-reemkufifont">STUDENT ACCOUNT MANAGEMENT</h1>

      <main className="backgroundRed text-white flex flex-col flex-grow text-xl sm:text-3xl p-2 sm:p-5 mx-1 sm:mx-4 my-2 rounded-lg">
        <button className="flex flex-row items-center gap-2 bg-[#ff5757] shadow-md rounded-xl font-bold text-white text-2xl me-auto mb-3 px-6 py-2" onClick={() => navigate(-1)}>
          <IoArrowBackCircle />
          BACK
        </button>
        <h1 className="font-bold font-reemkufifont text-4xl">REGISTERED USERS - EDIT STUDENT</h1>

        <div className="flex flex-col gap-2 font-sourceSans3 text-2xl ms-0 sm:ms-8 mt-8">
          <div className="flex flex-row items-center gap-4">
            <label htmlFor="firstname">First Name:</label>
            <input
              type="text"
              className="px-4 py-1 border-2 w-full border-black rounded-full focus:shadow-md text-black"
              style={{ maxWidth: "300px" }}
              value={firstName}
              onChange={(e) => e.target.value.length <= 20 && setFirstName(e.target.value)}
              placeholder="First Name"
              id="firstname"
            />
          </div>

          <div className="flex flex-row items-center gap-4">
            <label htmlFor="lastname">Last Name:</label>
            <input
              type="text"
              style={{ maxWidth: "300px" }}
              className="px-4 py-1 border-2 w-full border-black rounded-full focus:outline-none focus:shadow-md text-black"
              value={lastName}
              onChange={(e) => e.target.value.length <= 20 && setLastName(e.target.value)}
              placeholder="Last Name"
              id="lastname"
            />
          </div>

          <div className="flex flex-row items-center gap-4">
            <label htmlFor="gradelevel">Grade:</label>
            <input
              type="number"
              style={{ maxWidth: "75px" }}
              className="px-4 py-1 border-black w-full border-2 rounded-full focus:outline-none focus:shadow-md text-black"
              value={gradeLevel}
              onChange={(e) => setGrade(e.target.value)}
              placeholder="Grade"
              id="gradelevel"
              min="1"
              max="3"
            />
          </div>

          <div className="flex flex-row items-center gap-4">
            <label>Birth Date:</label>
            <select className="px-4 py-1 border-2 border-black w-full max-w-[200px] rounded-full text-black" value={birthMonth} onChange={(e) => setBirthMonth(e.target.value)}>
              {months.map((i, ind) => (
                <option className="px-4 py-1 border-2 border-black rounded-full focus:outline-none focus:shadow-md" value={ind + 1} key={ind}>
                  {i}
                </option>
              ))}
            </select>
            <input type="number" className="px-4 py-1 border-2 border-black rounded-full w-full max-w-[75px] focus:outline-none focus:shadow-md text-black" value={birthDay} onChange={(e) => setBirthDay(e.target.value)} placeholder="Birth Day" />
          </div>

          <div className="flex flex-row justify-center gap-4 mt-6">
            <button
              className="bg-[#d00c24] rounded-full shadow-md text-white px-8 py-2 hover:brightness-90 hover:bg-red-700 hover:shadow-lg hover:shadow-red-300 shadow-black hover:scale-[.98] transition-transform transform-gpu"
              onClick={() => navigate(-1)}
            >
              CANCEL
            </button>
            <button className="text-white px-8 py-2 bg-green-500 rounded-full shadow-lg hover:brightness-90 shadow-black hover:scale-[.98] transition-transform transform-gpu hover:shadow-green-300" onClick={handleSave}>
              SAVE
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Admin_EditStudent;

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
