import connectDB from "@/database/lib/mongodb";
import Users from "@/database/models/users";
import { NextRequest, NextResponse } from "next/server";


// PUT      add one user
// GET      select all users
// POST     select one user (check if email and password are correct)
// DELETE   delete a user by id


// Add user 
export async function PUT(request:Request){
    const {name , email , password } : {name:string,email:string,password:string} = await request.json()
    try {
        await connectDB()
        await Users.create({name , email , password })
        return NextResponse.json({message : 'user created'},{status : 201})
    } catch (error) {
        console.log(`Error at user creating : ${error}`)
    }
}



// get All users
export async function GET(){
    await connectDB()
    const user = await  Users.find()
    return NextResponse.json(user)
}



// Get One user By Email and password
export async function POST(request: NextRequest) {
    try {
      const data = await request.json();
      const { email, password } = data;
      
      await connectDB();
      const user = await Users.findOne({ email, password });
  
      if (user) {
        return NextResponse.json(user);
      } else {
        return NextResponse.json({ error: "No user found" });
      }
    } catch (error:any) {
      console.error("Error:", error.message);
      return NextResponse.json({ error: "Invalid JSON input" });
    }
  }



// Delete user 
export async function DELETE(request:NextRequest){
    const id = request.nextUrl.searchParams.get('id')
    await connectDB()
    const res = await Users.findByIdAndDelete(id)
    if(res != null){
    return NextResponse.json({message : "User deleted"})}
    else{
        return NextResponse.json({message : "user Not found"})}
    
}