import { useState, useEffect, useMemo } from "react";
import { useTable, useFilters } from "react-table";
import { BiEditAlt } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import ReactModal from "react-modal";
import axios from "axios";

function Teacher_AccountManagement() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [filterInput, setFilterInput] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [toBeDisabledStudent, setToBeDisabledStudent] = useState("");

  useEffect(() => {
    refresh();
  }, []);

  const refresh = async () => {
    axios
      .get(`${import.meta.env.VITE_API}teacher/class`)
      .then((res) => setData(res.data.students))
      .catch((err) => alert(err.message));
  };

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
      { Header: "GRADELEVEL", accessor: "gradeLevel", id: "GRADELEVEL", Filter: GradeLevelFilter, filter: "equals" },
      { Header: "LASTNAME", accessor: "lastName", id: "LASTNAME" },
      { Header: "FIRSTNAME", accessor: "firstName" },
      { Header: "BIRTHDAY", accessor: (d) => `${d.birthMonth}/${d.birthDay}` },
      {
        Header: "EDIT",
        accessor: "EDIT_STATUS",
        Cell: ({ row }) => (
          <button className="flex items-center justify-center m-auto shadow-md text-white bg-green-500 rounded-full font-bold px-5 py-1 hover:brightness-90" onClick={() => navigate(row.original.username)}>
            <span className="flex items-center">
              <BiEditAlt className="mr-2 cursor-pointer" />
              EDIT
            </span>
          </button>
        ),
      },
      {
        Header: "STATUS",
        accessor: "STATUS",
        Cell: ({ row }) => (
          <button className="bg-[#d00c24] rounded-full shadow-md text-white font-bold px-5 py-1 hover:brightness-90" onClick={() => showDelete(row.original.username)}>
            DISABLE
          </button>
        ),
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, state, setFilter } = useTable({ columns, data }, useFilters);

  useEffect(() => {
    if (selectedGrade === "") setFilter("GRADELEVEL", undefined);
    else setFilter("GRADELEVEL", selectedGrade);
  }, [selectedGrade]);

  useEffect(() => {
    setFilter("LASTNAME", filterInput);
  }, [filterInput]);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <>
      <div className="backgroundYellow">
        <header className="grid bg-red-500  grid-row-[50%_50%]  mx-4 rounded-3xl gap-3 p-4 text-4xl font-reemkufifont font-bold ">
          <h1>ACCOUNT MANAGEMENT</h1>
        </header>

        <main className="bg-[#a5d6a7]  mx-4 mt-2 rounded-lg p-5">
          <div className="flex items-center justify-between pb-4 m-2">
            <div className="text-4xl font-bold ">
              <h1>REGISTERED ACCOUNT</h1>
            </div>

            <div className="flex">
              <div className="mx-4">
                <button className="bg-blue-500 rounded-full text-white text-2xl font-bold px-5 py-1 shadow-md hover:bg-blue-700" onClick={() => navigate("create")}>
                  ADD STUDENT
                </button>
              </div>
              <div className="relative mx-4">
                <input
                  type="text"
                  value={filterInput}
                  onChange={(e) => {
                    setFilterInput(e.target.value);
                  }}
                  placeholder="Search by lastname..."
                  className="w-56 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
                <span className="absolute transform -translate-y-1/2 top-1/2 right-4">
                  <BsSearch className="mr-2 cursor-pointer" />
                </span>
              </div>
              <div className="mx-4">
                {/* Dropdown Select for Grade Level */}
                <select
                  value={selectedGrade}
                  onChange={(e) => {
                    setSelectedGrade(e.target.value);
                  }}
                  className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
                  <option value="">All Grades</option>
                  {[1, 2, 3].map((grade) => (
                    <option key={grade} value={grade}>
                      Grade {grade}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <table {...getTableProps()} style={{ borderCollapse: "collapse", width: "100%" }}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()} style={{}} className="p-2 py-4 text-3xl text-center text-white bg-black">
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
                    className="gap-5 font-semibold border-8 border-[#a5d6a7]"
                    style={{
                      background: index % 2 === 0 ? "#b6b6b6" : "white", // Apply gray background for even rows
                    }}>
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()} className="p-2 py-5 text-2xl text-center border-black">
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </main>
        <button className="fixed justify-center p-3 text-white bg-blue-800 rounded-full bottom-4 right-4 focus:outline-none" onClick={handleScrollToTop}>
          <BsFillArrowUpCircleFill className="text-3xl " />
        </button>
      </div>
      <DeleteModal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} onSave={handleDisableStudent} />
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

export default Teacher_AccountManagement;

function DeleteModal({ show, onHide, onSave }) {
  if (!show) return;
  return (
    <ReactModal
      appElement={document.getElementById("root")}
      isOpen={show}
      shouldCloseOnEsc={true}
      style={{ content: { backgroundColor: "#FF5454", borderRadius: "2rem", maxWidth: "720px", width: "100%", height: "fit-content", top: "50%", left: "50%", transform: "translate(-50%, -50%)" } }}>
      {/* style={{ content: { backgroundColor: "#FF5454", border: "5px solid black", borderRadius: "2rem", maxWidth: "720px", width: "100%", height: "fit-content", top: "50%", left: "50%", transform: "translate(-50%, -50%)" } }}> */}
      <div className="flex flex-col justify-center gap-8 font-sourceSans3 font-semibold p-6">
        <h2 className="text-4xl text-center">DISABLE STUDENT</h2>
        <div className="text-2xl">
          Reminder: <br />
          Upon clicking disable, all information associated under this student will be deleted.
        </div>
        <div className="flex flex-row justify-end gap-2 text-white">
          <button className="text-2xl bg-[#d00c24] rounded-full shadow-md px-6 py-2 hover:brightness-95" onClick={onHide}>
            CANCEL
          </button>
          <button className="text-2xl bg-neutral-800 rounded-full shadow-md px-6 py-2 hover:brightness-95" onClick={onSave}>
            DISABLE
          </button>
        </div>
      </div>
    </ReactModal>
  );
}
