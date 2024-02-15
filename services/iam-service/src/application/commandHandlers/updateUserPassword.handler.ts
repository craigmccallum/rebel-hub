import {
  CommandStateError,
  createCommandDataParser,
  createCommandHandler,
  exhaustiveSwitchGuard,
} from '@rebel-hub/service-tools';
import { z } from 'zod';

import { userInputSchema } from '~/domain/aggregates/user/user.aggregate';
import { evolveUser } from '~/domain/aggregates/user/user.evolver';
import { UserRepository } from '~/domain/aggregates/user/user.ports';
import {
  deriveUpdateUserPasswordDomainEvent,
  type DeriverArgs,
  type DeriverDomainEvent,
} from '~/domain/derivers/updateUserPassword.deriver';

// Types
// -----

type HandlerDependencies = {
  userRepository: UserRepository;
};
type HandlerData = z.infer<typeof commandDataSchema>;

// Command data schema & parser
// ----------------------------

const commandDataSchema = z.object({
  userId: userInputSchema.shape.id,
  rawPassword: z.string(),
});
const parseCommandData = createCommandDataParser(commandDataSchema);

// Command Handler
// ---------------

export const handleUpdateUserPassword = createCommandHandler<
  DeriverArgs,
  DeriverDomainEvent,
  HandlerDependencies,
  HandlerData
>({
  parseData: ({ data }) => parseCommandData(data),
  fetchState: async ({ dependencies, data }) => {
    const { userRepository } = dependencies;
    const { userId } = data;

    const user = await userRepository.getById(userId);
    if (!user) {
      throw new CommandStateError(`No user found with ID ${userId}`, 'User not found', 'info');
    }

    return {
      user,
    };
  },
  deriveDomainEvent: deriveUpdateUserPasswordDomainEvent,
  processDomainEvent: async ({ dependencies, state, domainEvent }) => {
    const { userRepository } = dependencies;
    const { user } = state;

    switch (domainEvent.type) {
      case 'DE/IAM/USER/USER_PASSWORD_UPDATED':
        await userRepository.save(evolveUser(user, domainEvent));
        break;
      case 'DE/IAM/USER/USER_PASSWORD_UPDATE_FAILED/SAME_PASSWORD':
        break;
      default:
        exhaustiveSwitchGuard(domainEvent);
    }
  },
});
