import express, { Request, Response } from 'express';
import next from 'next';
import http from 'http';
import { logger } from '../utils/logger';
import { errorHandler } from '../utils/error-handler';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

(async (): void => {
  try {
    await app.prepare();
    const server = express();

    server.use((err) => {
      errorHandler.handleError(err).then((isOperationalError) => {
        if (!isOperationalError) {
          next(err);
        }
      });
    });

    if (process.env.HTTP_LOGGER === '1') {
      server.use(
        expressPinoLogger({
          logger,
        })
      );
    }

    server.get('*', (req: Request, res: Response) => {
      return handle(req, res);
    });

    http.createServer(server).listen(port, (err) => {
      if (err) {
        throw err;
      }
      logger.info(
        `App is running at http://localhost:${port} in ${process.env.NODE_ENV} mode`
      );
    });
  } catch (e) {
    errorHandler.handleError(err);
    process.exit(1);
  }
})();
