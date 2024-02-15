// Types
// -----

export type KnownClients = 'web' | 'mobile' | 'external';

// Utils
// -----

export const identifyClient = (clientId: string | null): KnownClients => {
  if (clientId === process.env.MOBILE_CLIENT_ID!) {
    return 'mobile';
  }
  if (clientId === process.env.WEB_CLIENT_ID!) {
    return 'web';
  }
  return 'external';
};
