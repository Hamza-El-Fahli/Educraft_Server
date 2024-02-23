import connectDB from "@/database/lib/mongodb";
import Users from "@/database/models/users";
import { NextRequest, NextResponse } from "next/server";





// Get user By Email and password
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
  