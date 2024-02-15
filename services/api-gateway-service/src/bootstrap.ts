import 'dotenv/config';

import { bootstrapInfrastructure } from './infrastructure/bootstrap';
import { bootstrapInterface } from './interface/bootstrap';

const bootstrapGateway = async () => {
  const { envVars } = await bootstrapInfrastructure();

  await bootstrapInterface(
    envVars.NODE_ENV,
    envVars.SERVER_PORT,
    envVars.API_GATEWAY_URL,
    envVars.IAM_SERVICE_URL,
    envVars.WEB_CLIENT_URL,
  );
};

bootstrapGateway();
