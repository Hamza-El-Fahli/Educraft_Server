import Users from "@/database/models/users";
import { IUser } from "@/types/types";
import { NextRequest, NextResponse } from "next/server";
import JWT from "@/services/jwt";
import { jwtVerify } from 'jose';
import { secret } from "@/services/secret";

const secretKey = new TextEncoder().encode(secret);

// PUT      add one user
// GET      select all users
// POST     select one user (check if email and password are correct)
// DELETE   delete a user by id


// Add user 
export async function PUT(request: NextRequest) {
  const { name, email, password, annee, filiere, profile }: { name: string, email: string, password: string, annee: number, filiere: string, profile: string } = await request.json()
  try {
   console.log(profile)
    const res = await Users.create({ name, email, password, annee, filiere, profile })
    return NextResponse.json({ message: 'user created', _id: res._id }, { status: 201 })
  } catch (error) {
    console.log(`Error at user creating : ${error}`)
  }
}



// get All users
export async function GET(request: NextRequest) {

  let currentUser_id : any= request.cookies.get('currentUser')?.value
  if(currentUser_id){
    currentUser_id = JSON.parse(currentUser_id)._id
  }else{
    currentUser_id = null
  }
  const user = await Users.find(currentUser_id)
  return NextResponse.json(user)
}



// Get One user By Email and password
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { email, password, name } = data;
    if (!email && !name) {
      return NextResponse.json({ error: "Empty identifier field" }, { status: 404 });
    }
    if (!password) {
      return NextResponse.json({ error: "Empty Password field" }, { status: 404 });
    }

    let user: IUser | null;
    if (name) {
      user = await Users.findOne({ name });
    } else {
      user = await Users.findOne({ email });
    }
    if (!user) {
      return NextResponse.json({ error: "User Not found" }, { status: 404 });
    }
    const isPasswordCorrect = password == user.password;
    if (!isPasswordCorrect) {
      return NextResponse.json({ error: "Incorrect password" }, { status: 404 });
    }
    await Users.LastAccess({_id : user._id})
    const accessToken = await JWT({ _id: user._id, name: user.name, profile: user.profile })
    const resUser: IUser = {
      _id: user._id,
      name: user.name,
      profile: user.profile,
      filiere: user.filiere,
      annee: user.annee,
      email: user.email,
      password: user.password,
      lastActivity : user.lastActivity,
      accessToken: accessToken
    }
    console.log(resUser)

    return NextResponse.json(resUser);
  } catch (error: any) {
    console.error("Error:", error.message);
    return NextResponse.json({ error: "Invalid JSON input" }, { status: 404 });
  }
}







function testPayload(decode: any, currentUser: any) {
  return (decode.payload._id == JSON.parse(currentUser)._id && // id didn't change
    decode.payload.name == JSON.parse(currentUser).name && // username didn't change
    decode.payload.profile == JSON.parse(currentUser).profile && // user profile/privilages didn't change
    (decode.payload.profile == 'prof' || decode.payload.profile == 'admin')) // admins and profs are allowed , app users not allowed into this server side
}
