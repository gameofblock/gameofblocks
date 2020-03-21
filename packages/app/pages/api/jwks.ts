import rasha from 'rasha';

import { publicKey } from '../../config/jwt';

export default async (req, res) => {
  if (req.method === 'GET') {
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
