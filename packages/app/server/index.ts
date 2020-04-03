import { config } from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import nextJs from 'next';
import http from 'http';
import expressPinoLogger from 'express-pino-logger';
import uid from 'uid-safe';
import session from 'express-session';
import cors from 'cors';
import passport from 'passport';
import Auth0Strategy from 'passport-auth0';
import MemoryStore from 'memorystore';

import { logger } from '../utils/logger';
import { handleError } from '../utils/error-handler';
import authRoutes from './auth-routes';

config({ path: `${__dirname}/../../../.env` });

const dev = process.env.NODE_ENV !== 'production';
const app = nextJs({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

(async (): Promise<void> => {
  try {
    await app.prepare();
    const server = express();

    const SessionMemoryStore = MemoryStore(session);
    const MAX_AGE = 86400000; // prune expired entries every 24h

    const sessionConfig = {
      secret: uid.sync(18),
      cookie: {
        maxAge: MAX_AGE,
      },
      store: new SessionMemoryStore({
        checkPeriod: MAX_AGE,
      }),
      resave: false,
      saveUninitialized: true,
    };

    server.use(session(sessionConfig));
    server.use(cors());

    if (process.env.HTTP_LOGGER === '1') {
      server.use(
        expressPinoLogger({
          logger,
        })
      );
    }
    server.use(
      async (err: Error, req: Request, res: Response, next: NextFunction) => {
        const isOperationalError = await handleError(err);
        if (!isOperationalError) {
          next(err);
        }
      }
    );

    // Configuring Auth0Strategy
    const auth0Strategy = new Auth0Strategy(
      {
        domain: process.env.AUTH0_DOMAIN,
        clientID: process.env.AUTH0_CLIENT_ID,
        clientSecret: process.env.AUTH0_CLIENT_SECRET,
        callbackURL: process.env.AUTH0_CALLBACK_URL,
      },
      (accessToken, refreshToken, extraParams, profile, done) => {
        return done(null, profile);
      }
    );

    // Configuring Passport
    passport.use(auth0Strategy);
    passport.serializeUser((user, done) => done(null, user));
    passport.deserializeUser((user, done) => done(null, user));

    // Adding Passport and authentication routes
    server.use(passport.initialize());
    server.use(passport.session());
    server.use(authRoutes);

    // Restricting access to some routes

    //   const restrictAccess = (req, res, next) => {
    //     if (!req.isAuthenticated()) return res.redirect('/login');
    //     next();
    //   };

    server.get('*', (req: Request, res: Response) => handle(req, res));

    http.createServer(server).listen(port, () => {
      logger.info(
        `App is running at http://localhost:${port} in ${process.env.NODE_ENV} mode`
      );
    });
  } catch (err) {
    handleError(err);
    process.exit(1);
  }
})();
