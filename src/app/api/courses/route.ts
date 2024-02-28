import connectDB from "@/database/lib/mongodb";
import Courses from "@/database/models/courses"
import { NextResponse } from "next/server";




// POST      add one course
export async function POST(request : Request) {
    const {course_name, description, instructor} = await request.json()
    try {
        await connectDB()
    await Courses.create({course_name , description , instructor})
    return NextResponse.json({message:"Course created successfuly"},{status : 201})
    } catch (error) {
        
        return NextResponse.json({error:"No courses created" , contexst : error})
    }
}

// GET      select all courses
export async function GET(){
    try {
        await connectDB()
        const res = await Courses.find()
        return NextResponse.json(res)
    } catch (error) {
        return NextResponse.json({error:"No courses was found" , contexst : error},{status : 301})

    }
}

