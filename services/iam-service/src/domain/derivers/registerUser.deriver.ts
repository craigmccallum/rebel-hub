import {
  generateDomainEventId,
  generateDomainEventTimestamp,
  generateId,
} from '@rebel-hub/service-tools';

import { type User } from '../aggregates/user/user.aggregate';
import {
  type UserRegisteredDomainEvent,
  type UserRegistrationFailedDomainEvent,
} from '../aggregates/user/user.domainEvents';
import { hashPassword } from '../aggregates/user/user.utils';

// Types
// -----

export type DeriverArgs = {
  data: {
    email: User['email'];
    phoneNumber: User['phoneNumber'];
    rawPassword: User['password'];
  };
  state: {
    user: User | null;
  };
};
export type DeriverDomainEvent = UserRegisteredDomainEvent | UserRegistrationFailedDomainEvent;

// Deriver
// -------

export const deriveRegisterUserDomainEvent = async (
  args: DeriverArgs,
): Promise<DeriverDomainEvent> => {
  const { email, phoneNumber, rawPassword } = args.data;
  const { user } = args.state;

  if (user) {
    return {
      metadata: {
        eventId: generateDomainEventId(),
        timestamp: generateDomainEventTimestamp(),
        boundedContext: 'IAM',
        aggregateType: 'USER',
        aggregateId: user.id,
      },
      type: 'DE/IAM/USER/USER_REGISTRATION_FAILED/ALREADY_REGISTERED',
      payload: {
        id: user.id,
      },
    };
  }

  const userId = generateId('user');
  const userPassword = hashPassword(rawPassword);
  const userState = email.includes('@rebel-hub.com') ? 'verified' : 'unverified';
  return {
    metadata: {
      eventId: generateDomainEventId(),
      timestamp: generateDomainEventTimestamp(),
      boundedContext: 'IAM',
      aggregateType: 'USER',
      aggregateId: userId,
    },
    type: 'DE/IAM/USER/USER_REGISTERED',
    payload: {
      id: userId,
      email,
      phoneNumber,
      password: userPassword,
      state: userState,
    },
  };
};
