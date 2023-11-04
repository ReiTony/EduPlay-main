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
    <div className="bg-[#fff5be] flex flex-col items-center m-4 mb-6 p-8 gap-6 rounded-2xl flex-grow">
      <div className="flex flex-row justify-between w-full text-5xl font-semibold font-sourceSans3 items-center my-2">
        <h3 className="me-auto">LEARNING GROUP</h3>
      </div>
      <hr className="bg-black h-1 w-full" />
      <div className="flex flex-col gap-4 w-full">
        {assessments.map((assessment, i) => (
          <div className="flex flex-row flex-grow justify-between items-center font-sourceSans3 font-bold text-2xl bg-[#ffbc5c] shadow-md rounded-2xl w-full px-8 py-4" key={i}>
            <div className="flex flex-col">
              <div>{assessment.title}</div>
              <div>{`Module No. ${assessment.moduleNumber}`}</div>
            </div>
            <button className="text-white bg-[#282424] rounded-full shadow-md px-8 py-2" onClick={() => navigate(assessment._id)}>
              TAKE QUIZ
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Student_LearningGroup;
