"use client"


import { useState } from "react";

export default function ShowQuizes({Quizzes , Filters, search}:{Quizzes : any , Filters:{selectedCourse:string , selectedModule : string , selectedChapter : string}, search : number}){
    
  const [expandedIndex, setExpandedIndex] = useState(-1);

  const handleClick = (index:any) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? -1 : index));
  };

   return  <div className="grid grid-cols-2" style={{gridAutoRows : '50px'}}>

      {Quizzes.map((quiz:any, index:number) => {
        const isExpanded = expandedIndex === index;
        if(quiz.chapter_id !== Filters.selectedChapter && Filters.selectedChapter != '-1') return 
        if(quiz.module_id !== Filters.selectedModule && Filters.selectedModule != '-1') return 
        if(quiz.course_id !== Filters.selectedCourse && Filters.selectedCourse != '-1') return 

        if(search!=0 && search != index+1) return 

        return (<div
            key={index}
           className={`border-2 rounded-md h-10 duration-500 p-0 m-2 overflow-hidden bg-secondary z-0 hover:h-fit quizHovering`}            >
            <div className="h-10 p-0 m-0 flex items-center px-5 bg-blue-950"             
>Quiz N°{index+1}</div>
              <>
                <div className={` bg-secondary duration-0  p-2 m-0 flex items-center px-5 border-b-4 border-b-orange-50 `}>{quiz.question}</div>
              <div className="max-h-40 overflow-y-scroll">
              {quiz.answers.map((answer:any)=>{
                return (
                  <div className={` bg-secondary duration-200  h-10 p-0 m-0 flex items-center px-5 border-t `}>{answer}</div>
                  
                  )
                })}
                </div>
              <div className={` bg-secondary duration-150  h-10 p-2 m-0 flex items-center px-5 border-t-4 border-t-orange-50`}>Correct : {quiz.correct_answer}</div>
              </>
            
          </div>
        );
      })}
      </div>
}