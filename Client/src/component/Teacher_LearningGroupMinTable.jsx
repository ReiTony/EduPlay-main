import { useEffect, useMemo } from "react";
import { useTable, useFilters } from "react-table";
import { useNavigate } from "react-router-dom";
import { BsFillArrowUpCircleFill } from "react-icons/bs";

function Teacher_LearningGroupMinTable({ data, refresh, filterInput, selectedGrade }) {
  const navigate = useNavigate();

  useEffect(() => {
    refresh();
  }, []);

  const columns = useMemo(
    () => [
      { Header: "GRADE LEVEL", accessor: "gradeLevel", id: "gradeLevel", Filter: GradeLevelFilter, filter: "equals" },
      { Header: "NAME", accessor: (d) => `${d.firstName} ${d.lastName}`, id: "name" },
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

  useEffect(() => {
    if (selectedGrade === "") setFilter("gradeLevel", undefined);
    else setFilter("gradeLevel", selectedGrade);
  }, [selectedGrade]);

  useEffect(() => {
    setFilter("name", filterInput);
  }, [filterInput]);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <>
      <table {...getTableProps()} style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} style={{}} className="py-2 text-lg text-center text-white bg-black">
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
              <tr {...row.getRowProps()} className="font-semibold" style={{ background: index % 2 === 0 ? "#b6b6b6" : "white" }}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()} className="py-2 text-lg text-center border-black">
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      <button className="fixed justify-center p-3 text-white bg-blue-800 rounded-full bottom-4 right-4 focus:outline-none" onClick={handleScrollToTop}>
        <BsFillArrowUpCircleFill className="text-3xl " />
      </button>
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

export default Teacher_LearningGroupMinTable;
