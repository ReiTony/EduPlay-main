import { useEffect, useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useTable } from "react-table";
import studentDP from "../assets/StudentProfilePicture/StudentDP.jpg";

function Teacher_LearningGroupStudent() {
  const { username } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [userData, setUserData] = useState();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API}teacher/progress-report/${username}`).then((res) => processData(res.data.progressReport));
    axios.get(`${import.meta.env.VITE_API}teacher/showStudent/${username}`).then((res) => setUserData(res.data.student));
  }, []);

  const processData = (data) => {
    const temp = [
      { topic: 1, learningMaterials: "Unviewed", game: "Unplayed", assessment: null },
      { topic: 2, learningMaterials: "Unviewed", game: "Unplayed", assessment: null },
    ];

    console.log(data.modules);
    console.log(data);
    data.gameScores.forEach((game, i) => (temp[i].game = "Played"));
    for (let i = 0; i < Math.floor((data.modules.length + 2)/ 4); i++) temp[i].learningMaterials = "Viewed";
    data.assessmentScores.forEach((ass, i) => (temp[i].assessment = `${ass.score}/10`));

    setData(temp);
  };

  const columns = useMemo(
    () => [
      { Header: "TOPIC", accessor: "topic", id: "topic" },
      { Header: "LEARNING MATERIALS", accessor: "learningMaterials", id: "learningMaterials" },
      { Header: "GAMES", accessor: "game", id: "game" },
      { Header: "ASSESSMENTS", accessor: "assessment", id: "assesssment" },
    ],
    []
  );
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, state, setFilter } = useTable({ columns, data });

  return (
    <div className="flex flex-col flex-grow gap-4 p-4">
      <div className="bg-[#5874fc] rounded-full shadow-md px-10 py-3 text-4xl font-bold font-sourceSans3">LEARNING GROUP - PROGRESS TRACKING</div>
      <div className="flex flex-col bg-[#98ccfc] flex-grow gap-4 rounded-3xl p-5 font-bold">
        <button className="bg-[#282424] rounded-full shadow-md text-white text-2xl me-auto px-6 py-2" onClick={() => navigate(-1)}>
          BACK
        </button>
        <div className="flex flex-row gap-6 bg-[#e0dcdc] w-full rounded-2xl p-6">
          {userData !== null && (
            <>
              <img src={studentDP} alt="Profile" style={{ height: "200px" }} />
              <h2 className="text-3xl ">{`${userData?.firstName || ""} ${userData?.lastName || ""}`}</h2>
            </>
          )}
        </div>

        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()} className="rounded-2xl">
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()} className="bg-[#282424] text-white text-2xl py-4">
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, index) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} className="gap-5 font-semibold border-8 border-[#98ccfc]" style={{ background: index % 2 === 0 ? "#b6b6b6" : "white" }}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()} className="p-2 py-5 text-2xl text-center border-black">
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Teacher_LearningGroupStudent;
