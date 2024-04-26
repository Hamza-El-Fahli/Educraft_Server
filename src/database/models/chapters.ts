// import mongoose, { Schema, Document, Model } from "mongoose";

// interface IChapter extends Document {
//   module_id: string;
//   title: string;
//   description: string;
//   quizGroupes : number; // count the number of tests groups under this chapter
// }

// const ChaptersScheme: Schema = new Schema({
//   module_id: { type: String, require: true },
//   title: { type: String, require: true },
//   description: { type: String, require: true },
//   quizGroupes: { type: Number,default:0, require: false },
// });


// const Chapters = mongoose.models.Chapters as Model<IChapter> || mongoose.model<IChapter>('Chapters',ChaptersScheme)
// export default Chapters