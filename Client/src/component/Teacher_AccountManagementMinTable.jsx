import { useEffect, useMemo } from "react";
import { useTable, useFilters } from "react-table";
import { BsFillArrowUpCircleFill } from "react-icons/bs";

function Teacher_AccountManagementMinTable({ data, filterInput, selectedGrade, refresh, showDisable, showEnable }) {
  useEffect(() => {
    refresh();
  }, []);

  const columns = useMemo(
    () => [
      { Header: "GRADE LEVEL", accessor: "gradeLevel", id: "GRADELEVEL", Filter: GradeLevelFilter, filter: "equals" },
      { Header: "NAME", accessor: (e) => `${e.firstName} ${e.lastName}`, id: "NAME" },
      {
        Header: "EDIT",
        accessor: "EDIT_STATUS",
        Cell: ({ row }) => (
          <button
            className="flex items-center justify-center px-3 py-1 me-1 font-bold text-white bg-green-500 rounded-lg shadow-lg hover:brightness-90 shadow-black hover:scale-[.98] transition-transform transform-gpu hover:shadow-green-300"
            onClick={() => navigate(row.original.username)}
          >
            EDIT
          </button>
        ),
      },
      {
        Header: "STATUS",
        accessor: "STATUS",
        Cell: ({ row }) =>
          row.original.isActive ? (
            <button
              className="bg-[#d00c24] rounded-lg shadow-lg me-1 text-white font-bold px-3 py-1 hover:brightness-90 shadow-black hover:scale-[.98] transition-transform transform-gpu hover:shadow-red-300"
              onClick={() => showDisable(row.original.username)}
            >
              DISABLE
            </button>
          ) : (
            <button
              className="bg-[#d00c24] rounded-lg shadow-lg me-1 text-white font-bold px-3 py-1 hover:brightness-90 shadow-black hover:scale-[.98] transition-transform transform-gpu hover:shadow-red-300"
              onClick={() => showEnable(row.original.username)}
            >
              ENABLE
            </button>
          ),
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, state, setFilter } = useTable(
    { columns, data },
    useFilters
  );

  useEffect(() => {
    if (selectedGrade === "") setFilter("GRADELEVEL", undefined);
    else setFilter("GRADELEVEL", selectedGrade);
  }, [selectedGrade]);

  useEffect(() => {
    setFilter("NAME", filterInput);
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
              <tr
                {...row.getRowProps()}
                className="font-semibold"
                style={{ background: index % 2 === 0 ? "#b6b6b6" : "white" }}
              >
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

      <button
        className="fixed justify-center p-3 text-white bg-blue-800 rounded-full bottom-4 right-4 focus:outline-none"
        onClick={handleScrollToTop}
      >
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

export default Teacher_AccountManagementMinTable;