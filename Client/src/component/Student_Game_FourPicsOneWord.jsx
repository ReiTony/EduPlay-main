import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import textToSpeechIcon from "../assets/texttospeech.svg";
import ReactModal from "react-modal";

function Student_Game_FourPicsOneWord() {
  const navigate = useNavigate();
  const { moduleNumber } = useParams();
  const [data, setData] = useState(null);
  const [roundNumber, setRoundNumber] = useState(0);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [isModalCompleteOpen, setIsModalCompleteOpen] = useState(false);

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
      setIsModalCompleteOpen(true);
    }
  }, [isGameFinished]);

  const handleSubmitAnswer = (e) => {
    e.preventDefault();
    if (roundNumber + 1 === data.rounds.length) return setIsGameFinished(true);
    else if (data?.rounds[roundNumber].answer.toLowerCase().trim() === answer.toLowerCase()) setScore((i) => i + 1);
    setRoundNumber((i) => i + 1);
    setIsImageLoaded(false);
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
          <h4 className="text-3xl font-semibold my-2 font-sourceSans3">{`Score: ${score}`}</h4>
        </div>

        <hr className="bg-black h-1" />

        <div className="flex flex-col justify-center items-center gap-4 py-4 h-full">
          {isGameFinished && (
            <button className="bg-[#282424] text-white font-sourceSans3 rounded-full px-12 py-2 text-lg font-semibold shadow-md" onClick={() => navigate("/student")}>
              Go To Homepage
            </button>
          )}
          <img className={isImageLoaded ? "" : "loading"} src={data?.rounds[roundNumber].imagePath} style={{ height: "450px" }} onLoad={() => setIsImageLoaded(true)} />
          {!isImageLoaded && <div className="text-2xl font-bold font-sourceSans3">Loading...</div>}
          <div className="text-2xl my-2 font-semibold">{`Clue: ${"_ ".repeat(data?.rounds[roundNumber].answer.length)}`}</div>
          <form className="flex flex-row justify-center gap-4 align-center my-4">
            <input type="text" className="px-5 py-2 rounded-lg shadow-md font-sourceSans3" placeholder="Type your answer here" style={{ width: "300px" }} value={answer} onChange={(e) => setAnswer(e.target.value)} />
            <button type="submit" className="bg-[#252525] rounded-lg shadow-md font-semibold px-6 py-1 text-white font-sourceSans3" style={{ lineHeight: "0", margin: "0" }} onClick={handleSubmitAnswer}>
              Submit
            </button>
            <img className="cursor-pointer" onClick={handleTTSClick} src={textToSpeechIcon} alt="textToSpeechIcon" style={{ maxHeight: "40px" }} />
          </form>
        </div>
      </div>
      <ReactModal
        appElement={document.getElementById("root")}
        isOpen={isModalCompleteOpen}
        shouldCloseOnEsc={true}
        style={{ content: { backgroundColor: "#d8ec8c", border: "0", borderRadius: "2rem", maxWidth: "540px", width: "fit-content", height: "fit-content", top: "50%", left: "50%", transform: "translate(-50%, -50%)" } }}>
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
    </>
  );
}

export default Student_Game_FourPicsOneWord;
