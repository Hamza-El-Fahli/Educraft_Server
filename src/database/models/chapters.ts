// import mongoose, { Schema, Document, Model } from "mongoose";

// interface IChapter extends Document {
//   module_id: string;
//   title: string;
//   description: string;
//   quizGroupes : number; // count the number of tests groups under this chapter
// }

// const ChaptersScheme: Schema = new Schema({
//   module_id: { type: String, require: true },
//   title: { type: String, require: true },
//   description: { type: String, require: true },
//   quizGroupes: { type: Number,default:0, require: false },
// });


// const Chapters = mongoose.models.Chapters as Model<IChapter> || mongoose.model<IChapter>('Chapters',ChaptersScheme)
// export default Chapters




import pool from "./../lib/mariadb";

const Chapters :any = {};


Chapters.find =async (data:null|{module_id:string , user_id:string})=>{
    let conn ;
    let query  ='SELECT chapters.*, modules.title AS module_name  FROM chapters JOIN modules ON chapters.module_id = modules._id;' ;
    try {
        conn = await pool.getConnection();
        let rows;
        if(data?.module_id && data?.user_id) 
            query = `
        SELECT 
            chapters.*, 
            modules.title AS module_name,
            CASE WHEN chapter_progression.chapter_id IS NOT NULL THEN TRUE ELSE FALSE END AS isDone
        FROM 
            chapters 
        JOIN 
            modules ON chapters.module_id = modules._id
        LEFT JOIN 
            chapter_progression ON chapters.id = chapter_progression.chapter_id
        AND 
            chapter_progression.user_id = '${data.user_id}'
        WHERE
            chapters.module_id = '${data.module_id}'
      ;`



         rows = await conn.query(query);
        conn.release();
        return rows
    } catch (error) {
        console.error('Error:', error);
        return null
    }
}

Chapters.create = async({ module_id, title, description, quizGroupes }:any)=>{
    let conn
    const query = `INSERT INTO chapters (module_id, title, description, quizGroupes)
    VALUES ('${module_id}', '${title}', '${description}' , 0);
    `
    
    try {
        conn = await pool.getConnection();
        let rows;
        rows = await conn.query(query);
        //conn.release();
        return {_id : parseInt(rows.insertId)}
    } catch (error) {
        console.error('Error:', error);
        return null
    }
}
Chapters.findByIdAndUpdate = async (id:string,  { module_id, title, description, quizGroupes }:any)=>{
    let conn ;

    const query = `UPDATE chapters
    SET module_id = '${module_id}',
    title = '${title}',
    description = '${description}' ,
    quizGroupes = '${quizGroupes}'
    WHERE _id = '${id}' ;`;
    // , order_num = '${order}'
    
    try {
        conn = await pool.getConnection();
        let rows;
        rows = await conn.query(query);
        const _id = parseInt(rows.insertId)
        //conn.release();
        if(rows.affectedRows>0)
            return {_id , module_id, title, description ,quizGroupes  }
            else
    return null
    } catch (error) {
        console.error('Error:', error);
        return null
    }
}

Chapters.findByIdAndDelete =async (id:string)=>{
    let conn ;
    const query = `DELETE FROM chapters  WHERE _id = '${id}';
    `;

    try {
        conn = await pool.getConnection();
        let rows;
        rows = await conn.query(query);
        //conn.release();
        if(rows.affectedRows>0)
        return rows
    else
    return null
    } catch (error) {
        console.error('Error:', error);
        return null
    }
}


export default Chapters