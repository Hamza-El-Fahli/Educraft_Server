import connectDB from "@/database/lib/mongodb";
import Users from "@/database/models/users";
import { NextRequest, NextResponse } from "next/server";


// PUT      add one user
// GET      select all users
// POST     select one user (check if email and password are correct)
// DELETE   delete a user by id


// Add user 
export async function PUT(request: Request) {
  const { name, email, password, annee, filiere, profile }: { name: string, email: string, password: string, annee: number, filiere: string, profile: string } = await request.json()
  try {
    await connectDB()
    const res = await Users.create({ name, email, password, annee, filiere, profile })
    return NextResponse.json({ message: 'user created', _id: res._id }, { status: 201 })
  } catch (error) {
    console.log(`Error at user creating : ${error}`)
  }
}



// get All users
export async function GET() {
  await connectDB()
  const user = await Users.find()
  return NextResponse.json(user)
}



// Get One user By Email and password
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { email, password, name } = data;
    if (password == "") return NextResponse.json({ error: "Invalid JSON input" }, { status: 404 });
    if (email == '' && name == '') return NextResponse.json({ error: "Invalid JSON input" }, { status: 404 });

    await connectDB();
    let user: any;
    if (name)
      user = await Users.findOne({ password, name });
    else
      user = await Users.findOne({ email, password });

    if (user) {
      return NextResponse.json(user);
    } else {
      return NextResponse.json({ error: "No user found" }, { status: 404 });
    }
  } catch (error: any) {
    console.error("Error:", error.message);
    return NextResponse.json({ error: "Invalid JSON input" }, { status: 404 });
  }
}



