import React from 'react';
import { IoChevronForwardCircleSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';

function TeacherHomepage() {

    return (

        <div className='backgroundYellow'>

            <main className='grid grid-row-[33%_33%_33%] h-full   px-4  '>
                <div className='relative h-[18rem] backgroundRed rounded-xl '>
                    <div className='absolute p-8 text-3xl font-bold tracking-wider text-white lg:text-5xl font-sourceSans3'>
                        <h1>Manage </h1>
                        <br />
                        <h1 className='ml-20'>Accounts and</h1>
                        <br />
                        <h1 className='ml-40'>Information</h1>
                    </div>
                    <div className='absolute bottom-0 right-0 p-4'>
                        <Link to="/Teacher_Homepage/Teacher_AccountManagement" >
                            <button className="bg-[#ff5757] hover:bg-red-700 shadow-lg shadow-black flex items-center lg:text-5xl text-white  font-bold py-2 px-4 rounded-full">
                                <div>ACCOUNT MANAGEMENT</div>
                                <IoChevronForwardCircleSharp className="lg:text-6xl " />
                            </button>
                        </Link>
                    </div>

                </div>

                <div className='relative h-[18rem] backgroundBlue rounded-xl '>
                    <div className='absolute p-8 text-xl font-bold tracking-wider text-white lg:text-5xl font-sourceSans3'>
                        <h1>Combine </h1>
                        <br />
                        <h1 className='ml-20'>Fun with</h1>
                        <br />
                        <h1 className='ml-40'>Knowledge</h1>
                    </div>
                    <div className='absolute bottom-0 right-0 p-4'>
                        <a href="">
                            <button className="bg-[#5271ff] hover:bg-[#2047f1] shadow-lg shadow-black flex items-center lg:text-5xl text-white  font-bold py-2 px-4 rounded-full">
                                <div>LEARNING GROUP</div>
                                <IoChevronForwardCircleSharp className="lg:text-6xl " />
                            </button>
                        </a>
                    </div>


                </div>
                <div className='backgroundGreen h-[18rem] relative rounded-xl '>
                    <div className='absolute p-8 text-xl font-bold tracking-wider text-white lg:text-5xl font-sourceSans3'>
                        <h1>Creating</h1>
                        <br />
                        <h1 className='ml-20'>the Ultimate</h1>
                        <br />
                        <h1 className='ml-40'>Challenge</h1>
                    </div>
                    <div className='absolute bottom-0 right-0 p-4'>
                        <a href="">
                            <button className="bg-[#46a074] hover:bg-[#00a656] shadow-lg shadow-black  flex items-center lg:text-5xl text-white  font-bold py-2 px-4 rounded-full">
                                <div>Custom Assessment</div>
                                <IoChevronForwardCircleSharp className="lg:text-6xl " />
                            </button>
                        </a>
                    </div>
                </div>
            </main>
        </div>

    )
}

export default TeacherHomepage