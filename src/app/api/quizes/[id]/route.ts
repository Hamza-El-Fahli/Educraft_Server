import connectDB from "@/database/lib/mongodb";
import Quizes from "@/database/models/quizes";
import { NextRequest, NextResponse } from "next/server";









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


