import { generateDomainEventId, generateDomainEventTimestamp } from '@rebel-hub/service-tools';

import type { AuthPassport } from '../aggregates/authPassport/authPassport.aggregate';
import { type AuthPassportInvalidatedDomainEvent } from '../aggregates/authPassport/authPassport.domainEvents';

// Types
// -----

export type DeriverArgs = {
  data: Record<string, unknown>;
  state: {
    authPassport: AuthPassport;
  };
};
export type DeriverDomainEvent = AuthPassportInvalidatedDomainEvent;

// Deriver
// -------

export const deriveInvalidateAuthPassportDomainEvent = async (
  args: DeriverArgs,
): Promise<DeriverDomainEvent> => {
  const { authPassport } = args.state;

  return {
    metadata: {
      eventId: generateDomainEventId(),
      timestamp: generateDomainEventTimestamp(),
      boundedContext: 'IAM',
      aggregateType: 'AUTH_PASSPORT',
      aggregateId: authPassport.id,
    },
    type: 'DE/IAM/AUTH_PASSPORT/AUTH_PASSPORT_INVALIDATED',
    payload: {
      id: authPassport.id,
      state: 'invalidated',
    },
  };
};
