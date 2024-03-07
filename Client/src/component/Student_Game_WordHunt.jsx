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
  const [moduleId, setModuleId] = useState();
  const [data, setData] = useState(null);
  const [origin, setOrigin] = useState([-1, -1]);
  const [current, setCurrent] = useState([-2, -2]);
  const [shaded, setShaded] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [solved, setSolved] = useState(0);
  const [isModalCompleteOpen, setIsModalCompleteOpen] = useState(false);
  const [isModalFoundOpen, setIsModalFoundOpen] = useState(false);
  const [lastFoundWord, setLastFoundWord] = useState();
  const [isSwiping, setIsSwiping] = useState(false);

  useEffect(() => {
    const init = async () => {
      const { id } = await (await fetch(`/modules/grade${gradeLevel}/module${moduleNumber}/game.json`)).json();
      setModuleId(id);
      const res = await (await fetch(`${import.meta.env.VITE_API}admin/module/${id}`)).json();
      setData(res.data);
    };
    init();
  }, []);

  const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|Tablet/.test(navigator.userAgent);
  };

  useEffect(() => {
    if (isMobile()) return;
    if (JSON.stringify(origin) === JSON.stringify(current)) setShaded([origin[0].toString() + origin[1].toString()]);
    else if (origin[0] > current[0] && origin[1] === current[1]) setShaded(generateUpDownPattern(origin, current)); // upward
    else if (origin[0] < current[0] && origin[1] === current[1]) setShaded(generateUpDownPattern(current, origin)); // downward
    else if (origin[1] > current[1] && origin[0] === current[0]) setShaded(generateLeftRightPattern(current, origin)); // left
    else if (origin[1] < current[1] && origin[0] === current[0]) setShaded(generateLeftRightPattern(origin, current)); // right
    else setShaded([]);
  }, [current, origin]);

  useEffect(() => {
    if (solved >= data?.words.length) {
      axios.post(`${import.meta.env.VITE_API}student/module-record`, { username, moduleId, title: data.title });
      axios.post(`${import.meta.env.VITE_API}student/game-score`, { username, gameType: "4Pics", score: solved });
      setIsModalCompleteOpen(true);
    }
  }, [solved]);

  const handleTTSClick = () => {
    if (speechSynthesis.speaking) return;
    let utterance = new SpeechSynthesisUtterance(data?.tts);
    speechSynthesis.speak(utterance);
  };

  const handleMouseUp = () => {
    if (isMobile()) return;
    if (data?.answers.includes(current + " " + origin)) {
      found(data?.answers.indexOf(current + " " + origin));
      shade();
      setSolved((i) => i + 1);
    }
    setOrigin([-1, -1]);
  };

  const found = (ind) => {
    const temp = { ...data };
    temp.words[ind].found = true;
    setData(temp);
    setLastFoundWord(data.words[ind]);
    setIsModalFoundOpen(true);
    speechSynthesis.cancel();
    speechSynthesis.speak(new SpeechSynthesisUtterance(data.words[ind].meaning));
  };
  const shade = () => {
    const temp = answers;
    shaded.forEach((i) => temp.push(i));
    setAnswers(temp);
  };

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

  const handleTouchStart = (move, status) => {
    if (isSwiping && status === "END") {
      let tempShaded;
      if (origin[0] > move[0] && origin[1] === move[1]) tempShaded = generateUpDownPattern(origin, move); // upward
      else if (origin[0] < move[0] && origin[1] === move[1]) tempShaded = generateUpDownPattern(move, origin); // downward
      else if (origin[1] > move[1] && origin[0] === move[0]) tempShaded = generateLeftRightPattern(move, origin); // left
      else if (origin[1] < move[1] && origin[0] === move[0]) tempShaded = generateLeftRightPattern(origin, move); // right
      else tempShaded = "";
      if (data?.answers.includes(move + " " + origin)) {
        const temp = answers;
        tempShaded.forEach((i) => temp.push(i));
        setAnswers(temp);
        setSolved((i) => i + 1);
        found(data?.answers.indexOf(move + " " + origin));
      }
      setShaded([]);
      setCurrent([-1, -1]);
      setOrigin([-1, -1]);
      setIsSwiping(false);
    } else if (!isSwiping) {
      if (status === "END") return setIsSwiping(true);
      setShaded([move.join("")]);
      setOrigin(move);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center h-full p-4 sm:p-8 m-4 mb-6 shadow-md secondBackground shadow-black rounded-2xl">
        <h3 className="my-2 text-5xl font-semibold font-sourceSans3">{data?.title || ""}</h3>

        <hr className="w-full h-1 bg-black" />

        <div className="flex flex-col items-start lg:gap-10 lg:flex-row">
          <div className="grid flex-grow grid-cols-9 p-2 sm:p-4 my-4 sm:my-16 shadow-lg grid-rows-10 text-xl bg-slate-100 rounded-2xl">
            {data?.puzzle.map((row, rowNum) =>
              row.map((i, colNum) => (
                <div
                  className={`ele flex justify-center items-center font-semibold lg:text-2xl  ${
                    shaded.includes(rowNum.toString() + (colNum + 1).toString()) ? "bg-green-400" : answers.includes(rowNum.toString() + (colNum + 1).toString()) ? "bg-blue-400" : "bg-slate-100"
                  }`}
                  key={rowNum + "-" + colNum}
                  onMouseDown={() => setOrigin([rowNum, colNum + 1])}
                  onTouchStart={() => handleTouchStart([rowNum, colNum + 1], "START")}
                  onTouchEnd={() => handleTouchStart([rowNum, colNum + 1], "END")}
                  onMouseUp={handleMouseUp}
                  onMouseEnter={() => setCurrent([rowNum, colNum + 1])}>
                  {i}
                </div>
              ))
            )}
          </div>

          <div className="flex flex-col flex-grow gap-2 mx-2 my-4 lg:my-16 text-2xl font-sourceSans3" style={{ maxWidth: "720px" }}>
            <div className="flex flex-row items-center gap-6 mb-8">
              <h4 className="text-4xl font-semibold">Words to Find</h4>
              <img className="cursor-pointer" onClick={handleTTSClick} src={textToSpeechIcon} alt="textToSpeechIcon" style={{ maxHeight: "40px" }} />
            </div>
            {data?.words.map((word, index) => (
              <div className="flex flex-row gap-2 font-semibold" key={index}>
                <div className="font-mono">{word.found ? "☑" : "☐"}</div>
                <div>{`${word.word}${word.found ? " - " + word.meaning : ""}`}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ReactModal appElement={document.getElementById("root")} isOpen={isModalCompleteOpen} shouldCloseOnEsc={true} style={modalStyle}>
        <div className="flex flex-col items-center justify-center gap-8 p-8 text-3xl font-semibold font-sourceSans3">
          <div className="flex flex-col gap-2">
            <div className="text-center">Congratulations! You have finished the word hunt.</div>
            <div className="text-center">Do you want to go to assessment?</div>
          </div>
          <div className="flex flex-row justify-center gap-4">
            <button className="px-10 py-2 text-white bg-red-500 rounded-full shadow-md hover:brightness-90 hover:shadow-red-500 hover:scale-95 transform-gpu" onClick={() => setIsModalCompleteOpen(false)}>
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
      <ReactModal appElement={document.getElementById("root")} isOpen={isModalFoundOpen} shouldCloseOnEsc={true} style={modalStyle}>
        <div className="flex flex-col items-center justify-center gap-8 p-8 font-sourceSans3">
          <h2 className="text-3xl font-semibold text-center">{lastFoundWord?.word}</h2>
          <h4 className="text-2xl text-center">{lastFoundWord?.meaning}</h4>
          <button
            className="bg-[#08a454] text-white text-2xl font-bold px-10 py-2 rounded-full shadow-md hover:brightness-90  hover:shadow-green-500 hover:scale-95 transition-transform transform-gpu"
            onClick={() => setIsModalFoundOpen(false)}>
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

export default Student_Game_WordHunt;
