import mongoose, { Schema, Document, Model } from "mongoose";

interface IModule extends Document {
    course_id: string;
    title: string;
    description: string;
    order: number;
}

const ModulesSchema: Schema = new Schema({
    course_id: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    order: { type: Number, required: true }
});

const _Modules: Model<IModule> = mongoose.models._Modules as Model<IModule> || mongoose.model<IModule>('_Modules', ModulesSchema);
export default _Modules;
