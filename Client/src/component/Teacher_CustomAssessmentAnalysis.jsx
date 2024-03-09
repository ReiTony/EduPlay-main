import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import axios from "axios";
import "react-circular-progressbar/dist/styles.css";

function Teacher_CustomAssessmentAnalysis() {
  const { assessmendId } = useParams();
  const [data, setData] = useState(null);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API}teacher/custom-assessment?id=${assessmendId}`, { withCredentials: true })
      .then((res) => setData(res.data.request))
      .catch((err) => alert(err.message));
  }, []);

  return (
    <>
      <h1 className="mx-2 p-4 text-xl sm:text-4xl font-bold text-white shadow-md backgroundGreen rounded-xl font-reemkufifont">ITEM ANALYSIS</h1>
      <div className="m-2 text-white flex flex-col flex-grow gap-4 p-2 sm:p-5 font-bold backgroundGreen rounded-xl">
        <h2 className="text-xl sm:text-3xl">CUSTOM ASSESSMENTS ANALYSIS</h2>
        <div className="flex flex-col flex-grow gap-4 text-xl">
          {data === null ? (
            <div className="flex justify-center items-center flex-grow text-3xl font-sourceSans3">LOADING...</div>
          ) : (
            <>
              <h2 className="text-2xl sm:text-3xl text-center mt-4">{data.title}</h2>
              <div className="flex flex-col mx-auto gap-4 w-full" style={{ maxWidth: "800px" }}>
                {data.questions.map((question, j) => (
                  <div className="flex flex-row justify-start items-center gap-6" key={j}>
                    <div className="flex justify-center items-center" style={{ width: 150, height: 150 }}>
                      <CircularProgressbar value={question.analysis} styles={buildStyles({ textColor: "#fff", pathColor: "#fff", trailColor: "transparent" })} text={`${question.analysis}%`} />
                    </div>
                    <div className="flex flex-col text-xl sm:text-2xl">
                      <div>{`Question: ${question.question}`}</div>
                      <div>{`${question.analysis}% of students got this question correct.`}</div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Teacher_CustomAssessmentAnalysis;
