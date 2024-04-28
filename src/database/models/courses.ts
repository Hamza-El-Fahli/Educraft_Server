// import mongoose, { Schema, Document, Model } from "mongoose";

// interface ICourses extends Document {
//     course_name: string;
//     description: string;
//     instructor: string;
// }

// const CoursesSchema: Schema = new Schema({
//     course_name: { type: String, required: true },
//     description: { type: String, required: true },
//     instructor: { type: String, required: true },
// }, {
//     timestamps: true
// });

// const Courses: Model<ICourses> = mongoose.models.Courses as Model<ICourses> || mongoose.model<ICourses>('Courses', CoursesSchema);
// export default Courses;




import pool from "./../lib/mariadb";

const Courses :any = {};

Courses.findOne = async(data:{name?:string , email?:string})=>{
    let nameOrEmail = data.name ? data.name : data.email ;
    
    const query = `SELECT * FROM courses WHERE name = '${nameOrEmail}' OR email = '${nameOrEmail}' LIMIT 1`;

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
Courses.find =async (data:null|any)=>{
    let conn ;
    try {
        conn = await pool.getConnection();
        let rows;
        if(data==null)
         rows = await conn.query('SELECT * FROM courses');
        conn.release();
        return rows
    } catch (error) {
        console.error('Error:', error);
        return null
    }
}

Courses.create = async({course_name , description , instructor}:any)=>{
    let conn
    const query = `INSERT INTO courses (course_name, description, instructor)
    VALUES ('${course_name}', '${description}', '${instructor}');
    `
    
    try {
        conn = await pool.getConnection();
        let rows;
        rows = await conn.query(query);
        conn.release();
        return {_id : parseInt(rows.insertId)}
    } catch (error) {
        console.error('Error:', error);
        return null
    }
}
Courses.findByIdAndUpdate = async (id:string, {course_name , description  , instructor }:any)=>{
    let conn ;
    const query = `UPDATE courses
    SET course_name = '${course_name}',
    description = '${description}',
    instructor = '${instructor}'
    WHERE _id = ${id};`;

    try {
        conn = await pool.getConnection();
        let rows;
        rows = await conn.query(query);
        const _id = parseInt(rows.insertId)
        conn.release();
        if(rows.affectedRows>0)
            return {_id , course_name , description  , instructor}
            else
    return null
    } catch (error) {
        console.error('Error:', error);
        return null
    }
}

Courses.findByIdAndDelete =async (id:string)=>{
    let conn ;
    const query = `DELETE FROM courses    WHERE _id = ${id};
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


export default Courses