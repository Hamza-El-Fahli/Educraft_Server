import { getModuleProgression } from "@/controllers/progressionController";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest){
    const user_id = request.nextUrl.searchParams.get('user_id')
    const module_id = request.nextUrl.searchParams.get('module_id')
    let data : any = {} ;
    if(user_id && module_id)
     data = await getModuleProgression({user_id , module_id})

    return NextResponse.json(data)
}