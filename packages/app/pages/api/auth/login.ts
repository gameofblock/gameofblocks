/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';

import passport from '../../../config/passport';
import logger from '../../../utils/logger';
import { generateToken } from '../../../utils/hasura';

const paramValidator = handler => {
  return (req, res) => {
    // Do middleware stuff...
    // req.assert('email', 'Email is not valid').notEmpty();
    // req.assert('password', 'Password cannot be blank').notEmpty();

    // const errors = req.validationErrors();

    // if (errors) {
    //   return res.status(400).json({ errors });
    // }

    return handler(req, res);
  };
};

const login = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextApiHandler
) => {
  switch (req.method) {
    case 'POST': {
      passport.authenticate('local', async (err, user) => {
        if (err) {
          logger.error(`Login failed. ${err}`);
          return res.status(400).json({ error: err });
        }

        if (user) {
          logger.info(`Login successful (id: ${user.id})`);

          // TODO(remiroyc): get user roles
          const roles = ['user']; 

          const token = await generateToken(user.id, user.username, roles);
          return res.status(200).json({
            success: true,
            user: {
              id: user.id,
              username: user.username,
              roles,
              token
            }
          });
        }

        return res.status(400);
      })(req, res, next);
      break;
    }
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default paramValidator(login);
