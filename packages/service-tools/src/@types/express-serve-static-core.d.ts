import type { AuthPassport } from '..';

export declare module 'express-serve-static-core' {
  interface Request {
    authPassport: AuthPassport;
  }
}
