import connectDB from "@/database/lib/mongodb"
import ChaptersProgression from "@/database/models/chaptersProgression"
import { NextRequest, NextResponse } from "next/server"

export async function AddChapterProgress(request:NextRequest){

    await connectDB()
    
    const {user_id , chapter_id , score} = await request.json()
    const currnetScore = await  ChaptersProgression.findOne({user_id , chapter_id})
    if(currnetScore ){
        if(score && score > currnetScore.score){
            await ChaptersProgression.findOneAndUpdate( currnetScore._id, {score})
            return NextResponse.json({message:'Chapter user score updated successfully'})
        }
        return NextResponse.json({message:'Chapter user score didnt changed'})
    }
    else{
        await ChaptersProgression.create({user_id , chapter_id , score : score || 0 })
        return NextResponse.json({message:'NEW Chapter user score Create successfully'})

    }
    

        
}