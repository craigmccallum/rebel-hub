// ------
// Common
// ------

// Auth
export type { AuthPassport } from './common/auth';

// Errors
export { BaseError, UnexpectedError } from './common/errors';

// Utils
export { generateId } from './common/utils/idUtils';
export { parseJson, stringifyJson } from './common/utils/jsonUtils';
export { exhaustiveSwitchGuard } from './common/utils/switchUtils';
export { type Branded } from './common/utils/typeUtils';

// Zod
export { formatZodError, zc } from './common/zod';

// ------
// Domain
// ------

// Aggregates
export { InvalidAggregateError } from './domain/aggregates/errors';
export { createAggregateParser } from './domain/aggregates/parsing';

// Events
export {
  generateDomainEventId,
  generateDomainEventTimestamp,
  type DomainEvent,
} from './domain/events/domainEvents';

// -----------
// Application
// -----------

// Command handlers
export { CommandStateError, InvalidCommandDataError } from './application/commandHandlers/errors';
export { createCommandHandler } from './application/commandHandlers/handlers';
export { createCommandDataParser } from './application/commandHandlers/parsers';

// Events
export {
  generateIntegrationEventId,
  generateIntegrationEventTimestamp,
  type IntegrationEvent,
} from './application/events/integrationEvents';

// Queries & query handlers
export { InvalidQueryDataError } from './application/queryHandlers/errors';
export { createQueryHandler } from './application/queryHandlers/handlers';
export { createQueryDTOParser, createQueryDataParser } from './application/queryHandlers/parsers';

// --------------
// Infrastructure
// --------------

// Environment
export { createEnvVarsParser } from './infrastructure/environment/parsers';

// Messaging services
export {
  DomainEventPublisherService,
  DomainEventSubscriberService,
  IntegrationEventPublisherService,
  IntegrationEventSubscriberService,
} from '~/application/events/eventServices';
export {
  createKafkaDomainEventPublisher,
  createKafkaDomainEventSubscriber,
  createKafkaIntegrationEventPublisher,
  createKafkaIntegrationEventSubscriber,
} from './infrastructure/services/kafkaMessagingService';

// ---------
// Interface
// ---------

// Route definitions
export {
  initialiseRouteDefinition,
  type RouteDefinitionRequestSchemas,
  type RouteDefinitionResponseSchemas,
} from './interface/routeDefinitions/routeDefinitions';

// Express
export { setUpExpressRoutes } from './interface/express/routes';

// OpenAPI docs
export {
  openApiConfig,
  registerOpenAPIEndpoints,
  zodOpenApiRegistry,
} from './interface/openAPI/registry';
