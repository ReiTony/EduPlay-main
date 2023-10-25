import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Student_Game_FourPicsOneWord from "./Student_Game_FourPicsOneWord";
import Student_Game_WordHunt from "./Student_Game_WordHunt";

function Student_Game() {
  const [data, setData] = useState(null);
  const { moduleNumber } = useParams();

  useEffect(() => {
    const init = async () => {
      const res = await fetch(`/modules/${moduleNumber}/game.json`);
      setData(await res.json());
    };
    init();
  }, []);

  if (data === null) return;
  else if (data.type === "Word Hunt") return <Student_Game_WordHunt />;
  else if (data.type == "4pics1word") return <Student_Game_FourPicsOneWord />;
}

export default Student_Game;
