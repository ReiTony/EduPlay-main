import { IoArrowBackCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function BackButton({ bg1, bg2 }) {
  const navigate = useNavigate();
  return (
    <button
      className={`flex flex-row items-center gap-2 bg-[${bg1}] shadow-md hover:shadow-${bg2} hover:scale-[.96] rounded-xl font-bold text-white text-xl sm:text-2xl me-auto mb-3 px-4 sm:px-6 py-1 sm:py-2`}
      onClick={() => navigate(-1)}
    >
      <IoArrowBackCircle />
      BACK
    </button>
  );
}

export default BackButton;
