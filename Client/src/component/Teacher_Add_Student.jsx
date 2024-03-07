import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Cookies from "js-cookie";
import * as Yup from "yup";
import axios from "axios";

function Teacher_Add_Student() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [gradeLevel, setGradeLevel] = useState("1");
  const [teacherToken, setTeacherToken] = useState(null);

  useEffect(() => {
    const token = Cookies.get("teacherToken");
    if (token) {
      const tokenObject = JSON.parse(token);
      setTeacherToken(tokenObject);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (firstName === "" || lastName === "" || birthDay === "" || birthMonth === "") return alert("Fill out all fields completely.");
    axios
      .post(`${import.meta.env.VITE_API}teacher/addStudent`, {
        firstName,
        lastName,
        birthDay: birthDay.toString().padStart(2, "0"),
        birthMonth: birthMonth.toString().padStart(2, "0"),
        gradeLevel,
      })
      .then((res) => navigate("/teacher/accounts"))
      .catch((err) => alert(err.message));
  };

  return (
    <>
      <h1 className="backgroundRed text-white mx-1 sm:mx-4 rounded-2xl gap-3 p-4 text-2xl sm:text-4xl font-reemkufifont font-bold ">
        ACCOUNT MANAGEMENT
      </h1>

      <main className="flex flex-col flex-grow p-4 sm:p-8 mx-1 sm:mx-4 my-2 rounded-lg backgroundRed text-white font-bold">
        <div className="flex flex-col lg:mx-auto lg:w-[1000px]">
          <h1 className="text-2xl sm:text-4xl">REGISTERED USERS - ADD STUDENT</h1>
          <h1 className="text-xl sm:text-3xl my-5">Fill in the information:</h1>
          <form className="flex flex-col gap-4 text-xl sm:text-3xl" onSubmit={handleSubmit}>
            <div className="flex flex-row items-center gap-2">
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => e.target.value.length <= 15 && setFirstName(e.target.value)}
                id="firstName"
                placeholder="Enter First Name"
                className="text-black px-4 py-1 border-2 w-full border-black rounded-full focus:shadow-md"
                style={{ maxWidth: "300px" }}
              />
            </div>
            <div className="flex flex-row items-center gap-2">
              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => e.target.value.length <= 15 && setLastName(e.target.value)}
                id="lastName"
                placeholder="Enter Last Name"
                className="text-black px-4 py-1 border-2 w-full border-black rounded-full focus:shadow-md"
                style={{ maxWidth: "300px" }}
              />
            </div>
            <div className="flex flex-row items-center gap-2">
              <label htmlFor="birthDay">Birth Day:</label>
              <input
                type="number"
                value={birthDay}
                onChange={(e) =>
                  ((e.target.value <= 31 && e.target.value >= 1) || e.target.value === "") && setBirthDay(e.target.value)
                }
                id="birthDay"
                className="text-black px-4 py-1 border-2 w-full border-black rounded-full focus:shadow-md"
                style={{ maxWidth: "100px" }}
              />
            </div>
            <div className="flex flex-row items-center gap-2">
              <label htmlFor="birthMonth">Birth Month:</label>
              <input
                type="number"
                value={birthMonth}
                onChange={(e) =>
                  ((e.target.value <= 12 && e.target.value >= 1) || e.target.value === "") && setBirthMonth(e.target.value)
                }
                id="birthMonth"
                className="text-black px-4 py-1 border-2 w-full border-black rounded-full focus:shadow-md"
                style={{ maxWidth: "100px" }}
              />
            </div>
            <div className="flex flex-row items-center gap-2">
              <label htmlFor="gradeLevel">Grade Level:</label>
              <select
                value={gradeLevel}
                onChange={(e) => setGradeLevel(e.target.value)}
                className="text-black px-4 py-1 border-2 w-full border-black rounded-full focus:shadow-md"
                style={{ maxWidth: "100px" }}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>
            <button
              type="submit"
              onClick={handleSubmit}
              className="mx-auto px-10 py-2 text-3xl font-bold text-white bg-green-500 rounded-xl shadow-lg hover:brightness-90 shadow-black hover:scale-[.98] transition-transform transform-gpu hover:shadow-green-300"
            >
              ADD
            </button>
          </form>
        </div>
      </main>
    </>
  );
}

export default Teacher_Add_Student;
