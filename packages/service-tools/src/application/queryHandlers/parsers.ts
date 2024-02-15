import { z } from 'zod';

import { formatZodError } from '~/common/zod';
import { InvalidQueryDataError, InvalidQueryDTOError } from './errors';

export const createQueryDataParser =
  <TSchema extends z.ZodTypeAny, TData extends unknown | Record<string, unknown>>(
    schema: TSchema,
  ) =>
  (rawData: TData) => {
    const result = schema.safeParse(rawData);
    if (!result.success) {
      throw new InvalidQueryDataError(formatZodError(result.error), formatZodError(result.error));
    }
    return result.data;
  };

export const createQueryDTOParser =
  <TSchema extends z.ZodTypeAny, TData extends unknown | Record<string, unknown>>(
    schema: TSchema,
  ) =>
  (rawData: TData) => {
    const result = schema.safeParse(rawData);
    if (!result.success) {
      throw new InvalidQueryDTOError(formatZodError(result.error), formatZodError(result.error));
    }
    return result.data;
  };
