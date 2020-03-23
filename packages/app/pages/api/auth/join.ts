/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { NextApiRequest, NextApiResponse } from 'next';

import logger from '../../../utils/logger';
import { create } from '../../../db/user';

interface SignupResponse {
  success: boolean;
}

const paramValidator = handler => {
  return (req, res) => {
    // // Do middleware stuff...
    // req.assert('email', 'Email is not valid').notEmpty();
    // req
    //   .assert('password', 'Password must be at least 4 characters long')
    //   .len(4);

    // const errors = req.validationErrors();

    // if (errors) {
    //   return res.status(400).json({ errors });
    // }
    return handler(req, res);
  };
};

const signup = async (
  req: NextApiRequest,
  res: NextApiResponse<SignupResponse>
) => {
  switch (req.method) {
    case 'POST': {
      const { username, password } = req.body;
      try {
        await create(username, password);
        res.status(200).json({ success: true });
      } catch (err) {
        logger.error(`Signup error: ${err.message}`);
        res.status(400).json({ success: false });
      }
      break;
    }
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default paramValidator(signup);
