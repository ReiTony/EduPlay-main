import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Student_Module_Lecture() {
  const navigate = useNavigate();
  const gradeLevel = localStorage.getItem("gradeLevel");
  const { moduleNumber } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const init = async () => {
      let res = await fetch(`/modules/grade${gradeLevel}/module${moduleNumber}/lecture.json`);
      setData(await res.json());

      res = JSON.parse(localStorage.getItem("modules"));
      res[moduleNumber - 1].submodules[1].locked = false;
      localStorage.setItem("modules", JSON.stringify(res));
    };
    init();
  }, []);

  return (
    <div className="bg-[#fff5be] flex flex-col items-center m-4 mb-6 p-8 rounded-2xl h-full">
      <h1 className="text-3xl font-semibold font-sourceSans3">{data?.title || ""}</h1>

      <hr className="bg-black h-1 w-full my-2" />

      <iframe className="my-6" src={data?.videoLink || ""} width="864" height="486" allow="autoplay" />

      <button className="px-10 py-2 text-2xl font-bold text-center text-white bg-black rounded-full" onClick={() => navigate(`/student/module/${moduleNumber}/review`)}>
        NEXT
      </button>
    </div>
  );
}

export default Student_Module_Lecture;
