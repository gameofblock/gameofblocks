import express from 'express';
import passport from 'passport';
import bodyParser from 'body-parser';
import env from '@gameofblocks/env';

const router = express.Router();
router.use(bodyParser.json());

router.get(
  '/login',
  passport.authenticate('auth0', {
    scope: 'openid email profile',
  }),
  (req, res) => res.redirect('/')
);

router.get('/callback', (req, res, next) => {
  // eslint-disable-next-line consistent-return
  passport.authenticate('auth0', (error, user) => {
    if (error) {
      return next(error);
    }
    if (!user) {
      return res.redirect('/login');
    }

    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.redirect('/');
    });
  })(req, res, next);
});

router.get('/logout', (req, res) => {
  req.logout();

  const { AUTH0_DOMAIN, AUTH0_CLIENT_ID, BASE_URL } = env;
  res.redirect(
    `https://${AUTH0_DOMAIN}/logout?client_id=${AUTH0_CLIENT_ID}&returnTo=${BASE_URL}`
  );
});

export default router;
