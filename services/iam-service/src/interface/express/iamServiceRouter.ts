import { registerOpenAPIEndpoints, setUpExpressRoutes } from '@rebel-hub/service-tools';
import express from 'express';

import type { CommandHandlers, QueryHandlers } from '~/application/bootstrap';
import { createLogUserInRouteDefinition } from '../routeDefinitions/logUserIn.routeHandler';

export const setUpIAMRouter = (commandHandlers: CommandHandlers, queryHandlers: QueryHandlers) => {
  const router = express.Router();
  const basePath = '/api/iam';
  const routeDefinitions = [
    // GET routes
    // Nothing here yet
    // POST routes
    createLogUserInRouteDefinition(commandHandlers.logUserIn),
  ];

  setUpExpressRoutes(router, basePath, routeDefinitions);
  registerOpenAPIEndpoints(basePath, routeDefinitions);

  return router;
};
