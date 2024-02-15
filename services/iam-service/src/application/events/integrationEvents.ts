import type { IntegrationEvent } from '@rebel-hub/service-tools';

export type UserRegisteredIntegrationEvent = IntegrationEvent<{
  metadata: {
    version: '1.0';
    boundedContext: 'IAM';
  };
  type: 'USER_REGISTERED';
  payload: {
    id: string;
    email: string;
  };
}>;
