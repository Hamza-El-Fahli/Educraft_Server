import mariadb from "mariadb";

const pool = mariadb.createPool({
  host: 'db.educraft.com',
  user: 'remote',
  password: '',
  database: 'educraft',
  connectionLimit: 10
});


export default pool;
