import Chapters from "@/database/models/chapters";
import { NextRequest, NextResponse } from "next/server";
import _Modules from "@/database/models/modules";
import { GetAllChapters, GetChaptersWithModuleID, PostChapter } from "@/controllers/chaptersControlllers";


// POST /api/chapters : create new course , body : { module_id , title, description}
export async function POST(request: NextRequest) {
    try {
        return PostChapter(request)
    } catch (error) {
        return NextResponse.json({ error: "Error while handeling request", contexst: error })
    }

}


// GET      select chapters with specific module_id
// note : if no module_id, select all
export async function GET(request: NextRequest) {
    const params = request.nextUrl.searchParams
    if (params.has('module_id')) {

        const module_id = params.get('module_id')
        const user_id = params.get('user_id')

        if (module_id == null || module_id == '')
            return NextResponse.json({ error: "Module_id is empty or invalid" }, { status: 404 });
        else
            try {
                return GetChaptersWithModuleID(module_id,user_id)
            }
            catch (error) {
                return NextResponse.json({ error: "No Chapters with Given Module id were found", context: error }, { status: 404 });
            }
    }
    else {
        try {
            return GetAllChapters()
        }
        catch (error) {
            return NextResponse.json({ error: "No Chapters were found", context: error }, { status: 404 });
        }

    }
}
