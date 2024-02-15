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
import { UserRepository } from '~/domain/aggregates/user/user.ports';
import {
  deriveVerifyAuthPassportDomainEvent,
  type DeriverArgs,
  type DeriverDomainEvent,
} from '~/domain/derivers/verifyAuthPassport.deriver';

// Types
// -----

type HandlerDependencies = {
  authPassportRepository: AuthPassportRepository;
  userRepository: UserRepository;
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

export const handleVerifyAuthPassport = createCommandHandler<
  DeriverArgs,
  DeriverDomainEvent,
  HandlerDependencies,
  HandlerData
>({
  parseData: ({ data }) => parseCommandData(data),
  fetchState: async ({ dependencies, data }) => {
    const { authPassportRepository, userRepository } = dependencies;
    const { authPassportId } = data;

    const authPassport = await authPassportRepository.getById(authPassportId);
    if (!authPassport) {
      throw new CommandStateError(
        `No auth passport found for access token ${authPassportId}`,
        'Access token invalid',
        'error',
      );
    }

    const user = await userRepository.getById(authPassport.userId);
    if (!user) {
      throw new CommandStateError(
        `No user found relating to auth passport with ID ${authPassport.id}`,
        'User not found',
        'info',
      );
    }

    return {
      authPassport,
      user,
    };
  },
  deriveDomainEvent: deriveVerifyAuthPassportDomainEvent,
  processDomainEvent: async ({ dependencies, state, domainEvent }) => {
    const { authPassportRepository } = dependencies;
    const { authPassport } = state;

    switch (domainEvent.type) {
      case 'DE/IAM/AUTH_PASSPORT/AUTH_PASSPORT_VERIFIED':
        authPassportRepository.save(evolveAuthPassport(authPassport, domainEvent));
      case 'DE/IAM/AUTH_PASSPORT/AUTH_PASSPORT_VERIFICATION_FAILED/USER_DEACTIVATED':
        break;
      default:
        exhaustiveSwitchGuard(domainEvent);
    }
  },
});
