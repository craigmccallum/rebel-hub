import 'dotenv/config';

import {
  createExpressServer,
  startServer,
  type ClientUrls,
  type ServiceUrls,
} from './expressApi/server';

export const bootstrapInterface = (
  environment: 'development' | 'staging' | 'production',
  serverPort: number,
  serviceUrls: ServiceUrls,
  clientUrls: ClientUrls,
) => {
  const expressApp = createExpressServer(environment, serviceUrls, clientUrls);
  startServer(expressApp, serverPort);
};
