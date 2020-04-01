import { logger } from './logger';

function ErrorHandler(): void {
  this.handleError = async (err): Promise<boolean> => {
    await logger.error(err);
    return false;
  };
}

const errorHandler = new ErrorHandler();
export { errorHandler };
