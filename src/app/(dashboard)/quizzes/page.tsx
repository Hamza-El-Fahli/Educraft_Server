"use client";

import { useEffect, useState } from "react";
import ShowQuizes from "@/components/ShowQuizzes";
import { Filters } from "@/components/filterShowQuizzes";
import Modal from "@/components/userModal";
import axios from "axios";
import { IChapter, ICourse, IModule, IQuizz } from "@/types/types";
import { API_Server_Quizzes } from "@/configuration/API";
export default function QuizesScreen() {
  const [isOpen, setisOpen] = useState(false);
  const [SelectedRegister, setSelectedRegister] = useState<any>(null);
  const [quizForm, setquizForm] = useState({
    seletedCourse: "1",
    selectedModule: "1",
    selectedChapter: "1",
    question: "",
    quizNumber: "1",
    correctAnswer: "",
    answers: [""],
  });


const [Courses, setCourses] = useState<ICourse[]>([])
const [Modules, setModules] = useState<IModule[]>([])
const [Chapters, setChapters] = useState<IChapter[]>([])
const [Quizzes, setQuizzes] = useState<IQuizz[]>([])
const [SearchedQuiz, setSearchedQuiz] = useState<number>(0)

const [dataFilters, setdataFilters] = useState({
  selectedCourse : '-1',
  selectedModule : '-1',
  selectedChapter : '-1',
})



useEffect(()=>{
  axios.get('http://localhost:3000/api/courses')
  .then((res)=>{
    console.log(res.data)
    setCourses(res.data)
  })
  .catch((error)=>{
    console.error(error)
  })
},[])




useEffect(()=>{
  axios.get('http://localhost:3000/api/modules')
  .then((res)=>{
    setModules(res.data)
  })
  .catch((error)=>{
    console.error(error)
  })
},[])




useEffect(()=>{
  axios.get('http://localhost:3000/api/chapters')
  .then((res)=>{
    setChapters(res.data)
  })
  .catch((error)=>{
    console.error(error)
  })
},[])

useEffect(()=>{
  axios.get('http://localhost:3000/api/quizes')
  .then((res)=>{
    setQuizzes(res.data)
  })
  .catch((error:any)=>{
    console.log(error)
  })
},[])



  function AddAnswer() {
    setquizForm({ ...quizForm, answers: [...quizForm.answers, ""] });
  }
  function RemoveAnswer() {
    if (quizForm.answers.length > 1)
      setquizForm({
        ...quizForm,
        answers: quizForm.answers.slice(0, quizForm.answers.length - 1),
      });
  }
  function setanswer(index: number, value: string) {
    const newAnswers = [...quizForm.answers];
    newAnswers[index] = value;

    setquizForm({ ...quizForm, answers: newAnswers });
  }

  function openModal() {
    if(SelectedRegister == -1){
          setisOpen(true);
          setquizForm({ seletedCourse: Quizzes[0].course_id, selectedModule: Quizzes[0].module_id, selectedChapter: Quizzes[0].chapter_id, quizNumber: Quizzes.length+'', question: "", correctAnswer: "", answers: [""] });
        }
    else{
      setquizForm({
        seletedCourse: Quizzes[SelectedRegister].course_id,
        selectedModule: Quizzes[SelectedRegister].module_id,
        selectedChapter: Quizzes[SelectedRegister].chapter_id,
        question: Quizzes[SelectedRegister].question,
        quizNumber: SelectedRegister,
        correctAnswer: Quizzes[SelectedRegister].correct_answer,
        answers: Quizzes[SelectedRegister].answers,
        });
      setisOpen(true);
 
    }
  }

  function closeModal() {
    setSelectedRegister(null)
    setisOpen(false);
  }

  useEffect(() => {
    if(SelectedRegister != null) openModal();
  }, [SelectedRegister]);


function AddQuiz(){
  axios.post(`${API_Server_Quizzes}`,{ chapter_id: quizForm.selectedChapter, question: quizForm.question, correct_answer: quizForm.correctAnswer, answers: quizForm.answers })
  .then((res)=>{
      console.log(res)
  })
  .catch((err)=>{
    console.log(err)
  })
}

function modifyQuiz() {
  axios.put(`${API_Server_Quizzes}/${Quizzes[SelectedRegister]._id}`,{
     question:quizForm.question
      , chapter_id : quizForm.selectedChapter
      , correct_answer : quizForm.correctAnswer
      , answers : quizForm.answers
     })
     .then((res:{data:{data:IQuizz}})=>{
      const data = res.data.data
        const newQuizz = [...Quizzes]
        if(res.data.data.hasOwnProperty('chapter_id')){
          newQuizz[SelectedRegister] = {
            _id: data._id,
            question: quizForm.question,
            answers: quizForm.answers,
            correct_answer: quizForm.correctAnswer,
            chapter_id: data.chapter_id,
            chapter_name: data.chapter_name,
            module_id: data.module_id,
            module_name: data.module_name,
            course_id: data.course_id,
            course_name: data.course_name,
          }
        }else{
          newQuizz[SelectedRegister] = {
            ...newQuizz[SelectedRegister],
            question: quizForm.question,
            answers: quizForm.answers,
            correct_answer: quizForm.correctAnswer
          }
        }
        setQuizzes(newQuizz)
        closeModal()
    })
     .catch((err)=>console.log('error ',err))
}


function removeQuiz(index:number){

  const decision = window.confirm(
    `Are you sure to delete Quiz N ${index+1}}`
  );
if(decision){
  axios.delete(`${API_Server_Quizzes}/${Quizzes[index]._id}`)
  .then((res)=>{
     const newQuiz = Quizzes.filter((quiz,index2) => index2 != index);
     setQuizzes(newQuiz)
     alert(res.data.message)

  })
  .catch(()=>{})
}


}

  return (
    <div className="col-span-4 ">
      <Modal isOpen={isOpen} onClose={closeModal}>
      <h2 className="text-lg font-bold mb-2 text-blue-800">Add Quiz</h2>
      <p className="mb-4 text-blue-400">Fill the form</p>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col gap-3 w-80 "
      >
        <div className="flex flex-col">
          
        <select
          name="course"
          id=""
          className="text-primary h-12 border p-3"
          value={quizForm.seletedCourse}
          onChange={(e) =>
            setquizForm({ ...quizForm, seletedCourse: e.target.value })
          }
        >
          {Courses.map((course,index)=>(
            <option key={index} value={course._id}>{course.course_name}</option>
          ))}
        </select>
        <select
          name="module"
          id=""
          className="text-primary h-12 border p-3"
          value={quizForm.selectedModule}
          onChange={(e) =>
            setquizForm({ ...quizForm, selectedModule: e.target.value })
          }
        >
          {Modules.map((modulee,index)=>{
            if(modulee.course_id != quizForm.seletedCourse) return
            return (
            <option key={index} value={modulee._id}>{modulee.module_name}</option>
          )})}
        </select>

        <select
          name="chapter"
          id=""
          className="text-primary h-12 border p-3"
          value={quizForm.selectedChapter}
          onChange={(e) =>
            setquizForm({ ...quizForm, selectedChapter: e.target.value })
          }
        >
          {Chapters.map((chapter,index)=>{
                        if(chapter.module_id != quizForm.selectedModule) return

            return    (
            <option key={index} value={chapter._id}>{chapter.title}</option>
          )})}
        </select>
        </div>

        <input
          type="text"
          className="text-primary h-12 border p-3 hidden"
          value={quizForm.quizNumber}
          onChange={(e) =>
            setquizForm({ ...quizForm, quizNumber: e.target.value })
          }
        />
        <input
          type="text"
          className="text-primary h-12 border p-3"
          value={quizForm.question}
          onChange={(e) =>
            setquizForm({ ...quizForm, question: e.target.value })
          }
        />
        <input
          type="text"
          className="text-primary h-12 border p-3"
          value={quizForm.correctAnswer}
          onChange={(e) =>
            setquizForm({ ...quizForm, correctAnswer: e.target.value })
          }
        />
        <div className="flex justify-between">
          <button className="text-2xl font-bold text-black" onClick={() => AddAnswer()}>
            +
          </button>
          <button
            className="text-2xl font-bold  text-black"
            onClick={() => RemoveAnswer()}
          >
            -
          </button>
        </div>
        <div className="w-full h-36 overflow-y-scroll hideScroll flex flex-col gap-1">
          {quizForm.answers.map((answer, index) => (
            <input
              type="text"
              className="text-primary w-full border p-3"
              value={answer}
              onChange={(e) => setanswer(index, e.target.value)}
            />
          ))}
        </div>
        <button className="border-third border text-third p-2 rounded-full duration-300 hover:text-white hover:bg-third "
        onClick={()=>SelectedRegister == -1 ? AddQuiz() : modifyQuiz() }
        >
          Save
          </button>
      </form>
    </Modal>
      <Filters dataFilters={dataFilters} setSelectedRegister={setSelectedRegister} Data={{Courses , Modules , Chapters}}
      search={{setSearchedQuiz,SearchedQuiz}}
      setFilters={setdataFilters} />
      <ShowQuizes Quizzes={Quizzes} Filters={{selectedChapter : dataFilters.selectedChapter , selectedModule : dataFilters.selectedModule , selectedCourse : dataFilters.selectedCourse}} search={SearchedQuiz} setSelectedRegister={setSelectedRegister} removeQuiz={removeQuiz} />
    
    </div>
  );
}
