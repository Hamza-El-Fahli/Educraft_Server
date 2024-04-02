import _Modules from "@/database/models/modules";
import Courses from "@/database/models/courses";
import connectDB from "@/database/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { GetAllModules, GetModulesWithCourseID, PostModule } from "@/controllers/modulesControllers";


// POST /api/modules : create new course , body : { corse_id , title, description,  order}
export async function POST(request: NextRequest) {
    try {
        return PostModule(request)
    } catch (error) {
        return NextResponse.json({ error: "No Modules created", contexst: error })
    }

}


// GET      select modules with specific course_id
// note : if no course_id, select all

export async function GET(request: NextRequest) {
    try {
        const params = request.nextUrl.searchParams
        //     const currentUser = request.cookies.get('currentUser')?.value
        //    const user_id =  JSON.parse(currentUser||'')._id

        const user_id = params.get('user_id')

        if (params.has('course_id')) {
            const courseId = params.get('course_id')
            if (courseId == null || courseId == '') {
                throw Error('Course id either null or empty')
            }
            else
                return GetModulesWithCourseID(courseId,user_id)
        }
        else {
            return GetAllModules()
        }

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "An error occurred while fetching modules", context: error }, { status: 500 });
    }
}
