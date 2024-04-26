// import mongoose, { Schema, Document, Model } from "mongoose";

// enum Profile {
//     Admin = 'admin',
//     User = 'user',
//     Prof = 'prof'
// }

// interface IUser extends Document {
//     name: string;
//     email: string;
//     password: string;
//     profile: Profile;
//     annee: Profile;
//     filiere: Profile;
// } 

// const UserSchema: Schema = new Schema({
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     profile: { type: String, enum: Object.values(Profile), default: Profile.User },
//     annee: { type: Number, required: false },
//     filiere: { type: String, required: false },
// }, {
//     timestamps: true
// });

// const Users: Model<IUser> = mongoose.models.Users as Model<IUser> || mongoose.model<IUser>('Users', UserSchema);
// export default Users;
