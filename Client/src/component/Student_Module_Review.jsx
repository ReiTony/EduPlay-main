import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from "axios";

function Student_Module_Review() {
  const navigate = useNavigate();
  const { moduleNumber } = useParams();
  const userId = localStorage.getItem("userId");
  const username = localStorage.getItem("username");
  const gradeLevel = localStorage.getItem("gradeLevel");
  const [data, setData] = useState(null);
  const [moduleId, setModuleId] = useState();
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const init = async () => {
      const { id } = await (await fetch(`/modules/grade${gradeLevel}/module${moduleNumber}/review.json`)).json();
      setModuleId(id);
      const res = await (await fetch(`${import.meta.env.VITE_API}admin/module/${id}`)).json();
      setData(res.data);
    };
    init();
  }, []);

  const handleNext = async () => {
    await axios.post(`${import.meta.env.VITE_API}student/module-record`, { username, moduleId, title: data.title });
    navigate(`/student/module/${moduleNumber}/game`);
  };

  return (
    <div className="bg-[#fff5be] flex flex-col items-center m-4 mb-6 p-8 rounded-2xl h-full">
      <h1 className="text-3xl font-semibold font-sourceSans3">{data?.title || ""}</h1>
      <hr className="bg-black h-1 w-full my-2" />

      <div style={{ maxWidth: "960px" }}>
        <Carousel className="my-10" axis="horizontal" verticalSwipe="natural" showIndicators={false} showStatus="false" onChange={(e) => e === data?.slides.length - 1 && setIsFinished(true)}>
          {data?.slides.map((slide, ind) => (
            <img key={ind} src={slide} />
          ))}
        </Carousel>
      </div>

      {isFinished && (
        <button className="px-10 py-2 text-2xl font-bold text-center text-white bg-black rounded-full" onClick={handleNext}>
          NEXT
        </button>
      )}
    </div>
  );
}

export default Student_Module_Review;
