import bcrypt from "bcryptjs";

import { query } from ".";

export async function create(username, password) {
  const salt = await bcrypt.genSalt();
  const pwd = await bcrypt.hash(password, salt);
  const text =
    "INSERT INTO public.user (username, password) VALUES($1, $2) RETURNING id";
  const response = await query(text, [username, pwd]);
  const [{ id }] = response.rows;
  return id;
}

export async function findByUsername(username) {
  const text = `
    SELECT u.id, u.username, u.password, u.created_at 
    FROM public.user AS u WHERE username = $1 LIMIT 1
  `;
  const response = await query(text, [username]);
  const [user] = response.rows;
  return user;
}

export async function findById(id) {
  const text = `
    SELECT u.id, u.username, u.password, u.created_at 
    FROM public.user AS u WHERE id = $1 LIMIT 1
  `;
  const response = await query(text, [id]);
  const [user] = response.rows;
  return user;
}
