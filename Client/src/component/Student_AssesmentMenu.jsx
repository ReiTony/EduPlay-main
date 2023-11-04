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
    <div className="bg-[#fff5be] flex flex-col items-center m-4 mb-6 p-8 rounded-2xl h-full">
      <h3 className="text-5xl font-semibold my-2 font-sourceSans3">Assessments</h3>
      <hr className="bg-black h-1 w-full" />

      <div className="flex flex-col gap-4 h-full justify-center my-6">
        {modules?.map((module, index) => (
          <button className="text-2xl px-6 py-2 font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-700" onClick={() => navigate(`/student/module/${module.number}/assessment`)} key={index}>
            {`Module ${module.number}: ${module.title}`}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Student_AssessmentMenu;
