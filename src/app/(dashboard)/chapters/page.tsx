// Importing necessary components and libraries
"use client";
import ShowData from "@/components/ShowData";
import Modal from "@/components/userModal";
import axios from "axios";
import { useEffect, useState } from "react";
import {  ICourse_IModule } from "@/app/types/types";
import { IModule } from "@/app/types/types";
import { API_Server_Courses, API_Server_Modules } from "@/configuration/API";
import {  API_Server_Chapters } from "@/configuration/API";


// Component function
export default function Chapters() {
  // State variables
  const [isOpen, setIsOpen] = useState(false);
  const [Loading, setLoading] = useState(true);
  const [AddORMod, setAddORMod] = useState(true);


const [ChapterForm, setChapterForm] = useState(
  {
    courses:[],
    modules:[],
    title:'',
    description:'',
    selectedCourse:'',
    selectedModule:''
  }
)




  // Function to open modal
  const openModal = () => {
    setIsOpen(true);
  };
  
  // Function to close modal
  const closeModal = () => {
    setIsOpen(false);
  };
  
  // State variables for modules and courses
  const [Chapters, setChapters] = useState<any>([]);

  // Fetching modules and courses from API
  useEffect(() => {
    axios.get(`${API_Server_Chapters}`).then(
      (res) => {
        setChapters(res.data);
        setLoading(false);
        console.log(res.data)
      },
      (rej) => {
        alert(rej);
      }
    );
  }, []);

  useEffect(() => {
    axios.get(`${API_Server_Courses}`).then(
      (res) => {
        setChapterForm({...ChapterForm,courses:res.data,selectedCourse:res.data[0]._id})
        console.log(res.data)

      },
      (rej) => {
        alert(rej);
      }
      );
    }, []);
    

       useEffect(()=>{
             axios.get(`${API_Server_Modules}`).then(
              (res) => {
                setChapterForm({...ChapterForm,modules:res.data})
                setLoading(false);
              },
              (rej) => {
                alert(rej);
              }
            );
    
       },[])
    // 
  // Function to add a module
  const AddChapter = (e: any) => {
    e.preventDefault();
    const tmp = {
      // course_id: ChapterForm.selectedCourse,
      module_id: ChapterForm.selectedModule,
      title: ChapterForm.title,
      description: ChapterForm.description,
    };
    axios.post(`${API_Server_Chapters}`, tmp).then(
      (res) => {
        setChapters([...Chapters, { _id: res.data._id, ...tmp }]);
        closeModal();
      },
      (rej) => {
        alert("Rejected");
        console.log(rej);
      }
    );
  };

  // Function to modify a module
  async function modifyModule(pointer :any) {
    let course_id = '';
     ChapterForm.modules.forEach((module:any) => {
      if(module._id == Chapters[pointer].module_id ) course_id = module.course_id._id
     });
    const tmp = {
      title : Chapters[pointer].title,
      description : Chapters[pointer].description,
      module_id : Chapters[pointer].module_id,
      course_id,
      _id: Chapters[pointer]._id
    
    }
    setChapterForm({...ChapterForm,title:tmp.title,description:tmp.description,selectedModule:tmp.module_id , selectedCourse:course_id})
    console.log(tmp)
    openModal()
return
    form.addEventListener("submit",async (e: any) => {
      e.preventDefault();
      await axios.put(`${API_Server_Chapters}/${Chapters[pointer]._id}`,  {
      module_id: ChapterForm.selectedModule,
      title: ChapterForm.title,
      description: ChapterForm.description,
    }).then(async (res) => {
        console.log(res)
        tds[1].textContent = Chapters[pointer].course_name;
        tds[2].textContent = ChapterForm.title;
        tds[3].textContent = ChapterForm.description;
        closeModal();
      }).catch((error) => {
        alert('Error updating user');
        closeModal();
      });
    });
  }

  // Function to remove a module
  async function removeModule(pointer: any) {
    const tds = Chapters[pointer]
    const id = tds._id;
    const decision = window.confirm(`Are you sure to delete user ${tds.title}`)
    const newState = Chapters.filter((chapter:any) => chapter._id != id);
    if (decision)
      axios.delete(`${API_Server_Chapters}/${id}`).then((res) => {
        setChapters(newState);
        alert(res.data.message)
      }, () => {
        alert('Error')
      })
  }

  // JSX return
  return (
    <div className="col-span-4 row-span-11 ">
      {/* Modal for adding or modifying users */}
      <Modal isOpen={isOpen} onClose={closeModal}>
        <h2 className="text-lg font-bold mb-2 text-blue-800">Add User</h2>
        <p className="mb-4 text-blue-400">Fill the form</p>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col gap-3 w-80 "
        >
        {/* Select dropdown for courses */}
        <select id="course" className="border h-12 text-primary p-3" onChange={(e:any)=>setChapterForm({...ChapterForm,selectedCourse : e.target.value})}
        // value={ChapterForm.selectedCourse}
       >
          {ChapterForm.courses.map((course : any,index:number) => {
            return (
            <option key={course._id} value={course._id} >
              {course.course_name+ '     sfgd'}
            </option>
          )})}
        </select>
          {/* Select dropdown for modules */}
          <select id="modules" value={ChapterForm.selectedModule} className="border h-12 text-primary p-3" onChange={(e:any)=>{setChapterForm({...ChapterForm,selectedModule : e.target.value}); console.log(e.target.value)}}>
            {ChapterForm.modules.map((module : any) => {
              if(module.course_id._id == ChapterForm.selectedCourse)
              return (
              <option key={module._id} value={module._id}>
                {module.title}
              </option>
            )})}
          </select>
          {/* Input field for title */}
          <input
            required
            className="text-primary h-12 border p-3"
            type="text"
            placeholder="Title"
            value={ChapterForm.title}
            onChange={(e:any)=>{setChapterForm({...ChapterForm, title:e.target.value})}}
            name="title"
          />
          {/* Input field for description */}
          <input
            required
            className="text-primary h-12 border p-3"
            type="text"
            placeholder="Description"
            value={ChapterForm.description}
            onChange={(e:any)=>{setChapterForm({...ChapterForm,description : e.target.value})}}
            name="description"
          />
          {/* Button to save the form */}
          <button
            className="text-primary h-12 border p-3"
            onClick={(e: any) => { (AddORMod) ? AddChapter(e) : modifyModule() }}
          >
            Save
          </button>
        </form>
      </Modal>
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
        Add Chapter
      </div>
      {/* Loading spinner or table of modules */}
      <ShowData Loading={Loading} Data={Chapters} Cols={['ID','Chapter','Title','Description','Action']} 
            setAddORUpdate={setAddORMod}
            Modify={modifyModule}
            Remove={removeModule}
            Subject={'Module'}
            />  
    </div>
  )
}
