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

const Users: any = {};
Users.findOne = async (data: { name?: string, email?: string }) => {
    let nameOrEmail = data.name ? data.name : data.email;

    const query = `SELECT * FROM users WHERE name = '${nameOrEmail}' OR email = '${nameOrEmail}' LIMIT 1`;

    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query(query);

        let lastActivityQuery = `SELECT *
                                    FROM progression
                                    WHERE user_id = '${rows[0]._id}'
                                    ORDER BY createdAt DESC
                                    LIMIT 1`;
        const lastActivity = await conn.query(lastActivityQuery);
        conn.release(); // Release the connection after executing all queries

        if (lastActivity.length != 0)
            rows[0].lastActivity = lastActivity[0].createdAt;
        else
            rows[0].lastActivity = rows[0].createdAt;
        
        return rows[0];
    } catch (error) {
        console.error('Error:', error);
        if (conn) conn.release(); // Make sure to release the connection in case of an error
        return null;
    }
}

Users.find = async (data: null | any) => {
    let conn;
    try {
        conn = await pool.getConnection();
        let rows;
        if (data == null)
            rows = await conn.query('SELECT * FROM users');
        conn.release();
        return rows
    } catch (error) {
        console.error('Error:', error);
        return null
    }
}

Users.create = async ({ name, email, password, annee, filiere, profile }: { name: string, email: string, password: string, annee: number, filiere: string, profile: string }) => {
    let conn
    const query = `INSERT INTO users (name, email, password, annee, filiere, profile)
    VALUES ('${name}', '${email}', '${password}', '${annee}', '${filiere}', '${profile}');
    `

    try {
        conn = await pool.getConnection();
        let rows;
        rows = await conn.query(query);
        conn.release();
        return { _id: parseInt(rows.insertId) }
    } catch (error) {
        console.error('Error:', error);
        return null
    }
}
Users.findByIdAndUpdate = async (id: string, { name, email, password, annee, filiere, profile }: { name: string, email: string, password: string, annee: number, filiere: string, profile: string }) => {
    let conn;
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
        if (rows.affectedRows > 0)
            return rows
        else
            return null
    } catch (error) {
        console.error('Error:', error);
        return null
    }
}

Users.findByIdAndDelete = async (id: string) => {
    let conn;
    const query = `DELETE FROM users    WHERE _id = ${id};
    `;

    try {
        conn = await pool.getConnection();
        let rows;
        rows = await conn.query(query);
        conn.release();
        if (rows.affectedRows > 0)
            return rows
        else
            return null
    } catch (error) {
        console.error('Error:', error);
        return null
    }
}


export default Users