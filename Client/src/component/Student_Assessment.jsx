import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Student_Assessment() {
  const navigate = useNavigate();
  const gradeLevel = localStorage.getItem("gradeLevel");
  const { moduleNumber } = useParams();
  const [data, setData] = useState(null);
  const [answers, setAnswers] = useState(null);

  useEffect(() => {
    const init = async () => {
      const res = await fetch(`/modules/grade${gradeLevel}/module${moduleNumber}/assessment.json`);
      const data = await res.json();
      setData(data);
      setAnswers(data.questions.map(() => -1));
    };
    init();
  }, []);

  const handleClickChoice = (question, choice) => {
    setAnswers((h) => {
      const i = [...h];
      i[question] = choice;
      return i;
    });
  };

  const handleSubmit = () => {
    localStorage.setItem(`g${gradeLevel}-m${moduleNumber}-answers`, JSON.stringify(answers));
    navigate(`/Student/Module/${moduleNumber}/AssessmentSubmmitted`);
  };

  return (
    <div className="bg-[#fff5be] flex flex-col items-center m-4 mb-6 p-8 rounded-2xl h-full">
      <h3 className="text-5xl font-semibold my-2 font-sourceSans3">{data?.title || ""}</h3>
      <hr className="bg-black h-1 w-full" />

      <div className="flex flex-col gap-8 my-8 font-sourceSans3">
        {data?.questions.map((question, indexq) => (
          <div className="flex flex-col gap-2" key={indexq}>
            <div className="text-2xl font-semibold">{indexq + 1 + ". " + question.question}</div>
            <div>
              {question.choices.map((choice, indexc) => (
                <div className="flex flex-row justify-start items-center gap-3" key={indexc}>
                  <input type="radio" id={indexq + "-" + indexc} checked={indexc === answers[indexq]} onChange={() => handleClickChoice(indexq, indexc)} />
                  <label className="text-lg font-semibold" htmlFor={indexq + "-" + indexc}>
                    {choice}
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button className="bg-[#252525] text-lg rounded-lg shadow-md font-semibold px-8 py-2 text-white font-sourceSans3" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}

export default Student_Assessment;
