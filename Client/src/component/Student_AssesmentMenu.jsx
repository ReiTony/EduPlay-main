import { useEffect, useState } from "react";
import { FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Student_AssessmentMenu() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const gradeLevel = localStorage.getItem("gradeLevel");
  const [modules, setModules] = useState(null);

  useEffect(() => {
    const init = async () => {
      const res = await (await fetch(`${import.meta.env.VITE_API}teacher/progress-report/${username}`)).json();
      const data = await (await fetch(`/modules/grade${gradeLevel}/summary.json`)).json();
      data.forEach((ass, ind) => (ass.locked = res.progressReport.unlockedModules.length + 1 < 4 * (ind + 1)));
      setModules(data);
    };
    init();
  }, []);

  return (
    <div className="bg-[#fff5be] flex flex-col items-center m-4 mb-6 p-8 rounded-2xl flex-grow">
      <h3 className="text-5xl font-semibold my-2 me-auto font-sourceSans3">Assessments</h3>
      <hr className="bg-black h-1 w-full" />

      <div className="flex flex-col gap-4 h-full justify-center my-6 w-full">
        {modules?.map((module, index) => (
          <div className="flex flex-row justify-between items-center bg-[#ffbc5c] shadow-md rounded-full w-full px-8 py-4" key={index}>
            <div className="text-3xl font-bold">{`Module ${module.number}: ${module.title}`}</div>
            <button
              className={`text-white font-semibold text-2xl ${module.locked ? "bg-neutral-600 px-11 py-2" : "bg-[#282424] px-6 py-1"} shadow-md rounded-full`}
              disabled={module.locked}
              onClick={() => navigate(`/student/module/${module.number}/assessment`)}>
              {module.locked ? <FaLock /> : "OPEN"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Student_AssessmentMenu;
