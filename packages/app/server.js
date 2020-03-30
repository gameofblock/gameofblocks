require('dotenv').config({ path: `${__dirname}/../../.env` });

const http = require('http');
const next = require('next');
const express = require('express');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const cors = require('cors');
const expressPinoLogger = require('express-pino-logger');
const session = require('express-session');
const uid = require('uid-safe');

const logger = require('./utils/logger');
const authRoutes = require("./auth-routes");

const port = parseInt(process.env.PORT);
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // 2 - add session management to Express
  const sessionConfig = {
    secret: uid.sync(18),
    cookie: {
      maxAge: 86400 * 1000 // 24 hours in milliseconds
    },
    resave: false,
    saveUninitialized: true
  };
  server.use(session(sessionConfig));

  server.use(cors());

  if (process.env.HTTP_LOGGER === '1') {
    server.use(
      expressPinoLogger({
        logger
      })
    );
  }

  // 3 - configuring Auth0Strategy
  const auth0Strategy = new Auth0Strategy(
    {
      domain: process.env.AUTH0_DOMAIN,
      clientID: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      callbackURL: process.env.AUTH0_CALLBACK_URL
    },
    function(accessToken, refreshToken, extraParams, profile, done) {
      return done(null, profile);
    }
  );

  // 4 - configuring Passport
  passport.use(auth0Strategy);
  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((user, done) => done(null, user));

  // 5 - adding Passport and authentication routes
  server.use(passport.initialize());
  server.use(passport.session());
  server.use(authRoutes);

  // server.use(thoughtsAPI);

  // 6 - you are restricting access to some routes
  const restrictAccess = (req, res, next) => {
    if (!req.isAuthenticated()) return res.redirect('/login');
    next();
  };

  // handling everything else with Next.js
  server.get('*', handle);

  http.createServer(server).listen(process.env.PORT, err => {
    if (err) {
      throw err;
    }

    logger.info(
      `App is running at http://localhost:${port} in ${process.env.NODE_ENV} mode`
    );
  });
});
