import { UpdateChapterByID } from "@/controllers/chaptersControlllers";
import connectDB from "@/database/lib/mongodb";
import Chapters from "@/database/models/chapters";
import { NextRequest, NextResponse } from "next/server";







export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params



    try {
        return UpdateChapterByID(request, id)
    } catch (error) {
        return NextResponse.json({ message: "error while handeling the request", context: error })
    }
}



export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params
    try {
        await connectDB()
        await Chapters.findByIdAndDelete(id)
        return NextResponse.json({ message: "Chapter Deleted successfuly" })
    } catch (error) {
        return NextResponse.json({ message: "No Chapters were deleted", context: error })
    }
}


