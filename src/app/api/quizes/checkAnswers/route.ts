import { AddProgress } from "@/controllers/progressionController";
import connectDB from "@/database/lib/mongodb";
import Quizes from "@/database/models/quizes";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest) {
   try{ await connectDB()
    const {
        answers,
        user_id,
        module_id,
        quizGroup,
        chapter_id,
      } = await request.json()
    const results = await Promise.all(answers.map(async (answerObj:any) => {
        const quiz = await Quizes.findById(answerObj.quiz_id);
        if(quiz == null) throw Error('Error while manipulating the answers')

        return {
            quiz_question: quiz.question,
            isCorrect: quiz.correct_answer === answerObj.answer
        };
    }));

    if(results.every((res=>res.isCorrect))) 
        AddProgress({
            user_id,
            module_id,
            quizGroup,
            chapter_id,
          })

        return NextResponse.json(results)
}
catch(err){
    return NextResponse.json({error : err},{status: 404})
}

}