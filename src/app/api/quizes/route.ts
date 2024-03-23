import { GetAllQuizzes, GetQuizzesWithChapterID, GetQuizzesWithModuleID, PostQuizController } from "@/controllers/quizzesControllers";
import connectDB from "@/database/lib/mongodb";
import Chapters from "@/database/models/chapters";
import Courses from "@/database/models/courses";
import _Modules from "@/database/models/modules";
import Quizes from "@/database/models/quizes";
import { NextRequest, NextResponse } from "next/server";



// POST Add quiz 
export async function POST(request: NextRequest) {
    try {
        return PostQuizController(request)
    } catch (error) {
        return NextResponse.json({ message: 'No Quizes were created', context: error })

    }
}

// GET      select Quizes with specific chapter_id
// note : if no chapter_id, select all
export async function GET(request: NextRequest) {
    const params = (request.nextUrl.searchParams)

    if (params.has('module_id')) {
        try {
            const ModuleID: string | null = params.get('module_id');
            if (!!ModuleID)
                return GetQuizzesWithModuleID(ModuleID)
            else
                return NextResponse.json({ error: "Module Id is not correct or empty" }, { status: 404 });

        } catch (error) {
            return NextResponse.json({ error: "Problem While handling request", context: error }, { status: 404 });
        }
    }
    else {
        try {
            if (params.has('chapter_id')) return GetQuizzesWithChapterID(request)
            else return GetAllQuizzes()
        } catch (error) {
            return NextResponse.json({ error: "Problem While handling request", context: error }, { status: 404 });
        }
    }
}


