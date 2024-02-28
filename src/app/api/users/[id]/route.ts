import connectDB from "@/database/lib/mongodb";
import Users from "@/database/models/users";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const {
    name,
    email,
    password,
  }: { name: string; email: string; password: string } = await request.json();
  await connectDB();
  const res = await Users.findByIdAndUpdate(id, { name, email, password });
  return NextResponse.json(res);
}

// Delete user 
export async function DELETE(request: NextRequest,
  { params }: { params: { id: string } }) {
  const { id } = params
  await connectDB()
  const res = await Users.findByIdAndDelete(id)
  if (res != null) {
    return NextResponse.json({ message: "User deleted" })
  }
  else {
    return NextResponse.json({ message: "user Not found" })
  }

}