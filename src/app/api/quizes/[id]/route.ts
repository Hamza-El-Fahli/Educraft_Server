import { UpdateQuizByID } from "@/controllers/quizzesControllers";
import connectDB from "@/database/lib/mongodb";
import Chapters from "@/database/models/chapters";
import Courses from "@/database/models/courses";
import _Modules from "@/database/models/modules";
import Quizes from "@/database/models/quizes";
import { NextRequest, NextResponse } from "next/server";



export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    const { id : QuizID } = params
    try {
        UpdateQuizByID(request,QuizID)
    } catch (error) {
        return NextResponse.json({ message: "No Quizes were updated", context: error })
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params
    try {
        await connectDB()
        await Quizes.findByIdAndDelete(id)
        return NextResponse.json({ message: "Quize Deleted successfuly" })
    } catch (error) {
        return NextResponse.json({ message: "No Quizes were deleted", context: error })
    }
}

