import type { Request, Response } from 'express';

import type { AuthPassport, ExpressAPIErrorResponse } from '@rebel-hub/service-tools';
import { sendSuccessResponse } from '@rebel-hub/service-tools';

import type { CommandHandlers } from '~/application/bootstrap';

type Dependencies = {
  authenticateUser: CommandHandlers['authenticateUser'];
};
type RequestParams = Record<string, unknown>;
type RequestBody = Record<string, unknown>;
type RequestQuery = Record<string, unknown>;
type ResponseBody = {
  authPassport: AuthPassport;
};
type Req = Request<RequestParams, ResponseBody, RequestBody, RequestQuery>;
type Res = Response<ResponseBody | ExpressAPIErrorResponse>;

export const authenticateUserRequestHandler =
  ({ authenticateUser }: Dependencies) =>
  async (req: Req, res: Res): Promise<Res> => {
    const accessToken = extractAccessTokenFromRequest(req);

    const event = await authenticateUser({ accessToken });

    return sendSuccessResponse(res, {
      authPassport: event.payload.authPassport,
    });
  };

const extractAccessTokenFromRequest = (req: Req) => {
  // Cookies
  const { accessToken } = req.cookies;
  if (accessToken) {
    return accessToken;
  }

  // Headers
  const { authorization } = req.headers;
  if (authorization && authorization.includes('Bearer ')) {
    return authorization.replace('Bearer ', '');
  }

  return null;
};
