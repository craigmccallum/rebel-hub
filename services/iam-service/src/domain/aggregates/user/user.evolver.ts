import { exhaustiveSwitchGuard } from '@rebel-hub/service-tools';
import { User, parseUser } from './user.aggregate';
import { UserSuccessDomainEvents } from './user.domainEvents';

export const evolveUser = (user: User | null, domainEvent: UserSuccessDomainEvents): User => {
  switch (domainEvent.type) {
    case 'DE/IAM/USER/USER_REGISTERED':
    case 'DE/IAM/USER/USER_PASSWORD_UPDATED':
    case 'DE/IAM/USER/USER_DEACTIVATED':
    case 'DE/IAM/USER/USER_REACTIVATED':
      return parseUser({
        ...(user ?? ({} as User)),
        ...domainEvent.payload,
      });
    default:
      exhaustiveSwitchGuard(domainEvent);
  }
};
