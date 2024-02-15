// import {
//   createKafkaDomainEventPublisher,
//   createKafkaDomainEventSubscriber,
//   createKafkaIntegrationEventPublisher,
//   createKafkaIntegrationEventSubscriber,
// } from '@rebel-hub/service-tools';

import { getEnvVars } from './environment/envVars';
import { authPassportPrismaRepository } from './repositories/authPassportRepository.prisma';
import { userPrismaRepository } from './repositories/userRepository.prisma';

export const bootstrapInfrastructure = async () => {
  const envVars = getEnvVars();

  const services = {
    // domainEventPublisher: await createKafkaDomainEventPublisher(
    //   envVars.KAFKA_CLIENT_ID,
    //   envVars.KAFKA_BROKER_URLS,
    //   {
    //     logInfo: console.log,
    //     logError: console.error,
    //   }
    // ),
    // domainEventSubscriber: await createKafkaDomainEventSubscriber(
    //   envVars.KAFKA_CLIENT_ID,
    //   envVars.KAFKA_BROKER_URLS,
    //   envVars.KAFKA_GROUP_ID,
    //   envVars.KAFKA_TOPIC,
    //   {
    //     logInfo: console.log,
    //     logError: console.error,
    //   }
    // ),
    // integrationEventPublisher: await createKafkaIntegrationEventPublisher(
    //   envVars.KAFKA_CLIENT_ID,
    //   envVars.KAFKA_BROKER_URLS,
    //   {
    //     logInfo: console.log,
    //     logError: console.error,
    //   }
    // ),
    // integrationEventSubscriber: await createKafkaIntegrationEventSubscriber(
    //   envVars.KAFKA_CLIENT_ID,
    //   envVars.KAFKA_BROKER_URLS,
    //   envVars.KAFKA_GROUP_ID,
    //   envVars.KAFKA_TOPIC,
    //   {
    //     logInfo: console.log,
    //     logError: console.error,
    //   }
    // ),
  };

  const repositories = {
    userRepository: userPrismaRepository,
    authPassportRepository: authPassportPrismaRepository,
  };

  return {
    envVars,
    repositories,
    services,
  };
};
