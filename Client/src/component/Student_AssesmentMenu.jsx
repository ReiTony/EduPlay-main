import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Student_AssessmentMenu() {
  const navigate = useNavigate();
  const [modules, setModules] = useState(null);

  useEffect(() => {
    const init = async () => {
      const gradeLevel = localStorage.getItem("gradeLevel");
      const res = await fetch(`/modules/grade${gradeLevel}/summary.json`);
      setModules(await res.json());
    };
    init();
  }, []);

  return (
    <div className="bg-[#fff5be] flex flex-col items-center m-4 mb-6 p-8 rounded-2xl flex-grow">
      <h3 className="text-5xl font-semibold my-2 me-auto font-sourceSans3">Assessments</h3>
      <hr className="bg-black h-1 w-full" />

      <div className="flex flex-col gap-4 h-full justify-center my-6 w-full">
        {modules?.map((module, index) => (
          <button className="text-2xl px-8 py-3 font-bold bg-[#ffbc5c] text-start rounded-full w-full" onClick={() => navigate(`/student/module/${module.number}/assessment`)} key={index}>
            {`Module ${module.number}: ${module.title}`}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Student_AssessmentMenu;
