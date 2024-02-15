import type { Request, Response } from 'express';

import type { ExpressAPIErrorResponse } from '@rebel-hub/service-tools';
import {
  exhaustiveSwitchGuard,
  sendConflictResponse,
  sendInternalServerErrorResponse,
  sendSuccessResponse,
} from '@rebel-hub/service-tools';

import type { CommandHandlers } from '~/application/bootstrap';

type Dependencies = {
  handleRegisterUser: CommandHandlers['handleRegisterUser'];
};
type RequestParams = Record<string, unknown>;
type RequestBody = {
  email: string;
  password: string;
};
type RequestQuery = Record<string, unknown>;
type ResponseBody = {
  accessToken: string;
};
type Req = Request<RequestParams, ResponseBody, RequestBody, RequestQuery>;
type Res = Response<ResponseBody | ExpressAPIErrorResponse>;

export const registerUserRequestHandler =
  ({ handleRegisterUser }: Dependencies) =>
  async (req: Req, res: Res): Promise<Res> => {
    const { authPassport } = req;
    const { email, password } = req.body;

    const domainEvent = await handleRegisterUser({
      authPassport,
      email,
      password,
    });

    switch (domainEvent.type) {
      case 'USER/USER_REGISTRATION_FAILED/EMAIL_ALREADY_IN_USE':
        return sendConflictResponse(res, 'An account with this email is already registered');
      case 'USER/USER_REGISTERED':
        return sendSuccessResponse(res);
      default:
        return exhaustiveSwitchGuard(domainEvent);
    }
  };
