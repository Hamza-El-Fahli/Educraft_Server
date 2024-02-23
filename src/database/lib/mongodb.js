import mongoose from "mongoose";


const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('connected')

    } catch (error) {
        console.error(error)
    }
}


export default connectDB