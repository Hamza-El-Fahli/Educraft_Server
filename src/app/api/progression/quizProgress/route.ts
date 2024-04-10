import { GetChaptersWithModuleID } from "@/controllers/chaptersControlllers";
import { GetUserProgress , getQuizGroupsByChapter } from "@/controllers/progressionController";
import connectDB from "@/database/lib/mongodb";
import Chapters from "@/database/models/chapters";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest){
    await connectDB()

    const {user_id, module_id} = await request.json()
    const passedQuizzes =await getQuizGroupsByChapter({user_id,module_id})
    const chapterUnderTheModule =await Chapters.find({module_id: "65e9cbaedc6606713a973fb0"})
    let numberOfPassedChapters = 0
    chapterUnderTheModule.map((chapter)=>{
        if(passedQuizzes[chapter._id])
            if( chapter.quizGroupes == passedQuizzes[chapter._id].length )
                numberOfPassedChapters += 1
            })
    
    return NextResponse.json({ numberOfPassedChapters , totalOfChapters  : chapterUnderTheModule.length})
}