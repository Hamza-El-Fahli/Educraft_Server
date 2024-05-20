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

const Modules: any = {};



Modules.find = async (data: null | any) => {
    let conn;
    let query = 'SELECT * FROM modules';
    try {
        conn = await pool.getConnection();
        let modules;
        if (data?.course_id) {
            query = `SELECT * FROM modules WHERE course_id = ${data.course_id} ;`
            if (data?.user_id) {
                modules = await conn.query(query);

                for (let i = 0; i < modules.length; i++) {
                    const Mymodule = modules[i]
                    modules[i].done = 0
                    let query2 = `SELECT * FROM chapters WHERE module_id = ${Mymodule._id} ;`
                    const chapters = await conn.query(query2);
                    for (let chapter of chapters) {
                        query2 = `SELECT COUNT(*) AS progress FROM progression WHERE chapter_id = ${chapter._id} AND user_id = ${data.user_id} ;`
                        const quizzes = await conn.query(query2);
                        const FinishedQuizGroupes = parseInt(quizzes[0].progress)
                        if (FinishedQuizGroupes >= chapter.quizGroupes && chapter.quizGroupes != 0) {
                            modules[i].done++
                        }
                    }
                    modules[i].progress =modules[i].done ? modules[i].done*100 / modules[i].chapter_count : 0
                }
            }else{
                modules = await conn.query(query);

            }
        } else {
            modules = await conn.query(query);
        }
        conn.release();
        return modules
    } catch (error) {
        console.error('Error:', error);
        return null
    }
}

Modules.findById = async (data: null | any) => {
    let conn;
    let query = 'SELECT * FROM modules where _id = ' + data + ' ;';
    try {
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

Modules.create = async ({ course_id, title, description, order }: any) => {
    let conn
    const query = `INSERT INTO modules (course_id, description, title , order_num)
    VALUES ('${course_id}', '${description}', '${title}' , '${order}');
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
Modules.findByIdAndUpdate = async (id: string, { course_id, title, description, order }: any) => {
    let conn;

    const query = `UPDATE modules
    SET course_id = '${course_id}',
    title = '${title}',
    description = '${description}' 
    WHERE _id = '${id}' ;`;
    // , order_num = '${order}'

    try {
        conn = await pool.getConnection();
        let rows;
        rows = await conn.query(query);
        const _id = parseInt(rows.insertId)
        conn.release();
        if (rows.affectedRows > 0)
            return { _id, course_id, title, description }
        else
            return null
    } catch (error) {
        console.error('Error:', error);
        return null
    }
}

Modules.findByIdAndDelete = async (id: string) => {
    let conn;
    const query = `DELETE FROM modules  WHERE _id = '${id}';
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


export default Modules