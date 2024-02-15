import { type Router } from 'express';
import { z } from 'zod';

import { AuthPassport } from '~/common/auth';
import { RouteDefinitionRequest } from '../routeDefinitions/requests';
import { RouteDefinitionResponse, routeDefinitionResponseFns } from '../routeDefinitions/responses';
import { RouteDefinition } from '../routeDefinitions/routeDefinitions';
import { withErrorHandling } from './decorators/errorDecorators';
import { enforceAuthRequirements } from './middleware/authentication';
import { allowClients } from './middleware/clients';
import { rejectIfNotInEnv } from './middleware/environment';
import {
  validateRequestBody,
  validateRequestParams,
  validateRequestQuery,
} from './middleware/validation';
import { sendExpressResponse } from './responses';

export const setUpExpressRoutes = (
  router: Router,
  basePath: `/${string}`,
  routeDefinitions: RouteDefinition[],
) => {
  routeDefinitions.forEach((routeDefinition) => {
    const {
      method,
      path,
      config: { showInEnvs, allowedClients, authRequirements, requestSchemas, responseSchemas },
      handleRequest,
    } = routeDefinition;

    const middleware = [
      rejectIfNotInEnv(showInEnvs),
      allowClients(allowedClients),
      enforceAuthRequirements(authRequirements),
      validateRequestParams(requestSchemas.pathParams ?? z.object({})),
      validateRequestQuery(requestSchemas.queryParams ?? z.object({})),
      validateRequestBody(requestSchemas.body ?? z.object({})),
    ];

    router[method](
      `${basePath}${path}`,
      ...middleware,
      withErrorHandling(async (req, res) => {
        const request = {
          pathParams: req.params,
          queryParams: req.query,
          body: req.body,
          headers: req.headers,
          authPassport: req.authPassport as AuthPassport | null,
        } satisfies RouteDefinitionRequest;

        const response = routeDefinitionResponseFns(
          responseSchemas.body,
        ) satisfies RouteDefinitionResponse;

        const { status, data, cookies } = await handleRequest({ request, response });

        return sendExpressResponse(res, status, data, cookies);
      }),
    );
  });
};
