import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Student_LearningGroup() {
  const navigate = useNavigate();
  const gradeLevel = localStorage.getItem("gradeLevel");
  const [assessments, setAssessments] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API}student/assessment?gradeLevel=${gradeLevel}`)
      .then((res) => setAssessments(res.data))
      .catch((err) => alert(err.message));
  }, []);

  return (
    <div className="flex flex-col items-center flex-grow gap-4 p-4 sm:p-6 m-4 mb-6 shadow-lg secondBackground rounded-2xl shadow-black">
      <div className="flex flex-row items-center justify-between w-full my-2 text-5xl font-semibold font-sourceSans3">
        <h3 className="me-auto">LEARNING GROUP</h3>
      </div>
      <hr className="w-full h-1 bg-black mb-2" />
      <div className="flex flex-col w-full gap-4">
        {assessments.map((assessment, i) => (
          <div className="flex flex-col sm:flex-row flex-grow justify-between items-center font-sourceSans3 font-bold  text-xl sm:text-2xl bg-[#ffbc5c] shadow-md rounded-2xl w-full px-8 py-4   hover:scale-[.99] transform-gpu" key={i}>
            <div className="flex flex-col">
              <div>{assessment.title}</div>
              <div>{`Module No. ${assessment.moduleNumber}`}</div>
            </div>
            <button className="text-white bg-[#282424] rounded-full shadow-md px-8 py-2 hover:shadow-green-500 hover:scale-95 transition-transform transform-gpu" onClick={() => navigate(assessment._id)}>
              TAKE QUIZ
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Student_LearningGroup;
