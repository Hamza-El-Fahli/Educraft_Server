import pool from "@/database/lib/mariadb";
import Chapters from "@/database/models/chapters";
import Courses from "@/database/models/courses";
import Modules from "@/database/models/modules";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {

    const courses = request.nextUrl.searchParams.get('courses')
    const modules = request.nextUrl.searchParams.get('modules')
    const chapters = request.nextUrl.searchParams.get('chapters')
    const res: any = {};
    if(courses || modules || chapters){
        let queries = [];
        if (courses == '1') queries.push('SELECT * FROM courses');
        if (modules == '1') queries.push('SELECT * FROM modules');
        if (chapters == '1') queries.push('SELECT * FROM chapters');
    
        const combinedQuery = queries.join('; ');
    
        try {
            const conn = await pool.getConnection();

            const results = await conn.query(combinedQuery);
            if(Array.isArray(results[0])){
            if (courses == '1') res.courses = results.shift();
            if (modules == '1') res.modules = results.shift();
            if (chapters == '1') res.chapters = results.shift();}
            else
                res.courses = results
            conn.release();
            return NextResponse.json(res)
        } catch (error) {
            console.error('Database query error:', error);
            return NextResponse.json({error:"Database Error"},{status:404})

        }
}
    else{
        return NextResponse.json({error:null},{status:404})

    }
}