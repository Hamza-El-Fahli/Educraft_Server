


import pool from "./../lib/mariadb";

const Chapters: any = {};


Chapters.find = async (data: null | { module_id: string, user_id: string }) => {
    let conn;
    let query = 'SELECT chapters.*, modules.title AS module_name  FROM chapters JOIN modules ON chapters.module_id = modules._id;';
    try {
        conn = await pool.getConnection();
        let rows;
        if (data?.module_id) {
            query = `
    SELECT 
    *    
    FROM 
        chapters
    WHERE
        module_id = ${data.module_id}
`;
            rows = await conn.query(query);
            if (data?.user_id) {
                for (let i = 0; i < rows.length; i++) {
                    const chapter = rows[i]
                    const queryQuizzes = `
      SELECT 
      COUNT(*) AS progress    
      FROM 
          progression
      WHERE
          chapter_id = ${chapter._id} AND user_id = ${data.user_id}
   
  `;
                    const Progression = await conn.query(queryQuizzes);
                    rows[i].isDone = parseInt(Progression[0].progress)
                }
            }

        } else {
            rows = conn.query(query)
        }
        conn.release();
     
        return rows
    } catch (error) {

        console.error('Error:', error);
        return null
    }
}

Chapters.findById = async (id: string) => {
    let conn;
    let query = `SELECT *  FROM chapters WHERE _id=${id};`;
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

Chapters.create = async ({ module_id, title, description, quizGroupes }: any) => {
    let conn
    const query = `INSERT INTO chapters (module_id, title, description, quizGroupes)
    VALUES ('${module_id}', '${title}', '${description}' , 0);
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
Chapters.findByIdAndUpdate = async (id: string, { module_id, title, description }: any) => {
    let conn;

    const query = `UPDATE chapters
    SET module_id = '${module_id}',
    title = '${title}',
    description = '${description}' 
    WHERE _id = ${id} ;`;

    try {
        conn = await pool.getConnection();
        let rows;
        rows = await conn.query(query);
        const _id = parseInt(rows.insertId)
        conn.release();
        if (rows.affectedRows > 0)
            return { _id, module_id, title, description }
        else
            return null
    } catch (error) {
        console.error('Error:', error);
        return null
    }
}

Chapters.findByIdAndDelete = async (id: string) => {
    let conn;
    const query = `DELETE FROM chapters  WHERE _id = '${id}';
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


export default Chapters



