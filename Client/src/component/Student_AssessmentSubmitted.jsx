import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Student_AssessmentSubmitted() {
  const { moduleNumber } = useParams();
  const gradeLevel = localStorage.getItem("gradeLevel");
  const [answers, setAnswers] = useState(null);
  const [data, setData] = useState(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const init = async () => {
      const res = await fetch(`/modules/grade${gradeLevel}/module${moduleNumber}/assessment.json`);
      const questions = await res.json();
      setData(questions);
      const temp = JSON.parse(localStorage.getItem(`g${gradeLevel}-m${moduleNumber}-answers`));
      temp.forEach((i, ind) => i === questions.questions[ind].correctAnswer && setScore((i) => i + 1));
      setAnswers(temp);
    };
    init();
  }, []);

  if (answers === null) return;

  return (
    <div className="bg-[#fff5be] flex flex-col items-center m-4 mb-6 p-8 rounded-2xl h-full">
      <h3 className="text-5xl font-semibold my-2 font-sourceSans3">{data?.title || ""}</h3>
      <hr className="bg-black h-1 w-full" />

      <div className="flex flex-col gap-8 my-8 font-sourceSans3">
        {data !== null && <div className="self-end text-2xl font-semibold font-sourceSans3">{`Score: ${score}/${data.questions.length}`}</div>}
        {data?.questions.map((question, indexq) => (
          <div className="flex flex-col gap-2" key={indexq}>
            <div className="text-2xl font-semibold">{indexq + 1 + ". " + question.question}</div>
            <div>
              {question.choices.map((choice, indexc) => (
                <div className="flex flex-row justify-start items-center gap-3" key={indexc}>
                  <input type="radio" id={indexq + "-" + indexc} checked={indexc === answers[indexq]} readOnly />
                  <div className="flex flex-row items-center gap-4">
                    <label className="text-lg font-semibold" htmlFor={indexq + "-" + indexc}>
                      {choice}
                    </label>

                    {indexc === answers[indexq] ? (
                      question.correctAnswer === answers[indexq] ? (
                        //   CORRECT ANSWER
                        <div className="px-5 bg-green-600 rounded-md text-white">Your Answer (Correct)</div>
                      ) : (
                        // WRONG ANSWER
                        <div className="px-5 bg-red-600 rounded-md text-white">Your Answer (Wrong)</div>
                      )
                    ) : (
                      question.correctAnswer === indexc && <div className="px-5 bg-green-600 rounded-md text-white">Correct Answer</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Student_AssessmentSubmitted;
