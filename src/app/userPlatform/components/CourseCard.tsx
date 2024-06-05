import React from 'react'

function CourseCard() {
  return (
    
    <div className="p-3 pb-2 h-64 bg-[#21233B]/70 border-[#0090BD]/60 border-2 rounded-xl flex flex-col gap-2 text-white">
    <div className="border h-1/2 w-full rounded-xl">Image</div>
    <h2 className="font-bold">CCNA 1</h2>
    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. </p>
    <button className="bg-firstBlue p-1 rounded-xl font-bold">ENROLL</button>
</div>
  )
}

export default CourseCard