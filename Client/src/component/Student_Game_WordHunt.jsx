import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import textToSpeechIcon from "../assets/texttospeech.svg";
import ReactModal from "react-modal";
import axios from "axios";

function Student_Game_WordHunt() {
  const navigate = useNavigate();
  const gradeLevel = localStorage.getItem("gradeLevel");
  const username = localStorage.getItem("username");
  const { moduleNumber } = useParams();
  const [origin, setOrigin] = useState([-1, -1]);
  const [current, setCurrent] = useState([-2, -2]);
  const [shaded, setShaded] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [data, setData] = useState(null);
  const [solved, setSolved] = useState(0);
  const [isModalCompleteOpen, setIsModalCompleteOpen] = useState(false);

  useEffect(() => {
    const init = async () => {
      const res = await fetch(`/modules/grade${gradeLevel}/module${moduleNumber}/game.json`);
      setData(await res.json());
    };
    init();
  }, []);

  useEffect(() => {
    if (JSON.stringify(origin) === JSON.stringify(current)) setShaded([origin[0].toString() + origin[1].toString()]);
    else if (origin[0] > current[0] && origin[1] === current[1]) setShaded(generateUpDownPattern(origin, current)); // upward
    else if (origin[0] < current[0] && origin[1] === current[1]) setShaded(generateUpDownPattern(current, origin)); // downward
    else if (origin[1] > current[1] && origin[0] === current[0]) setShaded(generateLeftRightPattern(current, origin)); // left
    else if (origin[1] < current[1] && origin[0] === current[0]) setShaded(generateLeftRightPattern(origin, current)); // right
    else setShaded([]);
  }, [current, origin]);

  const handleTTSClick = () => {
    if (speechSynthesis.speaking) return;
    let utterance = new SpeechSynthesisUtterance(data?.tts);
    speechSynthesis.speak(utterance);
  };

  const handleMouseUp = () => {
    if (data?.answers.includes(current + " " + origin)) {
      const temp = answers;
      shaded.forEach((i) => temp.push(i));
      setAnswers(temp);
      setSolved((i) => i + 1);
    }
    setOrigin([-1, -1]);
  };

  useEffect(() => {
    if (solved >= data?.clues.length) {
      axios.post(`${import.meta.env.VITE_API}student/game-score`, { username, gameType: "4Pics", score: solved });
      setIsModalCompleteOpen(true);
    }
  }, [solved]);

  const generateUpDownPattern = (current, origin) => {
    const temp = [];
    for (let i = origin[0]; i <= current[0]; i++) temp.push(i.toString() + current[1].toString());
    return temp;
  };
  const generateLeftRightPattern = (current, origin) => {
    const temp = [];
    for (let i = origin[1]; i >= current[1]; i--) temp.push(current[0].toString() + i.toString());
    return temp;
  };

  return (
    <>
      <div className="bg-[#fff5be] flex flex-col items-center m-4 mb-6 p-8 rounded-2xl h-full">
        <h3 className="text-5xl font-semibold my-2 font-sourceSans3">{data?.title || ""}</h3>

        <hr className="bg-black h-1 w-full" />

        <div className="flex items-center">
          <div className="flex flex-col m-10 gap-4 items-center justify-center">
            {solved >= data?.clues.length && (
              <button className="bg-[#282424] text-white font-sourceSans3 rounded-full px-12 py-2 text-lg font-semibold shadow-md" onClick={() => navigate("/student")}>
                Go To Homepage
              </button>
            )}
            <div className="mygrid p-4 bg-slate-100 rounded-2xl shadow-lg flex-grow">
              {data?.puzzle.map((row, rowNum) =>
                row.map((i, colNum) => (
                  <div
                    className={`ele flex justify-center items-center font-semibold text-2xl ${
                      shaded.includes(rowNum.toString() + (colNum + 1).toString()) ? "bg-green-400" : answers.includes(rowNum.toString() + (colNum + 1).toString()) ? "bg-blue-400" : "bg-slate-100"
                    }`}
                    key={rowNum + "-" + colNum}
                    onMouseDown={() => setOrigin([rowNum, colNum + 1])}
                    onMouseUp={handleMouseUp}
                    onMouseEnter={() => setCurrent([rowNum, colNum + 1])}>
                    {i}
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="flex-grow mx-2 my-16">
            <div className="flex flex-row gap-6 items-center mb-8">
              <h4 className="text-4xl font-semibold">Words to Find</h4>
              <img className="cursor-pointer" onClick={handleTTSClick} src={textToSpeechIcon} alt="textToSpeechIcon" style={{ maxHeight: "40px" }} />
            </div>

            {data?.clues.map((clue, index) => (
              <p className="text-2xl font-semibold" key={index}>
                {index + 1 + ".  " + clue}
              </p>
            ))}
          </div>
        </div>
      </div>
      <ReactModal
        appElement={document.getElementById("root")}
        isOpen={isModalCompleteOpen}
        shouldCloseOnEsc={true}
        style={{ content: { backgroundColor: "#d8ec8c", border: "0", borderRadius: "2rem", maxWidth: "540px", width: "fit-content", height: "fit-content", top: "50%", left: "50%", transform: "translate(-50%, -50%)" } }}>
        <div className="flex flex-col justify-center items-center gap-8 font-sourceSans3 text-3xl font-semibold p-8">
          <div className="flex flex-col gap-2">
            <div className="text-center">Congratulations! You have finished the word hunt.</div>
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

export default Student_Game_WordHunt;
