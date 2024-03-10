// Importing necessary components and modules
"use client";
import ShowData from "@/components/ShowData";
import Modal from "@/components/userModal";
import axios from "axios";
import { useEffect, useState } from "react";
import { ICourse } from "@/types/types";
import { API_Server_Courses } from "@/configuration/API";



export default function Courses() {
  // State variables
  const [isOpen, setIsOpen] = useState(false);
  const [Loading, setLoading] = useState(true);
  const [AddORMod, setAddORMod] = useState(true);
  const [Courses, setCourses] = useState<ICourse[]>([]);

  // Function to open modal
  const openModal = () => {
    setIsOpen(true);
  };

  // Function to close modal
  const closeModal = () => {
    setIsOpen(false);
  };

  // Effect to fetch courses from the server
  useEffect(() => {
    axios.get(`${API_Server_Courses}`).then(
      (res) => {
        setCourses(res.data);
        setLoading(false);
      },
      (rej) => {
        alert(rej);
      }
    );
  }, []);

  // Function to add a course
  const AddCourse = (e: any) => {
    const frm = document.querySelector("form");
    e.preventDefault();
    const tmp = {
      course_name: frm?.Coursename.value,
      description: frm?.description.value,
      instructor: frm?.instructor.value,
    };
    console.log(tmp);
    axios.post(`${API_Server_Courses}`, tmp).then(
      (res) => {
        setCourses([...Courses, { _id: res.data._id, ...tmp }]);
        closeModal();
      },
      (rej) => {
        alert("Rejected");
      }
    );
  };

  // Function to modify a course
  async function modifyCourse(e: any) {
    // Setting the mode to modify
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
        .put(`${API_Server_Courses}/${tds[0].textContent.trim()}`, {
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

  // Function to remove a course
  async function removeCourse(e: any) {
    const tds = e.target.parentNode.parentNode.children;
    const id = tds[0].textContent;
    const decision = window.confirm(
      `Are you sure to delete course ${tds[1].textContent}`
    );
    const newState = Courses.filter((user) => user._id != id);
    if (decision)
      axios.delete(`${API_Server_Courses}/${id}`).then(
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
    <div className="col-span-4">
      {/* Main View */}
      {/* Form to add course */}
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
            <button id="send" className="text-primary h-12 border p-3">
              Save
            </button>
          )}
        </form>
      </Modal>
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
      {/* Table to show courses */}
      <ShowData
        Cols={['ID','Course','Description','Instructor','Action']}
        Subject={'Course'}
        Loading={Loading}
        Data={Courses}
        Modify={modifyCourse}
        Remove={removeCourse}
      />
    </div>
  );
}
