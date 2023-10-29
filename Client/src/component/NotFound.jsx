import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center min-h-screen bg-[#f8d43c]">
      <div className="flex flex-col justify-center items-center gap-4 font-sourceSans3" style={{ maxWidth: "768px" }}>
        <h1 className="text-8xl font-bold text-center">Oops!</h1>
        <h4 className="text-3xl font-bold text-center">404 - PAGE NOT FOUND</h4>
        <p className="text-lg text-center">The page you might be looking might have been removed had its name changed or is temporarily unavailable.</p>
        <button className="text-lg bg-neutral-50 shadow-md py-2 px-12 font-bold rounded-full hover:brightness-95 hover:shadow-lg" onClick={() => navigate("/")}>
          GO TO HOMEPAGE
        </button>
      </div>
    </div>
  );
}

export default NotFound;
