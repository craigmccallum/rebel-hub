import { extendZodWithOpenApi, OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { type OpenAPIObjectConfig } from '@asteasolutions/zod-to-openapi/dist/v3.0/openapi-generator';
import { z } from 'zod';

import { type RouteDefinition } from '../routeDefinitions/routeDefinitions';

extendZodWithOpenApi(z);

export const openApiConfig: OpenAPIObjectConfig = {
  openapi: '3.0.0',
  info: {
    version: '0.1.0',
    title: 'Rebel Hub API',
    description: '',
  },
  servers: [
    {
      url: '/',
      description: 'Current server',
    },
  ],
};

export const zodOpenApiRegistry = new OpenAPIRegistry();

const securityMechanisms = {
  bearer: zodOpenApiRegistry.registerComponent('securitySchemes', 'bearerAuth', {
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'UUID',
  }),
  session: zodOpenApiRegistry.registerComponent('securitySchemes', 'sessionAuth', {
    type: 'apiKey',
    description:
      "NOTE: this authentication mechanism requires you to log in via the web app. The 'value' field below is useless due to browser security constraints",
    in: 'cookie',
    name: 'connect.sid',
  }),
} as const;

const defaultErrorContent = {
  'application/json': {
    schema: z.object({
      error: z.string(),
    }),
  },
} as const;

const possibleErrorResponses = {
  400: {
    description: 'Bad Request',
    content: defaultErrorContent,
  },
  401: {
    description: 'Unauthorized',
    content: defaultErrorContent,
  },
  403: {
    description: 'Forbidden',
    content: defaultErrorContent,
  },
  404: {
    description: 'Not Found',
    content: defaultErrorContent,
  },
  422: {
    description: 'Unprocessable Content',
    content: defaultErrorContent,
  },
  500: {
    description: 'Internal Server Error',
    content: defaultErrorContent,
  },
} as const;

/**
 * Registers a path in the OpenAPI registry
 *
 * @param pathConfig - The OpenAPI path config
 * @returns void
 *
 * @example
 *
 * registerOpenAPIPath({
 *   tags: ['/api/orders'],
 *   requiresAuth: true,
 *   method: "get",
 *   path: '/api/orders/orders/{orderSfid}',
 *   summary: "Returns an order",
 *   requestSchemas: {
 *     pathParams: z.object({
 *       orderSfid: z.string()
 *     }),
 *     queryParams: z.object({
 *       includeFullOrder: z.boolean()
 *     })
 *   },
 *   responseSchemas: {
 *     body: z.object({
 *       order: z.object({
 *         orderId: z.string(),
 *         buyerId: z.string(),
 *         orderLines: z.array(
 *           z.object({
 *             ...
 *           })
 *         ),
 *         ...
 *       })
 *     }),
 *   },
 * });
 */
const registerOpenAPIPath = (pathConfig: {
  tags: string[];
  method: 'get' | 'post';
  path: string;
  requiresAuth: boolean;
  summary: string;
  requestSchemas: {
    pathParams?: z.AnyZodObject;
    queryParams?: z.AnyZodObject;
    body?: z.AnyZodObject;
  };
  responseSchemas: {
    body?: z.AnyZodObject;
  };
}) => {
  const { tags, method, path, requiresAuth, summary, requestSchemas, responseSchemas } = pathConfig;

  const security = Object.values(securityMechanisms).map((mechanism) => ({
    [mechanism.name]: [],
  }));

  zodOpenApiRegistry.registerPath({
    tags,
    security: requiresAuth ? security : [...security, {}],
    method,
    path,
    summary,
    request: {
      params: requestSchemas.pathParams ?? z.object({}),
      query: requestSchemas.queryParams ?? z.object({}),
      body: requestSchemas.body
        ? {
            content: {
              'application/json': {
                schema: requestSchemas.body,
              },
            },
          }
        : undefined,
    },
    responses: {
      200: {
        description: 'Success',
        content: responseSchemas.body
          ? {
              'application/json': {
                schema: responseSchemas.body,
              },
            }
          : undefined,
      },
      ...possibleErrorResponses,
    },
  });
};

export const registerOpenAPIEndpoints = (
  basePath: `/${string}`,
  routeDefinitions: RouteDefinition[],
) => {
  routeDefinitions.forEach((routeDefinitions) => {
    const {
      method,
      path,
      summary,
      config: { authRequirements, requestSchemas, responseSchemas },
    } = routeDefinitions;

    registerOpenAPIPath({
      tags: [basePath],
      method: method,
      path: `${basePath}${path}`,
      requiresAuth: authRequirements == 'authenticated',
      summary,
      requestSchemas,
      responseSchemas,
    });
  });
};
