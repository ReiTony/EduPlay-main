import axios from "axios";
import { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTable } from "react-table";


function Teacher_LearningGroup() {
  const navigate = useNavigate();
  const {username} = useParams()
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API}teacher/progress-reports`).then(res=>setData(res.data.progressReports));
  }, []);

  const columns = useMemo(
    () => [
      { Header: "USERNAME", accessor: "username", id: "username" },
      { Header: "TOTAL GAME SCORE", accessor: "totalGameScore", id: "totalGameScore" },
      {
        Header: "PROGRESS",
        Cell: ({ row }) => (
          <button className="flex items-center justify-center m-auto shadow-md text-white bg-green-500 rounded-full font-bold px-5 py-1 hover:brightness-90" onClick={() => navigate(row.original.username)}>
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
      <div className="bg-[#08a454] rounded-full shadow-md px-10 py-3 text-4xl font-bold font-sourceSans3">LEARNING GROUP</div>
      <div className="flex flex-col bg-[#a8d4a4] flex-grow gap-4 rounded-3xl p-5 font-bold">
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
                <tr {...row.getRowProps()} className="gap-5 font-semibold border-8 border-[#a5d6a7]" style={{ background: index % 2 === 0 ? "#b6b6b6" : "white" }}>
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
