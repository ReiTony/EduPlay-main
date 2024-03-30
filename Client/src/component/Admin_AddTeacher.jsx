import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ErrorModal from "./ErrorModal";
import ReactModal from "react-modal";
import BackButton from "./BackButton";

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
      <h1 className="backgroundGreen text-white mx-1 sm:mx-4 rounded-2xl gap-3 p-4 text-2xl sm:text-4xl font-reemkufifont font-bold ">TEACHER ACCOUNT MANAGEMENT</h1>

      <main className="flex flex-col flex-grow p-2 sm:p-5 mx-1 sm:mx-4 my-2 rounded-lg text-white font-bold backgroundGreen">
      <BackButton bg1="#08a454" bg2="green-300" />
        <div className="flex flex-col lg:mx-auto lg:w-[1000px]">
          <h1 className="text-2xl sm:text-4xl">REGISTERED USERS - ADD TEACHER</h1>
          <h1 className="text-xl sm:text-3xl my-5">Fill in the information:</h1>
          <form className="flex flex-col gap-4 text-xl sm:text-3xl" onSubmit={handleSubmit}>
            <div className="flex flex-row items-center gap-2">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => e.target.value.length <= 30 && setEmail(e.target.value)}
                id="email"
                placeholder="Enter Email"
                className="text-black px-4 py-1 border-2 w-full border-black rounded-full focus:shadow-md"
                style={{ maxWidth: "300px" }}
              />
            </div>
            <div className="flex flex-row items-center gap-2">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                placeholder="Enter Password"
                className="text-black px-4 py-1 border-2 w-full border-black rounded-full focus:shadow-md"
                style={{ maxWidth: "300px" }}
              />
            </div>
            <div className="flex flex-row items-center gap-2">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => e.target.value.length <= 20 && setName(e.target.value)}
                id="name"
                placeholder="Enter Name"
                className="text-black px-4 py-1 border-2 w-full border-black rounded-full focus:shadow-md"
                style={{ maxWidth: "300px" }}
              />
            </div>
            <div className="flex flex-row items-center gap-2">
              <label htmlFor="gradeLevel">Grade Level:</label>
              <select value={gradeLevel} onChange={(e) => setGradeLevel(e.target.value)} className="text-black px-4 py-1 border-2 w-full border-black rounded-full focus:shadow-md" style={{ maxWidth: "100px" }}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>
            <button
              type="submit"
              onClick={handleSubmit}
              className="mx-auto px-6 sm:px-10  py-1 sm:py-2 my-2 text-2xl font-bold text-white bg-[#08a454] rounded-xl shadow-lg hover:brightness-90 shadow-black hover:scale-[.98] transition-transform transform-gpu "
            >
              ADD
            </button>
          </form>
        </div>
      </main>
      <ErrorModal show={isErrorModalOpen} onHide={() => setIsErrorModalOpen(false)} errorInfo={errorInfo} />
      <ReactModal appElement={document.getElementById("root")} isOpen={isVerifyAccountModalOpen} shouldCloseOnEsc={true} style={modalStyle}>
        <div className="flex flex-col items-center justify-center gap-8 p-8 text-3xl font-sourceSans3">
          <h2 className="text-3xl font-semibold text-center">Verify Account</h2>
          <h2 className="text-3xl text-center">Verification email sent. Please check your email.</h2>
          <button
            className="bg-[#08a454] text-white text-2xl font-bold px-10 py-2 rounded-full shadow-md hover:brightness-90 hover:shadow-green-500 hover:scale-95 transition-transform transform-gpu"
            onClick={() => navigate("/admin/teacher-accounts")}
          >
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
