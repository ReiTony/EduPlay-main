import React, { useEffect, useState } from 'react';

function Student_Module_Lecture() {
    const [moduleTitle, setModuleTitle] = useState("");
    const [src, setSrc] = useState(""); // Add this line

    useEffect(() => {
        const moduleKey = JSON.parse(window.sessionStorage.getItem("MODULE"));
        const srcKey = JSON.parse(window.sessionStorage.getItem("SRC")); // Add this line
        if (moduleKey && moduleKey.startsWith("M")) {
            const titleParts = moduleKey.split('-');
            if (titleParts.length === 2) {
                setModuleTitle(titleParts[1]);
            }
        }
        if (srcKey) { // Add this line
            setSrc(srcKey); // Add this line
        }
    }, []);

    return (
        <>
            <div className='bg-[#fff5be] rounded-3xl p-4 m-4'>
                <div className="p-5 text-5xl font-bold font-sourceSans3">
                    <h1>MODULES</h1>
                    <div className="w-full border-b-4 border-black"></div>
                </div>

                <div className='flex flex-col items-center justify-items-center'>
                    {/* MODULE TITLE */}
                    <div className='pb-4 text-3xl font-bold'>
                        <h1>{moduleTitle}</h1>
                    </div>
                    <div>
                        <iframe src={src} width="1040" height="580" allow="autoplay" allowfullscreen></iframe> {/* Change this line */}
                    </div>
                </div>

                <div className='flex justify-end mr-12'>
                    <button className='px-10 py-2 text-2xl font-bold text-center text-white bg-black rounded-full'>
                        NEXT
                    </button>
                </div>
            </div>
        </>
    );
}

export default Student_Module_Lecture;