import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import textToSpeechIcon from "../assets/texttospeech.svg";
import ReactModal from "react-modal";
import axios from "axios";

function Student_Game_FourPicsOneWord() {
  const navigate = useNavigate();
  const gradeLevel = localStorage.getItem("gradeLevel");
  const username = localStorage.getItem("username");
  const { moduleNumber } = useParams();
  const [moduleId, setModuleId] = useState();
  const [data, setData] = useState(null);
  const [roundNumber, setRoundNumber] = useState(0);
  const [answer, setAnswer] = useState("");
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [lastCorrectWord, setLastCorrectWord] = useState();
  const [isModalCompleteOpen, setIsModalCompleteOpen] = useState(false);
  const [isModalCorrectOpen, setIsModalCorrectOpen] = useState(false);
  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    const init = async () => {
      const { id } = await (await fetch(`/modules/grade${gradeLevel}/module${moduleNumber}/game.json`)).json();
      setModuleId(id);
      const res = await (await fetch(`${import.meta.env.VITE_API}admin/module/${id}`)).json();
      setData(res.data);
    };
    init();
  }, []);

  useEffect(() => {
    if (isGameFinished) {
      axios.post(`${import.meta.env.VITE_API}student/module-record`, { username, moduleId, title: data.title });
      axios.post(`${import.meta.env.VITE_API}student/game-score`, { username, gameType: "4Pics", score: data.rounds.length });
      setIsModalCompleteOpen(true);
    }
  }, [isGameFinished]);

  const handleSubmitAnswer = (e) => {
    e.preventDefault();
    if (data?.rounds[roundNumber].answer.toLowerCase().trim() === answer.toLowerCase()) {
      setLastCorrectWord(data.rounds[roundNumber]);
      setIsModalCorrectOpen(true);
      setErrorText("");
      if (roundNumber + 1 !== data.rounds.length) setRoundNumber((i) => i + 1);
      else setIsGameFinished(true);
    } else setErrorText("Wrong Answer. Try Again.");
    setAnswer("");
  };

  const handleTTSClick = (meaning) => {
    if (speechSynthesis.speaking) return;
    let utterance = new SpeechSynthesisUtterance(meaning);
    speechSynthesis.speak(utterance);
  };

  const handleContinueModal = () => {
    speechSynthesis.cancel();
    setIsModalCorrectOpen(false);
  };

  return (
    <>
      <div className="flex flex-col flex-grow p-8 m-4 mb-6 secondBackground rounded-2xl lg:w-5/6 lg:mx-auto">
        <div className="flex justify-between lg:px-10">
          <h3 className="text-2xl font-semibold lg:my-2 lg:text-3xl font-sourceSans3">{data?.title || ""}</h3>
        </div>

        <hr className="h-1 bg-black mb-4" />

        <div className="flex flex-col items-center justify-center h-full gap-4 py-2 lg:flex-col">
          <img src={data?.rounds[roundNumber].imagePath} style={{ height: "450px" }} />
          <div className="text-2xl my-2 font-semibold">{data?.rounds[roundNumber].clue}</div>
          <form onSubmit={handleSubmitAnswer} className="flex flex-row justify-center gap-2 items-start font-sourceSans3 mt-4">
            <div className="flex flex-col items-center gap-1">
              <input type="text" className="px-5 py-2 rounded-full shadow-md" placeholder="Type your answer here" style={{ width: "300px" }} value={answer} onChange={(e) => setAnswer(e.target.value)} />
              {errorText !== "" && <span className="text-red-500">{errorText}</span>}
            </div>
            <button type="submit" className="bg-[#252525] rounded-full shadow-md font-semibold px-6 py-2 text-white text-lg" disabled={isGameFinished}>
              SUBMIT
            </button>
            <img className="cursor-pointer" onClick={() => handleTTSClick(data?.rounds[roundNumber].meaning)} src={textToSpeechIcon} alt="textToSpeechIcon" style={{ maxHeight: "40px" }} />
          </form>
        </div>
      </div>
      <ReactModal appElement={document.getElementById("root")} isOpen={isModalCompleteOpen} shouldCloseOnEsc={true} style={modalStyle}>
        <div className="flex flex-col items-center justify-center gap-8 p-8 text-3xl font-semibold font-sourceSans3">
          <div className="flex flex-col gap-2">
            <div className="text-center">Congratulations! You have finished 4 Pictures 1 Word.</div>
            <div className="text-center">Do you want to go to assessment?</div>
          </div>
          <div className="flex flex-row justify-center gap-4">
            <button className="px-10 py-2 text-white transition-transform bg-red-500 rounded-full shadow-md hover:brightness-90 hover:shadow-red-500 hover:scale-95 transform-gpu" onClick={() => setIsModalCompleteOpen(false)}>
              NO
            </button>
            <button
              className="bg-[#08a454] text-white px-10 py-2 rounded-full shadow-md hover:brightness-90 hover:shadow-green-500 hover:scale-95 transition-transform transform-gpu"
              onClick={() => navigate(`/student/module/${moduleNumber}/assessment`)}>
              YES
            </button>
          </div>
        </div>
      </ReactModal>
      <ReactModal appElement={document.getElementById("root")} isOpen={isModalCorrectOpen} shouldCloseOnEsc={true} style={modalStyle}>
        <div className="flex flex-col items-center justify-center gap-8 p-8 text-3xl font-sourceSans3">
          <h2 className="text-3xl font-semibold text-center">{lastCorrectWord?.answer}</h2>
          <h2 className="text-3xl text-center">{lastCorrectWord?.meaning}</h2>
          <button
            className="bg-[#08a454] text-white text-2xl font-bold px-10 py-2 rounded-full shadow-md hover:brightness-90 hover:shadow-green-500 hover:scale-95 transition-transform transform-gpu"
            onClick={handleContinueModal}>
            CONTINUE
          </button>
        </div>
      </ReactModal>
    </>
  );
}
const modalStyle = {
  content: {
    background: `url("/src/assets/wordHuntPOPbg.svg")`,
    border: "0",
    borderRadius: "2rem",
    maxWidth: "540px",
    width: "fit-content",
    height: "fit-content",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.4)",
  },
};

export default Student_Game_FourPicsOneWord;
