import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReactModal from "react-modal";

function TeacherAssessments() {
  const navigate = useNavigate();
  const [assessments, setAssessments] = useState([]);
  const [filteredAssessments, setFilteredAssessments] = useState([]);
  const [currentAssessment, setCurrentAssessment] = useState(-1);
  const [gradeLevelFilter, setGradeLevelFilter] = useState("all");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    refresh();
  }, []);

  const refresh = async () => {
    await axios
      .get(`${import.meta.env.VITE_API}teacher/assessments`)
      .then((res) => {
        setAssessments(res.data);
        setFilteredAssessments(res.data);
      })
      .catch((err) => alert(err.message));
  };

  const showDelete = (ind) => (e) => {
    e.stopPropagation();
    setCurrentAssessment(ind);
    setShowDeleteModal(true);
  };

  const handleDeleteAssessment = async () => {
    axios
      .delete(`${import.meta.env.VITE_API}teacher/deleteAssessment/${assessments[currentAssessment]._id}`)
      .then((res) => {
        refresh();
        setShowDeleteModal(false);
      })
      .catch((err) => alert(err.message));
  };

  const handleGradeLevelFilterChange = (level) => {
    const temp = [...assessments];
    setGradeLevelFilter(level);
    if (level === "all") return setFilteredAssessments(temp);
    setFilteredAssessments(temp.filter((i) => i.gradeLevel == level));
  };

  return (
    <>
      <h1 className="mx-2 p-4 text-xl sm:text-4xl font-bold text-white shadow-md backgroundGreen rounded-xl font-reemkufifont ">CUSTOM-ASSESSMENTS</h1>
      <div className="m-2 flex flex-col flex-grow gap-4 p-2 sm:p-5 font-bold backgroundGreen rounded-xl">
        <div className="flex flex-row flex-wrap-reverse justify-end gap-4 text-xl sm:text-2xl">
          <select className="bg-[#282424] text-white rounded-md shadow-md px-4 py-1 me-4 sm:me-0" value={gradeLevelFilter} onChange={(e) => handleGradeLevelFilterChange(e.target.value)}>
            <option value="all">All grades</option>
            <option value="1">Grade 1</option>
            <option value="2">Grade 2</option>
            <option value="3">Grade 3</option>
          </select>
          <button className="bg-[#282424] rounded-xl m-4 sm:m-2 px-8 py-2 text-white font-bold hover:brightness-90 hover:scale-[.99] transition-transform transform-gpu hover:shadow-green-500 shadow-black shadow-lg" onClick={() => navigate("create")}>
            CREATE AN ASSESSMENT
          </button>
        </div>

        <div className="flex flex-col gap-4 m-0 sm:m-4">
          {filteredAssessments.map((i, ind) => (
            <div
              className="flex flex-col sm:flex-row items-center justify-between flex-grow px-2 sm:px-8 py-4 bg-white rounded-2xl bg-opacity-90 shadow-black hover:scale-[.99] shadow-lg transition-transform transform-gpu hover:shadow-green-400"
              key={ind}
            >
              <h4 className="text-xl sm:text-4xl font-bold font-sourceSans3">{i.title}</h4>
              <div className="flex flex-row gap-2 text-lg sm:text-2xl font-bold text-white mt-2 sm:mt-0">
                <button className="bg-[#282424] rounded-xl shadow-lg px-3 sm:px-8 py-2 shadow-black hover:scale-[.99] transition-transform transform-gpu hover:shadow-green-500" onClick={() => navigate(`${i._id}/analysis`)}>
                  ANALYSIS
                </button>
                <button className="bg-[#08a454] rounded-xl shadow-lg px-3 sm:px-8 py-2 shadow-black hover:scale-[.98] transition-transform transform-gpu hover:shadow-green-300" onClick={() => navigate(i._id)}>
                  EDIT
                </button>
                <button className="bg-[#d00c24] rounded-xl shadow-lg px-3 sm:px-8 py-2 shadow-black hover:scale-[.98] transition-transform transform-gpu hover:shadow-red-300" onClick={showDelete(ind)}>
                  DELETE
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <DeleteModal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} onSave={handleDeleteAssessment} />
    </>
  );
}

function DeleteModal({ show, onHide, onSave }) {
  if (!show) return;
  return (
    <ReactModal appElement={document.getElementById("root")} isOpen={show} shouldCloseOnEsc={true} style={modalStyle}>
      <div className="flex flex-col justify-center gap-8 font-semibold text-white font-sourceSans3">
        <h2 className="text-3xl text-center">DELETE QUESTION</h2>
        <div className="text-2xl">
          Reminder: <br />
          Upon clicking proceed, all information provided under the assessment will be deleted.
        </div>
        <div className="flex flex-row justify-end gap-2 text-white">
          <button className="bg-[#08a454] text-2xl rounded-xl shadow-lg px-4 py-2 shadow-black hover:scale-[.98] transition-transform transform-gpu hover:shadow-red-300" onClick={onHide}>
            CANCEL
          </button>
          <button className="bg-[#d00c24] text-2xl rounded-xl shadow-lg px-4 py-2 shadow-black hover:scale-[.98] transition-transform transform-gpu hover:shadow-green-300" onClick={onSave}>
            PROCEED
          </button>
        </div>
      </div>
    </ReactModal>
  );
}

export default TeacherAssessments;

const modalStyle = {
  content: {
    backgroundImage: `url('/src/assets/Homepage_Image/green.svg')`,
    border: "0",
    borderRadius: "2rem",
    maxWidth: "95dvw",
    maxHeight: "80dvh",
    width: "fit-content",
    height: "fit-content",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.4)",
  },
};
