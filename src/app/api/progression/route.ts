import { AddChapterProgress } from "@/controllers/progressionController";
import { NextRequest } from "next/server";




export async function  POST(request:NextRequest) {

    return await AddChapterProgress(request)
    
}