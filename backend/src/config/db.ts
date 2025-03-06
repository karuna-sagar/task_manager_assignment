import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

let connection: mysql.Connection;

async function connectDB() {
  try {
    connection = await mysql.createConnection(dbConfig);
    await connection.connect();
    console.log("Connected to MySQL database: task_management");
    return connection;
  } catch (error) {
    console.error("Error connecting to MySQL:", error);
    throw error;
  }
}

export { connectDB, connection };
