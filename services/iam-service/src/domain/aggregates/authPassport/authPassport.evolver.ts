import { exhaustiveSwitchGuard } from '@rebel-hub/service-tools';
import { AuthPassport, parseAuthPassport } from './authPassport.aggregate';
import { AuthPassportSuccessDomainEvents } from './authPassport.domainEvents';

export const evolveAuthPassport = (
  authPassport: AuthPassport | null,
  domainEvent: AuthPassportSuccessDomainEvents,
): AuthPassport => {
  switch (domainEvent.type) {
    case 'DE/IAM/AUTH_PASSPORT/AUTH_PASSPORT_GENERATED':
    case 'DE/IAM/AUTH_PASSPORT/AUTH_PASSPORT_INVALIDATED':
    case 'DE/IAM/AUTH_PASSPORT/AUTH_PASSPORT_VERIFIED':
      return parseAuthPassport({
        ...(authPassport ?? ({} as AuthPassport)),
        ...domainEvent.payload,
      });
    default:
      exhaustiveSwitchGuard(domainEvent);
  }
};
