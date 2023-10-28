import React, { useState, useEffect } from 'react';
import Teacher_Navbar from './Teacher_Navbar';
import { useTable, useFilters } from 'react-table';
import { BiEditAlt } from 'react-icons/bi';
import { BsSearch } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { BsFillArrowUpCircleFill } from "react-icons/bs";

function Teacher_AccountManagement() {
    const [data, setData] = useState([]);
    const [filterInput, setFilterInput] = useState('');
    const [selectedGrade, setSelectedGrade] = useState('');

    useEffect(() => {
        fetch('http://localhost:5000/api/v1/Teacher/Class') 
            .then((response) => response.json())
            .then((jsonData) => {
                setData(jsonData.students);
            })
            .catch((error) => {
                console.error('Error fetching student data:', error);
            });
    }, []);

    // Define your columns and data here
    const columns = React.useMemo(
        () => [
            {
                Header: 'ID',
                accessor: 'studentId',
            },
            {
                Header: 'GRADELEVEL',
                accessor: 'gradeLevel',
                id: 'GRADELEVEL',
                Filter: GradeLevelFilter, 
                filter: 'equals',
            },
            {
                Header: 'LASTNAME',
                accessor: 'lastName',
                id: 'LASTNAME',
            },
            {
                Header: 'FIRSTNAME',
                accessor: 'firstName',
            },
            {
                Header: 'BIRTHDAY',
                accessor: d => `${d.birthMonth}/${d.birthDay}`,
            },
            {
                Header: 'EDIT',
                accessor: 'EDIT_STATUS',
                Cell: () => (
                    <button className='flex items-center justify-center px-8 m-auto text-white bg-green-500 rounded-full'>
                        <span className='flex items-center'>
                            <BiEditAlt className='mr-2 cursor-pointer' />
                            Edit
                        </span>
                    </button>
                ),
            },
            {
                Header: 'STATUS',
                accessor: 'STATUS',
                Cell: ({ value }) => (
                    <span
                        className={` m-auto px-2 py-1 rounded ${value === 'ACTIVE'
                            ? 'bg-green-500 rounded-full px-9'
                            : value === 'DISABLE'
                                ? 'bg-red-500 px-7'
                                : 'bg-white'
                            } text-white`}
                    >
                        {value}
                    </span>
                ),
            },
        ],
        []
      );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state,
        setFilter,
    } = useTable(
        {
            columns,
            data,
        },
        useFilters // Use the filter hook
    );

    const { filters } = state;

    useEffect(() => {
        // When selectedGrade changes, update the filter
        if (selectedGrade === '') {
            // If "All Grades" is selected, remove the grade level filter
            setFilter('GRADELEVEL', undefined);
        } else {
            setFilter('GRADELEVEL', selectedGrade);
        }
    }, [selectedGrade]);

    useEffect(() => {
        // When filterInput changes, update the text filter
        setFilter('LASTNAME', filterInput);
    }, [filterInput]);

    const handleScrollToTop = () => {
        // Scroll to the top of the page
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };
    return (
        <>
            <div className='backgroundYellow'>

                <header className='grid bg-red-500  grid-row-[50%_50%]  mx-4 rounded-3xl gap-3 p-4 text-4xl font-reemkufifont font-bold '>
                    <h1>ACCOUNT MANAGEMENT</h1>
                </header>

                <main className='bg-[#a5d6a7]  mx-4 mt-2 rounded-lg p-5'>
                    <div className='flex items-center justify-between pb-4 m-2'>
                        <div className='text-4xl font-bold '>
                            <h1>REGISTERED ACCOUNT</h1>
                        </div>

                        <div className="flex">

                            <div className='mx-4'>
                                <Link to="/Teacher_Homepage/Add_Account" >
                                    <button className="px-4 py-2 mt-[0.10rem] text-white bg-blue-500 rounded-md p-y hover:bg-blue-700">
                                        Add Student
                                    </button>
                                </Link>
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
                                    <BsSearch className='mr-2 cursor-pointer' />
                                </span>
                            </div>
                            <div className="mx-4">
                                {/* Dropdown Select for Grade Level */}
                                <select
                                    value={selectedGrade}
                                    onChange={(e) => {
                                        setSelectedGrade(e.target.value);
                                    }}
                                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                >
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
                    <table {...getTableProps()} style={{ borderCollapse: 'collapse', width: '100%' }}>
                        <thead>
                            {headerGroups.map((headerGroup) => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map((column) => (
                                        <th
                                            {...column.getHeaderProps()}
                                            style={{}}
                                            className='p-2 py-4 text-3xl text-center text-white bg-black'
                                        >
                                            {column.render('Header')}
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
                                        className='gap-5 font-semibold border-8 border-[#a5d6a7]'
                                        style={{
                                            background: index % 2 === 0 ? '#b6b6b6' : 'white', // Apply gray background for even rows
                                        }}
                                    >
                                        {row.cells.map((cell) => {
                                            return (
                                                <td
                                                    {...cell.getCellProps()}
                                                    className='p-2 py-5 text-2xl text-center border-black'
                                                >
                                                    {cell.render('Cell')}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </main>
                <button
                    className="fixed justify-center p-3 text-white bg-blue-800 rounded-full bottom-4 right-4 focus:outline-none"
                    onClick={handleScrollToTop}
                >
                    <BsFillArrowUpCircleFill className="text-3xl " />
                </button>
            </div>
        </>
    );
}

// Custom filter component for Grade Level
function GradeLevelFilter({ column }) {
    const { filterValue, setFilter } = column;
    return (
        <select
            value={filterValue || ''}
            onChange={(e) => setFilter(e.target.value || undefined)}
            className='p-2 rounded-md'
        >
            <option value=''>All Grades</option>
            {[1, 2, 3].map((grade) => (
                <option key={grade} value={grade}>
                    Grade {grade}
                </option>
            ))}
        </select>
    );
}

export default Teacher_AccountManagement;