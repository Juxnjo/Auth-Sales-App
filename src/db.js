import pkg from "pg";
const { Pool } = pkg;

export const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "konectadb",
  password: "0000",
  port: 5432, 
});
