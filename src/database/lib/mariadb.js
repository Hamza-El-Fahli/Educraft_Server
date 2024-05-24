import mariadb from "mariadb";

const pool = mariadb.createPool({
  host: 'db.educraft.com',
  user: 'remote',
  password: '',
  database: 'educraft',
  connectionLimit: 100,
  connectTimeout: 20000, // Increase the connection timeout to 20 seconds
  multipleStatements: true  // Enable multiple statements
});


export default pool;
