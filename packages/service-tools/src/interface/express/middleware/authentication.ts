import type { NextFunction, Request, Response } from 'express';

import { AuthRequirements } from '~/common/auth';
import { exhaustiveSwitchGuard } from '~/common/utils/switchUtils';
import { sendExpressResponse } from '../responses';

/**
 * This middleware enforces authentication requirements
 *
 * @example
 *
 * const router = express.Router();
 *
 * router.get(
 *   'api/something',
 *   ...
 *   enforceAuthRequirements("accountsOnly"),
 *   ...
 * )
 */
export const enforceAuthRequirements =
  (authRequirements: AuthRequirements) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const { authPassport } = req;

    switch (authRequirements) {
      case 'authenticated':
        if (authPassport?.userId) {
          return next();
        }
        return sendExpressResponse(res, 401, {
          error: 'Access denied - only authenticated requests can access this resource',
        });
      case 'notAuthenticated':
        if (authPassport?.userId) {
          return sendExpressResponse(res, 401, {
            error: 'Access denied - only unauthenticated requests can access this resource',
          });
        }
        return next();
      case 'none':
        return next();
      default:
        exhaustiveSwitchGuard(authRequirements);
    }
  };
