import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Accordion from "./Accordion";
import ReactModal from "react-modal";
import "../styles/Teacher_EditAssessment.css";
import axios from "axios";

function Teacher_EditAssessment() {
  const navigate = useNavigate();
  const { assessmentId } = useParams();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSaveAssessmentModal, setShowSaveAssessmentModal] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(-1);
  const [assessment, setAssessment] = useState();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API}teacher/getAssessment/${assessmentId}`)
      .then((res) => setAssessment(res.data.assessment))
      .catch((err) => alert(err.message));
  }, []);

  const handleSaveAssessment = () => {
    setShowSaveAssessmentModal(false);
    axios.patch(`${import.meta.env.VITE_API}teacher/updateAssessment/${assessmentId}`, assessment).catch((err) => alert(err.message));
    navigate("/teacher/assessments");
  };

  const showEditQuestion = (ind) => (e) => {
    e.stopPropagation();
    setShowEditModal(true);
    setCurrentQuestion(ind);
  };

  const showDelete = (ind) => (e) => {
    e.stopPropagation();
    setShowDeleteModal(true);
    setCurrentQuestion(ind);
  };

  const handleSave = (question) => {
    const temp = { ...assessment };
    temp.questions[currentQuestion] = question;
    setAssessment(temp);
    setShowEditModal(false);
  };

  const handleAddQuestion = (question) => {
    const temp = { ...assessment };
    temp.questions = [...temp.questions, question];
    setAssessment(temp);
    setShowAddModal(false);
  };

  const handleDeleteQuestion = (ind) => {
    const temp = { ...assessment };
    temp.questions.splice(ind, 1);
    setAssessment(temp);
    setShowDeleteModal(false);
  };

  return (
    <>
      <div className="flex flex-col flex-grow gap-4">
        <h1 className="mx-2 p-4 text-xl sm:text-4xl font-bold text-white shadow-md backgroundGreen rounded-xl font-reemkufifont ">CUSTOM-ASSESSMENTS</h1>

        <div className="mx-2 flex flex-col flex-grow gap-4 p-2 pt-4 sm:p-5 font-bold backgroundGreen rounded-3xl">
          <div className="flex flex-row flex-wrap-reverse justify-end gap-4 text-xl sm:text-2xl">
            <button
              className="bg-[#282424] rounded-xl px-8 py-2 text-white text-2xl font-bold hover:brightness-90 hover:scale-[.99] transition-transform transform-gpu hover:shadow-green-500 shadow-black shadow-lg"
              onClick={() => setShowAddModal(true)}
            >
              ADD QUESTION
            </button>
            <button
              className="bg-[#282424] rounded-xl px-8 py-2 text-white text-2xl font-bold hover:brightness-90 hover:scale-[.99] transition-transform transform-gpu hover:shadow-green-500 shadow-black shadow-lg"
              onClick={() => setShowSaveAssessmentModal(true)}
            >
              SAVE ASSESSMENT
            </button>
          </div>

          <div className="flex flex-col gap-4 my-4">
            {assessment?.questions.map((i, ind) => (
              <Accordion key={ind}>
                <Accordion.Title>
                  <div className="flex flex-col sm:flex-row items-center text-xl sm:text-3xl justify-between flex-grow">
                    <h4 className="font-bold font-sourceSans3">{`Question ${ind + 1}`}</h4>
                    <div className="flex flex-row gap-2 font-bold text-white">
                      <button className="bg-[#08a454] rounded-xl shadow-lg px-4 sm:px-8 py-2 shadow-black hover:scale-[.98] transition-transform transform-gpu hover:shadow-green-300" onClick={showEditQuestion(ind)}>
                        EDIT
                      </button>
                      <button className="bg-[#d00c24] rounded-xl shadow-lg px-4 sm:px-8 py-2 shadow-black hover:scale-[.98] transition-transform transform-gpu hover:shadow-red-300" onClick={showDelete(ind)}>
                        DELETE
                      </button>
                    </div>
                  </div>
                </Accordion.Title>
                <Accordion.Content>
                  <div className="flex flex-col gap-4 font-sourceSans3 ">
                    <div className="text-3xl font-bold ms-8">{i.question}</div>
                    <div className="flex flex-col text-2xl ms-16">
                      {i.choices.map((c, indc) => (
                        <div className={indc === i.correctAnswer ? "font-bold" : "font-normal"} key={indc}>{`${String.fromCharCode(97 + indc)}. ${c}`}</div>
                      ))}
                    </div>
                  </div>
                </Accordion.Content>
              </Accordion>
            ))}
          </div>
        </div>
      </div>
      <AddModal show={showAddModal} onHide={() => setShowAddModal(false)} onSave={handleAddQuestion} />
      <EditModal show={showEditModal} onHide={() => setShowEditModal(false)} onSave={handleSave} question={assessment?.questions[currentQuestion]} />
      <DeleteModal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} onSave={handleDeleteQuestion} />
      <SaveAssessmentModal show={showSaveAssessmentModal} onHide={() => setShowSaveAssessmentModal(false)} onSave={handleSaveAssessment} />
    </>
  );
}

export default Teacher_EditAssessment;

function AddModal({ show, onHide, onSave }) {
  const [questionInput, setQuestionInput] = useState("");
  const [choices, setChoices] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState(-1);

  useEffect(() => {
    setQuestionInput("");
    setChoices(["", ""]);
    setCorrectAnswer(-1);
  }, [show]);

  const editChoice = (ind, choice) => {
    const temp = [...choices];
    temp[ind] = choice;
    setChoices(temp);
  };

  const isAddDisabled = () => {
    return questionInput === "" || correctAnswer === -1 || !choices.every((c) => c !== "")
  }

  if (!show) return;

  return (
    <ReactModal appElement={document.getElementById("root")} isOpen={show} shouldCloseOnEsc={true} style={modalStyle}>
      <div className="flex flex-col justify-center gap-8 text-white font-semibold font-sourceSans3">
        <div className="text-xl sm:text-3xl text-center">ADD A QUESTION</div>
        <div className="flex flex-row items-center gap-2 text-2xl">
          <label className="hidden sm:block" htmlFor="question">
            Question:
          </label>
          <input
            className="text-black px-4 py-1 border-2 w-full border-[#08a454] focus:outline-none focus:shadow-green-400 rounded-full focus:shadow-md"
            style={{ maxWidth: "400px" }}
            type="text"
            id="question"
            placeholder="Question"
            value={questionInput}
            onChange={(e) => e.target.value.length <= 200 && setQuestionInput(e.target.value)}
          />
        </div>
        <div className="flex flex-row gap-3">
          <div className="hidden sm:block text-2xl">Choices:</div>
          <div className="flex flex-col flex-grow gap-3">
            {choices.map((choice, ind) => (
              <div className="flex flex-row items-center gap-2" key={ind}>
                <input
                  className="text-black px-4 py-1 border-2 w-full border-[#08a454] focus:outline-none focus:shadow-green-400 rounded-full focus:shadow-md"
                  style={{ maxWidth: "400px" }}
                  type="text"
                  value={choice}
                  onChange={(e) => e.target.value.length <= 200 && editChoice(ind, e.target.value)}
                  placeholder="Choice"
                />
                <input type="checkbox" checked={ind === correctAnswer} onChange={() => setCorrectAnswer(ind)} />
              </div>
            ))}
            <button className="flex-grow text-2xl text-white bg-[#08a454] rounded-full shadow-md py-2 me-12" onClick={() => setChoices([...choices, ""])}>
              + Add a choice
            </button>
          </div>
        </div>
        <div className="flex flex-row justify-end gap-2 text-white">
          <button className="text-2xl bg-[#d00c24] rounded-full shadow-md px-6 py-2 hover:brightness-95" onClick={onHide}>
            CANCEL
          </button>
          <button className="text-2xl bg-[#08a454] rounded-full shadow-md px-6 py-2 hover:brightness-95 disabled:brightness-75" onClick={() => onSave({ question: questionInput, choices, correctAnswer })} disabled={isAddDisabled()}>
          {/* <button className="text-2xl bg-[#08a454] rounded-full shadow-md px-6 py-2 hover:brightness-95" onClick={() => onSave({ question: questionInput, choices, correctAnswer })}> */}
            SAVE
          </button>
        </div>
      </div>
    </ReactModal>
  );
}

function EditModal({ show, onHide, onSave, question }) {
  const [questionInput, setQuestionInput] = useState("");
  const [choices, setChoices] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState(-1);

  useEffect(() => {
    if (question) {
      setQuestionInput(question.question);
      setChoices(question.choices);
      setCorrectAnswer(question.correctAnswer);
    }
  }, [question]);

  const editChoice = (ind, choice) => {
    const temp = [...choices];
    temp[ind] = choice;
    setChoices(temp);
  };

  const isAddDisabled = () => {
    return questionInput === "" || correctAnswer === -1 || !choices.every((c) => c !== "")
  }

  if (!show) return;

  return (
    <ReactModal appElement={document.getElementById("root")} isOpen={show} shouldCloseOnEsc={true} style={modalStyle}>
      <div className="flex flex-col justify-center gap-8 text-white font-semibold font-sourceSans3">
        <div className="text-xl sm:text-3xl text-center">EDIT QUESTION</div>
        <div className="flex flex-row items-center gap-2 text-2xl">
          <label className="hidden sm:block" htmlFor="question">
            Question:
          </label>
          <input
            className="text-black px-4 py-1 border-2 w-full border-[#08a454] focus:outline-none focus:shadow-green-400 rounded-full focus:shadow-md"
            style={{ maxWidth: "400px" }}
            type="text"
            id="question"
            placeholder="Question"
            value={questionInput}
            onChange={(e) => e.target.value.length <= 200 && setQuestionInput(e.target.value)}
          />
        </div>
        <div className="flex flex-row gap-3">
          <div className="hidden sm:block text-2xl">Choices:</div>
          <div className="flex flex-col flex-grow gap-3">
            {choices.map((choice, ind) => (
              <div className="flex flex-row items-center gap-2" key={ind}>
                <input
                  className="text-black px-4 py-1 border-2 w-full border-[#08a454] focus:outline-none focus:shadow-green-400 rounded-full focus:shadow-md"
                  style={{ maxWidth: "400px" }}
                  type="text"
                  value={choice}
                  onChange={(e) => e.target.value.length <= 200 && editChoice(ind, e.target.value)}
                  placeholder="Choice"
                />
                <input type="checkbox" checked={ind === correctAnswer} onChange={() => setCorrectAnswer(ind)} />
              </div>
            ))}
            <button className="flex-grow text-2xl text-white bg-[#08a454] rounded-full shadow-md py-2 me-12" onClick={() => setChoices([...choices, ""])}>
              + Add a choice
            </button>
          </div>
        </div>
        <div className="flex flex-row justify-end gap-2 text-white">
          <button className="text-2xl bg-[#d00c24] rounded-full shadow-md px-6 py-2 hover:brightness-95" onClick={onHide}>
            CANCEL
          </button>
          <button className="text-2xl bg-[#08a454] rounded-full shadow-md px-6 py-2 hover:brightness-95 disabled:brightness-50" onClick={() => onSave({ question: questionInput, choices, correctAnswer })} disabled={isAddDisabled()}>
            SAVE
          </button>
        </div>
      </div>
    </ReactModal>
  );
}

function DeleteModal({ show, onHide, onSave }) {
  if (!show) return;
  return (
    <ReactModal appElement={document.getElementById("root")} isOpen={show} shouldCloseOnEsc={true} style={modalStyle}>
      <div className="flex flex-col justify-center gap-8 p-4 text-white font-semibold font-sourceSans3">
        <h2 className="text-3xl text-center">DELETE QUESTION</h2>
        <div className="text-2xl">
          Reminder: <br />
          Upon clicking proceed, all information provided under the question will be deleted.
        </div>
        <div className="flex flex-row flex-wrap justify-center gap-2 text-white">
          <button className="text-2xl bg-[#08a454] rounded-xl shadow-md px-6 py-2 hover:brightness-95" onClick={onHide}>
            CANCEL
          </button>
          <button className="text-2xl bg-[#d00c24] rounded-xl shadow-md px-6 py-2 hover:brightness-95" onClick={onSave}>
            PROCEED
          </button>
        </div>
      </div>
    </ReactModal>
  );
}

function SaveAssessmentModal({ show, onHide, onSave }) {
  if (!show) return;
  return (
    <ReactModal appElement={document.getElementById("root")} isOpen={show} shouldCloseOnEsc={true} style={modalStyle}>
      <div className="flex flex-col justify-center gap-8 p-2 font-semibold text-white font-sourceSans3">
        <h2 className="text-3xl text-center">SAVE ASSESSMENT</h2>
        <div className="text-2xl">
          Reminder: <br />
          Please make sure all questions were properly created and no question was added without any questions/answer.
        </div>
        <div className="flex flex-row justify-end gap-2 text-white">
          <button className="bg-[#d00c24] text-2xl rounded-xl shadow-lg px-4 py-2 shadow-black hover:scale-[.98] transition-transform transform-gpu hover:shadow-red-300" onClick={onHide}>
            CANCEL
          </button>
          <button className="bg-[#08a454] text-2xl rounded-xl shadow-lg px-4 py-2 shadow-black hover:scale-[.98] transition-transform transform-gpu hover:shadow-green-300" onClick={onSave}>
            SAVE
          </button>
        </div>
      </div>
    </ReactModal>
  );
}

const modalStyle = {
  content: {
    backgroundImage: `url('/src/assets/Homepage_Image/green.svg')`,
    border: "0",
    borderRadius: "2rem",
    maxWidth: "95dvw",
    maxHeight: "80dvh",
    width: "fit-content",
    height: "fit-content",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.4)",
  },
};
