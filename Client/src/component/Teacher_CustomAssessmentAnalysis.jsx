import { useState, useEffect } from "react";
import axios from "axios";
import Accordion from "./Accordion";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useParams } from "react-router-dom";

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
      <div className="flex flex-col flex-grow gap-4 p-4">
        <header className="p-4 text-4xl font-bold text-white shadow-md backgroundGreen rounded-3xl font-reemkufifont ">
          <h1>ITEM ANALYSIS</h1>
        </header>
        <div className="flex flex-col flex-grow gap-4 p-5 font-bold text-white backgroundGreen rounded-3xl">
          <h2 className="text-3xl">CUSTOM ASSESSMENTS ANALYSIS</h2>
          <div className="flex flex-col flex-grow gap-4 text-xl">
            {data === null ? (
              <div className="flex items-center justify-center flex-grow text-3xl font-sourceSans3">LOADING...</div>
            ) : (
              <>
                <h2 className="mt-4 text-3xl text-center">{data.title}</h2>
                <div className="flex flex-col gap-4">
                  {data.questions.map((question, j) => (
                    <div className="flex flex-row items-center justify-center gap-6" key={j}>
                      <div style={{ width: 150, height: 150 }}>
                        <CircularProgressbar value={question.analysis} text={`${question.analysis}%`} />
                      </div>
                      <div className="flex flex-col text-2xl">
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
      </div>
    </>
  );
}

export default Teacher_CustomAssessmentAnalysis;
