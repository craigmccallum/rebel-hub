import { type RequestHandler } from 'express';

import { InvalidQueryDataError } from '~/application/queryHandlers/errors';
import {
  CommandStateError,
  InvalidCommandDataError,
} from '../../../application/commandHandlers/errors';
import { sendExpressResponse } from '../responses';

/**
 * This decorator handles commonly thrown errors consistently with an internal server error fallback.
 *
 * @example
 *
 * const router = express.Router();
 *
 * router.get(
 *   'api/something/...',
 *   ...
 *   withErrorHandling(async (req, res) => {
 *     // do something
 *   })
 * )
 */
export const withErrorHandling =
  (handleRequest: RequestHandler): RequestHandler =>
  async (req, res, next) => {
    try {
      await handleRequest(req, res, next);
    } catch (error) {
      if (
        error instanceof InvalidCommandDataError ||
        error instanceof InvalidQueryDataError ||
        error instanceof CommandStateError
      ) {
        return sendExpressResponse(res, 400, { error: error.properties.externalErrorDetails });
      }

      return sendExpressResponse(res, 500, { error: 'Something went wrong' });
    }
  };
