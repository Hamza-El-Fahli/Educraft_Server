import _Modules from "@/database/models/modules";
import connectDB from "@/database/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";


// POST /api/modules : create new course , body : { corse_id , title, description,  order}
export async function POST(request: NextRequest) {
    try {
        await connectDB()
        const { course_id, title, description, order } = await request.json()
        await _Modules.create({ course_id, title, description, order })
        return NextResponse.json({ message: "Module created successfuly" }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error: "No Modules created", contexst: error })
    }

}


// GET      select modules with specific course_id
// note : if no course_id, select all
export async function GET(request: NextRequest) {
    try {
        await connectDB();
        const course_id =  request.nextUrl.searchParams.get('course_id');
        console.log(course_id)
        let filter: any = {};
        if (course_id) {
            filter["course_id"] = course_id;
        }
        const res = await _Modules.find(filter);
        if (res.length === 0 && course_id) {
            return NextResponse.json({ error: "Course_id not found" }, { status: 404 });
        }
        return NextResponse.json(res);
    } catch (error) {
        return NextResponse.json({ error: "No Modules were found", context: error }, { status: 404 });
    }
}
