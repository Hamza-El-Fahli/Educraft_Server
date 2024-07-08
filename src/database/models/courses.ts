import pool from "./../lib/mariadb";

const Courses: any = {};

Courses.find = async (data: null | any) => {
  let conn;
  try {
    conn = await pool.getConnection();
    let rows;
    if (data == null) {
      rows = await conn.query("SELECT * FROM courses");
    } else {
      if (data.course_id)
        rows = await conn.query("SELECT * FROM courses WHERE _id != ?", [
          data.course_id,
        ]);
    }
    conn.release();
    return rows;
  } catch (error) {
    console.error("Error:", error);
    if (conn) conn.release();
    return null;
  }
};

Courses.create = async ({ course_name, description, instructor }: any) => {
  let conn;
  const query = `INSERT INTO courses (course_name, description, instructor) VALUES (?, ?, ?);`;

  try {
    conn = await pool.getConnection();
    const rows = await conn.query(query, [
      course_name,
      description,
      instructor,
    ]);
    conn.release();
    return { _id: parseInt(rows.insertId) };
  } catch (error) {
    console.error("Error:", error);
    if (conn) conn.release();
    return null;
  }
};
Courses.findByIdAndUpdate = async (
  id: string,
  { course_name, description, instructor }: any
) => {
  let conn;
  const query = `UPDATE courses
    SET course_name = ?, description = ?, instructor = ?
    WHERE _id = ?;`;

  try {
    conn = await pool.getConnection();
    const rows = await conn.query(query, [
      course_name,
      description,
      instructor,
      id,
    ]);
    const _id = parseInt(rows.insertId);
    conn.release();
    if (rows.affectedRows > 0)
      return { _id, course_name, description, instructor };
    else return null;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

Courses.findByIdAndDelete = async (id: string) => {
  let conn;
  const query = `DELETE FROM courses WHERE _id = ?;
    `;

  try {
    conn = await pool.getConnection();
    let rows;
    rows = await conn.query(query, [id]);
    conn.release();
    if (rows.affectedRows > 0) return rows;
    else return null;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

export default Courses;
