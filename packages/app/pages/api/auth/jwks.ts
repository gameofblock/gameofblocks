/* eslint-disable @typescript-eslint/explicit-function-return-type */
import rasha from 'rasha';
import { NextApiRequest, NextApiResponse } from 'next';

import { getConfig } from '../../../config/jwt';

export interface JWTResponse {
  keys: {
    alg: string;
    kid: string;
    use: string;
    kty: string;
    n: string;
    e: string;
    d: string;
    p: string;
    q: string;
    dp: string;
    dq: string;
    qi: string;
  }[];
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse<JWTResponse>
) => {
  if (req.method === 'GET') {
    const { publicKey } = await getConfig();
    const jwkProperties = await rasha.import({
      pem: publicKey,
      public: true
    });
    const jwk = {
      ...jwkProperties,
      alg: 'RS256',
      kid: publicKey,
      use: 'sig'
    };
    const jwks = {
      keys: [jwk]
    };
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(jwks);
  }
};
