import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Student_Game_FourPicsOneWord from "./Student_Game_FourPicsOneWord";
import Student_Game_WordHunt from "./Student_Game_WordHunt";

function Student_Game() {
  const navigate = useNavigate();
  const { moduleNumber } = useParams();
  const gradeLevel = localStorage.getItem("gradeLevel");
  const username = localStorage.getItem("username");
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      let { progressReport: res } = await (await fetch(`${import.meta.env.VITE_API}teacher/progress-report/${username}`)).json();
      if ((moduleNumber - 1) * 4 > res.unlockedModules.length - 2) navigate("/student");
      setIsLoading(false);
      const { id } = await (await fetch(`/modules/grade${gradeLevel}/module${moduleNumber}/game.json`)).json();
      res = await (await fetch(`${import.meta.env.VITE_API}admin/module/${id}`)).json();
      setData(res.data);
    };
    init();
  }, []);

  if (isLoading || data === null) return;
  else if (data.type === "Word Hunt") return <Student_Game_WordHunt />;
  else if (data.type == "4pics1word") return <Student_Game_FourPicsOneWord />;
}

export default Student_Game;
