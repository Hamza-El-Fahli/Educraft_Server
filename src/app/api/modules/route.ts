import _Modules from "@/database/models/modules";
import connectDB from "@/database/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";


// POST /api/modules : create new course , body : { corse_id , title, description,  order}
export async function POST(request : NextRequest){
    try {
        await connectDB()
        const { course_id , title, description,  order} = await request.json()
        await _Modules.create({ course_id , title, description,  order})
        return NextResponse.json({message:"Module created successfuly"},{status : 201})
    } catch (error) {
        return NextResponse.json({error:"No Modules created" , contexst : error})
    }

}

