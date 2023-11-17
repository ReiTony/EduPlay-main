import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiX, HiBell } from "react-icons/hi";
import { MdNotificationsActive } from "react-icons/md";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import axios from "axios";
import BGmodule from "../assets/Homepage_Image/modules_bg.png";
import BGass from "../assets/Homepage_Image/assessment_bg.png";
import BGlr from "../assets/Homepage_Image/learningGroup_bg.png";


//const Student_Dashboard = () => {
function Student_Dashboard() {
  const gradeLevel = localStorage.getItem("gradeLevel");
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const [isVisible, setIsVisible] = useState(true);
  const [notifications, setNotificationMessages] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API}student/${userId}`)
      .then((res) => setNotificationMessages(res.data.notifications))
      .catch((err) => alert(err.message));
  }, []);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API}student/notifications?recipient=${userId}&gradeLevel=${gradeLevel}`)
      .then((res) => setNotificationMessages(res.data.request))
      .catch((err) => alert(err.message));
  }, []);

  const handleCloseClick = () => {
    setIsVisible(false);
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="backgroundYellow">
      {/* NOTIFICATION SECTION */}
      <div>
        {isVisible && (
          <div className="relative p-4 m-4 bg-[#fff5be] rounded-3xl">
            <div className="absolute top-0 right-0 p-2">
              <HiX
                className="text-5xl cursor-pointer"
                onClick={handleCloseClick}
              />
            </div>
            <div className="flex items-center">
              <h1 className="p-4 mt-2 text-3xl font-bold lg:text-5xl font-sourceSans3">
                NOTIFICATIONS
              </h1>
              <MdNotificationsActive className="text-5xl animate-pulse " />

            </div>
            <div className="flex flex-col mx-4">
              {notifications.map((notification, index) => (
                <h2 className="text-2xl font-semibold" key={index}>{`• ${notification.message}`}</h2>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="m-4  lg:p-0 rounded-full grid lg:grid-cols-[32.5%_32.8%_32.6%] lg:gap-5 gap-5  ">
        <div className="flex flex-col items-center justify-between lg:h-[82vh] bg-gradient-to-r from-green-300 via-teal-300 to-cyan-200 rounded-xl homepageParent shadow-xl  hover:shadow-green-500 hover:scale-95 transition-transform transform-gpu">
          <div className="text-3xl font-bold text-center xl:text-5xl xl:p-10 font-expletus">
            <h1 className="mt-8">MODULE</h1>
          </div>
          <div>
            <img
              className="w-1/1 aspect-square homepageChild"
              src={BGmodule}
              alt="Logo"
            />
          </div>

          <div className="p-2 px-5 mb-5 text-3xl font-bold text-white transition-transform bg-green-600 rounded-xl font-sourceSans3 hover:scale-95 transform-gpu">
            <Link to="/student/modules">LEARN</Link>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between transition-transform bg-gradient-to-tr shadow-xl hover:shadow-[#ff5757] from-rose-100 to-rose-200 rounded-xl homepageParent hover:scale-95 transform-gpu">
          <div className="text-3xl font-bold text-center xl:text-5xl xl:p-10 font-expletus">
            <h1 className="mt-8">ASSESSMENTS</h1>
          </div>

          <div>
            <img
              className="w-1/1 aspect-square homepageChild"
              src={BGass}
              alt="Logo"
            />
          </div>

          <div className="bg-[#ff5757] text-3xl font-bold p-2 text-white rounded-xl px-5 mb-5 font-sourceSans3 hover:scale-95 transition-transform transform-gpu">
            <Link to="assessments">PLAY</Link>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between transition-transform shadow-xl bg-gradient-to-l from-sky-300 via-cyan-300 to-cyan-500 hover:shadow-cyan-500 rounded-xl homepageParent hover:scale-95 transform-gpu">
          <div className="text-3xl font-bold text-center xl:text-5xl xl:p-10 font-expletus">
            <h1 className="mt-8">LEARNING GROUP</h1>
          </div>
          <div>
            <img
              className="lg:w-[100%]  aspect-square homepageChild"
              src={BGlr}
              alt="Logo"
            />
          </div>

          <button
            className="p-2 px-5 mb-5 text-3xl font-bold text-white transition-transform bg-cyan-700 mt-14 rounded-xl font-sourceSans3 hover:scale-95 transform-gpu"
            onClick={() => navigate("learning-group")}
          >
            JOIN
          </button>
        </div>
      </div>

      <button
        className="fixed justify-center p-3 text-white bg-blue-800 rounded-full bottom-4 right-4 focus:outline-none"
        onClick={handleScrollToTop}
      >
        <BsFillArrowUpCircleFill className="text-3xl " />
      </button>
    </div>
  );
};

export default Student_Dashboard;