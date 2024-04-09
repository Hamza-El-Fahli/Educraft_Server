import { GetUserProgress , getQuizGroupsByChapter } from "@/controllers/progressionController";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest){
    const {user_id, module_id} = await request.json()
    const data =await getQuizGroupsByChapter({user_id,module_id})
    
    return NextResponse.json(data)
}