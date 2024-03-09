import connectDB from "@/database/lib/mongodb";
import Chapters from "@/database/models/chapters";
import { NextRequest, NextResponse } from "next/server";







export async function PUT(request:NextRequest, {params}:{params:{id : string}}){
    const {id} = params
    try {
        await connectDB()
        const {title , module_id , description} = await request.json()
        const res = await Chapters.findByIdAndUpdate(id ,{title ,module_id ,description} )
        return NextResponse.json({message:"Chapter updated successfuly" , newChapter:res})
    } catch (error) {
        return NextResponse.json({message:"No Chapters were updated", context:error})
    }
}



export async function DELETE(request:NextRequest, {params}:{params:{id : string}}){
    const {id} = params
    try {
        await connectDB()
        await Chapters.findByIdAndDelete(id )
        return NextResponse.json({message:"Chapter Deleted successfuly"})
    } catch (error) {
        return NextResponse.json({message:"No Chapters were deleted", context:error})
    }
}


