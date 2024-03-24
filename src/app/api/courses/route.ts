import { GetAllCourses, PostCourse } from "@/controllers/coursesControllers";
import connectDB from "@/database/lib/mongodb";
import Courses from "@/database/models/courses"
import { NextRequest, NextResponse } from "next/server";




// POST      add one course
export async function POST(request : NextRequest) {
    try {
        return PostCourse(request)
    } catch (error) {
        
        return NextResponse.json({error:"Error while handeling creation of new course" , contexst : error})
    }
}

// GET      select all courses
export async function GET(){
    try {
        return GetAllCourses()
    } catch (error) {
        return NextResponse.json({error:"Error while handeling Get Courses request" , contexst : error},{status : 301})

    }
}

