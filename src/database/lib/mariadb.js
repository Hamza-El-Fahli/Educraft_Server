import mariadb from "mariadb";

const pool = mariadb.createPool({
  host: "localhost", // db.educraft.com
  user: "educraft",
  // port:11529,
  password: "9c5e28dc5cf27969",
  database: "educraft",
  connectionLimit: 5,
  connectTimeout: 20000, // Increase the connection timeout to 20 seconds
  multipleStatements: true, // Enable multiple statements
});

// run ngrok using
//  ngrok tcp 172.17.0.2:3306

export default pool;
