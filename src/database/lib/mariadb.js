import mariadb from "mariadb";
import dotenv from "dotenv";

// Load environment variables from .env.local
dotenv.config();

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
  connectionLimit: process.env.DB_CONNECTION_LIMIT
    ? parseInt(process.env.DB_CONNECTION_LIMIT)
    : 5,
  connectTimeout: process.env.DB_CONNECT_TIMEOUT
    ? parseInt(process.env.DB_CONNECT_TIMEOUT)
    : 20000,
  multipleStatements: true,
});

export default pool;
