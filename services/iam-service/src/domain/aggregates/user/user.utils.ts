import { generateMock } from '@anatine/zod-mock';
import bcrypt from 'bcrypt';
import { z } from 'zod';

import type { UserInput } from './user.aggregate';
import { parseUser, userInputSchema } from './user.aggregate';

// Types
// -----

export type RawUserPassword = z.infer<typeof rawUserPasswordSchema>;

// Utils
// -----

// Password utils
export const rawUserPasswordSchema = z.string().min(8).max(64);

export const parseRawUserPassword = (rawPassword: string) => rawPassword; // TODO: fix me
// export const parseRawUserPassword = createParser(rawUserPasswordSchema);

export const hashPassword = (rawPassword: RawUserPassword): UserInput['password'] =>
  bcrypt.hashSync(rawPassword, 10);

export const comparePassword = (
  rawPassword: RawUserPassword,
  hashedPassword: UserInput['password'],
): boolean => bcrypt.compareSync(rawPassword, hashedPassword);

// Test utils
// ----------

export const createFakeUser = (customAttributes?: Partial<UserInput>) =>
  parseUser({
    ...generateMock(userInputSchema),
    ...(customAttributes ?? {}),
  });
