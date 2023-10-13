import React, { useState } from 'react';
import { HiX, HiBell } from 'react-icons/hi';
import { GoDotFill } from 'react-icons/go'
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import BGmodule from '../assets/Homepage_Image/modules_bg.png';
import BGass from '../assets/Homepage_Image/assessment_bg.png';
import BGlr from '../assets/Homepage_Image/learningGroup_bg.png';
import { Link, Outlet } from 'react-router-dom';


const Student_Dashboard = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const [isVisible, setIsVisible] = useState(true);

    const handleCloseClick = () => {
        setIsVisible(false);
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
                    {isVisible && (
                        <div className='relative p-4 m-4 bg-[#fff5be] rounded-3xl'>
                            <div className="absolute top-0 right-0 p-2">
                                <HiX className="text-5xl cursor-pointer" onClick={handleCloseClick} />
                            </div>

                            <div className='flex items-center'>
                                <h1 className='p-4 mt-2 text-3xl font-bold lg:text-5xl font-sourceSans3'>NOTIFICATIONS </h1>
                                <HiBell className="text-5xl " />
                            </div>

                            <div className='ml-8 lg:text-3xl font-expletus'>
                                <div className='flex items-center pb-2'>
                                    <GoDotFill className="ml-2 text-3xl" />
                                    <h2>Anchor tag ba to or Pure Notif Text lang UNLOCKED</h2>
                                </div>

                                <div className='flex items-center pb-2'>
                                    <GoDotFill className="ml-2 text-3xl" />
                                    <h2>Anchor tag ba to or Pure Notif Text lang UNLOCKED</h2>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className='m-4  lg:p-0 rounded-full grid lg:grid-cols-[32.5%_32.8%_32.6%] lg:gap-5 gap-5  '>

                    <div className='flex flex-col items-center bg-gradient-to-r from-green-300 via-teal-300 to-cyan-200 rounded-xl homepageParent '>
                        <div className='text-3xl font-bold text-center xl:text-5xl xl:p-10 font-expletus'>
                            <h1>MODULE</h1>
                        </div>
                        <div>
                            <img className='w-1/1 aspect-square homepageChild' src={BGmodule} alt="Logo" />
                        </div>

                        <div className='bg-[#ff5757] text-3xl font-bold p-2 text-white rounded-xl px-5 mb-5 font-sourceSans3'>
                            <Link to="Student_Modules">
                                LEARN
                            </Link>
                        </div>

                    </div>



                    <div className='flex flex-col items-center bg-gradient-to-tr from-rose-100 to-rose-200 rounded-xl homepageParent'>
                        <div className='text-3xl font-bold text-center xl:text-5xl xl:p-10 font-expletus'>
                            <h1>ASSESSMENTS</h1>
                        </div>

                        <div>
                            <img className='w-1/1 aspect-square homepageChild' src={BGass} alt="Logo" />
                        </div>

                        <a href="#">
                            <div className='bg-[#ff5757] text-3xl font-bold p-2 text-white rounded-xl px-5 mb-5 font-sourceSans3'>

                                <a>
                                    PLAY
                                </a>
                            </div>
                        </a>
                    </div>


                    <div className='flex flex-col items-center bg-gradient-to-l from-sky-300 via-cyan-300 to-cyan-500 rounded-xl homepageParent '>
                        <div className='text-3xl font-bold text-center xl:text-5xl xl:p-10 font-expletus'>
                            <h1>LEARNING GROUP</h1>
                        </div>
                        <div>
                            <img className='lg:w-[100%]  aspect-square homepageChild' src={BGlr} alt="Logo" />
                        </div>

                        <a href="#">
                            <div className='bg-[#5271ff] mt-14 text-3xl font-bold p-2 text-white rounded-xl px-5 mb-5 font-sourceSans3'>

                                <a>
                                    JOIN
                                </a>
                            </div>
                        </a>
                    </div>

                </div >

                <button
                    className="fixed justify-center p-3 text-white bg-blue-800 rounded-full bottom-4 right-4 focus:outline-none"
                    onClick={handleScrollToTop}
                >
                    <BsFillArrowUpCircleFill className="text-3xl " />
                </button>




            </div >

        </>



    );
};

export default Student_Dashboard;