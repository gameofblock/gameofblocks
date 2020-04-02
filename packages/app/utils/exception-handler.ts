import { handleError } from './error-handler';

function ExceptionHandler(): void {
  process.on('unhandledRejection', (reason) => {
    // I just caught an unhandled promise rejection,
    // since we already have fallback handler for unhandled errors (see below),
    // let throw and let him handle that
    throw reason;
  });

  process.on('uncaughtException', (error) => handleError(error));
}
const exceptionHandler = new ExceptionHandler();

export { exceptionHandler };
