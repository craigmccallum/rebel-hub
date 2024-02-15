// Types
// -----

export type AuthPassport = {
  userId: string | null;
};

export type AuthRequirements = 'authenticated' | 'none' | 'notAuthenticated';

export type AuthPassportFromAuthRequirements<TAuthRequirements extends AuthRequirements> =
  TAuthRequirements extends 'none'
    ? AuthPassport | null
    : TAuthRequirements extends 'authenticated'
    ? AuthPassport
    : TAuthRequirements extends 'notAuthenticated'
    ? null
    : null;

// Utils
// -----

// Nothing here yet
