import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactModal from "react-modal";
import textToSpeechIcon from "../assets/texttospeech.svg";
import axios from "axios";
import ErrorModal from "./ErrorModal";
import Instruction from "./students/Instruction";

function Student_LearningGroupAssessment() {
  const { assessmentId } = useParams();
  const userId = localStorage.getItem("userId");
  const [data, setData] = useState();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState(-1);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [isViewingScore, setIsViewingScore] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isInstructShown, setIsInstructShown] = useState(true);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const init = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API}student/assessment?id=${assessmentId}`);
        setData(res.data);
        setIsLoading(false);
        const userAnswersFromLocalStorage = localStorage.getItem(`${assessmentId}-answers`);
        if (!userAnswersFromLocalStorage) localStorage.setItem(`${assessmentId}-answers`, JSON.stringify(new Array(res.data.questions.length).fill(-1)));
        else {
          const temp = JSON.parse(userAnswersFromLocalStorage);
          if (!temp.includes(-1)) {
            setIsViewingScore(true);
            setHasAnswered(true);
            setCurrentAnswer(temp[0]);
            const correctAns = res.data.questions.map((i) => i.correctAnswer);
            setScore(computeScore(temp, correctAns));
          } else setCurrentQuestion(temp.indexOf(-1));
        }
      } catch (error) {
        console.log(error.message);
        alert(error.message);
      }
    };
    init();
  }, []);

  const handleTTSClick = () => {
    if (speechSynthesis.speaking) return;
    let test = data?.questions[currentQuestion].question + "\n";
    for (let i = 0; i < data?.questions[currentQuestion].choices.length - 1; i++) test += data?.questions[currentQuestion].choices[i] + "?, ";
    test += "or " + data?.questions[currentQuestion].choices[data?.questions[currentQuestion].choices.length - 1];
    let utterance = new SpeechSynthesisUtterance(test);
    speechSynthesis.speak(utterance);
  };

  const handleSubmit = () => {
    new Audio("/sound/press.mp3").play();
    if (currentAnswer === -1) return setIsErrorModalOpen(true);
    const temp = JSON.parse(localStorage.getItem(`${assessmentId}-answers`));
    temp[temp.indexOf(-1)] = currentAnswer;
    localStorage.setItem(`${assessmentId}-answers`, JSON.stringify(temp));
    setHasAnswered(true);
    const correctAns = data?.questions.map((i) => i.correctAnswer);
    setScore(computeScore(temp, correctAns));
  };

  const handleNext = async () => {
    new Audio("/sound/press.mp3").play();
    if (currentQuestion + 1 < data?.questions.length) {
      setCurrentQuestion((i) => i + 1);
      setCurrentAnswer(-1);
      setHasAnswered(false);
    } else setIsSubmitModalOpen(true);
  };

  const handleSubmitQuiz = async () => {
    const answers = JSON.parse(localStorage.getItem(`${assessmentId}-answers`));
    axios.post(`${import.meta.env.VITE_API}student/custom-assessment-record`, { assessment: assessmentId, student: userId, answers }).catch((err) => alert(err.message));
    setIsViewingScore(true);
    setCurrentQuestion(0);
    setCurrentAnswer(JSON.parse(localStorage.getItem(`${assessmentId}-answers`))[0]);
    setIsSubmitModalOpen(false);
  };

  const computeScore = (userAns, correctAns) => {
    let score = 0;
    for (let i = 0; i < userAns.length; i++) if (userAns[i] === correctAns[i]) score++;
    return score;
  };

  const goToQuestion = (i) => {
    setCurrentQuestion(i);
    setCurrentAnswer(JSON.parse(localStorage.getItem(`${assessmentId}-answers`))[i]);
  };

  const handleChoiceClick = (ind) => (e) => {
    if (!hasAnswered) {
      setCurrentAnswer(ind);
      new Audio("/sound/press.mp3").play();
    }
  };

  const handleStart = () => {
    new Audio("/sound/press.mp3").play();
    setIsInstructShown(false);
  };

  const getQuestion = () => {
    let q = data?.questions[currentQuestion].question.trim();
    return `${currentQuestion + 1}. ${q.endsWith("?") ? q : q + "?"}`;
  };

  const isAnswerCorrect = (ind) => data?.questions[currentQuestion].correctAnswer === currentAnswer && ind === currentAnswer;
  const isAnswerWrong = (ind) => ind === currentAnswer;
  const isTheCorrectAnswer = (ind) => ind === data?.questions[currentQuestion].correctAnswer;

  return (
    <>
      <div className="flex flex-col items-center flex-grow gap-6 p-4 sm:p-8 m-4 mb-6 shadow-md secondBackground rounded-2xl shadow-black">
        <div className="flex flex-row items-center justify-between w-full my-2 text-5xl font-semibold font-sourceSans3">
          <h3 className="me-auto flex-grow hyphens-auto break-words w-1/2">{data?.title || ""}</h3>
          {isViewingScore && <div className=""> {`Score: ${score}/${data?.questions.length}`}</div>}
        </div>
        <hr className="w-full h-1 bg-black" />

        <div className="flex flex-col bg-[#ffbc5c] w-full rounded-3xl p-5 sm:p-10 my-auto gap-4" style={{ maxWidth: "1024px" }}>
          {isInstructShown ? (
            <Instruction />
          ) : (
            !isLoading && (
              <>
                <div className="flex flex-row justify-between">
                  <h2 className="text-3xl font-semibold font-sourceSans3">Question</h2>
                  <img className="cursor-pointer" onClick={handleTTSClick} src={textToSpeechIcon} alt="textToSpeechIcon" style={{ maxHeight: "40px" }} />
                </div>
                <h3 className="text-4xl font-semibold font-sourceSans3 hyphens-auto break-words">{getQuestion()}</h3>
                <div className="flex flex-col gap-3 font-semibold md:grid md:grid-cols-2 font-sourceSans3">
                  {data?.questions[currentQuestion].choices.map((choice, ind) => (
                    <div
                      className={`flex flex-col items-center shadow-md rounded-2xl p-4 ${hasAnswered ? "" : "hover:shadow-xl hover:brightness-95"} ${
                        hasAnswered ? (isAnswerCorrect(ind) || isTheCorrectAnswer(ind) ? "bg-green-400" : isAnswerWrong(ind) ? "bg-red-400" : "bg-white") : "bg-white"
                      } ${hasAnswered ? "" : "cursor-pointer"}`}
                      onClick={handleChoiceClick(ind)}
                      key={ind}
                    >
                      <div className="text-2xl">{choice}</div>
                      {hasAnswered &&
                        (isAnswerCorrect(ind) ? (
                          <div className="text-lg font-semibold font-sourceSans3">Your Answer (Correct)</div>
                        ) : isAnswerWrong(ind) ? (
                          <div className="text-lg font-semibold font-sourceSans3">Your Answer (Wrong)</div>
                        ) : isTheCorrectAnswer(ind) ? (
                          <div className="text-lg font-semibold font-sourceSans3">The Correct Answer</div>
                        ) : (
                          <></>
                        ))}
                    </div>
                  ))}
                </div>
              </>
            )
          )}
        </div>

        {isInstructShown ? (
          <button className="bg-[#08a454] rounded-full px-10 py-2 text-3xl shadow-lg text-white font-bold font-sourceSans3 hover:brightness-90 hover:shadow-green-500 hover:scale-95 transition-transform transform-gpu" onClick={handleStart}>
            START
          </button>
        ) : isViewingScore ? (
          <div className="flex flex-row justify-between w-full text-2xl font-semibold text-white font-sourceSans3" style={{ maxWidth: "1024px" }}>
            {currentQuestion != 0 && (
              <button className="me-auto bg-[#282424] px-10 py-2 rounded-full hover:brightness-90 shadow-md hover:shadow-green-500 hover:scale-95 transition-transform transform-gpu" onClick={() => goToQuestion(currentQuestion - 1)}>
                PREVIOUS
              </button>
            )}
            {currentQuestion + 1 != data?.questions.length && (
              <button className="ms-auto bg-[#282424] px-10 py-2 rounded-full hover:brightness-90 shadow-md hover:shadow-green-500 hover:scale-95 transition-transform transform-gpu" onClick={() => goToQuestion(currentQuestion + 1)}>
                NEXT
              </button>
            )}
          </div>
        ) : hasAnswered ? (
          <button className="bg-[#282424] rounded-full px-10 py-2 text-3xl shadow-md text-white font-bold font-sourceSans3 hover:brightness-90 hover:shadow-green-500 hover:scale-95 transition-transform transform-gpu" onClick={handleNext}>
            NEXT
          </button>
        ) : (
          <button className="bg-[#08a454] rounded-full px-10 py-2 text-3xl shadow-md text-white font-bold font-sourceSans3 hover:brightness-90 hover:shadow-green-500 hover:scale-95 transition-transform transform-gpu" onClick={handleSubmit}>
            SUBMIT
          </button>
        )}
      </div>
      <ReactModal appElement={document.getElementById("root")} isOpen={isSubmitModalOpen} shouldCloseOnEsc={true} style={modalStyle}>
        <div className="flex flex-col items-center justify-center gap-8 p-8 text-3xl font-semibold font-sourceSans3">
          <div className="text-center">Are you sure you want to submit the quiz?</div>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-10 py-2 text-white transition-transform bg-red-500 rounded-full shadow-md hover:brightness-90 hover:shadow-red-500 hover:scale-95 transform-gpu" onClick={() => setIsSubmitModalOpen(false)}>
              CANCEL
            </button>
            <button className="bg-[#08a454] text-white px-10 py-2 rounded-full shadow-md hover:brightness-90 hover:shadow-green-500 hover:scale-95 transition-transform transform-gpu" onClick={handleSubmitQuiz}>
              SUBMIT
            </button>
          </div>
        </div>
      </ReactModal>
      <ErrorModal show={isErrorModalOpen} onHide={() => setIsErrorModalOpen(false)} errorInfo={"Select your answer before submitting."} />
    </>
  );
}

export default Student_LearningGroupAssessment;

const modalStyle = {
  content: {
    background: `url("/src/assets/wordHuntPOPbg.svg")`,
    border: "0",
    borderRadius: "2rem",
    maxWidth: "90dvw",
    maxHeight: "80dvh",
    width: "100%",
    height: "fit-content",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.4)",
  },
};
