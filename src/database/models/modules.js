import mongoose,{Schema} from "mongoose";


const ModulesSchema = new Schema({
    course_id: String ,
    title: String,
      description: String,
      order: Number,
})


const _Modules = mongoose.models._Modules || mongoose.model('_Modules',ModulesSchema)
export default _Modules