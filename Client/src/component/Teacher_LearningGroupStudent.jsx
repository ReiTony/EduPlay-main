import { useEffect, useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { IoArrowBackCircle } from "react-icons/io5";
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
    data.gameScores.forEach((game, i) => (temp[i].game = "Played"));
    for (let i = 0; i < Math.floor((data.modules.length + 2) / 4); i++) temp[i].learningMaterials = "Viewed";
    data.assessmentScores.forEach((ass, i) => (temp[i].assessment = `${ass.score}/10`));

    setData(temp);
  };

  const columns = useMemo(
    () => [
      { Header: "Module", accessor: "topic", id: "topic" },
      { Header: "Learning Materials", accessor: "learningMaterials", id: "learningMaterials" },
      { Header: "Games", accessor: "game", id: "game" },
      { Header: "Assessments", accessor: "assessment", id: "assesssment" },
    ],
    []
  );
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, state, setFilter } = useTable({ columns, data });

  return (
    <>
      <h1 className="backgroundBlue text-white mx-1 sm:mx-4 rounded-2xl gap-3 p-4 text-2xl sm:text-4xl font-reemkufifont font-bold ">LEARNING GROUP - PROGRESS TRACKING</h1>

      <main className="flex flex-col flex-grow gap-4 p-2 pt-4 sm:p-5 mx-1 sm:mx-4 my-2 rounded-lg backgroundBlue">
        <button className="flex flex-row items-center gap-2 bg-[#282424] rounded-full shadow-md text-white text-2xl me-auto px-6 py-2" onClick={() => navigate(-1)}>
          <IoArrowBackCircle />
          BACK
        </button>
        <div className="flex flex-row gap-2 sm:gap-6 bg-[#e0dcdc] w-full rounded-2xl p-3 sm:p-6">
          {userData !== null && (
            <>
              <img src={studentDP} alt="Profile" className="h-24 sm:h-40" />
              <h2 className="text-3xl font-semibold break-all">{`${userData?.firstName || ""} ${userData?.lastName || ""}`}</h2>
            </>
          )}
        </div>

        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()} className="rounded-2xl">
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()} className="bg-[#282424] text-white text-md sm:text-2xl py-4 break-all">
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
                <tr {...row.getRowProps()} className="gap-0 sm:gap-5 font-semibold border-0 sm:border-8 border-[#98ccfc]" style={{ background: index % 2 === 0 ? "#b6b6b6" : "white" }}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()} className="px-0 py-5 sm:px-2 text-md sm:text-2xl text-center border-black">
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </main>
    </>
  );
}

export default Teacher_LearningGroupStudent;