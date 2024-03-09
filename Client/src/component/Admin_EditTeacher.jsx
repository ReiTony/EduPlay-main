import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoArrowBackCircle } from "react-icons/io5";
import axios from "axios";
import ErrorModal from "./ErrorModal";

function Admin_EditTeacher() {
  const navigate = useNavigate();
  const { teacherEmail } = useParams();
  const { teacherId } = useParams();
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorInfo, setErrorInfo] = useState("");
  const [isEditingPassword, setIsEditingPassord] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API}admin/showteacher/${teacherEmail}`)
      .then((res) => {
        console.log(res.data);
        const { _id, email, name } = res.data.teacher;
        setEmail(email);
        setName(name);
        setUserId(_id);
      })
      .catch((err) => showError("Something went wrong. Please try again."));
  }, []);

  const handleSave = async (e) => {
    try {
      e.preventDefault();
      if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) return showError("Please enter a valid email.");
      if (name.length < 3) return showError("Please enter a name with at least 3 characters.");
      await axios.patch(`${import.meta.env.VITE_API}admin/updateTeacher/${userId}`, { email, name });
      navigate("/admin/teacher-accounts");
    } catch (error) {
      showError("Something went wrong. Please try again.");
    }
  };

  const handleEditPassword = async (e) => {
    try {
      e.preventDefault();
      if (newPassword.length < 6) return showError("New password must be at least 6 characters.");
      await axios.patch(`${import.meta.env.VITE_API}admin/updateTeacherPassword/${teacherId}`, { oldPassword, newPassword });
      setIsEditingPassord(false);
    } catch (error) {
      if (error.code === "ERR_BAD_REQUEST") showError("Old password is incorrect.");
      else showError("Something went wrong. Please try again");
    }
  };

  const showError = (err) => {
    setErrorInfo(err);
    setIsErrorModalOpen(true);
  };

  const goToEditPassword = () => {
    setOldPassword("");
    setNewPassword("");
    setIsEditingPassord(true);
  };

  return (
    <>
      <h1 className="backgroundGreen text-white mx-1 sm:mx-4 rounded-2xl gap-3 p-4 text-2xl sm:text-4xl font-reemkufifont font-bold ">TEACHER ACCOUNT MANAGEMENT</h1>

      <main className="flex flex-col flex-grow p-2 sm:p-5 mx-1 sm:mx-4 my-2 rounded-lg text-white font-bold backgroundGreen">
        <button className="flex flex-row items-center gap-2 bg-[#08a454] shadow-md rounded-xl font-bold text-white text-2xl me-auto mb-3 px-6 py-2" onClick={() => navigate(-1)}>
          <IoArrowBackCircle />
          BACK
        </button>
        <h1 className="font-bold font-reemkufifont text-4xl">REGISTERED USERS - EDIT TEACHER</h1>

        {isEditingPassword ? (
          <form className="flex flex-col gap-2 font-sourceSans3 text-2xl ms-0 sm:ms-8 mt-8">
            <div className="flex flex-row items-center gap-4">
              <label htmlFor="oldpass">Old Password:</label>
              <input
                type="password"
                className="px-4 py-1 border-2 w-full border-black text-black rounded-full focus:shadow-md"
                style={{ maxWidth: "400px" }}
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="Enter your old password"
                id="oldpass"
              />
            </div>
            <div className="flex flex-row items-center gap-4">
              <label htmlFor="newpass">New Password:</label>
              <input
                type="password"
                className="px-4 py-1 border-2 w-full border-black text-black rounded-full focus:shadow-md"
                style={{ maxWidth: "400px" }}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter your new password"
                id="newpass"
              />
            </div>
            <button type="submit" className="bg-[#282424] rounded-full shadow-md hover:brightness-90 text-white px-6 py-2 mt-4 mx-auto" disabled={oldPassword.length === 0 || newPassword.length === 0} onClick={handleEditPassword}>
              Change Password
            </button>
          </form>
        ) : (
          <form className="flex flex-col gap-2 font-sourceSans3 text-2xl ms-0 sm:ms-8 mt-8">
            <div className="flex flex-row items-center gap-4">
              <label htmlFor="email">Email:</label>
              <input type="email" className="px-4 py-1 border-2 w-full border-black rounded-full focus:shadow-md text-black" style={{ maxWidth: "400px" }} value={email} onChange={(e) => e.target.value.length <= 30 && setEmail(e.target.value)} placeholder="Email" id="email" />
            </div>

            <div className="flex flex-row items-center gap-4">
              <label htmlFor="name">Name:</label>
              <input type="text" style={{ maxWidth: "400px" }} className="px-4 py-1 border-2 w-full border-black text-black rounded-full focus:outline-none focus:shadow-md" value={name} onChange={(e) => e.target.value.length <= 20 && setName(e.target.value)} placeholder="Name" id="name" />
            </div>
            <div className="flex flex-row items-center gap-4">
              <div>Password:</div>
              <button type="button" className="bg-[#282424] rounded-full shadow-md hover:brightness-90 text-white px-6 py-1" onClick={goToEditPassword}>
                Change Password
              </button>
            </div>

            <div className="flex flex-row justify-center gap-4 mt-6">
              <button
                type="button"
                className="bg-[#d00c24] rounded-full shadow-md text-white px-8 py-2 hover:brightness-90 hover:bg-red-700 hover:shadow-lg hover:shadow-red-300 shadow-black hover:scale-[.98] transition-transform transform-gpu"
                onClick={() => navigate(-1)}
              >
                CANCEL
              </button>
              <button type="submit" className="text-white px-8 py-2 bg-green-500 rounded-full shadow-lg hover:brightness-90 shadow-black hover:scale-[.98] transition-transform transform-gpu hover:shadow-green-300" onClick={handleSave}>
                SAVE
              </button>
            </div>
          </form>
        )}
      </main>
      <ErrorModal show={isErrorModalOpen} onHide={() => setIsErrorModalOpen(false)} errorInfo={errorInfo} />
    </>
  );
}

export default Admin_EditTeacher;

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
