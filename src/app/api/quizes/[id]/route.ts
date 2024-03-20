import connectDB from "@/database/lib/mongodb";
import Chapters from "@/database/models/chapters";
import Courses from "@/database/models/courses";
import _Modules from "@/database/models/modules";
import Quizes from "@/database/models/quizes";
import { NextRequest, NextResponse } from "next/server";



export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params
    try {
        await connectDB()
        const { question, chapter_id, correct_answer, answers } = await request.json()





        
        const res = await Quizes.findByIdAndUpdate(id, { question, chapter_id, correct_answer, answers })
        let data : any = {}

        if(chapter_id != res?.chapter_id){

            const courses = await Courses.find({});
            const modules = await _Modules.find({});
            const chapters = await Chapters.find({});
    
            const courseMap : any  = {}
            courses.forEach(course => {
                courseMap[course._id] = course.course_name;
            });
            const moduleMap : any  = {}
            modules.forEach(module => {
                moduleMap[module._id] =module;
            });
            const chapterMap : any  = {}
            chapters.forEach(chapter => {
                chapterMap[chapter._id] = chapter;
            });
    
    
    
             data =  {
                    _id : id,
                    chapter_id : chapter_id,
                    chapter_name : chapterMap[chapter_id].title,
                    module_id : chapterMap[chapter_id].module_id,
                    module_name : moduleMap[chapterMap[chapter_id].module_id].title,
                    course_id : moduleMap[chapterMap[chapter_id].module_id].course_id,
                    course_name : courseMap[moduleMap[chapterMap[chapter_id].module_id].course_id]
                }
        }
        console.log(data)
        return NextResponse.json({ message: "Quize updated successfuly" , data })
    } catch (error) {
        return NextResponse.json({ message: "No Quizes were updated", context: error })
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params
    try {
        await connectDB()
        await Quizes.findByIdAndDelete(id)
        return NextResponse.json({ message: "Quize Deleted successfuly" })
    } catch (error) {
        return NextResponse.json({ message: "No Quizes were deleted", context: error })
    }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {

    const id = params.id;
    const ajax = await fetch(`http://localhost:3000/api/chapters?module_id=${id}`);
    const chapters = await ajax.json();

    const data : any = []
     await Promise.all(chapters.map(async (chapter: any) => {
        const quiz = await Quizes.find({ "chapter_id": chapter._id });
        if (quiz.length > 0) {
            data.push({ chapter_name: chapter.title , chapter_id : chapter._id, ...quiz }); 
        }
        return null; 
    }));

    const Results : any = data.filter((result:any) => result !== null); 
    return NextResponse.json({ Results });
}