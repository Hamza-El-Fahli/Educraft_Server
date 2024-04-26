// import mongoose, { Model, Document, Schema } from "mongoose";


// interface IQuiz extends Document {
//     chapter_id: string;
//     question: string;
//     correct_answer: string;
//     answers: string[];
//     group:string;
// }


// const QuizSchema = new Schema<IQuiz>({

//     chapter_id: { type: String, required: true },
//     question: { type: String, required: true },
//     correct_answer: { type: String, required: true },
//     group: { type: String, required: true },
//     answers: { type: [String], required: true },
// }, {
//     timestamps: true
// })

// const Quizes: Model<IQuiz> = mongoose.models.Quizes as Model<IQuiz> || mongoose.model('Quizes', QuizSchema)


// export default Quizes
