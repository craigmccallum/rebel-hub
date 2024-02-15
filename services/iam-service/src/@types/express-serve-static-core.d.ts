import type { AuthPassport } from '@rebel-hub/service-tools';

export declare module 'express-serve-static-core' {
  interface Request {
    authPassport?: AuthPassport;
  }
}
