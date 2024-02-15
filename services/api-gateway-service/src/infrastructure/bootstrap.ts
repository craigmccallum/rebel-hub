import { getEnvVars } from './environment/envVars';

export const bootstrapInfrastructure = async () => {
  const envVars = getEnvVars();

  return { envVars };
};
