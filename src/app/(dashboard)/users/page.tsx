// Importing necessary components and libraries
"use client";

import ShowData from "@/components/ShowData";
import Modal from "@/components/userModal";
import axios from "axios";
import { useEffect, useState } from "react";
import { IUser, IUser_Form } from "@/types/types";
import { API_Server_Users } from "@/configuration/API";
import UsersFormComponent from "@/components/UsersFormComponent";
import { useCurrentUser } from "@/hooks/useCurrentUser";

// Component function
export default function Users() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setloading] = useState<boolean>(true);
  const [AddORMod, setAddORMod] = useState<boolean>(true);
  const [Users, setUsers] = useState<IUser[]>([]);
  const [selectedRegister, setselectedRegister] = useState<number | null>(null);
  const [UserForm, setUserForm] = useState<IUser_Form>({
    name: "",
    filiere: "",
    annee: 0,
    profile: "",
    email: "",
    password: "",
  });

  const JWTUser = useCurrentUser();

  // Function to open modal
  const openModal = (): void => {
    if (selectedRegister == -1) {
      setUserForm({
        name: "",
        filiere: "",
        annee: -1,
        profile: "",
        email: "",
        password: "",
      });
      setIsOpen(true);
    }
    if (selectedRegister != null) {
      setUserForm(Users[selectedRegister]);
      setIsOpen(true);
    }
  };

  // Function to close modal
  const closeModal = (): void => {
    setIsOpen(false);
  };

  // State variable for users
  useEffect(() => {
    // Fetching users from API
    axios.get(`${API_Server_Users}`).then(
      (res: { data: IUser[] }) => {
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
  const AddUser = () => {
    const newUser = UserForm;
    axios
      .put(`${API_Server_Users}`, newUser)
      .then((res: { data: { _id: string } }) => {
        setUsers([...Users, { _id: res.data._id, ...newUser }]);
        closeModal();
      })
      .catch((error) => {
        alert("Rejected");
        console.log(error);
      });
  };

  async function OpenAndSet(index: any) {
    if (index == null) {
      OpenAndSet(-1);
      setAddORMod(true);
      setUserForm({
        name: "",
        filiere: "",
        annee: 0,
        profile: "",
        email: "",
        password: "",
      });
    }
    if (index == undefined) setselectedRegister(-1);
    else if (index == selectedRegister) openModal();
    else setselectedRegister(index);

    // console.log(index)
  }

  // Function to modify a user
  async function modifyUser() {
    if (selectedRegister == null) throw Error("SelectedRgister is null");
    axios
      .put(`${API_Server_Users}/${Users[selectedRegister]._id}`, UserForm)
      .then(() => {
        Users[selectedRegister] = { ...Users[selectedRegister], ...UserForm };
        closeModal();
      })
      .catch(() => {
        alert("Error updating user");
        closeModal();
      });
  }

  // Function to remove a user
  async function removeUser(pointer: any) {
    const currentUser = Users[pointer];
    const id = currentUser._id;
    const decision = window.confirm(
      `Are you sure to delete user ${currentUser.name}`
    );
    const newState = Users.filter((user) => user._id != id);
    if (decision) {
      axios.delete(`${API_Server_Users}/${id}`).then(
        (res) => {
          setUsers(newState);
          alert(res.data.message);
        },
        () => {
          alert("Error");
        }
      );
    }
  }

  // JSX return
  return (
    <div className="col-span-4 h-full">
      {/* Modal for adding or modifying users */}
      <Modal isOpen={isOpen} onClose={closeModal}>
        <h2 className="text-lg font-bold mb-2 text-blue-800">Add User</h2>
        <p className="mb-4 text-blue-400">Fill the form</p>
        <UsersFormComponent
          UserForm={UserForm}
          setUserForm={setUserForm}
          AddORMod={AddORMod}
          AddUser={AddUser}
          modifyUser={modifyUser}
        />
      </Modal>

      <div onClick={(e) => OpenAndSet(null)} className="dashboardCards_add">
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

      <ShowData
        Loading={loading}
        Data={Users}
        Cols={[
          "ID",
          "UserName",
          "Email",
          "Password",
          "Profile",
          "Annee",
          "filiere",
          "Action",
        ]}
        Modify={OpenAndSet}
        Remove={removeUser}
        Subject={"User"}
      />

      {/* Main View */}
      {/* Footer View */}
      {/* Footer View */}
    </div>
  );
}
