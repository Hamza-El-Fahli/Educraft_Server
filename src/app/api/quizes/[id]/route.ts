import connectDB from "@/database/lib/mongodb";
import Quizes from "@/database/models/quizes";
import { NextRequest, NextResponse } from "next/server";







export async function PUT(request:NextRequest, {params}:{params:{id : string}}){
    const {id} = params
    try {
        await connectDB()
        const { new_question ,  new_chapter_id , new_correct_answer , new_options} = await request.json()
        console.log( new_question ,  new_chapter_id , new_correct_answer , new_options)

        await Quizes.findByIdAndUpdate(id ,{question:new_question ,chapter_id:new_chapter_id ,correct_answer:new_correct_answer, options : new_options} )
        return NextResponse.json({message:"Quize updated successfuly"})
    } catch (error) {
        return NextResponse.json({message:"No Quizes were updated", context:error})
    }
}



export async function DELETE(request:NextRequest, {params}:{params:{id : string}}){
    const {id} = params
    try {
        await connectDB()
        await Quizes.findByIdAndDelete(id)
        return NextResponse.json({message:"Quize Deleted successfuly"})
    } catch (error) {
        return NextResponse.json({message:"No Quizes were deleted", context:error})
    }
}


