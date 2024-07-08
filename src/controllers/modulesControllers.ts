import Courses from "@/database/models/courses"
import _Modules from "@/database/models/modules"
import { NextRequest, NextResponse } from "next/server"
import { ICourse, IModule } from "@/types/types";




export async function PostModule(request: NextRequest) {
    try {
        const { course_id, title, description, order } = await request.json();
        const res = await _Modules.create({ course_id, title, description, order });
        return NextResponse.json({ message: "Module created successfully", _id: res._id }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to create module" }, { status: 500 });
    }
}


export async function GetAllModules() {
    try {
        const modules = await _Modules.find()
        const courses = await Courses.find()
        const courseMap: any = {}
        courses.forEach((course:ICourse) => {
            courseMap[course._id] = course.course_name;
        });
        const res = modules.map((module:IModule) => {
            return {
                _id: module._id,
                course_id: module.course_id,
                course_name: courseMap[module.course_id],
                title: module.title,
                order: module.order,
                description: module.description
            };
        })
        if (res.length === 0) {
            return NextResponse.json({ error: "No modules found for the specified course ID" }, { status: 404 });
        }
        return NextResponse.json(res.sort((a:any, b:any) => a.order - b.order));
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to get modules" }, { status: 500 });
    }
}

export async function GetModulesWithCourseID(courseId: string | null, user_id: string | null) {
    try {
       
        const res = await _Modules.find({ course_id: courseId , user_id : user_id })

        if (res.length === 0 && courseId) {
            return NextResponse.json({ error: "No modules found for the specified course ID" }, { status: 404 });
        }
        return NextResponse.json(res/*.sort((a, b) => a.order - b.order)*/);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to get modules" }, { status: 500 });
    }
}


export async function UpdateModuleByID(request: NextRequest, module_id: string) {
    try {
        const { course_id, title, description, order } = await request.json();
        await _Modules.findByIdAndUpdate(module_id, { course_id, title, description, order });
        return NextResponse.json({ message: "Module updated successfully" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to update module" }, { status: 500 });
    }
}


export async function DeleteModuleById(module_id: string) {
    try {
        await _Modules.findByIdAndDelete(module_id);
        return NextResponse.json({ message: "Module deleted successfully" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to delete module" }, { status: 500 });
    }
}