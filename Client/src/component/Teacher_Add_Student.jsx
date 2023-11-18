import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Cookies from "js-cookie";
import * as Yup from "yup";
import axios from "axios";

function Teacher_Add_Student() {
  const navigate = useNavigate();
  const [teacherToken, setTeacherToken] = useState(null);

  useEffect(() => {
    const token = Cookies.get("teacherToken");
    if (token) {
      const tokenObject = JSON.parse(token);
      setTeacherToken(tokenObject);
    }
  }, []);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("* First Name is required"),
    lastName: Yup.string().required("* Last Name is required"),
    birthDay: Yup.number().typeError("* Birth Day must be a number").required("* Birth Day is required"),
    birthMonth: Yup.number().typeError("* Birth Month must be a number").required("* Birth Month is required"),
    gradeLevel: Yup.string().required("* Grade Level is required"),
  });

  const onSubmit = (values) => {
    axios
      .post(`${import.meta.env.VITE_API}teacher/addStudent`, { ...values, birthDay: values.birthDay.toString().padStart(2, "0"), birthMonth: values.birthMonth.toString().padStart(2, "0") })
      .then((res) => navigate(-1))
      .catch((err) => alert(err.message));
  };

  return (
    <>
      <header className="grid backgroundRed text-white grid-row-[50%_50%]  mx-4 rounded-3xl gap-3 p-4 text-4xl font-reemkufifont font-bold ">
        <h1>ACCOUNT MANAGEMENT</h1>
      </header>

      <main className="flex flex-col justify-between lg:min-h-[75vh] backgroundRed shadow-lg shadow-red-500 mx-4 rounded-lg mt-4 p-5">
        <div>
          <h1 className="font-bold text-white lg:text-4xl">REGISTERED USERS - ADD STUDENT</h1>
        </div>
        <div className="bg-[#fff5be] shadow-md shadow-[#fff5be] bg-opacity-80 rounded-lg mx-4 mt-2 lg:min-h-[65vh]">
          <div>
            <h1 className="p-10 font-bold lg:text-4xl">Fill in the information:</h1>
          </div>
          <Formik initialValues={{ firstName: "", lastName: "", birthDay: "", birthMonth: "", gradeLevel: "1" }} validationSchema={validationSchema} onSubmit={onSubmit}>
            {() => (
              <Form>
                <div className="grid gap-10 font-semibold lg:text-3xl lg:grid-cols-2">
                  <div className="flex-col">
                    <div className="flex items-center justify-center">
                      <label htmlFor="firstName" className="pr-2 text-right">
                        First Name:
                      </label>
                      <Field type="text" id="firstName" name="firstName" placeholder="Enter First Name" className="px-4 py-2 lg:w-[400px] rounded-full lg:mx-4 border-4 border-l-8 border-r-8 border-black" />
                    </div>
                    <div className="ml-20">
                      <ErrorMessage name="firstName" component="div" className="flex justify-center text-xl text-center text-red-500 " />
                    </div>
                  </div>
                  <div className="flex-col">
                    <div className="flex items-center justify-center">
                      <label htmlFor="lastName" className="pr-2 text-right lg:ml-5">
                        Last Name:
                      </label>
                      <Field type="text" id="lastName" name="lastName" placeholder="Enter Last Name" className="px-4 py-2 lg:w-[400px] border-4 border-l-8 border-r-8 border-black rounded-full lg:mx-4" />
                    </div>
                    <div className="ml-20">
                      <ErrorMessage name="lastName" component="div" className="flex justify-center text-xl text-center text-red-500" />
                    </div>
                  </div>
                  <div className="flex-col">
                    <div className="flex items-center justify-center">
                      <label htmlFor="birthDay" className="pr-2 ml-5 text-right">
                        Birth Day:
                      </label>
                      <Field type="number" id="birthDay" name="birthDay" className="px-4 py-2 lg:w-[400px] border-4 border-l-8 border-r-8 border-black rounded-full lg:mx-4" />
                    </div>
                    <div className="ml-20">
                      <ErrorMessage name="birthDay" component="div" className="flex justify-center text-xl text-center text-red-500 " />
                    </div>
                  </div>
                  <div className="flex-col">
                    <div className="flex items-center justify-center">
                      <label htmlFor="birthMonth" className="pr-2 ml-5 text-right">
                        Birth Month:
                      </label>
                      <Field type="number" id="birthMonth" name="birthMonth" className="px-4 py-2 lg:w-[400px] border-4 border-l-8 border-r-8 border-black rounded-full lg:mx-4" />
                    </div>
                    <div className="ml-20">
                      <ErrorMessage name="birthMonth" component="div" className="flex justify-center text-xl text-center text-red-500 " />
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <label htmlFor="gradeLevel" className="pr-2 text-right">
                      Grade Level:
                    </label>
                    <Field as="select" id="gradeLevel" name="gradeLevel" className="px-4 py-2 lg:w-[400px] border-4 border-l-8 border-r-8 border-black rounded-full lg:mx-4">
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </Field>
                    <ErrorMessage name="gradeLevel" component="div" className="text-red-500" />
                  </div>
                </div>
                <div className="flex justify-center p-5">
                  <button type="submit" className="px-10 py-2 text-3xl font-bold text-white bg-green-500 rounded-lg shadow-lg hover:brightness-90 shadow-black hover:scale-[.98] transition-transform transform-gpu hover:shadow-green-300">
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
