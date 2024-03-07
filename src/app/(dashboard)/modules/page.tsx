"use client";

import Copyright from "@/componentes/CopyRight";
import HeaderNav from "@/componentes/HeaderNav";
import SideNav from "@/componentes/sidenav";
import Modal from "@/componentes/userModal";
import axios from "axios";
import { useEffect, useState } from "react";
const URL_Server = `http://localhost:3000/api/modules`;
const URL_Server_courses = `http://localhost:3000/api/courses`;

interface IModule {
  _id: number;
  course_id: string;
  title: string;
  description: number;
}
interface Course {
  _id: number;
  course_name: string;
  description: string;
  instructor: number;
}


export default function Users() {
  const [isOpen, setIsOpen] = useState(false);
  const [Loading, setLoading] = useState(true);
  const [AddORMod, setAddORMod] = useState(true);

  var AddTrueORmodifyFalse = true 
  // temporary fixing a bug
  // when modify the requent send to AddUser first then modify
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  const [_Modules, setModules] = useState<IModule[]>([]);
  useEffect(() => {
    axios.get(`${URL_Server}`).then(
      (res) => {
        setModules(res.data);
        setLoading(false)
      },
      (rej) => {
        alert(rej);
      }
    );
  }, []);
  

  const [Courses, setCourses] = useState<Course[]>([]);
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






  
  const AddModule = (e: any) => {
    const frm:any = document.querySelector('form');
    e.preventDefault();
    const tmp = {
      course_id: frm.querySelector("#course").value,
      title: frm.title.value,
      description: frm.description.value,
      order : _Modules.length
    };
    axios.post(`${URL_Server}`, tmp).then(
      (res) => {
        setModules([..._Modules,{_id : res.data._id, ...tmp}]);

        closeModal();
      },
      (rej) => {
        alert("Rejected");
        console.log(rej);
      }
    );
  };

  async function modifyModule(e: any) {
    const tds =await e.target.parentNode.parentNode.querySelectorAll("td");
    await openModal();

    const form: any = document.querySelector("form");
    if(form){
      form.title.value =  tds[2].textContent;
      form.description.value = tds[3].textContent;

    
    
      const selectElement = document.querySelector("select");
      if (selectElement) {
        selectElement.value = tds[1].textContent;
      }      // tds[td].innerText = '';
      // tds[td].appendChild(input);
    }
    form.addEventListener("submit", (e: any) => {
      e.preventDefault();
      console.log(tds)
      axios.put(`${URL_Server}/${tds[0].textContent.trim()}`, {
        course_id: form.querySelector("#course").value,
        title: form.title.value,
        description: form.description.value,
    }).then((res) => {
        
      tds[1].textContent =  form.querySelector("#course").value  ;
      tds[2].textContent =  form.title.value   ;
      tds[3].textContent =  form.description.value 
      


        closeModal();
    }).catch((error) => {
        alert('Error updating user');
        closeModal();
    });
    
    });
  }

  async function removeModule(e: any) {
    const tds = e.target.parentNode.parentNode.children
    const id = tds[0].textContent;
    const decision = window.confirm(`Are you sure to delete user ${tds[1].textContent}`)
    const newState = _Modules.filter((user) => user._id != id);
    if(decision)
    axios.delete(`${URL_Server}/${id}`).then((res)=>{
      setModules(newState);
      alert(res.data.message)
    },()=>{
      alert('Error')
    })
  }

  return ( <div className="dashboardContainer">
      {/*  */}
      <Modal isOpen={isOpen} onClose={closeModal}>
        <h2 className="text-lg font-bold mb-2 text-blue-800">Add User</h2>
        <p className="mb-4 text-blue-400">Fill the form</p>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col gap-3 w-80 "
        >
        <select id="course" className="border h-12 text-primary p-3">
          {Courses.map((course) => (
            <option key={course._id} value={course._id}>
              {course.course_name}
            </option>
          ))}
        </select>
        <input
          required
          className="text-primary h-12 border p-3"
          type="text"
          placeholder="Title"
          name="title"
        />
        <input
          required
          className="text-primary h-12 border p-3"
          type="text"
          placeholder="Description"
          name="description"
        />
        
          <button         
  className="text-primary h-12 border p-3"
    onClick={(e:any)=>{ ( AddORMod) ? AddModule(e) : modifyModule(e) }}
    >
            Save
          </button>
        </form>
      </Modal>
      {/*  */}
      <HeaderNav activeView="modules management" />
      {/* Side nav */}
      <SideNav activeView="modules management" />
      {/* Side nav */}
      {/* Main View */}
      {/* Form to add course */}
     
      <div onClick={(e) =>{ openModal() ; setAddORMod(true)}} className="dashboardCards_add">
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
      {/* Form to add course */}

      {/* Table to show courses */}
      
         { Loading ? ( <>
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
    <div className=" col-span-4 row-span-10 border m-5 overflow-y-scroll overflow-x-scroll relative">
    <table className="w-full ">
      <thead className="theader">
      <tr className="hidden">
              <th>ID</th>
              <th>Course ID</th>
              <th>Title</th>
              <th>Dascriptio</th>
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
              <th>Course ID</th>
              <th>Title</th>
              <th>Dascriptio</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
               { _Modules.map((user) => (
              <tr>
                <td>{user._id}</td>
                <td>{user.course_id}</td>
                <td>{user.title}</td>
                <td>{user.description}</td>
                <td  className="p-1 flex justify-around items-center" style={{height:'100%'}}>
                  <button
                    onClick={(e) => { setAddORMod(false) ;modifyModule(e)}}
                    className="p-2 text-firstBlue border border-firstBlue rounded-full font-bold "
                  >
                    Modify Course
                  </button>
                  <button
                    onClick={(e) => removeModule(e)}
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
      {/* Table to show courses */}
      {/* Main View */}
      {/* Footer View */}
      <Copyright />
      {/* Footer View */}
    </div>
  )
}
