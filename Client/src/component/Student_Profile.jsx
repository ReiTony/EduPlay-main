import { useEffect, useState } from "react";
import studentDP from "../assets/StudentProfilePicture/StudentDP.jpg";
import axios from "axios";

function StudentProfile() {
  const [studentData, setStudentData] = useState(null);
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("User ID cannot be found");
      return;
    }
    axios
      .get(`${import.meta.env.VITE_API}student/${userId}`, {
        withCredentials: true,
      })
      .then((res) => {
        setStudentData(res.data);
        console.log("Achievements State:", res.data);
        fetchAchievements(userId);
      })
      .catch((err) => alert(err.message));
  }, []);

  const fetchAchievements = (userId) => {
    axios
      .get(`${import.meta.env.VITE_API}student/achievement/${userId}`)
      .then((res) => {
        console.log("Achievements Response:", res.data);

        if (Array.isArray(res.data)) {
          setAchievements(res.data);
        } else {
          setAchievements([]);
        }
      })
      .catch((err) => alert(err.message));
  };

  const getBadge = (score, total, gradeLevel, moduleNumber) => {
    const percentage = score / total;
    if (score === total)
      return `/badges/Grade ${gradeLevel}/G${gradeLevel}M${moduleNumber} Gold.png`;
    else if (percentage >= 0.7)
      return `/badges/Grade ${gradeLevel}/G${gradeLevel}M${moduleNumber} Silver.png`;
    else if (percentage >= 0.4)
      return `/badges/Grade ${gradeLevel}/G${gradeLevel}M${moduleNumber} Bronze.png`;
    return "";
  };

  if (!studentData)
    return <div className="text-2xl font-bold m-auto">Loading...</div>;

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
              Name:{" "}
              {studentData
                ? `${studentData.firstName} ${studentData.lastName}`
                : "Loading..."}
            </p>
            <p className="text-3xl font-expletus">
              Grade Level: {studentData ? studentData.gradeLevel : "Loading..."}
            </p>
            <p className="text-3xl font-expletus">
              Birthday:{" "}
              <span>{`${months[studentData.birthMonth - 1]} ${
                studentData.birthDay
              }`}</span>
            </p>
          </div>
        </div>

        <div className="flex flex-row justify-between gap-8 my-8">
          {/* BADGES */}
          <div className="flex flex-col w-full font-sourceSans3">
            <h1 className="text-center text-3xl font-bold">BADGES</h1>
            <div className="flex flex-wrap justify-center">
              {studentData.assessmentRecords.map((assessment, i) => (
                <img
                  src={getBadge(
                    assessment.score,
                    assessment.total,
                    assessment.gradeLevel,
                    assessment.moduleNumber
                  )}
                  style={{ maxWidth: "150px", width: "100%" }}
                  key={i}
                  alt={`Badge for Module ${assessment.moduleNumber}`}
                />
              ))}
            </div>
          </div>

          {/* ACHIEVEMENTS */}
          <div className="flex flex-col gap-4 w-full font-sourceSans3">
            <h1 className="text-center text-3xl font-bold">ACHIEVEMENTS</h1>
            <div className="flex flex-wrap gap-4 font-semibold justify-center">
              {achievements.length === 0 ? (
                <p>No achievements to display.</p>
              ) : (
                achievements.map((achievement, i) => (
                  <div className="p-8 bg-white rounded-2xl text-lg shadow-md" key={i}>
                    {achievement.completed && (
                      <>
                        <p>{achievement.moduleOrAssessmentTitle}</p>
                        <p>{achievement.completed}</p>
                      </>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default StudentProfile;
