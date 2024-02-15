// import type {
//   DomainEventPublisherService,
//   DomainEventSubscriberService,
//   IntegrationEventPublisherService,
//   IntegrationEventSubscriberService,
// } from '@rebel-hub/service-tools';

import { handleLogUserIn } from './commandHandlers/logUserIn.handler';
import { handleLogUserOut } from './commandHandlers/logUserOut.handler';
import { handleRegisterUser } from './commandHandlers/registerUser.handler';
import { handleVerifyAuthPassport } from './commandHandlers/verifyAuthPassport.handler';
// import { setUpDomainEventSubscribers } from './events/domainEventSubscribers';
// import { setUpIntegrationEventSubscribers } from './events/integrationEventSubscribers';
import { AuthPassportRepository } from '~/domain/aggregates/authPassport/authPassport.ports';
import type { UserRepository } from '../domain/aggregates/user/user.ports';
import { getUserById } from './queryHandlers/getUserById';

// Types
// -----

export type CommandHandlers = Awaited<ReturnType<typeof bootstrapApplication>>['commandHandlers'];
export type QueryHandlers = Awaited<ReturnType<typeof bootstrapApplication>>['queryHandlers'];
type ApplicationDependencies = {
  commandDependencies: {
    userRepository: UserRepository;
    authPassportRepository: AuthPassportRepository;
  };
  // eventSubscriberDependencies: {
  //   domainEventPublisher: DomainEventPublisherService;
  //   domainEventSubscriber: DomainEventSubscriberService;
  //   integrationEventPublisher: IntegrationEventPublisherService;
  //   integrationEventSubscriber: IntegrationEventSubscriberService;
  // };
};

// Bootstrap Fn
// ------------

export const bootstrapApplication = async (coreDependencies: ApplicationDependencies) => {
  const {
    commandDependencies,
    // eventSubscriberDependencies
  } = coreDependencies;

  const commandHandlers = {
    authenticateUser: handleVerifyAuthPassport(commandDependencies),
    logUserIn: handleLogUserIn(commandDependencies),
    logUserOut: handleLogUserOut(commandDependencies),
    handleRegisterUser: handleRegisterUser(commandDependencies),
  };
  const queryHandlers = {
    getUserById,
  };

  // await setUpDomainEventSubscribers(
  //   eventSubscriberDependencies.domainEventSubscriber,
  //   eventSubscriberDependencies.integrationEventPublisher,
  //   commandHandlers
  // );

  // await setUpIntegrationEventSubscribers(
  //   eventSubscriberDependencies.integrationEventSubscriber,
  //   commandHandlers
  // );

  return {
    commandHandlers,
    queryHandlers,
  };
};
