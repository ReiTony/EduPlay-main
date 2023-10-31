import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ManageAssessments from "./Teacher_ManageAssessments";

function Teacher_CreateAssessment() {
  const navigate = useNavigate();
  const [stepNumber, setStepNumber] = useState(0);
  const [title, setTitle] = useState("");
  const [gradeLevel, setGradeLevel] = useState("");
  const [moduleNumber, setModuleNumber] = useState("");

  const handleSave = async (questions) => {
    const answers = questions.map((i) => ({ answer: i.choices[i.correctAnswer] }));
    axios
      .post(`${import.meta.env.VITE_API}teacher/createassessment`, { title, gradeLevel, answers, questions })
      .then((res) => navigate("/teacher"))
      .catch((err) => alert(err.message));
  };

  const handleProceed = () => {
    if (title === "") return alert("Please enter a title.");
    if (!["1", "2", "3"].includes(gradeLevel)) return alert("Please choose between 1, 2, and 3 for the grade level.");
    setStepNumber((i) => i + 1);
  };

  return (
    <div className="flex flex-col flex-grow gap-4 p-4">
      <div className="bg-[#08a454] rounded-full shadow-md px-10 py-3 text-4xl font-bold font-sourceSans3">CUSTOM ASSESSMENTS</div>
      <div className="flex flex-col bg-[#a8d4a4] flex-grow gap-4 rounded-3xl p-5 font-bold">
        {stepNumber === 0 && (
          <div className="flex flex-col mx-auto gap-5" style={{ maxWidth: "960px", width: "100%" }}>
            <h2 className="text-4xl text-center my-6">Create a Custom Assessment</h2>
            <div className="flex flex-row items-center gap-2 text-2xl">
              <label>Title: </label>
              <input className="flex-grow text-2xl rounded-full px-5 py-1 border-2 border-black" type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
            </div>
            <div className="flex flex-row items-center gap-2 text-2xl">
              <label>Grade Level: </label>
              <input className="flex-grow text-2xl rounded-full px-5 py-1 border-2 border-black" type="number" min="1" max="3" value={gradeLevel} onChange={(e) => setGradeLevel(e.target.value)} placeholder="Grade Level" />
            </div>
            <div className="flex flex-row items-center gap-2 text-2xl">
              <label>Module Number: </label>
              <input className="flex-grow text-2xl rounded-full px-5 py-1 border-2 border-black" type="number" min="1" value={moduleNumber} onChange={(e) => setModuleNumber(e.target.value)} placeholder="Module Number" />
            </div>
            <button className="bg-[#282424] rounded-full shadow-md text-2xl text-white px-8 py-2 my-6 mx-auto hover:brightness-95" onClick={handleProceed}>
              PROCEED
            </button>
          </div>
        )}
        {stepNumber === 1 && <ManageAssessments onSave={handleSave} />}
      </div>
    </div>
  );
}

export default Teacher_CreateAssessment;
