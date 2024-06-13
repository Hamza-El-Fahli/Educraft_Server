import { ICourse } from '@/types/types';
import { useRouter  } from 'next/navigation';
import React from 'react'

function CourseCard({course}:{course:ICourse}) {
  // Create a Date object from the dateString
  let date = new Date();
  if(course.createdAt)
      date = new Date(course.createdAt);

// Define options for formatting the date
const options:{
  day: "2-digit",
  month: "short",
  year: "numeric"
}= { day: "2-digit", month: "short", year: "numeric" };

// Format the date using the specified options
const formattedDate = date.toLocaleDateString("fr-FR", options);
const router = useRouter();

  return (
    
    <div className="p-3 pb-8 h-64 bg-[#21233B]/50 border-[#0090BD]/20 border-2 rounded-xl flex flex-col gap-2 text-white">
    <img src='/image_1.png' className="h-1/2 w-full " />
    <h2 className="font-bold text-xl flex flex-col" >{course.course_name}
    <span className='text-xs text-[#c1c1c1]/50' >{formattedDate}</span>
    </h2>
    <p className='pl-2'>{course.description}</p>
    <button onClick={()=>{
      router.push('/userplatform/modules/'+course._id)      
      }} className="bg-firstBlue p-1 rounded-xl font-bold ">ENROLL</button>
</div>
  )
}

export default CourseCard