import express, { Request, Response, NextFunction } from 'express';
import nextJs from 'next';
import http from 'http';
import expressPinoLogger from 'express-pino-logger';
import uid from 'uid-safe';
import session from 'express-session';
import cors from 'cors';
import passport from 'passport';
import Auth0Strategy from 'passport-auth0';
import env from '@gameofblocks/env';

import { logger } from '../utils/logger';
import { handleError } from '../utils/error-handler';
import authRoutes from './auth-routes';

const dev = env.NODE_ENV !== 'production';
const app = nextJs({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

(async (): Promise<void> => {
  try {
    await app.prepare();
    const server = express();

    const sessionConfig = {
      secret: uid.sync(18),
      cookie: {
        maxAge: 86400 * 1000,
      },
      resave: false,
      saveUninitialized: true,
    };

    server.use(session(sessionConfig));
    server.use(cors());

    if (env.HTTP_LOGGER === '1') {
      server.use(
        expressPinoLogger({
          logger,
        })
      );
    }

    // Configuring Auth0Strategy
    const auth0Strategy = new Auth0Strategy(
      {
        domain: env.AUTH0_DOMAIN,
        clientID: env.AUTH0_CLIENT_ID,
        clientSecret: env.AUTH0_CLIENT_SECRET,
        callbackURL: env.AUTH0_CALLBACK_URL,
      },
      (profile, done) => {
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

    server.get('*', (req: Request, res: Response) => handle(req, res));

    server.use(
      async (err: Error, req: Request, res: Response, next: NextFunction) => {
        const isOperationalError = await handleError(err);
        if (!isOperationalError) {
          next(err);
        }
      }
    );

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
