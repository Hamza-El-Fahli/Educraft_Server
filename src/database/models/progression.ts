import mongoose, { Schema, Document, Model } from "mongoose";

interface Progression extends Document {
  user_id: string;
  module_id: string;
  chapter_id: string;
  quizGroup: number;
}

const ProgressionScheme: Schema = new Schema({
  user_id: { type: String, require: true },
  module_id: { type: String, require: true },
  chapter_id: { type: String, require: true },
  quizGroup: { type: Number, require: true },
}, {
  timestamps: true
});


const Progression = mongoose.models.Progression as Model<Progression> || mongoose.model<Progression>('Progression',ProgressionScheme)
export default Progression