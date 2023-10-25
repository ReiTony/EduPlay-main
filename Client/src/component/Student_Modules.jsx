import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import { FaLock } from "react-icons/fa";
import Grade1_Module_Structure from "../Student_Data/Grade1_Module_Structure.json";
import Grade2_Module_Structure from "../Student_Data/Grade2_Module_Structure.json";
import Grade3_Module_Structure from "../Student_Data/Grade3_Module_Structure.json";
import { Link, useNavigate } from "react-router-dom";

function Student_Modules() {
  const [moduleStates, setModuleStates] = useState([]);
  const [studentProgressData, setStudentProgressData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve gradeLevel from localStorage
    const gradeLevel = JSON.parse(window.localStorage.getItem("gradeLevel"));

    // Set the studentProgressData based on gradeLevel
    if (gradeLevel == 1) {
      setStudentProgressData(Grade1_Module_Structure);
    } else if (gradeLevel == 2) {
      setStudentProgressData(Grade2_Module_Structure);
    } else if (gradeLevel == 3) {
      setStudentProgressData(Grade3_Module_Structure);
    } else {
      // Handle the case when gradeLevel is not 1, 2, or 3
      console.error("Invalid gradeLevel:", gradeLevel);
    }
  }, []);
  if (studentProgressData === null) {
    return <div>Loading...</div>;
  }

  //
  const toggleModule = (index) => {
    const updatedStates = [...moduleStates];
    updatedStates[index] = !updatedStates[index];
    setModuleStates(updatedStates);
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSubmoduleClick = (subIndex, isLocked, moduleIndex, moduleTitle, src) => {
    if (isLocked) {
      // Hindi mag navigate pag naka Lock
      return;
    }
    const title = `M${moduleIndex}-${moduleTitle}`;
    switch (subIndex) {
      case 0:
        navigate("/Student/Module/Lecture");
        window.sessionStorage.setItem("MODULE", JSON.stringify(title));
        window.sessionStorage.setItem("SRC", JSON.stringify(src));
        break;
      case 1:
        navigate("/Student/Module/Review");
        window.sessionStorage.setItem("MODULE", JSON.stringify(title));
        window.sessionStorage.setItem("SRC", JSON.stringify(src));
        break;
      case 2:
        navigate("/Student/Module/Game");
        window.sessionStorage.setItem("MODULE", JSON.stringify(title));
        window.sessionStorage.setItem("SRC", JSON.stringify(src));
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className="backgroundYellow">
        <div>
          <div>
            <div className="relative grid p-4 rounded-3xl">
              <div className="bg-[#fff5be]  rounded-xl">
                <div className="p-5 text-5xl font-bold font-sourceSans3">
                  <h1>MODULES</h1>
                  <div className="w-full border-b-4 border-black"></div>
                </div>

                <div className="px-5">
                  {studentProgressData.map((module, index) => (
                    <div key={index}>
                      {console.log(module)}
                      <div
                        className={`p-2 px-6 bg-[#ffbd59] rounded-full text-lg sm:text-2xl lg:text-4xl xl:text-4xl font-bold flex items-center justify-between mb-2 cursor-pointer ${
                          moduleStates[index] ? "cursor-pointer" : ""
                        }`}
                        onClick={() => toggleModule(index)}>
                        <p>{module.title}</p>
                        {moduleStates[index] ? <MdExpandLess className="text-5xl" /> : <MdExpandMore className="text-5xl" />}
                      </div>
                      {moduleStates[index] && (
                        <div className="p-4 bg-[#ffcc80] rounded-xl mb-4">
                          {module.submodules.map((submodule, subIndex) => (
                            <div key={subIndex} className="flex items-center justify-between p-2 px-6 mb-2 font-bold bg-white rounded-full sm:text-3xl">
                              <h1>{submodule.title}</h1>
                              {console.log(submodule)}
                              {/* <button className="p-2 px-4 text-white bg-black rounded-full" onClick={() => handleSubmoduleClick(subIndex, submodule.locked, index, module.title, submodule.src)}> */}
                              <button className="p-2 px-4 text-white bg-black rounded-full" onClick={() => navigate(`/Student/Module/${module.moduleNumber}/Lecture`)}>
                                {submodule.locked ? <FaLock /> : "OPEN"}
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
          </div>
        </div>
        <button className="fixed justify-center p-3 text-white bg-blue-800 rounded-full bottom-4 right-4 focus:outline-none" onClick={handleScrollToTop}>
          <BsFillArrowUpCircleFill className="text-3xl" />
        </button>
      </div>
    </>
  );
}

export default Student_Modules;
