import ReactModal from "react-modal";

function ErrorModal({ show, onHide, errorInfo }) {
  return (
    <ReactModal appElement={document.getElementById("root")} isOpen={show} shouldCloseOnEsc={true} style={modalStyle}>
      <div className="flex flex-col items-center justify-center gap-8 p-8 font-sourceSans3">
        <h2 className="text-3xl font-semibold text-center">{errorInfo}</h2>
        <button className="bg-[#08a454] text-white text-2xl font-bold px-10 py-2 rounded-full shadow-md hover:brightness-90 hover:shadow-green-500 hover:scale-95 transition-transform transform-gpu" onClick={onHide}>
          CONTINUE
        </button>
      </div>
    </ReactModal>
  );
}

export default ErrorModal;

const modalStyle = {
  content: {
    background: `url("/src/assets/wordHuntPOPbg.svg")`,
    border: "0",
    borderRadius: "2rem",
    maxWidth: "540px",
    width: "fit-content",
    height: "fit-content",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.4)",
  },
};
