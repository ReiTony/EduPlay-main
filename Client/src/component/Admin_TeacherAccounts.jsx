import { useState, useEffect, useMemo } from "react";
import { useTable, useFilters } from "react-table";
import { BiEditAlt } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import ReactModal from "react-modal";
import axios from "axios";

function Admin_TeacherAccounts() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [filterInput, setFilterInput] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [toBeDisabledTeacher, setToBeDisabledTeacher] = useState("");

  useEffect(() => {
    refresh();
  }, []);

  const refresh = async () => {
    axios
      .get(`${import.meta.env.VITE_API}admin/teachers`)
      .then((res) => setData(res.data.teachers))
      .catch((err) => alert(err.message));
  };

  const handleDisableTeacher = async () => {
    axios
      .delete(`${import.meta.env.VITE_API}teacher/deleteStudent/${toBeDisabledTeacher}`)
      .then((res) => {
        refresh();
        setShowDeleteModal(false);
      })
      .catch((err) => alert(err.message));
  };

  const showDelete = (username) => {
    setShowDeleteModal(true);
    setToBeDisabledTeacher(username);
  };

  const columns = useMemo(
    () => [
      { Header: "GRADELEVEL", accessor: "gradeLevel", id: "GRADELEVEL", Filter: GradeLevelFilter, filter: "equals" },
      { Header: "NAME", accessor: "name", id: "NAME" },
      { Header: "EMAIL", accessor: "email", id: "EMAIL" },
      {
        Header: "EDIT",
        accessor: "EDIT_STATUS",
        Cell: ({ row }) => (
          <button
            className="flex items-center justify-center px-5 py-1 m-auto font-bold text-white bg-green-500 rounded-full shadow-md hover:brightness-90 shadow-black hover:scale-[.98] transition-transform transform-gpu hover:shadow-green-300"
            onClick={() => navigate(row.original.name)}>
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
          <button
            className="bg-[#d00c24] rounded-full shadow-md text-white font-bold px-5 py-1 hover:brightness-90 shadow-black hover:scale-[.98] transition-transform transform-gpu hover:shadow-red-300"
            onClick={() => showDelete(row.original.username)}>
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
    setFilter("NAME", filterInput);
  }, [filterInput]);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <header className="bg-[#d8cccc] rounded-full shadow-md text-4xl font-reemkufifont font-bold mx-4 p-4 px-6">
        <h1>TEACHER ACCOUNT MANAGEMENT</h1>
      </header>

      <main className="flex-grow bg-[#d8cccc] shadow-md rounded-3xl p-5 mx-4 my-3">
        <div className="flex items-center justify-between pb-4 m-2">
          <div className="text-4xl font-bold">
            <h1>REGISTERED TEACHERS</h1>
          </div>

          <div className="flex">
            <div className="mx-4">
              <button className="bg-[#282424] rounded-full shadow-md text-2xl font-bold text-white hover:brightness-90 hover:scale-[.98] px-5 py-1 transition-transform transform-gpu" onClick={() => navigate("create")}>
                ADD TEACHER
              </button>
            </div>
            <div className="relative mx-4">
              <input type="text" value={filterInput} onChange={(e) => setFilterInput(e.target.value)} placeholder="Search by Name..." className="w-56 p-2 rounded-md focus:border-white focus:shadow-md" />
              <span className="absolute transform -translate-y-1/2 top-1/2 right-4">
                <BsSearch className="mr-2 text-white cursor-pointer" />
              </span>
            </div>
            <div className="mx-4">
              {/* Dropdown Select for Grade Level */}
              <select value={selectedGrade} onChange={(e) => setSelectedGrade(e.target.value)} className="p-2 font-semibold rounded-md focus:outline-none focus:border-white">
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
                <tr {...row.getRowProps()} className="gap-5 font-semibold border-8 border-[#d8cccc]" style={{ background: index % 2 === 0 ? "#b6b6b6" : "white" }}>
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
      <DeleteModal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} onSave={handleDisableTeacher} />
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

export default Admin_TeacherAccounts;

function DeleteModal({ show, onHide, onSave }) {
  if (!show) return;
  return (
    <ReactModal appElement={document.getElementById("root")} isOpen={show} shouldCloseOnEsc={true} style={modalStyle}>
      <div className="flex flex-col justify-center gap-8 p-6 font-semibold font-sourceSans3">
        <h2 className="text-4xl text-center">DISABLE TEACHER</h2>
        <div className="text-2xl">
          Reminder: <br />
          Upon clicking disable, all information associated under this teacher will be deleted.
        </div>
        <div className="flex flex-row justify-end gap-2 text-white">
          <button className="text-2xl bg-[#d00c24] rounded-full shadow-md px-6 py-2 hover:brightness-95 shadow-black hover:scale-[.98] transition-transform transform-gpu" onClick={onHide}>
            CANCEL
          </button>
          <button className="px-6 py-2 text-2xl rounded-full shadow-md bg-neutral-800 hover:brightness-95 shadow-black hover:scale-[.98] transition-transform transform-gpu" onClick={onSave}>
            DISABLE
          </button>
        </div>
      </div>
    </ReactModal>
  );
}

const modalStyle = {
  content: {
    backgroundColor: "#a8a4a4",
    borderRadius: "2rem",
    maxWidth: "720px",
    width: "100%",
    height: "fit-content",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
};
