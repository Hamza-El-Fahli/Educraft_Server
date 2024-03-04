import Courses from "@/database/models/courses";
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/database/lib/mongodb";


// PUT update one course by id
export async function PUT(request:NextRequest,{params}:{params:{id:string}}){
    const {id} = params
    const { course_name,description,instructor} =await request.json()
    
    try {
        await connectDB()
        const res = await Courses.findByIdAndUpdate(id,{course_name , description  , instructor })
        return NextResponse.json({message : "Course updated successfuly" , data : res},{status : 201})
    } catch (error) {
        return NextResponse.json({message : "No course updated" , error:error})
    }
}



// DELETE one course by id
export async function DELETE(request:NextRequest,{params}:{params:{id : string}}){
    const {id} = params
    try {
        await connectDB()
        const res = await Courses.findByIdAndDelete(id)
        return NextResponse.json({message : "Course deleted successfuly", data : res})
    } catch (error) {
        return NextResponse.json({message : "No course deleted" , error : error})
    }

}