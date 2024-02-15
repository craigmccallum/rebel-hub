import { type DomainEvent } from '@rebel-hub/service-tools';

import { type User } from './user.aggregate';

// Metadata
// --------

type UserDomainEventMetadata = {
  boundedContext: 'IAM';
  aggregateType: 'USER';
  aggregateId: User['id'] | null;
};

// Aggregated events
// -----------------

export type UserDomainEvents = UserSuccessDomainEvents | UserFailDomainEvents;

export type UserSuccessDomainEvents =
  | UserRegisteredDomainEvent
  | UserDeactivatedDomainEvent
  | UserReactivatedDomainEvent
  | UserPasswordUpdatedDomainEvent;

export type UserFailDomainEvents =
  | UserRegistrationFailedDomainEvent
  | UserPasswordUpdateFailedDomainEvent;

// Registration events
// -------------------

export type UserRegisteredDomainEvent = DomainEvent<{
  metadata: UserDomainEventMetadata;
  type: 'USER_REGISTERED';
  payload: {
    id: User['id'];
    email: User['email'];
    phoneNumber: User['phoneNumber'];
    password: User['password'];
    state: 'unverified' | 'verified';
  };
}>;

export type UserRegistrationFailedDomainEvent = DomainEvent<{
  metadata: UserDomainEventMetadata;
  type: 'USER_REGISTRATION_FAILED/ALREADY_REGISTERED';
  payload: {
    id: User['id'];
  };
}>;

// Deactivation / Reactivation events
// ----------------------------------

export type UserDeactivatedDomainEvent = DomainEvent<{
  metadata: UserDomainEventMetadata;
  type: 'USER_DEACTIVATED';
  payload: {
    id: User['id'];
    state: User['state'] & 'deactivated';
  };
}>;

export type UserReactivatedDomainEvent = DomainEvent<{
  metadata: UserDomainEventMetadata;
  type: 'USER_REACTIVATED';
  payload: {
    id: User['id'];
    state: User['state'] & 'verified';
  };
}>;

// Update password events
// ----------------------

export type UserPasswordUpdatedDomainEvent = DomainEvent<{
  metadata: UserDomainEventMetadata;
  type: 'USER_PASSWORD_UPDATED';
  payload: {
    id: User['id'];
    newPassword: User['password'];
  };
}>;

export type UserPasswordUpdateFailedDomainEvent = DomainEvent<{
  metadata: UserDomainEventMetadata;
  type: 'USER_PASSWORD_UPDATE_FAILED/SAME_PASSWORD';
  payload: {
    id: User['id'];
  };
}>;
