import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReactModal from "react-modal";
import Accordion from "./Accordion";
import "../styles/Teacher_EditAssessment.css";

function Teacher_CreateAssessment() {
  const navigate = useNavigate();
  const [stepNumber, setStepNumber] = useState(0);
  const [title, setTitle] = useState("");
  const [gradeLevel, setGradeLevel] = useState("");
  const [moduleNumber, setModuleNumber] = useState("");

  const handleSave = async (questions) => {
    const answers = questions.map((i) => ({ answer: i.choices[i.correctAnswer] }));
    axios
      .post(`${import.meta.env.VITE_API}teacher/createassessment`, { title, gradeLevel, answers, questions, moduleNumber })
      .then((res) => navigate("/teacher/assessments"))
      .catch((err) => alert(err.message));
  };

  const handleProceed = () => {
    if (title === "") return alert("Please enter a title.");
    if (!["1", "2", "3"].includes(gradeLevel)) return alert("Please choose between 1, 2, and 3 for the grade level.");
    setStepNumber((i) => i + 1);
  };

  return (
    <>
      <header className="p-4 mx-4 text-4xl font-bold text-white shadow-md backgroundGreen rounded-3xl font-reemkufifont ">
        <h1>CUSTOM-ASSESSMENTS</h1>
      </header>
      <div className="flex flex-col items-center flex-grow gap-4 p-4">
        <div className="flex flex-col items-center w-5/6 gap-4 p-5 font-bold rounded-lg shadow-xl backgroundGreen shadow-green-500">
          {stepNumber === 0 && (
            <div className="flex flex-col gap-5 mx-auto" style={{ maxWidth: "960px", width: "100%" }}>
              <h2 className="my-6 text-4xl text-center text-white">CREATE A CUSTOM ASSESSMENT</h2>
              <div className="flex flex-row items-center gap-2 text-2xl">
                <label className="text-white">Title: </label>
                <input className="flex-grow px-5 py-1 text-2xl border-2 border-black rounded-full" type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
              </div>
              <div className="flex flex-row items-center gap-2 text-2xl">
                <label className="text-white">Grade Level: </label>
                <input className="flex-grow px-5 py-1 text-2xl border-2 border-black rounded-full" type="number" min="1" max="3" value={gradeLevel} onChange={(e) => setGradeLevel(e.target.value)} placeholder="Grade Level" />
              </div>
              <div className="flex flex-row items-center gap-2 text-2xl">
                <label className="text-white">Module Number: </label>
                <input className="flex-grow px-5 py-1 text-2xl border-2 border-black rounded-full" type="number" min="1" value={moduleNumber} onChange={(e) => setModuleNumber(e.target.value)} placeholder="Module Number" />
              </div>
              <button
                className="text-2xl text-white my-6 mx-auto hover:brightness-95 bg-black rounded-full shadow-lg px-8 py-2 shadow-black hover:scale-[.98] transition-transform transform-gpu hover:shadow-green-300"
                onClick={handleProceed}>
                PROCEED
              </button>
            </div>
          )}
          {stepNumber === 1 && <ManageAssessments onSave={handleSave} />}
        </div>
      </div>
    </>
  );
}

export default Teacher_CreateAssessment;

