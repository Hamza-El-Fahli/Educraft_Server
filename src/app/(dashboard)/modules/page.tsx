// Importing necessary components and libraries
"use client";

import Copyright from "@/components/CopyRight";
import HeaderNav from "@/components/HeaderNav";
import ShowData from "@/components/ShowData";
import SideNav from "@/components/sidenav";
import Modal from "@/components/userModal";
import axios from "axios";
import { useEffect, useState } from "react";

// API URLs
const URL_Server = `http://localhost:3000/api/modules`;
const URL_Server_courses = `http://localhost:3000/api/courses`;

// Interface for module object
interface IModule {
  _id: number;
  course_id: string;
  title: string;
  description: number;
}

// Interface for course object
interface Course {
  _id: number;
  course_name: {
    _id : string;
    course_name : string;
  };
  description: string;
  instructor: number;
}

// Component function
export default function Users() {
  // State variables
  const [isOpen, setIsOpen] = useState(false);
  const [Loading, setLoading] = useState(true);
  const [AddORMod, setAddORMod] = useState(true);

  // Temporary fixing a bug
  var AddTrueORmodifyFalse = true;

  // Function to open modal
  const openModal = () => {
    setIsOpen(true);
  };

  // Function to close modal
  const closeModal = () => {
    setIsOpen(false);
  };

  // State variables for modules and courses
  const [_Modules, setModules] = useState<IModule[]>([]);
  const [Courses, setCourses] = useState<Course[]>([]);

  // Fetching modules and courses from API
  useEffect(() => {
    axios.get(`${URL_Server}`).then(
      (res) => {
        setModules(res.data);
        setLoading(false);
      },
      (rej) => {
        alert(rej);
      }
    );
  }, []);

  useEffect(() => {
    axios.get(`${URL_Server_courses}`).then(
      (res) => {
        setCourses(res.data);
        setLoading(false);
      },
      (rej) => {
        alert(rej);
      }
    );
  }, []);

  // Function to add a module
  const AddModule = (e: any) => {
    const frm: any = document.querySelector('form');
    e.preventDefault();
    const tmp = {
      course_id: frm.querySelector("#course").value,
      title: frm.title.value,
      description: frm.description.value,
      order: _Modules.length
    };
    axios.post(`${URL_Server}`, tmp).then(
      (res) => {
        setModules([..._Modules, { _id: res.data._id, ...tmp }]);
        closeModal();
      },
      (rej) => {
        alert("Rejected");
        console.log(rej);
      }
    );
  };

  // Function to modify a module
  async function modifyModule(pointer ?:string) {
    const tds : any = await document.getElementById(`tr-${pointer}`)?.querySelectorAll("td");
    if(!tds) return
    await openModal();
    const form: any = document.querySelector("form");
    if (form) {
      form.title.value = tds[2].textContent;
      form.description.value =tds[3].textContent ;

      const selectElement : any = document.querySelector("select");
      if (selectElement) {
        selectElement.value =( Courses.find(course=>course.course_name = tds[1].textContent)?._id || 0);
      } 
    }
    form.addEventListener("submit",async (e: any) => {
      e.preventDefault();
      await axios.put(`${URL_Server}/${tds[0].textContent.trim()}`, {
        course_id: form.querySelector("#course").value,
        title: form.title.value,
        description: form.description.value,
      }).then(async (res) => {
        console.log(res)
        tds[1].textContent =await Courses.find(course=>course._id == form.querySelector("#course").value)?.course_name;
        tds[2].textContent =await form.title.value;
        tds[3].textContent = await form.description.value;
        closeModal();
      }).catch((error) => {
        alert('Error updating user');
        closeModal();
      });
    });
  }

  // Function to remove a module
  async function removeModule(e: any) {
    const tds = e.target.parentNode.parentNode.children
    const id = tds[0].textContent;
    const decision = window.confirm(`Are you sure to delete user ${tds[1].textContent}`)
    const newState = _Modules.filter((model) => model._id != id);
    if (decision)
      axios.delete(`${URL_Server}/${id}`).then((res) => {
        setModules(newState);
        alert(res.data.message)
      }, () => {
        alert('Error')
      })
  }

  // JSX return
  return (
    <div className="dashboardContainer">
      {/* Modal for adding or modifying users */}
      <Modal isOpen={isOpen} onClose={closeModal}>
        <h2 className="text-lg font-bold mb-2 text-blue-800">Add User</h2>
        <p className="mb-4 text-blue-400">Fill the form</p>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col gap-3 w-80 "
        >
          {/* Select dropdown for courses */}
          <select id="course" className="border h-12 text-primary p-3">
            {Courses.map((course : any) => (
              <option key={course._id} value={course._id}>
                {course.course_name}
              </option>
            ))}
          </select>
          {/* Input field for title */}
          <input
            required
            className="text-primary h-12 border p-3"
            type="text"
            placeholder="Title"
            name="title"
          />
          {/* Input field for description */}
          <input
            required
            className="text-primary h-12 border p-3"
            type="text"
            placeholder="Description"
            name="description"
          />
          {/* Button to save the form */}
          <button
            className="text-primary h-12 border p-3"
            onClick={(e: any) => { (AddORMod) ? AddModule(e) : modifyModule() }}
          >
            Save
          </button>
        </form>
      </Modal>
      {/* Header navigation */}
      <HeaderNav activeView="modules management" />
      {/* Side navigation */}
      <SideNav activeView="modules management" />
      {/* Button to open the modal for adding users */}
      <div onClick={(e) => { openModal(); setAddORMod(true) }} className="dashboardCards_add">
        <svg width="15" height="15" viewBox="0 0 15 15">
          <path
            d="M7.5 0L7.5 15M0 7.5L15 7.5"
            fill="none"
            stroke="#fff"
            strokeWidth="2"
          />
        </svg>
        Add Users
      </div>
      {/* Loading spinner or table of modules */}
      <ShowData Loading={Loading} Data={_Modules} Cols={['ID','Course','Title','Description','Action']} 
            setAddORUpdate={setAddORMod}
            Modify={modifyModule}
            Remove={removeModule}
            Subject={'Module'}
            />  
      {/* Footer */}
      <Copyright />
    </div>
  )
}
