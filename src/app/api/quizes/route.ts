import connectDB from "@/database/lib/mongodb";
import Quizes from "@/database/models/quizes";
import { NextRequest, NextResponse } from "next/server";



// POST Add quiz 
export async function POST(request: NextRequest) {
    try {
        const { chapter_id, question, correct_answer, options }:
         { chapter_id: string, question: string, correct_answer: number, options: string[] } = await request.json()
        await connectDB()
        const res = await Quizes.create({ chapter_id, question, correct_answer, options })
        return NextResponse.json({message:'quiz created successfully' ,id : res.id})

    } catch (error) {
        return NextResponse.json({message:'No Quizes were created' ,context : error})

    }

}

// GET      select Quizes with specific chapter_id
// note : if no chapter_id, select all
export async function GET(request: NextRequest) {
    try {
        await connectDB();
        const chapter_id =  request.nextUrl.searchParams.get('chapter_id');
        console.log(chapter_id)
        let filter: any = {};
        if (chapter_id) {
            filter["chapter_id"] = chapter_id;
        }
        const res = await Quizes.find(filter);
        if (res.length === 0 && chapter_id) {
            return NextResponse.json({ error: "Quizes not found" }, { status: 404 });
        }
        return NextResponse.json(res);
    } catch (error) {
        return NextResponse.json({ error: "No Quizes were found", context: error }, { status: 404 });
    }
}