function ManageAssessments({ onSave }) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSaveAssessmentModal, setShowSaveAssessmentModal] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(-1);
  const [questions, setQuestions] = useState([]);

  const handleSaveAssessment = () => {
    setShowSaveAssessmentModal(false);
    onSave(questions);
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
    const temp = [...questions];
    temp[currentQuestion] = question;
    setQuestions(temp);
    setShowEditModal(false);
  };

  const handleAddQuestion = (question) => {
    if (question.question === "") return alert("Please enter a question.");
    if (question.choices.length < 2 || question.choices[0] === "" || question.choices[1] === "") return alert("Please enter at least 2 choices.");
    if (question.correctAnswer < 0 || question.correctAnswer > question.choices.length - 1) return alert("Please check the correct answer");
    setQuestions([...questions, question]);
    setShowAddModal(false);
  };

  const handleDeleteQuestion = (ind) => {
    const temp = [...questions];
    temp.splice(ind, 1);
    setQuestions(temp);
    setShowDeleteModal(false);
  };

  return (
    <>
      <div className="flex flex-row justify-end gap-2">
        <button className="bg-[#282424] rounded-full shadow-md px-8 py-2 text-white text-2xl font-bold hover:brightness-90" onClick={() => setShowAddModal(true)}>
          ADD QUESTION
        </button>
        <button className="bg-[#282424] rounded-full shadow-md px-8 py-2 text-white text-2xl font-bold hover:brightness-90" onClick={() => setShowSaveAssessmentModal(true)}>
          SAVE ASSESSMENT
        </button>
      </div>

      <div className="flex flex-col gap-4 m-4">
        {questions.map((i, ind) => (
          <Accordion key={ind}>
            <Accordion.Title>
              <div className="flex flex-row items-center justify-between flex-grow px-6">
                <h4 className="text-4xl font-bold font-sourceSans3">{`Question ${ind + 1}`}</h4>
                <div className="flex flex-row gap-2 font-bold text-white">
                  <button className="bg-[#08a454] rounded-full shadow-md px-8 py-2" onClick={showEditQuestion(ind)}>
                    EDIT
                  </button>
                  <button className="bg-[#d00c24] rounded-full shadow-md px-8 py-2" onClick={showDelete(ind)}>
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
      <AddModal show={showAddModal} onHide={() => setShowAddModal(false)} onSave={handleAddQuestion} />
      <EditModal show={showEditModal} onHide={() => setShowEditModal(false)} onSave={handleSave} question={questions[currentQuestion]} />
      <DeleteModal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} onSave={handleDeleteQuestion} />
      <SaveAssessmentModal show={showSaveAssessmentModal} onHide={() => setShowSaveAssessmentModal(false)} onSave={handleSaveAssessment} />
    </>
  );
}

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

  if (!show) return;

  return (
    <ReactModal appElement={document.getElementById("root")} isOpen={show} shouldCloseOnEsc={true} style={{ modalStyle }}>
      <div className="flex flex-col justify-center gap-8 p-6 text-white font-semibold font-sourceSans3">
        <div className="text-3xl text-center">ADD QUESTION</div>
        <div className="flex flex-row items-center gap-2 text-2xl">
          <label htmlFor="question">Question:</label>
          <input className="flex-grow px-4 py-1 border-2 text-black border-black rounded-full" type="text" id="question" placeholder="Question" value={questionInput} onChange={(e) => setQuestionInput(e.target.value)} />
        </div>
        <div className="flex flex-row gap-3">
          <div className="text-2xl">Choices:</div>
          <div className="flex flex-col flex-grow gap-3">
            {choices.map((choice, ind) => (
              <div className="flex flex-row items-center gap-2" key={ind}>
                <input className="flex-grow px-5 py-1 text-2xl border-2 text-black border-black rounded-full" type="text" value={choice} onChange={(e) => editChoice(ind, e.target.value)} placeholder="Choice" />
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
          <button className="text-2xl bg-[#08a454] rounded-full shadow-md px-6 py-2 hover:brightness-95" onClick={() => onSave({ question: questionInput, choices, correctAnswer })}>
            ADD
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

  if (!show) return;

  return (
    <ReactModal appElement={document.getElementById("root")} isOpen={show} shouldCloseOnEsc={true} style={{ modalStyle }}>
      <div className="flex flex-col justify-center gap-8 p-6 text-white font-semibold font-sourceSans3">
        <div className="text-3xl text-center">EDIT QUESTION</div>
        <div className="flex flex-row items-center gap-2 text-2xl">
          <label htmlFor="question">Question:</label>
          <input className="flex-grow px-4 py-1 border-2 text-black border-black rounded-full" type="text" id="question" value={questionInput} onChange={(e) => setQuestionInput(e.target.value)} />
        </div>
        <div className="flex flex-row gap-3">
          <div className="text-2xl">Choices:</div>
          <div className="flex flex-col flex-grow gap-3">
            {choices.map((choice, ind) => (
              <div className="flex flex-row items-center gap-2" key={ind}>
                <input className="flex-grow px-5 py-1 text-2xl text-black border-2 border-black rounded-full" type="text" value={choice} onChange={(e) => editChoice(ind, e.target.value)} />
                <input type="checkbox" checked={ind === correctAnswer} onChange={() => setCorrectAnswer(ind)} />
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-row justify-end gap-2 text-white">
          <button className="text-2xl bg-[#d00c24] rounded-full shadow-md px-6 py-2 hover:brightness-95" onClick={onHide}>
            CANCEL
          </button>
          <button className="text-2xl bg-[#08a454] rounded-full shadow-md px-6 py-2 hover:brightness-95" onClick={() => onSave({ question: questionInput, choices, correctAnswer })}>
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
    <ReactModal appElement={document.getElementById("root")} isOpen={show} shouldCloseOnEsc={true} style={{ modalStyle }}>
      <div className="flex flex-col justify-center gap-8 p-6 text-white font-semibold font-sourceSans3">
        <h2 className="text-3xl text-center">DELETE QUESTION</h2>
        <div className="text-2xl">
          Reminder: <br />
          Upon clicking proceed, all information provided under the question will be deleted.
        </div>
        <div className="flex flex-row justify-end gap-2 text-white">
          <button className="text-2xl bg-[#d00c24] rounded-full shadow-md px-6 py-2 hover:brightness-95" onClick={onHide}>
            CANCEL
          </button>
          <button className="text-2xl bg-[#08a454] rounded-full shadow-md px-6 py-2 hover:brightness-95" onClick={onSave}>
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
    <ReactModal appElement={document.getElementById("root")} isOpen={show} shouldCloseOnEsc={true} style={{ modalStyle }}>
      <div className="flex flex-col justify-center gap-8 p-6 text-white font-semibold font-sourceSans3">
        <h2 className="text-3xl text-center">SAVE ASSESSMENT</h2>
        <div className="text-2xl">
          Reminders: <br />
          Please make sure all questions were properly created and no question was added without any questions/answer.
        </div>
        <div className="flex flex-row justify-end gap-2 text-white">
          <button className="text-2xl bg-[#d00c24] rounded-full shadow-md px-6 py-2 hover:brightness-95" onClick={onHide}>
            CANCEL
          </button>
          <button className="text-2xl bg-[#08a454] rounded-full shadow-md px-6 py-2 hover:brightness-95" onClick={onSave}>
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
    border: "5px solid black",
    borderRadius: "2rem",
    maxWidth: "720px",
    width: "100%",
    height: "fit-content",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
};
