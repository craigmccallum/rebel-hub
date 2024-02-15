import { type NextFunction, type Request, type Response } from 'express';

import { Envs } from '~/common/envs';

export const rejectIfNotInEnv =
  (envs: 'all' | Envs[]) => (_req: Request, res: Response, next: NextFunction) => {
    if (envs === 'all') return next();

    if (!envs.includes((process.env.NODE_ENV as Envs) ?? '')) {
      return res.status(404).json({
        error: 'Not found',
      });
    }

    return next();
  };
