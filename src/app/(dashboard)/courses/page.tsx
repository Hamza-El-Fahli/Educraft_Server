// Importing necessary components and modules

// 
// 
// 
//      Still using DOM Manipulation , not using React State Benefits
// 
// 
// 
// 

"use client";
import ShowData from "@/components/ShowData";
import Modal from "@/components/userModal";
import axios from "axios";
import { useEffect, useState } from "react";
import { ICourse } from "@/types/types";
import { API_Server_Courses } from "@/configuration/API";



export default function Courses() {
  // State variables
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [Loading, setLoading] = useState<boolean|number>(true);
  const [AddORMod, setAddORMod] = useState<boolean>(true);
  const [Courses, setCourses] = useState<ICourse[]>([]);
const [SelectedRegister, setSelectedRegister] = useState<null|number>(null)
const [courseForm, setcourseForm] = useState({
  course_name : '',
  description : '',
  instructor : 0
})
  // Function to open modal
  const openModal = () => {
    if(SelectedRegister != null){

    if(SelectedRegister == -1) setcourseForm({
      course_name : '',
      description : '',
      instructor : 0
    })
    else setcourseForm({
      course_name : Courses[SelectedRegister].course_name,
      description : Courses[SelectedRegister].description,
      instructor : Courses[SelectedRegister].instructor
    })
    
    setIsOpen(true);}
  };

  // Function to close modal
  const closeModal = () => {
    setIsOpen(false);
    setSelectedRegister(null)
  };

  // Effect to fetch courses from the server
  useEffect(() => {
    axios.get(`${API_Server_Courses}`).then(
      (res:{data:ICourse[]}) => {
        setCourses(res.data);
        setLoading(false);
      },
      (rej) => {
        console.log(rej);
        setLoading(2);
      }
    );
  }, []);
useEffect(()=>{
  if(SelectedRegister != null) openModal() 
},[SelectedRegister])
  // Function to add a course
  const AddCourse = () => {
    axios.post(`${API_Server_Courses}`, courseForm).then(
      (res) => {
        setCourses([...Courses, { _id: res.data._id, ...courseForm}]);
        closeModal();
      },
      (rej) => {
        alert("Rejected");
      }
    );
  };

  // Function to modify a course
  async function modifyCourse() {
    if(SelectedRegister == null) return
      axios
        .put(`${API_Server_Courses}/${Courses[SelectedRegister]._id}`, courseForm)
        .then((res) => {
          const newCourses= Courses
          newCourses[SelectedRegister] = {...newCourses[SelectedRegister] , ...courseForm}
          setCourses(newCourses)
          closeModal();
        })
        .catch((error) => {
          alert("Error updating course");
          closeModal();
        });
  
  }

  // Function to remove a course
  async function removeCourse(Exindex: any) {
    const decision = window.confirm(
      `Are you sure to delete course ${Courses[Exindex].course_name}`
    );
    const newState = Courses.filter((course,index) => index != Exindex);
    if (decision)
      axios.delete(`${API_Server_Courses}/${Courses[Exindex]._id}`).then(
        (res) => {
          setCourses(newState);
          alert(res.data.message);
        },
        () => {
          alert("Error");
        }
      );
  }

  return (
    <div className="col-span-4">
      {/* Main View */}
      {/* Form to add course */}
      <Modal isOpen={isOpen} onClose={closeModal}>
        <h2 className="text-lg font-bold mb-2 text-blue-800">Add Course</h2>
        <p className="mb-4 text-blue-400">Fill the form</p>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col gap-3 w-80 "
        >
          <input
            required
            className="text-primary h-12 border p-3"
            type="text"
            placeholder="Coursename"
            name="Coursename"
            value={courseForm.course_name}
            onChange={(e)=>setcourseForm({...courseForm , course_name : e.target.value})}
          />
          <input
            required
            className="text-primary h-12 border p-3"
            type="text"
            placeholder="description"
            name="description"
            value={courseForm.description}
            onChange={(e)=>setcourseForm({...courseForm , description : e.target.value})}
          />
          <input
            required
            className="text-primary h-12 border p-3"
            type="number"
            name="instructor"
            placeholder="instructor"
            min={0}
            value={courseForm.instructor}
            onChange={(e)=>setcourseForm({...courseForm , instructor : parseInt(e.target.value)})}
          />
          
            <button onClick={()=> SelectedRegister == -1 ? AddCourse() : modifyCourse()} id="send" className="text-primary h-12 border p-3">
              Save
            </button>
          
        </form>
      </Modal>
      <div
        onClick={(e) => {
          setSelectedRegister(-1)
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
        Add Course
      </div>
      {/* Table to show courses */}
      {Loading != 2 &&
      <ShowData
      Cols={['ID','Course','Description','Instructor','Action']}
      Subject={'Course'}
      Loading={Loading}
      Data={Courses}
      Modify={setSelectedRegister}
      Remove={removeCourse}
      setAddORUpdate={setAddORMod}
      />
    }
    </div>
  );
}
