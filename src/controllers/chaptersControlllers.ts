import connectDB from "@/database/lib/mongodb";
import Chapters from "@/database/models/chapters";
import _Modules from "@/database/models/modules";
import { NextRequest, NextResponse } from "next/server";
import { getQuizGroupCounts } from "./quizzesControllers";
import { getChapterProgression } from "./progressionController";


export async function PostChapter(request: NextRequest) {

   //  await connectDB()
    const { module_id, title, description } = await request.json()
    const res = await Chapters.create({ module_id, title, description })
    const modules = await _Modules.findById(module_id);
    if (!modules)
        return NextResponse.json({ message: "Chapter with given Module Id not found" }, { status: 404 })
    else
        return NextResponse.json({ message: "Chapter created successfuly", _id: res._id, module_name: modules.title }, { status: 201 })

}



export async function GetAllChapters() {

   //  await connectDB();
    let filter: any = {};

    const chapters = await Chapters.find();
    // const modules = await _Modules.find({});
    // const moduleMap: any = {}
    // modules.forEach(module => {
    //     moduleMap[module._id] = module.title;
    // });
    // const res = chapters.map(chapter => {
    //     return {
    //         _id: chapter._id,
    //         module_id: chapter.module_id,
    //         module_name: moduleMap[chapter.module_id],
    //         title: chapter.title,
    //         description: chapter.description
    //     };
    // })
    if (chapters.length === 0) {
        return NextResponse.json({ error: "Module_id not found" }, { status: 404 });
    }
    return NextResponse.json(chapters);
}



export async function GetChaptersWithModuleID(module_id: string,user_id:string|null) {

   //  await connectDB();

    // let filter: any = {};
    // if (module_id) {
    //     filter["module_id"] = module_id;
    // }
    // const quizzes = await getQuizGroupCounts()
    // const chapters = await Chapters.find(filter);
    // const modules = await _Modules.find({});
    // const moduleMap: any = {}
    // modules.forEach(module => {
    //     moduleMap[module._id] = module.title;
    // });
   
    // const res = await Promise.all(chapters.map(async chapter => {
    //     const currChapterQuizz : any = quizzes?.filter((quiz)=>quiz.chapter == chapter._id)
    //     let isDone = null
    //     if(user_id)
    //         isDone = await getChapterProgression({chapter_id:chapter._id,user_id})

    //     return {
    //         _id: chapter._id,
    //         module_id: chapter.module_id,
    //         module_name: moduleMap[chapter.module_id],
    //         title: chapter.title,
    //         description: chapter.description,
    //         quizGroups : currChapterQuizz[0]?.groups ? currChapterQuizz[0]?.groups : null,
    //         isDone : isDone?.isDone
    //     };
    // }))

    const chapters = await Chapters.find({module_id , user_id });

    if (chapters.length === 0) {
        return NextResponse.json({ error: "No Chapter found with the given Module ID" }, { status: 404 });
    }
    return NextResponse.json(chapters);
}


export async function UpdateChapterByID(request: NextRequest, chapter_id: string) {
    if (chapter_id == null || chapter_id == '') throw Error('Chapter id is empty or null')

   //  await connectDB()
    const { title, module_id, description } = await request.json()
    const res = await Chapters.findByIdAndUpdate(chapter_id, { title, module_id, description })
    return NextResponse.json({ message: "Chapter updated successfuly", newChapter: res })

}