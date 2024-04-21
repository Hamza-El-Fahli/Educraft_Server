import mongoose, { Document, Model, Schema } from "mongoose";

enum ALimetationType {
    Text = 'text',
    Video = 'video',
    PDF = 'pdf'
}

interface IALimetation extends Document {
    chapter_id: string;
    content: string;
    type: ALimetationType;
}

const ALimetationSchema = new Schema({
    chapter_id: String,
    content: String,
    type: { type: String, enum: Object.values(ALimetationType), default: ALimetationType.Text },
}, {
    timestamps: true
});

const ALimetation: Model<IALimetation> = mongoose.models.ALimetation as Model<IALimetation> || mongoose.model<IALimetation>('ALimetation', ALimetationSchema);

export default ALimetation;
