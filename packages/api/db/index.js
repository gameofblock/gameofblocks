import { dirname } from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import pg from "pg";

const path = `${dirname(fileURLToPath(import.meta.url))}/../../../.env`;
dotenv.config({ path });

const config = {
  user: process.env.POSTGRES_USER,
  host: "localhost",
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: 5434
};

const pool = new pg.Pool(config);

export async function query(text, params) {
  const res = await pool.query(text, params);
  return res;
}

export default { query };
