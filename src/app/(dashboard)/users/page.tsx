// Importing necessary components and libraries
"use client";

import Copyright from "@/components/CopyRight";
import HeaderNav from "@/components/HeaderNav";
import ShowData from "@/components/ShowData";
import SideNav from "@/components/sidenav";
import Modal from "@/components/userModal";
import axios from "axios";
import { useEffect, useState } from "react";
const URL_Server = `http://localhost:3000/api/users`;

// Interface for user object
interface User {
  _id: string;
  name: string;
  filiere: string;
  annee: number;
  profile: string;
  email: string;
  password: string;
}

// Component function
export default function Users() {
  const [isOpen, setIsOpen] = useState(false);
  const [Loading, setLoading] = useState(true);
  var AddTrueORmodifyFalse = true; // temporary fixing a bug
  const [AddORMod, setAddORMod] = useState(true)
  // Function to open modal
  const openModal = () => {
    setIsOpen(true);
  };

  // Function to close modal
  const closeModal = () => {
    setIsOpen(false);
  };

  // State variable for users
  const [Users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    // Fetching users from API
    axios.get(`${URL_Server}`).then(
      (res) => {
        setUsers(res.data);
        setLoading(false);
      },
      (rej) => {
        alert(rej);
      }
    );
  }, []);

  // Function to handle form submission for adding or modifying a user
  const handleSubmit = (e: any) => {
    if (AddTrueORmodifyFalse) return;
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
        setUsers([...Users, { _id: res.data._id, ...tmp }]);
        closeModal();
      },
      (rej) => {
        alert("Rejected");
      }
    );
  };

  // Function to modify a user
  async function modifyUser(pointer: any) {
    AddTrueORmodifyFalse = false;
    const tds : any = await document.getElementById(`tr-${pointer}`)?.querySelectorAll("td");
    await openModal();

    const form: any = document.querySelector("form");
    const inputs = form?.querySelectorAll("input");
    for (let td = 1; td <= inputs.length; td++) {
      inputs[td - 1].value = tds[td].innerText;
      if (inputs[td - 1].type == "password")
        inputs[td - 1].value = Users.filter(
          (user) => user._id == tds[0].textContent.trim()
        )[0].password;
    }
    form.addEventListener("submit", (e: any) => {
      e.preventDefault();
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
    AddTrueORmodifyFalse = true;
  }

  // Function to remove a user
  async function removeUser(e: any) {
    const tds = e.target.parentNode.parentNode.children;
    const id = tds[0].textContent;
    const decision = window.confirm(`Are you sure to delete user ${tds[1].textContent}`);
    const newState = Users.filter((user) => user._id != id);
    if (decision) {
      axios.delete(`${URL_Server}/${id}`).then((res) => {
        setUsers(newState);
        alert(res.data.message);
      }, () => {
        alert('Error');
      });
    }
  }

  // JSX return
  return (
    <div className="dashboardContainer">
      {/* Modal for adding or modifying users */}
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
            type="number"
            name="annee"
            placeholder="Annee"
          />
          <input
            required
            className="text-primary h-12 border p-3"
            type="text"
            placeholder="filiere"
            name="filiere"
          />
          <button type="submit" className="text-primary h-12 border p-3">
            Save
          </button>
        </form>
      </Modal>
      {/* Header navigation */}
      <HeaderNav activeView="users management" />
      {/* Side navigation */}
      <SideNav activeView="users management" />
      {/* Main View */}
      {/* Button to open the modal for adding users */}
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
      {/* Loading spinner or table of users */}

      <ShowData Loading={Loading} Data={Users} Cols={["ID",  "UserName",  "Email",  "Password",  "Profile",  "Annee",  "filiere",  "Action"]} 
            setAddORUpdate={setAddORMod}
            Modify={modifyUser}
            Remove={removeUser}
            Subject={'User'}
            />  
     
      {/* Main View */}
      {/* Footer View */}
      <Copyright />
      {/* Footer View */}
    </div>
  );
}
