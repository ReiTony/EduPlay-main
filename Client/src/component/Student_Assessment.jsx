import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactModal from "react-modal";
import textToSpeechIcon from "../assets/texttospeech.svg";
import axios from "axios";

function StudentAssessment() {
  const navigate = useNavigate();
  const { moduleNumber } = useParams();
  const userId = localStorage.getItem("userId");
  const username = localStorage.getItem("username");
  const gradeLevel = localStorage.getItem("gradeLevel");
  const [data, setData] = useState();
  const [moduleId, setModuleId] = useState();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [isViewingScore, setIsViewingScore] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);
  const [result, setResult] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState();

  useEffect(() => {
    const init = async () => {
      let { progressReport: res } = await (await fetch(`${import.meta.env.VITE_API}teacher/progress-report/${username}`)).json();
      if ((moduleNumber - 1) * 4 > res.unlockedModules.length - 3) navigate("/student");
      const { id } = await (await fetch(`/modules/grade${gradeLevel}/module${moduleNumber}/assessment.json`)).json();
      setModuleId(id);
      res = await (await fetch(`${import.meta.env.VITE_API}admin/module/${id}`)).json();
      res.data.questions = res.data.questions.sort(() => Math.random() - 0.5).slice(0, 10);
      setData(res.data);
      setIsLoading(false);
      setUserAnswers(new Array(res.data.questions.length).fill(-1));
    };
    init();
  }, []);

  const handleTTSClick = () => {
    if (speechSynthesis.speaking) return;
    let test = data?.questions[currentQuestion].question + "\n";
    for (let i = 0; i < data?.questions[currentQuestion].choices.length - 1; i++) test += data?.questions[currentQuestion].choices[i].name + "?, ";
    test += "or " + data?.questions[currentQuestion].choices[data?.questions[currentQuestion].choices.length - 1].name;
    let utterance = new SpeechSynthesisUtterance(test);
    speechSynthesis.speak(utterance);
  };

  const handleSubmit = () => {
    if (userAnswers[currentQuestion] === -1) return alert("Select your answer before submitting.");
    setHasAnswered(true);
    const correctAns = data?.questions.map((i) => i.correctAnswer);
    setScore(computeScore(userAnswers, correctAns));
  };

  const handleNext = async () => {
    if (currentQuestion + 1 < data?.questions.length) {
      setCurrentQuestion((i) => i + 1);
      setHasAnswered(false);
    } else setIsSubmitModalOpen(true);
  };

  const handleSubmitQuiz = async () => {
    await axios.post(`${import.meta.env.VITE_API}student/module-record`, { username, moduleId, title: data.title });
    const res = await axios.post(`${import.meta.env.VITE_API}student/assessment-record`, { moduleNumber, userId, answers: userAnswers, assessment: data });
    await axios.post(`${import.meta.env.VITE_API}student/assessment-score/6550ea342df7c58dccfceea1`, { username, score, moduleNumber }).catch((err) => alert(err.message));
    setResult(res.data);
    setIsCompleteModalOpen(true);
    setIsViewingScore(true);
    setCurrentQuestion(0);
    setIsSubmitModalOpen(false);
  };

  const computeScore = (userAns, correctAns) => {
    let score = 0;
    for (let i = 0; i < userAns.length; i++) if (userAns[i] === correctAns[i]) score++;
    return score;
  };

  const goToQuestion = (i) => {
    setCurrentQuestion(i);
    setCurrentAnswer(JSON.parse(localStorage.getItem(`g${gradeLevel}-m${moduleNumber}-answers`))[i]);
  };

  const isAnswerCorrect = (ind) => data?.questions[currentQuestion].correctAnswer === userAnswers[currentQuestion] && ind === userAnswers[currentQuestion];
  const isAnswerWrong = (ind) => ind === userAnswers[currentQuestion];
  const isTheCorrectAnswer = (ind) => ind === data?.questions[currentQuestion].correctAnswer;

  const getBadge = () => {
    const percentage = result?.score / result?.total;
    let badge = "";
    if (percentage === 1) badge = "Gold";
    else if (percentage >= 0.7) badge = "Silver";
    else if (percentage >= 0.4) badge = "Bronze";
    return `/badges/Grade ${gradeLevel}/G${gradeLevel}M${moduleNumber} ${badge}.png`;
  };

  const handleChoiceClick = (ind) => (e) => {
    if (isViewingScore) return;
    new Audio("/sound/press.mp3").play();
    if (!hasAnswered) {
      const temp = [...userAnswers];
      temp[currentQuestion] = ind;
      setUserAnswers(temp);
    }
  };

  if (isLoading) return;

  return (
    <>
      <div className="bg-[#fff5be] flex flex-col items-center m-4 mb-6 p-8 gap-6 rounded-2xl flex-grow">
        <div className="flex flex-row justify-between w-full text-5xl font-semibold font-sourceSans3 items-center my-2">
          <h3 className="me-auto">{data?.title || ""}</h3>
          {isViewingScore && <div className=""> {`Score: ${score}/${data?.questions.length}`}</div>}
        </div>
        <hr className="bg-black h-1 w-full" />

        <div className="flex flex-col bg-[#ffbc5c] w-full rounded-3xl p-10 my-auto gap-4" style={{ maxWidth: "1024px" }}>
          {!isLoading && (
            <>
              <div className="flex flex-row justify-between">
                <h2 className="text-3xl font-semibold font-sourceSans3">Question</h2>
                <img className="cursor-pointer" onClick={handleTTSClick} src={textToSpeechIcon} alt="textToSpeechIcon" style={{ maxHeight: "40px" }} />
              </div>
              <h3 className="text-4xl font-semibold font-sourceSans3">{`${currentQuestion + 1}. ${data?.questions[currentQuestion].question}`}</h3>
              {data?.questions[currentQuestion].image != null && (
                <div className="shadow-md rounded-md w-auto mx-auto my-6" style={{ height: "200px" }}>
                  <img className="rounded-2xl h-full w-auto" src={data?.questions[currentQuestion].image} />
                </div>
              )}
              <div className="flex flex-col md:grid md:grid-cols-2 gap-3 font-semibold font-sourceSans3">
                {data?.questions[currentQuestion].choices.map((choice, ind) => (
                  <div
                    className={`flex flex-col items-center shadow-md rounded-2xl p-4 ${hasAnswered ? "" : "hover:shadow-xl hover:brightness-95"} ${
                      hasAnswered ? (isAnswerCorrect(ind) || isTheCorrectAnswer(ind) ? "bg-green-400" : isAnswerWrong(ind) ? "bg-red-400" : "bg-white") : ind === userAnswers[currentQuestion] ? "bg-neutral-200" : "bg-white"
                    } ${hasAnswered ? "" : "cursor-pointer"}`}
                    onClick={handleChoiceClick(ind)}
                    key={ind}>
                    <div className="text-2xl">{choice.name}</div>
                    {hasAnswered &&
                      (isAnswerCorrect(ind) ? (
                        <div className="font-sourceSans3 font-semibold text-lg">Your Answer (Correct)</div>
                      ) : isAnswerWrong(ind) ? (
                        <div className="font-sourceSans3 font-semibold text-lg">Your Answer (Wrong)</div>
                      ) : isTheCorrectAnswer(ind) ? (
                        <div className="font-sourceSans3 font-semibold text-lg">The Correct Answer</div>
                      ) : (
                        <></>
                      ))}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
        {isViewingScore ? (
          <div className="flex flex-row justify-between w-full text-white font-sourceSans3 font-semibold text-2xl" style={{ maxWidth: "1024px" }}>
            {currentQuestion != 0 && (
              <button className="me-auto bg-[#282424] px-10 py-2 rounded-full hover:brightness-90 shadow-md" onClick={() => goToQuestion(currentQuestion - 1)}>
                PREVIOUS
              </button>
            )}
            {currentQuestion + 1 != data?.questions.length && (
              <button className="ms-auto bg-[#282424] px-10 py-2 rounded-full hover:brightness-90 shadow-md" onClick={() => goToQuestion(currentQuestion + 1)}>
                NEXT
              </button>
            )}
          </div>
        ) : hasAnswered ? (
          <button className="bg-[#282424] rounded-full px-10 py-2 text-3xl shadow-md text-white font-bold font-sourceSans3 hover:brightness-90" onClick={handleNext}>
            NEXT
          </button>
        ) : (
          <button className="bg-[#08a454] rounded-full px-10 py-2 text-3xl shadow-md text-white font-bold font-sourceSans3 hover:brightness-90" onClick={handleSubmit}>
            SUBMIT
          </button>
        )}
      </div>
      <ReactModal
        appElement={document.getElementById("root")}
        isOpen={isSubmitModalOpen}
        shouldCloseOnEsc={true}
        style={{ content: { backgroundColor: "#d8ec8c", border: "0", borderRadius: "2rem", maxWidth: "540px", width: "fit-content", height: "fit-content", top: "50%", left: "50%", transform: "translate(-50%, -50%)" } }}>
        <div className="flex flex-col justify-center items-center gap-8 font-sourceSans3 text-3xl font-semibold p-8">
          <div className="text-center">Are you sure you want to submit the quiz?</div>
          <div className="flex flex-row justify-center gap-4">
            <button className="bg-red-500 text-white px-10 py-2 rounded-full shadow-md hover:brightness-90" onClick={() => setIsSubmitModalOpen(false)}>
              CANCEL
            </button>
            <button className="bg-[#08a454] text-white px-10 py-2 rounded-full shadow-md hover:brightness-90" onClick={handleSubmitQuiz}>
              SUBMIT
            </button>
          </div>
        </div>
      </ReactModal>

      <ReactModal
        appElement={document.getElementById("root")}
        isOpen={isCompleteModalOpen}
        shouldCloseOnEsc={true}
        style={{ content: { backgroundColor: "#d8ec8c", border: "0", borderRadius: "2rem", maxWidth: "620px", width: "fit-content", height: "fit-content", top: "50%", left: "50%", transform: "translate(-50%, -50%)" } }}>
        <div className="flex flex-col justify-center items-center gap-2 font-sourceSans3 text-2xl font-semibold p-8">
          <div className="text-center text-4xl">{`Assessment ${moduleNumber}`}</div>
          {result?.score / result?.total >= 0.4 && (
            <>
              <div className="text-center">
                {`Congratulations!`}
                <br />
                {`You received a  badge on ${data?.title}`}
              </div>
              <img src={getBadge()} style={{ height: "200px" }} />
            </>
          )}
          <div className="text-center my-2">{result?.recommendation}</div>
          <div className="flex flex-row justify-center gap-4">
            <button className="bg-green-500 text-white px-10 py-2 rounded-full shadow-md hover:brightness-90" onClick={() => setIsCompleteModalOpen(false)}>
              OK
            </button>
          </div>
        </div>
      </ReactModal>
    </>
  );
}

export default StudentAssessment;
