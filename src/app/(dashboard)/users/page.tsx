"use client";

import Copyright from "@/componentes/CopyRight";
import HeaderNav from "@/componentes/HeaderNav";
import SideNav from "@/componentes/sidenav";
import Modal from "@/componentes/userModal";
import { useState } from "react";
interface User {
  id: number;
  name: string;
  filiere : string;
  annee:number;
  profile:string;
  email : string;
}
 


export default function AddUsers() {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };
  const [Users, setUsers] = useState<User[]>([{id:4,name:'hamza',filiere:'TSSRI',annee:2,profile:'prof' , email:"hamzaelfahli4@gmail.com"}]);
  const handleClick = (e: any) => {
    const frm = e.target
    e.preventDefault();
    const tmp = { id: Users.length, name: frm.userName.value , filiere:frm.filiere.value , annee:frm.annee.value,profile:frm.profile.value,email:frm.email.value};
    setUsers([...Users, tmp]);
    closeModal()
  };

  async function modifyUser(e:any){
    const tds = e.target.parentNode.parentNode.querySelectorAll('td')
   await openModal()
   
    const form:any =document.querySelector('form')
       const inputs = form?.querySelectorAll('input')
    for (let td = 1 ; td<=inputs.length ; td++) {
        inputs[td-1].type = 'text';
        inputs[td-1].value = tds[td].innerText;
    // tds[td].innerText = '';
    // tds[td].appendChild(input);
}
form.addEventListener('submit',(e:any)=>{
    e.preventDefault()
    for (let td = 1 ; td<=inputs.length ; td++) {
        tds[td].innerText = inputs[td-1].value;
    }
    closeModal()
})
}


async function removeUser(e:any){
   const id = (e.target.parentNode.parentNode.firstChild.textContent)
    const newState = Users.filter(user=>user.id != id)
    setUsers(newState)
}



  return (
    <div className="dashboardContainer">

        {/*  */}
        <Modal isOpen={isOpen} onClose={closeModal}>
                <h2 className="text-lg font-bold mb-2 text-blue-800">Add User</h2>
                <p className="mb-4 text-blue-400">Fill the form</p>
                <form onSubmit={(e)=>handleClick(e)} className="flex flex-col gap-3 w-80 ">
                    <input required className="text-primary h-12 border p-3" type="text" placeholder="userName" name="userName" />
                    <input required className="text-primary h-12 border p-3" type="text" placeholder="filiere" name="filiere" />
                    <input required className="text-primary h-12 border p-3" type="number" name="annee" placeholder="Annee" />
                    <input required className="text-primary h-12 border p-3" type="text" name="profile" placeholder="Profile" />
                    <input required className="text-primary h-12 border p-3" type="text" name="email" placeholder="Email" />
                    <button type="submit" className="text-primary h-12 border p-3">Save</button>
                </form>
            </Modal>
            {/*  */}
      <HeaderNav activeView="users management" />
      {/* Side nav */}
      <SideNav activeView="users management" />
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
         <div onClick={(e)=>openModal()} className="dashboardCards_add">
        <svg width="15" height="15" viewBox="0 0 15 15">
    <path d="M7.5 0L7.5 15M0 7.5L15 7.5" fill="none" stroke="#fff" stroke-width="2" />
</svg>


           Add Users
        </div>
        {/* Form to add course */}

        {/* Table to show courses */}
        <div className="col-span-4 row-span-10 border m-5 overflow-y-scroll overflow-x-scroll relative">
          <table className="w-full ">
            <thead className="theader" >
              <tr>
                <th>ID</th>
                <th>UserName</th>
                <th>filiere</th>
                <th>Annee</th>
                <th>Profile</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody >
              {Users.map((user) => (
                <tr>
                  <td> {user.id} </td>
                  <td>{user.name}</td>
                  <td>{user.filiere}</td>
                  <td>{user.annee}</td>
                  <td>{user.profile}</td>
                  <td>{user.email}</td>
                  <td className="p-1 flex justify-around">
                    <button onClick={e=>modifyUser(e)} className="p-2 text-firstBlue border border-firstBlue rounded-full font-bold ">
                      Modify Course
                    </button>
                    <button onClick={e=>removeUser(e)} className="p-2 text-red-500 border border-red-500 rounded-full font-bold ">
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
