import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import textToSpeechIcon from "../assets/texttospeech.svg";
import ReactModal from "react-modal";

function Student_Game_FourPicsOneWord() {
  const navigate = useNavigate();
  const { moduleNumber } = useParams();
  const [data, setData] = useState(null);
  const [roundNumber, setRoundNumber] = useState(0);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [isModalCompleteOpen, setIsModalCompleteOpen] = useState(false);

  useEffect(() => {
    const init = async () => {
      const gradeLevel = localStorage.getItem("gradeLevel");
      const res = await fetch(`/modules/grade${gradeLevel}/module${moduleNumber}/game.json`);
      setData(await res.json());
    };
    init();
  }, []);

  useEffect(() => {
    if (isGameFinished) {
      setIsModalCompleteOpen(true);
    }
  }, [isGameFinished]);

  const handleSubmitAnswer = (e) => {
    e.preventDefault();
    if (roundNumber + 1 === data.rounds.length) return setIsGameFinished(true);
    else if (data?.rounds[roundNumber].answer.toLowerCase().trim() === answer.toLowerCase()) setScore((i) => i + 1);
    setRoundNumber((i) => i + 1);
    setIsImageLoaded(false);
    setAnswer("");
  };

  const handleTTSClick = () => {
    if (speechSynthesis.speaking) return;
    let utterance = new SpeechSynthesisUtterance(data?.rounds[roundNumber].clue);
    speechSynthesis.speak(utterance);
  };

  return (
    <>
      <div className="bg-[#fff5be] flex flex-col m-4 mb-6 p-8 rounded-2xl h-full">
        <div className="flex justify-between px-10">
          <h3 className="text-3xl font-semibold my-2 font-sourceSans3">{data?.title || ""}</h3>
          <h4 className="text-3xl font-semibold my-2 font-sourceSans3">{`Score: ${score}`}</h4>
        </div>

        <hr className="bg-black h-1" />

        <div className="flex flex-col justify-center items-center gap-4 py-4 h-full">
          {isGameFinished && (
            <button className="bg-[#282424] text-white font-sourceSans3 rounded-full px-12 py-2 text-lg font-semibold shadow-md" onClick={() => navigate("/student")}>
              Go To Homepage
            </button>
          )}
          <img className={isImageLoaded ? "" : "loading"} src={data?.rounds[roundNumber].imagePath} style={{ height: "450px" }} onLoad={() => setIsImageLoaded(true)} />
          {!isImageLoaded && <div className="text-2xl font-bold font-sourceSans3">Loading...</div>}
          <div className="text-2xl my-2 font-semibold">{`Clue: ${"_ ".repeat(data?.rounds[roundNumber].answer.length)}`}</div>
          <form className="flex flex-row justify-center gap-4 align-center my-4">
            <input type="text" className="px-5 py-2 rounded-lg shadow-md font-sourceSans3" placeholder="Type your answer here" style={{ width: "300px" }} value={answer} onChange={(e) => setAnswer(e.target.value)} />
            <button type="submit" className="bg-[#252525] rounded-lg shadow-md font-semibold px-6 py-1 text-white font-sourceSans3" style={{ lineHeight: "0", margin: "0" }} onClick={handleSubmitAnswer}>
              Submit
            </button>
            <img className="cursor-pointer" onClick={handleTTSClick} src={textToSpeechIcon} alt="textToSpeechIcon" style={{ maxHeight: "40px" }} />
          </form>
        </div>
      </div>
      <ReactModal
        appElement={document.getElementById("root")}
        isOpen={isModalCompleteOpen}
        shouldCloseOnEsc={true}
        style={{ content: { backgroundColor: "#d8ec8c", border: "0", borderRadius: "2rem", maxWidth: "540px", width: "fit-content", height: "fit-content", top: "50%", left: "50%", transform: "translate(-50%, -50%)" } }}>
        <div className="flex flex-col justify-center items-center gap-8 font-sourceSans3 text-3xl font-semibold p-8">
          <div className="flex flex-col gap-2">
            <div className="text-center">Congratulations! You have finished 4 Pictures 1 Word.</div>
            <div className="text-center">Do you want to go back to homepage?</div>
          </div>
          <div className="flex flex-row justify-center gap-4">
            <button className="bg-red-500 text-white px-10 py-2 rounded-full shadow-md hover:brightness-90" onClick={() => setIsModalCompleteOpen(false)}>
              NO
            </button>
            <button className="bg-[#08a454] text-white px-10 py-2 rounded-full shadow-md hover:brightness-90" onClick={() => navigate("/student")}>
              YES
            </button>
          </div>
        </div>
      </ReactModal>
    </>
  );
}

export default Student_Game_FourPicsOneWord;

// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import Grade1AssessmentModule from "../Student_Data/Grade_1_game_module/Grade_1_Assessment_module.json";
// import Grade2AssessmentModule from "../Student_Data/Grade_2_game_module/Grade_2_Assessment_module.json";
// import Grade3AssessmentModule from "../Student_Data/Grade_3_game_module/Grade_3_Assessment_module.json";

