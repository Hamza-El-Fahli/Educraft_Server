import mariadb from "mariadb";

const pool = mariadb.createPool({
  host: "localhost", // db.educraft.com
  user: "root",
  // port:11529,
  password: "",
  database: "educraft",
  connectionLimit: 1,
  connectTimeout: 20000, // Increase the connection timeout to 20 seconds
  multipleStatements: true, // Enable multiple statements
});

// run ngrok using
//  ngrok tcp 172.17.0.2:3306

export default pool;
