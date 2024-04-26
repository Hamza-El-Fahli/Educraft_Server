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

import pool from "./../lib/mariadb";

const Users :any = {};

Users.findOne = async(data)=>{
    let nameOrEmail = data.name ? data.name : data.email ;
    
    const query = `SELECT * FROM users WHERE name = '${nameOrEmail}' OR email = '${nameOrEmail}' LIMIT 1`;

    let conn ;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query(query);
        conn.release();
        return rows[0]
    } catch (error) {
        console.error('Error:', error);
        return null
    }
    }
Users.find =async (data:null|any)=>{
    let conn ;
    try {
        conn = await pool.getConnection();
        let rows;
        if(data==null)
         rows = await conn.query('SELECT * FROM users');
        conn.release();
        return rows
    } catch (error) {
        console.error('Error:', error);
        return null
    }
}

Users.create = ()=>{
    
}
Users.findByIdAndUpdate = async (id, {name , email , password , annee , filiere , profile })=>{
    let conn ;
    const query = `UPDATE users
    SET name = '${name}',
        email = '${email}',
        password = '${password}',
        annee = '${annee}',
        filiere = '${filiere}',
        profile = '${profile}'
    WHERE _id = ${id};`;

    try {
        conn = await pool.getConnection();
        let rows;
        rows = await conn.query(query);
        conn.release();
        if(rows.affectedRows>0)
        return rows
    else
    return null
    } catch (error) {
        console.error('Error:', error);
        return null
    }
}

Users.findByIdAndDelete =async (id:string)=>{
    let conn ;
    const query = `DELETE FROM users    WHERE _id = ${id};
    `;

    try {
        conn = await pool.getConnection();
        let rows;
        rows = await conn.query(query);
        conn.release();
        if(rows.affectedRows>0)
        return rows
    else
    return null
    } catch (error) {
        console.error('Error:', error);
        return null
    }
}


export default Users