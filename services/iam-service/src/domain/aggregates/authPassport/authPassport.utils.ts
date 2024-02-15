import { generateMock } from '@anatine/zod-mock';

import {
  authPassportInputSchema,
  parseAuthPassport,
  type AuthPassportInput,
} from './authPassport.aggregate';

// Utils
// -----

// Nothing here yet!

// Test utils
// ----------

export const createFakeAuthPassport = (customAttributes?: Partial<AuthPassportInput>) =>
  parseAuthPassport({
    ...generateMock(authPassportInputSchema),
    ...(customAttributes ?? {}),
  });
