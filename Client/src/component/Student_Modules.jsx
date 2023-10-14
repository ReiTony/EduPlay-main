import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import { FaLock } from "react-icons/fa";


function Student_Modules() {
    const [moduleStates, setModuleStates] = useState([]);
    const [studentProgressData, setStudentProgressData] = useState([]);

    useEffect(() => {
        // Replace with your JWT token retrieval logic (e.g., from local storage)
        const token = localStorage.getItem('token');

        // Use Axios to fetch student progress data
        axios.get('/student-progress', {
            headers: { Authorization: token }, // Send the JWT token in the headers
        })
            .then(response => {
                setStudentProgressData(response.data);
                const initialStates = response.data.map(() => false);
                setModuleStates(initialStates);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const toggleModule = (index) => {
        const updatedStates = [...moduleStates];
        updatedStates[index] = !updatedStates[index];
        setModuleStates(updatedStates);
    };

    const handleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <>
            <div className='backgroundYellow'>
                <div>
                    <div>
                        <div className='relative grid p-4 rounded-3xl'>
                            <div className='bg-[#fff5be]  rounded-xl'>
                                <div className="p-5 text-5xl font-bold font-sourceSans3">
                                    <h1>MODULES</h1>
                                    <div className="w-full border-b-4 border-black"></div>
                                </div>

                                <div className='px-5'>
                                    {studentProgressData.map((module, index) => (
                                        <div key={index}>
                                            <div
                                                className={`p-2 px-6 bg-[#ffbd59] rounded-full text-lg sm:text-2xl lg:text-4xl xl:text-4xl font-bold flex items-center justify-between mb-2 cursor-pointer ${moduleStates[index] ? 'cursor-pointer' : ''}`}
                                                onClick={() => toggleModule(index)}
                                            >
                                                <p>{module.title}</p>
                                                {moduleStates[index] ? (
                                                    <MdExpandLess className="text-5xl" />
                                                ) : (
                                                    <MdExpandMore className="text-5xl" />
                                                )}
                                            </div>
                                            {moduleStates[index] && (
                                                <div className="p-4 bg-[#ffcc80] rounded-xl mb-4">
                                                    {module.submodules.map((submodule, subIndex) => (
                                                        <div key={subIndex} className='flex items-center justify-between p-2 px-6 mb-2 font-bold bg-white rounded-full sm:text-3xl'>
                                                            <h1>{submodule.title}</h1>
                                                            <button className='p-2 px-4 text-white bg-black rounded-full'>
                                                                {submodule.locked ? <FaLock /> : 'OPEN'}
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button
                    className="fixed justify-center p-3 text-white bg-blue-800 rounded-full bottom-4 right-4 focus:outline-none"
                    onClick={handleScrollToTop}
                >
                    <BsFillArrowUpCircleFill className="text-3xl" />
                </button>
            </div>
        </>
    );
}

export default Student_Modules;
