import mongoose , { Schema} from "mongoose";

const CoursesSchema = new Schema({
        course_name: String,
        description: String,
        instructor: String,
},{
    timestamps : true
})

const Courses = mongoose.models.Courses || mongoose.model('Courses' , CoursesSchema)
export default Courses