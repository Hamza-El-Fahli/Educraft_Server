import connectDB from "@/database/lib/mongodb"
import Chapters from "@/database/models/chapters"
import Courses from "@/database/models/courses"
import _Modules from "@/database/models/modules"
import Quizes from "@/database/models/quizes"
import { NextRequest, NextResponse } from "next/server"

async function DataMaps(){

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
return {chapterMap,moduleMap,courseMap}
}

export async function PostQuizController(request: NextRequest) {
    const { chapter_id, question, correct_answer, answers }:
        { chapter_id: string, question: string, correct_answer: string, answers: string[] } = await request.json()
    await connectDB()
    const res = await Quizes.create({ chapter_id, question, correct_answer, answers })
    return NextResponse.json({ message: 'Quiz Created successfully', _id: res._id })


}


export async function GetQuizzesWithChapterID(request: NextRequest) {
    await connectDB();
    const chapter_id = request.nextUrl.searchParams.get('chapter_id');
    let filter: any = {};
    if (chapter_id) {
        filter["chapter_id"] = chapter_id;
    }
    if (request.nextUrl.searchParams.has('quiz_group')) {
        filter["group"] = request.nextUrl.searchParams.get('quiz_group');;
    }

    const quizes = await Quizes.find(filter);
    const {chapterMap,moduleMap,courseMap} = await DataMaps()

    const res = quizes.map((quiz) => {

        // Limit options to only 4 options including the correct one
        const NUMBER_OF_OPTIONS_PER_QUIZ = 4
        
            const optionsList =new Set()
            optionsList.add(quiz.correct_answer) // add the correct option
            while(optionsList.size < NUMBER_OF_OPTIONS_PER_QUIZ){
                const testOption = quiz.answers[Math.floor(Math.random()*quiz.answers.length)]
                if(!(optionsList.has(testOption)))    
                        optionsList.add(testOption)
                    }
    
        return {
            _id: quiz._id,
            question: quiz.question,
            answers: Array.from(optionsList),
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
        return NextResponse.json({ error: "Quizes with given Module were not found" }, { status: 404 });
    }
    return NextResponse.json(res);

}


export async function GetAllQuizzes() {
    await connectDB();

    const quizes = await Quizes.find();
    const {chapterMap,moduleMap,courseMap} = await DataMaps()

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

    if (res.length === 0) {
        return NextResponse.json({ error: "No Quizes found" }, { status: 404 });
    }
    return NextResponse.json(res);

}





export async function GetQuizzesWithModuleID(id: string) {
    await connectDB();
    const ajax = await fetch(`http://localhost:3000/api/chapters?module_id=${id}`); // Update this line when write Chapters controllers
    const chapters = await ajax.json();

    const data: any = []
    await Promise.all(chapters.map(async (chapter: any) => {
        const quiz = await Quizes.find({ "chapter_id": chapter._id });
        if (quiz.length > 0) {
            data.push({ chapter_name: chapter.title, chapter_id: chapter._id,group:0, ...quiz });
        }
        return null;
    }));

    const Results: any = data.filter((result: any) => result !== null);
    return NextResponse.json({ quizzes: Results });
}



export async function UpdateQuizByID(request: NextRequest, QuizID: string) {

    await connectDB()
    
    const { question, chapter_id, correct_answer, answers } = await request.json() // get the modufied data 

    const res = await Quizes.findByIdAndUpdate(QuizID, { question, chapter_id, correct_answer, answers }) // update the data
    // res hes the old register data , befor updating
    let data: any = {}

    if (chapter_id != res?.chapter_id) { // if Chapter id chenged , the means the front-end should update chapter module and class of the quiz
        const {chapterMap,moduleMap,courseMap} = await DataMaps()

        data = {
            _id: QuizID,
            chapter_id: chapter_id,
            chapter_name: chapterMap[chapter_id].title,
            module_id: chapterMap[chapter_id].module_id,
            module_name: moduleMap[chapterMap[chapter_id].module_id].title,
            course_id: moduleMap[chapterMap[chapter_id].module_id].course_id,
            course_name: courseMap[moduleMap[chapterMap[chapter_id].module_id].course_id]
        }
    }
    return NextResponse.json({ message: "Quiz Updated successfully", data })

}

export const getQuizGroupCounts = async () => {
    try {
        const result = await Quizes.aggregate([
            { $group: {
                _id: { chapter_id: '$chapter_id', group: '$group' },
                count: { $sum: 1 }
            }},
            { $group: {
                _id: '$_id.chapter_id',
                groups: { $push: { k: '$_id.group', v: '$count' } }
            }},
            { $addFields: {
                groups: { $arrayToObject: '$groups' }
            }},
            { $project: {
                chapter: '$_id',
                groups: 1,
                _id: 0
            }}
        ]);

        return result;
    } catch (err) {
        console.error(err);
        return null;
    }
};