import {
  generateDomainEventId,
  generateDomainEventTimestamp,
  generateId,
} from '@rebel-hub/service-tools';
import dayjs from 'dayjs';

import type { User } from '~/domain/aggregates/user/user.aggregate';
import { RawUserPassword, comparePassword } from '~/domain/aggregates/user/user.utils';
import { AuthPassport } from '../aggregates/authPassport/authPassport.aggregate';
import {
  type AuthPassportGeneratedDomainEvent,
  type AuthPassportGenerationFailedDomainEvent,
} from '../aggregates/authPassport/authPassport.domainEvents';

// Types
// -----

export type DeriverArgs = {
  data: {
    rawPassword: RawUserPassword;
  };
  state: {
    user: User;
    activeAuthPassports: AuthPassport[];
  };
};
export type DeriverDomainEvent =
  | AuthPassportGeneratedDomainEvent
  | AuthPassportGenerationFailedDomainEvent;

// Deriver
// -------

export const deriveGenerateAuthPassportDomainEvent = async (
  args: DeriverArgs,
): Promise<DeriverDomainEvent> => {
  const { rawPassword } = args.data;
  const { user, activeAuthPassports } = args.state;

  if (user.state === 'deactivated') {
    return {
      metadata: {
        eventId: generateDomainEventId(),
        timestamp: generateDomainEventTimestamp(),
        boundedContext: 'IAM',
        aggregateType: 'AUTH_PASSPORT',
        aggregateId: user.id,
      },
      type: 'DE/IAM/AUTH_PASSPORT/AUTH_PASSPORT_GENERATION_FAILED/USER_DEACTIVATED',
      payload: {
        userId: user.id,
      },
    };
  }

  const isPasswordMatch = comparePassword(rawPassword, user.password);
  if (!isPasswordMatch) {
    return {
      metadata: {
        eventId: generateDomainEventId(),
        timestamp: generateDomainEventTimestamp(),
        boundedContext: 'IAM',
        aggregateType: 'AUTH_PASSPORT',
        aggregateId: null,
      },
      type: 'DE/IAM/AUTH_PASSPORT/AUTH_PASSPORT_GENERATION_FAILED/INCORRECT_PASSWORD',
      payload: {
        userId: user.id,
      },
    };
  }

  if (activeAuthPassports.length > 4) {
    return {
      metadata: {
        eventId: generateDomainEventId(),
        timestamp: generateDomainEventTimestamp(),
        boundedContext: 'IAM',
        aggregateType: 'AUTH_PASSPORT',
        aggregateId: user.id,
      },
      type: 'DE/IAM/AUTH_PASSPORT/AUTH_PASSPORT_GENERATION_FAILED/LIMIT_REACHED',
      payload: {
        userId: user.id,
        activeAuthPassports: activeAuthPassports.length,
      },
    };
  }

  const authPassportId = generateId('authPassport');
  const issuedAt = dayjs.utc(); // Should this be utc?
  return {
    metadata: {
      eventId: generateDomainEventId(),
      timestamp: generateDomainEventTimestamp(),
      boundedContext: 'IAM',
      aggregateType: 'AUTH_PASSPORT',
      aggregateId: authPassportId,
    },
    type: 'DE/IAM/AUTH_PASSPORT/AUTH_PASSPORT_GENERATED',
    payload: {
      id: authPassportId,
      userId: user.id,
      state: 'active',
      issuedAt,
      expiresAt: issuedAt.add(30, 'minutes'),
    },
  };
};
