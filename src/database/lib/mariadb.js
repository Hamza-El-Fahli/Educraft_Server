import mariadb from "mariadb";

const pool = mariadb.createPool({
  host: 'db.educraft.com',
  user: 'root',
  password: '',
  database: 'educraft',
  connectionLimit: 5
});


export default pool;
