import { z } from 'zod';

import { formatZodError } from '~/common/zod';
import { InvalidAggregateError } from './errors';

export const createAggregateParser =
  <
    TAggregateInputSchema extends z.Schema,
    TAggregateTransformSchema extends z.Schema,
    TInputData extends z.infer<TAggregateInputSchema>,
    TOutputData extends z.infer<TAggregateTransformSchema>,
  >(
    _aggregateInputSchema: TAggregateInputSchema,
    aggregateTransformSchema: TAggregateTransformSchema,
  ) =>
  (rawData: TInputData | Record<keyof TInputData, unknown>): TOutputData => {
    const result = aggregateTransformSchema.safeParse(rawData);
    if (!result.success) {
      throw new InvalidAggregateError(formatZodError(result.error));
    }
    return result.data;
  };
