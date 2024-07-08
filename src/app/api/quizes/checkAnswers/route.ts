// import { AddProgress } from "@/controllers/progressionController";
import { CheckAnswers } from "@/controllers/quizzesControllers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest) {
   try{
    const {
        answers,
        user_id,
        module_id,
        quizGroup,
        chapter_id,
      } = await request.json()
    const result = await CheckAnswers({
      answers,
      user_id,
      module_id,
      quizGroup,
      chapter_id,
    })
        return NextResponse.json(result)
}
catch(err){
    return NextResponse.json({error : err},{status: 404})
}

}