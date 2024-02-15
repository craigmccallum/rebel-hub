import 'dotenv/config';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { bootstrapApplication } from './application/bootstrap';
import { bootstrapInfrastructure } from './infrastructure/bootstrap';
import { bootstrapInterface } from './interface/bootstrap';

dayjs.extend(utc);

const bootstrapIAMService = async () => {
  const {
    envVars,
    repositories,
    // services
  } = await bootstrapInfrastructure();

  const { commandHandlers, queryHandlers } = await bootstrapApplication({
    commandDependencies: {
      userRepository: repositories.userRepository,
      authPassportRepository: repositories.authPassportRepository,
    },
    // eventSubscriberDependencies: {
    // domainEventPublisher: services.domainEventPublisher,
    // domainEventSubscriber: services.domainEventSubscriber,
    // integrationEventPublisher: services.integrationEventPublisher,
    // integrationEventSubscriber: services.integrationEventSubscriber,
    // },
  });

  bootstrapInterface(commandHandlers, queryHandlers, envVars.NODE_ENV, envVars.SERVER_PORT);
};

bootstrapIAMService();
