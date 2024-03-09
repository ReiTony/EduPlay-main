import { useState, useEffect, useMemo } from "react";
import { useTable, useFilters } from "react-table";
import { BiEditAlt } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import ReactModal from "react-modal";
import axios from "axios";
import Admin_TeacherAccountManagementMinTable from "./Admin_TeacherAccountManagementMinTable";

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
      .delete(`${import.meta.env.VITE_API}admin/deleteTeacher/${toBeDisabledTeacher}`)
      .then((res) => {
        refresh();
        setShowDeleteModal(false);
      })
      .catch((err) => alert(err.message));
  };

  const showDelete = (id) => {
    setShowDeleteModal(true);
    setToBeDisabledTeacher(id);
  };

  const columns = useMemo(
    () => [
      { Header: "GRADE LEVEL", accessor: "gradeLevel", id: "GRADELEVEL", Filter: GradeLevelFilter, filter: "equals" },
      { Header: "NAME", accessor: "name", id: "NAME" },
      { Header: "EMAIL", accessor: "email", id: "EMAIL" },
      {
        Header: "EDIT",
        accessor: "EDIT_STATUS",
        Cell: ({ row }) => (
          <button
            className="flex items-center justify-center px-5 py-1 m-auto font-bold text-white bg-green-500 rounded-full shadow-md hover:brightness-90 shadow-black hover:scale-[.98] transition-transform transform-gpu hover:shadow-green-300"
            onClick={() => navigate(`${row.original.email}/${row.original._id}`)}
          >
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
          <button className="bg-[#d00c24] rounded-full shadow-md text-white font-bold px-5 py-1 hover:brightness-90 shadow-black hover:scale-[.98] transition-transform transform-gpu hover:shadow-red-300" onClick={() => showDelete(row.original._id)}>
            DELETE
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
      <h1 className="backgroundGreen text-white mx-1 sm:mx-4 rounded-2xl gap-3 p-4 text-2xl sm:text-4xl font-reemkufifont font-bold ">TEACHER ACCOUNT MANAGEMENT</h1>

      <main className="flex flex-col flex-grow p-2 sm:p-5 mx-1 sm:mx-4 my-2 rounded-lg backgroundGreen">
        <div className="flex flex-wrap gap-2 items-center justify-between pb-4 m-2">
          <h1 className="text-2xl sm:text-4xl font-bold text-white">REGISTERED ACCOUNTS</h1>

          <div className="flex flex-wrap gap-2">
            <button className="bg-[#08a454] rounded-xl shadow-lg font-bold text-white px-3 sm:px-8 py-2 hover:scale-[.98] transition-transform transform-gpu hover:shadow-green-300" onClick={() => navigate("create")}>
              ADD TEACHER
            </button>
            <div className="relative">
              <input type="text" value={filterInput} onChange={(e) => setFilterInput(e.target.value)} placeholder="Search by Name..." className="w-56 p-2 rounded-md focus:shadow-green focus:outline-none focus:shadow-lg bg-[#08a454] text-white" />
              <span className="absolute transform -translate-y-1/2 top-1/2 right-4">
                <BsSearch className="mr-2 text-white cursor-pointer" />
              </span>
            </div>
            <select value={selectedGrade} onChange={(e) => setSelectedGrade(e.target.value)} className="p-2 font-semibold rounded-md focus:outline-none shadow-lg focus:shadow-green bg-[#08a454] text-white">
              <option value="">All Grades</option>
              {[1, 2, 3].map((grade) => (
                <option key={grade} value={grade}>
                  Grade {grade}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="hidden lg:block">
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
        </div>
        <div className="lg:hidden">
          <Admin_TeacherAccountManagementMinTable data={data} filterInput={filterInput} modalStyle={modalStyle} refresh={refresh} selectedGrade={selectedGrade} />
        </div>
      </main>
      <button className="fixed justify-center p-3 text-white bg-blue-800 rounded-full bottom-4 right-4 focus:outline-none" onClick={handleScrollToTop}>
        <BsFillArrowUpCircleFill className="text-3xl" />
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
      <div className="flex flex-col justify-center gap-8 p-6 font-semibold font-sourceSans3 text-white">
        <h2 className="text-4xl text-center">DELETE TEACHER</h2>
        <div className="text-2xl">
          Reminder: <br />
          Upon clicking delete, all information associated under this teacher will be deleted.
        </div>
        <div className="flex flex-row flex-wrap justify-end gap-2 text-white">
          <button className="text-2xl bg-neutral-800 rounded-xl shadow-md px-6 py-2 hover:brightness-95 shadow-black hover:scale-[.98] transition-transform transform-gpu" onClick={onHide}>
            CANCEL
          </button>
          <button className="px-6 py-2 text-2xl rounded-xl shadow-md bg-[#d00c24] hover:brightness-95 shadow-black hover:scale-[.98] transition-transform transform-gpu" onClick={onSave}>
            DELETESSS
          </button>
        </div>
      </div>
    </ReactModal>
  );
}

const modalStyle = {
  content: {
    background: `url("/src/assets/Homepage_Image/green.svg")`,
    border: "0",
    borderRadius: "2rem",
    maxWidth: "90dvw",
    maxHeight: "80dvh",
    width: "fit-content",
    height: "fit-content",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.4)",
  },
};
