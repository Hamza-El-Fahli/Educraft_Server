import pool from "../lib/mariadb";


const Lessons: any = {};

Lessons.create = async ({
  chapter_id,
  content,
  type,
}: {
  chapter_id: number;
  content: string;
  type: string;
}) => {
  const query = `INSERT INTO lessons (_id, chapter_id, content, type) VALUES (NULL, ?,?,?);`;
  try {
    const conn = await pool.getConnection();
    const row = await conn.query(query, [chapter_id, content, type]);

    conn.release();
    return { _id: parseInt(row.insertId) };
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

Lessons.findByIdAndUpdate = async (
  id: number,
  { content, type }: { content: string; type: string }
) => {
  const query = `UPDATE lessons SET content = ?, type = ? WHERE _id = ?;`;
  try {
    const conn = await pool.getConnection();
    const row = await conn.query(query, [content, type, id]);
    conn.release();

    return { _id: parseInt(row.insertId) };
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

export default Lessons;
