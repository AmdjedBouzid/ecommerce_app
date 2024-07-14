import mysql from "mysql2/promise";

const connection = mysql.createPool({
  host: process.env.NEXT_PUBLIC_DB_SERVER as string,
  user: process.env.NEXT_PUBLIC_DB_USER as string,
  password: process.env.NEXT_PUBLIC_DB_PASSWORD as string,
  database: process.env.NEXT_PUBLIC_DB_NAME as string,
  waitForConnections: true,
});

export default connection;
