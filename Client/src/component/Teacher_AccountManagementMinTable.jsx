import { useState, useEffect, useMemo } from "react";
import { useTable, useFilters } from "react-table";
import { useNavigate } from "react-router-dom";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import ReactModal from "react-modal";
import axios from "axios";

function Teacher_AccountManagementMinTable({ data, refresh, filterInput, selectedGrade, modalStyle }) {
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [toBeDisabledStudent, setToBeDisabledStudent] = useState("");

  useEffect(() => {
    refresh();
  }, []);

  const handleDisableStudent = async () => {
    axios
      .delete(`${import.meta.env.VITE_API}teacher/deleteStudent/${toBeDisabledStudent}`)
      .then((res) => {
        refresh();
        setShowDeleteModal(false);
      })
      .catch((err) => alert(err.message));
  };

  const showDelete = (username) => {
    setShowDeleteModal(true);
    setToBeDisabledStudent(username);
  };

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
        Cell: ({ row }) => (
          <button
            className="bg-[#d00c24] rounded-lg shadow-lg me-1 text-white font-bold px-3 py-1 hover:brightness-90 shadow-black hover:scale-[.98] transition-transform transform-gpu hover:shadow-red-300"
            onClick={() => showDelete(row.original.username)}
          >
            DELETE
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
      <DeleteModal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} onSave={handleDisableStudent} modalStyle={modalStyle}/>
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

function DeleteModal({ show, onHide, onSave, modalStyle }) {
  if (!show) return;
  return (
    <ReactModal appElement={document.getElementById("root")} isOpen={show} shouldCloseOnEsc={true} style={modalStyle}>
      <div className="flex flex-col justify-center gap-8 p-6 font-semibold text-white font-sourceSans3">
        <h2 className="text-4xl text-center">DELETE STUDENT</h2>
        <div className="text-2xl">
          Reminder: <br />
          Upon clicking delete, all information associated under this student will be deleted.
        </div>
        <div className="flex flex-col sm:flex-row justify-end gap-2 text-white">
          <button className="text-2xl bg-neutral-800 rounded-full shadow-md px-6 py-2 hover:brightness-95  shadow-black hover:scale-[.98] transition-transform transform-gpu hover:shadow-red-300 " onClick={onHide}>
            CANCEL
          </button>
          <button className="px-6 py-2 text-2xl rounded-full shadow-md bg-[#d00c24] hover:brightness-95  shadow-black hover:scale-[.98] transition-transform transform-gpu hover:shadow-red-300" onClick={onSave}>
            DELETE
          </button>
        </div>
      </div>
    </ReactModal>
  );
}
