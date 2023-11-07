import { useEffect, useState } from "react";
import studentDP from "../assets/StudentProfilePicture/StudentDP.jpg";
import axios from "axios";

function StudentProfile() {
  const [studentData, setStudentData] = useState(null);
  const [achievements, setAchievements] = useState(null);

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
        fetchAchievements(userId);
      })
      .catch((err) => alert(err.message));
  }, []);

  const fetchAchievements = (userId) => {
    axios
      .get(`${import.meta.env.VITE_API}student/achievement/${userId}`)
      .then((res) => {
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
    if (score === total) return `/badges/Grade ${gradeLevel}/G${gradeLevel}M${moduleNumber} Gold.png`;
    else if (percentage >= 0.7) return `/badges/Grade ${gradeLevel}/G${gradeLevel}M${moduleNumber} Silver.png`;
    else if (percentage >= 0.4) return `/badges/Grade ${gradeLevel}/G${gradeLevel}M${moduleNumber} Bronze.png`;
    return "";
  };

  if (!studentData) return <div className="text-2xl font-bold m-auto">Loading...</div>;

  return (
    <div className="backgroundYellow">
      <div className="bg-[#fff5be] rounded-3xl p-8 m-4">
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
      </div>

      <div className="flex flex-row w-full">
        {/* BADGES */}
        <div className="flex flex-col flex-grow gap-4 bg-[#fff5be] rounded-3xl p-6 m-4">
          <h1 className="text-center text-4xl font-bold">BADGES</h1>
          <div className="flex flex-wrap justify-center">
            {studentData.assessmentRecords.length === 0 ? (
              <h5 className="text-xl font-normal">No badges to display.</h5>
            ) : (
              studentData.assessmentRecords.map(
                (assessment, i) =>
                  assessment.score / assessment.total >= 0.4 && (
                    <img
                      src={getBadge(assessment.score, assessment.total, assessment.gradeLevel, assessment.moduleNumber)}
                      style={{ maxWidth: "250px", width: "100%" }}
                      key={i}
                      alt={`Badge for Module ${assessment.moduleNumber}`}
                    />
                  )
              )
            )}
          </div>
        </div>

        {/* ACHIEVEMENTS */}
        <div className="flex flex-col flex-grow gap-4 bg-[#fff5be] rounded-3xl p-6 m-4">
          <h1 className="text-center text-4xl font-bold">ACHIEVEMENTS</h1>
          <div className="flex flex-wrap gap-4 font-semibold justify-center">
            {achievements === null ? (
              <h5 className="text-xl">Loading...</h5>
            ) : achievements.length === 0 ? (
              <h5 className="text-xl font-normal">No achievements to display.</h5>
            ) : (
              achievements.map((achievement, i) => (
                <div className="p-6 bg-white rounded-2xl text-lg shadow-md" key={i}>
                  {achievement.moduleOrAssessmentTitle}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default StudentProfile;
