// Importing necessary components and libraries
"use client";

import ShowData from "@/components/ShowData";
import Modal from "@/components/userModal";
import axios from "axios";
import { useEffect, useState } from "react";
import { IUser } from "@/app/types/types";
import { API_Server_Users } from "@/configuration/API";
import UsersFormComponent from "@/components/UsersFormComponent";



// Component function
export default function Users() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setloading] = useState(true);
  const [AddORMod, setAddORMod] = useState(true)
  const [Users, setUsers] = useState<IUser[]>([]);
const [selectedRegister, setselectedRegister] = useState<any>(null)
const [UserForm, setUserForm] = useState( {
  name: '',
  filiere: '',
  annee: 0,
  profile: '',
  email: '',
  password: '',
})


  // Function to open modal
  const openModal = () => {
    if(selectedRegister == -1) {setUserForm( {
      name: '',
      filiere: '',
      annee: -1,
      profile: '',
      email: '',
      password: '',
    })
  setIsOpen(true)
  }
    if(selectedRegister != null){
    setUserForm(Users[selectedRegister])
    setIsOpen(true);}
  };

  // Function to close modal
  const closeModal = () => {
    setIsOpen(false);
  };

  // State variable for users
  useEffect(() => {
    // Fetching users from API
    axios.get(`${API_Server_Users}`).then(
      (res) => {
        setUsers(res.data);
        setloading(false);
      },
      (rej) => {
        alert(rej);
      }
    );
  }, []);

  useEffect(() => {
    if (selectedRegister !== null) {
      openModal();
    }
  }, [selectedRegister]);

  // Function to handle form submission for adding or modifying a user
  const AddUser = (e: any) => {
    
    e.preventDefault();
    const tmp = UserForm
    axios.put(`${API_Server_Users}`, tmp).then(
      (res) => {
        setUsers([...Users, { _id: res.data._id, ...tmp }]);
        closeModal();
      }
    ).catch((error)=>{
        alert("Rejected");
        console.log(error)
    })
  };

  async function OpenAndSet(index:any){
    if(index == null) {
       OpenAndSet(-1); setAddORMod(true) ; setUserForm( {name: '',filiere: '',annee: 0,profile: '', email: '', password: ''})
    }
    if( index == undefined)    setselectedRegister(-1)
    else  if(index == selectedRegister) openModal()
  else   setselectedRegister(index)
  
  console.log(index)
  }

  // Function to modify a user
  async function modifyUser(pointer?: any) {
   
      axios.put(`${API_Server_Users}/${Users[selectedRegister]._id}`, UserForm)
      .then((res) => {
        Users[selectedRegister] = {...Users[selectedRegister],...UserForm}
        closeModal()})
      .catch((error) => {
        alert('Error updating user');
        closeModal(); })
    
  }

  // Function to remove a user
  async function removeUser(pointer: any) {
    const tds = Users[pointer];
    const id = tds._id;
    const decision = window.confirm(`Are you sure to delete user ${tds.name}`);
    const newState = Users.filter((user) => user._id != id);
    if (decision) {
      axios.delete(`${API_Server_Users}/${id}`).then((res) => {
        setUsers(newState);
        alert(res.data.message);
      }, () => {
        alert('Error');
      });
    }
  }

  // JSX return
  return (
    <div className="col-span-4 h-full">
      {/* Modal for adding or modifying users */} 
      <Modal isOpen={isOpen} onClose={closeModal}>
        <h2 className="text-lg font-bold mb-2 text-blue-800">Add User</h2>
        <p className="mb-4 text-blue-400">Fill the form</p>
       <UsersFormComponent UserForm={UserForm}setUserForm={setUserForm}AddORMod={AddORMod}AddUser={AddUser}modifyUser={modifyUser} />
      </Modal>

      <div onClick={(e) => OpenAndSet(null)}
     className="dashboardCards_add">
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
      {/* loading spinner or table of users */}

      <ShowData loading={loading} Data={Users} Cols={["ID",  "UserName",  "Email",  "Password",  "Profile",  "Annee",  "filiere",  "Action"]} 
            setAddORUpdate={setAddORMod}
            Modify={OpenAndSet}
            Remove={removeUser}
            Subject={'User'}
            />  
     
      {/* Main View */}
      {/* Footer View */}
      {/* Footer View */}
    </div>
  );
}
