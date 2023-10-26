import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Student_AssessmentMenu() {
  const navigate = useNavigate();
  const [modules, setModules] = useState(null);

  useEffect(() => {
    const init = async () => {
      const gradeLevel = localStorage.getItem("gradeLevel");
      const res = await fetch(`/modules/grade${gradeLevel}/summary.json`);
      setModules((await res.json()).modules);
    };
    init();
  }, []);

  return (
    <div className="bg-[#fff5be] flex flex-col items-center m-4 mb-6 p-8 rounded-2xl h-full">
      <h3 className="text-5xl font-semibold my-2 font-sourceSans3">Assessments</h3>
      <hr className="bg-black h-1 w-full" />

      <div className="flex flex-col gap-4 h-full justify-center my-6">
        {modules?.map((module, index) => (
          <button className="text-2xl px-6 py-2 font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-700" onClick={() => navigate(`/Student/Module/${module.number}/Assessment`)} key={index}>
            {`Module ${module.number}: ${module.title}`}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Student_AssessmentMenu;

// import React, { useState, useEffect } from "react";
// import Grade1AssessmentModule from "../Student_Data/Grade_1_game_module/Grade_1_Assessment_module.json";
// import Grade2AssessmentModule from "../Student_Data/Grade_2_game_module/Grade_2_Assessment_module.json";
// import Grade3AssessmentModule from "../Student_Data/Grade_3_game_module/Grade_3_Assessment_module.json";
// import { useNavigate } from "react-router-dom";

// function StudentAssessmentMenu() {
//   const navigate = useNavigate();
//   const gradeLevel = JSON.parse(window.localStorage.getItem("gradeLevel"));
//   const handleButtonClick = (module, index) => {
//     // Your switch statement logic here
//     switch (index) {
//       case 0:
//         navigate("/Student/Assessment/4-pics-1-word");
//         window.localStorage.setItem("QUIZ_MODULE_TITLE", JSON.stringify(module.title));

//         break;
//       case 1:
//         navigate("/Student/Assessment/4-pics-1-word");
//         window.localStorage.setItem("QUIZ_MODULE_TITLE", JSON.stringify(module.title));

//         break;
//       default:
//         break;
//     }
//   };

//   let assessmentModule;

//   if (gradeLevel === 1) {
//     assessmentModule = Grade1AssessmentModule;
//   } else if (gradeLevel === 2) {
//     assessmentModule = Grade2AssessmentModule;
//   } else if (gradeLevel === 3) {
//     assessmentModule = Grade3AssessmentModule;
//   } else {
//     // Default None
//   }

//   return (
//     <div className="bg-[#fff5be] rounded-3xl p-4 m-4">
//       <div className="flex flex-col items-center justify-center text-2xl h-[80vh]">
//         {assessmentModule.map((module, index) => (
//           <div className="mb-2" key={index}>
//             <button className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700" onClick={() => handleButtonClick(module, index)}>
//               {module.title}
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default StudentAssessmentMenu;
