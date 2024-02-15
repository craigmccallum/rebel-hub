import { z } from 'zod';

import { createEnvVarsParser } from '@rebel-hub/service-tools';

const envVarsSchema = z.object({
  NODE_ENV: z.enum(['development', 'staging', 'production']),
  SERVER_PORT: z.coerce.number().int().nonnegative(),
  JWT_PRIVATE_KEY: z.string(),
  DATABASE_URL: z.string().startsWith('postgres://'),
  // KAFKA_CLIENT_ID: z.string(),
  // KAFKA_BROKER_URLS: z.string().transform((brokerUrls) => brokerUrls.split(',')),
  // KAFKA_GROUP_ID: z.string(),
  // KAFKA_TOPIC: z.string(),
});

const parseEnvVars = createEnvVarsParser(envVarsSchema);

export const getEnvVars = () => parseEnvVars(process.env);
