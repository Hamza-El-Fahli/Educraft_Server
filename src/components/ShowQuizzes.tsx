"use client"


import { useState } from "react";

export default function ShowQuizes({Quizzes , Filters}:{Quizzes : any , Filters:{selectedCourse:string , selectedModule : string , selectedChapter : string}}){
    
  const [expandedIndex, setExpandedIndex] = useState(-1);

  const handleClick = (index:any) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? -1 : index));
  };

   return  <div className="grid grid-cols-2" style={{gridAutoRows : '50px'}}>

      {Quizzes.map((quiz:any, index:number) => {
        const isExpanded = expandedIndex === index;
        if(quiz.chapter_id !== Filters.selectedChapter) return 
        if(quiz.module_id !== Filters.selectedModule) return 
        if(quiz.course_id !== Filters.selectedCourse) return 
        return (
//           <div
//             key={index}
//             className={`border-2 rounded-md ${isExpanded ? "h-60" : "h-10"} duration-500 p-0 m-2 overflow-hidden bg-secondary`}
//           >
//             <div className="h-10 p-0 m-0 flex items-center px-5 bg-blue-950"             
//             onClick={() => handleClick(index)}
// >Quiz N {quiz}</div>
//               <>
//               <div className={` bg-secondary ${isExpanded ? 'opacity-1' : 'opacity-0' } duration-200  h-10 p-0 m-0 flex items-center px-5 `}>Answer</div>
//               <div className={` bg-secondary ${isExpanded ? 'opacity-1' : 'opacity-0' } duration-150  h-10 p-0 m-0 flex items-center px-5 `}>Answer</div>
//               <div className={` bg-secondary ${isExpanded ? 'opacity-1' : 'opacity-0' } duration-100  h-10 p-0 m-0 flex items-center px-5 `}>Answer</div>
//               <div className={` bg-secondary ${isExpanded ? 'opacity-1' : 'opacity-0' } duration-75  h-10 p-0 m-0 flex items-center px-5 `}>Answer</div>
//               <div className={` bg-secondary ${isExpanded ? 'opacity-1' : 'opacity-0' } duration-0  h-10 p-0 m-0 flex items-center px-5 `}>Correct</div>
//               </>
            
//           </div>
<div
            key={index}
           className={`border-2 rounded-md h-10 duration-500 p-0 m-2 overflow-hidden bg-secondary z-0 hover:h-60 quizHovering`}            >
            <div className="h-10 p-0 m-0 flex items-center px-5 bg-blue-950"             
>Quiz N°{index+1} {quiz.chapter_name}</div>
              <>
              <div className={` bg-secondary duration-200  h-10 p-0 m-0 flex items-center px-5 `}>Answer</div>
              <div className={` bg-secondary duration-150  h-10 p-0 m-0 flex items-center px-5 `}>Answer</div>
              <div className={` bg-secondary duration-100  h-10 p-0 m-0 flex items-center px-5 `}>Answer</div>
              <div className={` bg-secondary duration-75  h-10 p-0 m-0 flex items-center px-5 `}>Answer</div>
              <div className={` bg-secondary duration-0  h-10 p-0 m-0 flex items-center px-5 `}>Correct</div>
              </>
            
          </div>
        );
      })}
      </div>
}