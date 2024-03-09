import _Modules from "@/database/models/modules";
import Courses from "@/database/models/courses";
import connectDB from "@/database/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";


// POST /api/modules : create new course , body : { corse_id , title, description,  order}
export async function POST(request: NextRequest) {
    try {
        await connectDB()
        const { course_id, title, description, order } = await request.json()
       const res =  await _Modules.create({ course_id, title, description, order })
        return NextResponse.json({ message: "Module created successfuly" , _id : res._id }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error: "No Modules created", contexst: error })
    }

}


// GET      select modules with specific course_id
// note : if no course_id, select all


// export async function GET(request: NextRequest) {
//     try {
//         await connectDB();
//         const course_id =  request.nextUrl.searchParams.get('course_id');
//         console.log(course_id)
//         let filter: any = {};
//         if (course_id) {
//             filter["course_id"] = course_id;
//         }
//         const res = await _Modules.find(filter);
//         if (res.length === 0 && course_id) {
//             return NextResponse.json({ error: "Course_id not found" }, { status: 404 });
//         }
//         return NextResponse.json(res);
//     } catch (error) {
//         return NextResponse.json({ error: "No Modules were found", context: error }, { status: 404 });
//     }
// }

export async function GET(request: NextRequest) {
    try {
        await connectDB();
        const courseId = request.nextUrl.searchParams.get('course_id');
        console.log(courseId);

        let filter: any = {};
        if (courseId) {
            filter["course_id"] = courseId;
        }

        const modules = await _Modules.find(filter)
        const courses = await Courses.find({})
        const courseMap : any  = {}
        courses.forEach(course => {
            courseMap[course._id] = course.course_name;
        });

        const res = modules.map(module=>{
            return {
                _id: module._id,
                course_id : module.course_id,
                course_name : courseMap[module.course_id],
                module_name: module.title,
                order: module.order,
                description: module.description
            };
        })





        if (res.length === 0 && courseId) {
            return NextResponse.json({ error: "No modules found for the specified course ID" }, { status: 404 });
        }

        return NextResponse.json(res.sort((a,b)=>a.order - b.order));
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "An error occurred while fetching modules", context: error }, { status: 500 });
    }
}
