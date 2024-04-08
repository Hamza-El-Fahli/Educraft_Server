import connectDB from "@/database/lib/mongodb";
import ModulesProgression from "@/database/models/modulesProgression";
import { NextRequest, NextResponse } from "next/server";




export async function POST(request: NextRequest) {
    const { user_id, score, module_id } = await request.json()
    try {
        await connectDB()
        const old = await ModulesProgression.findOne({ user_id, module_id })
        if (old) {
            await ModulesProgression.findByIdAndUpdate(old._id, { score })
            return NextResponse.json(old)
        }
        const res = await ModulesProgression.create({ user_id, module_id, score })
        return NextResponse.json(res)
    } catch (error) {

        return NextResponse.json({ error: 'Didnt specify module or chapter' }, { status: 404 })
    }
}
export async function GET(request: NextRequest) {
    try {
        await connectDB()
        const res = await ModulesProgression.find()
        return NextResponse.json(res)
    } catch (error) {

        return NextResponse.json({ error: 'Didnt specify module or chapter' }, { status: 404 })
    }
}