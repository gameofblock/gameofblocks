import pg from 'pg';

const config = {
  user: process.env.POSTGRES_USER,
  host: 'localhost',
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: 5434
};

export const pool = new pg.Pool(config);