// function Student_Game_FourPicsOneWord() {
//   const { moduleNumber } = useParams();
//   // Initialize React hooks and get values from local storage
//   const navigate = useNavigate();
//   const [iframeSrc, setIframeSrc] = useState("");
//   const [answer, setAnswer] = useState("");
//   const [points, setPoints] = useState(0);
//   const quizModuleTitle = JSON.parse(window.localStorage.getItem("QUIZ_MODULE_TITLE"));
//   const gradeLevel = JSON.parse(window.localStorage.getItem("gradeLevel"));

//   // Get the saved current module and image index from local storage
//   const savedModule = localStorage.getItem("CURRENT_MODULE");
//   const savedImageIndex = localStorage.getItem("CURRENT_IMAGE_INDEX");

//   // Initialize state to track the current module and image index
//   const [currentModule, setCurrentModule] = useState(savedModule || null);
//   const [currentIndex, setCurrentIndex] = useState(savedImageIndex ? Number(savedImageIndex) : 0);

//   // Initialize a variable to hold the selected assessment module based on gradeLevel
//   let assessmentModule;

//   if (gradeLevel === 1) {
//     assessmentModule = Grade1AssessmentModule;
//   } else if (gradeLevel === 2) {
//     assessmentModule = Grade2AssessmentModule;
//   } else if (gradeLevel === 3) {
//     assessmentModule = Grade3AssessmentModule;
//   } else {
//     // Default None if gradeLevel doesn't match expected values
//   }

//   // Use useEffect to store the current module and image index in local storage
//   useEffect(() => {
//     localStorage.setItem("CURRENT_MODULE", currentModule);
//     localStorage.setItem("CURRENT_IMAGE_INDEX", currentIndex);
//   }, [currentModule, currentIndex]);

//   // Use useEffect to load the current image when the component mounts
//   useEffect(() => {
//     if (assessmentModule) {
//       const matchedModule = assessmentModule.find((module) => module.title === quizModuleTitle);

//       if (matchedModule) {
//         // Set the current module
//         setCurrentModule(matchedModule.title);

//         if (matchedModule.modules[0].images.length > 0) {
//           const currentImage = matchedModule.modules[0].images[currentIndex];
//           setIframeSrc(currentImage.imagePath);
//         }
//       }
//     }
//   }, [assessmentModule, quizModuleTitle, currentIndex]);

//   // Handle input change for the answer
//   const handleAnswerChange = (event) => {
//     setAnswer(event.target.value);
//   };

//   // Handle moving to the next image and checking the answer
//   const handleNextImage = () => {
//     if (isAnswerCorrect(answer)) {
//       // Update points, move to the next image, and clear the answer
//       setPoints(points + 1);
//       setCurrentIndex((prevIndex) => prevIndex + 1);
//       setAnswer("");

//       // Calculate the total number of images based on the current module
//       const matchedModule = assessmentModule.find((module) => module.title === quizModuleTitle);

//       if (matchedModule) {
//         const totalItems = matchedModule.modules[0].images.length;

//         console.log("currentIndex:", currentIndex);
//         console.log("totalItems:", totalItems);

//         if (currentIndex + 1 === totalItems) {
//           // If all images shown, navigate to the score page
//           console.log("Navigating to Score");
//           navigate("/Student/Assessment/4-pics-1-word/Score");
//         }
//       }

//       window.localStorage.setItem("USER_POINTS", points + 1);
//     }
//   };

//   // Check if the provided answer is correct
//   const isAnswerCorrect = (userAnswer) => {
//     if (assessmentModule) {
//       const matchedModule = assessmentModule.find((module) => module.title === quizModuleTitle);
//       if (matchedModule && matchedModule.modules[0].images[currentIndex]) {
//         const correctAnswer = matchedModule.modules[0].images[currentIndex].answer.toLowerCase();
//         return userAnswer.trim().toLowerCase() === correctAnswer;
//       }
//     }
//     return false;
//   };

//   return (
//     <>
//       <div className="bg-[#fff5be] rounded-3xl p-4 m-4">
//         <div className="flex flex-col items-center text-2xl h-[80vh]">
//           <div className="p-2 mb-4 text-2xl font-bold">
//             <h1>{quizModuleTitle}</h1>
//           </div>
//           <div className="h-[650px] w-[650px]">
//             <iframe src={iframeSrc} width="100%" height="100%" allowFullScreen allow="autoplay"></iframe>
//           </div>
//           <div>
//             <label htmlFor="answer" className="font-semibold">
//               Enter your answer:
//             </label>
//             <input type="text" id="answer" name="answer" value={answer} onChange={handleAnswerChange} className="w-full p-2 mt-2 border border-gray-300 rounded" />
//           </div>
//           <button className="p-2 m-2 font-semibold text-white bg-black rounded" onClick={handleNextImage}>
//             SUBMIT
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Student_Game_FourPicsOneWord;
