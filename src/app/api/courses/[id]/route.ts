import Courses from "@/database/models/courses";
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/database/lib/mongodb";
import { DeleteCourseById, UpdateCourseById } from "@/controllers/coursesControllers";


// PUT update one course by id
export async function PUT(request:NextRequest,{params}:{params:{id:string}}){
    const {id} = params
    
    try {
        return UpdateCourseById(request,id)
    } catch (error) {
        return NextResponse.json({message : "No course updated" , error:error})
    }
}



// DELETE one course by id
export async function DELETE(request:NextRequest,{params}:{params:{id : string}}){
    const {id} = params
    try {
        return DeleteCourseById(id)
    } catch (error) {
        return NextResponse.json({message : "No course deleted" , error : error})
    }

}