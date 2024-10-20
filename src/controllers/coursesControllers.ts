import Courses from "@/database/models/courses"
import { NextRequest, NextResponse } from "next/server"




export async function PostCourse(request:NextRequest ) {
    
    const {course_name, description, instructor} = await request.json()
const res = await Courses.create({course_name , description , instructor})
return NextResponse.json({message:"Course created successfuly", _id : res._id},{status : 201})
}


export async function GetAllCourses(){
    
    const res = await Courses.find()
    if(res.length == 0 ) return NextResponse.json({message : "No Courses are found"},{status:404})
    return NextResponse.json(res)
}


export async function UpdateCourseById(request:NextRequest ,course_id:string) {
    
    const { course_name,description,instructor} =await request.json()
    const res = await Courses.findByIdAndUpdate(course_id,{course_name , description  , instructor })
    return NextResponse.json({message : "Course updated successfuly" , data : res},{status : 201})
}


export async function DeleteCourseById(course_id:string) {
    
    await Courses.findByIdAndDelete(course_id)
    return NextResponse.json({message : "Course deleted successfuly"})
    
}