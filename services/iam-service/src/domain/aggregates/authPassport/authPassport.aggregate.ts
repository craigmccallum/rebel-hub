import { createAggregateParser } from '@rebel-hub/service-tools';
import dayjs from 'dayjs';
import { z } from 'zod';

import { zc } from '@rebel-hub/service-tools';
import { userInputSchema } from '../user/user.aggregate';

// Types
// -----

export type AuthPassportInput = z.infer<typeof authPassportInputSchema>;
export type AuthPassport = z.infer<typeof authPassportTransformSchema>;

// Schemas
// -------

export const authPassportInputSchema = z.object({
  id: z.string().startsWith('authPassport-'),
  // Relationships
  userId: userInputSchema.shape.id,
  // Attributes
  state: z.enum(['active', 'expired', 'invalidated']),
  issuedAt: z.union([z.date(), zc.dayjs]),
  expiresAt: z.union([z.date(), zc.dayjs]),
});

const authPassportTransformSchema = authPassportInputSchema.transform((authPassport) => ({
  ...authPassport,
  issuedAt: dayjs(authPassport.issuedAt),
  expiresAt: dayjs(authPassport.expiresAt),
}));

// Parsers
// -------

export const parseAuthPassport = createAggregateParser(
  authPassportInputSchema,
  authPassportTransformSchema,
);
