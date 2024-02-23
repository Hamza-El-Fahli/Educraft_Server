import connectDB from "@/database/lib/mongodb";
import Users from "@/database/models/users";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request:Request){
    const {name , email , password } : {name:string,email:string,password:string} = await request.json()
    try {
        await connectDB()
        await Users.create({name , email , password })
        return NextResponse.json({message : 'user created'},{status : 201})
    } catch (error) {
        
    }
}

export async function GET(){
    await connectDB()
    const user = await  Users.find()
    return NextResponse.json(user)
}


export async function DELETE(request:NextRequest){
    const id = request.nextUrl.searchParams.get('id')
    await connectDB()
    const res = await Users.findByIdAndDelete(id)
    if(res != null){
    return NextResponse.json({message : "User deleted"})}
    else{
        return NextResponse.json({message : "user Not found"})}
    
}