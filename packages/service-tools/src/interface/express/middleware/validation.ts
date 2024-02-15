import { type RequestHandler } from 'express';
import { type z } from 'zod';
import { formatZodError } from '~/common/zod';
import { sendExpressResponse } from '../responses';

export const validateRequestParams =
  (requestParamsSchema: z.AnyZodObject): RequestHandler =>
  (req, res, next) => {
    const result = requestParamsSchema.safeParse(req.params);
    if (!result.success) {
      const error = formatZodError(result.error);
      console.error(error);
      return sendExpressResponse(res, 400, { error });
    }
    req.params = result.data;
    return next();
  };

export const validateRequestQuery =
  (requestQuerySchema: z.AnyZodObject): RequestHandler =>
  (req, res, next) => {
    const result = requestQuerySchema.safeParse(req.query);
    if (!result.success) {
      const error = formatZodError(result.error);
      console.error(error);
      return sendExpressResponse(res, 400, { error });
    }
    req.query = result.data;
    return next();
  };

export const validateRequestBody =
  (requestBodySchema: z.AnyZodObject): RequestHandler =>
  (req, res, next) => {
    const result = requestBodySchema.safeParse(req.body);
    if (!result.success) {
      const error = formatZodError(result.error);
      console.error(error);
      return sendExpressResponse(res, 400, { error });
    }
    req.body = result.data;
    return next();
  };
