import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoArrowBackCircle } from "react-icons/io5";
import axios from "axios";

function Admin_EditTeacher() {
  const navigate = useNavigate();
  const { accountId } = useParams();
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API}admin/showteacher/${accountId}`)
      .then((res) => {
        console.log(res.data);
        const { _id, email, name } = res.data.teacher;
        setEmail(email);
        setName(name);
        setUserId(_id);
      })
      .catch((err) => alert(err.message));
  }, []);

  const handleSave = async (e) => {
    try {
      e.preventDefault();
      await axios.patch(`${import.meta.env.VITE_API}admin/updateTeacher/${userId}`, { email, name });
      navigate("/admin/teacher-accounts");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="flex flex-col flex-grow gap-4 p-4">
      <header className="bg-[#d8cccc] rounded-full shadow-md text-4xl font-reemkufifont font-bold p-4 px-6">
        <h1>TEACHER ACCOUNT MANAGEMENT</h1>
      </header>

      <main className="flex flex-col flex-grow gap-2 bg-[#d8cccc] shadow-md rounded-3xl font-bold p-5 my-3">
        <button className="flex flex-row items-center gap-2 bg-[#282424] shadow-md rounded-full font-bold text-white text-2xl me-auto mb-3 px-6 py-2" onClick={() => navigate(-1)}>
          <IoArrowBackCircle />
          BACK
        </button>
        <h1 className="font-bold font-reemkufifont text-4xl">REGISTERED USERS - EDIT TEACHER</h1>

        <form onSubmit={handleSave} className="flex flex-col gap-2 font-sourceSans3 text-2xl ms-0 sm:ms-8 mt-8">
          <div className="flex flex-row items-center gap-4">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              className="px-4 py-1 border-2 w-full border-black rounded-full focus:shadow-md"
              style={{ maxWidth: "400px" }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              id="email"
            />
          </div>

          <div className="flex flex-row items-center gap-4">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              style={{ maxWidth: "400px" }}
              className="px-4 py-1 border-2 w-full border-black rounded-full focus:outline-none focus:shadow-md"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              id="name"
            />
          </div>

          <div className="flex flex-row justify-center gap-4 mt-6">
            <button
              className="bg-[#d00c24] rounded-full shadow-md text-white px-8 py-2 hover:brightness-90 hover:bg-red-700 hover:shadow-lg hover:shadow-red-300 shadow-black hover:scale-[.98] transition-transform transform-gpu"
              onClick={() => navigate(-1)}>
              CANCEL
            </button>
            <button className="text-white px-8 py-2 bg-green-500 rounded-full shadow-lg hover:brightness-90 shadow-black hover:scale-[.98] transition-transform transform-gpu hover:shadow-green-300">SAVE</button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default Admin_EditTeacher;

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
