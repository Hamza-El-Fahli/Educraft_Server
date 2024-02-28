import mongoose, { Schema, Document, Model } from "mongoose";

interface ICourses extends Document {
    course_name: string;
    description: string;
    instructor: string;
}

const CoursesSchema: Schema = new Schema({
    course_name: { type: String },
    description: { type: String },
    instructor: { type: String },
}, {
    timestamps: true
});

const Courses: Model<ICourses> = mongoose.models.Courses as Model<ICourses> || mongoose.model<ICourses>('Courses', CoursesSchema);
export default Courses;
