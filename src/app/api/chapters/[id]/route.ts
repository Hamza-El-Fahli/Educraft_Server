import connectDB from "@/database/lib/mongodb";
import Chapters from "@/database/models/chapters";
import { NextRequest, NextResponse } from "next/server";







export async function PUT(request:NextRequest, {params}:{params:{id : string}}){
    const {id} = params
    try {
        await connectDB()
        const {new_title , new_module_id , new_description} = await request.json()
        await Chapters.findByIdAndUpdate(id ,{title:new_title ,module_id:new_module_id ,description:new_description} )
        return NextResponse.json({message:"Chapter updated successfuly"})
    } catch (error) {
        return NextResponse.json({message:"No Chapters were updated", context:error})
    }
}