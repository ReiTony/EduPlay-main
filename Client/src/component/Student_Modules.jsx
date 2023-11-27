import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import { FaLock } from "react-icons/fa";

function Student_Modules() {
  const navigate = useNavigate();
  const gradeLevel = JSON.parse(localStorage.getItem("gradeLevel"));
  const username = localStorage.getItem("username");
  const [studentProgressData, setStudentProgressData] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const init = async () => {
      let data = await (await fetch(`${import.meta.env.VITE_API}teacher/progress-report/${username}`)).json();
      setProgress(data.progressReport.unlockedModules.length);
      data = await (await fetch(`/modules/grade${gradeLevel}/summary.json`)).json();
      data.forEach((module) => (module.isOpen = false));
      setStudentProgressData(data);
    };
    init();
  }, []);

  const toggleModule = (index) => {
    const temp = [...studentProgressData];
    temp[index].isOpen = !temp[index].isOpen;
    setStudentProgressData(temp);
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="backgroundYellow">
      <div className="relative grid p-4 rounded-3xl">
        <div className="bg-[#fff5be] rounded-xl p-5">
          <div className="p-2 text-5xl font-bold font-sourceSans3">MODULES</div>
          <div className="w-full border-b-4 border-black"></div>

          <div className="flex flex-col gap-2 mt-3 py-5 px-2">
            {studentProgressData?.map((module, index) => (
              <div key={index}>
                <div className={`p-2 px-6 bg-[#ffbd59] rounded-full text-lg sm:text-2xl lg:text-4xl xl:text-4xl font-bold flex items-center justify-between mb-2 cursor-pointer shadow-md`} onClick={() => toggleModule(index)}>
                  <p>{`Module ${module.number}: ${module.title}`}</p>
                  {module.isOpen ? <MdExpandLess className="text-5xl" /> : <MdExpandMore className="text-5xl" />}
                </div>
                {module.isOpen && (
                  <div className="p-4 bg-[#ffcc80] rounded-xl mb-4">
                    {module.submodules.map((submodule, subIndex) => (
                      <div key={subIndex} className="flex items-center justify-between p-2 px-6 mb-2 font-bold bg-white rounded-full sm:text-3xl">
                        <h1>{submodule.title}</h1>
                        <button
                          className={`text-white text-2xl hover:shadow-green-500 hover:scale-95 transition-transform transform-gpu  ${
                            index * 4 + subIndex > progress ? "bg-neutral-600 px-11 py-2" : "bg-[#282424] px-6 py-1"
                          } shadow-md rounded-full`}
                          disabled={index * 4 + subIndex > progress}
                          onClick={() => navigate(`/student/module/${module.number}/${subIndex === 0 ? "lecture" : subIndex === 1 ? "review" : "game"}`)}>
                          {index * 4 + subIndex > progress ? <FaLock /> : "OPEN"}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <button className="fixed justify-center p-3 text-white bg-blue-800 rounded-full bottom-4 right-4 focus:outline-none" onClick={handleScrollToTop}>
        <BsFillArrowUpCircleFill className="text-3xl" />
      </button>
    </div>
  );
}

export default Student_Modules;
