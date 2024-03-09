// Importing necessary components and libraries
"use client";

import ShowData from "@/components/ShowData";
import Modal from "@/components/userModal";
import axios from "axios";
import { useEffect, useState } from "react";
import { IUser } from "@/app/types/types";
import { API_Server_Users } from "@/configuration/API";



// Component function
export default function Users() {
  const [isOpen, setIsOpen] = useState(false);
  const [Loading, setLoading] = useState(true);
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
        setLoading(false);
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
      },
      (rej) => {
        alert("Rejected");
      }
    );
  };

  async function OpenAndSet(index?:number){
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
        <form
  onSubmit={(e) => e.preventDefault()}
  className="flex flex-col gap-3 w-80 "
>
  <input
    required
    className="text-primary h-12 border p-3"
    type="text"
    placeholder="userName"
    name="userName"
    value={UserForm?.name}
    onChange={(e) => setUserForm({ ...UserForm, name: e.target.value })}
  />
  <input
    required
    className="text-primary h-12 border p-3"
    type="text"
    name="email"
    placeholder="Email"
    value={UserForm?.email}
    onChange={(e) => setUserForm({ ...UserForm, email: e.target.value })}
  />
  <input
    required
    className="text-primary h-12 border p-3"
    type="password"
    name="password"
    placeholder="password"
    value={UserForm?.password}
    onChange={(e) => setUserForm({ ...UserForm, password: e.target.value })}
  />
  <input
    required
    className="text-primary h-12 border p-3"
    type="text"
    name="profile"
    placeholder="Profile"
    value={UserForm?.profile}
    onChange={(e) => setUserForm({ ...UserForm, profile: e.target.value })}
  />
  <input
    required
    className="text-primary h-12 border p-3"
    type="number"
    name="annee"
    placeholder="Annee"
    value={UserForm?.annee}
    onChange={(e) => setUserForm({ ...UserForm, annee: parseInt(e.target.value) })}
  />
  <input
    required
    className="text-primary h-12 border p-3"
    type="text"
    placeholder="filiere"
    name="filiere"
    value={UserForm?.filiere}
    onChange={(e) => setUserForm({ ...UserForm, filiere: e.target.value })}
  />
  <button 
              onClick={(e: any) => { (AddORMod) ? AddUser(e) : modifyUser() }}

  className="text-primary h-12 border p-3">
    Save
  </button>
</form>

      </Modal>
      {/* Header navigation */}
      {/* Side navigation */}
      {/* Main View */}
      {/* Button to open the modal for adding users */}
      <div onClick={(e) => { OpenAndSet(-1); setAddORMod(true) ; setUserForm( {
      name: '',
      filiere: '',
      annee: 0,
      profile: '',
      email: '',
      password: '',
    })}}
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
      {/* Loading spinner or table of users */}

      <ShowData Loading={Loading} Data={Users} Cols={["ID",  "UserName",  "Email",  "Password",  "Profile",  "Annee",  "filiere",  "Action"]} 
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
