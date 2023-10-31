import React from "react";
import { IoChevronForwardCircleSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

function TeacherHomepage() {

    return (
      
          <div className="backgroundRed h-[24rem] relative rounded-xl ">
            <div className="absolute p-8 text-3xl font-bold tracking-wider text-white lg:text-6xl font-sourceSans3">
              <h1>Creating</h1>
              <br />
              <h1 className="ml-20">the Ultimate</h1>
              <br />
              <h1 className="ml-40">Challenge</h1>
            </div>
            <div className="absolute bottom-0 right-0 p-4">
              <a href="/teacher/assessments">
                <button className="bg-[#ff5757] hover:bg-red-700 shadow-lg shadow-black flex items-center lg:text-5xl text-white font-bold py-2 px-4 rounded-full">
                  <div>CUSTOM ASSESSMENT</div>
                  <IoChevronForwardCircleSharp className="lg:text-6xl" />
                </button>
              </a>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default TeacherHomepage;
