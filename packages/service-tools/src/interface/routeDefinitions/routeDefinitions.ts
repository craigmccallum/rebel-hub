import { type z } from 'zod';

import { AuthRequirements } from '~/common/auth';
import { Envs } from '~/common/envs';
import { KnownClients } from '../clients';
import { RouteDefinitionRequest } from './requests';
import {
  ClientErrorResponse,
  RedirectResponse,
  RouteDefinitionResponse,
  ServerErrorResponse,
  SuccessResponse,
} from './responses';

// Types
// -----

type SupportedMethods = 'get' | 'post';

export type RouteDefinitionRequestSchemas = RouteDefinition['config']['requestSchemas'];
export type RouteDefinitionResponseSchemas = RouteDefinition['config']['responseSchemas'];

export type RouteDefinition<
  TMethod extends SupportedMethods = SupportedMethods,
  TAuthRequirements extends AuthRequirements = AuthRequirements,
  TRequestPathParamsSchema extends z.AnyZodObject = any,
  TRequestQueryParamSchema extends z.AnyZodObject = any,
  TRequestBodySchema extends z.AnyZodObject = any,
  TResponseBodySchema extends z.AnyZodObject = any,
  // TResponseCookiesSchema extends z.AnyZodObject = any,
> = {
  method: TMethod;
  path: `/${string}`;
  summary: string;
  config: {
    showInEnvs: 'all' | Envs[];
    allowedClients: KnownClients[];
    authRequirements: TAuthRequirements;
    requestSchemas: {
      pathParams?: TRequestPathParamsSchema;
      queryParams?: TRequestQueryParamSchema;
      body?: TRequestBodySchema;
    };
    responseSchemas: {
      body?: TResponseBodySchema;
    };
  };
  handleRequest: (args: {
    request: RouteDefinitionRequest<
      TAuthRequirements,
      z.infer<TRequestPathParamsSchema>,
      z.infer<TRequestQueryParamSchema>,
      z.infer<TRequestBodySchema>
    >;
    response: RouteDefinitionResponse<TResponseBodySchema>;
  }) => Promise<
    | SuccessResponse<z.infer<TResponseBodySchema>>
    | RedirectResponse
    | ClientErrorResponse
    | ServerErrorResponse
  >;
};

// Utils
// -----

/**
// 'identity' function to enforce types. Also narrows types where possible.
 *
 * @example
 *
 * import { z } from "zod";
 *
 * import {
 * initialiseRouteDefinition,
 * type RouteDefinitionRequestSchemas,
 * type RouteDefinitionResponseSchemas,
 * } from "~/shared/interface/routeDefinitions/routeDefinitions";
 * // other imports
 *
 * // Schemas
 * // -------
 *
 * const requestSchemas = {
 *   queryParams: z.object({
 *     limit: z.coerce.number().int().nonnegative().optional().default(10),
 *     offset: z.coerce.number().int().nonnegative().optional().offset(0),
 *   }),
 * } satisfies RouteDefinitionRequestSchemas
 *
 * const responseSchemas = {
 *   body: z.object({
 *     tasks: z.array(
 *       z.object({
 *         id: z.string(),
 *         title: z.string(),
 *         description: z.string(),
 *         // other attributes
 *       })
 *     ),
 *   }),
 * } satisfies RouteDefinitionResponseSchemas
 *
 * // Route Definition
 * // ----------------
 *
 * export const getTasksRouteDefinition = initialiseRouteDefinition({
 *   method: 'get',
 *   path: "/tasks", // use "{...}" for dynamic path segments, e.g. "/tasks/{taskId}"
 *   summary: "Returns all tasks for the authenticated account",
 *   config: {
 *     showInEnvs: 'all', // or ['development', 'staging']
 *     allowedClients: ["mobile", "web"],
 *     authRequirements: 'authenticated',
 *     requestSchemas,
 *     responseSchemas,
 *   },
 *   handleRequest: async ({ request, response }) => {
 *     const accountId = request.accountId;
 *
 *     const tasks = await queryAccountTodos({
 *       accountId,
 *       limit,
 *       offset,
 *     });
 *
 *     return response.success({ tasks });
 *   },
 * });
 */
export const initialiseRouteDefinition = <
  TMethod extends SupportedMethods,
  TAuthRequirements extends AuthRequirements,
  TRequestPathParamsSchema extends z.AnyZodObject,
  TRequestQueryParamSchema extends z.AnyZodObject,
  TRequestBodySchema extends z.AnyZodObject,
  TResponseBodySchema extends z.AnyZodObject,
  // TResponseCookiesSchema extends z.AnyZodObject,
>(
  routeDefinition: RouteDefinition<
    TMethod,
    TAuthRequirements,
    TRequestPathParamsSchema,
    TRequestQueryParamSchema,
    TRequestBodySchema,
    TResponseBodySchema
    // TResponseCookiesSchema
  >,
) => routeDefinition;
