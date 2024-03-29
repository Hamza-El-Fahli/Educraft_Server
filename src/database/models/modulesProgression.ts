import mongoose, { Schema, Document, Model } from "mongoose";

interface ModulesProgression extends Document {
  chapter_id: string;
  user_id: string;
  score: string;
}

const ModulesScheme: Schema = new Schema({
  module_id: { type: String, require: true },
  user_id: { type: String, require: true },
  score: { type: String, require: true },
});


const ModulesProgression = mongoose.models.ModulesProgression as Model<ModulesProgression> || mongoose.model<ModulesProgression>('ModulesProgression',ModulesScheme)
export default ModulesProgression