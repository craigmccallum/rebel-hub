import { createEnvVarsParser } from '@rebel-hub/service-tools';
import { z } from 'zod';

const envVarsSchema = z.object({
  NODE_ENV: z.enum(['development', 'staging', 'production']),
  SERVER_PORT: z.string().transform((serverPort) => parseInt(serverPort)),
  API_GATEWAY_URL: z.string(),
  IAM_SERVICE_URL: z.string(),
  WEB_CLIENT_URL: z.string(),
});

const parseEnvVars = createEnvVarsParser(envVarsSchema);

export const getEnvVars = () => parseEnvVars(process.env);
