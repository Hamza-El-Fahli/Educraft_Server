import Chapters from "@/database/models/chapters";
import connectDB from "@/database/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";


// POST /api/chapters : create new course , body : { module_id , title, description}
export async function POST(request: NextRequest) {
    try {
        await connectDB()
        const { module_id, title, description } = await request.json()
        await Chapters.create({ module_id, title, description })
        return NextResponse.json({ message: "Chapter created successfuly" }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error: "No Chapters created", contexst: error })
    }

}


// GET      select chapters with specific module_id
// note : if no module_id, select all
export async function GET(request: NextRequest) {
    try {
        await connectDB();
        const module_id =  request.nextUrl.searchParams.get('module_id');
        console.log(module_id)
        let filter: any = {};
        if (module_id) {
            filter["module_id"] = module_id;
        }
        const res = await Chapters.find(filter);
        if (res.length === 0 && module_id) {
            return NextResponse.json({ error: "Module_id not found" }, { status: 404 });
        }
        return NextResponse.json(res);
    } catch (error) {
        return NextResponse.json({ error: "No Chapters were found", context: error }, { status: 404 });
    }
}
