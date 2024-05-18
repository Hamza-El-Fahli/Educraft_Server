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
        let rows;
        if (data?.course_id) {
            query = `SELECT * FROM modules WHERE course_id = ${data.course_id} ;`
            //         if(true){
            //             // query = `SELECT * FROM chapters WHERE module_id IN ${moduleIDS.join(',')} ;`
            //             const chps = await conn.query(`
            //             WITH ProgressionCounts AS (
            //                 SELECT chapter_id, user_id, COUNT(*) AS progression_count
            //                 FROM progression
            //                 GROUP BY chapter_id, user_id
            //             )
            //             SELECT 
            //                 m.*,
            //                 COUNT(c._id) AS total_chapters,
            //                 SUM(CASE WHEN p.progression_count = c.quizGroupes THEN 1 ELSE 0 END) AS completed_chapters,
            //                 (SUM(CASE WHEN p.progression_count = c.quizGroupes THEN 1 ELSE 0 END) * 100.0 / COUNT(c._id)) AS completion_percentage
            //             FROM 
            //                 modules m
            //             JOIN 
            //                 chapters c ON m._id = c.module_id
            //             LEFT JOIN 
            //                 ProgressionCounts p ON c._id = p.chapter_id AND p.user_id = 5
            //             GROUP BY 
            //                 m._id, m.title;`);
            //             console.log(chps)
            //         }

        }
        rows = await conn.query(query);

        conn.release();
        return rows
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