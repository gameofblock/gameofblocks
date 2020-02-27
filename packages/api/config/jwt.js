import fs from "fs";
import fnv from "fnv-plus";

export const key = fs
  .readFileSync("private.pem")
  .toString()
  .replace(/\\n/g, "\n"); // process.env.AUTH_PRIVATE_KEY ||

export const publicKey = fs
  .readFileSync("public.pem")
  .toString()
  .replace(/\\n/g, "\n"); // process.env.AUTH_PUBLIC_KEY ||

// Key Identifier – Acts as an ‘alias’ for the key
export const kid = process.env.AUTH_KEY_ID || fnv.hash(publicKey, 128).hex();
