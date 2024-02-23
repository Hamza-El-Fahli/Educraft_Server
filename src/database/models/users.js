import mongoose, {Schema, mongo} from "mongoose";


const UserSchema= new Schema({
    name : String,
    email : String,
    password : String,
    profile: {
        type: String,
        enum: ['admin', 'user', 'prof'],
        default: 'user'
      }
    },{
        timestamps : true
    }
    )

const users = mongoose.models.users || mongoose.model('Users' , UserSchema)
export default users