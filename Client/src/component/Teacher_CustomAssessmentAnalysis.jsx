import { useState, useEffect } from "react";
import axios from "axios";
import Accordion from "./Accordion";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function Teacher_CustomAssessmentAnalysis() {
  const [data, setData] = useState();
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API}teacher/custom-assessment`, { withCredentials: true })
      .then((res) => setData(res.data.request))
      .catch((err) => alert(err.message));
  }, []);

  return (
    <>
      <div className="flex flex-col flex-grow gap-4 p-4">
        <div className="bg-[#08a454] rounded-full shadow-md px-10 py-3 text-4xl font-bold font-sourceSans3">ITEM ANALYSIS</div>
        <div className="flex flex-col bg-[#a8d4a4] flex-grow gap-4 rounded-3xl p-5 font-bold">
          <h2 className="text-3xl">CUSTOM ASSESSMENTS ANALYSIS</h2>
          <div className="flex flex-col gap-4 text-xl">
            {data?.map((asssessment, i) => (
              <Accordion key={i}>
                <Accordion.Title>{asssessment.title}</Accordion.Title>
                <Accordion.Content>
                  <div className="flex flex-col gap-4">
                    {asssessment.questions.map((question, j) => (
                      <div className="flex flex-row justify-center items-center gap-6" key={j}>
                        <div style={{ width: 100, height: 100 }}>
                          <CircularProgressbar value={question.analysis} text={`${question.analysis}%`} />
                        </div>
                        <div className="flex flex-col text-2xl">
                          <div>{`Question: ${question.question}`}</div>
                          <div>{`${question.analysis}% of students got this question correct.`}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Accordion.Content>
              </Accordion>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Teacher_CustomAssessmentAnalysis;
