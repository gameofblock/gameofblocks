import MemoryStore from 'memorystore';
import session from 'express-session';

export const MAX_AGE = 86400000;

const SessionMemoryStore = MemoryStore(session);

const store = new SessionMemoryStore({
  checkPeriod: MAX_AGE,
});

export default store;
