import { Router } from 'express';
import passport from 'passport';
import bodyParser from 'body-parser';
import env from '@gameofblocks/env';

import { logger } from '../../utils/logger';
import { loginUser } from '../models/user';

const router = Router();
router.use(bodyParser.json());

const { AUTH0_DOMAIN, AUTH0_CLIENT_ID, BASE_URL } = env;

router.get(
  '/login',
  passport.authenticate('auth0', {
    scope: 'openid email profile',
  }),
  (req, res) => res.redirect('/')
);

router.get('/hasura', (req, res) => {
  logger.info('🔒 Hasura webhook. Checking authentication...');

  if (!req.isAuthenticated()) {
    res.status(401);
  } else {
    res.status(200).json({
      'X-Hasura-User-Id': '',
      'X-Hasura-Role': 'user',
    });
  }
  res.end();
});

router.get('/callback', (req, res, next) => {
  // eslint-disable-next-line consistent-return
  passport.authenticate('auth0', (error, user) => {
    if (error) {
      return next(error);
    }
    if (!user) {
      return res.redirect('/login');
    }

    req.logIn(user, async (err) => {
      if (err) return next(err);

      console.log('=> session', req.session);

      const {
        id,
        _json: { email, picture },
      } = user;

      // eslint-disable-next-line @typescript-eslint/camelcase
      await loginUser({ auth_id: id, picture, email });
      return res.redirect('/');
    });
  })(req, res, next);
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect(
    `https://${AUTH0_DOMAIN}/logout?client_id=${AUTH0_CLIENT_ID}&returnTo=${BASE_URL}`
  );
});

export default router;
