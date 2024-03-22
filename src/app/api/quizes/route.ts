import connectDB from "@/database/lib/mongodb";
import Chapters from "@/database/models/chapters";
import Courses from "@/database/models/courses";
import _Modules from "@/database/models/modules";
import Quizes from "@/database/models/quizes";
import { NextRequest, NextResponse } from "next/server";



// POST Add quiz 
export async function POST(request: NextRequest) {
    try {
        const { chapter_id, question, correct_answer, answers }:
            { chapter_id: string, question: string, correct_answer: string, answers: string[] } = await request.json()
        await connectDB()
        const res = await Quizes.create({ chapter_id, question, correct_answer, answers })
        return NextResponse.json({ message: 'Quiz Created successfully', _id: res._id })
    } catch (error) {
        return NextResponse.json({ message: 'No Quizes were created', context: error })

    }

}

// GET      select Quizes with specific chapter_id
// note : if no chapter_id, select all
export async function GET(request: NextRequest) {
    const params = (request.nextUrl.searchParams)
    if (!params.has('module_id')) {
        try {
            await connectDB();
            const chapter_id = request.nextUrl.searchParams.get('chapter_id');
            console.log(chapter_id)
            let filter: any = {};
            if (chapter_id) {
                filter["chapter_id"] = chapter_id;
            }
            const quizes = await Quizes.find(filter);
            const courses = await Courses.find({});
            const modules = await _Modules.find({});
            const chapters = await Chapters.find({});

            const courseMap: any = {}
            courses.forEach(course => {
                courseMap[course._id] = course.course_name;
            });
            const moduleMap: any = {}
            modules.forEach(module => {
                moduleMap[module._id] = module;
            });
            const chapterMap: any = {}
            chapters.forEach(chapter => {
                chapterMap[chapter._id] = chapter;
            });



            const res = quizes.map((quiz) => {
                return {
                    _id: quiz._id,
                    question: quiz.question,
                    answers: quiz.answers,
                    correct_answer: quiz.correct_answer,
                    chapter_id: quiz.chapter_id,
                    chapter_name: chapterMap[quiz.chapter_id].title,
                    module_id: chapterMap[quiz.chapter_id].module_id,
                    module_name: moduleMap[chapterMap[quiz.chapter_id].module_id].title,
                    course_id: moduleMap[chapterMap[quiz.chapter_id].module_id].course_id,
                    course_name: courseMap[moduleMap[chapterMap[quiz.chapter_id].module_id].course_id]
                }
            })


            if (res.length === 0 && chapter_id) {
                return NextResponse.json({ error: "Quizes not found" }, { status: 404 });
            }
            return NextResponse.json(res);
        } catch (error) {
            return NextResponse.json({ error: "No Quizes were found", context: error }, { status: 404 });
        }
    }
    if (params.has('module_id')) {
        try {
            const id = params.get('module_id');
            const ajax = await fetch(`http://localhost:3000/api/chapters?module_id=${id}`);
            const chapters = await ajax.json();

            const data: any = []
            await Promise.all(chapters.map(async (chapter: any) => {
                const quiz = await Quizes.find({ "chapter_id": chapter._id });
                if (quiz.length > 0) {
                    data.push({ chapter_name: chapter.title, chapter_id: chapter._id, ...quiz });
                }
                return null;
            }));

            const Results: any = data.filter((result: any) => result !== null);
            return NextResponse.json({ quizzes: Results });

        } catch (error) {
            return NextResponse.json({ error: "No Quizes were found", context: error }, { status: 404 });
        }
    }
}


