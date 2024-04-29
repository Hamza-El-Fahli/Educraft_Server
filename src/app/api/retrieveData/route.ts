import pool from "@/database/lib/mariadb";
import Chapters from "@/database/models/chapters";
import Courses from "@/database/models/courses";
import Modules from "@/database/models/modules";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const conn = await pool.getConnection();

    const courses = request.nextUrl.searchParams.get('courses')
    const modules = request.nextUrl.searchParams.get('modules')
    const chapters = request.nextUrl.searchParams.get('chapters')
    const res: any = {};
    if (courses == '1') res.courses = await conn.query('SELECT * FROM courses');
    if (modules == '1') res.modules = await conn.query('SELECT * FROM modules');
    if (chapters == '1') res.chapters = await conn.query('SELECT * FROM chapters');
    conn.release();
    return NextResponse.json(res)
}