import connectDB from "@/database/lib/mongodb";
import Users from "@/database/models/users";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const {name , email , password , annee , filiere , profile } : {name:string,email:string,password:string,annee:number,filiere:string,profile:string} = await request.json();
  ////  await connectDB();
  const res = await Users.findByIdAndUpdate(id, {name , email , password , annee , filiere , profile });

  if (res != null) {
    return NextResponse.json({ message: "User Updated successfully" })
  }
  else {
    return NextResponse.json({ message: "no users updated" })
  }
}

// Delete user 
export async function DELETE(request: NextRequest,
  { params }: { params: { id: string } }) {
  const { id } = params
 //  await connectDB()
  const res = await Users.findByIdAndDelete(id)
  if (res != null) {
    return NextResponse.json({ message: "User deleted" })
  }
  else {
    return NextResponse.json({ message: "user Not found" })
  }

}