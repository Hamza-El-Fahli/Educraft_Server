// Importing necessary components and libraries
"use client";
import ShowData from "@/components/ShowData";
import Modal from "@/components/userModal";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_Server_RetrieveData } from "@/configuration/API";
import { API_Server_Chapters } from "@/configuration/API";
import { IChapter } from "@/types/types";

// Component function
export default function Chapters() {
  // State variables
  const [isOpen, setIsOpen] = useState(false);
  const [Loading, setLoading] = useState<boolean|number>(true);
  const [AddORMod, setAddORMod] = useState(true);

  const [ChapterForm, setChapterForm] = useState<{
    modules: {
      _id: number;
      title: string;
      course_id: string;
      course_name: string;
      order: number;
      description: string;
    }[];
    title: string;
    description: string;
    selectedCourse: string;
    selectedModule: string;
  }>({
    modules: [],
    title: "",
    description: "",
    selectedCourse: "",
    selectedModule: "",
  });
  const [Courses, setCourses] = useState<any>([]);
  const [SelectedRegister, setSelectedRegister] = useState<any>(null);
  const [Chapters, setChapters] = useState<IChapter[]>([]);

  // Function to open modal
  const openModal = () => {
    if (SelectedRegister == -1) {
      setChapterForm({
        ...ChapterForm,
        title: "",
        description: "",
        selectedModule: "",
        selectedCourse: Courses[0]?._id,
      });
    } else if (SelectedRegister != null) {
      const course_id =
        ChapterForm.modules.find(
          (module) => module._id == Chapters[SelectedRegister].module_id
        )?.course_id || "";
      
      const tmp = {
        title: Chapters[SelectedRegister].title,
        description: Chapters[SelectedRegister].description,
        module_id: Chapters[SelectedRegister].module_id,
        course_id,
        _id: Chapters[SelectedRegister]._id,
      };
      setChapterForm({
        ...ChapterForm,
        title: tmp.title,
        description: tmp.description,
        selectedModule: tmp.module_id+'',
        selectedCourse: course_id,
      });
    }
    setIsOpen(true);
  };

  // Function to close modal
  const closeModal = () => {
    setIsOpen(false);
  };

  // Fetching modules and courses from API
  useEffect(() => {
    axios.get(`${API_Server_RetrieveData}/?courses=1&modules=1&chapters=0`).then(
      (res) => {

        setChapterForm({ ...ChapterForm, modules: res.data.modules, selectedCourse: res.data.courses[0]._id });
        setCourses(res.data.courses);


        setLoading(false);
      },
      (rej) => {

        console.log("Data Cannot be retrieved");
      }
    );
  }, []);
 // Fetching modules and courses from API
 useEffect(() => {
  axios.get(`${API_Server_Chapters}`).then(
    (res) => {
      setChapters(res.data);
      setLoading(false);
    },
    (rej) => {
      setLoading(2);
    }
  );
}, []);


  useEffect(() => {
    if (SelectedRegister !== null) {
      openModal();
    }
  }, [SelectedRegister]);

  // Function to add a module
  const AddChapter = (e: any) => {
    e.preventDefault();
    const tmp = {
      // course_id: ChapterForm.selectedCourse,
      module_id: ChapterForm.selectedModule || ChapterForm.modules[0]?._id,
      title: ChapterForm.title,
      description: ChapterForm.description,
    };
    axios.post(`${API_Server_Chapters}`, tmp).then(
      (res: { data: { _id: number; module_name: string } }) => {
        // console.log( res.data)
        setChapters([
          ...Chapters,
          { _id: res.data._id+'', module_name: res.data.module_name, ...tmp },
        ]);
        closeModal();
      },
      (rej) => {
        alert("Rejected");
      }
    );
  };
  // open model and set data
  async function OpenAndSet(index?: number) {
    if (index == undefined) setSelectedRegister(-1);
    else if (index == SelectedRegister) openModal();
    else setSelectedRegister(index);

    // console.log(index)
  }
  // Function to modify a module
  async function modifyModule() {
    await axios
      .put(`${API_Server_Chapters}/${Chapters[SelectedRegister]._id}`, {
        title: ChapterForm.title,
        description: ChapterForm.description,
        module_id: ChapterForm.selectedModule,
      })
      .then(async (res) => {
        Chapters[SelectedRegister].module_name = ChapterForm.modules.filter(
          (module: any) => module._id == ChapterForm.selectedModule
        )[0].title;
        Chapters[SelectedRegister].module_id = ChapterForm.selectedModule;
        Chapters[SelectedRegister].title = ChapterForm.title;
        Chapters[SelectedRegister].description = ChapterForm.description;
        closeModal();
      })
      .catch((error) => {
        alert("Error updating user");
        closeModal();
      });
  }

  // Function to remove a module
  async function removeModule(pointer: any) {
    const tds = Chapters[pointer];
    const id = tds._id;
    const decision = window.confirm(`Are you sure to delete user ${tds.title}`);
    const newState = Chapters.filter((chapter: any) => chapter._id != id);
    if (decision)
      axios.delete(`${API_Server_Chapters}/${id}`).then(
        (res) => {
          setChapters(newState);
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
        <h2 className="text-lg font-bold mb-2 text-blue-800">Add Chapter</h2>
        <p className="mb-4 text-blue-400">Fill the form</p>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col gap-3 w-80 "
        >
          {/* Select dropdown for courses */}
          <select
            id="course"
            className="border h-12 text-primary p-3"
            onChange={(e: any) =>
              setChapterForm({ ...ChapterForm, selectedCourse: e.target.value })
            }
            value={ChapterForm.selectedCourse}
          >
            {Courses.map((course: any, index: number) => {
              return (
                <option key={course._id} value={course._id}>
                  {course.course_name}
                </option>
              );
            })}
          </select>
          {/* Select dropdown for modules */}
          <select
            id="modules"
            value={ChapterForm.selectedModule}
            className="border h-12 text-primary p-3"
            onChange={(e: any) => {
              setChapterForm({
                ...ChapterForm,
                selectedModule: e.target.value,
              });
            }}
          >
            {ChapterForm.modules.map((module: any) => {
              if (
                module.course_id == ChapterForm.selectedCourse ||
                !ChapterForm.selectedCourse
              )
                return (
                  <option key={module._id} value={module._id}>
                    {module.title}
                  </option>
                );
            })}
          </select>
          {/* Input field for title */}
          <input
            required
            className="text-primary h-12 border p-3"
            type="text"
            placeholder="Title"
            value={ChapterForm.title}
            onChange={(e: any) => {
              setChapterForm({ ...ChapterForm, title: e.target.value });
            }}
            name="title"
          />
          {/* Input field for description */}
          <input
            required
            className="text-primary h-12 border p-3"
            type="text"
            placeholder="Description"
            value={ChapterForm.description}
            onChange={(e: any) => {
              setChapterForm({ ...ChapterForm, description: e.target.value });
            }}
            name="description"
          />
          {/* Button to save the form */}
          <button
            className="text-primary h-12 border p-3"
            onClick={(e: any) => {
              AddORMod ? AddChapter(e) : modifyModule();
            }}
          >
            Save
          </button>
        </form>
      </Modal>
      {/* Button to open the modal for adding users */}
      <div
        onClick={(e) => {
          openModal();
          setAddORMod(true);
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
        Add Chapter
      </div>
      {/* Loading spinner or table of modules */}
     { Loading != 2 && <ShowData
        Loading={Loading}
        Data={Chapters.map(({ module_id, _id , module_name , title, description }: any) =>{
          const data =  {_id , module_name , title, description}
 return data}
          )}
        Cols={["ID", "Module name", "Chapter Title", "Description", "Action"]}
        setAddORUpdate={setAddORMod}
        Modify={OpenAndSet}
        Remove={removeModule}
        Subject={"Chapter"}
      /> } 
    </div>
  );
}
