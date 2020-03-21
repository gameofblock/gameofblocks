import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as BearerStrategy } from 'passport-http-bearer';
import bcrypt from 'bcryptjs';

import logger from '../util/logger';
import { findByUsername, findByToken } from '../db/user';

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    async (username, password, done) => {
      try {
        logger.info(`Tentative de connexion de ${username}`);
        const user = await findByUsername(username);
        if (!user) {
          done('Unknown user');
        } else {
          bcrypt.compare(password, user.password, (err, passwordCorrect) => {
            if (err) {
              done(err);
            } else if (!passwordCorrect) {
              done('Invalid password');
            } else {
              done(null, user);
            }
          });
        }
      } catch (err) {
        done(err);
      }
    }
  )
);

passport.use(
  new BearerStrategy(async (token, done) => {
    // try {
    //   const user = await findByToken(token);
    //   if (!user) {
    //     done('Invalid token');
    //   } else if (user.active) {
    //     done('User is inactive');
    //   } else {
    //     done(null, user);
    //   }
    // } catch (err) {
    //   done(err);
    // }

    done(null, null);
  })
);

export default passport;
