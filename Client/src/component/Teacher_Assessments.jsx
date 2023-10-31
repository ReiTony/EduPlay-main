import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactModal from "react-modal";

function TeacherAssessments() {
  const navigate = useNavigate();
  const [assessments, setAssessments] = useState([]);
  const [currentAssessment, setCurrentAssessment] = useState(-1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    refresh();
  }, []);

  const refresh = async () => {
    await axios
      .get(`${import.meta.env.VITE_API}teacher/assessments`)
      .then((res) => setAssessments(res.data.assessments))
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
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="flex flex-col flex-grow gap-4 p-4">
        <div className="bg-[#08a454] rounded-full shadow-md px-10 py-3 text-4xl font-bold font-sourceSans3">CUSTOM ASSESSMENTS</div>
        <div className="flex flex-col bg-[#a8d4a4] flex-grow gap-4 rounded-3xl p-5 font-bold">
          <div className="flex flex-row justify-end gap-2">
            <button className="bg-[#282424] rounded-full shadow-md px-8 py-2 text-white text-2xl font-bold hover:brightness-90" onClick={() => navigate("create")}>
              CREATE AN ASSESSMENT
            </button>
          </div>

          <div className="flex flex-col gap-4 m-4">
            {assessments.map((i, ind) => (
              <div className="flex flex-row flex-grow justify-between items-center bg-white rounded-2xl px-8 py-4" key={ind}>
                <h4 className="text-4xl font-bold font-sourceSans3">{i.title}</h4>
                <div className="flex flex-row gap-2 text-white text-2xl font-bold">
                  <button className="bg-[#08a454] rounded-full shadow-md px-8 py-2" onClick={() => navigate(i._id)}>
                    EDIT
                  </button>
                  <button className="bg-[#d00c24] rounded-full shadow-md px-8 py-2" onClick={showDelete(ind)}>
                    DELETE
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <DeleteModal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} onSave={handleDeleteAssessment} />
    </>
  );
}

function DeleteModal({ show, onHide, onSave }) {
  if (!show) return;
  return (
    <ReactModal
      appElement={document.getElementById("root")}
      isOpen={show}
      shouldCloseOnEsc={true}
      style={{ content: { backgroundColor: "#FFFFFF", border: "5px solid black", borderRadius: "2rem", maxWidth: "720px", width: "100%", height: "fit-content", top: "50%", left: "50%", transform: "translate(-50%, -50%)" } }}>
      <div className="flex flex-col justify-center gap-8 font-sourceSans3 font-semibold p-6">
        <h2 className="text-3xl text-center">DELETE QUESTION</h2>
        <div className="text-2xl">
          Reminder: <br />
          Upon clicking proceed, all information provided under the question will be deleted.
        </div>
        <div className="flex flex-row justify-end gap-2 text-white">
          <button className="text-2xl bg-[#d00c24] rounded-full shadow-md px-6 py-2 hover:brightness-95" onClick={onHide}>
            CANCEL
          </button>
          <button className="text-2xl bg-[#08a454] rounded-full shadow-md px-6 py-2 hover:brightness-95" onClick={onSave}>
            PROCEED
          </button>
        </div>
      </div>
    </ReactModal>
  );
}

export default TeacherAssessments;
