"use client"


import { useState } from "react";

export default function ShowQuizes({Data}:{Data : number[]}){
    
  const [expandedIndex, setExpandedIndex] = useState(-1);

  const handleClick = (index:any) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? -1 : index));
  };

   return  <>

      {Data.map((quiz, index) => {
        const isExpanded = expandedIndex === index;
        return (
          <div
            key={index}
            className={`border border-2 rounded-md ${isExpanded ? "h-60" : "h-10"} duration-500 p-0 m-2 overflow-hidden bg-secondary`}
          >
            <div className="h-10 p-0 m-0 flex items-center px-5 bg-blue-950"             
            onClick={() => handleClick(index)}
>My Quiz Data {quiz}</div>
              <>
              <div className={` bg-secondary ${isExpanded ? 'opacity-1' : 'opacity-0' } duration-200  h-10 p-0 m-0 flex items-center px-5 `}>Answer</div>
              <div className={` bg-secondary ${isExpanded ? 'opacity-1' : 'opacity-0' } duration-150  h-10 p-0 m-0 flex items-center px-5 `}>Answer</div>
              <div className={` bg-secondary ${isExpanded ? 'opacity-1' : 'opacity-0' } duration-100  h-10 p-0 m-0 flex items-center px-5 `}>Answer</div>
              <div className={` bg-secondary ${isExpanded ? 'opacity-1' : 'opacity-0' } duration-75  h-10 p-0 m-0 flex items-center px-5 `}>Answer</div>
              <div className={` bg-secondary ${isExpanded ? 'opacity-1' : 'opacity-0' } duration-0  h-10 p-0 m-0 flex items-center px-5 `}>Correct</div>
              </>
            
          </div>
        );
      })}
      </>
}