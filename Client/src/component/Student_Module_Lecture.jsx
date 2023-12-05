import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import axios from "axios";

function Student_Module_Lecture() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const gradeLevel = localStorage.getItem("gradeLevel");
  const { moduleNumber } = useParams();
  const [data, setData] = useState(null);
  const [moduleId, setModuleId] = useState();
  const [isFinished, setIsFinished] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      let { progressReport: res } = await (await fetch(`${import.meta.env.VITE_API}teacher/progress-report/${username}`)).json();
      if ((moduleNumber - 1) * 4 > res.unlockedModules.length) navigate("/student");
      if ((moduleNumber - 1) * 4 <= res.unlockedModules.length - 1) setIsFinished(true);
      setIsLoading(false);
      const { id } = await (await fetch(`/modules/grade${gradeLevel}/module${moduleNumber}/lecture.json`)).json();
      setModuleId(id);
      res = await (await fetch(`${import.meta.env.VITE_API}admin/module/${id}`)).json();
      setData(res.data);
    };
    init();
  }, []);

  const handleNext = async () => {
    await axios.post(`${import.meta.env.VITE_API}student/module-record`, { username, moduleId, title: data.title });
    navigate(`/student/module/${moduleNumber}/review`);
  };

  if (isLoading) return;

  return (
    <div className="flex flex-col items-center flex-grow h-full p-8 m-4 mb-6 shadow-md secondBackground rounded-2xl lg:w-5/6 lg:mx-auto shadow-black">
      <h1 className="text-3xl font-semibold font-sourceSans3">{data?.title || ""}</h1>

      <hr className="w-full h-1 my-2 bg-black" />
      {/* HIDDEN TECHNIQUE FOR MOBILE RESPONSIVE NG VIDEO */}
      <div className="flex flex-col items-center justify-center flex-grow gap-8">
        <div className="flex flex-col items-center justify-center lg:hidden">
          <ReactPlayer url={data?.videoLink || ""} onEnded={() => setIsFinished(true)} controls width="110%" />
        </div>
        <div className="hidden lg:flex lg:flex-col lg:items-center lg:justify-center xl:block">
          <ReactPlayer url={data?.videoLink || ""} onEnded={() => setIsFinished(true)} controls width="1100px" height="550px" />
        </div>

        {isFinished && (
          <button className=" px-10 py-2 text-2xl font-bold text-center text-white bg-[#282424] rounded-full shadow-md hover:shadow-green-500 hover:scale-95 transition-transform transform-gpu" onClick={handleNext}>
            NEXT
          </button>
        )}
      </div>
    </div>
  );
}

export default Student_Module_Lecture;
