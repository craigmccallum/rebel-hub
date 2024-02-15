import { z } from 'zod';

import { formatZodError } from '~/common/zod';
import { InvalidCommandDataError } from './errors';

export const createCommandDataParser =
  <TSchema extends z.ZodTypeAny, TData extends unknown | Record<string, unknown>>(
    schema: TSchema,
  ) =>
  (rawData: TData) => {
    const result = schema.safeParse(rawData);
    if (!result.success) {
      throw new InvalidCommandDataError(formatZodError(result.error), formatZodError(result.error));
    }
    return result.data;
  };
