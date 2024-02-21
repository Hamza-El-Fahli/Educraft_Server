"use client";

import { useState } from "react";

interface _Module {
  id: number;
  name: string;
}
export default function AddModule() {
  const [Modules, setCourses] = useState<_Module[]>([]);
  const [inputModule, setinpuCourse] = useState("");
  const handleClick = (e: any) => {
    e.preventDefault();
    const tmp = { id: Modules.length, name: inputModule };
    setCourses([...Modules, tmp]);
    setinpuCourse("");
  };
  const handleChange = (e: any) => {
    setinpuCourse(e.target.value);
  };
  return (
    <div className=" grid grid-cols-12 grid-rows-12 h-screen text-white  gap-2 bg-primary">
      <div className=" h-full w-full bg-secondary col-span-12 grid grid-cols-12 ">
        <div className="col-span-2">User</div>
        <div className="col-span-9">Search</div>
        <div className="overflow-hidden">n</div>
      </div>
      {/* Side nav */}
      <nav className=" h-full w-full  col-span-2 row-span-8 p-3">
        <ul className="w-full p-5 flex flex-col bg-secondary rounded-md">
          <li className=" text-center rounded-md py-1.5 pl-4 text-firstBlue border border-firstBlue flex flex-row items-center gap-5">
            <svg
              width="18"
              height="20"
              viewBox="0 0 18 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 2H11.82C11.4 0.84 10.3 0 9 0C7.7 0 6.6 0.84 6.18 2H2C0.9 2 0 2.9 0 4V18C0 19.1 0.9 20 2 20H16C17.1 20 18 19.1 18 18V4C18 2.9 17.1 2 16 2ZM9 2C9.55 2 10 2.45 10 3C10 3.55 9.55 4 9 4C8.45 4 8 3.55 8 3C8 2.45 8.45 2 9 2ZM11 16H4V14H11V16ZM14 12H4V10H14V12ZM14 8H4V6H14V8Z"
                fill="#2F80ED"
              />
            </svg>
            Add course
          </li>
        </ul>
      </nav>
      {/* Side nav */}
      {/* Main View */}
      <main className=" h-full w-full col-span-10 row-span-11 grid grid-rows-12 gap-3">
        {/* Form to add module */}
        <form className="flex flex-col w-1/2  gap-2  p-5 bg-secondary row-span-4">
          <h1>Add New Module</h1>

          <label htmlFor="">Cours :</label>
          <select>
            <option value="1">CCNA 1</option>
            <option value="2">CCNA 2</option>
            <option value="3">CCNA 3</option>
            <option value="4">CCNA 4</option>
          </select>
          <label htmlFor="">Module name :</label>
          <input
            value={inputModule}
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
        </form>
        {/* Form to add course */}
        {/* Table to show courses */}
        <div className="border p-5 bg-secondary row-span-8 overflow-scroll overflow-x-hidden">
          <table className="w-full">
            <tr>
              <th>ID</th>
              <th>Module</th>
              <th>Chapters</th>
              <th>Actions</th>
            </tr>
            {Modules.map((course) => (
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
          </table>
        </div>
        {/* Table to show courses */}
      </main>
      {/* Main View */}
      {/* Footer View */}
      <footer className=" h-full w-full col-span-2 row-span-3 flex items-end justify-center ml-1">
        <div className="bg-secondary w-full p-1 m-3 text-center rounded-md">
          <div className="uppercase font-bold">Educraft</div>
          <div className="text-gray-500 mt-3">Version : 1.0.0</div>
        </div>
      </footer>
      {/* Footer View */}
    </div>
  );
}
