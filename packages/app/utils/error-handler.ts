import { logger } from './logger';

function ErrorHandler(): void {
  this.handleError = async (err): void => {
    await logger.error(err);
    return false;
  };
}

const errorHandler = new ErrorHandler();
export { errorHandler };
