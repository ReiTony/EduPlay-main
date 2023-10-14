import React from "react";
import studentDP from "../assets/StudentProfilePicture/StudentDP.jpg";
import { FcApproval } from "react-icons/fc";
import { useQuery } from "react-query";

const fetchStudentProfile = async (studentId) => {
  const response = await fetch(`/api/v1/Student/${studentId}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const fetchBadges = async () => {
  const response = await fetch("/api/badges");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const fetchAchievements = async () => {
  const response = await fetch("/api/achievements");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

function Student_Profile({ studentId }) {
  const {
    data: studentData,
    error: studentError,
    isLoading: isStudentLoading,
  } = useQuery(["student", studentId], () => fetchStudentProfile(studentId));

  const {
    data: badgeData,
    error: badgeError,
    isLoading: isBadgeLoading,
  } = useQuery("badges", fetchBadges);

  const {
    data: achievementData,
    error: achievementError,
    isLoading: isAchievementLoading,
  } = useQuery("achievements", fetchAchievements);

  if (isStudentLoading || isBadgeLoading || isAchievementLoading) {
    return <p>Loading...</p>;
  }

  if (studentError || badgeError || achievementError) {
    return <p>Error loading data.</p>;
  }

  const userData = studentData;
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
              {userData ? userData.name : "Loading..."}
            </p>
            <p className="text-3xl font-expletus">
              Grade Level: {userData ? userData.grade : "Loading..."}
            </p>
            <p className="text-3xl font-expletus">
              Student ID:{" "}
              <span>{userData ? userData.studentId : "Loading..."}</span>
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
                    className="w-full flex items-center mb-4 shadow-gray-500 hover:shadow-green-400 shadow-md px-4 py-2 text-xl font-bold text-black bg-[#a5d6a7] rounded-full font-rfont  focus:outline-none focus:shadow-outline"
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
