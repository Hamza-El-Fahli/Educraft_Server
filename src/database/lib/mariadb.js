import mariadb from "mariadb";

const pool = mariadb.createPool({
  host: '172.17.0.2', // db.educraft.com
  user: 'root',
  password: 'gggg0000',
  database: 'educraft',
  connectionLimit: 1,
  connectTimeout: 20000, // Increase the connection timeout to 20 seconds
  multipleStatements: true  // Enable multiple statements
});


export default pool;
