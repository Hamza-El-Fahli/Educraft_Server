import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest){
    const formData = await request.formData();
    return NextResponse.json({data:null})
}