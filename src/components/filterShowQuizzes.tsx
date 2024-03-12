export function Filters({setSelectedRegister , Data , setFilters}:any) {
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
        <select className="m-1 border rounded-md p-2 text-black max-w-48" value={Data.Courses.selectedCourse} onChange={(e)=>{setFilters.setCourses({...Data.Courses , selectedCourse : e.target.value})}}>
            
            {Data.Courses.courses.map((course:any)=>{
              return (
                <option value={course._id}>{course.course_name}</option>
              )
            })}
          </select>
          <select className="m-1 border rounded-md p-2 text-black max-w-48"  value={Data.Modules.selectedModule} onChange={(e)=>{setFilters.setModules({...Data.Modules , selectedModule : e.target.value})}}>
            
            {Data.Modules.modules.map((module:any)=>{
              return (
                <option value={module._id}>{module.module_name}</option>
              )
            })}
          </select>
          <select className="m-1 border rounded-md p-2 text-black max-w-48"  value={Data.Chapters.selectedChapter} onChange={(e)=>{setFilters.setChapters({...Data.Chapters , selectedChapter : e.target.value})}}>
            
            {Data.Chapters.chapters.map((chapter:any)=>{
              return (
                <option value={chapter._id}>{chapter.title}</option>
              )
            })}
          </select>
          <div className="border ml-auto rounded-full m-1 p-2">Reset Filters</div>
        </div>

        <div className=" flex gap-5 text-center">
          <div className=" border m-1 rounded-full flex-auto p-2 ">Here ID input</div>
          <div className=" border m-1 rounded-full p-2 ">Search button </div>
        </div>
      </div>
    </div>
  );
}
