import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import studentDP from "../assets/StudentProfilePicture/StudentDP.jpg";
import { FcApproval } from "react-icons/fc";
import axios from "axios";

function Student_Profile() {
  // Define a state to store the additional student information
  const [studentData, setStudentData] = useState(null);
  // Define state variables for loading and error
  const [isStudentLoading, setIsStudentLoading] = useState(true);
  const [isBadgeLoading, setIsBadgeLoading] = useState(true);
  const [isAchievementLoading, setIsAchievementLoading] = useState(true);
  const [studentError, setStudentError] = useState(null);
  const [badgeError, setBadgeError] = useState(null); // Define badgeError
  const [achievementError, setAchievementError] = useState(null); // Define achievementError

  useEffect(() => {
    const init = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) return alert("UserId cannot be found");
      axios
        .get(`${import.meta.env.VITE_API}student/${userId}`, { withCredentials: true })
        .then((res) => setStudentData(res.data))
        .catch((err) => alert(err.message));
    };
    init();

    // Retrieve the token from cookies
    // const token = Cookies.get("studentToken");
    // const tokenObject = JSON.parse(token);
    // const userId = tokenObject.userId;
    // // Use the userId (studentId) to fetch additional student information
    // const fetchStudentInfo = async () => {
    //   if (!tokenObject) {
    //     console.error("Token is missing or invalid");
    //     setStudentError("Token is missing or invalid");
    //     setIsStudentLoading(false);
    //     return;
    //   }

    //   try {
    //     setIsStudentLoading(true);

    //     const response = await axios.get(`http://localhost:5000/api/v1/Student/${userId}`, {
    //       headers: {
    //         Authorization: `Bearer ${tokenObject.accessToken}`,
    //       },
    //     });

    //     if (response.status === 200) {
    //       const studentData = response.data.student;
    //       console.log("Student data:", studentData);
    //       setStudentData(studentData);
    //     } else {
    //       console.error("Error fetching student information");
    //       setStudentError("Error fetching student information");
    //     }
    //   } catch (error) {
    //     console.error("An error occurred while fetching student information:", error);
    //     setStudentError("An error occurred while fetching student information");
    //   } finally {
    //     setIsStudentLoading(false);
    //   }
    // };

    // Fetch badge data
    const fetchBadgeData = async () => {
      // Fetch badge data here using Axios or your preferred method
      // Example:
      // const response = await axios.get("/api/badges");
      // const badgeData = response.data;
      // Set badge data and set loading to false
      // setBadgeData(badgeData);
    };

    // Fetch achievement data
    const fetchAchievementData = async () => {
      // Fetch achievement data here using Axios or your preferred method
      // Example:
      // const response = await axios.get("/api/achievements");
      // const achievementData = response.data;
      // Set achievement data and set loading to false
      // setAchievementData(achievementData);
    };

    // Call your data fetching functions
    // fetchStudentInfo();
    // fetchBadgeData();
    // fetchAchievementData();
  }, []);

  const getBadgeColor = (score, total) => {
    const percentage = score / total;
    if (score === total) return "bg-yellow-400";
    else if (percentage >= 0.7) return "bg-slate-400";
    else if (percentage >= 0.4) return "bg-orange-400";
    else return "bg-white";
  };

  if (!studentData) return <div className="text-2xl font-bold m-auto">Loading...</div>;

  return (
    <div className="backgroundYellow">
      <div className="profile-container p-4 m-4 bg-[#fff5be] rounded-3xl">
        <div className="flex items-center profile-header">
          <div className="w-40 h-40 mr-4 bg-gray-500 profile-picture aspect-square rounded-SM">
            <img src={studentDP} alt="Profile" className="object-cover w-full h-full rounded-lg" />
          </div>
          <div className="overflow-hidden font-bold profile-info">
            <p className="text-3xl font-expletus">Name: {studentData ? `${studentData.firstName} ${studentData.lastName}` : "Loading..."}</p>
            <p className="text-3xl font-expletus">Grade Level: {studentData ? studentData.gradeLevel : "Loading..."}</p>
            <p className="text-3xl font-expletus">
              Birthday: <span>{`${months[studentData.birthMonth - 1]} ${studentData.birthDay}`}</span>
            </p>
          </div>
        </div>

        <div className="flex flex-row justify-between gap-8 my-8">
          <div className="flex flex-col gap-4 w-full font-sourceSans3">
            <h1 className="text-center text-3xl font-bold">BADGES</h1>
            <div className="flex flex-wrap gap-4 text-xl justify-center">
              {studentData.badges.map((badge, i) => (
                <div className={`${getBadgeColor(badge.score, badge.total)} text-center rounded-lg shadow-md p-5 px-8`} key={i}>
                  {badge.category} <br />
                  {(badge.score / badge.total) * 100}%
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4 w-full font-sourceSans3">
            <h1 className="text-center text-3xl font-bold">ACHIEVEMENTS</h1>
            <div className="flex flex-wrap"></div>
          </div>
          {/* <div className="badges-container rounded-xl bg-[#fff5be]">
            <div className="p-5 text-5xl font-bold text-center font-sourceSans3">
              <h1>BADGES</h1>
            </div>
            <div className="grid grid-cols-4 p-4 badge-grid sm:px-20 sm:grid-cols-4 sm:gap-5 lg:grid-cols-5 xl:grid-cols-6">
              {studentData.badges.map((badge, i) => (
                <div>{badge.category}</div>
              ))} */}
          {/* {badgeData.map((badge, index) => (
                <div key={index} className="h-auto m-2 mb-2 rounded-lg shadow-md badge-item hover:shadow-lg hover:shadow-green-400 bg-gradient-to-tl from-pink-600 via-teal-200 to-white aspect-square">
                  <img src={badge.imageUrl} alt={`Badge ${index + 1}`} />
                </div>
              ))} */}
          {/* </div>
          </div>

          <aside className="achievements-container bg-[#fff5be]  rounded-xl">
            <div className="text-5xl font-bold text-center font-sourceSans3">
              <h1>ACHIEVEMENTS</h1>
            </div>

            <div className="grid p-4 achievements-list sm:gap-2"> */}
          {/* {achievementData.map((achievement, index) => (
                <div key={index} className="achievement-item bg-[#fff5be]">
                  <div
                    className="w-full flex items-center mb-4 shadow-gray-500 hover:shadow-green-400 shadow-md px-4 py-2 text-xl font-bold text-black bg-[#a5d6a7] rounded-full font-sourceSans3 focus:outline-none focus:shadow-outline"
                    type="button">
                    <FcApproval className="text-3xl cursor-pointer" />
                    <p>{achievement.name}</p>
                  </div>
                </div>
              ))} */}
          {/* </div>
          </aside> */}
        </div>
      </div>
    </div>
  );
}

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default Student_Profile;
