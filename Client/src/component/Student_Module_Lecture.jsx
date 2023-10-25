import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Student_Module_Lecture() {
  const navigate = useNavigate();
  const { moduleNumber } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const init = async () => {
      const res = await fetch(`/modules/${moduleNumber}/lecture.json`);
      setData(await res.json());
    };
    init();
  }, []);

  useEffect(() => console.log("data", data), [data]);
  //   const [moduleTitle, setModuleTitle] = useState("");
  //   const [src, setSrc] = useState("");

  //   useEffect(() => {
  //     const moduleKey = JSON.parse(window.sessionStorage.getItem("MODULE"));
  //     const srcKey = JSON.parse(window.sessionStorage.getItem("SRC"));
  //     if (moduleKey && moduleKey.startsWith("M")) {
  //       const titleParts = moduleKey.split("-");
  //       if (titleParts.length === 2) {
  //         setModuleTitle(titleParts[1]);
  //       }
  //     }
  //     if (srcKey) {
  //       setSrc(srcKey);
  //     }
  //   }, []);

  //   return <div>Hello World</div>;

  return (
    <div className="bg-[#fff5be] flex flex-col items-center m-4 mb-6 p-8 rounded-2xl h-full">
      <h1 className="text-3xl font-semibold font-sourceSans3">{data?.title || ""}</h1>

      <hr className="bg-black h-1 w-full my-2" />

      <iframe className="my-6" src={data?.videoLink || ""} width="864" height="486" allow="autoplay" />

      <button className="px-10 py-2 text-2xl font-bold text-center text-white bg-black rounded-full" onClick={() => navigate(`/Student/Module/${moduleNumber}/Review`)}>
        NEXT
      </button>
      {/* <div className="flex flex-col items-center justify-items-center">
        <div className="pb-4 text-3xl font-bold">
          <h1>{moduleTitle}</h1>
        </div>

        <video width="420" height="280" controls>
          <source src="your_video_url" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div>
          <iframe src={src} width="1040" height="580" allow="autoplay" allowFullScreen></iframe>
        </div>
      </div>

      <div className="flex justify-end mr-12">
        
      </div> */}
    </div>
  );
}

export default Student_Module_Lecture;
