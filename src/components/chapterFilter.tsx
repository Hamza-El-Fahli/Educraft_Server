import { API_Server_Chapters, API_Server_Courses, API_Server_Modules, API_Server_RetrieveData } from "@/configuration/API";
import { IChapter, ICourse, IModule } from "@/types/types";
import axios from "axios";
import { useEffect, useState } from "react";

export function ChapterFilter({setselectedChapter}:any) {
  const [Courses, setCourses] = useState([])
  const [Modules, setModules] = useState([])
const [Chapters, setChapters] = useState([])
const [Loading, setLoading] = useState(true)


  useEffect(() => {
    axios
      .get(`${API_Server_RetrieveData}/?courses=1&modules=1&chapters=1`)
      .then((res) => {
        setCourses(res.data.courses);
        setModules(res.data.modules);
        setChapters(res.data.chapters);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

 

  const [dataFilters, setFilters] = useState({
    selectedCourse: "",
    selectedModule: "",
    selectedChapter: "",
  });

  return (
    <div className="flex flex-row-reverse items-center justify-center">
      <div className=" flex-auto flex  flex-col">
        <div className=" flex gap-5 text-center">
          <select
            className=" border rounded-md p-2 text-black h-full"
            value={dataFilters.selectedCourse}
            onChange={(e) => {
              setFilters({ ...dataFilters, selectedCourse: e.target.value });
            }}
          >
            <option value={-1}>Courses</option>

            {Courses.map((course: any, index: number) => {
              return (
                <option key={index} value={course._id}>
                  {course.course_name}
                </option>
              );
            })}
          </select>
          <select
            className="border rounded-md p-2 text-black h-full"
            value={dataFilters.selectedModule}
            onChange={(e) => {
              setFilters({ ...dataFilters, selectedModule: e.target.value });
            }}
          >
            <option value={-1}>Modules</option>

            {Modules.map((module: any, index: number) => {
              if (dataFilters.selectedCourse != "-1")
                if (dataFilters.selectedCourse != module.course_id) return;

              return (
                <option key={index} value={module._id}>
                  {module.module_name}
                </option>
              );
            })}
          </select>
          <select
            className=" border rounded-md p-2 text-black h-full"
            value={dataFilters.selectedChapter}
            onChange={(e) => {
              setFilters({ ...dataFilters, selectedChapter: e.target.value });
              setselectedChapter(e.target.value)
            }}
          >
            <option value={-1}>Chapters</option>

            {Chapters.map((chapter: any, index: number) => {
              if (dataFilters.selectedModule != "-1")
                if (dataFilters.selectedModule != chapter.module_id) return;

              return (
                <option key={index} value={chapter._id}>
                  {chapter.title}
                </option>
              );
            })}
          </select>

          
        </div>
      </div>
    </div>
  );
}
