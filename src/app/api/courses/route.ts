import connectDB from "@/database/lib/mongodb";
import Courses from "@/database/models/courses"
import { NextRequest, NextResponse } from "next/server";




// PUT      add one course
// GET      select all courses
// POST     select one course 
// DELETE   delete a course by id


export async function PUT(request : Request) {
    const {course_name, description, instructor} = await request.json()
    try {
        await connectDB()
    await Courses.create({course_name , description , instructor})
    return NextResponse.json({message:"Course created successfuly"},{status : 201})
    } catch (error) {
        
        return NextResponse.json({error:"No courses created" , contexst : error})
    }
}


export async function GET(request:NextRequest){
    try {
        await connectDB()
        const res = await Courses.find()
        return NextResponse.json(res)
    } catch (error) {
        return NextResponse.json({error:"No courses was found" , contexst : error},{status : 301})

    }
}

