import { createAggregateParser } from '@rebel-hub/service-tools';
import { z } from 'zod';

// Types
// -----

export type UserInput = z.infer<typeof userInputSchema>;
export type User = z.infer<typeof userTransformSchema>;

// Schemas
// -------

export const userInputSchema = z.object({
  id: z.string().startsWith('user-'),
  email: z.string().email(),
  phoneNumber: z.string().min(8).max(13).startsWith('+').nullable(),
  password: z.string(),
  state: z.enum(['unverified', 'verified', 'deactivated']),
});

export const userTransformSchema = userInputSchema.transform((user) => user);

// Parsers
// -------

export const parseUser = createAggregateParser(userInputSchema, userTransformSchema);
