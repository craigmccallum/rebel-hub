import { type DomainEvent } from '@rebel-hub/service-tools';

import type { User } from '../user/user.aggregate';
import type { AuthPassport } from './authPassport.aggregate';

// Metadata
// --------

type AuthPassportDomainEventMetadata = {
  boundedContext: 'IAM';
  aggregateType: 'AUTH_PASSPORT';
  aggregateId: AuthPassport['id'] | null;
};

// Aggregated events
// -----------------

export type AuthPassportDomainEvents =
  | AuthPassportSuccessDomainEvents
  | AuthPassportFailDomainEvents;

export type AuthPassportSuccessDomainEvents =
  | AuthPassportGeneratedDomainEvent
  | AuthPassportInvalidatedDomainEvent
  | AuthPassportVerifiedDomainEvent;

export type AuthPassportFailDomainEvents =
  | AuthPassportGenerationFailedDomainEvent
  | AuthPassportVerificationFailedDomainEvent;

// Auth passport generation events
// -------------------------------

export type AuthPassportGeneratedDomainEvent = DomainEvent<{
  metadata: AuthPassportDomainEventMetadata;
  type: 'AUTH_PASSPORT_GENERATED';
  payload: {
    id: AuthPassport['id'];
    userId: AuthPassport['userId'];
    state: AuthPassport['state'] & 'active';
    issuedAt: AuthPassport['issuedAt'];
    expiresAt: AuthPassport['expiresAt'];
  };
}>;

export type AuthPassportGenerationFailedDomainEvent =
  | DomainEvent<{
      metadata: AuthPassportDomainEventMetadata;
      type: 'AUTH_PASSPORT_GENERATION_FAILED/USER_DEACTIVATED';
      payload: {
        userId: User['id'];
      };
    }>
  | DomainEvent<{
      metadata: AuthPassportDomainEventMetadata;
      type: 'AUTH_PASSPORT_GENERATION_FAILED/LIMIT_REACHED';
      payload: {
        userId: User['id'];
        activeAuthPassports: number;
      };
    }>
  | DomainEvent<{
      metadata: AuthPassportDomainEventMetadata;
      type: 'AUTH_PASSPORT_GENERATION_FAILED/INCORRECT_PASSWORD';
      payload: {
        userId: User['id'];
      };
    }>;

// Auth passport invalidation events
// ---------------------------------

export type AuthPassportInvalidatedDomainEvent = DomainEvent<{
  metadata: AuthPassportDomainEventMetadata;
  type: 'AUTH_PASSPORT_INVALIDATED';
  payload: {
    id: AuthPassport['id'];
    state: AuthPassport['state'] & 'invalidated';
  };
}>;

// Auth passport verification events
// -----------------------------------

export type AuthPassportVerifiedDomainEvent = DomainEvent<{
  metadata: AuthPassportDomainEventMetadata;
  type: 'AUTH_PASSPORT_VERIFIED';
  payload: {
    id: AuthPassport['id'];
    expiresAt: AuthPassport['expiresAt'];
    userId: AuthPassport['userId'];
  };
}>;

export type AuthPassportVerificationFailedDomainEvent = DomainEvent<{
  metadata: AuthPassportDomainEventMetadata;
  type: 'AUTH_PASSPORT_VERIFICATION_FAILED/USER_DEACTIVATED';
  payload: {
    userId: User['id'];
  };
}>;
