import React, { useState } from 'react';
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import { FaLock } from "react-icons/fa";
import Student_Navbar from './Student_Navbar';
import Student_Homepage from './Student_Homepage';


function Student_Modules() {
    const [moduleStates, setModuleStates] = useState([false, false]); // Initialize states for each module
    const toggleModule = (index) => {
        const updatedStates = [...moduleStates];
        updatedStates[index] = !updatedStates[index];
        setModuleStates(updatedStates);
    };

    const handleScrollToTop = () => {
        // Scroll to the top of the page
        window.scrollTo({
            top: 0,
            behavior: 'smooth', // Optional smooth scrolling
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
                                    {/* Module 1 */}
                                    <div
                                        className={`p-2 px-6 bg-[#ffbd59] rounded-full text-lg sm:text-2xl lg:text-4xl xl:text-4xl font-bold flex items-center justify-between mb-2 cursor-pointer ${moduleStates[0] ? 'cursor-pointer' : ''}`}
                                        onClick={() => toggleModule(0)} // Pass the index of the module
                                    >
                                        <p>Module 1: Describing and Comparing Materials</p>
                                        {moduleStates[0] ? (
                                            <MdExpandLess
                                                className="text-5xl "
                                            />
                                        ) : (
                                            <MdExpandMore
                                                className="text-5xl"
                                            />
                                        )}
                                    </div>

                                    {moduleStates[0] && (
                                        <div className="p-4 bg-[#ffcc80] rounded-xl mb-4">
                                            {/* Content to be expanded */}
                                            <div className='flex items-center justify-between p-2 px-6 mb-2 font-bold bg-white rounded-full sm:text-3xl'>
                                                <h1>Operations Lecture File 1</h1>
                                                <button className='p-2 px-4 text-white bg-black rounded-full'>OPEN</button>
                                            </div>

                                            <div className='flex items-center justify-between p-2 px-6 mb-2 font-bold bg-white rounded-full sm:text-3xl'>
                                                <h1>Module 1: Gamified Assessment</h1>
                                                <button className='p-2 px-4 text-black bg-white'><FaLock /></button>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className='px-5'>
                                    {/* Module 2 */}
                                    <div
                                        className={`p-2 px-6 bg-[#ffbd59] rounded-full text-lg sm:text-2xl lg:text-4xl xl:text-4xl font-bold flex items-center justify-between mb-2 cursor-pointer ${moduleStates[1] ? 'cursor-pointer' : ''}`}
                                        onClick={() => toggleModule(1)} // Pass the index of the module
                                    >
                                        <p>Module 2: Parts of the Human Body</p>
                                        {moduleStates[1] ? (
                                            <MdExpandLess
                                                className="text-5xl"
                                            />
                                        ) : (
                                            <MdExpandMore
                                                className="text-5xl"
                                            />
                                        )}
                                    </div>

                                    {moduleStates[1] && (
                                        <div className="p-4 bg-[#ffcc80] rounded-xl mb-4">
                                            {/* Content to be expanded */}
                                            <div className='flex items-center justify-between p-2 px-6 mb-2 font-bold bg-white rounded-full sm:text-3xl'>
                                                <h1>Operations Lecture File 1</h1>
                                                <button className='p-2 px-4 text-black bg-white'><FaLock /></button>
                                            </div>
                                        </div>
                                    )}
                                </div>


                                <div className='px-5'>
                                    {/* Module 2 */}
                                    <div
                                        className={`p-2 px-6 bg-[#ffbd59] rounded-full text-lg sm:text-2xl lg:text-4xl xl:text-4xl font-bold flex items-center justify-between mb-2 cursor-pointer ${moduleStates[2] ? 'cursor-pointer' : ''}`}
                                        onClick={() => toggleModule(2)} // Pass the index of the module
                                    >
                                        <p>Module 3: Needs and Care for Animals </p>
                                        {moduleStates[2] ? (
                                            <MdExpandLess
                                                className="text-5xl"
                                            />
                                        ) : (
                                            <MdExpandMore
                                                className="text-5xl"
                                            />
                                        )}
                                    </div>

                                    {moduleStates[2] && (
                                        <div className="p-4 bg-[#ffcc80] rounded-xl mb-4">
                                            {/* Content to be expanded */}
                                            <div className='flex items-center justify-between p-2 px-6 mb-2 font-bold bg-white rounded-full sm:text-3xl'>
                                                <h1>Operations Lecture File 1</h1>
                                                <button className='p-2 px-4 text-black bg-white'><FaLock /></button>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className='px-5'>
                                    {/* Module 2 */}
                                    <div
                                        className={`p-2 px-6 bg-[#ffbd59] rounded-full text-lg sm:text-2xl lg:text-4xl xl:text-4xl font-bold flex items-center justify-between mb-2 cursor-pointer ${moduleStates[3] ? 'cursor-pointer' : ''}`}
                                        onClick={() => toggleModule(3)} // Pass the index of the module
                                    >
                                        <p>Module 4: Parts and Needs of Plants </p>
                                        {moduleStates[3] ? (
                                            <MdExpandLess
                                                className="text-5xl"
                                            />
                                        ) : (
                                            <MdExpandMore
                                                className="text-5xl"
                                            />
                                        )}
                                    </div>

                                    {moduleStates[3] && (
                                        <div className="p-4 bg-[#ffcc80] rounded-xl mb-4">
                                            {/* Content to be expanded */}
                                            <div className='flex items-center justify-between p-2 px-6 mb-2 font-bold bg-white rounded-full sm:text-3xl'>
                                                <h1>Operations Lecture File 1</h1>
                                                <button className='p-2 px-4 text-black bg-white'><FaLock /></button>
                                            </div>
                                        </div>
                                    )}
                                </div>






                            </div>
                        </div>

                    </div>
                </div>
                <button
                    className="fixed justify-center p-3 text-white bg-blue-800 rounded-full bottom-4 right-4 focus:outline-none"
                    onClick={handleScrollToTop}
                >
                    <BsFillArrowUpCircleFill className="text-3xl " />
                </button>


            </div>
        </>
    )
}

export default Student_Modules