import Chapters from "@/database/models/chapters";
import connectDB from "@/database/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import _Modules from "@/database/models/modules";


// POST /api/chapters : create new course , body : { module_id , title, description}
export async function POST(request: NextRequest) {
    try {
        await connectDB()
        const { module_id, title, description } = await request.json()
        const res = await Chapters.create({ module_id, title, description })
        const modules = await _Modules.findById(module_id);

        return NextResponse.json({ message: "Chapter created successfuly", _id: res._id, module_name: modules?.title }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error: "No Chapters created", contexst: error })
    }

}


// GET      select chapters with specific module_id
// note : if no module_id, select all
export async function GET(request: NextRequest) {
    try {
        await connectDB();
        const module_id = request.nextUrl.searchParams.get('module_id');
        let filter: any = {};
        if (module_id) {
            filter["module_id"] = module_id;
        }
        const chapters = await Chapters.find(filter);
        const modules = await _Modules.find({});
        const moduleMap: any = {}
        modules.forEach(module => {
            moduleMap[module._id] = module.title;
        });
        const res = chapters.map(chapter => {
            return {
                _id: chapter._id,
                module_id: chapter.module_id,
                module_name: moduleMap[chapter.module_id],
                title: chapter.title,
                description: chapter.description
            };
        })
        if (res.length === 0 && module_id) {
            return NextResponse.json({ error: "Module_id not found" }, { status: 404 });
        }
        return NextResponse.json(res);
    } catch (error) {
        return NextResponse.json({ error: "No Chapters were found", context: error }, { status: 404 });
    }
}
