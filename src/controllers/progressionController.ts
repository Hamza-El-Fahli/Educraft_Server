// // import connectDB from "@/database/lib/mongodb"
// import Progression from "@/database/models/progression"
// import Chapters from "@/database/models/chapters";

// import { NextRequest, NextResponse } from "next/server"

// export async function AddProgress({ user_id, chapter_id, module_id, quizGroup }: { user_id: string, module_id: string, chapter_id: string, quizGroup: string }) {
//  //  await connectDB()
//   const currnetScore = await Progression.findOne({ user_id, chapter_id, module_id, quizGroup })
//   if (currnetScore) {
//     return NextResponse.json({ message: 'Progress user  didnt changed' })
//   }
//   else {
//     await Progression.create({ user_id, chapter_id, module_id, quizGroup })
//     return NextResponse.json({ message: 'NEW Progress user score Create successfully' })
//   }
// }
// export async function GetUserProgress({ user_id, module_id }: { user_id: string, module_id: string }) {
//  //  await connectDB()
//   const userProgress = await getQuizGroupsByChapter({ user_id, module_id })

//   return NextResponse.json(userProgress)




//   // return NextResponse.json({Error:'no Score'},{status:404})
// }




// export async function getQuizGroupsByChapter({ user_id, module_id }: { user_id: string, module_id: string }) {
//   try {
//     const result = await Progression.aggregate([
//       {
//         $match: {
//           module_id,
//           user_id
//         },
//       },
//       {
//         $group: {
//           _id: '$chapter_id',
//           quizGroups: { $push: '$quizGroup' },
//         },
//       },
//       {
//         $project: {
//           _id: 0,
//           chapter_id: '$_id',
//           quizGroups: 1,
//         },
//       },
//     ]);
//     // Transform the result into the desired format
//     const formattedResult: any = {};
//     result.forEach((item) => {
//       formattedResult[item.chapter_id] = item.quizGroups;
//     });

//     return formattedResult;
//   } catch (error) {
//     console.error('Error:', error);
//     return null;
//   }
// }




// export async function getModuleProgression({ user_id, module_id }: { user_id: string, module_id: string }) {
//  //  await connectDB()
//   const passedQuizzes = await getQuizGroupsByChapter({ user_id, module_id })
//   const chapterUnderTheModule = await Chapters.find({ module_id })
//   let numberOfPassedChapters = 0
//   chapterUnderTheModule.map((chapter) => {
//     if (passedQuizzes[chapter._id])
//       if (chapter.quizGroupes == passedQuizzes[chapter._id].length)
//         numberOfPassedChapters += 1
//   })

//   return ({ numberOfPassedChapters, totalOfChapters: chapterUnderTheModule.length })
// }

// export async function getChapterProgression({ chapter_id, user_id }: { chapter_id: string, user_id: string }) {
//   try {
//     const chapter = await Chapters.findById(chapter_id)
//     if (chapter == null) throw Error("Chapter id is not correct")
//     const quizGroupes = await Progression.find({ user_id, chapter_id })
    
//     return {isDone : quizGroupes.length}

//   } catch (error) {
//     return {isDone : null}
//   }
// }