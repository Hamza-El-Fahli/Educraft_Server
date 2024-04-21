import Lessons from "@/database/models/lessosns";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest){
    const formData = await request.formData();
    console.log(formData)
    return NextResponse.json({data:null})
}