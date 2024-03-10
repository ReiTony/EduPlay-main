import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoArrowBackCircle } from "react-icons/io5";
import axios from "axios";
import ErrorModal from "./ErrorModal";

function Admin_EditStudent() {
  const navigate = useNavigate();
  const { accountId } = useParams();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gradeLevel, setGrade] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

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
    if (firstName === "" || lastName === "" || gradeLevel === "" || birthDay === "" || birthMonth === "") return setIsErrorModalOpen(true)
    axios
      .patch(`${import.meta.env.VITE_API}teacher/updateStudent/${accountId}`, { firstName, lastName, gradeLevel, birthDay: birthDay.toString().padStart(2, "0"), birthMonth: birthMonth.toString().padStart(2, "0") })
      .then((res) => navigate(-1))
      .catch((err) => alert(err.message));
  };

  return (
    <>
      <div className="flex flex-col flex-grow font-bold">
        <h1 className="backgroundRed text-white mx-1 sm:mx-4 rounded-2xl gap-3 p-4 text-2xl sm:text-4xl font-reemkufifont">STUDENT ACCOUNT MANAGEMENT</h1>

        <main className="backgroundRed text-white flex flex-col flex-grow text-xl sm:text-3xl p-2 sm:p-5 mx-1 sm:mx-4 my-2 rounded-lg">
          <button className="flex flex-row items-center gap-2 bg-[#ff5757] shadow-md rounded-xl font-bold text-white text-2xl me-auto mb-3 px-6 py-2" onClick={() => navigate(-1)}>
            <IoArrowBackCircle />
            BACK
          </button>
          <h1 className="font-bold font-reemkufifont text-4xl">REGISTERED USERS - EDIT STUDENT</h1>

          <div className="flex flex-col gap-2 font-sourceSans3 text-2xl ms-0 sm:ms-8 mt-8">
            <div className="flex flex-col gap-2 lg:mx-auto lg:w-[1000px]">
              <div className="flex flex-row items-center gap-4 mt-6">
                <label htmlFor="firstname" className="text-white">
                  First Name:
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => e.target.value.length <= 20 && setFirstName(e.target.value)}
                  placeholder="Enter First Name"
                  id="firstname"
                  className="text-black px-4 py-1 border-2 w-full border-red-300 focus:outline-none focus:shadow-red-300 rounded-full focus:shadow-md"
                  style={{ maxWidth: "300px" }}
                />
              </div>

              <div className="flex flex-row items-center gap-4">
                <label htmlFor="lastname" className="text-white">
                  Last Name:
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => e.target.value.length <= 20 && setLastName(e.target.value)}
                  placeholder="Enter Last Name"
                  id="lastname"
                  className="text-black px-4 py-1 border-2 w-full border-red-300 focus:outline-none focus:shadow-red-300 rounded-full focus:shadow-md"
                  style={{ maxWidth: "300px" }}
                />
              </div>

              <div className="flex flex-row items-center gap-4">
                <div className="flex flex-row items-center gap-2">
                  <label htmlFor="gradelevel" className="text-white">
                    Grade:
                  </label>
                  <select
                    value={gradeLevel}
                    onChange={(e) => setGrade(e.target.value)}
                    className="text-black px-4 py-1 border-2 w-full border-red-300 focus:outline-none focus:shadow-red-300 rounded-full focus:shadow-md"
                    style={{ maxWidth: "100px" }}
                    id="gradeLevel"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-row items-center gap-4">
                <label className="text-white">Birth Date:</label>
                <select className="text-black px-4 py-1 border-2 border-red-300 focus:outline-none focus:shadow-red-300 rounded-full focus:shadow-md" value={birthMonth} onChange={(e) => setBirthMonth(e.target.value)}>
                  {months.map((i, ind) => (
                    <option value={ind + 1} key={ind}>
                      {i}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  value={birthDay}
                  onChange={(e) => ((e.target.value <= 31 && e.target.value >= 1) || e.target.value === "") && setBirthDay(e.target.value)}
                  placeholder="Birth Day"
                  className="text-black px-4 py-1 border-2 w-full border-red-300 focus:outline-none focus:shadow-red-300 rounded-full focus:shadow-md"
                  style={{ maxWidth: "100px" }}
                />
              </div>

              <div className="flex flex-row justify-center gap-4 mt-6">
                <button
                  className="bg-[#d00c24] rounded-full shadow-md text-white px-8 py-2 hover:brightness-90 hover:bg-red-700 hover:shadow-lg hover:shadow-red-300 shadow-black hover:scale-[.98] transition-transform transform-gpu"
                  onClick={() => navigate(-1)}
                >
                  CANCEL
                </button>
                <button className="  text-white px-8 py-2  bg-green-500 rounded-full shadow-lg hover:brightness-90 shadow-black hover:scale-[.98] transition-transform transform-gpu hover:shadow-green-300" onClick={handleSave}>
                  SAVE
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
      <ErrorModal show={isErrorModalOpen} onHide={() => setIsErrorModalOpen(false)} errorInfo={"Fill out all fields completely."} />
    </>
  );
}

export default Admin_EditStudent;

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
