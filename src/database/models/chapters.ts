import mongoose, { Schema, Document, Model } from "mongoose";

interface IChapter extends Document {
  module_id: string;
  title: string;
  description: string;
}

const ChaptersScheme: Schema = new Schema({
  module_id: { type: String, require: true },
  title: { type: String, require: true },
  description: { type: String, require: true },
});


const Chapters = mongoose.models.Chapters as Model<IChapter> || mongoose.model<IChapter>('Chapters',ChaptersScheme)
