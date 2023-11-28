import axios from "axios";
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useTable } from "react-table";

function Teacher_LearningGroup() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API}teacher/progress-reports`).then(async (res) => {
      let temp = [];
      const promises = res.data.progressReports.map(async (stud) => {
        const res = await axios.get(`${import.meta.env.VITE_API}teacher/showStudent/${stud.username}`);
        temp.push(res.data.student);
      });
      await Promise.all(promises);
      setData(temp);
    });
  }, []);

  const columns = useMemo(
    () => [
      { Header: "GRADE LEVEL", accessor: "gradeLevel", id: "gradeLevel" },
      { Header: "FIRST NAME", accessor: "firstName", id: "firstName" },
      { Header: "LAST NAME", accessor: "lastName", id: "lastName" },
      {
        Header: "PROGRESS",
        Cell: ({ row }) => (
          <button className="flex items-center justify-center px-5 py-1 m-auto font-bold text-white bg-green-500 rounded-full shadow-md hover:brightness-90" onClick={() => navigate(row.original.username)}>
            VIEW
          </button>
        ),
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, state, setFilter } = useTable({ columns, data });

  return (
    <div className="flex flex-col flex-grow gap-4 p-4">
      <header className="p-4 text-4xl font-bold text-white backgroundBlue rounded-3xl font-reemkufifont">
        <h1>LEARNING GROUP</h1>
      </header>
      <div className="flex flex-col flex-grow gap-4 p-5 font-bold shadow-lg backgroundBlue rounded-3xl shadow-blue-800">
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

export default Teacher_LearningGroup;
