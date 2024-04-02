import connectDB from "@/database/lib/mongodb"
import Courses from "@/database/models/courses"
import _Modules from "@/database/models/modules"
import ModulesProgression from "@/database/models/modulesProgression";
import { NextRequest, NextResponse } from "next/server"




export async function PostModule(request: NextRequest) {
    try {
        await connectDB();
        const { course_id, title, description, order } = await request.json();
        const res = await _Modules.create({ course_id, title, description, order });
        return NextResponse.json({ message: "Module created successfully", _id: res._id }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to create module" }, { status: 500 });
    }
}


export async function GetAllModules() {
    try{
    await connectDB();
        const modules = await _Modules.find()
        const courses = await Courses.find()
        const courseMap: any = {}
        courses.forEach(course => {
            courseMap[course._id] = course.course_name;
        });
        const res = modules.map(module => {
            return {
                _id: module._id,
                course_id: module.course_id,
                course_name: courseMap[module.course_id],
                module_name: module.title,
                order: module.order,
                description: module.description
            };
        })
        if (res.length === 0 ) {
            return NextResponse.json({ error: "No modules found for the specified course ID" }, { status: 404 });
        }
        return NextResponse.json(res.sort((a, b) => a.order - b.order));
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to get modules" }, { status: 500 });
    }
}

export async function GetModulesWithCourseID(courseId:string|null,user_id:string|null) {
    try{
    await connectDB();
        let filter: any = {};
        if (courseId) {
            filter["course_id"] = courseId;
        }
        const modules = await _Modules.find(filter)
        const courses = await Courses.find({})
        const courseMap: any = {}
        courses.forEach(course => {
            courseMap[course._id] = course.course_name;
        });
        const res =await  Promise.all(modules.map(async (module) => {
            let ModuleProgress = null
            if(user_id)
                 ModuleProgress = await ModulesProgression.findOne({user_id , module_id : module._id})
            return    {
                _id: module._id,
                course_id: module.course_id,
                course_name: courseMap[module.course_id],
                module_name: module.title,
                order: module.order,
                description: module.description,
                progress : ModuleProgress ? ModuleProgress.score : '0'
            };
        }))
        console.log(res)
        if (res.length === 0 && courseId) {
            return NextResponse.json({ error: "No modules found for the specified course ID" }, { status: 404 });
        }
        return NextResponse.json(res.sort((a, b) => a.order - b.order));
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to get modules" }, { status: 500 });
    }
}


export async function UpdateModuleByID(request: NextRequest, module_id: string) {
    try {
        await connectDB();
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
        await connectDB();
        await _Modules.findByIdAndDelete(module_id);
        return NextResponse.json({ message: "Module deleted successfully" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to delete module" }, { status: 500 });
    }
}