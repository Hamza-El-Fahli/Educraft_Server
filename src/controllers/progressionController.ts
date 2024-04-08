import connectDB from "@/database/lib/mongodb"
import Progression from "@/database/models/progression"
import { NextRequest, NextResponse } from "next/server"

export async function AddProgress({ user_id, chapter_id,module_id, quizGroup }: { user_id: string, module_id: string, chapter_id: string, quizGroup: string }) {
    await connectDB()
    const currnetScore = await Progression.findOne({ user_id, chapter_id , module_id , quizGroup })
    if (currnetScore) {
        return NextResponse.json({ message: 'Progress user  didnt changed' })
    }
    else 
    {
        await Progression.create({ user_id, chapter_id, module_id, quizGroup })
        return NextResponse.json({ message: 'NEW Progress user score Create successfully' })
    }
}
export async function GetUserProgress({ user_id, module_id}: { user_id: string, module_id: string}){
    await connectDB()
    const userProgress = await Progression.find({ user_id,  module_id })
    if(userProgress){
        const result = {user_id, module_id , 
            quizzes : userProgress.map((prog)=>( {chapter : prog.chapter_id , quizGroup : prog.quizGroup}))}
            return NextResponse.json(result)
    }
    return NextResponse.json({Error:'no Score'},{status:404})
}