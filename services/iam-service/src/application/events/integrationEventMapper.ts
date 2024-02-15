import {
  exhaustiveSwitchGuard,
  ge,
  generateDomainEventTimestamp,
  generateIntegrationEventId,
  generateIntegrationEventTimestamp,
} from '@rebel-hub/service-tools';
import { AuthPassportDomainEvents } from '~/domain/authPassport/authPassport.domainEvents';
import type { UserDomainEvents } from '../../domain/aggregates/user/user.domainEvents';
import type { UserRegisteredIntegrationEvent } from './integrationEvents';

type DomainEvents = UserDomainEvents | AuthPassportDomainEvents;
type IntegrationEvents = UserRegisteredIntegrationEvent;

export const mapDomainEventToIntegrationEvents = (domainEvent: DomainEvents): IntegrationEvents => {
  switch (domainEvent.type) {
    case 'DE/IAM/USER/USER_REGISTERED':
      return {
        metadata: {
          eventId: generateIntegrationEventId(),
          timestamp: generateIntegrationEventTimestamp(),
          version: '1.0',
          boundedContext: 'IAM',
        },
        type: 'IE/IAM/USER_REGISTERED',
        payload: {
          id: domainEvent.payload.userId,
          email: domainEvent.payload.email,
        },
      };
    default:
      exhaustiveSwitchGuard(domainEvent.type);
  }
};
