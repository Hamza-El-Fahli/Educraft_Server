import mongoose, { Document, Model, Schema } from "mongoose";


enum LessonType {
    Text = 'text',
    Video = 'video'
}


interface ILesson extends Document {
    chapter_id : string;
    content : string ;
    type : LessonType ;
}

const LessonShema = new Schema({
    chapter_id : String ,
    constent : String,
    type : { type: String, enum: Object.values(LessonType), default: LessonType.Text },
}, {
    timestamps: true
});

const Lessons: Model<ILesson> = mongoose.models.Lessons as Model<ILesson> || mongoose.model<ILesson>('Lessosns', LessonShema);
export default Lessons;

