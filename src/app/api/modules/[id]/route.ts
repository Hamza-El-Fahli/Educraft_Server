import { DeleteModuleById, UpdateModuleByID } from "@/controllers/modulesControllers";
import _Modules from "@/database/models/modules";
import { NextRequest, NextResponse } from "next/server";

// DELETE delete module by id
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params
    try {
        return DeleteModuleById(id)
    } catch (error) {
        return NextResponse.json({ message: "Error while handeling Module deleting request", context: error })
    }
}

// PUT update module by id
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const module_id = params.id
        return UpdateModuleByID(request,module_id)
    } catch (error) {
        return NextResponse.json({ message: "Error while handeling the Module updating request", context: error })

    }
}