import mysql from "mysql2/promise";

const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "myecommerce",
  waitForConnections: true,
});

export default connection;
