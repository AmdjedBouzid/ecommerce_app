import mysql from "mysql2/promise";

const connection = mysql.createPool({
  host: "sql5.freesqldatabase.com",
  user: "sql5719800",
  password: "n54S6fgUDv",
  database: "sql5719800",
  waitForConnections: true,
});

export default connection;
