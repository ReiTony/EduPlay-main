import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Student_Module_Review() {
  const navigate = useNavigate();
  const { moduleNumber } = useParams();
  const [data, setData] = useState(null);
  //   const [moduleTitle, setModuleTitle] = useState("");

  useEffect(() => {
    const init = async () => {
      const res = await fetch(`/modules/${moduleNumber}/review.json`);
      setData(await res.json());
    };
    init();
  });

  //   useEffect(() => {
  //     const moduleKey = JSON.parse(window.sessionStorage.getItem("MODULE"));
  //     if (moduleKey && moduleKey.startsWith("M")) {
  //       const titleParts = moduleKey.split("-");
  //       if (titleParts.length === 2) {
  //         setModuleTitle(titleParts[1]);
  //       }
  //     }
  //   }, []);

  return (
    <div className="bg-[#fff5be] flex flex-col items-center m-4 mb-6 p-8 rounded-2xl h-full">
      <h1 className="text-3xl font-semibold font-sourceSans3">{data?.title || ""}</h1>

      <hr className="bg-black h-1 w-full my-2" />

      <iframe className="my-6" src={data?.link || ""} width="864" height="486" allow="autoplay"></iframe>

      <button className="px-10 py-2 text-2xl font-bold text-center text-white bg-black rounded-full" onClick={() => navigate(`/Student/Module/${moduleNumber}/Game`)}>
        NEXT
      </button>
    </div>
  );
}

export default Student_Module_Review;
