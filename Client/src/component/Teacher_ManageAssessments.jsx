import { useState } from "react";
import Accordion from "./Accordion";
import ReactModal from "react-modal";

function ManageAssessments() {
  const [showEditModal, setShowEditModal] = useState(false);
  const [questions, setQuestions] = useState([
    { question: "What is your favorite language?", choices: ["Java", "C", "Javascript", "Python"] },
    { question: "What is your favorite language?", choices: ["Java", "C", "Javascript", "Python"] },
    { question: "What is your favorite language?", choices: ["Java", "C", "Javascript", "Python"] },
    { question: "What is your favorite language?", choices: ["Java", "C", "Javascript", "Python"] },
  ]);

  const showEditQuestion = (ind) => (e) => {
    e.stopPropagation();
    setShowEditModal(true);
    console.log("EDITT");
  };

  return (
    <>
      <div className="flex flex-col flex-grow gap-4 p-4">
        <div className="bg-[#08a454] rounded-full shadow-md px-10 py-3 text-4xl font-bold font-sourceSans3">CUSTOM ASSESSMENTS</div>
        <div className="flex flex-col bg-[#a8d4a4] flex-grow gap-4 rounded-3xl p-5">
          <div className="flex flex-row justify-end gap-2">
            <button className="bg-[#282424] rounded-full shadow-md px-8 py-2 text-white text-2xl font-bold hover:brightness-90">ADD QUESTION</button>
            <button className="bg-[#282424] rounded-full shadow-md px-8 py-2 text-white text-2xl font-bold hover:brightness-90">SAVE ASSESSMENT</button>
          </div>

          <div className="flex flex-col gap-4 m-4">
            {questions.map((i, ind) => (
              <Accordion className="" key={ind}>
                <Accordion.Title>
                  <div className="flex flex-row justify-between items-center px-6">
                    <h4 className="text-4xl font-bold font-sourceSans3">{`Question ${ind + 1}`}</h4>
                    <div className="flex flex-row gap-2 text-white font-bold">
                      <button className="bg-[#08a454] rounded-full shadow-md px-8 py-2" onClick={showEditQuestion(ind)}>
                        EDIT
                      </button>
                      <button className="bg-[#d00c24] rounded-full shadow-md px-8 py-2">DELETE</button>
                    </div>
                  </div>
                </Accordion.Title>
                <Accordion.Content>
                  <div className="flex flex-col gap-4 font-sourceSans3 font-bold">
                    <div className="text-3xl ms-8">{i.question}</div>
                    <div className="flex flex-col text-2xl ms-16">
                      {i.choices.map((c, indc) => (
                        <div key={indc}>{`${String.fromCharCode(97 + indc)}. ${c}`}</div>
                      ))}
                    </div>
                  </div>
                </Accordion.Content>
              </Accordion>
            ))}
          </div>
        </div>
      </div>
      <ReactModal
        appElement={document.getElementById("root")}
        isOpen={showEditModal}
        shouldCloseOnEsc={true}
        style={{ content: { backgroundColor: "#FFFFFF", border: "0", borderRadius: "2rem", maxWidth: "720px", width: "100%", height: "fit-content", top: "50%", left: "50%", transform: "translate(-50%, -50%)" } }}>
        <div className="flex flex-col justify-center gap-8 font-sourceSans3 text-3xl font-semibold p-8">
          <div className="text-center">EDIT QUESTION</div>
          <div className="flex flex-row items-center gap-2">
            <label htmlFor="question">Question:</label>
            <input className="flex-grow border-2 rounded-full border-black" type="text" id="question" />
          </div>
        </div>
      </ReactModal>
    </>
  );
}

export default ManageAssessments;
