"use client";

import Copyright from "@/componentes/CopyRight";
import HeaderNav from "@/componentes/HeaderNav";
import SideNav from "@/componentes/sidenav";
import Modal from "@/componentes/userModal";
import axios from "axios";
import { useEffect, useState } from "react";
const URL_Server = `http://localhost:3000/api/courses`;
interface Course {
  _id: number;
  course_name: string;
  description: string;
  instructor: number;
}

export default function Courses() {
  const [isOpen, setIsOpen] = useState(false);
  const [Loading, setLoading] = useState(true);
  const [AddORMod, setAddORMod] = useState(true);
  // temporary fixing a bug
  // when modify the requent send to AddUser first then modify
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  const [Courses, setCourses] = useState<Course[]>([]);
  useEffect(() => {
    axios.get(`${URL_Server}`).then(
      (res) => {
        setCourses(res.data);
        setLoading(false);
      },
      (rej) => {
        alert(rej);
      }
    );
  }, []);

  const AddCourse = (e: any) => {
    const frm = document.querySelector("form");
    e.preventDefault();
    const tmp = {
      course_name: frm?.Coursename.value,
      description: frm?.description.value,
      instructor: frm?.instructor.value,
    };
    console.log(tmp);
    axios.post(`${URL_Server}`, tmp).then(
      (res) => {
        setCourses([...Courses, { _id: res.data._id, ...tmp }]);

        closeModal();
      },
      (rej) => {
        alert("Rejected");
      }
    );
  };

  async function modifyCourse(e: any) {
    setAddORMod(false);

    await openModal();
    const form: any = document.querySelector("form");
    const tds = e.target.parentNode.parentNode.querySelectorAll("td");
    const inputs = form?.querySelectorAll("input");
    for (let td = 1; td <= inputs.length; td++) {
      inputs[td - 1].value = tds[td].innerText;
    }

    document.querySelector("#send")?.addEventListener("click", () => {
      console.log(tds[0].textContent.trim());
      e.preventDefault();
      axios
        .put(`${URL_Server}/${tds[0].textContent.trim()}`, {
          course_name: inputs[0].value,
          description: inputs[1].value,
          instructor: inputs[2].value,
        })
        .then((res) => {
          for (let td = 0; td < inputs.length; td++) {
            tds[td + 1].innerText = inputs[td].value;
          }
          closeModal();
        })
        .catch((error) => {
          alert("Error updating course");
          closeModal();
        });
    });
  }

  async function removeCourse(e: any) {
    const tds = e.target.parentNode.parentNode.children;
    const id = tds[0].textContent;
    const decision = window.confirm(
      `Are you sure to delete course ${tds[1].textContent}`
    );
    const newState = Courses.filter((user) => user._id != id);
    if (decision)
      axios.delete(`${URL_Server}/${id}`).then(
        (res) => {
          setCourses(newState);
          alert(res.data.message);
        },
        () => {
          alert("Error");
        }
      );
  }

  return (
    <div className="dashboardContainer">
      {/*  */}
      <Modal isOpen={isOpen} onClose={closeModal}>
        <h2 className="text-lg font-bold mb-2 text-blue-800">Add User</h2>
        <p className="mb-4 text-blue-400">Fill the form</p>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col gap-3 w-80 "
        >
          <input
            required
            className="text-primary h-12 border p-3"
            type="text"
            placeholder="Coursename"
            name="Coursename"
          />
          <input
            required
            className="text-primary h-12 border p-3"
            type="text"
            placeholder="description"
            name="description"
          />
          <input
            required
            className="text-primary h-12 border p-3"
            type="text"
            name="instructor"
            placeholder="instructor"
          />

          {AddORMod ? (
            <button
              onClick={(e) => {
                AddCourse(e);
              }}
              className="text-primary h-12 border p-3"
            >
              Save
            </button>
          ) : (
            <button
              id="send"
              className="text-primary h-12 border p-3"
            >
              Save
            </button>
          )}
        </form>
      </Modal>
      {/*  */}
      <HeaderNav activeView="courses management" />
      {/* Side nav */}
      <SideNav activeView="courses management" />
      {/* Side nav */}
      {/* Main View */}
      {/* Form to add course */}

      <div
        onClick={(e) => {
          setAddORMod(true);
          openModal();
        }}
        className="dashboardCards_add"
      >
        <svg width="15" height="15" viewBox="0 0 15 15">
          <path
            d="M7.5 0L7.5 15M0 7.5L15 7.5"
            fill="none"
            stroke="#fff"
            strokeWidth="2"
          />
        </svg>
        Add Course
      </div>
      {/* Form to add course */}

      {/* Table to show courses */}
        <DisplayTable Loading={Loading} Courses={Courses} modifyCourse={modifyCourse} removeCourse={removeCourse} />
      
      {/* Table to show courses */}
      {/* Main View */}
      {/* Footer View */}
      <Copyright />
      {/* Footer View */}
    </div>
  );
}










function DisplayTable({Loading,Courses,modifyCourse,removeCourse}:{Loading : boolean,Courses:any,modifyCourse:any,removeCourse:any}){
  return Loading ? (
  <>
    <div id="loading">
      <div id="load">
        <div>G</div>
        <div>N</div>
        <div>I</div>
        <div>D</div>
        <div>A</div>
        <div>O</div>
        <div>L</div>
      </div>
    </div>
    <div className="col-span-4 row-span-10 m-5 overflow-y-scroll overflow-x-scroll relative">
      <table className="w-full ">
        <thead className="theader">
          <tr>
            <th>ID</th>
            <th>Course Name</th>
            <th>Description</th>
            <th>Instructor ID</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr className="hidden">
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  </>
) : (
  <div className="col-span-4 row-span-10 border m-5 overflow-y-scroll overflow-x-scroll relative">
    <table className="w-full ">
      <thead className="theader">
        <tr>
          <th>ID</th>
          <th>Course Name</th>
          <th>Description</th>
          <th>Instructor ID</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {Courses.map((user:any) => (
          <tr>
            <td>{user._id}</td>
            <td>{user.course_name}</td>
            <td>{user.description}</td>
            <td>{user.instructor}</td>
            <td className="p-1 flex justify-around">
              <button
                onClick={(e) => {
                  modifyCourse(e);
                }}
                className="p-2 text-firstBlue border border-firstBlue rounded-full font-bold "
              >
                Modify Course
              </button>
              <button
                onClick={(e) => removeCourse(e)}
                className="p-2 text-red-500 border border-red-500 rounded-full font-bold "
              >
                Delete Course
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}
