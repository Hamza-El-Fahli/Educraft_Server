"use client";

import Copyright from "@/componentes/CopyRight";
import HeaderNav from "@/componentes/HeaderNav";
import SideNav from "@/componentes/sidenav";
import { useState } from "react";

interface Course {
  id: number;
  name: string;
}
export default function AddCourse() {
  const [Courses, setCourses] = useState<Course[]>([]);
  const [inpuCourse, setinpuCourse] = useState("");
  const handleClick = (e: any) => {
    e.preventDefault();
    const tmp = { id: Courses.length, name: inpuCourse };
    setCourses([...Courses, tmp]);
    setinpuCourse("");
  };
  const handleChange = (e: any) => {
    setinpuCourse(e.target.value);
  };
  return (
    <div className="dashboardContainer">
      <HeaderNav activeView="addUsers" />
      {/* Side nav */}
      <SideNav activeView="addUsers" />
      {/* Side nav */}
      {/* Main View */}
      {/* <main className=" h-full w-full col-span-10 row-span-11 grid grid-rows-12 gap-3"> */}
        {/* Form to add course */}
        {/* <form className="flex flex-col w-1/2  gap-2  p-5 bg-secondary row-span-4">
          <h1>Add New Course</h1>
          <label htmlFor="">Course name :</label>
          <input
            value={inpuCourse}
            onChange={handleChange}
            className="rounded-full text-gray-500 bg-inherit border-4 p-1 px-4 border-primary outline-none font-bold"
            type="text"
          />
          <button
            onClick={(e: any) => {
              handleClick(e);
            }}
            className="p-2 text-third border border-third rounded-full font-bold "
          >
            Add course
          </button>
        </form> */}
         <div className="dashboardCards_add">
        <svg width="15" height="15" viewBox="0 0 15 15">
    <path d="M7.5 0L7.5 15M0 7.5L15 7.5" fill="none" stroke="#fff" stroke-width="2" />
</svg>


           Add Users
        </div>
        {/* Form to add course */}

        {/* Table to show courses */}
        <div className="col-span-4 row-span-10 border m-5">
          <table className="w-full">
            <thead>
              <tr>
                <th>ID</th>
                <th>Course</th>
                <th>Modules</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {Courses.map((course) => (
                <tr>
                  <td> {course.id} </td>
                  <td>{course.name}</td>
                  <td>0</td>
                  <td className="p-1 flex justify-around">
                    <button className="p-2 text-firstBlue border border-firstBlue rounded-full font-bold ">
                      Modify Course
                    </button>
                    <button className="p-2 text-red-500 border border-red-500 rounded-full font-bold ">
                      Delete Course
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Table to show courses */}
      {/* </main> */}
      {/* Main View */}
      {/* Footer View */}
      <Copyright />
      {/* Footer View */}
    </div>
  );
}
