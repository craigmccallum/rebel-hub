import { generateDomainEventId, generateDomainEventTimestamp } from '@rebel-hub/service-tools';
import type { User } from '../aggregates/user/user.aggregate';
import type {
  UserPasswordUpdateFailedDomainEvent,
  UserPasswordUpdatedDomainEvent,
} from '../aggregates/user/user.domainEvents';
import { comparePassword, hashPassword } from '../aggregates/user/user.utils';

// Types
// -----

export type DeriverArgs = {
  data: {
    rawPassword: string;
  };
  state: {
    user: User;
  };
};
export type DeriverDomainEvent =
  | UserPasswordUpdatedDomainEvent
  | UserPasswordUpdateFailedDomainEvent;

// Deriver
// -------

export const deriveUpdateUserPasswordDomainEvent = async (
  args: DeriverArgs,
): Promise<DeriverDomainEvent> => {
  const { rawPassword } = args.data;
  const { user } = args.state;

  const isPasswordMatch = comparePassword(rawPassword, user.password);
  if (isPasswordMatch) {
    return {
      metadata: {
        eventId: generateDomainEventId(),
        timestamp: generateDomainEventTimestamp(),
        boundedContext: 'IAM',
        aggregateType: 'USER',
        aggregateId: user.id,
      },
      type: 'DE/IAM/USER/USER_PASSWORD_UPDATE_FAILED/SAME_PASSWORD',
      payload: {
        id: user.id,
      },
    };
  }

  return {
    metadata: {
      eventId: generateDomainEventId(),
      timestamp: generateDomainEventTimestamp(),
      boundedContext: 'IAM',
      aggregateType: 'USER',
      aggregateId: user.id,
    },
    type: 'DE/IAM/USER/USER_PASSWORD_UPDATED',
    payload: {
      id: user.id,
      newPassword: hashPassword(rawPassword),
    },
  };
};
