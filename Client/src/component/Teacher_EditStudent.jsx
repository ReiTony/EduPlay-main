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
    <div className="flex flex-col flex-grow gap-4 p-4">
      <div className="bg-[#ff5454] rounded-full shadow-md px-10 py-3 text-4xl font-bold font-sourceSans3">ACCOUNT MANAGEMENT</div>
      <div className="flex flex-col flex-grow bg-[#ff9c9c] text-3xl gap-4 rounded-3xl p-5 font-bold">
        <div className="text-4xl font-bold font-sourceSans3">REGISTERED USERS - EDIT STUDENT</div>

        <div className="flex flex-row items-center gap-4 mt-6">
          <label htmlFor="firstname">First Name:</label>
          <input type="text" className="rounded-full border-2 border-black px-4 py-1" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" id="firstname" />
        </div>

        <div className="flex flex-row items-center gap-4">
          <label htmlFor="lastname">Last Name:</label>
          <input type="text" className="rounded-full border-2 border-black px-4 py-1" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" id="lastname" />
        </div>

        <div className="flex flex-row items-center gap-4">
          <label htmlFor="gradelevel">Grade:</label>
          <input type="number" className="rounded-full border-2 border-black px-4 py-1" value={gradeLevel} onChange={(e) => setGrade(e.target.value)} placeholder="Grade" id="gradelevel" min="1" max="3" />
        </div>

        <div className="flex flex-row items-center gap-4">
          <label>Birth Date:</label>
          <select className="rounded-full border-2 border-black px-4 py-1" value={birthMonth} onChange={(e) => setBirthMonth(e.target.value)}>
            {months.map((i, ind) => (
              <option className="rounded-full border-2 border-black px-4 py-1" value={ind + 1} key={ind}>
                {i}
              </option>
            ))}
          </select>
          <input type="number" className="rounded-full border-2 border-black px-4 py-1 w-20" value={birthDay} onChange={(e) => setBirthDay(e.target.value)} placeholder="Birth Day" />
        </div>

        <div className="flex flex-row justify-center gap-4">
          <button className="bg-[#d00c24] rounded-full shadow-md text-white px-8 py-2 hover:brightness-90" onClick={() => navigate(-1)}>
            CANCEL
          </button>
          <button className="bg-[#08a454] rounded-full shadow-md text-white px-8 py-2 hover:brightness-90" onClick={handleSave}>
            SAVE
          </button>
        </div>
      </div>
    </div>
  );
}

export default Teacher_EditStudent;

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
