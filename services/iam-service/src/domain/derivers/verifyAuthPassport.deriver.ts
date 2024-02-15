import { generateDomainEventId, generateDomainEventTimestamp } from '@rebel-hub/service-tools';
import dayjs from 'dayjs';

import { AuthPassport } from '../aggregates/authPassport/authPassport.aggregate';
import {
  AuthPassportVerificationFailedDomainEvent,
  AuthPassportVerifiedDomainEvent,
} from '../aggregates/authPassport/authPassport.domainEvents';
import { type User } from '../aggregates/user/user.aggregate';

// Types
// -----

export type DeriverArgs = {
  data: Record<string, unknown>;
  state: {
    authPassport: AuthPassport;
    user: User;
  };
};
export type DeriverDomainEvent =
  | AuthPassportVerifiedDomainEvent
  | AuthPassportVerificationFailedDomainEvent;

// Deriver
// -------

export const deriveVerifyAuthPassportDomainEvent = async (
  args: DeriverArgs,
): Promise<DeriverDomainEvent> => {
  const { authPassport, user } = args.state;

  const isDeactivated = user.state === 'deactivated';
  if (isDeactivated) {
    return {
      metadata: {
        eventId: generateDomainEventId(),
        timestamp: generateDomainEventTimestamp(),
        boundedContext: 'IAM',
        aggregateType: 'AUTH_PASSPORT',
        aggregateId: user.id,
      },
      type: 'DE/IAM/AUTH_PASSPORT/AUTH_PASSPORT_VERIFICATION_FAILED/USER_DEACTIVATED',
      payload: {
        userId: user.id,
      },
    };
  }

  const expiresAt = dayjs.utc().add(30, 'minutes'); // Should this be utc?
  return {
    metadata: {
      eventId: generateDomainEventId(),
      timestamp: generateDomainEventTimestamp(),
      boundedContext: 'IAM',
      aggregateType: 'AUTH_PASSPORT',
      aggregateId: user.id,
    },
    type: 'DE/IAM/AUTH_PASSPORT/AUTH_PASSPORT_VERIFIED',
    payload: {
      id: authPassport.id,
      expiresAt,
      userId: user.id,
    },
  };
};
