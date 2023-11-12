import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Student_Game_FourPicsOneWord from "./Student_Game_FourPicsOneWord";
import Student_Game_WordHunt from "./Student_Game_WordHunt";

function Student_Game() {
  const { moduleNumber } = useParams();
  const gradeLevel = localStorage.getItem("gradeLevel");
    const [data, setData] = useState(null);

  useEffect(() => {
    const init = async () => {
      const { id } = await (await fetch(`/modules/grade${gradeLevel}/module${moduleNumber}/game.json`)).json();
      const res = await (await fetch(`${import.meta.env.VITE_API}admin/module/${id}`)).json();
      setData(res.data);
    };
    init();
  }, []);

  if (data === null) return;
  else if (data.type === "Word Hunt") return <Student_Game_WordHunt />;
  else if (data.type == "4pics1word") return <Student_Game_FourPicsOneWord />;
}

export default Student_Game;
