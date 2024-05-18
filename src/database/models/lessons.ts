// import mongoose, { Document, Model, Schema } from "mongoose";

import pool from "../lib/mariadb"

// enum ALimetationType {
//     Text = 'text',
//     Video = 'video',
//     PDF = 'pdf'
// }

// interface IALimetation extends Document {
//     chapter_id: string;
//     content: string;
//     type: ALimetationType;
// }

// const ALimetationSchema = new Schema({
//     chapter_id: String,
//     content: String,
//     type: { type: String, enum: Object.values(ALimetationType), default: ALimetationType.Text },
// }, {
//     timestamps: true
// });

// const ALimetation: Model<IALimetation> = mongoose.models.ALimetation as Model<IALimetation> || mongoose.model<IALimetation>('ALimetation', ALimetationSchema);

// export default ALimetation;



const Lessons : any = {}


Lessons.findOne =async ({chapter_id}:{chapter_id:number})=>{
    const query = 'SELECT * from lessons WHERE chapter_id = '+chapter_id+' ;'
    try{
        const conn = await pool.getConnection()
        const row = await conn.query(query);
        conn.release();
        return row.length ? {_id :  row[0]._id} : null
    } catch (error) {
        console.error('Error:', error);
        return null
    }
}



Lessons.create =async ({chapter_id , content , type}:{chapter_id:number , content:string , type:string})=>{
    const query = `INSERT INTO lessons (_id, chapter_id, content, type) VALUES (NULL, '${chapter_id}', '${content}', '${type}');`;
    try{
        const conn = await pool.getConnection()
        const row = await conn.query(query);

        conn.release();
        return {_id : parseInt(row.insertId)}
    } catch (error) {
        console.error('Error:', error);
        return null
    }
}



Lessons.findByIdAndUpdate =async (id:number , {content , type}:{content:string,type:string})=>{
    const query = `UPDATE lessons SET content = '${content}', type = '${type}' WHERE _id = ${id};`;
    try{
        const conn = await pool.getConnection()
        const row = await conn.query(query);
        conn.release();

        return {_id : parseInt(row.insertId)}
    } catch (error) {
        console.error('Error:', error);
        return null
    }
}




export default Lessons