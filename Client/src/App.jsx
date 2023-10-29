import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import React from "react";
import LandingPage from "./component/LandingPage";
import { QueryClient, QueryClientProvider } from "react-query";
import Logout from "./component/Logout";

import Student_Login from "./component/Student_Login";
import Student_SharedLayout from "./component/Student_SharedLayout";
import Student_Homepage from "./component/Student_Homepage";
import Student_Profile from "./component/Student_Profile";
import Student_Modules from "./component/Student_Modules";
import Student_Module_Lecture from "./component/Student_Module_Lecture";
import Student_Module_Review from "./component/Student_Module_Review";
import Student_Assessment from "./component/Student_Assessment";
import Student_AssessmentMenu from "./component/Student_AssesmentMenu";
import Student_Game from "./component/Student_Game";

import TokenTransfer from "./component/TokenTransfer";

import Teacher_Navbar from "./component/Teacher_Navbar";
import TeacherSignIn from "./component/TeacherSignUp";
import TeacherLogin from "./component/TeacherLogin";
import TeacherSignUp from "./component/TeacherSignUp";
import TeacherHomepage from "./component/TeacherHomepage";
import Teacher_Send_Email from "./component/Teacher_Send_Email";
import Teacher_Enter_Code from "./component/Teacher_Enter_Code";
import Teacher_Reset_Password from "./component/Teacher_Reset_Password";
import Teacher_PasswordReset_Success from "./component/Teacher_PasswordReset_Success";
import Teacher_AccountManagement from "./component/Teacher_AccountManagement";
import Teacher_SharedLayout from "./component/Teacher_SharedLayout";

import AdminSignin from "./component/AdminSignin";
import Teacher_Add_Student from "./component/Teacher_Add_Student";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* Wrap the entire application with QueryClientProvider */}
      <>
        <BrowserRouter>
          <Routes>
            {/* Set LandingPage as the root route */}
            <Route path="/" element={<LandingPage />} />

            {/* TokenTransfer */}
            <Route path="/setToken" element={<TokenTransfer />} />

            {/* Student Routes */}
            <Route path="/student/login" element={<Student_Login />} />
            <Route path="/student" element={<Student_SharedLayout />}>
              <Route index element={<Student_Homepage />} />
              <Route path="profile" element={<Student_Profile />} />
              <Route path="modules" element={<Student_Modules />} />
              <Route path="module/:moduleNumber/lecture" element={<Student_Module_Lecture />} />
              <Route path="module/:moduleNumber/review" element={<Student_Module_Review />} />
              <Route path="module/:moduleNumber/game" element={<Student_Game />} />
              <Route path="module/:moduleNumber/assessment" element={<Student_Assessment />} />
              <Route path="assessments" element={<Student_AssessmentMenu />} />
              <Route path="logout" element={<Logout />} />
            </Route>

            {/* Teacher Routes */}
            <Route path="/TeacherLogin" element={<TeacherLogin />} />
            <Route path="/TeacherSignUp" element={<TeacherSignUp />} />
            <Route path="/Teacher_Send_Email" element={<Teacher_Send_Email />} />
            <Route path="/Teacher_Enter_Code" element={<Teacher_Enter_Code />} />
            <Route path="/Teacher_Reset_Password" element={<Teacher_Reset_Password />} />
            <Route path="/Teacher_PasswordReset_Success" element={<Teacher_PasswordReset_Success />} />

            <Route path="/Teacher_Homepage" element={<Teacher_SharedLayout />}>
              <Route index element={<TeacherHomepage />} />
              <Route path="Teacher_Navbar" element={<Teacher_Navbar />} />
              <Route path="Teacher_AccountManagement" element={<Teacher_AccountManagement />} />
              <Route path="Add_Account" element={<Teacher_Add_Student />} />
              <Route path="Logout" element={<Logout />} />
            </Route>

            {/* Admin Route */}
            <Route path="/AdminSignin" element={<AdminSignin />} />
          </Routes>
        </BrowserRouter>
      </>
    </QueryClientProvider>
  );
}

export default App;
