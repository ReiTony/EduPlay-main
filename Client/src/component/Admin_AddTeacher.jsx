import { useState } from "react";
import { IoArrowBackCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ErrorModal from "./ErrorModal";
import ReactModal from "react-modal";

function Admin_AddTeacher() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [gradeLevel, setGradeLevel] = useState("1");
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorInfo, setErrorInfo] = useState("");
  const [isVerifyAccountModalOpen, setIsVerifyAccountModalOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) return showError("Please enter a valid email.");
    if (password.length < 6) return showError("Please enter a password with at least 6 characters.");
    if (name.length < 3) return showError("Please enter a name with at least 3 characters.");
    axios
      .post(`${import.meta.env.VITE_API}admin/addTeacher`, { email, password, name, gradeLevel })
      .then(() => setIsVerifyAccountModalOpen(true))
      .catch((err) => {
        console.log(err);
        if (err.response.status === 500) showError("The teacher you are trying to add already exists.");
        else showError("Something went wrong. Please try again.");
      });
  };

  const showError = (err) => {
    setErrorInfo(err);
    setIsErrorModalOpen(true);
  };

  return (
    <>
      <header className="bg-[#d8cccc] rounded-full shadow-md text-4xl font-reemkufifont font-bold mx-4 p-4 px-6">
        <h1>TEACHER ACCOUNT MANAGEMENT</h1>
      </header>

      <main className="flex-grow bg-[#d8cccc] shadow-md rounded-3xl p-5 mx-4 my-3">
        <button className="flex flex-row items-center gap-2 bg-[#282424] shadow-md rounded-full font-bold text-white text-2xl me-auto mb-3 px-6 py-2" onClick={() => navigate(-1)}>
          <IoArrowBackCircle />
          BACK
        </button>

        <h1 className="font-bold font-reemkufifont lg:text-4xl">REGISTERED USERS - ADD TEACHER</h1>
        <div>
          <h1 className="p-10 font-bold lg:text-4xl">Fill in the information:</h1>
        </div>
        <form>
          <div className="grid gap-10 font-semibold lg:text-3xl lg:grid-cols-2">
            <div className="flex-col">
              <div className="flex items-center justify-center">
                <label htmlFor="email" className="pr-2 text-right">
                  Email:
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  name="email"
                  placeholder="Enter Email"
                  className="px-4 py-2 lg:w-[400px] rounded-full lg:mx-4 border-4 border-l-8 border-r-8 border-black"
                />
              </div>
            </div>
            <div className="flex-col">
              <div className="flex items-center justify-center">
                <label htmlFor="password" className="pr-2 text-right lg:ml-5">
                  Password:
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => e.target.value.length <= 15 && setPassword(e.target.value)}
                  id="password"
                  name="password"
                  placeholder="Enter Password"
                  className="px-4 py-2 lg:w-[400px] border-4 border-l-8 border-r-8 border-black rounded-full lg:mx-4"
                />
              </div>
            </div>
            <div className="flex-col">
              <div className="flex items-center justify-center">
                <label htmlFor="name" className="pr-2 ml-5 text-right">
                  Name:
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  id="name"
                  name="name"
                  placeholder="Enter Name"
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
      <ErrorModal show={isErrorModalOpen} onHide={() => setIsErrorModalOpen(false)} errorInfo={errorInfo} />
      <ReactModal appElement={document.getElementById("root")} isOpen={isVerifyAccountModalOpen} shouldCloseOnEsc={true} style={modalStyle}>
        <div className="flex flex-col items-center justify-center gap-8 p-8 text-3xl font-sourceSans3">
          <h2 className="text-3xl font-semibold text-center">Verify Account</h2>
          <h2 className="text-3xl text-center">Verification email sent. Please check your email.</h2>
          <button
            className="bg-[#08a454] text-white text-2xl font-bold px-10 py-2 rounded-full shadow-md hover:brightness-90 hover:shadow-green-500 hover:scale-95 transition-transform transform-gpu"
            onClick={() => navigate("/admin/teacher-accounts")}>
            CONTINUE
          </button>
        </div>
      </ReactModal>
    </>
  );
}

const modalStyle = {
  content: {
    background: `url("/src/assets/wordHuntPOPbg.svg")`,
    border: "0",
    borderRadius: "2rem",
    maxWidth: "540px",
    width: "fit-content",
    height: "fit-content",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.4)",
  },
};

export default Admin_AddTeacher;
