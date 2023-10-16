import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import React from 'react';
import LandingPage from './component/LandingPage'
import { QueryClient, QueryClientProvider } from "react-query";

import Student_Login from './component/Student_Login'
import Student_SharedLayout from './component/Student_SharedLayout'
import Student_Homepage from './component/Student_Homepage'
import Student_Navbar from './component/Student_Navbar'
import Student_Profile from './component/Student_Profile'
import Student_Modules from './component/Student_Modules'
import Student_Module_Lecture from './component/Student_Module_Lecture';
import Student_Module_Review from './component/Student_Module_Review';
import Student_Module_Game from './component/Student_Module_Game';

import TokenTransfer from './component/TokenTransfer';

import TeacherSignIn from './component/TeacherSignUp'
import TeacherLogin from './component/TeacherLogin'
import TeacherSignUp from './component/TeacherSignUp'
import TeacherHomepage from './component/TeacherHomepage'
import Teacher_Send_Email from './component/Teacher_Send_Email'
import Teacher_Enter_Code from './component/Teacher_Enter_Code'
import Teacher_Reset_Password from './component/Teacher_Reset_Password'
import Teacher_PasswordReset_Success from './component/Teacher_PasswordReset_Success'
import Teacher_AccountManagement from './component/Teacher_AccountManagement'
import Teacher_SharedLayout from './component/Teacher_SharedLayout'

import AdminSignin from './component/AdminSignin'
import Teacher_Add_Student from './component/Teacher_Add_Student';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}> {/* Wrap the entire application with QueryClientProvider */}
      <>
        <BrowserRouter>
          <Routes>
            {/* Set LandingPage as the root route */}
            <Route path='/' element={<LandingPage />} />

            {/* TokenTransfer */}
            <Route path='/setToken' element={<TokenTransfer />} />

            {/* Student Routes */}
            <Route path='/Student_Login' element={<Student_Login />} />
            <Route path='/Student' element={<Student_SharedLayout />}>
              <Route index element={<Student_Homepage />} />
              <Route path='Student_Navbar' element={<Student_Navbar />} />
              <Route path='Profile' element={<Student_Profile />} />
              <Route path='Student_Modules' element={<Student_Modules />} />
              <Route path='Module/Lecture' element={<Student_Module_Lecture />} />
              <Route path='Module/Review' element={<Student_Module_Review />} />
              <Route path='Module/Game' element={<Student_Module_Game />} />

            </Route>

            {/* Teacher Routes */}
            <Route path='/TeacherLogin' element={<TeacherLogin />} />
            <Route path='/TeacherSignUp' element={<TeacherSignUp />} />
            <Route path='/Teacher_Send_Email' element={<Teacher_Send_Email />} />
            <Route path='/Teacher_Enter_Code' element={<Teacher_Enter_Code />} />
            <Route path='/Teacher_Reset_Password' element={<Teacher_Reset_Password />} />
            <Route path='/Teacher_PasswordReset_Success' element={<Teacher_PasswordReset_Success />} />

            <Route path="/Teacher_Homepage" element={<Teacher_SharedLayout />}>
              <Route index element={<TeacherHomepage />} />
              <Route path="Teacher_AccountManagement" element={<Teacher_AccountManagement />} />
              <Route path="Add_Account" element={<Teacher_Add_Student />} />
            </Route>

            {/* Admin Route */}
            <Route path='/AdminSignin' element={<AdminSignin />} />
          </Routes>
        </BrowserRouter>
      </>
    </QueryClientProvider>
  );
}

export default App;