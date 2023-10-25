import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState, useEffect } from "react";

function Teacher_Add_Student() {
  const [teacherToken, setTeacherToken] = useState(null);

  useEffect(() => {
    // Retrieve the teacherToken from your JWT or other client-side storage
    const token = localStorage.getItem("teacherToken"); // Example: Retrieve from local storage
    setTeacherToken(token);
  }, []);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("* First Name is required"),
    lastName: Yup.string().required("* Last Name is required"),
    birthDay: Yup.number().typeError("* Birth Day must be a number").required("* Birth Day is required"),
    birthMonth: Yup.number().typeError("* Birth Month must be a number").required("* Birth Month is required"),
    gradeLevel: Yup.string().required("* Grade Level is required"),
  });

  const checkStudentExistence = (values) => {
    const { firstName, lastName, birthDay, birthMonth, gradeLevel } = values;
    const userName = `${firstName}${lastName}`;
    return axios
      .get(`http://localhost:5000/api/v1/Teacher/showStudent/${userName}`)
      .then((response) => {
        // If the student is not found, resolve with an empty response
        if (!response.data) {
          return Promise.resolve();
        }
        return response;
      })
      .catch((error) => {
        console.error("Error checking student existence:", error);
      });
  };
  
  const onSubmit = (values) => {
    checkStudentExistence(values)
      .then((response) => {
        if (!response) {
          // No student found, proceed to create the student account.
          axios
            .post("http://localhost:5000/api/v1/Teacher/addStudent", values, {
              headers: {
                Authorization: `Bearer ${teacherToken}`,
              },
            })
            .then((postResponse) => {
              console.log("POST request successful. Response:", postResponse.data);
            })
            .catch((postError) => {
              console.error("POST request error:", postError);
            });
        } else {
          // Student with the same attributes already exists.
          console.error("Student with the same attributes already exists in the database.");
        }
      })
      .catch((error) => {
        console.error("Error checking data:", error);
      });
  };

  return (
    <>
      <header className="grid bg-red-500 grid-row-[50%_50%] mx-4 rounded-3xl gap-3 p-4 text-4xl font-reemkufifont font-bold">
        <h1>ACCOUNT MANAGEMENT</h1>
      </header>

      <main className="flex flex-col justify-between lg:min-h-[75vh] bg-[#a5d6a7] mx-4 rounded-lg mt-4 p-5">
        <div>
          <h1 className="font-bold lg:text-4xl">
            REGISTERED USERS - ADD STUDENT
          </h1>
        </div>
        <div className="bg-[#fff5be] rounded-lg mx-4 mt-2 lg:min-h-[65vh]">
          <div>
            <h1 className="p-10 font-bold lg:text-4xl">
              Fill in the information:
            </h1>
          </div>
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              birthDay: "",
              birthMonth: "",
              gradeLevel: "1",
            }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {() => (
              <Form>
                <div className="grid gap-10 font-semibold lg:text-3xl lg:grid-cols-2">
                  <div className="flex-col">
                    <div className="flex items-center justify-center">
                      <label htmlFor="firstName" className="pr-2 text-right">
                        First Name:
                      </label>

                      <Field
                        type="text"
                        id="firstName"
                        name="firstName"
                        placeholder="Enter First Name"
                        className="px-4 py-2 lg:w-[400px] rounded-full lg:mx-4 border-4 border-l-8 border-r-8 border-black"
                      />
                    </div>
                    <div className="ml-20">
                      <ErrorMessage
                        name="firstName"
                        component="div"
                        className="flex justify-center text-xl text-center text-red-500 "
                      />
                    </div>
                  </div>
                  <div className="flex-col">
                    <div className="flex items-center justify-center">
                      <label
                        htmlFor="lastName"
                        className="pr-2 text-right lg:ml-5"
                      >
                        Last Name:
                      </label>
                      <Field
                        type="text"
                        id="lastName"
                        name="lastName"
                        placeholder="Enter Last Name"
                        className="px-4 py-2 lg:w-[400px] border-4 border-l-8 border-r-8 border-black rounded-full lg:mx-4"
                      />
                    </div>
                    <div className="ml-20">
                      <ErrorMessage
                        name="lastName"
                        component="div"
                        className="flex justify-center text-xl text-center text-red-500"
                      />
                    </div>
                  </div>
                  <div className="flex-col">
                    <div className="flex items-center justify-center">
                      <label
                        htmlFor="birthDay"
                        className="pr-2 ml-5 text-right"
                      >
                        Birth Day:
                      </label>
                      <Field
                        type="number" // Changed to number
                        id="birthDay"
                        name="birthDay"
                        className="px-4 py-2 lg:w-[400px] border-4 border-l-8 border-r-8 border-black rounded-full lg:mx-4"
                      />
                    </div>
                    <div className="ml-20">
                      <ErrorMessage
                        name="birthDay"
                        component="div"
                        className="flex justify-center text-xl text-center text-red-500 "
                      />
                    </div>
                  </div>
                  <div className="flex-col">
                    <div className="flex items-center justify-center">
                      <label
                        htmlFor="birthMonth"
                        className="pr-2 ml-5 text-right"
                      >
                        Birth Month:
                      </label>
                      <Field
                        type="number" // Changed to number
                        id="birthMonth"
                        name="birthMonth"
                        className="px-4 py-2 lg:w-[400px] border-4 border-l-8 border-r-8 border-black rounded-full lg:mx-4"
                      />
                    </div>
                    <div className="ml-20">
                      <ErrorMessage
                        name="birthMonth"
                        component="div"
                        className="flex justify-center text-xl text-center text-red-500 "
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <label htmlFor="gradeLevel" className="pr-2 text-right">
                      Grade Level:
                    </label>
                    <Field
                      as="select"
                      id="gradeLevel"
                      name="gradeLevel"
                      className="px-4 py-2 lg:w-[400px] border-4 border-l-8 border-r-8 border-black rounded-full lg:mx-4"
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </Field>
                    <ErrorMessage
                      name="gradeLevel"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                </div>
                <div className="flex justify-center p-5">
                  <button
                    type="submit"
                    className="px-10 py-2 text-3xl font-bold text-white bg-black rounded-2xl lg:mt-28 hover-bg-slate-800"
                  >
                    ADD
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </main>
    </>
  );
}

export default Teacher_Add_Student;
