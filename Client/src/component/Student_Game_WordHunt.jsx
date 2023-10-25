import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Student_Game_WordHunt() {
  const { moduleNumber } = useParams();
  const [origin, setOrigin] = useState([-1, -1]);
  const [current, setCurrent] = useState([-2, -2]);
  const [shaded, setShaded] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [data, setData] = useState(null);

  useEffect(() => {
    const init = async () => {
      const res = await fetch(`/modules/${moduleNumber}/game.json`);
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

  const handleMouseUp = () => {
    if (data?.answers.includes(current + " " + origin)) {
      const temp = answers;
      shaded.forEach((i) => temp.push(i));
      setAnswers(temp);
    }
    setOrigin([-1, -1]);
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

  return (
    <div className="bg-[#fff5be] flex flex-col items-center m-4 mb-6 p-8 rounded-2xl h-full">
      <h3 className="text-3xl font-semibold my-2 font-sourceSans3">{data?.title || ""}</h3>

      <hr className="bg-black h-1 w-full" />

      <div className="mygrid m-10 p-4 bg-slate-100 rounded-2xl shadow-lg">
        {data?.puzzle.map((row, rowNum) =>
          row.map((i, colNum) => (
            <div
              className={`ele flex justify-center items-center font-semibold text-lg ${
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

      <div className="" style={{ maxWidth: "1024px" }}>
        {data?.clues.map((clue, index) => (
          <p className="text-lg font-semibold" key={index}>
            {index + 1 + ".  " + clue}
          </p>
        ))}
      </div>
    </div>
  );
}

export default Student_Game_WordHunt;
