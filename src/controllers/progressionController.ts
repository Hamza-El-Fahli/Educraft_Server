import connectDB from "@/database/lib/mongodb"
import ChaptersProgression from "@/database/models/chaptersProgression"
import ModulesProgression from "@/database/models/modulesProgression"
import { NextRequest, NextResponse } from "next/server"

export async function AddChapterProgress({ user_id, chapter_id, score }: { user_id: string, chapter_id: string, score?: string }) {
    await connectDB()
    const currnetScore = await ChaptersProgression.findOne({ user_id, chapter_id })
    if (currnetScore) {
        if (score && score > currnetScore.score) {
            await ChaptersProgression.findOneAndUpdate(currnetScore._id, { score })
            return NextResponse.json({ message: 'Chapter user score updated successfully' })
        }
        return NextResponse.json({ message: 'Chapter user score didnt changed' })
    }
    else 
    {
        await ChaptersProgression.create({ user_id, chapter_id, score: score || 0 })
        return NextResponse.json({ message: 'NEW Chapter user score Create successfully' })
    }
}
export async function AddModuleProgress({ user_id, module_id, score }: { user_id: string, module_id: string, score?: string }) {
    await connectDB()
    const currnetScore = await ModulesProgression.findOne({ user_id, module_id })
    if (currnetScore) {
        if (score && score > currnetScore.score) {
            await ModulesProgression.findOneAndUpdate(currnetScore._id, { score })
            return NextResponse.json({ message: 'Module user score updated successfully' })
        }
        return NextResponse.json({ message: 'Module user score didnt changed' })
    }
    else {
        await ModulesProgression.create({ user_id, module_id, score: score || 0 })
        return NextResponse.json({ message: 'NEW Module user score Create successfully' })
    }
}