// import mongoose, { Schema, Document, Model } from "mongoose";

// interface IModule extends Document {
//     course_id: string;
//     title: string;
//     description: string;
//     order: number;
// }

// const ModulesSchema: Schema = new Schema({
//     course_id: { type: String, required: true },
//     title: { type: String, required: true },
//     description: { type: String, required: true },
//     order: { type: Number, required: true }
// });

// const _Modules: Model<IModule> = mongoose.models._Modules as Model<IModule> || mongoose.model<IModule>('_Modules', ModulesSchema);
// export default _Modules;





import pool from "./../lib/mariadb";

const Modules :any = {};

Modules.findOne = async(data:{name?:string , email?:string})=>{
    let nameOrEmail = data.name ? data.name : data.email ;
    
    const query = `SELECT * FROM modules WHERE name = '${nameOrEmail}' OR email = '${nameOrEmail}' LIMIT 1`;

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
Modules.find =async (data:null|any)=>{
    let conn ;
    let query  ='SELECT * FROM modules' ;
    try {
        conn = await pool.getConnection();
        let rows;
        if(data.course_id) query = `SELECT * FROM modules WHERE course_id = ${data.course_id}`
         rows = await conn.query(query);
        conn.release();
        return rows
    } catch (error) {
        console.error('Error:', error);
        return null
    }
}

Modules.create = async({ course_id, title, description, order }:any)=>{
    let conn
    const query = `INSERT INTO modules (course_id, description, title , order_num)
    VALUES ('${course_id}', '${description}', '${title}' , '${order}');
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
Modules.findByIdAndUpdate = async (id:string, {course_name , description  , instructor }:any)=>{
    let conn ;
    const query = `UPDATE modules
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

Modules.findByIdAndDelete =async (id:string)=>{
    let conn ;
    const query = `DELETE FROM modules    WHERE _id = ${id};
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


export default Modules