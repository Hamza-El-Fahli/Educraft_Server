import mongoose, { Schema, Document, Model } from "mongoose";

interface ChaptersProgression extends Document {
  chapter_id: string;
  user_id: string;
  score: string;
}

const ChaptersScheme: Schema = new Schema({
  chapter_id: { type: String, require: true },
  user_id: { type: String, require: true },
  score: { type: String, require: true },
});


const ChaptersProgression = mongoose.models.ChaptersProgression as Model<ChaptersProgression> || mongoose.model<ChaptersProgression>('ChaptersProgression',ChaptersScheme)
export default ChaptersProgression