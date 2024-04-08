import mongoose, { Schema, Document, Model } from "mongoose";

interface Progression extends Document {
  user_id: string;
  module_id: string;
  chapter_id: string;
  quizGroup: string;
}

const ProgressionScheme: Schema = new Schema({
  user_id: { type: String, require: true },
  module_id: { type: String, require: true },
  chapter_id: { type: String, require: true },
  quizGroup: { type: String, require: true },
});


const Progression = mongoose.models.ChaptersProgression as Model<Progression> || mongoose.model<Progression>('Progression',ProgressionScheme)
export default Progression