import Chapters from "@/database/models/chapters";
import _Modules from "@/database/models/modules";
import { NextRequest, NextResponse } from "next/server";


export async function PostChapter(request: NextRequest) {

    const { module_id, title, description } = await request.json()
    const res = await Chapters.create({ module_id, title, description })
    const modules = await _Modules.findById(module_id);
    if (modules == 0)
        return NextResponse.json({ message: "Chapter with given Module Id not found" }, { status: 404 })
    else
        return NextResponse.json({ message: "Chapter created successfuly", _id: res._id, module_name: modules[0].title }, { status: 201 })

}



export async function GetAllChapters() {

    let filter: any = {};

    const chapters = await Chapters.find();
    
    if (chapters?.length && chapters.length >0 ) {
        return NextResponse.json(chapters);
    }
    return NextResponse.json({ error: "Chapters not found" }, { status: 404 });
}



export async function GetChaptersWithModuleID(module_id: string,user_id:string|null) {


    const chapters = await Chapters.find({module_id , user_id });

    if (chapters?.length === 0) {
        return NextResponse.json({ error: "No Chapter found with the given Module ID" }, { status: 404 });
    }
    return NextResponse.json(chapters);
}


export async function UpdateChapterByID(request: NextRequest, chapter_id: string) {
    if (chapter_id == null || chapter_id == '') throw Error('Chapter id is empty or null')

    const { title, module_id, description } = await request.json()
    const res = await Chapters.findByIdAndUpdate(chapter_id, { title, module_id, description })
    return NextResponse.json({ message: "Chapter updated successfuly", newChapter: res })

}