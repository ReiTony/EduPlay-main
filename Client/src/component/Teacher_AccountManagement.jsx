import { useState, useEffect, useMemo } from "react";
import { useTable, useFilters } from "react-table";
import { BiEditAlt } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import ReactModal from "react-modal";
import axios from "axios";
import Teacher_AccountManagementMinTable from "./Teacher_AccountManagementMinTable";
import ErrorModal from "./ErrorModal";

function Teacher_AccountManagement() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [filterInput, setFilterInput] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");
  const [showDisableModal, setShowDisableModal] = useState(false);
  const [showEnableModal, setShowEnableModal] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState("");

  useEffect(() => {
    refresh();
  }, []);

  const refresh = async () => {
    axios
      .get(`${import.meta.env.VITE_API}teacher/class`)
      .then((res) => {
        res.data.students.sort((a, b) => a.gradeLevel - b.gradeLevel || a.firstName.localeCompare(b.firstName));
        setData(res.data.students);
      })
      .catch((err) => alert(err.message));
  };

  const handleDisableStudent = async () => {
    axios
      .put(`${import.meta.env.VITE_API}teacher/disableStudent/${selectedStudent}`)
      .then((res) => {
        refresh();
        setShowDisableModal(false);
      })
      .catch((err) => alert(err.message));
  };
  const handleEnableStudent = async () => {
    axios
      .put(`${import.meta.env.VITE_API}teacher/enableStudent/${selectedStudent}`)
      .then((res) => {
        refresh();
        setShowEnableModal(false);
      })
      .catch((err) => alert(err.message));
  };

  const showDisable = (username) => {
    setShowDisableModal(true);
    setSelectedStudent(username);
  };
  const showEnable = (username) => {
    setShowEnableModal(true);
    setSelectedStudent(username);
  };

  const columns = useMemo(
    () => [
      { Header: "GRADE LEVEL", accessor: "gradeLevel", id: "GRADELEVEL", Filter: GradeLevelFilter, filter: "equals" },
      { Header: "FIRST NAME", accessor: "firstName", id: "FIRSTNAME" },
      { Header: "LAST NAME", accessor: "lastName", id: "LASTNAME" },
      { Header: "BIRTHDAY", accessor: (d) => `${d.birthMonth}/${d.birthDay}` },
      {
        Header: "EDIT",
        accessor: "EDIT_STATUS",
        Cell: ({ row }) => (
          <button
            className="flex items-center justify-center px-5 py-1 m-auto font-bold text-white bg-green-500 rounded-lg shadow-lg hover:brightness-90 shadow-black hover:scale-[.98] transition-transform transform-gpu hover:shadow-green-300"
            onClick={() => (row.original.isActive ? navigate(row.original.username) : setIsErrorModalOpen(true))}
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
      { accessor: (d) => `${d.firstName} ${d.lastName}`, id: "NAME", Cell: () => <div className="p-0 h-0 w-0"></div> },
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
      <h1 className="backgroundRed text-white mx-1 sm:mx-4 rounded-2xl gap-3 p-4 text-2xl sm:text-4xl font-reemkufifont font-bold ">ACCOUNT MANAGEMENT</h1>

      <main className="flex flex-col flex-grow p-2 sm:p-5 mx-1 sm:mx-4 my-2 rounded-lg backgroundRed">
        <div className="flex flex-wrap gap-2 items-center justify-between pb-4 m-2">
          <h1 className="text-2xl sm:text-4xl font-bold text-white">REGISTERED ACCOUNTS</h1>

          <div className="flex flex-wrap gap-2">
            <button
              className="px-5 py-1 text-lg sm:text-2xl font-bold rounded-xl text-white bg-[#ff5757] hover:bg-red-700 hover:shadow-lg hover:shadow-red-300 shadow-lg shadow-black hover:scale-[.98] transition-transform transform-gpu"
              onClick={() => navigate("create")}
            >
              ADD STUDENT
            </button>
            <div className="relative text-white">
              <input
                type="text"
                value={filterInput}
                onChange={(e) => setFilterInput(e.target.value)}
                placeholder="Search by name..."
                className="w-56 p-2 bg-[#7e2626] border-red-300 border-2 rounded-md  focus:border-white focus:shadow-md focus:shadow-red-300 "
              />
              <span className="absolute transform -translate-y-1/2 top-1/2 right-4">
                <BsSearch className="mr-2 text-white cursor-pointer" />
              </span>
            </div>
            <select value={selectedGrade} onChange={(e) => setSelectedGrade(e.target.value)} className="p-2 bg-[#ff5757] text-white border-2 font-semibold border-red-300 rounded-md focus:outline-none focus:border-white">
              <option value="">All Grades</option>
              {[1, 2, 3].map((grade) => (
                <option key={grade} value={grade}>
                  Grade {grade}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="hidden md:block">
          <table {...getTableProps()} style={{ borderCollapse: "collapse", width: "100%" }}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()} className="py-4 text-2xl text-center text-white bg-black">
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
                  <tr {...row.getRowProps()} className="gap-5 font-semibold border-8 border-red-800" style={{ background: index % 2 === 0 ? "#b6b6b6" : "white" }}>
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()} className="py-5 text-2xl text-center border-black">
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
        <div className="md:hidden">
          <Teacher_AccountManagementMinTable data={data} filterInput={filterInput} selectedGrade={selectedGrade} refresh={refresh} showDisable={showDisable} showEnable={showEnable} showCannotEdit={() => setIsErrorModalOpen(true)} />
        </div>
      </main>
      <button className="fixed justify-center p-3 text-white bg-blue-800 rounded-full bottom-4 right-4 focus:outline-none" onClick={handleScrollToTop}>
        <BsFillArrowUpCircleFill className="text-3xl " />
      </button>
      <DisableModal show={showDisableModal} onHide={() => setShowDisableModal(false)} onSave={handleDisableStudent} />
      <EnableModal show={showEnableModal} onHide={() => setShowEnableModal(false)} onSave={handleEnableStudent} />
      <ErrorModal errorInfo="To edit this student, change its status to enabled." onHide={() => setIsErrorModalOpen(false)} show={isErrorModalOpen} />
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

function DisableModal({ show, onHide, onSave }) {
  if (!show) return;
  return (
    <ReactModal appElement={document.getElementById("root")} isOpen={show} shouldCloseOnEsc={true} style={modalStyle}>
      <div className="flex flex-col justify-center gap-8 p-6 font-semibold text-white font-sourceSans3">
        <h2 className="text-4xl text-center">DISABLE STUDENT</h2>
        <div className="text-2xl">
          Reminder: <br />
          Upon clicking disable, the student account cannot be logged in.
        </div>
        <div className="flex flex-col sm:flex-row justify-end gap-2 text-white">
          <button className="text-2xl bg-neutral-800 rounded-full shadow-md px-6 py-2 hover:brightness-95  shadow-black hover:scale-[.98] transition-transform transform-gpu hover:shadow-red-300 " onClick={onHide}>
            CANCEL
          </button>
          <button className="px-6 py-2 text-2xl rounded-full shadow-md bg-[#d00c24] hover:brightness-95  shadow-black hover:scale-[.98] transition-transform transform-gpu hover:shadow-red-300" onClick={onSave}>
            DISABLE
          </button>
        </div>
      </div>
    </ReactModal>
  );
}

function EnableModal({ show, onHide, onSave }) {
  if (!show) return;
  return (
    <ReactModal appElement={document.getElementById("root")} isOpen={show} shouldCloseOnEsc={true} style={modalStyle}>
      <div className="flex flex-col justify-center gap-8 p-6 font-semibold text-white font-sourceSans3">
        <h2 className="text-4xl text-center">Enable STUDENT</h2>
        <div className="text-2xl">
          Reminder: <br />
          Upon clicking enable, the student account cannot be logged in.
        </div>
        <div className="flex flex-col sm:flex-row justify-end gap-2 text-white">
          <button className="text-2xl bg-neutral-800 rounded-full shadow-md px-6 py-2 hover:brightness-95  shadow-black hover:scale-[.98] transition-transform transform-gpu hover:shadow-red-300 " onClick={onHide}>
            CANCEL
          </button>
          <button className="px-6 py-2 text-2xl rounded-full shadow-md bg-[#d00c24] hover:brightness-95  shadow-black hover:scale-[.98] transition-transform transform-gpu hover:shadow-red-300" onClick={onSave}>
            ENABLE
          </button>
        </div>
      </div>
    </ReactModal>
  );
}

const modalStyle = {
  content: {
    background: `url("/src/assets/Homepage_Image/red.svg")`,
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
