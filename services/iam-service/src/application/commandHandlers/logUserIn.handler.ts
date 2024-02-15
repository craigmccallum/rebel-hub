import {
  CommandStateError,
  createCommandDataParser,
  createCommandHandler,
  exhaustiveSwitchGuard,
} from '@rebel-hub/service-tools';
import { z } from 'zod';

import { evolveAuthPassport } from '~/domain/aggregates/authPassport/authPassport.evolver';
import { AuthPassportRepository } from '~/domain/aggregates/authPassport/authPassport.ports';
import { userInputSchema } from '~/domain/aggregates/user/user.aggregate';
import { UserRepository } from '~/domain/aggregates/user/user.ports';
import { rawUserPasswordSchema } from '~/domain/aggregates/user/user.utils';
import {
  deriveGenerateAuthPassportDomainEvent,
  type DeriverArgs,
  type DeriverDomainEvent,
} from '~/domain/derivers/generateAuthPassport.deriver';

// Types
// -----

type HandlerDependencies = {
  userRepository: UserRepository;
  authPassportRepository: AuthPassportRepository;
};
type HandlerData = z.infer<typeof logUserIncommandDataSchema>;

// Command data schema & parser
// ----------------------------

export const logUserIncommandDataSchema = z.object({
  email: userInputSchema.shape.email,
  phoneNumber: userInputSchema.shape.phoneNumber,
  rawPassword: rawUserPasswordSchema,
});
const parseCommandData = createCommandDataParser(logUserIncommandDataSchema);

// Command Handler
// ---------------

export const handleLogUserIn = createCommandHandler<
  DeriverArgs,
  DeriverDomainEvent,
  HandlerDependencies,
  HandlerData
>({
  parseData: ({ data }) => parseCommandData(data),
  fetchState: async ({ dependencies, data }) => {
    const { userRepository, authPassportRepository } = dependencies;
    const { email } = data;

    const user = await userRepository.getByEmail(email);
    if (!user) {
      throw new CommandStateError(
        `User with email ${email} does not exist`,
        'Email or password incorrect incorrect',
        'info',
      );
    }

    const activeAuthPassports = await authPassportRepository.getActiveByUserId(user.id);

    return {
      user,
      activeAuthPassports,
    };
  },
  deriveDomainEvent: deriveGenerateAuthPassportDomainEvent,
  processDomainEvent: async ({ dependencies, domainEvent }) => {
    const { authPassportRepository } = dependencies;

    switch (domainEvent.type) {
      case 'DE/IAM/AUTH_PASSPORT/AUTH_PASSPORT_GENERATED':
        await authPassportRepository.save(evolveAuthPassport(null, domainEvent));
        break;
      case 'DE/IAM/AUTH_PASSPORT/AUTH_PASSPORT_GENERATION_FAILED/INCORRECT_PASSWORD':
      case 'DE/IAM/AUTH_PASSPORT/AUTH_PASSPORT_GENERATION_FAILED/LIMIT_REACHED':
      case 'DE/IAM/AUTH_PASSPORT/AUTH_PASSPORT_GENERATION_FAILED/USER_DEACTIVATED':
        break;
      default:
        exhaustiveSwitchGuard(domainEvent);
    }
  },
});
