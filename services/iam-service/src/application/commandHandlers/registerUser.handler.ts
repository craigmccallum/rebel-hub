import {
  createCommandDataParser,
  createCommandHandler,
  exhaustiveSwitchGuard,
} from '@rebel-hub/service-tools';
import { z } from 'zod';

import { userInputSchema } from '~/domain/aggregates/user/user.aggregate';
import { evolveUser } from '~/domain/aggregates/user/user.evolver';
import { UserRepository } from '~/domain/aggregates/user/user.ports';
import { rawUserPasswordSchema } from '~/domain/aggregates/user/user.utils';
import {
  deriveRegisterUserDomainEvent,
  type DeriverArgs,
  type DeriverDomainEvent,
} from '~/domain/derivers/registerUser.deriver';

// Types
// -----

type HandlerDependencies = {
  userRepository: UserRepository;
};
type HandlerData = z.infer<typeof commandDataSchema>;

// Command data schema & parser
// ----------------------------

const commandDataSchema = z.object({
  email: userInputSchema.shape.email,
  phoneNumber: userInputSchema.shape.phoneNumber,
  rawPassword: rawUserPasswordSchema,
});
const parseCommandData = createCommandDataParser(commandDataSchema);

// Command Handler
// ---------------

export const handleRegisterUser = createCommandHandler<
  DeriverArgs,
  DeriverDomainEvent,
  HandlerDependencies,
  HandlerData
>({
  parseData: ({ data }) => parseCommandData(data),
  fetchState: async ({ dependencies, data }) => {
    const { userRepository } = dependencies;
    const { email, phoneNumber } = data;

    const user = email
      ? await userRepository.getByEmail(email)
      : phoneNumber
      ? await userRepository.getByPhoneNumber(phoneNumber)
      : null;

    return {
      user,
    };
  },
  deriveDomainEvent: deriveRegisterUserDomainEvent,
  processDomainEvent: async ({ dependencies, state, domainEvent }) => {
    const { userRepository } = dependencies;
    const { user } = state;

    switch (domainEvent.type) {
      case 'DE/IAM/USER/USER_REGISTERED':
        await userRepository.save(evolveUser(null, domainEvent));
        break;
      case 'DE/IAM/USER/USER_REGISTRATION_FAILED/ALREADY_REGISTERED':
        break;
      default:
        exhaustiveSwitchGuard(domainEvent);
    }
  },
});
