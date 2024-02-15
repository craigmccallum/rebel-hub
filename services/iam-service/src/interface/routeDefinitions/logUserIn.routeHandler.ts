import {
  RouteDefinitionRequestSchemas,
  RouteDefinitionResponseSchemas,
  exhaustiveSwitchGuard,
  initialiseRouteDefinition,
} from '@rebel-hub/service-tools';
import { z } from 'zod';

import type { CommandHandlers } from '~/application/bootstrap';
import { logUserIncommandDataSchema } from '~/application/commandHandlers/logUserIn.handler';

const requestSchemas = {
  body: z.object({
    email: logUserIncommandDataSchema.shape.email,
    phoneNumber: logUserIncommandDataSchema.shape.phoneNumber.optional(),
    rawPassword: logUserIncommandDataSchema.shape.rawPassword,
  }),
} satisfies RouteDefinitionRequestSchemas;

const responseSchemas = {
  body: z.object({
    authPassportId: z.string(),
  }),
} satisfies RouteDefinitionResponseSchemas;

export const createLogUserInRouteDefinition = (logUserIn: CommandHandlers['logUserIn']) =>
  initialiseRouteDefinition({
    method: 'post',
    path: '/login',
    summary: 'Logs a user in',
    config: {
      allowedClients: ['web', 'mobile', 'external'],
      showInEnvs: 'all',
      authRequirements: 'notAuthenticated',
      requestSchemas,
      responseSchemas,
    },
    handleRequest: async ({ request, response }) => {
      const { email, phoneNumber, rawPassword } = request.body;

      const event = await logUserIn({
        email,
        phoneNumber: phoneNumber ?? null,
        rawPassword,
      });

      switch (event.type) {
        case 'DE/IAM/AUTH_PASSPORT/AUTH_PASSPORT_GENERATED':
          const authPassportId = event.payload.id;
          return response.success(
            {
              authPassportId,
            },
            // [
            //   {
            //     name: 'authPassportId',
            //     value: authPassportId,
            //     options: {
            //       expiresAt: 100000,
            //       httpOnly: true,
            //     },
            //   },
            // ],
          );
        case 'DE/IAM/AUTH_PASSPORT/AUTH_PASSPORT_GENERATION_FAILED/INCORRECT_PASSWORD':
          return response.unauthorised('Email or password incorrect'); // Don't give away that an account email exists
        case 'DE/IAM/AUTH_PASSPORT/AUTH_PASSPORT_GENERATION_FAILED/LIMIT_REACHED':
          return response.forbidden('This account has already reached its login limit');
        case 'DE/IAM/AUTH_PASSPORT/AUTH_PASSPORT_GENERATION_FAILED/USER_DEACTIVATED':
          return response.unauthorised('This account is deactivated');
        default:
          return exhaustiveSwitchGuard(event);
      }
    },
  });
