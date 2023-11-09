import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import textToSpeechIcon from "../assets/texttospeech.svg";
import ReactModal from "react-modal";
import axios from "axios";

function Student_Game_FourPicsOneWord() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const { moduleNumber } = useParams();
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
      const gradeLevel = localStorage.getItem("gradeLevel");
      const res = await fetch(`/modules/grade${gradeLevel}/module${moduleNumber}/game.json`);
      setData(await res.json());
    };
    init();
  }, []);

  useEffect(() => {
    if (isGameFinished) {
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

  const handleTTSClick = () => {
    if (speechSynthesis.speaking) return;
    let utterance = new SpeechSynthesisUtterance(`Clue: It is a ${data?.rounds[roundNumber].answer.length} letter word.`);
    speechSynthesis.speak(utterance);
  };

  return (
    <>
      <div className="bg-[#fff5be] flex flex-col m-4 mb-6 p-8 rounded-2xl h-full">
        <div className="flex justify-between px-10">
          <h3 className="text-3xl font-semibold my-2 font-sourceSans3">{data?.title || ""}</h3>
        </div>

        <hr className="bg-black h-1" />

        <div className="flex flex-col justify-center items-center gap-4 py-4 h-full">
          <img src={data?.rounds[roundNumber].imagePath} style={{ height: "450px" }} />
          <div className="text-2xl my-2 font-semibold">{`Clue: ${"_ ".repeat(data?.rounds[roundNumber].answer.length)}`}</div>
          <form onSubmit={handleSubmitAnswer} className="flex flex-row justify-center gap-2 items-center font-sourceSans3 my-4">
            <div className="flex flex-col items-center gap-1">
              <input type="text" className="px-5 py-2 rounded-full shadow-md" placeholder="Type your answer here" style={{ width: "300px" }} value={answer} onChange={(e) => setAnswer(e.target.value)} />
              {errorText !== "" && <span className="text-red-500">{errorText}</span> }
            </div>
            <button type="submit" className="bg-[#252525] rounded-full shadow-md font-semibold px-6 py-2 text-white text-lg" disabled={isGameFinished}>
              SUBMIT
            </button>
            <img className="cursor-pointer" onClick={handleTTSClick} src={textToSpeechIcon} alt="textToSpeechIcon" style={{ maxHeight: "40px" }} />
          </form>
        </div>
      </div>
      <ReactModal appElement={document.getElementById("root")} isOpen={isModalCompleteOpen} shouldCloseOnEsc={true} style={modalStyle}>
        <div className="flex flex-col justify-center items-center gap-8 font-sourceSans3 text-3xl font-semibold p-8">
          <div className="flex flex-col gap-2">
            <div className="text-center">Congratulations! You have finished 4 Pictures 1 Word.</div>
            <div className="text-center">Do you want to go back to homepage?</div>
          </div>
          <div className="flex flex-row justify-center gap-4">
            <button className="bg-red-500 text-white px-10 py-2 rounded-full shadow-md hover:brightness-90" onClick={() => setIsModalCompleteOpen(false)}>
              NO
            </button>
            <button className="bg-[#08a454] text-white px-10 py-2 rounded-full shadow-md hover:brightness-90" onClick={() => navigate("/student")}>
              YES
            </button>
          </div>
        </div>
      </ReactModal>
      <ReactModal appElement={document.getElementById("root")} isOpen={isModalCorrectOpen} shouldCloseOnEsc={true} style={modalStyle}>
        <div className="flex flex-col justify-center items-center gap-8 font-sourceSans3 text-3xl p-8">
          <h2 className="text-3xl text-center font-semibold">{lastCorrectWord?.answer}</h2>
          <h2 className="text-3xl text-center">{lastCorrectWord?.meaning}</h2>
          <button className="bg-[#08a454] text-white text-2xl font-bold px-10 py-2 rounded-full shadow-md hover:brightness-90" onClick={() => setIsModalCorrectOpen(false)}>
            CONTINUE
          </button>
        </div>
      </ReactModal>
    </>
  );
}
const modalStyle = { content: { backgroundColor: "#d8ec8c", border: "0", borderRadius: "2rem", maxWidth: "540px", width: "fit-content", height: "fit-content", top: "50%", left: "50%", transform: "translate(-50%, -50%)" } };

export default Student_Game_FourPicsOneWord;
