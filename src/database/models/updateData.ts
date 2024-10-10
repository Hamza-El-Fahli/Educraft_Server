import pool from "./../lib/mariadb";



export const updateChapterCount = async ()=>{
    let conn;

    const queries = {            
        updateChapterCountAfterInsert: `
              UPDATE modules m
SET chapter_count = (
    SELECT COUNT(*)
    FROM chapters c
    WHERE c.module_id = m._id
);
        `
      };      
    try {
      conn = await pool.getConnection();
      await conn.query(queries.updateChapterCountAfterInsert); // Create trigger after insert on chapters

            conn.release();
      return true;
    } catch (error) {
      console.error("Error:", error);
      if (conn) conn.release();
      return null;
    }
  
}



export const updateQuizGroup = async ()=>{
    let conn;

    const queries = {            
        updateQuizGroup: `
             UPDATE chapters c
SET quizGroupes = (
    SELECT COUNT(DISTINCT q.quiz_group)
    FROM quiz q
    WHERE q.chapter_id = c._id
);

            `
      };      
    try {
      conn = await pool.getConnection();
      await conn.query(queries.updateQuizGroup); // Create trigger after delete on chapters

            conn.release();
      return true;
    } catch (error) {
      console.error("Error:", error);
      if (conn) conn.release();
      return null;
    }
  
}