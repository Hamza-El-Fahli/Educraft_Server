'use client';


import Modal from "@/components/userModal";
import { useState } from "react";

export default function QuizForm(){
    const [isOpen, setisOpen] = useState(true)

    function AddAnswer(){
        setquizFrom({...quizFrom , answers : [...quizFrom.answers,'']})
    }
    function RemoveAnswer(){
        if(quizFrom.answers.length > 1)
        setquizFrom({...quizFrom , answers : quizFrom.answers.slice(0,quizFrom.answers.length-1)})

}
function setanswers(index:number,value:string){
    const newAnswers = [...quizFrom.answers]
    newAnswers[index] = value
    
    setquizFrom({...quizFrom , answers : newAnswers})
    
    
}

const [quizFrom, setquizFrom] = useState({
    seletedCourse : 1,
    selectedModule : 1,
    selectedChapter : 1,
    quizNumber : 1,
    correctAnswer : '',
    answers : ['']
})
console.log(quizFrom)




    function closeModal(){
        setisOpen(false)
    }
    return (
        <Modal isOpen={true} onClose={closeModal} >
<h2 className="text-lg font-bold mb-2 text-blue-800">Add User</h2>
        <p className="mb-4 text-blue-400">Fill the form</p>
        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col w-52">
        <select name="course" id="" className="w-full" value={quizFrom.seletedCourse} onChange={(e)=>setquizFrom({...quizFrom , seletedCourse:e.target.value})}>
    <option value="1">CCNA1</option>
    <option value="2">CCNA2</option>
    <option value="3">CCNA3</option>
    <option value="4">CCNA4</option>
</select>
<select name="module" id="" className="w-full" value={quizFrom.selectedModule} onChange={(e)=>setquizFrom({...quizFrom , selectedModule:e.target.value})}>
    <option value="1">Module1</option>
    <option value="2">Module2</option>
    <option value="3">Module3</option>
    <option value="4">Module4</option>
</select>

<select name="chapter" id="" className="w-full" value={quizFrom.selectedChapter} onChange={(e)=>setquizFrom({...quizFrom , selectedChapter:e.target.value})}>
    <option value="1">Chapter1</option>
    <option value="2">Chapter2</option>
    <option value="3">Chapter3</option>
    <option value="4">Chapter4</option>
</select>
        
<input type="text" value={quizFrom.quizNumber}  onChange={(e)=>setquizFrom({...quizFrom , quizNumber : e.target.value})}/>
<input type="text"  value={quizFrom.correctAnswer}  onChange={(e)=>setquizFrom({...quizFrom , correctAnswer : e.target.value})}/>
<div className="flex justify-between">
<button className="text-2xl font-bold " onClick={()=>AddAnswer()} >+</button>
<button className="text-2xl font-bold " onClick={()=>RemoveAnswer()} >-</button></div>
<div>
{quizFrom.answers.map((answer,index)=>(
    <input type="text" className="border-2 " value={quizFrom.answers[index]} onChange={(e)=>setanswers(index,e.target.value)} />
))}
</div>


        </form>
        </Modal>
    )
}