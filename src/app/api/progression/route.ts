import { AddChapterProgress, AddModuleProgress } from "@/controllers/progressionController";
import { NextRequest, NextResponse } from "next/server";




export async function  POST(request:NextRequest) {

    const {user_id , chapter_id , score , module_id} = await request.json()


    if(chapter_id)
    return await AddChapterProgress({user_id , chapter_id , score})
    if(module_id)
    return await AddModuleProgress({user_id , module_id , score})

    return NextResponse.json({error : 'Didnt specify module or chapter'})

    
}