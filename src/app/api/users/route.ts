import connectDB from "@/database/lib/mongodb";
import users from "@/database/models/users";
import { NextResponse } from "next/server";


export async function POST(request:Request){
    const {name , email , password } : {name:string,email:string,password:string} = await request.json()
    try {
        await connectDB()
        await users.create({name , email , password })
        return NextResponse.json({message : 'user created'},{status : 201})
    } catch (error) {
        
    }
}