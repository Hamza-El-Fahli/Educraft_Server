"use client";

import Copyright from "@/componentes/CopyRight";
import HeaderNav from "@/componentes/HeaderNav";
import SideNav from "@/componentes/sidenav";
import Modal from "@/componentes/userModal";
import axios from "axios";
import { useEffect, useState } from "react";
const URL_Server = `http://localhost:3000/api/users`;
interface User {
  _id: string;
  name: string;
  filiere: string;
  annee: number;
  profile: string;
  email: string;
  password: string;
}

export default function Users() {
  const [isOpen, setIsOpen] = useState(false);
  const [Loading, setLoading] = useState(true);
  var AddTrueORmodifyFalse = true 
  // temporary fixing a bug
  // when modify the requent send to AddUser first then modify
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  const [Users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    axios.get(`${URL_Server}`).then(
      (res) => {
        setUsers(res.data);
        setLoading(false)
      },
      (rej) => {
        alert(rej);
      }
    );
  }, []);
  
  
  const handleSubmit = (e: any) => {
    if(AddTrueORmodifyFalse) return
    const frm = e.target;
    e.preventDefault();
    const tmp = {
      name: frm.userName.value,
      filiere: frm.filiere.value,
      annee: frm.annee.value,
      profile: frm.profile.value,
      email: frm.email.value,
      password: frm.password.value,
    };
    axios.put(`${URL_Server}`, tmp).then(
      (res) => {
        setUsers([...Users,{_id : res.data._id, ...tmp}]);

        closeModal();
      },
      (rej) => {
        alert("Rejected");
      }
    );
  };

  async function modifyUser(e: any) {
    AddTrueORmodifyFalse = false
    const tds = e.target.parentNode.parentNode.querySelectorAll("td");
    await openModal();

    const form: any = document.querySelector("form");
    const inputs = form?.querySelectorAll("input");
    for (let td = 1; td <= inputs.length; td++) {
      inputs[td - 1].value = tds[td].innerText;
      if (inputs[td - 1].type == "password")
        inputs[td - 1].value = Users.filter(
          (user) => user._id == tds[0].textContent.trim()
        )[0].password;

      // tds[td].innerText = '';
      // tds[td].appendChild(input);
    }
    form.addEventListener("submit", (e: any) => {
      e.preventDefault();
      console.log(tds)
      axios.put(`${URL_Server}/${tds[0].textContent.trim()}`, {
        name: inputs[0].value,
        filiere: inputs[1].value,
        annee: inputs[2].value,
        profile: inputs[3].value,
        email: inputs[4].value,
        password: inputs[5].value
    }).then((res) => {
        for (let td = 0; td < inputs.length; td++) {
            tds[td + 1].innerText = inputs[td].value;
        }
        closeModal();
    }).catch((error) => {
        alert('Error updating user');
        closeModal();
    });
    
    });
    AddTrueORmodifyFalse = true
  }

  async function removeUser(e: any) {
    const tds = e.target.parentNode.parentNode.children
    const id = tds[0].textContent;
    const decision = window.confirm(`Are you sure to delete user ${tds[1].textContent}`)
    const newState = Users.filter((user) => user._id != id);
    if(decision)
    axios.delete(`${URL_Server}/${id}`).then((res)=>{
      setUsers(newState);
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
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-col gap-3 w-80 "
        >
          <input
            required
            className="text-primary h-12 border p-3"
            type="text"
            placeholder="userName"
            name="userName"
          />
          <input
            required
            className="text-primary h-12 border p-3"
            type="text"
            placeholder="filiere"
            name="filiere"
          />
          <input
            required
            className="text-primary h-12 border p-3"
            type="number"
            name="annee"
            placeholder="Annee"
          />
          <input
            required
            className="text-primary h-12 border p-3"
            type="text"
            name="profile"
            placeholder="Profile"
          />
          <input
            required
            className="text-primary h-12 border p-3"
            type="text"
            name="email"
            placeholder="Email"
          />
          <input
            required
            className="text-primary h-12 border p-3"
            type="password"
            name="password"
            placeholder="password"
          />
          <button         
 type="submit" className="text-primary h-12 border p-3">
            Save
          </button>
        </form>
      </Modal>
      {/*  */}
      <HeaderNav activeView="users management" />
      {/* Side nav */}
      <SideNav activeView="users management" />
      {/* Side nav */}
      {/* Main View */}
      {/* Form to add course */}
     
      <div onClick={(e) => openModal()} className="dashboardCards_add">
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
    <div className="col-span-4 row-span-10 border m-5 overflow-y-scroll overflow-x-scroll relative">
    <table className="w-full ">
      <thead className="theader">
        <tr>
          <th>ID</th>
          <th>UserName</th>
          <th>filiere</th>
          <th>Annee</th>
          <th>Profile</th>
          <th>Email</th>
          <th>Password</th>
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
              <th>UserName</th>
              <th>filiere</th>
              <th>Annee</th>
              <th>Profile</th>
              <th>Email</th>
              <th>Password</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
               { Users.map((user) => (
              <tr>
                <td>{user._id.slice(-5)}</td>
                <td>{user.name}</td>
                <td>{user.filiere}</td>
                <td>{user.annee}</td>
                <td>{user.profile}</td>
                <td>{user.email}</td>
                <td>*****</td>
                <td className="p-1 flex justify-around">
                  <button
                    onClick={(e) => modifyUser(e)}
                    className="p-2 text-firstBlue border border-firstBlue rounded-full font-bold "
                  >
                    Modify Course
                  </button>
                  <button
                    onClick={(e) => removeUser(e)}
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
