import { DomainEvent } from '../../domain/events/domainEvents';
import { IntegrationEvent } from './integrationEvents';

export type DomainEventPublisherService = {
  publish: <TDomainEvent extends DomainEvent>(event: TDomainEvent) => Promise<void>;
};

type DomainEventHandlerName = string;
export type DomainEventSubscriberService = {
  subscribe: <TDomainEvent extends DomainEvent>(
    type: TDomainEvent['type'],
    handlers: Record<DomainEventHandlerName, (eventData: TDomainEvent) => Promise<void>>,
  ) => Promise<void>;
};

export type IntegrationEventPublisherService = {
  publish: <TIntegrationEvent extends IntegrationEvent>(event: TIntegrationEvent) => Promise<void>;
};

type IntegrationEventHandlerName = string;
export type IntegrationEventSubscriberService = {
  subscribe: <TIntegrationEvent extends IntegrationEvent>(
    type: TIntegrationEvent['type'],
    handlers: Record<IntegrationEventHandlerName, (eventData: TIntegrationEvent) => Promise<void>>,
  ) => Promise<void>;
};
