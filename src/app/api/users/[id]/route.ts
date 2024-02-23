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
