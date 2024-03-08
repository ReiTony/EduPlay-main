import axios from "axios";
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useFilters, useTable } from "react-table";
import { BsSearch } from "react-icons/bs";
import Teacher_LearningGroupMinTable from "./Teacher_LearningGroupMinTable";

function Teacher_LearningGroup() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [filterInput, setFilterInput] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");

  useEffect(() => {
    refresh();
  }, []);

  const refresh = async () => {
    axios.get(`${import.meta.env.VITE_API}teacher/progress-reports`).then(async (res) => {
      let temp = [];
      const promises = res.data.progressReports.map(async (stud) => {
        const res = await fetch(`${import.meta.env.VITE_API}teacher/showStudent/${stud.username}`);
        if (res.status === 200) temp.push((await res.json()).student);
      });
      await Promise.all(promises);
      setData(temp);
    });
  };

  useEffect(() => {
    if (selectedGrade === "") setFilter("gradeLevel", undefined);
    else setFilter("gradeLevel", selectedGrade);
  }, [selectedGrade]);

  useEffect(() => {
    setFilter("lastName", filterInput);
  }, [filterInput]);

  const columns = useMemo(
    () => [
      { Header: "GRADE LEVEL", accessor: "gradeLevel", id: "gradeLevel", Filter: GradeLevelFilter, filter: "equals" },
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

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, state, setFilter } = useTable({ columns, data }, useFilters);

  return (
    <>
      <h1 className="backgroundBlue text-white mx-1 sm:mx-4 rounded-2xl gap-3 p-4 text-2xl sm:text-4xl font-reemkufifont font-bold ">LEARNING GROUP</h1>

      <main className="flex flex-col flex-grow p-2 sm:p-5 mx-1 sm:mx-4 my-2 rounded-lg backgroundBlue">
        <div className="flex flex-wrap ms-auto gap-2">
          <div className="relative text-white">
            <input
              type="text"
              value={filterInput}
              onChange={(e) => setFilterInput(e.target.value)}
              placeholder="Search by last name..."
              className="w-56 p-2 bg-[#086cfc] border-[#50a4ec] border-2 rounded-md focus:border-white focus:shadow-md focus:shadow-red-300 "
            />
            <BsSearch className="absolute transform -translate-y-1/2 top-1/2 right-4 mr-2 text-white cursor-pointer" />
          </div>
          <select value={selectedGrade} onChange={(e) => setSelectedGrade(e.target.value)} className="p-2 bg-[#086cfc] text-white border-2 font-semibold border-[#50a4ec] rounded-md focus:outline-none focus:border-white">
            <option value="">All Grades</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>

        <div className="hidden md:block">
          <table {...getTableProps()} style={{ borderCollapse: "collapse", width: "100%" }}>
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
        <div className="md:hidden">
          {/* <Teacher_LearningGroupMinTable data={data} filterInput={filterInput} refresh={refresh} selectedGrade={selectedGrade} /> */}
        </div>
      </main>
    </>
  );
}

function GradeLevelFilter({ column }) {
  const { filterValue, setFilter } = column;
  return (
    <select value={filterValue || ""} onChange={(e) => setFilter(e.target.value || undefined)} className="p-2 rounded-md">
      <option value="">All Grades</option>
      {[1, 2, 3].map((grade) => (
        <option key={grade} value={grade}>
          Grade {grade}
        </option>
      ))}
    </select>
  );
}

export default Teacher_LearningGroup;
