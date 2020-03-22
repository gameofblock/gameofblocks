import fs from 'fs';
import fnv from 'fnv-plus';

export interface JWTConfig {
  privateKey: string;
  publicKey: string;
  kid: string;
}

export async function getConfig(): Promise<JWTConfig> {
  const privatePemKey = fs.readFileSync('private.pem').toString();
  const publicPemKey = fs.readFileSync('public.pem').toString();
  // Key Identifier – Acts as an ‘alias’ for the key

  const publicKey = publicPemKey.replace(/\\n/g, '\n');
  const kid = process.env.AUTH_KEY_ID || fnv.hash(publicKey, 128).hex();

  return {
    privateKey: privatePemKey.replace(/\\n/g, '\n'),
    publicKey,
    kid
  };
}
