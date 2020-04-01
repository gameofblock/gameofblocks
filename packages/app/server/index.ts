import express, { Request, Response, NextFunction } from 'express';
import nextJs from 'next';
import http from 'http';
import expressPinoLogger from 'express-pino-logger';
import { logger } from '../utils/logger';
import { errorHandler } from '../utils/error-handler';

const dev = process.env.NODE_ENV !== 'production';
const app = nextJs({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

(async (): Promise<void> => {
  await app.prepare();
  const server = express();

  if (process.env.HTTP_LOGGER === '1') {
    server.use(
      expressPinoLogger({
        logger,
      })
    );
  }

  server.use(
    async (err: Error, req: Request, res: Response, next: NextFunction) => {
      const isOperationalError = await errorHandler.handleError(err);
      if (!isOperationalError) {
        next(err);
      }
    }
  );

  server.get('*', (req: Request, res: Response) => handle(req, res));

  http.createServer(server).listen(port, () => {
    logger.info(
      `App is running at http://localhost:${port} in ${process.env.NODE_ENV} mode`
    );
  });
})();
