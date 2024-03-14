"use client";

import { useEffect, useState } from "react";
import ShowQuizes from "@/components/ShowQuizzes";
import { Filters } from "@/components/filterShowQuizzes";
import Modal from "@/components/userModal";
import axios from "axios";
import { IQuizz } from "@/types/types";
export default function QuizesScreen() {
  const [isOpen, setisOpen] = useState(false);
  const [SelectedRegister, setSelectedRegister] = useState<any>(null);
  const [quizForm, setquizForm] = useState({
    seletedCourse: "1",
    selectedModule: "1",
    selectedChapter: "1",
    quizNumber: "1",
    correctAnswer: "",
    answers: [""],
  });


const [Courses, setCourses] = useState<any>({courses : [] ,  selectedCourse : ''})
const [Modules, setModules] = useState<any>({modules : [] ,  selectedModule : ''})
const [Chapters, setChapters] = useState<any>({chapters : [] ,  selectedChapter : ''})
const [Quizzes, setQuizzes] = useState<IQuizz[]>([])
const [SearchedQuiz, setSearchedQuiz] = useState<number>(0)

useEffect(()=>{
  axios.get('http://localhost:3000/api/courses')
  .then((res)=>{
    setCourses({courses : res.data , selectedCourse : '-1'})
  })
  .catch((error)=>{
    console.error(error)
  })
},[])




useEffect(()=>{
  axios.get('http://localhost:3000/api/modules')
  .then((res)=>{
    setModules({modules : res.data , selectedModule : '-1'})
  })
  .catch((error)=>{
    console.error(error)
  })
},[])




useEffect(()=>{
  axios.get('http://localhost:3000/api/chapters')
  .then((res)=>{
    setChapters({chapters : res.data , selectedChapter : '-1'})
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
    if(SelectedRegister == -1)
          setisOpen(true);
    else{
      setquizForm({
        seletedCourse: "1",
        selectedModule: "1",
        selectedChapter: "1",
        quizNumber: "1",
        correctAnswer: "",
        answers: [""],
      });
    
    }
  }

  function closeModal() {
    setSelectedRegister(null)
    setisOpen(false);
  }

  useEffect(() => {
    if(SelectedRegister != null)
    openModal();
  }, [SelectedRegister]);

function OpenAndSet(index:number){
  setSelectedRegister(index)
}

  return (
    <div className="col-span-4">
      <Modal isOpen={isOpen} onClose={closeModal}>
      <h2 className="text-lg font-bold mb-2 text-blue-800">Add User</h2>
      <p className="mb-4 text-blue-400">Fill the form</p>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col gap-3 w-80 "
      >
        <select
          name="course"
          id=""
          className="text-primary h-12 border p-3"
          value={quizForm.seletedCourse}
          onChange={(e) =>
            setquizForm({ ...quizForm, seletedCourse: e.target.value })
          }
        >
          <option value="1">CCNA1</option>
          <option value="2">CCNA2</option>
          <option value="3">CCNA3</option>
          <option value="4">CCNA4</option>
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
          <option value="1">Module1</option>
          <option value="2">Module2</option>
          <option value="3">Module3</option>
          <option value="4">Module4</option>
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
          <option value="1">Chapter1</option>
          <option value="2">Chapter2</option>
          <option value="3">Chapter3</option>
          <option value="4">Chapter4</option>
        </select>

        <input
          type="text"
          className="text-primary h-12 border p-3"
          value={quizForm.quizNumber}
          onChange={(e) =>
            setquizForm({ ...quizForm, quizNumber: e.target.value })
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
        <button className="border-third border text-third p-2 rounded-full duration-300 hover:text-white hover:bg-third ">Save</button>
      </form>
    </Modal>
      <Filters setSelectedRegister={setSelectedRegister} Data={{Courses , Modules , Chapters}}
      search={{setSearchedQuiz,SearchedQuiz}}
      setFilters={{setChapters , setModules , setCourses}} />
      <ShowQuizes Quizzes={Quizzes} Filters={{selectedChapter : Chapters.selectedChapter , selectedModule : Modules.selectedModule , selectedCourse : Courses.selectedCourse}} search={SearchedQuiz} />
    </div>
  );
}
