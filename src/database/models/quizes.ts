// import mongoose, { Model, Document, Schema } from "mongoose";


// interface IQuiz extends Document {
//     chapter_id: string;
//     question: string;
//     correct_answer: string;
//     answers: string[];
//     group:string;
// }


// const QuizSchema = new Schema<IQuiz>({

//     chapter_id: { type: String, required: true },
//     question: { type: String, required: true },
//     correct_answer: { type: String, required: true },
//     group: { type: String, required: true },
//     answers: { type: [String], required: true },
// }, {
//     timestamps: true
// })

// const Quizes: Model<IQuiz> = mongoose.models.Quizes as Model<IQuiz> || mongoose.model('Quizes', QuizSchema)


// export default Quizes





import pool from "./../lib/mariadb";

const Quizzes :any = {};


Quizzes.find =async (data:null|any)=>{
    let query  ='SELECT *  FROM quiz ' ;
    if(data?.module_id) query = `SELECT * FROM quiz WHERE module_id ='${data.module_id}'  ;`
    if(data?.chapter_id && data?.quiz_group) query =   `SELECT * FROM quiz WHERE chapter_id ='${data.chapter_id}' AND quiz_group = ${data.quiz_group}  ;`
    try {
        let conn ;
        conn = await pool.getConnection();
        let rows;
         rows = await conn.query(query);
        conn.release();
        return rows
    } catch (error) {
        console.error('Error:', error);
        return null
    }
}

Quizzes.create = async(data:{chapter_id:string , question:string,correct_answer:string,answers:string[],quiz_group:number })=>{
    let conn
    const {chapter_id , question,answers,quiz_group,correct_answer } = data
    
    try {
        conn = await pool.getConnection();
        let rows;
        const {module_id} = (await conn.query(`SELECT module_id FROM chapters WHERE id='${1}' LIMIT 1 `))[0];
        const query = `INSERT INTO quiz 
        ( chapter_id, question, answers, correct_answer, quiz_group, module_id) 
        VALUES ( '${chapter_id}', '${question}', '${answers}', '${correct_answer}', '${quiz_group}' , '${module_id}');
        `
        rows = await conn.query(query);
        conn.release();
        return {_id : parseInt(rows.insertId)}
    } catch (error) {
        console.error('Error:', error);
        return null
    }
}


// Quizzes.findByIdAndUpdate = async (id:string,  { module_id, title, description, quizGroupes }:any)=>{
//     let conn ;

//     const query = `UPDATE chapters
//     SET module_id = '${module_id}',
//     title = '${title}',
//     description = '${description}' ,
//     quizGroupes = '${quizGroupes}'
//     WHERE _id = '${id}' ;`;
//     // , order_num = '${order}'
    
//     try {
//         conn = await pool.getConnection();
//         let rows;
//         rows = await conn.query(query);
//         const _id = parseInt(rows.insertId)
//         //conn.release();
//         if(rows.affectedRows>0)
//             return {_id , module_id, title, description ,quizGroupes  }
//             else
//     return null
//     } catch (error) {
//         console.error('Error:', error);
//         return null
//     }
// }

// Quizzes.findByIdAndDelete =async (id:string)=>{
//     let conn ;
//     const query = `DELETE FROM chapters  WHERE _id = '${id}';
//     `;

//     try {
//         conn = await pool.getConnection();
//         let rows;
//         rows = await conn.query(query);
//         //conn.release();
//         if(rows.affectedRows>0)
//         return rows
//     else
//     return null
//     } catch (error) {
//         console.error('Error:', error);
//         return null
//     }
// }


export default Quizzes