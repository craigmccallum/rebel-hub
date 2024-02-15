import {
  createQueryDTOParser,
  createQueryDataParser,
  createQueryHandler,
} from '@rebel-hub/service-tools';
import { z } from 'zod';

// Types
// -----

type Data = z.infer<typeof queryDataSchema>;
type DTO = z.infer<typeof queryDTOSchema>;

// Query data schemas & parsers
// ----------------------------

const queryDataSchema = z.object({
  authPassport: z.object({
    userId: z.string().nullable(),
  }),
});
const parseQueryData = createQueryDataParser(queryDataSchema);

// Query DTO schemas & parsers
// ----------------------------

const queryDTOSchema = z.object({
  user: z
    .object({
      id: z.string(),
      email: z.string().email(),
    })
    .nullable(),
});
const parseQueryDTO = createQueryDTOParser(queryDTOSchema);

// Query Handler
// -------------

export const getUserById = createQueryHandler<Data, DTO>({
  parseData: ({ data }) => parseQueryData(data),
  getDTO: async ({ data }) => ({
    user: data.authPassport.userId
      ? {
          id: data.authPassport.userId,
          email: `${data.authPassport.userId}@test.com`,
        }
      : null,
  }),
  parseDTO: ({ dto }) => parseQueryDTO(dto),
});
