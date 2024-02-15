import {
  CommandStateError,
  createCommandDataParser,
  createCommandHandler,
  exhaustiveSwitchGuard,
} from '@rebel-hub/service-tools';
import { z } from 'zod';

import { authPassportInputSchema } from '~/domain/aggregates/authPassport/authPassport.aggregate';
import { evolveAuthPassport } from '~/domain/aggregates/authPassport/authPassport.evolver';
import { AuthPassportRepository } from '~/domain/aggregates/authPassport/authPassport.ports';
import {
  deriveInvalidateAuthPassportDomainEvent,
  type DeriverArgs,
  type DeriverDomainEvent,
} from '~/domain/derivers/invalidateAuthPassport.deriver';

// Types
// -----

type HandlerDependencies = {
  authPassportRepository: AuthPassportRepository;
};
type HandlerData = z.infer<typeof commandDataSchema>;

// Command data schema & parser
// ----------------------------

const commandDataSchema = z.object({
  authPassportId: authPassportInputSchema.shape.id,
});
const parseCommandData = createCommandDataParser(commandDataSchema);

// Command Handler
// ---------------

export const handleLogUserOut = createCommandHandler<
  DeriverArgs,
  DeriverDomainEvent,
  HandlerDependencies,
  HandlerData
>({
  parseData: ({ data }) => parseCommandData(data),
  fetchState: async ({ dependencies, data }) => {
    const { authPassportRepository } = dependencies;
    const { authPassportId } = data;

    const authPassport = await authPassportRepository.getById(authPassportId);
    if (!authPassport) {
      throw new CommandStateError(
        `Auth Passport with ID ${authPassportId} does not exist`,
        'Auth passport does not exist',
        'info',
      );
    }

    return {
      authPassport,
    };
  },
  deriveDomainEvent: deriveInvalidateAuthPassportDomainEvent,
  processDomainEvent: async ({ dependencies, state, domainEvent }) => {
    const { authPassportRepository } = dependencies;
    const { authPassport } = state;

    switch (domainEvent.type) {
      case 'DE/IAM/AUTH_PASSPORT/AUTH_PASSPORT_INVALIDATED':
        await authPassportRepository.save(evolveAuthPassport(authPassport, domainEvent));
        break;
      default:
        exhaustiveSwitchGuard(domainEvent.type);
    }
  },
});
