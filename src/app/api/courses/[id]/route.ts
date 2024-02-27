import Courses from "@/database/models/courses";
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/database/lib/mongodb";


// POST update one course by id

export async function POST(request:NextRequest,{params}:{params:{id:string}}){
    const {id} = params
    
    try {
        const { new_course_name,new_description,new_instructor} =await request.json()
        await connectDB()
        await Courses.findByIdAndUpdate(id,{course_name : new_course_name , description : new_description , instructor : new_instructor})
        return NextResponse.json({message : "Course updated successfuly"},{status : 201})
    } catch (error) {
        return NextResponse.json({message : "No course updated" , error:error})
    }
}