import pino from 'pino';

const logger = pino({
  prettyPrint: true,
});

export { logger };
