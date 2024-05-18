import { API_Storage_Server } from "@/configuration/API";
import ALimetation from "@/database/models/lessons";
import { NextRequest, NextResponse } from "next/server";



export async function POST(request: NextRequest) {
    const formData = await request.formData();
    const chapter_id = formData.get('Chapter_id');
    const { path } = await fetch(`${API_Storage_Server}/upload`, {
        method: "POST",
        body: formData
    }).then(res => res.json());


    try {
        // Create a new Lesson document
        const exists = await ALimetation.findOne({chapter_id:chapter_id})
if(exists == null){
         await ALimetation.create({
            chapter_id,
            content: API_Storage_Server + '/' + path,
            type: 'pdf'
        });
        return NextResponse.json({ message: 'created' });

    } 
    else{
        await ALimetation.findByIdAndUpdate(exists._id,{
            // chapter_id,
            content: API_Storage_Server + '/' + path,
            type: 'pdf'
        })
        return NextResponse.json({ message: 'updated' });

    }

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to create lesson' }, { status: 500 });
    }
}


export async function GET(request:NextRequest){
    const chapter_id = request.nextUrl.searchParams.get('chapter_id')
    if(!!chapter_id){
        const {imageUrls,error} = await fetch(`${API_Storage_Server}/view/${chapter_id}`).then(res=>res.json()).catch((err)=>{console.log('storage server error')})
        if(error){
            return NextResponse.json(error,{status:500})
        }
        return NextResponse.json(imageUrls)
    }
    else{
        return NextResponse.json({error : "No chapter_id"},{status:500})
    }
}
