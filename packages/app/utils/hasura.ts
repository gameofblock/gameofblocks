import jwt from 'jsonwebtoken';

import { getConfig } from '../config/jwt';

export interface HasuraClaims {
  'x-hasura-allowed-roles': string[];
  'x-hasura-default-role': string;
  'x-hasura-user-id': string;
}

function getHasuraClaims(id: string, roles: string[]): HasuraClaims {
  return {
    'x-hasura-allowed-roles': roles,
    'x-hasura-default-role': 'user',
    'x-hasura-user-id': `${id}`
  };
}

export async function generateToken(
  id: string,
  username: string,
  roles: string[]
): Promise<string> {
  const { privateKey } = await getConfig();
  const signOptions: jwt.SignOptions = {
    subject: id,
    expiresIn: '30d', // 30 days validity
    algorithm: 'RS256'
  };
  const claim = {
    name: username,
    'https://hasura.io/jwt/claims': getHasuraClaims(id, roles)
  };
  return jwt.sign(claim, privateKey, signOptions);
}
