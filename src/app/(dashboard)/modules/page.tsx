// Importing necessary components and libraries
//
//
//
//
//        AddorMod is no need anymore
//
//
//
//
//
//

"use client";
import ShowData from "@/components/ShowData";
import Modal from "@/components/userModal";
import axios from "axios";
import { useEffect, useState } from "react";
import { ICourse, IModule_Form } from "@/types/types";
import { IModule } from "@/types/types";
import { API_Server_Courses } from "@/configuration/API";
import { API_Server_Modules } from "@/configuration/API";
import NoData from "@/components/naData";

// Component function
export default function Users() {
  // State variables
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [Loading, setLoading] = useState<boolean | number>(true);
  const [AddORMod, setAddORMod] = useState<boolean>(true);
  const [SelectedRegister, setSelectedRegister] = useState<number | null>(null);
  const [moduleForm, setmoduleForm] = useState<IModule_Form>({
    title: "",
    description: "",
    selectedCourse_id: "",
    selectedCourse_name: "",
  });

  // Function to open modal
  const openModal = (): void => {
    if (SelectedRegister == -1)
      setmoduleForm({
        ...moduleForm,
        title: "",
        description: "",
        selectedCourse_id: Courses[0]._id,
        selectedCourse_name: Courses[0].course_name,
      });
    else if (SelectedRegister != null) {
      const currentModules = _Modules[SelectedRegister];
      setmoduleForm({
        title: currentModules.title,
        description: currentModules.description,
        selectedCourse_id: currentModules.course_id,
        selectedCourse_name: currentModules.course_name,
      });
    }

    setIsOpen(true);
  };

  // Function to close modal
  const closeModal = (): void => {
    setIsOpen(false);
  };

  // State variables for modules and courses
  const [_Modules, setModules] = useState<IModule[]>([]);
  const [Courses, setCourses] = useState<ICourse[]>([]);

  // Fetching modules and courses from API
  useEffect(() => {
    axios.get(`${API_Server_Modules}`).then(
      (res: { data: IModule[] }) => {
        setModules(res.data);
        setLoading(false);
      },
      (rej) => {
        setLoading(2);
        // console.log(rej.response.status);
      }
    );
  }, []);

  useEffect(() => {
    axios.get(`${API_Server_Courses}`).then(
      (res: { data: ICourse[] }) => {
        setCourses(res.data);
        // setLoading(false);
      },
      (rej) => {
        // console.log(rej);
      }
    );
  }, []);

  useEffect(() => {
    if (SelectedRegister !== null) {
      openModal();
    }
  }, [SelectedRegister]);

  async function OpenAndSet(index: number) {
    if (index == undefined) setSelectedRegister(-1);
    else if (index == SelectedRegister) openModal();
    else setSelectedRegister(index);

    // console.log(index)
  }
  // Function to add a module
  const AddModule = () => {
    const tmp: {
      course_id: string;
      course_name: string;
      title: string;
      description: string;
      order: number;
    } = {
      course_id: moduleForm.selectedCourse_id,
      course_name: moduleForm.selectedCourse_name,
      title: moduleForm.title,
      description: moduleForm.description,
      order: _Modules.length,
    };
    axios.post(`${API_Server_Modules}`, tmp).then(
      (res: { data: { _id: string } }) => {
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
  async function modifyModule() {
    if (SelectedRegister == null) throw Error("Selected register is null");
    await axios
      .put(`${API_Server_Modules}/${_Modules[SelectedRegister]._id}`, {
        course_id: moduleForm.selectedCourse_id,
        title: moduleForm.title,
        description: moduleForm.description,
      })
      .then(async () => {
        _Modules[SelectedRegister].course_name = moduleForm.selectedCourse_name;
        _Modules[SelectedRegister].title = moduleForm.title;
        _Modules[SelectedRegister].description = moduleForm.description;
        closeModal();
      })
      .catch(() => {
        alert("Error updating user");
        closeModal();
      });
  }

  // Function to remove a module
  async function removeModule(e: number) {
    const _Module = _Modules[e];
    const id = _Module._id;
    // console.log(_Modules[e])
    const decision: boolean = window.confirm(
      `Are you sure to delete Module ${_Module.title} ?`
    );
    const newState = _Modules.filter((model: any) => model._id != id);
    if (decision)
      axios.delete(`${API_Server_Modules}/${id}`).then(
        (res) => {
          setModules(newState);
          alert(res.data.message);
        },
        () => {
          alert("Error");
        }
      );
  }

  // JSX return
  return (
    <div className="col-span-4 row-span-11 ">
      {/* Modal for adding or modifying users */}
      <Modal isOpen={isOpen} onClose={closeModal}>
        <h2 className="text-lg font-bold mb-2 text-blue-800">Add Module</h2>
        <p className="mb-4 text-blue-400">Fill the form</p>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col gap-3 w-80 "
        >
          {/* Select dropdown for courses */}
          <select
            id="course"
            value={moduleForm.selectedCourse_id}
            onChange={(e) =>
              setmoduleForm({
                ...moduleForm,
                selectedCourse_id: e.target.value,
                selectedCourse_name:
                  Courses.find((course) => course._id === e.target.value)
                    ?.course_name || "",
              })
            }
            className="border h-12 text-primary p-3"
          >
            {Courses.map((course: any) => (
              <option key={course._id} value={course._id}>
                {course.course_name}
              </option>
            ))}
          </select>
          {/* Input field for module_name */}
          <input
            required
            className="text-primary h-12 border p-3"
            type="text"
            placeholder="title"
            name="title"
            value={moduleForm.title}
            onChange={(e) =>
              setmoduleForm({ ...moduleForm, title: e.target.value })
            }
          />
          {/* Input field for description */}
          <input
            required
            className="text-primary h-12 border p-3"
            type="text"
            placeholder="Description"
            name="description"
            value={moduleForm.description}
            onChange={(e) =>
              setmoduleForm({ ...moduleForm, description: e.target.value })
            }
          />
          {/* Button to save the form */}
          <button
            className="text-primary h-12 border p-3"
            onClick={() => {
              SelectedRegister != null && SelectedRegister < 0
                ? AddModule()
                : modifyModule();
            }}
          >
            Save
          </button>
        </form>
      </Modal>
      {/* Button to open the modal for adding users */}
      <div
        onClick={() => {
          OpenAndSet(-1);
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
        Add Module
      </div>
      {/* Loading  table of modules */}
      {Loading == 2 ? <NoData /> :
        <ShowData
          Loading={Loading}
          Data={_Modules.map(
            ({ _id, course_name, title, description }: any) => ({
              _id,
              course_name,
              title,
              description,
            })
          )}
          Cols={["ID", "Course", "title", "Description", "Action"]}
          setAddORUpdate={setAddORMod}
          Modify={OpenAndSet}
          Remove={removeModule}
          Subject={"Module"}
        />
      }
    </div>
  );
}
