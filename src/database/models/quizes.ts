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

const Quizzes: any = {};


Quizzes.find = async (data: null | any) => {
    let query = 'SELECT *  FROM quiz ';
    if (data?.module_id) query = `SELECT * FROM quiz WHERE module_id ='${data.module_id}'  ;`
    if (data?.chapter_id && data?.quiz_group >= 0) query = `SELECT * FROM quiz WHERE chapter_id ='${data.chapter_id}' AND quiz_group = ${data.quiz_group}  ;`
    try {
        let conn;
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

Quizzes.create = async (data: { chapter_id: string, question: string, correct_answer: string, answers: string[], quiz_group: number }) => {
    let conn
    const { chapter_id, question, answers, quiz_group, correct_answer } = data
    const answersJson = JSON.stringify(answers);
    conn = await pool.getConnection();
    try {
        let rows;
        const { module_id } = (await conn.query(`SELECT module_id FROM chapters WHERE _id='${1}' LIMIT 1 `))[0];
        const query = `INSERT INTO quiz 
        ( chapter_id, question, answers, correct_answer, quiz_group, module_id) 
        VALUES (?, ?, ?, ?, ?, ?);
        `
        rows = await conn.query(query, [chapter_id, question, answersJson, correct_answer, quiz_group, module_id]);
        return { _id: parseInt(rows.insertId) }
    } catch (error) {
        console.error('Error:', error);
        return null
    } finally {
        conn.release();
    }
}


Quizzes.findByIdAndUpdate = async (id: string, data: any) => {
    let conn;
    const { correct_answer, chapter_id, question, answers, group } = data
    const answersJson = JSON.stringify(answers);

    const query = `
    UPDATE quiz
    SET chapter_id = ?, 
        question = ?, 
        answers = ?, 
        correct_answer = ?, 
        quiz_group = ?
    WHERE _id = ? ;
    `;

    conn = await pool.getConnection();
    try {
        let rows;
        rows = await conn.query(query, [chapter_id, question, answersJson, correct_answer, group,id]);
        const _id = parseInt(rows.insertId)
        if (rows.affectedRows > 0)
            return { _id, correct_answer, chapter_id, question, answers, group }
        else
            return null
    } catch (error) {
        console.error('Error:', error);
        return null
    }finally{
        conn.release();
    }
}

Quizzes.findByIdAndDelete = async (id: string) => {
    let conn;
    const query = `DELETE FROM quiz  WHERE _id = '${id}';
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


export default Quizzes