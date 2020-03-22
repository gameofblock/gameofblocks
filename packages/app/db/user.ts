import bcrypt from 'bcryptjs';

import { UserBase } from '../types/user';
import { pool } from './index';

export async function create(username: string, password: string) {
  const salt = await bcrypt.genSalt();
  const pwd = await bcrypt.hash(password, salt);
  const text =
    'INSERT INTO user (username, password) VALUES($1, $2) RETURNING id';
  const response = await pool.query(text, [username, pwd]);
  const [{ id }] = response.rows;
  return id;
}

export async function findByUsername(username: string) {
  const text = `
    SELECT u.id, u.username, u.password, u.created_at 
    FROM user AS u WHERE username = $1 LIMIT 1
  `;
  const response = await pool.query<UserBase>(text, [username]);
  const [user] = response.rows;
  return user;
}

export async function findByToken(token: string) {
  const text = `
    SELECT u.id, u.username, u.password, u.created_at 
    FROM user AS u WHERE token = $1 LIMIT 1
  `;
  const response = await pool.query<UserBase>(text, [token]);
  const [user] = response.rows;
  return user;
}

export async function findById(id: string) {
  const text = `
    SELECT u.id, u.username, u.password, u.created_at 
    FROM user AS u WHERE id = $1 LIMIT 1
  `;
  const response = await pool.query<UserBase>(text, [id]);
  const [user] = response.rows;
  return user;
}

export async function updateResetPassword(
  email: string,
  token: string,
  expires: Date
) {
  const text = `
  UPDATE user
  SET reset_password_token = $2, reset_password_expires = $3
  WHERE email = $1
`;
  await pool.query(text, [email, token, expires]);
}
