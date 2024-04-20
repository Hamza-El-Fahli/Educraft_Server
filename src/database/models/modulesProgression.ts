import mongoose, { Schema, Document, Model } from "mongoose";

interface ModulesProgression extends Document {
  module_id: string;
  user_id: string;
}

const ModulesScheme: Schema = new Schema({
  module_id: { type: String, require: true },
  user_id: { type: String, require: true },
}, {
  timestamps: true
});


const ModulesProgression = mongoose.models.ModulesProgression as Model<ModulesProgression> || mongoose.model<ModulesProgression>('ModulesProgression',ModulesScheme)
export default ModulesProgression