import connectDB from "@/database/lib/mongodb";
import _Modules from "@/database/models/modules";
import { NextRequest, NextResponse } from "next/server";

// DELETE delete module by id
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params
    try {
        await connectDB()
        await _Modules.findByIdAndDelete(id)
        return NextResponse.json({ message: "Module deleted successfuly" })
    } catch (error) {
        return NextResponse.json({ message: "No modules deleted", context: error })
    }
}

// PUT update module by id
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectDB()
        const { id } = params
        const { new_title, new_desciption, new_order } = await request.json()

        await _Modules.findByIdAndUpdate(id, { title: new_title, description: new_desciption, order: new_order })
        return NextResponse.json({ message: "Module updated successfuly" })


    } catch (error) {
        return NextResponse.json({ message: "No modules updated", context: error })

    }
}