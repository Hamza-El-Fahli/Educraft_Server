import pool from "@/database/lib/mariadb"
import Chapters from "@/database/models/chapters"
import _Modules from "@/database/models/modules"
import Quizes from "@/database/models/quizes"
import { IChapter, ICourse, IModule, IQuizz } from "@/types/types"
import { NextRequest, NextResponse } from "next/server"

async function DataMaps() {

    const conn = await pool.getConnection();
    const courses = await conn.query(`SELECT * FROM courses `);
    const modules = await conn.query(`SELECT * FROM modules `);
    const chapters = await conn.query(`SELECT * FROM chapters `);
    conn.release();

    const courseMap: any = {}
    courses.forEach((course: ICourse) => {
        courseMap[course._id] = course.course_name;
    });
    const moduleMap: any = {}
    modules.forEach((module: IModule) => {
        moduleMap[module._id] = module;
    });
    const chapterMap: any = {}
    chapters.forEach((chapter: IChapter) => {
        chapterMap[chapter._id] = chapter;
    });
    return { chapterMap, moduleMap, courseMap }
}

export async function PostQuizController(request: NextRequest) {
    const { chapter_id, question, correct_answer, answers, group }:
        { chapter_id: string, question: string, correct_answer: string, answers: string[], group: number } = await request.json()
    const res = await Quizes.create({ chapter_id, question, correct_answer, answers, quiz_group: group })
    const chapter = await Chapters.findById(chapter_id)
    if (chapter && chapter.quizGroupes <= group) {
        await Chapters.findByIdAndUpdate(chapter._id, { quizGroupes: group + 1 })
    }
    return NextResponse.json({ message: 'Quiz Created successfully', _id: res._id })


}


export async function GetQuizzesWithChapterID(request: NextRequest) {
    const chapter_id = request.nextUrl.searchParams.get('chapter_id');
    let filter: any = {};
    filter["chapter_id"] = chapter_id;
    filter["quiz_group"] = request.nextUrl.searchParams.get('quiz_group');;


    const quizes = await Quizes.find(filter);
    const { chapterMap, moduleMap, courseMap } = await DataMaps()

    const res = quizes.map((quiz: IQuizz) => {

        // Limit options to only 4 options including the correct one
        const NUMBER_OF_OPTIONS_PER_QUIZ = 4
        let safetyCounter = 0 // to avoid infinit loop in case oprions are less than 4
        const optionsList = new Set()
        optionsList.add(quiz.correct_answer) // add the correct option
        while (optionsList.size != NUMBER_OF_OPTIONS_PER_QUIZ ) {
            const JsonAnswers : any = quiz.answers
            let options
            try {
                 options = JSON.parse(JsonAnswers)   
            } catch (error) {
                  options = JsonAnswers.split(',') 
            }
            const testOptions = options.sort(() => (Math.random() - 0.5))
            const testOption = testOptions[0]
            if (!(optionsList.has(testOption)))
                optionsList.add(testOption)
            safetyCounter++
        }
        const arrOptions = Array.from(optionsList)
        const shuffledOprions = shuffleArray(arrOptions)

        return {
            _id: quiz._id,
            question: quiz.question,
            group: quiz.group,
            answers: shuffledOprions ,
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

    const quizes = await Quizes.find();
    const { chapterMap, moduleMap, courseMap } = await DataMaps()

    const res = quizes.map((quiz: IQuizz) => {
        const JsonAnswers : any = quiz.answers

        return {
            _id: quiz._id,
            question: quiz.question,
            group: quiz.group,
            answers: JSON.parse(JsonAnswers),
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
   

    const Results = await Quizes.find({ module_id: id });

    return NextResponse.json({ quizzes: Results });
}



export async function UpdateQuizByID(request: NextRequest, QuizID: string) {


    const { question, chapter_id, correct_answer, answers, group } = await request.json() // get the modufied data 
    const res = await Quizes.findByIdAndUpdate(QuizID, { question, chapter_id, correct_answer, answers, group }) // update the data
    // res hes the old register data , befor updating
    let data: any = {}

    if (chapter_id != res?.chapter_id) { // if Chapter id chenged , the means the front-end should update chapter module and class of the quiz
        const { chapterMap, moduleMap, courseMap } = await DataMaps()

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
            {
                $group: {
                    _id: { chapter_id: '$chapter_id', group: '$group' },
                    count: { $sum: 1 }
                }
            },
            {
                $group: {
                    _id: '$_id.chapter_id',
                    groups: { $push: { k: '$_id.group', v: '$count' } }
                }
            },
            {
                $addFields: {
                    groups: { $arrayToObject: '$groups' }
                }
            },
            {
                $project: {
                    chapter: '$_id',
                    groups: 1,
                    _id: 0
                }
            }
        ]);

        return result;
    } catch (err) {
        console.error(err);
        return null;
    }
};


type Answer = {
    answers: { quiz_id: number, answer: string }[],
    user_id: number,
    module_id: number,
    quizGroup: number,
    chapter_id: number,
}
export async function CheckAnswers({
    answers,
    user_id,
    module_id,
    quizGroup,
    chapter_id,
}: Answer) {

    let rows: { _id: number, question: string, correct_answer: string }[];

    try {
        const conn = await pool.getConnection();
        const quizIds = answers.map(item => item.quiz_id).join(', '); // Get quiz IDs for IN clause
        const sqlQuery = `SELECT _id,question, correct_answer FROM quiz WHERE _id IN (${quizIds})`;
        rows = await conn.query(sqlQuery);

        // Check if provided answers match correct answers
        const results = answers.map(answer => {
            const correctAnswer = rows.find(item => (item._id == answer.quiz_id));
            return {
                quiz_id: answer.quiz_id,
                quiz_question: correctAnswer?.question,
                isCorrect: correctAnswer ? correctAnswer.correct_answer === answer.answer ? true : false : false
            }
        })
        if (results.every(item => item.isCorrect)) {
            const sqlQuery2 = `INSERT INTO progression (_id, user_id, chapter_id, Completed_quizGroup) VALUES (NULL, '${user_id}', '${chapter_id}', '${quizGroup}');`;
            conn.query(sqlQuery2);
        }

        conn.release();
        return results
    } catch (error) {
        console.error('Error:', error);
        return null
    }



}



function shuffleArray(array:string|any) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // Generate random index
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
  }