import mariadb from "mariadb";

const pool = mariadb.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'educraft',
  connectionLimit: 5
});


export default pool;
