import { logger } from './logger';

export async function handleError(err): Promise<boolean> {
  await logger.error(err);
  return false;
}
