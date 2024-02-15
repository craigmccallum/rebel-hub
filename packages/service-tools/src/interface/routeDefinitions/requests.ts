import { AuthPassportFromAuthRequirements, AuthRequirements } from '~/common/auth';

// Types
// -----

export type RouteDefinitionRequest<
  TAuthRequirements extends AuthRequirements = AuthRequirements,
  TPathParams extends Record<string, unknown> = Record<string, unknown>,
  TQueryParams extends Record<string, unknown> = Record<string, unknown>,
  TBody extends Record<string, unknown> = Record<string, unknown>,
  THeaders extends Record<string, unknown> = Record<string, unknown>,
> = {
  pathParams: TPathParams;
  queryParams: TQueryParams;
  body: TBody;
  headers: THeaders;
  authPassport: AuthPassportFromAuthRequirements<TAuthRequirements>;
};

// Utils
// -----

// Nothing here yet
