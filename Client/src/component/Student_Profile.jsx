import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import studentDP from "../assets/StudentProfilePicture/StudentDP.jpg";
import { FcApproval } from "react-icons/fc";
import axios from "axios";

function Student_Profile() {
  // Define a state to store the additional student information
  const [studentData, setStudentInfo] = useState(null);
  console.log("HERE", studentData)
  // Define state variables for loading and error
  const [isStudentLoading, setIsStudentLoading] = useState(true);
  const [isBadgeLoading, setIsBadgeLoading] = useState(true);
  const [isAchievementLoading, setIsAchievementLoading] = useState(true);
  const [studentError, setStudentError] = useState(null);
  const [badgeError, setBadgeError] = useState(null); // Define badgeError
  const [achievementError, setAchievementError] = useState(null); // Define achievementError


  useEffect(() => {
    // Retrieve the token from cookies
    const token = Cookies.get("studentToken");
    const tokenObject = JSON.parse(token);
    const userId = tokenObject.userId;
    // Use the user._id (studentId) to fetch additional student information
    const fetchStudentInfo = async () => {
      if (!tokenObject) {
        console.error("Token is missing or invalid");
        setStudentError("Token is missing or invalid");
        setIsStudentLoading(false);
        return;
      }

      try {
        setIsStudentLoading(true);

        const response = await axios.get(
          `http://localhost:5000/api/v1/Student/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${tokenObject.accessToken}`,
            },
          }
        );

        console.log("API response:", response);

        if (response.status === 200) {
          const studentData = response.data.student;
          console.log("Student data:", studentData);
          setStudentInfo(studentData);
        } else {
          console.error("Error fetching student information");
          setStudentError("Error fetching student information");
        }
      } catch (error) {
        console.error(
          "An error occurred while fetching student information:",
          error
        );
        setStudentError("An error occurred while fetching student information");
      } finally {
        setIsStudentLoading(false);
      }
    };

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
    fetchStudentInfo();
    fetchBadgeData();
    fetchAchievementData();
  }, []);

  // Rest of your component code remains the same
  // ...

  // Handle loading and error cases
  if (isStudentLoading || isBadgeLoading || isAchievementLoading) {
    return <p>Loading...</p>;
  }

  if (studentError || badgeError || achievementError) {
    return <p>Error loading data.</p>;
    
  }

  if (!studentData) {
    return <p>Loading...</p>;
    
  }
  
  // Existing rendering logic
  return (
    <div className="backgroundYellow">
      <div className="profile-container p-4 m-4 bg-[#fff5be] rounded-3xl">
        <div className="flex items-center profile-header">
          <div className="w-40 h-40 mr-4 bg-gray-500 profile-picture aspect-square rounded-SM">
            <img
              src={studentDP}
              alt="Profile"
              className="object-cover w-full h-full rounded-lg"
            />
          </div>
          <div className="overflow-hidden font-bold profile-info">
            <p className="text-3xl font-expletus">
              {studentData
                ? `${studentData.firstName} ${studentData.lastName}`
                : "Loading..."}
            </p>
            <p className="text-3xl font-expletus">
              Grade Level: {studentData ? studentData.gradeLevel : "Loading..."}
            </p>
            <p className="text-3xl font-expletus">
              Student ID:{" "}
              <span>{studentData ? studentData.studentId : "Loading..."}</span>
            </p>
          </div>
        </div>

        <div className="profile-content m-4 grid lg:grid-cols-[70%_30%] grid-cols-1 gap-5">
          <div className="badges-container rounded-xl bg-[#fff5be]">
            <div className="p-5 text-5xl font-bold text-center font-sourceSans3">
              <h1>BADGES</h1>
            </div>
            <div className="grid grid-cols-4 p-4 badge-grid sm:px-20 sm:grid-cols-4 sm:gap-5 lg:grid-cols-5 xl:grid-cols-6">
              {badgeData.map((badge, index) => (
                <div
                  key={index}
                  className="h-auto m-2 mb-2 rounded-lg shadow-md badge-item hover:shadow-lg hover:shadow-green-400 bg-gradient-to-tl from-pink-600 via-teal-200 to-white aspect-square"
                >
                  <img src={badge.imageUrl} alt={`Badge ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>

          <aside className="achievements-container bg-[#fff5be]  rounded-xl">
            <div className="text-5xl font-bold text-center font-sourceSans3">
              <h1>ACHIEVEMENTS</h1>
            </div>

            <div className="grid p-4 achievements-list sm:gap-2">
              {achievementData.map((achievement, index) => (
                <div key={index} className="achievement-item bg-[#fff5be]">
                  <div
                    className="w-full flex items-center mb-4 shadow-gray-500 hover:shadow-green-400 shadow-md px-4 py-2 text-xl font-bold text-black bg-[#a5d6a7] rounded-full font-sourceSans3 focus:outline-none focus:shadow-outline"
                    type="button"
                  >
                    <FcApproval className="text-3xl cursor-pointer" />
                    <p>{achievement.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default Student_Profile;