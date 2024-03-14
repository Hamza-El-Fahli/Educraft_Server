import { IChapter, ICourse, IModule } from "@/types/types"
import { useState } from "react"

export function Filters({dataFilters, setSelectedRegister , Data , setFilters , search}:{dataFilters:any,setSelectedRegister:any,Data:{Courses : ICourse[] , Modules : IModule[] , Chapters : IChapter[]},setFilters:any , search:any}) {



  function resetFilters(){
    setFilters({
      selectedCourse : '-1',
      selectedModule : '-1',
      selectedChapter : '-1',
      }
    )
  } 
  return (
    <div className="flex flex-row-reverse">
      <div className=" flex items-center">

      <div className="dashboardCards_add" onClick={(e)=>setSelectedRegister(-1)}>
        <svg width="15" height="15" viewBox="0 0 15 15">
          <path
            d="M7.5 0L7.5 15M0 7.5L15 7.5"
            fill="none"
            stroke="#fff"
            strokeWidth="2"
          />
        </svg>
        Add Quiz
      </div>
      </div>

      <div className=" flex-auto flex  flex-col">
        <div className=" flex gap-5 text-center">
        <select className="m-1 border rounded-md p-2 text-black max-w-48" value={dataFilters.selectedCourse} onChange={(e)=>{setFilters({...dataFilters,selectedCourse : e.target.value})}}>
        <option value={-1}>Courses</option>

            {Data.Courses.map((course:any)=>{
              return (
                <option value={course._id}>{course.course_name}</option>
              )
            })}
          </select>
          <select className="m-1 border rounded-md p-2 text-black max-w-48"  value={dataFilters.selectedModule} onChange={(e)=>{setFilters({...dataFilters,selectedModule : e.target.value})}}>
          <option value={-1}>Modules</option>

            {Data.Modules.map((module:any)=>{
              if(dataFilters.selectedCourse != '-1' ) 
                if(dataFilters.selectedCourse != module.course_id) return 
                  
              return (
                <option value={module._id}>{module.module_name}</option>
              )
            })}
          </select>
          <select className="m-1 border rounded-md p-2 text-black max-w-48"  value={dataFilters.selectedChapter} onChange={(e)=>{setFilters({...dataFilters,selectedChapter : e.target.value})}}>
          <option value={-1}>Chapters</option>

            {Data.Chapters.map((chapter:any)=>{
              if(dataFilters.selectedModule != '-1')
                if(dataFilters.selectedModule != chapter.module_id) return 

              return (
                <option value={chapter._id}>{chapter.title}</option>
              )
            })}
          </select>
          <input className=" border m-1 rounded-full flex-auto py-2 px-5 text-black " placeholder='Search by number' type="number" value={search.SearchedQuiz || ''} onChange={(e)=>search.setSearchedQuiz(parseInt(e.target.value))} />

          <button className="border ml-auto rounded-full m-1 p-2 text-firstBlue border-firstBlue hover:border-white hover:text-white hover:bg-firstBlue"
          onClick={()=>resetFilters()}
          
          >Reset Filters</button>
        </div>
      </div>
    </div>
  );
}
